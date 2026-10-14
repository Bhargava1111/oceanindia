import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatINR = (value: number, opts: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0, ...opts }).format(value);

export const discountPercent = (price: number, mrp?: number) =>
  mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const accentClasses = {
  aqua: { text: "text-aqua", bg: "bg-aqua", ring: "ring-aqua/40", glow: "shadow-glow", from: "from-aqua", soft: "bg-aqua/10" },
  teal: { text: "text-teal", bg: "bg-teal", ring: "ring-teal/40", glow: "shadow-glow-teal", from: "from-teal", soft: "bg-teal/10" },
  violet: { text: "text-violet", bg: "bg-violet", ring: "ring-violet/40", glow: "shadow-glow-violet", from: "from-violet", soft: "bg-violet/10" },
} as const;

export type Accent = keyof typeof accentClasses;
