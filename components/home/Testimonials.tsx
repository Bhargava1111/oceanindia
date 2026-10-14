import { Quote, Star } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Testimonial } from "@/data/testimonials";
import type { PageSection } from "@/data/pages";
import type { Site } from "@/data/site";
import { plain, RichText } from "@/lib/pages";

export function Testimonials({ testimonials, section, site }: { testimonials: Testimonial[]; section: PageSection; site: Site }) {
  if (testimonials.length === 0) return null;
  return (
    <Section id="testimonials">
      <SectionHeader eyebrow={plain(section.eyebrow, site)} title={<RichText text={section.title} site={site} />} description={plain(section.description, site)} />
      <RevealGroup className="columns-1 gap-4 md:columns-2 lg:columns-3 [&>*]:mb-4">
        {testimonials.map((t) => (
          <RevealItem key={t.name + t.project} className="break-inside-avoid">
            <figure className="glass rounded-3xl p-6 relative">
              <Quote className="absolute right-5 top-5 h-8 w-8 text-aqua/20" aria-hidden />
              <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: Math.max(0, Math.min(5, Math.round(t.rating))) }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <blockquote className="mt-4 text-fg/90 leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-aqua/40 to-violet/40 font-heading font-bold text-sm">{t.name.charAt(0)}</span>
                <span><span className="block text-sm font-semibold">{t.name}</span><span className="block text-xs text-muted">{t.role} · {t.project}</span></span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
