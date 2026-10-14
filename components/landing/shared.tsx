import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { LandingPage } from "@/data/landing";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { cn } from "@/lib/utils";

/* ---------- accent palette (static class strings so Tailwind can see them) ---------- */
export const accents = {
  aqua: { text: "text-aqua", bg: "bg-aqua", soft: "bg-aqua/15", border: "border-aqua/40", glow: "shadow-glow", hex: "#22D3EE", grad: "from-aqua to-teal", btn: "bg-aqua text-abyss", ring: "ring-aqua/40" },
  teal: { text: "text-teal", bg: "bg-teal", soft: "bg-teal/15", border: "border-teal/40", glow: "shadow-glow-teal", hex: "#2DD4BF", grad: "from-teal to-aqua", btn: "bg-teal text-abyss", ring: "ring-teal/40" },
  violet: { text: "text-violet", bg: "bg-violet", soft: "bg-violet/15", border: "border-violet/40", glow: "shadow-glow-violet", hex: "#8B5CF6", grad: "from-violet to-aqua", btn: "bg-violet text-white", ring: "ring-violet/40" },
  amber: { text: "text-amber-400", bg: "bg-amber-400", soft: "bg-amber-400/15", border: "border-amber-400/40", glow: "shadow-[0_0_0_1px_rgb(251_191_36/0.25),0_0_40px_-8px_rgb(251_191_36/0.6)]", hex: "#FBBF24", grad: "from-amber-400 to-rose-400", btn: "bg-amber-400 text-abyss", ring: "ring-amber-400/40" },
  rose: { text: "text-rose-400", bg: "bg-rose-400", soft: "bg-rose-400/15", border: "border-rose-400/40", glow: "shadow-[0_0_0_1px_rgb(251_113_133/0.25),0_0_40px_-8px_rgb(251_113_133/0.6)]", hex: "#FB7185", grad: "from-rose-400 to-violet", btn: "bg-rose-400 text-abyss", ring: "ring-rose-400/40" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-400", soft: "bg-emerald-400/15", border: "border-emerald-400/40", glow: "shadow-[0_0_0_1px_rgb(52_211_153/0.25),0_0_40px_-8px_rgb(52_211_153/0.6)]", hex: "#34D399", grad: "from-emerald-400 to-teal", btn: "bg-emerald-400 text-abyss", ring: "ring-emerald-400/40" },
} as const;

export type AccentKey = keyof typeof accents;
export const accentOf = (lp: LandingPage) => accents[lp.accent];

/* ---------- CTA link in the page accent ---------- */
export function CtaLink({ href, children, accent, size = "lg", variant = "solid", className }: { href: string; children: React.ReactNode; accent: AccentKey; size?: "md" | "lg"; variant?: "solid" | "outline"; className?: string }) {
  const a = accents[accent];
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:ring-2",
    size === "lg" ? "h-13 px-8 py-3.5 text-base" : "h-11 px-6 text-sm",
    variant === "solid" ? cn(a.btn, a.glow) : cn("border glass", a.border, a.text),
    a.ring,
    className,
  );
  const ext = /^https?:|^tel:|^mailto:/.test(href);
  return ext ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>{children}</a> : <Link href={href} className={cls}>{children}</Link>;
}

/* ---------- Benefits ---------- */
export function Benefits({ lp, variant = "grid", title, className }: { lp: LandingPage; variant?: "grid" | "list" | "tiles" | "numbered"; title?: React.ReactNode; className?: string }) {
  const a = accentOf(lp);
  return (
    <section className={cn("container py-14 md:py-20", className)} aria-labelledby="lp-benefits">
      <h2 id="lp-benefits" className="text-h2 max-w-2xl">{title ?? <>Why people <span className={a.text}>choose this.</span></>}</h2>
      {variant === "grid" && (
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lp.benefits.map((b) => (
            <RevealItem key={b.title} className="glass rounded-3xl p-6">
              <span className={cn("grid h-10 w-10 place-items-center rounded-2xl", a.soft, a.text)}><Check className="h-5 w-5" /></span>
              <h3 className="mt-4 font-heading text-lg font-bold">{b.title}</h3>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">{b.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
      {variant === "list" && (
        <RevealGroup as="ul" className="mt-8 grid gap-3 md:grid-cols-2">
          {lp.benefits.map((b) => (
            <RevealItem as="li" key={b.title} className="flex gap-4 rounded-2xl glass p-5">
              <span className={cn("mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full", a.bg, "text-abyss")}><Check className="h-4 w-4" /></span>
              <div><p className="font-heading font-semibold">{b.title}</p><p className="text-sm text-muted">{b.text}</p></div>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
      {variant === "tiles" && (
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
          {lp.benefits.map((b, i) => (
            <RevealItem key={b.title} className={cn("relative overflow-hidden rounded-3xl p-7 md:p-9 text-abyss", i % 2 === 0 ? `bg-gradient-to-br ${a.grad}` : "glass text-fg")}>
              <span aria-hidden className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
              <h3 className="font-heading text-2xl font-bold">{b.title}</h3>
              <p className={cn("mt-2 leading-relaxed", i % 2 === 0 ? "text-abyss/80" : "text-muted")}>{b.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
      {variant === "numbered" && (
        <RevealGroup as="ol" className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {lp.benefits.map((b, i) => (
            <RevealItem as="li" key={b.title} className="flex gap-5 border-t border-line/15 pt-5">
              <span className={cn("font-heading text-4xl font-bold tabular-nums", a.text)}>0{i + 1}</span>
              <div><h3 className="font-heading text-xl font-bold">{b.title}</h3><p className="mt-1.5 text-muted">{b.text}</p></div>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </section>
  );
}

/* ---------- Social proof ---------- */
export function Proof({ lp, variant = "strip", className }: { lp: LandingPage; variant?: "strip" | "cards"; className?: string }) {
  const a = accentOf(lp);
  if (variant === "strip") {
    return (
      <div className={cn("container", className)}>
        <Reveal className="glass rounded-3xl px-6 py-5 grid gap-4 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line/10">
          {lp.proof.map((p) => (
            <div key={p.label} className="pt-4 first:pt-0 sm:pt-0 sm:px-6 first:sm:pl-0 text-center">
              <p className={cn("font-heading text-3xl font-bold", a.text)}>{p.stat}</p>
              <p className="mt-0.5 text-xs uppercase tracking-wider text-muted">{p.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    );
  }
  return (
    <RevealGroup className={cn("grid grid-cols-3 gap-3", className)}>
      {lp.proof.map((p) => (
        <RevealItem key={p.label} className={cn("rounded-2xl p-4 text-center border", a.soft, a.border)}>
          <p className={cn("font-heading text-2xl font-bold", a.text)}>{p.stat}</p>
          <p className="mt-0.5 text-[11px] leading-tight text-muted">{p.label}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/* ---------- How it works ---------- */
export function Steps({ lp, variant = "horizontal", title, className }: { lp: LandingPage; variant?: "horizontal" | "vertical" | "chat"; title?: React.ReactNode; className?: string }) {
  const a = accentOf(lp);
  return (
    <section className={cn("py-14 md:py-20", className)} aria-labelledby="lp-steps">
      <div className="container">
        <h2 id="lp-steps" className="text-h2 max-w-2xl">{title ?? <>How it <span className={a.text}>works.</span></>}</h2>
        {variant === "horizontal" && (
          <RevealGroup as="ol" className="relative mt-10 grid gap-6 md:grid-cols-3">
            <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px md:block" style={{ backgroundImage: `linear-gradient(90deg, transparent, ${a.hex}80, transparent)` }} />
            {lp.steps.map((s, i) => (
              <RevealItem as="li" key={s.title} className="relative">
                <span className={cn("grid h-12 w-12 place-items-center rounded-2xl font-heading text-lg font-bold text-abyss", a.bg, a.glow)}>{i + 1}</span>
                <h3 className="mt-5 font-heading text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
        {variant === "vertical" && (
          <ol className="relative mt-10 border-l border-line/15 pl-8 space-y-8 max-w-2xl">
            {lp.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="relative">
                <span aria-hidden className={cn("absolute -left-[2.55rem] top-0 grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-abyss", a.bg)}>{i + 1}</span>
                <h3 className="font-heading text-xl font-bold">{s.title}</h3>
                <p className="mt-1.5 text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        )}
        {variant === "chat" && (
          <RevealGroup className="mt-10 max-w-xl space-y-4">
            {lp.steps.map((s, i) => (
              <RevealItem key={s.title} className={cn("flex", i % 2 === 1 ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[85%] rounded-3xl px-5 py-4", i % 2 === 1 ? cn("rounded-br-md text-abyss", a.bg) : "glass rounded-bl-md")}>
                  <p className="font-heading font-semibold">{s.title}</p>
                  <p className={cn("mt-1 text-sm", i % 2 === 1 ? "text-abyss/80" : "text-muted")}>{s.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function LandingFAQ({ lp, className }: { lp: LandingPage; className?: string }) {
  const a = accentOf(lp);
  return (
    <section className={cn("container py-14 md:py-20", className)} aria-labelledby="lp-faq">
      <div className="grid gap-8 lg:grid-cols-12">
        <h2 id="lp-faq" className="text-h2 lg:col-span-4">Questions, <span className={a.text}>answered.</span></h2>
        <Reveal className="lg:col-span-8"><Accordion items={lp.faqs} /></Reveal>
      </div>
      <JsonLd data={faqJsonLd(lp.faqs)} />
    </section>
  );
}

/* ---------- Lead form section ---------- */
export function LeadSection({ lp, title, text, product, showCompany, className, compact }: { lp: LandingPage; title?: React.ReactNode; text?: string; product?: string; showCompany?: boolean; className?: string; compact?: boolean }) {
  const a = accentOf(lp);
  return (
    <section id="lead" className={cn("container py-14 md:py-20 scroll-mt-24", className)} aria-labelledby="lp-lead">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <p className={cn("eyebrow mb-4", a.text)}>{lp.eyebrow}</p>
          <h2 id="lp-lead" className="text-h2">{title ?? <>Ready? <span className={a.text}>{lp.cta}.</span></>}</h2>
          <p className="mt-4 text-muted">{text ?? "Thirty seconds to fill in. A real engineer replies within working hours — no automated follow-ups."}</p>
          <Proof lp={lp} variant="cards" className="mt-8" />
        </div>
        <div className="lg:col-span-7">
          <LeadForm source={`lp:${lp.slug}`} interestOptions={lp.interestOptions} product={product} showCompany={showCompany} cta={lp.cta} compact={compact} />
        </div>
      </div>
    </section>
  );
}

export function ArrowCta() {
  return <ArrowRight className="h-4 w-4" />;
}
