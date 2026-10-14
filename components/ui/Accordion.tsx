"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items, className }: { items: { q: string; a: string }[]; className?: string }) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className={cn("divide-y divide-line/10 rounded-3xl glass", className)}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const id = `acc-${i}`;
        return (
          <div key={it.q}>
            <button
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-heading font-semibold text-base md:text-lg">{it.q}</span>
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className={cn("shrink-0 rounded-full p-1.5 border border-line/15", isOpen && "bg-aqua text-abyss border-aqua")}>
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={id} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="px-6 pb-6 text-muted leading-relaxed">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
