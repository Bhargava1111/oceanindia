"use client";

import * as React from "react";
import type { Product } from "@/data/products";

export type CartItem = { slug: string; name: string; brand: string; price: number; qty: number; hue?: number; image?: string };

type CartState = {
  items: CartItem[];
  wishlist: string[];
  open: boolean;
  add: (p: Product, qty?: number, openDrawer?: boolean) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  toggleWishlist: (slug: string) => void;
  setOpen: (v: boolean) => void;
  count: number;
  subtotal: number;
};

const CartContext = React.createContext<CartState | null>(null);
const KEY = "oceanindia:cart:v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  // Load once on the client. `hydrated` is state (not a ref) so the persist effect below
  // only runs after the loaded values are committed — otherwise an initial empty write
  // would wipe the saved cart (visible under React StrictMode's double effects).
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const d = JSON.parse(raw); setItems(d.items ?? []); setWishlist(d.wishlist ?? []); }
    } catch {}
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ items, wishlist }));
  }, [hydrated, items, wishlist]);

  const add = React.useCallback((p: Product, qty = 1, openDrawer = true) => {
    if (p.price == null) return;
    setItems((prev) => {
      const ex = prev.find((i) => i.slug === p.slug);
      if (ex) return prev.map((i) => (i.slug === p.slug ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { slug: p.slug, name: p.name, brand: p.brand, price: p.price as number, qty, hue: p.hue, image: p.image }];
    });
    if (openDrawer) setOpen(true);
  }, []);

  const remove = React.useCallback((slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug)), []);
  const setQty = React.useCallback((slug: string, qty: number) => setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i))), []);
  const clear = React.useCallback(() => setItems([]), []);
  const toggleWishlist = React.useCallback((slug: string) => setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug])), []);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, wishlist, open, add, remove, setQty, clear, toggleWishlist, setOpen, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
