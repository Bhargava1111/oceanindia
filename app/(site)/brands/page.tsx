import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { BrandDirectory } from "@/components/brands/BrandDirectory";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { buildMetadata } from "@/lib/seo";
import { getBrands, getPage, getSite } from "@/lib/cms/store";
import { plain, RichText } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("brands")]);
  return buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/brands", site });
}

export default async function BrandsPage() {
  const [site, page, brands] = await Promise.all([getSite(), getPage("brands"), getBrands()]);
  const flagship = brands.filter((b) => b.tier === "flagship");
  return (
    <>
      <PageHero
        variant="grid"
        size="md"
        eyebrow={plain(page.hero.eyebrow, site)}
        title={<RichText text={page.hero.title} site={site} />}
        description={plain(page.hero.description, site)}
        crumbs={[{ name: "Brands", path: "/brands" }]}
        align="center"
      />
      {flagship.length > 0 && (
        <div className="container mb-12 mask-fade-x overflow-hidden">
          <ul className="flex w-max animate-marquee gap-10 motion-reduce:animate-none motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center" aria-label="Flagship brands">
            {[...flagship, ...flagship].map((b, i) => <li key={b.name + i} aria-hidden={i >= flagship.length} className="font-heading text-2xl font-bold text-fg/40 whitespace-nowrap">{b.name}</li>)}
          </ul>
        </div>
      )}
      <Section size="sm" className="pt-0">
        <BrandDirectory brands={brands} />
      </Section>
      <QuoteCTA />
    </>
  );
}
