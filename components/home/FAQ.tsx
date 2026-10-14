import { Section, SectionHeader } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import type { Site } from "@/data/site";
import type { PageSection } from "@/data/pages";
import { plain, RichText } from "@/lib/pages";

export function FAQ({ items, section, site }: { items: { q: string; a: string }[]; section: PageSection; site: Site }) {
  if (items.length === 0) return null;
  const resolved = items.map((f) => ({ q: plain(f.q, site), a: plain(f.a, site) }));
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-12">
        <SectionHeader className="lg:col-span-4 lg:sticky lg:top-32 self-start mb-0" eyebrow={plain(section.eyebrow, site) || "FAQ"} title={<RichText text={section.title} site={site} />} description={plain(section.description, site)} />
        <Reveal className="lg:col-span-8"><Accordion items={resolved} /></Reveal>
      </div>
      <JsonLd data={faqJsonLd(resolved)} />
    </Section>
  );
}
