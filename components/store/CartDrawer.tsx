"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ProductArt } from "@/components/graphics/ProductArt";
import { useCart } from "./CartProvider";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const { open, setOpen, items, setQty, remove, subtotal, count } = useCart();
  return (
    <Modal open={open} onClose={() => setOpen(false)} title={`Your cart (${count})`} side>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
          <span className="glass rounded-full p-5"><ShoppingBag className="h-7 w-7 text-aqua" /></span>
          <p className="font-heading font-bold text-lg">Your cart is empty</p>
          <p className="text-sm text-muted max-w-xs">Browse 1,800+ products or ask us for a recommendation on WhatsApp.</p>
          <Button href="/store" onClick={() => setOpen(false)}>Browse the store</Button>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="space-y-4 flex-1">
            {items.map((it) => (
              <li key={it.slug} className="flex gap-3">
                <Link href={`/product/${it.slug}`} onClick={() => setOpen(false)} className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-bg-2/60">
                  <ProductArt product={{ slug: it.slug, hue: it.hue, category: "", name: it.name }} />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-muted">{it.brand}</p>
                  <Link href={`/product/${it.slug}`} onClick={() => setOpen(false)} className="line-clamp-2 text-sm font-medium hover:text-aqua">{it.name}</Link>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-line/15">
                      <button aria-label="Decrease quantity" onClick={() => setQty(it.slug, it.qty - 1)} className="p-1.5 hover:text-aqua"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-7 text-center text-sm tabular-nums">{it.qty}</span>
                      <button aria-label="Increase quantity" onClick={() => setQty(it.slug, it.qty + 1)} className="p-1.5 hover:text-aqua"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">{formatINR(it.price * it.qty)}</span>
                  </div>
                </div>
                <button aria-label={`Remove ${it.name}`} onClick={() => remove(it.slug)} className="self-start p-1.5 text-muted hover:text-rose-400"><Trash2 className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-line/10 pt-4 space-y-3">
            <div className="flex items-center justify-between text-sm"><span className="text-muted">Subtotal (incl. GST)</span><span className="font-heading font-bold text-lg tabular-nums">{formatINR(subtotal)}</span></div>
            <p className="text-xs text-muted">Free insured shipping. GST invoice available at checkout.</p>
            <Button href="/checkout" className="w-full" onClick={() => setOpen(false)}>Proceed to checkout</Button>
            <Button href="/store" variant="ghost" size="sm" className="w-full" onClick={() => setOpen(false)}>Continue shopping</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
