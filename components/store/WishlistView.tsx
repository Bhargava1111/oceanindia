"use client";

import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "./CartProvider";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/Button";

export function WishlistView({ products }: { products: Product[] }) {
  const { wishlist, add } = useCart();
  const list = products.filter((p) => wishlist.includes(p.slug));
  const priced = list.filter((p) => p.price != null);

  if (list.length === 0) {
    return (
      <div className="glass rounded-3xl p-12 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-rose-500/15 text-rose-400"><Heart className="h-7 w-7" /></span>
        <h2 className="mt-5 font-heading text-xl font-bold">Nothing saved yet.</h2>
        <p className="mt-2 text-sm text-muted max-w-sm mx-auto">Tap the heart on any product to keep it here. Your list is stored on this device.</p>
        <Button href="/store" className="mt-6">Browse the store</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="text-sm text-muted">{list.length} saved {list.length === 1 ? "item" : "items"}</p>
        {priced.length > 0 && <Button size="sm" icon={<ShoppingBag />} onClick={() => priced.forEach((p, i) => add(p, 1, i === priced.length - 1))}>Add all priced items to cart</Button>}
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  );
}
