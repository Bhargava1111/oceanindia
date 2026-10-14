"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { isLowStock } from "@/lib/catalog";

export function InventoryTable({ products }: { products: Product[] }) {
  const [rows, setRows] = useState(products);
  const [q, setQ] = useState("");
  const [onlyLow, setOnlyLow] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  const view = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((p) => {
      if (onlyLow && !isLowStock(p) && (p.stock ?? 1) > 0) return false;
      if (!needle) return true;
      return `${p.name} ${p.brand} ${p.sku ?? ""} ${p.slug}`.toLowerCase().includes(needle);
    });
  }, [rows, q, onlyLow]);

  function patch(slug: string, partial: Partial<Product>) {
    setRows((list) => list.map((p) => (p.slug === slug ? { ...p, ...partial } : p)));
  }

  async function save() {
    setPending(true);
    setMessage("");
    const res = await fetch("/api/admin/products", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(rows) });
    setPending(false);
    setMessage(res.ok ? "Inventory saved." : "Could not save inventory.");
  }

  const low = rows.filter((p) => isLowStock(p)).length;
  const out = rows.filter((p) => typeof p.stock === "number" && p.stock <= 0).length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-muted">{rows.length} products · {low} low · {out} out of stock</p>
        </div>
        <button onClick={save} disabled={pending} className="rounded-full bg-aqua px-5 py-2 text-sm font-semibold text-abyss disabled:opacity-50">{pending ? "Saving…" : "Save inventory"}</button>
      </div>
      {message && <p className="mb-4 text-sm text-teal">{message}</p>}
      <div className="mb-4 flex flex-wrap gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, brand, SKU" className="w-full max-w-sm rounded-2xl border border-line/15 bg-bg px-4 py-2.5 text-sm outline-none focus:border-aqua" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={onlyLow} onChange={(e) => setOnlyLow(e.target.checked)} /> Low and out of stock</label>
      </div>
      <div className="overflow-x-auto rounded-3xl border border-line/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-fg/5 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Warn at</th>
            </tr>
          </thead>
          <tbody>
            {view.map((p) => {
              const warn = isLowStock(p) || (typeof p.stock === "number" && p.stock <= 0);
              return (
                <tr key={p.slug} className={`border-t border-line/10 ${warn ? "bg-amber-400/5" : ""}`}>
                  <td className="px-4 py-2">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted">{p.brand}</p>
                  </td>
                  <td className="px-4 py-2"><input value={p.sku ?? ""} onChange={(e) => patch(p.slug, { sku: e.target.value })} className="w-32 rounded-xl border border-line/15 bg-bg px-2 py-1.5" /></td>
                  <td className="px-4 py-2"><input type="number" value={p.price ?? ""} onChange={(e) => patch(p.slug, { price: e.target.value === "" ? null : Number(e.target.value) })} className="w-28 rounded-xl border border-line/15 bg-bg px-2 py-1.5" /></td>
                  <td className="px-4 py-2"><input type="number" value={p.stock ?? ""} placeholder="—" onChange={(e) => patch(p.slug, { stock: e.target.value === "" ? undefined : Number(e.target.value) })} className="w-20 rounded-xl border border-line/15 bg-bg px-2 py-1.5" /></td>
                  <td className="px-4 py-2"><input type="number" value={p.lowStockAt ?? ""} placeholder="3" onChange={(e) => patch(p.slug, { lowStockAt: e.target.value === "" ? undefined : Number(e.target.value) })} className="w-20 rounded-xl border border-line/15 bg-bg px-2 py-1.5" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
