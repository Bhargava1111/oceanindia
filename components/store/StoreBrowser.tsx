"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Search, PackageSearch, MessageCircle, ChevronDown } from "lucide-react";
import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";
import { isInStock } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useSite } from "@/components/layout/SiteProvider";
import { cn, formatINR } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "discount" | "name" | "newest";

const sortOptions: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "New arrivals" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "discount", label: "Biggest discount" },
  { id: "name", label: "Name A–Z" },
];

const pricePresets = [
  { label: "Under ₹10k", min: 0, max: 10000 },
  { label: "₹10k – ₹50k", min: 10000, max: 50000 },
  { label: "₹50k – ₹2L", min: 50000, max: 200000 },
  { label: "₹2L+", min: 200000, max: 0 },
];

const tagOptions = [
  { id: "new", label: "New" },
  { id: "bestseller", label: "Bestseller" },
  { id: "combo", label: "Combo" },
  { id: "offer", label: "On offer" },
  { id: "pre-owned", label: "Pre-owned" },
];

/** Virtual categories that collect products by badge rather than by category slug. */
const badgeCategories: Record<string, NonNullable<Product["badges"]>[number]> = {
  "combo-offers": "combo",
  "special-offers": "offer",
  "pre-owned": "pre-owned",
};

const parseList = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function StoreBrowser({ products, category, categories }: { products: Product[]; category?: Category; categories: Category[] }) {
  const { whatsappUrl } = useSite();
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const q = sp.get("q") ?? "";
  const cats = parseList(sp.get("cat"));
  const subs = parseList(sp.get("sub"));
  const brandsSel = parseList(sp.get("brand"));
  const tags = parseList(sp.get("tag"));
  const min = Number(sp.get("min")) || 0;
  const max = Number(sp.get("max")) || 0;
  const stock = sp.get("stock") === "1";
  const sort = (sp.get("sort") as Sort) || "featured";

  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [qInput, setQInput] = React.useState(q);
  React.useEffect(() => setQInput(q), [q]);

  const update = React.useCallback(
    (patch: Record<string, string | undefined>) => {
      const next = new URLSearchParams(sp.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (!v) next.delete(k);
        else next.set(k, v);
      }
      const qs = next.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [sp, router, pathname],
  );

  const toggleIn = (key: string, list: string[], value: string) =>
    update({ [key]: (list.includes(value) ? list.filter((x) => x !== value) : [...list, value]).join(",") || undefined });

  const badge = category ? badgeCategories[category.slug] : undefined;
  const pool = React.useMemo(
    () => (category ? products.filter((p) => p.category === category.slug || (badge && p.badges?.includes(badge))) : products),
    [products, category, badge],
  );

  const brandOptions = React.useMemo(() => Array.from(new Set(pool.map((p) => p.brand))).sort((a, b) => a.localeCompare(b)), [pool]);
  const catOptions = React.useMemo(() => (category ? [] : categories.filter((c) => pool.some((p) => p.category === c.slug))), [pool, category, categories]);
  const subOptions = React.useMemo(() => category?.children?.filter((ch) => pool.some((p) => p.subcategory === ch.slug)) ?? [], [pool, category]);

  const list = React.useMemo(() => {
    const t = q.trim().toLowerCase();
    const out = pool.filter((p) => {
      if (t && !`${p.name} ${p.brand} ${p.short} ${p.description} ${p.category} ${p.subcategory ?? ""}`.toLowerCase().includes(t)) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (subs.length && !(p.subcategory && subs.includes(p.subcategory))) return false;
      if (brandsSel.length && !brandsSel.includes(p.brand)) return false;
      if (tags.length && !p.badges?.some((b) => tags.includes(b))) return false;
      if (stock && !isInStock(p)) return false;
      if (min || max) {
        if (p.price == null) return false;
        if (min && p.price < min) return false;
        if (max && p.price > max) return false;
      }
      return true;
    });
    const disc = (p: Product) => (p.price && p.mrp ? (p.mrp - p.price) / p.mrp : 0);
    const score = (p: Product) => (p.badges?.includes("bestseller") ? 3 : 0) + (p.badges?.includes("new") ? 2 : 0) + (p.rating ?? 0) / 5;
    switch (sort) {
      case "price-asc": return out.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      case "price-desc": return out.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
      case "discount": return out.sort((a, b) => disc(b) - disc(a));
      case "name": return out.sort((a, b) => a.name.localeCompare(b.name));
      case "newest": return out.sort((a, b) => Number(!!b.badges?.includes("new")) - Number(!!a.badges?.includes("new")));
      default: return out.sort((a, b) => score(b) - score(a));
    }
  }, [pool, q, cats, subs, brandsSel, tags, stock, min, max, sort]);

  const activeCount = cats.length + subs.length + brandsSel.length + tags.length + (min || max ? 1 : 0) + (stock ? 1 : 0);
  const clearAll = () => update({ cat: undefined, sub: undefined, brand: undefined, tag: undefined, min: undefined, max: undefined, stock: undefined });

  const chips: { label: string; onRemove: () => void }[] = [
    ...cats.map((c) => ({ label: categories.find((x) => x.slug === c)?.name ?? c, onRemove: () => toggleIn("cat", cats, c) })),
    ...subs.map((s) => ({ label: category?.children?.find((x) => x.slug === s)?.name ?? s, onRemove: () => toggleIn("sub", subs, s) })),
    ...brandsSel.map((b) => ({ label: b, onRemove: () => toggleIn("brand", brandsSel, b) })),
    ...tags.map((t) => ({ label: tagOptions.find((x) => x.id === t)?.label ?? t, onRemove: () => toggleIn("tag", tags, t) })),
    ...(min || max ? [{ label: `${min ? formatINR(min) : "₹0"} – ${max ? formatINR(max) : "any"}`, onRemove: () => update({ min: undefined, max: undefined }) }] : []),
    ...(stock ? [{ label: "In stock", onRemove: () => update({ stock: undefined }) }] : []),
  ];

  const FilterPanel = (
    <div className="space-y-7">
      {catOptions.length > 0 && (
        <FilterGroup title="Category">
          {catOptions.map((c) => (
            <Check key={c.slug} label={c.name} count={pool.filter((p) => p.category === c.slug).length} checked={cats.includes(c.slug)} onChange={() => toggleIn("cat", cats, c.slug)} />
          ))}
        </FilterGroup>
      )}
      {subOptions.length > 0 && (
        <FilterGroup title="Type">
          {subOptions.map((s) => (
            <Check key={s.slug} label={s.name} count={pool.filter((p) => p.subcategory === s.slug).length} checked={subs.includes(s.slug)} onChange={() => toggleIn("sub", subs, s.slug)} />
          ))}
        </FilterGroup>
      )}
      <FilterGroup title="Brand">
        <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
          {brandOptions.map((b) => (
            <Check key={b} label={b} count={pool.filter((p) => p.brand === b).length} checked={brandsSel.includes(b)} onChange={() => toggleIn("brand", brandsSel, b)} />
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Price">
        <div className="flex flex-wrap gap-2">
          {pricePresets.map((pp) => {
            const active = min === pp.min && max === pp.max;
            return (
              <button key={pp.label} type="button" onClick={() => (active ? update({ min: undefined, max: undefined }) : update({ min: pp.min ? String(pp.min) : undefined, max: pp.max ? String(pp.max) : undefined }))} className={cn("rounded-full border px-3 py-1.5 text-xs transition", active ? "border-aqua bg-aqua/15 text-aqua" : "border-line/15 hover:border-aqua/60")}>
                {pp.label}
              </button>
            );
          })}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <label className="text-xs text-muted">Min<input type="number" inputMode="numeric" min={0} value={min || ""} onChange={(e) => update({ min: e.target.value || undefined })} placeholder="₹0" className="mt-1 w-full rounded-xl border border-line/15 bg-bg-2/60 px-3 py-2 text-sm text-fg outline-none focus:border-aqua" /></label>
          <label className="text-xs text-muted">Max<input type="number" inputMode="numeric" min={0} value={max || ""} onChange={(e) => update({ max: e.target.value || undefined })} placeholder="Any" className="mt-1 w-full rounded-xl border border-line/15 bg-bg-2/60 px-3 py-2 text-sm text-fg outline-none focus:border-aqua" /></label>
        </div>
      </FilterGroup>
      <FilterGroup title="Tags">
        {tagOptions.filter((t) => pool.some((p) => p.badges?.includes(t.id as never))).map((t) => (
          <Check key={t.id} label={t.label} count={pool.filter((p) => p.badges?.includes(t.id as never)).length} checked={tags.includes(t.id)} onChange={() => toggleIn("tag", tags, t.id)} />
        ))}
        <Check label="In stock only" checked={stock} onChange={() => update({ stock: stock ? undefined : "1" })} />
      </FilterGroup>
      {activeCount > 0 && <button type="button" onClick={clearAll} className="text-sm text-aqua hover:underline">Clear all filters</button>}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-32 glass rounded-3xl p-6">
          <h2 className="font-heading font-bold mb-5 flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-aqua" />Filters</h2>
          {FilterPanel}
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <form onSubmit={(e) => { e.preventDefault(); update({ q: qInput.trim() || undefined }); }} className="relative flex-1 md:max-w-md" role="search">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder={category ? `Search in ${category.name}…` : "Search products, brands…"} aria-label="Search products" className="w-full rounded-full border border-line/15 bg-bg-2/60 py-2.5 pl-11 pr-10 text-sm outline-none focus:border-aqua focus:ring-2 focus:ring-aqua/30" />
            {q && <button type="button" aria-label="Clear search" onClick={() => update({ q: undefined })} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-fg"><X className="h-4 w-4" /></button>}
          </form>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm text-muted mr-auto md:mr-2 tabular-nums" aria-live="polite">{list.length} {list.length === 1 ? "product" : "products"}</p>
            <label className="sr-only" htmlFor="sort">Sort by</label>
            <div className="relative">
              <Select id="sort" value={sort} onChange={(e) => update({ sort: e.target.value === "featured" ? undefined : e.target.value })} className="w-auto rounded-full py-2 pr-9">
                {sortOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
              </Select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            </div>
            <button type="button" onClick={() => setFiltersOpen(true)} className="lg:hidden inline-flex h-10 items-center gap-2 rounded-full border border-line/15 px-4 text-sm glass">
              <SlidersHorizontal className="h-4 w-4" />Filters{activeCount > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-aqua text-[10px] font-bold text-abyss">{activeCount}</span>}
            </button>
          </div>
        </div>

        {(chips.length > 0 || q) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {q && <span className="inline-flex items-center gap-1 rounded-full bg-violet/15 px-3 py-1 text-xs text-violet">“{q}”<button aria-label="Clear search" onClick={() => update({ q: undefined })}><X className="h-3 w-3" /></button></span>}
            {chips.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-1 rounded-full bg-aqua/15 px-3 py-1 text-xs text-aqua">{c.label}<button aria-label={`Remove ${c.label}`} onClick={c.onRemove}><X className="h-3 w-3" /></button></span>
            ))}
            {chips.length > 1 && <button onClick={clearAll} className="text-xs text-muted hover:text-fg underline-offset-4 hover:underline">Clear all</button>}
          </div>
        )}

        {list.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-3 md:gap-5 xl:grid-cols-3">
            {list.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        ) : (
          <div className="mt-6 glass rounded-3xl p-10 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-aqua/10 text-aqua"><PackageSearch className="h-7 w-7" /></span>
            <h3 className="mt-5 font-heading text-xl font-bold">Nothing matches those filters.</h3>
            <p className="mt-2 text-sm text-muted max-w-md mx-auto">We stock 1,800+ products but only a curated set is listed online. Tell us what you need and we’ll quote it — usually the same day.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="outline" onClick={() => { clearAll(); update({ q: undefined }); }}>Reset filters</Button>
              <Button href={whatsappUrl(`Hi OceanIndia, do you have: ${q || "…"}`)} variant="whatsapp" icon={<MessageCircle />}>Ask on WhatsApp</Button>
            </div>
          </div>
        )}
      </div>

      <Modal open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters" side>
        {FilterPanel}
        <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 border-t border-line/10 bg-bg-2/80 p-4 backdrop-blur">
          <Button className="w-full" onClick={() => setFiltersOpen(false)}>Show {list.length} products</Button>
        </div>
      </Modal>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">{title}</legend>
      <div className="space-y-1">{children}</div>
    </fieldset>
  );
}

function Check({ label, count, checked, onChange }: { label: string; count?: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-2 py-1.5 text-sm hover:bg-fg/5">
      <span className="inline-flex items-center gap-2.5">
        <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-line/30 bg-transparent text-aqua accent-[#22D3EE]" />
        <span className={cn(checked && "text-fg font-medium")}>{label}</span>
      </span>
      {count != null && <span className="text-xs text-muted tabular-nums">{count}</span>}
    </label>
  );
}
