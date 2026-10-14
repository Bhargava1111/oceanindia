import Link from "next/link";
import { getLeads, getOrders, getPages, getProducts, getSubscribers } from "@/lib/cms/store";
import { isLowStock } from "@/lib/catalog";

export default async function DashboardPage() {
  const [products, leads, orders, subscribers, pages] = await Promise.all([getProducts(), getLeads(), getOrders(), getSubscribers(), getPages()]);
  const low = products.filter((p) => isLowStock(p) || (typeof p.stock === "number" && p.stock <= 0));
  const cards = [
    { label: "Products", value: products.length, href: "/admin/content/products" },
    { label: "Pages", value: pages.length, href: "/admin/content/pages" },
    { label: "Open leads", value: leads.filter((l) => l.status === "new" || l.status === "contacted").length, href: "/admin/content/leads" },
    { label: "Orders", value: orders.length, href: "/admin/content/orders" },
    { label: "Subscribers", value: subscribers.length, href: "/admin/content/subscribers" },
    { label: "Low / out of stock", value: low.length, href: "/admin/inventory" },
  ];
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">Edit page copy, catalogue, stock, media, leads and orders. Changes are stored in the <code>content</code> folder and show on the site after you save.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="glass rounded-3xl p-5 hover:border-aqua/40">
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-2 font-heading text-3xl font-bold">{c.value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="glass rounded-3xl p-5">
          <h2 className="font-heading font-bold">Recent leads</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {leads.slice(0, 6).map((l) => (
              <li key={l.id} className="flex justify-between gap-3">
                <span>{l.name}<span className="text-muted"> · {l.interest || l.source}</span></span>
                <span className="text-aqua">{l.status}</span>
              </li>
            ))}
            {leads.length === 0 && <li className="text-muted">No enquiries yet. Quote and contact forms land here.</li>}
          </ul>
        </section>
        <section className="glass rounded-3xl p-5">
          <h2 className="font-heading font-bold">Recent orders</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {orders.slice(0, 6).map((o) => (
              <li key={o.id} className="flex justify-between gap-3">
                <span>{o.id}<span className="text-muted"> · {o.customer.name}</span></span>
                <span>₹{o.total.toLocaleString("en-IN")}</span>
              </li>
            ))}
            {orders.length === 0 && <li className="text-muted">No orders yet. Checkout writes them here and reduces stock.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
