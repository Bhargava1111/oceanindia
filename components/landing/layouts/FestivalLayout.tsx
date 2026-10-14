import { ArrowRight, Gift } from "lucide-react";
import type { LandingPage } from "@/data/landing";
import { Countdown } from "../Countdown";
import { StickyCTA } from "../StickyCTA";
import { Benefits, CtaLink, LandingFAQ, LeadSection, Proof, Steps, accentOf } from "../shared";
import { cn } from "@/lib/utils";

/** Festival sale: warm amber/rose glow, floating CSS "lanterns", tiles-first ordering. */
export function FestivalLayout({ lp }: { lp: LandingPage }) {
  const a = accentOf(lp);
  const lanterns = [{ l: "8%", t: "18%", s: 90, d: "0s" }, { l: "22%", t: "62%", s: 56, d: "1.2s" }, { l: "78%", t: "22%", s: 120, d: "0.6s" }, { l: "88%", t: "66%", s: 70, d: "1.8s" }, { l: "58%", t: "78%", s: 44, d: "2.4s" }];
  return (
    <>
      <section className="relative -mt-20 lg:-mt-28 pt-36 lg:pt-48 pb-24 overflow-hidden text-center">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgb(251_191_36/0.22),transparent_70%),radial-gradient(40%_40%_at_90%_80%,rgb(251_113_133/0.2),transparent_70%)]" />
          {lanterns.map((ln, i) => (
            <span key={i} className="absolute rounded-full animate-float motion-reduce:animate-none" style={{ left: ln.l, top: ln.t, width: ln.s, height: ln.s, animationDelay: ln.d, background: `radial-gradient(circle at 35% 30%, ${a.hex}cc, ${a.hex}22 60%, transparent 70%)`, filter: "blur(1px)" }} />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
        </div>
        <div className="container max-w-4xl">
          <p className={cn("eyebrow justify-center mb-6", a.text)}><Gift className="h-3.5 w-3.5" />{lp.eyebrow}</p>
          <h1 className="text-display-xl bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-amber-400 to-rose-400">{lp.headline}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted">{lp.subheadline}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <CtaLink href="#lead" accent={lp.accent}>{lp.cta}<ArrowRight className="h-4 w-4" /></CtaLink>
            {lp.secondaryCta && <CtaLink href={lp.secondaryCta.href} accent={lp.accent} variant="outline">{lp.secondaryCta.label}</CtaLink>}
          </div>
        </div>
      </section>

      <Benefits lp={lp} variant="tiles" className="-mt-10" title={<>What’s on <span className={a.text}>offer.</span></>} />

      {lp.offerEndsAt && (
        <section className="container py-10">
          <div className="glass rounded-[2rem] border-gradient p-8 md:p-10 grid gap-8 md:grid-cols-2 md:items-center">
            <Countdown endsAt={lp.offerEndsAt} label="Festive pricing ends in" />
            <Proof lp={lp} variant="cards" />
          </div>
        </section>
      )}

      <Steps lp={lp} variant="horizontal" className="bg-bg-2/40" title={<>Delivered <span className={a.text}>before the diyas.</span></>} />
      <LeadSection lp={lp} title={<>Get the <span className={a.text}>festive price list.</span></>} text="Tell us the occasion and a budget. We send three curated options with festive pricing applied — and confirm delivery dates before you pay." />
      <LandingFAQ lp={lp} className="bg-bg-2/40" />
      <StickyCTA label={lp.cta} accent={lp.accent} note="Festive pricing · EMI · free shipping" whatsappText="Hi OceanIndia, send me the festive price list." />
    </>
  );
}
