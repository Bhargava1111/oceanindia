"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

export function Countdown({ endsAt, className, tileClass, label = "Offer ends in" }: { endsAt: string; className?: string; tileClass?: string; label?: string }) {
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const end = new Date(endsAt).getTime();
  const diff = now == null ? null : Math.max(0, end - now);
  const d = diff == null ? null : Math.floor(diff / 86400000);
  const h = diff == null ? null : Math.floor((diff % 86400000) / 3600000);
  const m = diff == null ? null : Math.floor((diff % 3600000) / 60000);
  const s = diff == null ? null : Math.floor((diff % 60000) / 1000);
  const ended = diff === 0;

  return (
    <div className={cn("inline-flex flex-col items-start gap-2", className)} role="timer" aria-live="off" aria-label={ended ? "Offer has ended" : `${label}: ${d} days ${h} hours ${m} minutes`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{ended ? "Offer ended — ask us about current pricing" : label}</p>
      <div className="flex gap-2 sm:gap-3">
        {[{ v: d, l: "days" }, { v: h, l: "hrs" }, { v: m, l: "min" }, { v: s, l: "sec" }].map((t) => (
          <div key={t.l} className={cn("glass rounded-2xl px-3 py-2 sm:px-4 sm:py-3 min-w-[3.5rem] sm:min-w-[4.5rem] text-center", tileClass)}>
            <p className="font-heading text-2xl sm:text-3xl font-bold tabular-nums leading-none">{t.v == null ? "--" : pad(t.v)}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">{t.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
