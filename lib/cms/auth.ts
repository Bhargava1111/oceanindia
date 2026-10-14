/**
 * Minimal, dependency-free admin authentication.
 *
 * - Single shared password from `ADMIN_PASSWORD` (falls back to `admin123` in development).
 * - Session cookie holds `expiry.signature` where signature = HMAC-SHA256(expiry, ADMIN_SECRET).
 * - Uses the Web Crypto API so it runs in both the Edge middleware and Node route handlers.
 *
 * Replace with NextAuth / Clerk / your SSO when you need multiple users and roles.
 */
export const ADMIN_COOKIE = "oi_admin";
const SESSION_HOURS = 12;

export const adminPassword = () => process.env.ADMIN_PASSWORD || "admin123";
export const isDefaultPassword = () => !process.env.ADMIN_PASSWORD;
const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "oceanindia-dev-secret-change-me";

const enc = new TextEncoder();

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return base64url(new Uint8Array(sig));
}

function base64url(bytes: Uint8Array) {
  let s = "";
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function createSessionToken(): Promise<{ token: string; expires: Date }> {
  const expires = new Date(Date.now() + SESSION_HOURS * 3600 * 1000);
  const exp = String(expires.getTime());
  return { token: `${exp}.${await hmac(exp)}`, expires };
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = await hmac(exp);
  return timingSafeEqual(expected, sig);
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export function checkPassword(input: string) {
  const expected = adminPassword();
  return input.length === expected.length && timingSafeEqual(input, expected);
}
