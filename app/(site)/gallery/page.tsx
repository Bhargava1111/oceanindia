import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Counter } from "@/components/motion/Counter";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { projectTypes } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { getPage, getProjects, getSite } from "@/lib/cms/store";
import { listOf, plain, RichText } from "@/lib/pages";
import { toNumber } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("gallery")]);
  return buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/gallery", site });
}

export default async function GalleryPage() {
  const [site, page, projects] = await Promise.all([getSite(), getPage("gallery"), getProjects()]);
  const stats = listOf(page, "stats");
  const types = Array.from(new Set([...projectTypes, ...projects.map((p) => p.type)]));
  return (
    <>
      <PageHero
        variant="aurora"
        accent="violet"
        size="md"
        eyebrow={plain(page.hero.eyebrow, site)}
        title={<RichText text={page.hero.title} site={site} />}
        description={plain(page.hero.description, site)}
        crumbs={[{ name: "Projects", path: "/gallery" }]}
        aside={
          stats.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {stats.map((st) => (
                <div key={st.title} className="glass rounded-2xl p-4 text-center">
                  <p className="font-heading text-2xl font-bold tabular-nums text-gradient"><Counter to={toNumber(st.meta, site)} suffix={st.text} /></p>
                  <p className="mt-1 text-[11px] text-muted leading-tight">{st.title}</p>
                </div>
              ))}
            </div>
          ) : undefined
        }
      />
      <Section size="sm" className="pt-0">
        <GalleryGrid projects={projects} types={types} />
      </Section>
      <QuoteCTA />
    </>
  );
}
