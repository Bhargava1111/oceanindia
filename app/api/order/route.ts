import { NextResponse } from "next/server";
import { z } from "zod";
import { checkoutSchema } from "@/lib/schemas";
import { appendItem, getOrders, getProducts, newId, saveCollection, type Order } from "@/lib/cms/store";
import { isInStock } from "@/lib/catalog";

const digits = (v: string) => v.replace(/\D/g, "").slice(-10);

/** Public lookup used by the track-order page. Requires the checkout phone number. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = (url.searchParams.get("id") || "").trim();
  const phone = digits(url.searchParams.get("phone") || "");
  if (!id || phone.length < 10) return NextResponse.json({ ok: false, error: "Enter an order ID and mobile number." }, { status: 400 });
  const order = (await getOrders()).find((o) => o.id.toLowerCase() === id.toLowerCase());
  if (!order || digits(order.customer.phone) !== phone) {
    return NextResponse.json({ ok: false, error: "No order matches that ID and mobile number." }, { status: 404 });
  }
  return NextResponse.json({
    ok: true,
    order: {
      id: order.id,
      status: order.status,
      createdAt: order.createdAt,
      total: order.total,
      items: order.items.map((i) => ({ name: i.name, qty: i.qty })),
      tracking: order.tracking ?? null,
    },
  });
}

const bodySchema = z.object({
  customer: checkoutSchema,
  items: z.array(z.object({ slug: z.string(), qty: z.number().int().min(1).max(99) })).min(1),
});

/**
 * Creates an order. Prices are re-computed from the catalog, stock is decremented
 * when a numeric stock count exists, and the order is stored in content/orders.json.
 */
export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });

  const products = await getProducts();
  const lines: Order["items"] = [];
  for (const { slug, qty } of parsed.data.items) {
    const p = products.find((x) => x.slug === slug);
    if (!p || p.price == null || !isInStock(p)) {
      return NextResponse.json({ ok: false, error: `${p?.name ?? slug} is not available to buy right now.` }, { status: 400 });
    }
    if (typeof p.stock === "number" && qty > p.stock) {
      return NextResponse.json({ ok: false, error: `Only ${p.stock} of ${p.name} left in stock.` }, { status: 400 });
    }
    lines.push({ slug, name: p.name, qty, price: p.price });
  }

  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
  const c = parsed.data.customer;
  const order: Order = {
    id: newId("OI"),
    createdAt: new Date().toISOString(),
    status: "pending-payment",
    payment: c.payment,
    customer: { name: c.name, phone: c.phone, email: c.email, gstin: c.gstin || undefined },
    address: { line1: c.address1, line2: c.address2 || undefined, city: c.city, state: c.state, pincode: c.pincode, notes: c.notes || undefined },
    items: lines,
    subtotal,
    shipping: 0,
    total: subtotal,
  };

  const next = products.map((p) => {
    const line = lines.find((l) => l.slug === p.slug);
    if (!line || typeof p.stock !== "number") return p;
    return { ...p, stock: Math.max(0, p.stock - line.qty) };
  });
  await saveCollection("products", next);
  await appendItem("orders", order);

  return NextResponse.json({ ok: true, id: order.id, subtotal, status: order.status });
}
