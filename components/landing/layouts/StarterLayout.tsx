import { ArrowRight, Smile } from "lucide-react";
import type { LandingPage } from "@/data/landing";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/store/ProductCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { StickyCTA } from "../StickyCTA";
import { Benefits, CtaLink, LandingFAQ, LeadSection, Proof, Steps, accentOf } from "../shared";
import { cn } from "@/lib/utils";

/** First studio: friendly, light-weight hero with an original SVG waveform and starter bundles. */
export function StarterLayout({ lp, products }: { lp: LandingPage; products: Product[] }) {
  const a = accentOf(lp);
  const bundles = products.filter((p) => p.badges?.includes("combo") && (p.price ?? 0) < 100000).sort((x, y) => (x.price ?? 0) - (y.price ?? 0)).slice(0, 4);
  const bars = Array.from({ length: 48 }, (_, i) => 10 + Math.abs(Math.sin(i * 0.55) * 60 + Math.cos(i * 0.21) * 25));
  return (
    <>
      <section className="relative -mt-20 lg:-mt-28 pt-32 lg:pt-44 pb-10 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className={cn("absolute -top-24 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-[100%] blur-3xl opacity-70", a.soft)} />
        </div>
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className={cn("eyebrow mb-6", a.text)}><Smile className="h-3.5 w-3.5" />{lp.eyebrow}</p>
            <h1 className="text-display">{lp.headline}</h1>
            <p className="mt-6 text-lg text-muted">{lp.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="#lead" accent={lp.accent}>{lp.cta}<ArrowRight className="h-4 w-4" /></CtaLink>
              {lp.secondaryCta && <CtaLink href={lp.secondaryCta.href} accent={lp.accent} variant="outline">{lp.secondaryCta.label}</CtaLink>}
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative glass rounded-[2rem] p-6 md:p-8 overflow-hidden">
              <p className="text-xs uppercase tracking-widest text-muted">Your first take</p>
              <svg viewBox="0 0 480 160" className="mt-4 w-full h-40" aria-hidden>
                <defs><linearGradient id="st-g" x1="0" x2="1"><stop stopColor={a.hex} /><stop offset="1" stopColor="#8B5CF6" /></linearGradient></defs>
                {bars.map((h, i) => <rect key={i} x={i * 10} y={80 - h / 2} width="5" height={h} rx="2.5" fill="url(#st-g)" opacity={0.5 + (i % 3) * 0.15} className="origin-center" />)}
                <line x1="0" x2="480" y1="80" y2="80" stroke={a.hex} strokeOpacity="0.3" strokeDasharray="2 6" />
              </svg>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {lp.proof.map((p) => <div key={p.label}><p className={cn("font-heading text-xl font-bold", a.text)}>{p.stat}</p><p className="text-[11px] text-muted">{p.label}</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14 md:py-20" aria-labelledby="lp-bundles">
        <h2 id="lp-bundles" className="text-h2">Bundles that <span className={a.text}>just work.</span></h2>
        <p className="mt-3 text-muted max-w-xl">Every bundle is tested together before it ships. Prices include GST and shipping.</p>
        <RevealGroup className="mt-8 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {bundles.map((p) => <RevealItem key={p.slug}><ProductCard product={p} /></RevealItem>)}
        </RevealGroup>
      </section>

      <Steps lp={lp} variant="chat" className="bg-bg-2/40" title={<>Three messages <span className={a.text}>to your first recording.</span></>} />
      <Benefits lp={lp} variant="list" title={<>What makes a <span className={a.text}>starter</span> actually start.</>} />
      <LeadSection lp={lp} className="bg-bg-2/40" title={<>Tell us what <span className={a.text}>you make.</span></>} text="Vocals, podcast, beats or a band — and roughly what you’d like to spend. You’ll get a lean option and a stretch option, with honest trade-offs." compact />
      <LandingFAQ lp={lp} />
      <Proof lp={lp} className="pb-14" />
      <StickyCTA label={lp.cta} accent={lp.accent} whatsappText="Hi OceanIndia, I’m setting up my first studio." />
    </>
  );
}
