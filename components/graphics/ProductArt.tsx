import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

/**
 * Original generative SVG artwork used as a product-image placeholder.
 * Deterministic per product (hue + slug hash) so cards stay stable.
 */
export function ProductArt({ product, className }: { product: Pick<Product, "slug" | "hue" | "category" | "name">; className?: string }) {
  const hue = product.hue ?? 190;
  let h = 0;
  for (const ch of product.slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const r1 = 18 + (h % 14);
  const r2 = 30 + ((h >> 3) % 20);
  const bars = Array.from({ length: 9 }, (_, i) => 12 + (((h >> (i * 2)) % 37) + i * 3) % 46);
  const id = `pa-${product.slug}`;
  return (
    <svg viewBox="0 0 400 300" className={cn("h-full w-full", className)} role="img" aria-label={`Illustration for ${product.name}`}>
      <defs>
        <radialGradient id={`${id}-bg`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={`hsl(${hue} 85% 55% / 0.55)`} />
          <stop offset="60%" stopColor={`hsl(${(hue + 40) % 360} 70% 40% / 0.25)`} />
          <stop offset="100%" stopColor="#050B1A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-bar`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={`hsl(${hue} 90% 60%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 60) % 360} 90% 70%)`} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      <circle cx={260 + (h % 40)} cy={110 + ((h >> 5) % 40)} r={r2} fill="none" stroke={`hsl(${hue} 90% 70% / 0.5)`} strokeWidth="1.5" />
      <circle cx={260 + (h % 40)} cy={110 + ((h >> 5) % 40)} r={r1} fill={`hsl(${hue} 90% 65% / 0.35)`} />
      <g transform="translate(60 200)">
        {bars.map((b, i) => (
          <rect key={i} x={i * 30} y={-b} width="16" height={b} rx="6" fill={`url(#${id}-bar)`} opacity={0.75} />
        ))}
      </g>
      <path d="M0 250c50-30 100-30 150 0s100 30 150 0 100-30 100 0v50H0z" fill={`hsl(${hue} 80% 50% / 0.18)`} />
    </svg>
  );
}
