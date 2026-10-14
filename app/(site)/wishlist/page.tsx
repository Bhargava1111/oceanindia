import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { WishlistView } from "@/components/store/WishlistView";
import { buildMetadata } from "@/lib/seo";
import { getPage, getProducts, getSite } from "@/lib/cms/store";
import { plain, RichText } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("wishlist")]);
  return { ...buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/wishlist", site }), robots: { index: false } };
}

export default async function WishlistPage() {
  const [site, page, products] = await Promise.all([getSite(), getPage("wishlist"), getProducts()]);
  return (
    <>
      <PageHero variant="plain" size="sm" eyebrow={plain(page.hero.eyebrow, site)} title={<RichText text={page.hero.title} site={site} />} description={plain(page.hero.description, site)} crumbs={[{ name: "Wishlist", path: "/wishlist" }]} />
      <Section size="sm" className="pt-0"><WishlistView products={products} /></Section>
    </>
  );
}
