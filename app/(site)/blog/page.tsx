import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import { buildMetadata } from "@/lib/seo";
import { getPage, getPosts, getSite } from "@/lib/cms/store";
import { plain, RichText } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("blog")]);
  return buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/blog", site });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default async function BlogPage() {
  const [site, page, posts] = await Promise.all([getSite(), getPage("blog"), getPosts()]);
  const sorted = [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const [lead, ...rest] = sorted;
  const cats = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <>
      <PageHero
        variant="plain"
        size="sm"
        eyebrow={plain(page.hero.eyebrow, site)}
        title={<RichText text={page.hero.title} site={site} />}
        description={plain(page.hero.description, site)}
        crumbs={[{ name: "Blog", path: "/blog" }]}
      >
        <ul className="flex flex-wrap gap-2">{cats.map((c) => <li key={c} className="rounded-full border border-line/15 px-3 py-1.5 text-xs text-muted">{c}</li>)}</ul>
      </PageHero>

      {lead && (
        <Section size="sm" className="pt-0">
          <Link href={`/blog/${lead.slug}`} className="group grid gap-6 overflow-hidden rounded-[2rem] glass border-gradient lg:grid-cols-12">
            <div className="lg:col-span-7"><ImageSlot src={lead.image} alt={lead.title} label="Cover image" hue={lead.hue} aspect="aspect-[16/9] lg:aspect-auto lg:h-full" className="rounded-none" priority /></div>
            <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-aqua">{lead.category} · Latest</p>
              <h2 className="mt-3 text-h2 group-hover:text-aqua transition-colors">{lead.title}</h2>
              <p className="mt-4 text-muted">{lead.excerpt}</p>
              <p className="mt-6 inline-flex items-center gap-3 text-xs text-muted"><span>{fmt(lead.date)}</span><span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{lead.readMinutes} min read</span></p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </Link>

          <RevealGroup className="mt-6 grid gap-4 md:grid-cols-3">
            {rest.map((p) => (
              <RevealItem key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
                  <ImageSlot src={p.image} alt={p.title} label="Cover image" hue={p.hue} aspect="aspect-[16/10]" className="rounded-none" />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-aqua">{p.category}</p>
                    <h3 className="mt-2 font-heading text-lg font-bold leading-snug group-hover:text-aqua">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted line-clamp-3 flex-1">{p.excerpt}</p>
                    <p className="mt-4 inline-flex items-center gap-3 text-xs text-muted"><span>{fmt(p.date)}</span><span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.readMinutes} min</span></p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}
    </>
  );
}
