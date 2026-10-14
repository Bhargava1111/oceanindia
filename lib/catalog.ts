import type { Product } from "@/data/products";

/** Stock status: explicit `stock` count wins; otherwise fall back to the `inStock` flag. */
export const isInStock = (p: Pick<Product, "stock" | "inStock">) => (typeof p.stock === "number" ? p.stock > 0 : p.inStock !== false);

export const isLowStock = (p: Pick<Product, "stock" | "lowStockAt">, threshold = 3) =>
  typeof p.stock === "number" && p.stock > 0 && p.stock <= (p.lowStockAt ?? threshold);

export const discountPct = (p: Pick<Product, "price" | "mrp">) =>
  p.price != null && p.mrp && p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
