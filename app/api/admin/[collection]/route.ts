import { NextResponse } from "next/server";
import { deleteJson } from "@/lib/cms/storage";
import { deleteItem, getCollection, isCollection, registry, revalidateAll, saveCollection, upsertItem } from "@/lib/cms/store";

type Ctx = { params: { collection: string } };

function guard(name: string) {
  if (!isCollection(name)) return NextResponse.json({ ok: false, error: "Unknown collection" }, { status: 404 });
  return null;
}

export async function GET(_req: Request, { params }: Ctx) {
  const denied = guard(params.collection);
  if (denied) return denied;
  return NextResponse.json({ ok: true, data: await getCollection(params.collection) });
}

/** Replace a whole collection (site settings, inventory bulk save). */
export async function PUT(req: Request, { params }: Ctx) {
  const denied = guard(params.collection);
  if (denied) return denied;
  const body = await req.json().catch(() => undefined);
  if (body === undefined) return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  await saveCollection(params.collection, body);
  return NextResponse.json({ ok: true });
}

/** Insert or update one record. `{ item, previousId? }`. */
export async function POST(req: Request, { params }: Ctx) {
  const denied = guard(params.collection);
  if (denied) return denied;
  const def = registry[params.collection];
  const body = (await req.json().catch(() => ({}))) as { item?: Record<string, unknown>; previousId?: string; reset?: boolean };
  if (body.reset) {
    await deleteJson(params.collection);
    revalidateAll();
    return NextResponse.json({ ok: true, reset: true });
  }
  if (def.singleton) {
    if (!body.item || typeof body.item !== "object") return NextResponse.json({ ok: false, error: "Missing item" }, { status: 400 });
    await saveCollection(params.collection, body.item);
    return NextResponse.json({ ok: true });
  }
  if (!body.item || typeof body.item !== "object" || Array.isArray(body.item)) {
    return NextResponse.json({ ok: false, error: "Missing item" }, { status: 400 });
  }
  const id = String(body.item[def.idField!] ?? "").trim();
  if (!id) return NextResponse.json({ ok: false, error: `${def.idField} is required` }, { status: 400 });
  await upsertItem(params.collection, body.item, body.previousId);
  return NextResponse.json({ ok: true, id });
}

export async function DELETE(req: Request, { params }: Ctx) {
  const denied = guard(params.collection);
  if (denied) return denied;
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  await deleteItem(params.collection, id);
  return NextResponse.json({ ok: true });
}
