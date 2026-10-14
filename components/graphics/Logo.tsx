import Link from "next/link";
import { cn } from "@/lib/utils";

/** Original OceanIndia wordmark: a wave glyph + Space Grotesk text. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-9 w-9", className)} aria-hidden fill="none">
      <defs>
        <linearGradient id="oi-g" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22D3EE" />
          <stop offset="0.55" stopColor="#2DD4BF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="14" stroke="url(#oi-g)" strokeWidth="2" />
      <path d="M9 30c4-6 8-6 12 0s8 6 12 0 8-6 12 0" stroke="url(#oi-g)" strokeWidth="3" strokeLinecap="round" />
      <path d="M9 21c4-6 8-6 12 0s8 6 12 0 8-6 12 0" stroke="url(#oi-g)" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <circle cx="35" cy="13" r="3" fill="url(#oi-g)" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" aria-label="OceanIndia home" className={cn("inline-flex items-center gap-2.5 group", className)}>
      <LogoMark className="transition-transform duration-500 group-hover:rotate-[8deg]" />
      {!compact && (
        <span className="hidden min-[360px]:inline font-heading text-lg sm:text-xl font-bold tracking-tight leading-none">
          Ocean<span className="text-gradient">India</span>
        </span>
      )}
    </Link>
  );
}
