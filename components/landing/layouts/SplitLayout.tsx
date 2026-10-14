import { Check, Quote } from "lucide-react";
import type { LandingPage } from "@/data/landing";
import type { Testimonial } from "@/data/testimonials";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { StickyCTA } from "../StickyCTA";
import { CtaLink, LandingFAQ, Proof, Steps, accentOf } from "../shared";
import { cn } from "@/lib/utils";

/** Free consultation: split-screen hero with the form above the fold on the right. */
export function SplitLayout({ lp, testimonials }: { lp: LandingPage; testimonials: Testimonial[] }) {
  const a = accentOf(lp);
  const quotes = [testimonials[0], testimonials[5]];
  return (
    <>
      <section className="relative -mt-20 lg:-mt-28 overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[100dvh]">
          <div className="relative flex items-center bg-bg-2 px-6 pt-32 pb-16 lg:pt-40 lg:px-16 xl:px-24">
            <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(var(--line)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--line)/0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_left,black_30%,transparent_80%)]" />
            <div className="max-w-xl">
              <p className={cn("eyebrow mb-6", a.text)}>{lp.eyebrow}</p>
              <h1 className="text-display">{lp.headline}</h1>
              <p className="mt-6 text-lg text-muted">{lp.subheadline}</p>
              <ul className="mt-8 space-y-3">
                {lp.benefits.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className={cn("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-abyss", a.bg)}><Check className="h-3.5 w-3.5" /></span>
                    <p className="text-sm"><span className="font-semibold">{b.title}.</span> <span className="text-muted">{b.text}</span></p>
                  </li>
                ))}
              </ul>
              <Proof lp={lp} variant="cards" className="mt-10 max-w-md" />
            </div>
          </div>
          <div id="lead" className="relative flex items-center px-6 py-16 lg:pt-40 lg:px-16 xl:px-24 scroll-mt-24">
            <div aria-hidden className="absolute inset-0 -z-10">
              <span className={cn("absolute -top-20 right-0 h-96 w-96 rounded-full blur-3xl", a.soft)} />
              <span className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-violet/15 blur-3xl" />
            </div>
            <div className="w-full max-w-xl mx-auto">
              <h2 className="font-heading text-2xl font-bold">Book your free 30 minutes</h2>
              <p className="mt-1 text-sm text-muted mb-5">We confirm a slot within one working day.</p>
              <LeadForm source={`lp:${lp.slug}`} interestOptions={lp.interestOptions} cta={lp.cta} compact successTitle="Booked — we’ll confirm your slot shortly." />
            </div>
          </div>
        </div>
      </section>

      <Steps lp={lp} variant="horizontal" className="bg-bg-2/40" />

      <section className="container py-14 md:py-20" aria-label="Client voices">
        <RevealGroup className="grid gap-4 md:grid-cols-2">
          {quotes.map((t) => (
            <RevealItem key={t.name} className="glass rounded-3xl p-7 relative">
              <Quote className={cn("absolute right-6 top-6 h-8 w-8 opacity-30", a.text)} aria-hidden />
              <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
              <p className="mt-4 text-sm text-muted">{t.name} · {t.role}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <LandingFAQ lp={lp} className="bg-bg-2/40" />

      <Reveal className="container py-14 text-center">
        <h2 className="text-h2">Still reading? <span className={a.text}>Book the call.</span></h2>
        <div className="mt-6"><CtaLink href="#lead" accent={lp.accent}>{lp.cta}</CtaLink></div>
      </Reveal>
      <StickyCTA label={lp.cta} accent={lp.accent} note="Free, 30 minutes, no sales pitch." />
    </>
  );
}
