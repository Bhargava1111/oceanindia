import { NextResponse } from "next/server";
import { z } from "zod";
import { appendItem, getSubscribers, type Subscriber } from "@/lib/cms/store";

const schema = z.object({ email: z.string().email(), source: z.string().optional() });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  const email = parsed.data.email.toLowerCase();
  const existing = await getSubscribers();
  if (!existing.some((s) => s.email.toLowerCase() === email)) {
    const sub: Subscriber = { email, createdAt: new Date().toISOString(), source: parsed.data.source || "footer" };
    await appendItem("subscribers", sub);
  }
  return NextResponse.json({ ok: true });
}
