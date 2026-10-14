"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div role="tablist" className={cn("inline-flex rounded-full glass p-1 gap-1 max-w-full overflow-x-auto no-scrollbar", className)}>
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={cn("relative rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors", active ? "text-abyss" : "text-muted hover:text-fg")}
          >
            {active && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-aqua to-teal" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            <span className="relative z-10">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
