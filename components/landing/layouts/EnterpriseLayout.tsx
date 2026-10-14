import { ArrowRight, Building2, FileCheck2, Globe2, ShieldCheck } from "lucide-react";
import type { LandingPage } from "@/data/landing";
import type { Brand } from "@/data/brands";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { StickyCTA } from "../StickyCTA";
import { Benefits, CtaLink, LandingFAQ, LeadSection, Steps, accentOf } from "../shared";
import { cn } from "@/lib/utils";

/** Bulk / enterprise: restrained, grid backdrop, stats row, brand strip, numbered benefits. */
export function EnterpriseLayout({ lp, brands }: { lp: LandingPage; brands: Brand[] }) {
  const a = accentOf(lp);
  const assurances = [
    { Icon: ShieldCheck, t: "Authorised for every brand" },
    { Icon: FileCheck2, t: "GST, GeM & tender-ready" },
    { Icon: Globe2, t: "Pan-India delivery & install" },
    { Icon: Building2, t: "Named account manager" },
  ];
  return (
    <>
      <section className="relative -mt-20 lg:-mt-28 pt-32 lg:pt-44 pb-16 overflow-hidden border-b border-line/10">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(var(--line)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--line)/0.08)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className={cn("eyebrow mb-6", a.text)}>{lp.eyebrow}</p>
            <h1 className="text-display">{lp.headline}</h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">{lp.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="#lead" accent={lp.accent}>{lp.cta}<ArrowRight className="h-4 w-4" /></CtaLink>
              {lp.secondaryCta && <CtaLink href={lp.secondaryCta.href} accent={lp.accent} variant="outline">{lp.secondaryCta.label}</CtaLink>}
            </div>
          </div>
          <RevealGroup className="lg:col-span-4 grid gap-px overflow-hidden rounded-3xl border border-line/10 bg-line/10">
            {lp.proof.map((p) => (
              <RevealItem key={p.label} className="bg-bg px-6 py-5 flex items-baseline justify-between gap-4">
                <span className="text-sm text-muted">{p.label}</span><span className={cn("font-heading text-2xl font-bold", a.text)}>{p.stat}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <div className="border-b border-line/10 bg-bg-2/40 py-6 overflow-hidden mask-fade-x">
        <ul className="flex w-max animate-marquee gap-12 motion-reduce:animate-none motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center" aria-label="Brands supplied">
          {[...brands, ...brands].map((b, i) => <li key={b.name + i} aria-hidden={i >= brands.length} className="font-heading text-lg font-semibold text-fg/40 whitespace-nowrap">{b.name}</li>)}
        </ul>
      </div>

      <Benefits lp={lp} variant="numbered" title={<>Built for <span className={a.text}>procurement.</span></>} />

      <section className="bg-bg-2/40 py-14 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="text-h2">Assurances your <span className={a.text}>finance team</span> will ask about.</h2>
            <ul className="mt-8 space-y-4">
              {assurances.map((x) => (
                <li key={x.t} className="flex items-center gap-3"><span className={cn("grid h-9 w-9 place-items-center rounded-xl", a.soft, a.text)}><x.Icon className="h-4 w-4" /></span><span className="font-medium">{x.t}</span></li>
              ))}
            </ul>
          </Reveal>
          <div className="lg:col-span-7"><Steps lp={lp} variant="vertical" className="py-0" title={<>From requirement <span className={a.text}>to handover.</span></>} /></div>
        </div>
      </section>

      <LeadSection lp={lp} showCompany title={<>Send the requirement. <span className={a.text}>Get one quote.</span></>} text="A BOQ, a tender document or a plain description of rooms and headcount — any format works. Consolidated quote within two working days." />
      <LandingFAQ lp={lp} className="bg-bg-2/40" />
      <StickyCTA label={lp.cta} accent={lp.accent} note="Consolidated quote within two working days." />
    </>
  );
}
