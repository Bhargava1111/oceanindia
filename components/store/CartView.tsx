"use client";

import * as React from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "./CartProvider";
import { ProductArt } from "@/components/graphics/ProductArt";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";

export function CartView() {
  const { items, setQty, remove, subtotal, count } = useCart();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-72 glass rounded-3xl animate-pulse" />;

  if (items.length === 0) {
    return (
      <div className="glass rounded-3xl p-12 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-aqua/10 text-aqua"><ShoppingBag className="h-7 w-7" /></span>
        <h2 className="mt-5 font-heading text-xl font-bold">Your cart is empty.</h2>
        <Button href="/store" className="mt-6">Browse the store</Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <ul className="lg:col-span-8 divide-y divide-line/10 glass rounded-3xl px-4 sm:px-6">
        {items.map((it) => (
          <li key={it.slug} className="flex flex-wrap gap-4 py-5">
            <Link href={`/product/${it.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-bg-2/60 sm:h-24 sm:w-24"><ProductArt product={{ slug: it.slug, hue: it.hue, category: "", name: it.name }} /></Link>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-muted">{it.brand}</p>
              <Link href={`/product/${it.slug}`} className="font-heading font-semibold hover:text-aqua line-clamp-2">{it.name}</Link>
              <p className="mt-1 text-sm text-muted tabular-nums">{formatINR(it.price)} each</p>
              <div className="mt-3 flex items-center gap-4">
                <div className="inline-flex items-center rounded-full border border-line/15">
                  <button aria-label="Decrease quantity" onClick={() => setQty(it.slug, it.qty - 1)} className="p-2 hover:text-aqua"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="w-8 text-center text-sm tabular-nums">{it.qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty(it.slug, it.qty + 1)} className="p-2 hover:text-aqua"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <button onClick={() => remove(it.slug)} className="inline-flex items-center gap-1 text-xs text-muted hover:text-rose-400"><Trash2 className="h-3.5 w-3.5" />Remove</button>
              </div>
            </div>
            <p className="ml-auto font-heading font-bold tabular-nums sm:ml-0">{formatINR(it.price * it.qty)}</p>
          </li>
        ))}
      </ul>
      <aside className="lg:col-span-4 glass rounded-3xl p-6 lg:sticky lg:top-32">
        <h2 className="font-heading font-bold">Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-muted">{count} {count === 1 ? "item" : "items"}</dt><dd className="tabular-nums">{formatINR(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="text-teal">Free</dd></div>
          <div className="flex justify-between border-t border-line/10 pt-3 font-heading text-lg font-bold"><dt>Total</dt><dd className="tabular-nums">{formatINR(subtotal)}</dd></div>
        </dl>
        <Button href="/checkout" size="lg" className="mt-6 w-full" iconRight={<ArrowRight />}>Checkout</Button>
        <p className="mt-3 text-xs text-muted text-center">GST invoice · EMI available at payment</p>
      </aside>
    </div>
  );
}
