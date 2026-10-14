import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck, ReceiptText, Headphones, Star, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductArt } from "@/components/graphics/ProductArt";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { AddToCart } from "@/components/store/AddToCart";
import { ProductCard } from "@/components/store/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getCategories, getProduct, getProducts, getSite } from "@/lib/cms/store";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { discountPercent, formatINR } from "@/lib/utils";
import { isInStock, isLowStock } from "@/lib/catalog";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const [p, site] = await Promise.all([getProduct(params.slug), getSite()]);
  if (!p) return {};
  return buildMetadata({
    title: `${p.name} — ${p.price ? formatINR(p.price) : "Price on request"}`,
    description: `${p.short} ${p.description.slice(0, 120)}… Authorised ${p.brand} dealer, GST invoice, free insured shipping across India.`,
    path: `/product/${p.slug}`,
    image: p.image,
    site,
  });
}

const badgeTone = { new: "aqua", bestseller: "teal", combo: "violet", offer: "warning", "pre-owned": "neutral" } as const;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const [site, products, categories] = await Promise.all([getSite(), getProducts(), getCategories()]);
  const p = products.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const cat = categories.find((c) => c.slug === p.category);
  const off = p.price ? discountPercent(p.price, p.mrp) : 0;
  const gallery = (p.gallery ?? []).slice(0, 3);
  const galleryLabels = ["Front detail", "Rear panel / I/O", "In the studio"];
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const moreFromBrand = products.filter((x) => x.brand === p.brand && x.slug !== p.slug && !related.includes(x)).slice(0, 4);

  const faqs = [
    { q: "Is this unit covered by warranty in India?", a: `Yes. OceanIndia is an authorised ${p.brand} dealer, so this product carries the official India warranty. We coordinate service on your behalf.` },
    { q: "How soon will it ship?", a: !isInStock(p) ? "This item is currently on back-order. Add it to your wishlist or ask us for an ETA on WhatsApp." : `In-stock items dispatch within ${site.policies.dispatchDays} business days with free insured shipping and tracking.` },
    { q: "Can I get a GST invoice?", a: "Yes — add your GSTIN at checkout and the tax invoice is issued in your company’s name for input credit." },
    { q: "Can I demo it before buying?", a: "Monitors, microphones and headphones can be auditioned at our Bengaluru experience centre by appointment. We also do video demos for outstation customers." },
  ];

  return (
    <>
      <JsonLd data={productJsonLd(p, site)} />
      <article className="container pt-4 pb-20">
        <Breadcrumbs items={[{ name: "Store", path: "/store" }, ...(cat ? [{ name: cat.name, path: `/store/${cat.slug}` }] : []), { name: p.name, path: `/product/${p.slug}` }]} className="mb-6" />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] glass aspect-[4/3]">
                {p.image ? <ImageSlot src={p.image} alt={p.name} aspect="aspect-[4/3]" className="rounded-[2rem]" priority /> : <ProductArt product={p} />}
                <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                  {p.badges?.map((b) => <Badge key={b} tone={badgeTone[b]}>{b}</Badge>)}
                  {off > 0 && <Badge tone="success">{off}% off</Badge>}
                  {!isInStock(p) && <Badge tone="neutral">Back-order</Badge>}
                  {isLowStock(p) && <Badge tone="warning">Only {p.stock} left</Badge>}
                </div>
              </div>
            </Reveal>
            <RevealGroup className="mt-3 grid grid-cols-3 gap-3">
              {galleryLabels.map((l, i) => (
                <RevealItem key={l}>
                  <ImageSlot src={gallery[i]} alt={`${p.name} — ${l}`} label={l} hue={(p.hue ?? 190) + i * 25} aspect="aspect-[4/3]" className="rounded-2xl" sizes="(min-width:1024px) 20vw, 33vw" />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">{p.brand}{p.subcategory && cat?.children?.find((c) => c.slug === p.subcategory) ? ` · ${cat.children.find((c) => c.slug === p.subcategory)!.name}` : ""}</p>
              <h1 className="mt-2 text-h2">{p.name}</h1>
              <p className="mt-3 text-muted">{p.short}</p>
              {p.rating && (
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm">
                  <span className="flex gap-0.5" aria-hidden>{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.round(p.rating!) ? "fill-amber-400 text-amber-400" : "text-muted/40"}`} />)}</span>
                  <span className="text-muted">{p.rating.toFixed(1)} · engineer-rated</span>
                </p>
              )}

              <div className="mt-6 rounded-3xl glass p-6">
                {p.price ? (
                  <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                    <p className="font-heading text-4xl font-bold tabular-nums">{formatINR(p.price)}</p>
                    {p.mrp && p.mrp > p.price && <p className="text-muted line-through tabular-nums">{formatINR(p.mrp)}</p>}
                    {off > 0 && <p className="text-sm font-semibold text-teal">Save {formatINR(p.mrp! - p.price)}</p>}
                    <p className="w-full text-xs text-muted">Inclusive of GST · Free insured shipping</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-heading text-3xl font-bold text-aqua">Price on request</p>
                    <p className="mt-1 text-xs text-muted">Pro-line pricing moves with stock and exchange rates — we quote firm, fast.</p>
                  </div>
                )}
                <div className="mt-6"><AddToCart product={p} /></div>
              </div>

              <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />Authorised {p.brand} dealer, India warranty</li>
                <li className="flex items-start gap-2"><Truck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />Dispatch in {site.policies.dispatchDays} business days, insured</li>
                <li className="flex items-start gap-2"><ReceiptText className="mt-0.5 h-4 w-4 shrink-0 text-teal" />GST invoice for input credit</li>
                <li className="flex items-start gap-2"><Headphones className="mt-0.5 h-4 w-4 shrink-0 text-teal" />Setup help from our engineers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-10">
            <Reveal>
              <h2 className="text-h3">Overview</h2>
              <p className="mt-3 text-muted leading-relaxed">{p.description}</p>
            </Reveal>
            {p.specs && p.specs.length > 0 && (
              <Reveal>
                <h2 className="text-h3">Specifications</h2>
                <dl className="mt-4 overflow-hidden rounded-3xl glass divide-y divide-line/10">
                  {p.specs.map((s) => (
                    <div key={s.label} className="grid gap-1 px-4 py-3 text-sm sm:grid-cols-3 sm:gap-4 sm:px-5">
                      <dt className="text-muted">{s.label}</dt>
                      <dd className="font-medium sm:col-span-2">{s.value}</dd>
                    </div>
                  ))}
                  <div className="grid gap-1 px-4 py-3 text-sm sm:grid-cols-3 sm:gap-4 sm:px-5"><dt className="text-muted">Brand</dt><dd className="font-medium sm:col-span-2">{p.brand}</dd></div>
                  <div className="grid gap-1 px-4 py-3 text-sm sm:grid-cols-3 sm:gap-4 sm:px-5"><dt className="text-muted">SKU</dt><dd className="break-all font-mono text-xs sm:col-span-2">{(p.sku ?? p.slug).toUpperCase()}</dd></div>
                </dl>
              </Reveal>
            )}
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-h3 mb-4">Good to know</h2>
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <Section className="bg-bg-2/30" size="sm">
          <SectionHeader eyebrow="Pairs well" title={<>More in {cat?.name.toLowerCase() ?? "this category"}</>} className="mb-8" />
          <RevealGroup className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {related.map((r) => <RevealItem key={r.slug}><ProductCard product={r} /></RevealItem>)}
          </RevealGroup>
        </Section>
      )}
      {moreFromBrand.length > 0 && (
        <Section size="sm">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader eyebrow="Same maker" title={<>More from {p.brand}</>} className="mb-0" />
            <Link href={`/store?brand=${encodeURIComponent(p.brand)}`} className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold hover:text-aqua">All {p.brand} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <RevealGroup className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {moreFromBrand.map((r) => <RevealItem key={r.slug}><ProductCard product={r} /></RevealItem>)}
          </RevealGroup>
        </Section>
      )}
    </>
  );
}
