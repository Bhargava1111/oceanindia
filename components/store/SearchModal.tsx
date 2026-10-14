"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, CornerDownLeft } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import type { SearchIndex } from "@/components/layout/SiteChrome";
import { formatINR } from "@/lib/utils";

export function SearchModal({ open, onClose, index }: { open: boolean; onClose: () => void; index: SearchIndex }) {
  const { products, categories, solutions } = index;
  const [q, setQ] = React.useState("");
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); else setQ(""); }, [open]);

  const term = q.trim().toLowerCase();
  const prod = term ? products.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(term)).slice(0, 6) : [];
  const cats = term ? categories.filter((c) => c.name.toLowerCase().includes(term)).slice(0, 3) : [];
  const sols = term ? solutions.filter((s) => s.name.toLowerCase().includes(term)).slice(0, 3) : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term) return;
    router.push(`/store?q=${encodeURIComponent(q.trim())}`);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Search OceanIndia" className="max-w-2xl">
      <form onSubmit={submit} className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search microphones, monitors, brands, solutions…"
          className="w-full rounded-2xl border border-line/15 bg-bg-2/60 py-4 pl-12 pr-12 text-base outline-none focus:border-aqua focus:ring-2 focus:ring-aqua/30"
          aria-label="Search"
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded border border-line/20 px-1.5 py-0.5 text-[10px] text-muted"><CornerDownLeft className="h-3 w-3" />Enter</kbd>
      </form>
      {term ? (
        <div className="mt-4 space-y-5 max-h-[50vh] overflow-y-auto pr-1">
          {prod.length > 0 && (
            <div>
              <p className="eyebrow text-[10px] mb-2">Products</p>
              <ul className="space-y-1">
                {prod.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/product/${p.slug}`} onClick={onClose} className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-aqua/10">
                      <span><span className="block text-sm font-medium">{p.name}</span><span className="text-xs text-muted">{p.brand}</span></span>
                      <span className="text-sm tabular-nums text-muted">{p.price ? formatINR(p.price) : "On request"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cats.length > 0 && (
            <div>
              <p className="eyebrow text-[10px] mb-2">Categories</p>
              {cats.map((c) => <Link key={c.slug} href={`/store/${c.slug}`} onClick={onClose} className="flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-aqua/10">{c.name}<ArrowRight className="h-4 w-4 text-aqua" /></Link>)}
            </div>
          )}
          {sols.length > 0 && (
            <div>
              <p className="eyebrow text-[10px] mb-2">Solutions</p>
              {sols.map((s) => <Link key={s.slug} href={`/solutions/${s.slug}`} onClick={onClose} className="flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-aqua/10">{s.name}<ArrowRight className="h-4 w-4 text-aqua" /></Link>)}
            </div>
          )}
          {prod.length + cats.length + sols.length === 0 && <p className="text-sm text-muted px-3">No matches. Press Enter to search the full store, or ask us on WhatsApp.</p>}
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {["Condenser mic", "Studio monitors", "Audio interface", "Headphones", "Podcast", "Home theatre"].map((t) => (
            <button key={t} onClick={() => setQ(t)} className="rounded-full border border-line/15 px-3 py-1.5 text-xs hover:border-aqua hover:text-aqua">{t}</button>
          ))}
        </div>
      )}
    </Modal>
  );
}
