import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import { Parallax } from "@/components/motion/Parallax";
import type { Project } from "@/data/projects";
import type { PageSection } from "@/data/pages";
import type { Site } from "@/data/site";
import { plain, RichText } from "@/lib/pages";

const widths = ["w-[70vw] md:w-[34rem]", "w-[60vw] md:w-[26rem]", "w-[60vw] md:w-[26rem]", "w-[70vw] md:w-[34rem]", "w-[60vw] md:w-[26rem]"];

/** Horizontal strip of the most recent projects with parallax. */
export function ProjectStrip({ projects, section, site }: { projects: Project[]; section: PageSection; site: Site }) {
  const tiles = [...projects].sort((a, b) => b.year - a.year).slice(0, 6);
  return (
    <section aria-labelledby="projects-title" className="py-16 md:py-24 overflow-hidden">
      <div className="container flex items-end justify-between mb-8">
        <div>
          <p className="eyebrow mb-3">{plain(section.eyebrow, site)}</p>
          <h2 id="projects-title" className="text-h2"><RichText text={section.title} site={site} /></h2>
        </div>
        <Link href="/gallery" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold hover:text-aqua">Full gallery <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <Parallax speed={0.08}>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-[max(2rem,calc((100vw-1280px)/2))] pb-4 snap-x">
          {tiles.map((t, i) => (
            <Link key={t.slug} href="/gallery" className={`${widths[i % widths.length]} shrink-0 snap-start group`}>
              <ImageSlot src={t.image} alt={`${t.title}, ${t.city}`} label={`${t.title} · ${t.city}`} hue={t.hue} aspect="aspect-[4/3]" />
              <p className="mt-3 text-sm font-semibold group-hover:text-aqua">{t.title}</p>
              <p className="text-xs text-muted">{t.type} · {t.city} · {t.year}</p>
            </Link>
          ))}
        </div>
      </Parallax>
    </section>
  );
}
