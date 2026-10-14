import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import type { Solution } from "@/data/solutions";
import type { PageSection } from "@/data/pages";
import type { Site } from "@/data/site";
import { plain, RichText } from "@/lib/pages";
import { cn } from "@/lib/utils";

const hueFor = { aqua: 190, teal: 170, violet: 270 };
const featuredSlugs = ["recording-studio", "home-theatre", "auditorium", "podcast-studio", "conference-room", "acoustic-treatment"];

export function SolutionsShowcase({ solutions, section, site }: { solutions: Solution[]; section: PageSection; site: Site }) {
  const featured = solutions.filter((s) => featuredSlugs.includes(s.slug));
  return (
    <Section id="solutions" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_80%_30%,rgb(139_92_246/0.15),transparent_70%)]" />
      <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
        <SectionHeader className="lg:col-span-8 mb-0" eyebrow={plain(section.eyebrow, site)} title={<RichText text={section.title} site={site} />} description={plain(section.description, site)} />
        <div className="lg:col-span-4 lg:text-right"><Button href="/solutions" variant="outline" iconRight={<ArrowRight />}>All {solutions.length} solutions</Button></div>
      </div>
      <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((s, i) => (
          <RevealItem key={s.slug}>
            <Link href={`/solutions/${s.slug}`} className={cn("group block overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-1", s.accent === "aqua" && "hover:shadow-glow", s.accent === "teal" && "hover:shadow-glow-teal", s.accent === "violet" && "hover:shadow-glow-violet")}>
              <ImageSlot src={s.image} alt={`${s.name} project by ${site.name}`} label={s.name} hue={hueFor[s.accent] + i * 12} aspect="aspect-[16/10]" className="rounded-none rounded-t-3xl" />
              <div className="p-5">
                <p className={cn("text-xs font-semibold uppercase tracking-widest", s.accent === "aqua" ? "text-aqua" : s.accent === "teal" ? "text-teal" : "text-violet")}>{s.group}</p>
                <h3 className="mt-1 font-heading text-xl font-bold">{s.name}</h3>
                <p className="mt-1 text-sm text-muted">{s.tagline}</p>
                <p className="mt-3 text-sm text-muted/90 line-clamp-2">{s.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-fg group-hover:text-aqua">Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
