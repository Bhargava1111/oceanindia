import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { LandingPage } from "@/data/landing";
import type { Product } from "@/data/products";
import type { Site } from "@/data/site";
import { ProductArt } from "@/components/graphics/ProductArt";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/store/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { productJsonLd } from "@/lib/seo";
import { StickyCTA } from "../StickyCTA";
import { Benefits, CtaLink, LandingFAQ, LeadSection, Steps, accentOf } from "../shared";
import { cn, formatINR } from "@/lib/utils";

/** Product spotlight: oversized product art, spec callouts, sibling comparison. */
export function ProductLayout({ lp, products, site }: { lp: LandingPage; products: Product[]; site: Site }) {
  const a = accentOf(lp);
  const p = lp.productSlug ? products.find((x) => x.slug === lp.productSlug) : undefined;
  const siblings = p ? products.filter((x) => x.brand === p.brand && x.slug !== p.slug).slice(0, 3) : [];
  return (
    <>
      {p && <JsonLd data={productJsonLd(p, site)} />}
      <section className="relative -mt-20 lg:-mt-28 pt-32 lg:pt-44 pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className={cn("absolute right-[-10%] top-[10%] h-[40rem] w-[40rem] rounded-full blur-3xl opacity-60", a.soft)} />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--line)/0.05)_1px,transparent_1px)] bg-[size:120px_100%]" />
        </div>
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7 order-last lg:order-first">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] glass border-gradient">
              {/* IMAGE SLOT: product hero photo — set `image` on the product in data/products.ts */}
              {p?.image ? <ImageSlot src={p.image} alt={p.name} aspect="aspect-[4/3]" priority /> : p ? <ProductArt product={p} /> : null}
              <div className="absolute left-5 bottom-5 glass rounded-2xl px-4 py-3">
                <p className="text-[11px] uppercase tracking-widest text-muted">{p?.brand}</p>
                <p className="font-heading font-bold">{p?.name}</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-5">
            <p className={cn("eyebrow mb-6", a.text)}>{lp.eyebrow}</p>
            <h1 className="text-display">{lp.headline}</h1>
            <p className="mt-6 text-lg text-muted">{lp.subheadline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {p?.price ? <p className="font-heading text-3xl font-bold tabular-nums">{formatINR(p.price)}</p> : <p className={cn("font-heading text-2xl font-bold", a.text)}>Price on request</p>}
              {p?.rating && <p className="inline-flex items-center gap-1 text-sm text-muted"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{p.rating.toFixed(1)}</p>}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="#lead" accent={lp.accent}>{lp.cta}<ArrowRight className="h-4 w-4" /></CtaLink>
              {lp.secondaryCta && <CtaLink href={lp.secondaryCta.href} accent={lp.accent} variant="outline">{lp.secondaryCta.label}</CtaLink>}
            </div>
            <RevealGroup className="mt-10 grid grid-cols-3 gap-3">
              {lp.proof.map((x) => (
                <RevealItem key={x.label} className="rounded-2xl border border-line/15 p-4">
                  <p className={cn("font-heading text-2xl font-bold", a.text)}>{x.stat}</p>
                  <p className="text-[11px] text-muted">{x.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <Benefits lp={lp} variant="tiles" title={<>What the spec sheet <span className={a.text}>doesn’t tell you.</span></>} />

      {p?.specs && (
        <section className="bg-bg-2/40 py-14 md:py-20">
          <div className="container grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className="text-h2">Key <span className={a.text}>specifications.</span></h2>
              <p className="mt-3 text-muted">{p.description}</p>
              <Link href={`/product/${p.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold hover:text-aqua">Full product page <ArrowRight className="h-4 w-4" /></Link>
            </Reveal>
            <dl className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
              {p.specs.map((s) => <div key={s.label} className="glass rounded-2xl p-5"><dt className="text-xs uppercase tracking-wider text-muted">{s.label}</dt><dd className="mt-1 font-heading text-lg font-bold">{s.value}</dd></div>)}
            </dl>
          </div>
        </section>
      )}

      <Steps lp={lp} variant="vertical" title={<>From quote <span className={a.text}>to calibrated.</span></>} />

      {siblings.length > 0 && (
        <section className="container pb-14 md:pb-20" aria-labelledby="lp-siblings">
          <h2 id="lp-siblings" className="text-h2">Or step <span className={a.text}>up or down.</span></h2>
          <RevealGroup className="mt-8 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
            {siblings.map((x) => <RevealItem key={x.slug}><ProductCard product={x} /></RevealItem>)}
          </RevealGroup>
        </section>
      )}

      <LeadSection lp={lp} className="bg-bg-2/40" product={p?.name} title={<>Quote, demo <span className={a.text}>or both.</span></>} text="Tell us your room and desk width. We reply with price, stock, stand and sub options, and a demo slot if you’re in Bengaluru." />
      <LandingFAQ lp={lp} />
      <StickyCTA label={lp.cta} accent={lp.accent} whatsappText={`Hi OceanIndia, quote for ${p?.name ?? lp.title} please.`} />
    </>
  );
}
