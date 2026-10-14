import { NextResponse } from "next/server";
import { deleteUpload, listUploads, saveUpload } from "@/lib/cms/storage";

const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"]);

export async function GET() {
  return NextResponse.json({ ok: true, files: await listUploads() });
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ ok: false, error: "Attach a file" }, { status: 400 });
  const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
  if (!ALLOWED.has(ext)) return NextResponse.json({ ok: false, error: "Use jpg, png, webp, gif, svg or avif" }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ ok: false, error: "File must be under 8 MB" }, { status: 400 });
  const bytes = new Uint8Array(await file.arrayBuffer());
  const saved = await saveUpload(file.name, bytes);
  return NextResponse.json({ ok: true, ...saved });
}

export async function DELETE(req: Request) {
  const name = new URL(req.url).searchParams.get("name");
  if (!name) return NextResponse.json({ ok: false, error: "Missing name" }, { status: 400 });
  const ok = await deleteUpload(name);
  return NextResponse.json({ ok });
}
