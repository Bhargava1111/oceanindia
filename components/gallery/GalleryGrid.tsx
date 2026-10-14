"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function GalleryGrid({ projects, types }: { projects: Project[]; types: string[] }) {
  const [type, setType] = React.useState("All");
  const [active, setActive] = React.useState<Project | null>(null);
  const reduce = useReducedMotion();
  const list = type === "All" ? projects : projects.filter((p) => p.type === type);

  return (
    <div>
      <div role="tablist" aria-label="Filter projects" className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {["All", ...types].map((t) => (
          <button key={t} role="tab" aria-selected={type === t} onClick={() => setType(t)} className={cn("whitespace-nowrap rounded-full border px-4 py-2 text-sm transition", type === t ? "border-aqua bg-aqua/15 text-aqua" : "border-line/15 glass hover:border-aqua/60")}>{t}</button>
        ))}
      </div>

      <motion.ul layout className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li key={p.slug} layout={!reduce} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }} className="break-inside-avoid">
              <button onClick={() => setActive(p)} className="group block w-full text-left rounded-3xl overflow-hidden glass transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
                {/* IMAGE SLOT: set `image` in data/projects.ts */}
                <ImageSlot src={p.image} alt={`${p.title}, ${p.city}`} label={p.type} hue={p.hue} aspect={p.aspect} className="rounded-none" />
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-aqua">{p.type} · {p.year}</p>
                  <h3 className="mt-1 font-heading text-lg font-bold leading-snug group-hover:text-aqua">{p.title}</h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted"><MapPin className="h-3 w-3" />{p.city}</p>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title} className="max-w-3xl">
        {active && (
          <div className="grid gap-6 md:grid-cols-2">
            <ImageSlot src={active.image} alt={`${active.title}, ${active.city}`} label={active.type} hue={active.hue} aspect="aspect-[4/3]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-aqua">{active.type} · {active.city} · {active.year}</p>
              <p className="mt-3 text-muted leading-relaxed">{active.summary}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Scope</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">{active.scope.map((s) => <li key={s} className="rounded-full bg-fg/5 px-2.5 py-1 text-xs">{s}</li>)}</ul>
              <Button href="/quote" size="sm" className="mt-6">Plan a similar room</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
