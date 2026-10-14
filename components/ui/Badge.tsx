import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "aqua" | "teal" | "violet" | "neutral" | "success" | "warning";

const tones: Record<Tone, string> = {
  aqua: "bg-aqua/15 text-aqua border-aqua/30",
  teal: "bg-teal/15 text-teal border-teal/30",
  violet: "bg-violet/15 text-violet border-violet/30",
  neutral: "bg-fg/5 text-muted border-line/15",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export function Badge({ tone = "neutral", className, children, ...rest }: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider", tones[tone], className)} {...rest}>
      {children}
    </span>
  );
}
