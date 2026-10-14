import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mic2, Users, Sofa } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import { Process } from "@/components/home/Process";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { solutionGroups } from "@/data/solutions";
import { buildMetadata } from "@/lib/seo";
import { getPage, getSite, getSolutions } from "@/lib/cms/store";
import { imageOf, listOf, plain, RichText, sectionOf } from "@/lib/pages";
import { cn } from "@/lib/utils";

const groupMeta = {
  Create: { Icon: Mic2, hue: 190 },
  Gather: { Icon: Users, hue: 170 },
  Experience: { Icon: Sofa, hue: 270 },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("solutions")]);
  return buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/solutions", site });
}

export default async function SolutionsPage() {
  const [site, page, home, solutions] = await Promise.all([getSite(), getPage("solutions"), getPage("home"), getSolutions()]);
  return (
    <>
      <PageHero
        variant="waves"
        size="md"
        eyebrow={plain(page.hero.eyebrow, site)}
        title={<RichText text={page.hero.title} site={site} />}
        description={plain(page.hero.description, site)}
        crumbs={[{ name: "Solutions", path: "/solutions" }]}
        align="center"
      >
        <nav aria-label="Solution groups" className="flex flex-wrap justify-center gap-2">
          {solutionGroups.map((g) => <a key={g} href={`#${g.toLowerCase()}`} className="rounded-full border border-line/15 glass px-4 py-2 text-sm hover:border-aqua/60 hover:text-aqua">{g}</a>)}
        </nav>
      </PageHero>

      {solutionGroups.map((g, gi) => {
        const items = solutions.filter((s) => s.group === g);
        if (items.length === 0) return null;
        const meta = groupMeta[g];
        const sec = sectionOf(page, g);
        const img = imageOf(page, g);
        return (
          <Section key={g} id={g.toLowerCase()} className={cn(gi % 2 === 1 && "bg-bg-2/30")} size="md">
            <div className={cn("grid gap-10 lg:grid-cols-12", gi % 2 === 1 && "lg:[&>*:first-child]:order-last")}>
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-aqua/15 text-aqua"><meta.Icon className="h-6 w-6" /></span>
                  <h2 className="mt-5 text-h2">{plain(sec.title, site) || g}</h2>
                  <p className="mt-3 text-muted">{plain(sec.description, site)}</p>
                  <ImageSlot src={img?.src} alt={img?.alt ?? `${g} spaces`} label={img?.label ?? `${g} — project photo`} hue={meta.hue} aspect="aspect-[4/3]" className="mt-6 hidden lg:block" />
                </div>
              </Reveal>
              <RevealGroup className="lg:col-span-8 grid gap-4 sm:grid-cols-2">
                {items.map((s) => (
                  <RevealItem key={s.slug}>
                    <Link href={`/solutions/${s.slug}`} className={cn("group flex h-full flex-col rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-1", s.accent === "aqua" && "hover:shadow-glow", s.accent === "teal" && "hover:shadow-glow-teal", s.accent === "violet" && "hover:shadow-glow-violet")}>
                      <p className={cn("text-xs font-semibold uppercase tracking-widest", s.accent === "aqua" ? "text-aqua" : s.accent === "teal" ? "text-teal" : "text-violet")}>{s.tagline}</p>
                      <h3 className="mt-2 font-heading text-xl font-bold">{s.name}</h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{s.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {s.idealFor.slice(0, 3).map((x) => <span key={x} className="rounded-full bg-fg/5 px-2.5 py-0.5 text-[11px] text-muted">{x}</span>)}
                      </div>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold group-hover:text-aqua">Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Section>
        );
      })}

      <Process section={sectionOf(home, "process")} steps={listOf(home, "process")} site={site} />
      <QuoteCTA />
    </>
  );
}
