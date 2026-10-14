import { ArrowRight, Check, Minus, Quote } from "lucide-react";
import type { LandingPage } from "@/data/landing";
import type { Testimonial } from "@/data/testimonials";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { LogoMark } from "@/components/graphics/Logo";
import { StickyCTA } from "../StickyCTA";
import { Benefits, CtaLink, LandingFAQ, LeadSection, Proof, Steps, accentOf } from "../shared";
import { cn } from "@/lib/utils";

/** Comparison: editorial hero, then a bold two-column comparison table. */
export function ComparisonLayout({ lp, testimonials, brandName }: { lp: LandingPage; testimonials: Testimonial[]; brandName: string }) {
  const a = accentOf(lp);
  const quotes = [testimonials[3], testimonials[5], testimonials[0]];
  return (
    <>
      <section className="relative -mt-20 lg:-mt-28 pt-32 lg:pt-44 pb-14 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className={cn("absolute left-[-10%] top-[-10%] h-[36rem] w-[36rem] rounded-full blur-3xl opacity-50", a.soft)} />
          <span className="absolute right-[-5%] bottom-[-20%] h-[28rem] w-[28rem] rounded-full bg-violet/15 blur-3xl" />
        </div>
        <div className="container max-w-4xl">
          <p className={cn("eyebrow mb-6", a.text)}>{lp.eyebrow}</p>
          <h1 className="text-display-xl">{lp.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted">{lp.subheadline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href="#lead" accent={lp.accent}>{lp.cta}<ArrowRight className="h-4 w-4" /></CtaLink>
            <CtaLink href="#compare" accent={lp.accent} variant="outline">See the comparison</CtaLink>
          </div>
        </div>
      </section>

      {lp.comparison && (
        <section id="compare" className="container pb-14 md:pb-20 scroll-mt-28" aria-labelledby="lp-compare">
          <h2 id="lp-compare" className="sr-only">{brandName} compared with marketplaces</h2>
          <Reveal className="overflow-x-auto rounded-[2rem] glass border-gradient">
            <div className="min-w-[40rem]">
            <div className="grid grid-cols-[1.1fr_1.4fr_1.2fr] md:grid-cols-[1fr_1.6fr_1.2fr] border-b border-line/10 text-xs font-semibold uppercase tracking-wider text-muted">
              <div className="px-4 py-4 md:px-6">What matters</div>
              <div className={cn("px-4 py-4 md:px-6 flex items-center gap-2 text-fg", a.soft)}><LogoMark className="h-5 w-5" />{brandName}</div>
              <div className="px-4 py-4 md:px-6">Marketplaces / grey</div>
            </div>
            <RevealGroup as="ul" className="divide-y divide-line/10">
              {lp.comparison.map((row) => (
                <RevealItem as="li" key={row.label} className="grid grid-cols-[1.1fr_1.4fr_1.2fr] md:grid-cols-[1fr_1.6fr_1.2fr] text-sm">
                  <div className="px-4 py-4 md:px-6 font-heading font-semibold">{row.label}</div>
                  <div className={cn("px-4 py-4 md:px-6 flex items-start gap-2", a.soft)}><Check className={cn("mt-0.5 h-4 w-4 shrink-0", a.text)} />{row.us}</div>
                  <div className="px-4 py-4 md:px-6 flex items-start gap-2 text-muted"><Minus className="mt-0.5 h-4 w-4 shrink-0 opacity-50" />{row.them}</div>
                </RevealItem>
              ))}
            </RevealGroup>
            </div>
          </Reveal>
        </section>
      )}

      <Proof lp={lp} />
      <Benefits lp={lp} variant="numbered" title={<>Four promises, <span className={a.text}>in writing.</span></>} />

      <section className="bg-bg-2/40 py-14 md:py-20" aria-label="Client voices">
        <div className="container">
          <RevealGroup className="grid gap-4 md:grid-cols-3">
            {quotes.map((t) => (
              <RevealItem key={t.name} className="glass rounded-3xl p-6 relative">
                <Quote className={cn("absolute right-5 top-5 h-7 w-7 opacity-30", a.text)} aria-hidden />
                <blockquote className="leading-relaxed">“{t.quote}”</blockquote>
                <p className="mt-4 text-xs text-muted">{t.name} · {t.role}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Steps lp={lp} variant="horizontal" />
      <LandingFAQ lp={lp} className="bg-bg-2/40" />
      <LeadSection lp={lp} title={<>Ask us <span className={a.text}>anything.</span></>} text="Product, room or budget — including whether you should buy from us at all. You’ll get a straight answer." />
      <StickyCTA label={lp.cta} accent={lp.accent} whatsappText="Hi OceanIndia, I have a question before buying." />
    </>
  );
}
