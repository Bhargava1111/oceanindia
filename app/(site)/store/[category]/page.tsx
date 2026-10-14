import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { StoreBrowser } from "@/components/store/StoreBrowser";
import { CategoryIcon } from "@/components/graphics/CategoryIcon";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { getCategories, getCategory, getPage, getProducts, getSite, getSolutions } from "@/lib/cms/store";
import { plain, RichText, sectionOf } from "@/lib/pages";
import { whatsappUrlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const [c, site] = await Promise.all([getCategory(params.category), getSite()]);
  if (!c) return {};
  return buildMetadata({ title: `${c.name} — buy online in India`, description: c.description, path: `/store/${c.slug}`, image: c.image, site });
}

const relatedSolutionFor: Record<string, string> = {
  microphones: "podcast-studio",
  "audio-interfaces": "recording-studio",
  "studio-monitors": "recording-studio",
  "live-sound": "pa-system",
  "acoustic-treatment": "acoustic-treatment",
  "mixers-consoles": "auditorium",
  headphones: "recording-studio",
  "dj-gear": "pub-club",
};

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const [site, page, products, categories, solutions] = await Promise.all([getSite(), getPage("store"), getProducts(), getCategories(), getSolutions()]);
  const c = categories.find((x) => x.slug === params.category);
  if (!c) notFound();
  const siblings = categories.filter((x) => x.slug !== c.slug).slice(0, 8);
  const sol = solutions.find((s) => s.slug === relatedSolutionFor[c.slug]);
  const help = sectionOf(page, "category-help");
  const beyond = sectionOf(page, "beyond");

  return (
    <>
      <PageHero
        variant="aurora"
        accent={c.accent}
        size="sm"
        eyebrow={c.short}
        title={c.name}
        description={c.description}
        crumbs={[{ name: "Store", path: "/store" }, { name: c.name, path: `/store/${c.slug}` }]}
        aside={
          <div className="space-y-4">
            {c.image && <ImageSlot src={c.image} alt={c.name} aspect="aspect-[16/9]" priority />}
            <div className="glass rounded-3xl p-6 flex items-start gap-4">
              <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl", c.accent === "aqua" ? "bg-aqua/15 text-aqua" : c.accent === "teal" ? "bg-teal/15 text-teal" : "bg-violet/15 text-violet")}><CategoryIcon name={c.icon} className="h-6 w-6" /></span>
              <div>
                <p className="font-heading font-bold">{plain(help.title, site)}</p>
                <p className="mt-1 text-sm text-muted">{plain(help.description, site)}</p>
                <Button href={whatsappUrlFor(site, `Hi ${site.name}, help me choose ${c.name.toLowerCase()}.`)} size="sm" variant="whatsapp" className="mt-4">Ask on WhatsApp</Button>
              </div>
            </div>
          </div>
        }
      />
      <section className="container pb-16">
        <React.Suspense fallback={<div className="h-96 glass rounded-3xl animate-pulse" />}>
          <StoreBrowser products={products} category={c} categories={categories} />
        </React.Suspense>
      </section>

      {sol && (
        <section className="container pb-16">
          <div className="relative overflow-hidden rounded-[2rem] border-gradient glass p-8 md:p-10 grid gap-6 md:grid-cols-12 md:items-center">
            <span aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet/20 blur-3xl" />
            <div className="md:col-span-8">
              <p className="eyebrow mb-3">{plain(beyond.eyebrow, site)}</p>
              <h2 className="text-h3"><RichText text={beyond.title} site={site} extra={{ solution: sol.name.toLowerCase().replace(/s$/, "") }} /></h2>
              <p className="mt-2 text-muted">{sol.summary}</p>
            </div>
            <div className="md:col-span-4 md:text-right"><Button href={`/solutions/${sol.slug}`} variant="outline" iconRight={<ArrowRight />}>See the solution</Button></div>
          </div>
        </section>
      )}

      <section className="container pb-24">
        <p className="eyebrow mb-4">{plain(sectionOf(page, "keep-browsing").eyebrow, site) || "Keep browsing"}</p>
        <ul className="flex flex-wrap gap-2">
          {siblings.map((s) => (
            <li key={s.slug}><Link href={`/store/${s.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 text-sm hover:border-aqua/60 hover:text-aqua"><CategoryIcon name={s.icon} className="h-4 w-4" />{s.name}</Link></li>
          ))}
        </ul>
      </section>
    </>
  );
}
