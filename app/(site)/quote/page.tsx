import type { Metadata } from "next";
import { Clock3, FileText, MessageCircle, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { getPage, getSite, getTestimonials } from "@/lib/cms/store";
import { listOf, plain, RichText, sectionOf } from "@/lib/pages";
import { telUrlFor, whatsappUrlFor } from "@/lib/site";

const icons = [FileText, Clock3, PhoneCall];

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("quote")]);
  return buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/quote", site });
}

export default async function QuotePage({ searchParams }: { searchParams: { product?: string } }) {
  const [site, page, testimonials] = await Promise.all([getSite(), getPage("quote"), getTestimonials()]);
  const product = searchParams.product?.slice(0, 120);
  const t = testimonials[3] ?? testimonials[0];
  const steps = listOf(page, "steps");
  const productHero = sectionOf(page, "product-hero");
  return (
    <>
      <PageHero
        variant="aurora"
        accent="teal"
        size="sm"
        eyebrow={plain(page.hero.eyebrow, site)}
        title={product ? <RichText text={productHero.title} site={site} extra={{ product }} /> : <RichText text={page.hero.title} site={site} />}
        description={product ? plain(productHero.description, site) : plain(page.hero.description, site)}
        crumbs={[{ name: "Get a quote", path: "/quote" }]}
      />
      <Section size="sm" className="pt-0">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <LeadForm source={product ? "quote:product" : "quote"} product={product} showCompany cta="Request my quote" />
          </div>
          <Reveal className="lg:col-span-5 space-y-4 lg:sticky lg:top-32">
            {steps.length > 0 && (
              <div className="glass rounded-3xl p-6">
                <p className="eyebrow mb-4">{plain(sectionOf(page, "next").eyebrow, site)}</p>
                <ol className="space-y-5">
                  {steps.map((s, i) => {
                    const Icon = icons[i % icons.length];
                    return (
                      <li key={s.title} className="flex gap-4">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-teal/15 text-teal"><Icon className="h-5 w-5" /></span>
                        <div><p className="font-heading font-semibold">{i + 1}. {s.title}</p><p className="mt-1 text-sm text-muted">{plain(s.text, site)}</p></div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
            <div className="glass rounded-3xl p-6">
              <p className="text-sm text-muted">{plain(sectionOf(page, "talk").title, site)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button href={whatsappUrlFor(site, product ? `Hi ${site.name}, please quote: ${product}` : `Hi ${site.name}, I’d like a quote.`)} variant="whatsapp" size="sm" icon={<MessageCircle />}>WhatsApp</Button>
                <Button href={telUrlFor(site.contact.phonePrimary)} variant="outline" size="sm" icon={<PhoneCall />}>{site.contact.phonePrimary}</Button>
              </div>
            </div>
            {t && (
              <figure className="rounded-3xl border-gradient p-6">
                <blockquote className="text-sm leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-3 text-xs text-muted">{t.name} · {t.role}</figcaption>
              </figure>
            )}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
