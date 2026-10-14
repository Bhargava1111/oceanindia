import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Category } from "@/data/categories";
import type { PageSection } from "@/data/pages";
import type { Site } from "@/data/site";
import { CategoryIcon } from "@/components/graphics/CategoryIcon";
import { plain, RichText } from "@/lib/pages";
import { cn } from "@/lib/utils";

const layout: Record<string, string> = {
  microphones: "md:col-span-2 md:row-span-2",
  "studio-monitors": "md:col-span-2",
  "live-sound": "md:row-span-2",
  "musical-instruments": "md:col-span-2",
};

const bg = {
  aqua: "from-aqua/20 via-transparent to-transparent",
  teal: "from-teal/20 via-transparent to-transparent",
  violet: "from-violet/25 via-transparent to-transparent",
};

export function CategoryBento({ categories, section, site }: { categories: Category[]; section: PageSection; site: Site }) {
  const items = categories.filter((c) => !["combo-offers", "special-offers", "pre-owned"].includes(c.slug)).slice(0, 10);
  return (
    <Section id="categories">
      <SectionHeader eyebrow={plain(section.eyebrow, site)} title={<RichText text={section.title} site={site} />} description={plain(section.description, site)} />
      <RevealGroup className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[170px] gap-3 md:gap-4">
        {items.map((c) => (
          <RevealItem key={c.slug} className={cn(layout[c.slug])}>
            <Link href={`/store/${c.slug}`} className={cn("group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl glass p-4 md:p-5 transition-all duration-500 hover:-translate-y-1", c.accent === "aqua" && "hover:shadow-glow", c.accent === "teal" && "hover:shadow-glow-teal", c.accent === "violet" && "hover:shadow-glow-violet")}>
              {c.image && (
                <Image src={c.image} alt="" fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover opacity-40 transition-all duration-700 group-hover:opacity-60 group-hover:scale-105" />
              )}
              <span aria-hidden className={cn("absolute inset-0 bg-gradient-to-br opacity-70 group-hover:opacity-100 transition", bg[c.accent])} />
              {c.image && <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent" />}
              <div className="relative flex items-start justify-between">
                <span className={cn("grid h-10 w-10 place-items-center rounded-2xl bg-bg-2/60", c.accent === "aqua" ? "text-aqua" : c.accent === "teal" ? "text-teal" : "text-violet")}><CategoryIcon name={c.icon} className="h-5 w-5" /></span>
                <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-fg group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="relative">
                <p className="font-heading font-bold text-base md:text-lg leading-tight">{c.name}</p>
                <p className="text-xs text-muted mt-0.5 line-clamp-1">{c.short}</p>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
