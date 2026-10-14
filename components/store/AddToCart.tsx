"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, ShoppingBag, Zap, MessageCircle, MessageSquareText } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "./CartProvider";
import { Button } from "@/components/ui/Button";
import { useSite } from "@/components/layout/SiteProvider";
import { cn } from "@/lib/utils";
import { isInStock, isLowStock } from "@/lib/catalog";

export function AddToCart({ product: p }: { product: Product }) {
  const { whatsappUrl } = useSite();
  const { add, toggleWishlist, wishlist } = useCart();
  const router = useRouter();
  const [qty, setQty] = React.useState(p.minQty ?? 1);
  const wished = wishlist.includes(p.slug);
  const minQty = p.minQty ?? 1;
  const out = !isInStock(p);
  const low = isLowStock(p);
  const maxQty = typeof p.stock === "number" ? p.stock : Infinity;

  const wishBtn = (
    <button
      type="button"
      onClick={() => toggleWishlist(p.slug)}
      aria-pressed={wished}
      aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
      className={cn("grid h-11 w-11 place-items-center rounded-full border border-line/15 transition", wished ? "text-rose-400 border-rose-400/40" : "text-muted hover:text-rose-400")}
    >
      <Heart className={cn("h-5 w-5", wished && "fill-current")} />
    </button>
  );

  if (p.price == null) {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <Button href={`/quote?product=${encodeURIComponent(p.name)}`} size="lg" icon={<MessageSquareText />}>Request a price</Button>
          <Button href={whatsappUrl(`Hi OceanIndia, please quote: ${p.name}`)} size="lg" variant="whatsapp" icon={<MessageCircle />}>WhatsApp</Button>
          {wishBtn}
        </div>
        <p className="text-xs text-muted">Firm price and lead time usually within a few hours on working days.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex h-11 items-center rounded-full border border-line/15">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(minQty, q - 1))} className="px-3 py-2 hover:text-aqua disabled:opacity-40" disabled={qty <= minQty}><Minus className="h-4 w-4" /></button>
          <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">{qty}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} disabled={qty >= maxQty} className="px-3 py-2 hover:text-aqua disabled:opacity-40"><Plus className="h-4 w-4" /></button>
        </div>
        <Button type="button" size="lg" icon={<ShoppingBag />} onClick={() => add(p, qty)} disabled={out}>{out ? "Out of stock" : "Add to cart"}</Button>
        <Button type="button" size="lg" variant="secondary" icon={<Zap />} onClick={() => { add(p, qty, false); router.push("/checkout"); }} disabled={out}>Buy now</Button>
        {wishBtn}
      </div>
      {minQty > 1 && <p className="text-xs text-muted">Minimum order quantity: {minQty}.</p>}
      {low && !out && <p className="text-xs text-amber-400">Only {p.stock} left in stock — order soon.</p>}
      {out && <p className="text-xs text-amber-400">Currently on back-order. Add to wishlist or <a className="underline" href={whatsappUrl(`Hi OceanIndia, when will ${p.name} be back in stock?`)}>ask for ETA</a>.</p>}
    </div>
  );
}
