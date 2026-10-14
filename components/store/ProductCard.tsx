"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, MessageSquareText, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "./CartProvider";
import { ProductArt } from "@/components/graphics/ProductArt";
import { Badge } from "@/components/ui/Badge";
import { cn, discountPercent, formatINR } from "@/lib/utils";
import { isInStock } from "@/lib/catalog";

const badgeTone = { new: "aqua", bestseller: "teal", combo: "violet", offer: "warning", "pre-owned": "neutral" } as const;

export function ProductCard({ product: p, className }: { product: Product; className?: string }) {
  const { add, toggleWishlist, wishlist } = useCart();
  const wished = wishlist.includes(p.slug);
  const off = p.price ? discountPercent(p.price, p.mrp) : 0;

  return (
    <article className={cn("group relative flex flex-col overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-1 hover:shadow-glow", className)}>
      <Link href={`/product/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-bg-2/40">
        {p.image ? (
          <Image src={p.image} alt={p.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><ProductArt product={p} /></div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {p.badges?.map((b) => <Badge key={b} tone={badgeTone[b]}>{b}</Badge>)}
          {off > 0 && <Badge tone="success">{off}% off</Badge>}
          {!isInStock(p) && <Badge tone="neutral">Back-order</Badge>}
        </div>
      </Link>
      <button
        aria-pressed={wished}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWishlist(p.slug)}
        className={cn("absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass transition", wished ? "text-rose-400" : "text-muted hover:text-rose-400")}
      >
        <Heart className={cn("h-4 w-4", wished && "fill-current")} />
      </button>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{p.brand}</p>
        <Link href={`/product/${p.slug}`} className="mt-1 line-clamp-2 font-heading font-semibold leading-snug hover:text-aqua">{p.name}</Link>
        <p className="mt-1 line-clamp-1 text-xs text-muted">{p.short}</p>
        {p.rating && (
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{p.rating.toFixed(1)}</p>
        )}
        <div className="mt-auto pt-4 flex items-end justify-between gap-2">
          <div>
            {p.price ? (
              <>
                <p className="font-heading text-base font-bold tabular-nums sm:text-lg">{formatINR(p.price)}</p>
                {p.mrp && p.mrp > p.price && <p className="text-xs text-muted line-through tabular-nums">{formatINR(p.mrp)}</p>}
              </>
            ) : (
              <p className="font-heading text-sm font-bold text-aqua sm:text-base">Price on request</p>
            )}
          </div>
          {p.price ? (
            <button onClick={() => add(p)} disabled={!isInStock(p)} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-aqua px-3.5 text-sm font-semibold text-abyss hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed" aria-label={`Add ${p.name} to cart`}>
              <ShoppingBag className="h-4 w-4" /><span className="hidden sm:inline">Add</span>
            </button>
          ) : (
            <Link href={`/quote?product=${encodeURIComponent(p.name)}`} className="inline-flex h-10 items-center gap-1.5 rounded-full border border-aqua/50 px-3.5 text-sm font-semibold text-aqua hover:bg-aqua/10 transition">
              <MessageSquareText className="h-4 w-4" /><span className="hidden sm:inline">Quote</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
