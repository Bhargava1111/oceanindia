import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { CheckoutForm } from "@/components/store/CheckoutForm";
import { buildMetadata } from "@/lib/seo";
import { getPage, getSite } from "@/lib/cms/store";
import { plain, RichText } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("checkout")]);
  return { ...buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/checkout", site }), robots: { index: false } };
}

export default async function CheckoutPage() {
  const [site, page] = await Promise.all([getSite(), getPage("checkout")]);
  return (
    <>
      <PageHero variant="plain" size="sm" eyebrow={plain(page.hero.eyebrow, site)} title={<RichText text={page.hero.title} site={site} />} description={plain(page.hero.description, site)} crumbs={[{ name: "Checkout", path: "/checkout" }]} />
      <Section size="sm" className="pt-0"><CheckoutForm /></Section>
    </>
  );
}
