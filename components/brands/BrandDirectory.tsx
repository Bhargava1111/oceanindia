"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import type { Brand } from "@/data/brands";
import { cn } from "@/lib/utils";

export function BrandDirectory({ brands }: { brands: Brand[] }) {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState<string>("All");
  const cats = ["All", ...Array.from(new Set(brands.map((b) => b.category))).sort()];
  const list = brands.filter((b) => (cat === "All" || b.category === cat) && b.name.toLowerCase().includes(q.trim().toLowerCase()));
  const groups = list.reduce<Record<string, Brand[]>>((acc, b) => {
    const k = /^[0-9]/.test(b.name) ? "#" : b.name[0].toUpperCase();
    (acc[k] ||= []).push(b);
    return acc;
  }, {});
  const letters = Object.keys(groups).sort();

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative md:max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a brand…" aria-label="Search brands" className="w-full rounded-full border border-line/15 bg-bg-2/60 py-2.5 pl-11 pr-4 text-sm outline-none focus:border-aqua focus:ring-2 focus:ring-aqua/30" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs transition", cat === c ? "border-aqua bg-aqua/15 text-aqua" : "border-line/15 hover:border-aqua/60")}>{c}</button>
          ))}
        </div>
      </div>

      <nav aria-label="Jump to letter" className="mt-8 hidden md:flex flex-wrap gap-1">
        {letters.map((l) => <a key={l} href={`#brand-${l}`} className="grid h-8 w-8 place-items-center rounded-lg text-xs font-semibold text-muted hover:bg-aqua/10 hover:text-aqua">{l}</a>)}
      </nav>

      <p className="mt-6 text-sm text-muted tabular-nums" aria-live="polite">{list.length} brands</p>

      <div className="mt-4 space-y-10">
        {letters.map((l) => (
          <section key={l} id={`brand-${l}`} className="grid gap-4 md:grid-cols-12 scroll-mt-32">
            <h2 className="md:col-span-1 font-heading text-4xl font-bold text-gradient">{l}</h2>
            <ul className="md:col-span-11 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {groups[l].map((b) => (
                <li key={b.name}>
                  <Link href={`/store?brand=${encodeURIComponent(b.name)}`} className={cn("group flex items-center justify-between rounded-2xl glass px-4 py-3 transition hover:-translate-y-0.5", b.tier === "flagship" && "border-gradient")}>
                    <span>
                      <span className="block font-heading font-semibold group-hover:text-aqua">{b.name}</span>
                      <span className="block text-xs text-muted">{b.category}</span>
                    </span>
                    {b.tier === "flagship" && <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-label="Flagship brand" />}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {letters.length === 0 && <p className="glass rounded-3xl p-8 text-center text-muted">No brand matches. We may still source it — ask us.</p>}
      </div>
    </div>
  );
}
