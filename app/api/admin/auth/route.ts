import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, checkPassword, createSessionToken } from "@/lib/cms/auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { password?: string };
  if (!body.password || !checkPassword(body.password)) {
    return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
  }
  const { token, expires } = await createSessionToken();
  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  cookies().set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
