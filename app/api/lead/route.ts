import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas";
import { appendItem, newId, type Lead } from "@/lib/cms/store";

/** Stores a quote / enquiry / landing-page lead in content/leads.json. */
export async function POST(req: Request) {
  const parsed = leadSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  const lead: Lead = {
    id: newId("LD"),
    createdAt: new Date().toISOString(),
    source: parsed.data.source || "website",
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email || undefined,
    company: parsed.data.company || undefined,
    interest: parsed.data.interest || undefined,
    budget: parsed.data.budget || undefined,
    product: parsed.data.product || undefined,
    message: parsed.data.message || undefined,
    status: "new",
  };
  await appendItem("leads", lead);
  return NextResponse.json({ ok: true, id: lead.id });
}
