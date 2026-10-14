import { ArrowRight, Sparkles } from "lucide-react";
import type { LandingPage } from "@/data/landing";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/store/ProductCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Countdown } from "../Countdown";
import { StickyCTA } from "../StickyCTA";
import { Benefits, CtaLink, LandingFAQ, LeadSection, Proof, Steps, accentOf } from "../shared";
import { cn } from "@/lib/utils";

/** Launch offer: centred hero with a conic "sonar" ring, countdown, deals grid. */
export function CountdownLayout({ lp, products }: { lp: LandingPage; products: Product[] }) {
  const a = accentOf(lp);
  const deals = products.filter((p) => p.badges?.includes("offer") || p.badges?.includes("bestseller")).slice(0, 8);
  return (
    <>
      <section className="relative overflow-hidden -mt-20 lg:-mt-28 pt-36 lg:pt-48 pb-24 text-center">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[90vw] w-[90vw] max-h-[900px] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-2xl animate-[spin_30s_linear_infinite] motion-reduce:animate-none" style={{ background: `conic-gradient(from 0deg, transparent 0 60%, ${a.hex} 75%, transparent 90%)` }} />
          {[70, 55, 40].map((p) => <span key={p} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/10" style={{ width: `${p}vw`, height: `${p}vw`, maxWidth: `${p * 10}px`, maxHeight: `${p * 10}px` }} />)}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
        </div>
        <div className="container max-w-4xl">
          <p className={cn("eyebrow justify-center mb-6", a.text)}><Sparkles className="h-3.5 w-3.5" />{lp.eyebrow}</p>
          <h1 className="text-display-xl">{lp.headline}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted">{lp.subheadline}</p>
          {lp.offerEndsAt && <div className="mt-10 flex justify-center"><Countdown endsAt={lp.offerEndsAt} /></div>}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <CtaLink href="#lead" accent={lp.accent}>{lp.cta}<ArrowRight className="h-4 w-4" /></CtaLink>
            {lp.secondaryCta && <CtaLink href={lp.secondaryCta.href} accent={lp.accent} variant="outline">{lp.secondaryCta.label}</CtaLink>}
          </div>
        </div>
      </section>

      <Proof lp={lp} className="-mt-8" />
      <Benefits lp={lp} variant="grid" title={<>Launch pricing, <span className={a.text}>no asterisks.</span></>} />

      <section className="bg-bg-2/40 py-14 md:py-20" aria-labelledby="lp-deals">
        <div className="container">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 id="lp-deals" className="text-h2">Launch-week <span className={a.text}>picks.</span></h2>
            <CtaLink href="/store/special-offers" accent={lp.accent} size="md" variant="outline" className="hidden sm:inline-flex">All offers</CtaLink>
          </div>
          <RevealGroup className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {deals.map((p) => <RevealItem key={p.slug}><ProductCard product={p} /></RevealItem>)}
          </RevealGroup>
        </div>
      </section>

      <Steps lp={lp} variant="horizontal" />
      <LeadSection lp={lp} className="bg-bg-2/40" title={<>Lock your <span className={a.text}>launch price.</span></>} text="Tell us what you’re eyeing. We confirm stock and launch pricing, and hold it for 48 hours." />
      <LandingFAQ lp={lp} />
      <StickyCTA label={lp.cta} accent={lp.accent} whatsappText="Hi OceanIndia, I’m interested in the launch offer." />
    </>
  );
}
