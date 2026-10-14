import * as React from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { cn } from "@/lib/utils";

type Variant = "aurora" | "grid" | "rings" | "waves" | "plain";
type Accent = "aqua" | "teal" | "violet";

const blobs: Record<Accent, [string, string]> = {
  aqua: ["bg-aqua/25", "bg-violet/20"],
  teal: ["bg-teal/25", "bg-aqua/15"],
  violet: ["bg-violet/30", "bg-teal/15"],
};

/**
 * Inner-page hero. Each page picks a different `variant` so no two pages share a backdrop.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  variant = "aurora",
  accent = "aqua",
  align = "left",
  size = "md",
  children,
  aside,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  variant?: Variant;
  accent?: Accent;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  const pad = { sm: "pt-28 lg:pt-36 pb-10", md: "pt-32 lg:pt-44 pb-14 md:pb-20", lg: "pt-36 lg:pt-52 pb-20 md:pb-28" }[size];
  return (
    <>
      <header className={cn("relative overflow-hidden -mt-20 lg:-mt-28", pad, variant === "waves" && "bg-bg-2", className)}>
        <div aria-hidden className="absolute inset-0 -z-10">
          {variant === "aurora" && (
            <>
              <span className={cn("absolute -top-32 right-[10%] h-[28rem] w-[28rem] rounded-full blur-3xl animate-drift motion-reduce:animate-none", blobs[accent][0])} />
              <span className={cn("absolute -bottom-40 left-[5%] h-[26rem] w-[26rem] rounded-full blur-3xl", blobs[accent][1])} />
            </>
          )}
          {variant === "grid" && (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--line)/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--line)/0.07)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
          )}
          {variant === "rings" && (
            <svg className="absolute -right-32 -top-40 h-[42rem] w-[42rem] opacity-50" viewBox="0 0 600 600" fill="none">
              <defs>
                <linearGradient id="ph-ring" x1="0" x2="600" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22D3EE" /><stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              {[280, 230, 180, 130, 80].map((r, i) => (
                <circle key={r} cx="300" cy="300" r={r} stroke="url(#ph-ring)" strokeWidth="1.2" opacity={0.25 + i * 0.12} className={i % 2 ? "animate-float motion-reduce:animate-none" : undefined} />
              ))}
            </svg>
          )}
          {variant === "waves" && <span className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(34_211_238/0.12),transparent_70%)]" />}
        </div>

        <div className={cn("container", aside && "grid gap-10 lg:grid-cols-12 lg:items-end")}>
          <div className={cn(aside && "lg:col-span-7", align === "center" && "mx-auto max-w-3xl text-center")}>
            {crumbs && <Breadcrumbs items={crumbs} className={cn("mb-6", align === "center" && "justify-center [&_ol]:justify-center")} />}
            {eyebrow && (
              <p className={cn("eyebrow mb-5", align === "center" && "justify-center")}>
                <span className="h-px w-6 bg-aqua inline-block" aria-hidden />{eyebrow}
              </p>
            )}
            <h1 className={size === "lg" ? "text-display" : "text-h1"}>{title}</h1>
            {description && <p className={cn("mt-5 max-w-2xl text-muted text-base md:text-lg leading-relaxed", align === "center" && "mx-auto")}>{description}</p>}
            {children && <div className={cn("mt-8", align === "center" && "flex justify-center")}>{children}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </header>
      {variant === "waves" && <WaveDivider tone="bg-2" />}
    </>
  );
}
