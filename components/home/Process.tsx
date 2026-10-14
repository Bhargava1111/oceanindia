import { Ruler, PencilRuler, PackageCheck, Gauge } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import type { PageItem, PageSection } from "@/data/pages";
import type { Site } from "@/data/site";
import { plain, RichText } from "@/lib/pages";

const icons = [Ruler, PencilRuler, PackageCheck, Gauge];

export function Process({ section, steps, site }: { section: PageSection; steps: PageItem[]; site: Site }) {
  return (
    <>
      <WaveDivider flip />
      <Section className="bg-bg-2">
        <SectionHeader align="center" eyebrow={plain(section.eyebrow, site)} title={<RichText text={section.title} site={site} />} description={plain(section.description, site)} />
        <RevealGroup as="ol" className="relative grid gap-6 md:grid-cols-4">
          <span aria-hidden className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-aqua/50 to-transparent md:block" />
          {steps.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <RevealItem as="li" key={s.title} className="relative">
                <div className="glass rounded-3xl p-6 h-full">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-aqua to-teal text-abyss shadow-glow"><Icon className="h-5 w-5" /></span>
                    <span className="font-heading text-sm text-muted">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{plain(s.text, site)}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>
      <WaveDivider />
    </>
  );
}
