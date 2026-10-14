import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, Navigation } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import { FAQ } from "@/components/home/FAQ";
import { buildMetadata } from "@/lib/seo";
import { getFaqs, getPage, getSite } from "@/lib/cms/store";
import { imageOf, paragraphOf, plain, RichText, sectionOf } from "@/lib/pages";
import { telUrlFor, whatsappUrlFor } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("contact")]);
  return buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/contact", site });
}

export default async function ContactPage() {
  const [site, page, faqs] = await Promise.all([getSite(), getPage("contact"), getFaqs()]);
  const a = site.contact.address;
  const mapSrc = `https://www.google.com/maps?q=${a.geo.lat},${a.geo.lng}&z=16&output=embed`;
  const storefront = imageOf(page, "storefront");
  const visit = sectionOf(page, "visit");

  const channels = [
    { Icon: MessageCircle, title: "WhatsApp", value: paragraphOf(page, "whatsapp-note") || "Fastest — replies in minutes", href: whatsappUrlFor(site, `Hi ${site.name}!`), tone: "bg-[#25D366]/15 text-[#25D366]" },
    { Icon: Phone, title: "Call", value: site.contact.phonePrimary, href: telUrlFor(site.contact.phonePrimary), tone: "bg-aqua/15 text-aqua" },
    { Icon: Mail, title: "Email", value: site.contact.email, href: `mailto:${site.contact.email}`, tone: "bg-violet/15 text-violet" },
    { Icon: Clock, title: "Hours", value: site.contact.hours, tone: "bg-teal/15 text-teal" },
  ];

  return (
    <>
      <PageHero
        variant="grid"
        size="sm"
        eyebrow={plain(page.hero.eyebrow, site)}
        title={<RichText text={page.hero.title} site={site} />}
        description={plain(page.hero.description, site)}
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <Section size="sm" className="pt-0">
        <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => {
            const inner = (
              <>
                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${c.tone}`}><c.Icon className="h-5 w-5" /></span>
                <p className="mt-4 font-heading font-bold">{c.title}</p>
                <p className="mt-1 text-sm text-muted break-words">{c.value}</p>
              </>
            );
            return (
              <RevealItem key={c.title}>
                {c.href ? <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block h-full glass rounded-3xl p-5 transition hover:-translate-y-1 hover:shadow-glow">{inner}</a> : <div className="h-full glass rounded-3xl p-5">{inner}</div>}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section size="sm" className="pt-0">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-h3 mb-5">{plain(sectionOf(page, "form").title, site) || "Send a message"}</h2>
            <LeadForm source="contact" cta="Send message" />
          </div>
          <Reveal className="lg:col-span-5 space-y-4">
            <div className="glass rounded-3xl p-6">
              <p className="eyebrow mb-3">{plain(visit.eyebrow, site)}</p>
              <h3 className="font-heading text-xl font-bold">{plain(visit.title, site)}</h3>
              <address className="mt-3 not-italic text-sm text-muted leading-relaxed">
                {a.line1}<br />{a.line2}, {a.city} {a.postalCode}<br />{a.state}, India<br /><span className="text-fg/80">{a.landmark}</span>
              </address>
              <p className="mt-3 inline-flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-teal" />{site.contact.hours}</p>
              <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 text-sm hover:border-aqua/60 hover:text-aqua"><Navigation className="h-4 w-4" />Get directions</a>
            </div>
            <div className="overflow-hidden rounded-3xl glass">
              <iframe title={`Map to ${site.name} experience centre`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-64 w-full border-0 grayscale-[0.4] contrast-[1.05] dark:invert-[0.9] dark:hue-rotate-180" allowFullScreen />
            </div>
            <ImageSlot src={storefront?.src} alt={storefront?.alt ?? "Storefront"} label={storefront?.label ?? "Storefront photo"} hue={190} aspect="aspect-[16/9]" />
            <p className="text-xs text-muted inline-flex items-start gap-2"><MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />{plain(paragraphOf(page, "visit-note"), site)}</p>
          </Reveal>
        </div>
      </Section>

      <FAQ items={faqs} section={sectionOf(page, "faq")} site={site} />
    </>
  );
}
