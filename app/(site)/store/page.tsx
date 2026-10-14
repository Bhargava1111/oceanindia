import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { StoreBrowser } from "@/components/store/StoreBrowser";
import { CategoryIcon } from "@/components/graphics/CategoryIcon";
import { buildMetadata } from "@/lib/seo";
import { getCategories, getPage, getProducts, getSite } from "@/lib/cms/store";
import { plain, RichText } from "@/lib/pages";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("store")]);
  return buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/store", site });
}

export default async function StorePage() {
  const [site, page, products, categories] = await Promise.all([getSite(), getPage("store"), getProducts(), getCategories()]);
  return (
    <>
      <PageHero
        variant="grid"
        size="sm"
        eyebrow={plain(page.hero.eyebrow, site)}
        title={<RichText text={page.hero.title} site={site} />}
        description={plain(page.hero.description, site)}
        crumbs={[{ name: "Store", path: "/store" }]}
      />
      <div className="container -mt-4 mb-8 overflow-x-auto no-scrollbar">
        <ul className="flex w-max gap-2 pb-1">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/store/${c.slug}`} className={cn("inline-flex items-center gap-2 rounded-full border border-line/15 glass px-4 py-2 text-sm hover:border-aqua/60 hover:text-aqua transition")}>
                <CategoryIcon name={c.icon} className="h-4 w-4" />{c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <section className="container pb-24">
        <React.Suspense fallback={<div className="h-96 glass rounded-3xl animate-pulse" />}>
          <StoreBrowser products={products} categories={categories} />
        </React.Suspense>
      </section>
    </>
  );
}
