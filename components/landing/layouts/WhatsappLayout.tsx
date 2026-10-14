import { Check, CheckCheck, MessageCircle } from "lucide-react";
import type { LandingPage } from "@/data/landing";
import type { Site } from "@/data/site";
import { whatsappUrlFor } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { StickyCTA } from "../StickyCTA";
import { Benefits, CtaLink, LandingFAQ, LeadSection, Proof, Steps, accentOf } from "../shared";
import { cn } from "@/lib/utils";

const WA = "#25D366";

/** WhatsApp quick quote: chat-styled hero with a mock conversation, giant WhatsApp CTA. */
export function WhatsappLayout({ lp, site }: { lp: LandingPage; site: Site }) {
  const a = accentOf(lp);
  const wa = whatsappUrlFor(site, `Hi ${site.name}, I’d like a quick quote for: `);
  const chat = [
    { me: true, t: "Hi! Price for a pair of DT 770 PRO 250Ω and an AT4033a?", time: "10:42" },
    { me: false, t: "Hi! DT 770 PRO 250Ω — ₹16,890 each. AT4033a — ₹27,455. Both in stock, incl. GST, free shipping. Dispatch tomorrow.", time: "10:49" },
    { me: true, t: "Great. Can you add a boom arm that fits the 4033?", time: "10:51" },
    { me: false, t: "Yes — adding a heavy-duty arm, ₹3,200. Sending a payment link and GST invoice draft now.", time: "10:53" },
  ];
  return (
    <>
      <section className="relative -mt-20 lg:-mt-28 pt-32 lg:pt-44 pb-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className="absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full blur-3xl" style={{ background: `${WA}22` }} />
          <span className={cn("absolute -left-24 bottom-0 h-80 w-80 rounded-full blur-3xl", a.soft)} />
        </div>
        <div className="container grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className={cn("eyebrow mb-6", a.text)}>{lp.eyebrow}</p>
            <h1 className="text-display-xl">{lp.headline}</h1>
            <p className="mt-6 text-lg text-muted">{lp.subheadline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center gap-3 rounded-full px-8 text-base font-semibold text-abyss transition-transform hover:scale-[1.03]" style={{ background: WA, boxShadow: `0 0 40px -8px ${WA}99` }}>
                <MessageCircle className="h-5 w-5" />{lp.cta}
              </a>
              <p className="text-sm text-muted">{site.contact.phonePrimary} · {site.contact.hours}</p>
            </div>
            <Proof lp={lp} variant="cards" className="mt-10 max-w-md" />
          </div>

          <Reveal className="lg:col-span-6">
            <div className="mx-auto max-w-sm rounded-[2.5rem] glass-strong p-3 border-gradient" role="img" aria-label="Example WhatsApp conversation with OceanIndia">
              <div className="rounded-[2rem] bg-bg-2/70 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-line/10">
                  <span className="grid h-9 w-9 place-items-center rounded-full text-abyss font-heading font-bold text-sm" style={{ background: WA }}>OI</span>
                  <div><p className="text-sm font-semibold">{site.name}</p><p className="text-[11px] text-emerald-400">online</p></div>
                </div>
                <div className="space-y-2 p-4 min-h-[22rem]">
                  {chat.map((m, i) => (
                    <div key={i} className={cn("flex", m.me ? "justify-end" : "justify-start")}>
                      <div className={cn("max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug", m.me ? "rounded-br-sm text-abyss" : "glass rounded-bl-sm")} style={m.me ? { background: WA } : undefined}>
                        {m.t}
                        <span className={cn("ml-2 inline-flex items-center gap-0.5 align-bottom text-[10px]", m.me ? "text-abyss/60" : "text-muted")}>{m.time}{m.me ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Steps lp={lp} variant="chat" className="bg-bg-2/40" title={<>Three taps <span className={a.text}>to a price.</span></>} />
      <Benefits lp={lp} variant="grid" title={<>Why it <span className={a.text}>beats a contact form.</span></>} />

      <section className="container py-10 text-center">
        <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center gap-3 rounded-full px-10 text-base font-semibold text-abyss transition-transform hover:scale-[1.03]" style={{ background: WA, boxShadow: `0 0 40px -8px ${WA}99` }}><MessageCircle className="h-5 w-5" />{lp.cta}</a>
      </section>

      <LandingFAQ lp={lp} className="bg-bg-2/40" />
      <LeadSection lp={lp} compact title={<>Prefer a <span className={a.text}>form?</span></>} text="No problem. Same engineers, same speed — we just reply by phone or email instead." />
      <StickyCTA label={lp.cta} accent="emerald" href={wa} note="A real engineer replies, usually within minutes." />
    </>
  );
}
