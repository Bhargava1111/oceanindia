import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * File-backed JSON storage for CMS content.
 *
 * Every collection lives in `<CONTENT_DIR>/<name>.json` (default: `./content`).
 * When a file does not exist the typed defaults from `/data` are used, so the site
 * always renders — the admin simply layers edits on top.
 *
 * Swap this module for a database/KV adapter (Vercel KV, Postgres, Supabase…)
 * if you deploy to a host without a persistent filesystem. Only `readJson`,
 * `writeJson` and the media helpers need re-implementing.
 */
export const contentDir = () =>
  process.env.CONTENT_DIR ? path.resolve(process.env.CONTENT_DIR) : path.join(process.cwd(), "content");

export const uploadsDir = () => path.join(process.cwd(), "public", "uploads");

const safe = (name: string) => name.replace(/[^a-z0-9-_]/gi, "");

export async function readJson<T>(name: string): Promise<T | undefined> {
  try {
    const raw = await fs.readFile(path.join(contentDir(), `${safe(name)}.json`), "utf8");
    return JSON.parse(raw) as T;
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException)?.code === "ENOENT") return undefined;
    console.error(`[cms] failed to read ${name}.json`, e);
    return undefined;
  }
}

export async function writeJson(name: string, data: unknown): Promise<void> {
  const dir = contentDir();
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, `${safe(name)}.json`);
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, file);
}

export async function deleteJson(name: string): Promise<void> {
  try {
    await fs.unlink(path.join(contentDir(), `${safe(name)}.json`));
  } catch {}
}

/** Media library: files under /public/uploads, served at /uploads/<file>. */
export async function listUploads(): Promise<{ name: string; url: string; size: number; modified: string }[]> {
  const dir = uploadsDir();
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries
        .filter((e) => e.isFile() && !e.name.startsWith("."))
        .map(async (e) => {
          const stat = await fs.stat(path.join(dir, e.name));
          return { name: e.name, url: `/uploads/${e.name}`, size: stat.size, modified: stat.mtime.toISOString() };
        }),
    );
    return files.sort((a, b) => (a.modified < b.modified ? 1 : -1));
  } catch {
    return [];
  }
}

export async function saveUpload(originalName: string, bytes: Uint8Array): Promise<{ name: string; url: string }> {
  const dir = uploadsDir();
  await fs.mkdir(dir, { recursive: true });
  const ext = path.extname(originalName).toLowerCase().replace(/[^a-z0-9.]/g, "") || ".bin";
  const base = path
    .basename(originalName, path.extname(originalName))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "file";
  let name = `${base}${ext}`;
  let i = 1;
  while (await exists(path.join(dir, name))) name = `${base}-${i++}${ext}`;
  await fs.writeFile(path.join(dir, name), bytes);
  return { name, url: `/uploads/${name}` };
}

export async function deleteUpload(name: string): Promise<boolean> {
  const file = path.join(uploadsDir(), path.basename(name));
  try {
    await fs.unlink(file);
    return true;
  } catch {
    return false;
  }
}

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}
