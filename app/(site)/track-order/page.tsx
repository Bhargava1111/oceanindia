import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { TrackOrder } from "@/components/store/TrackOrder";
import { buildMetadata } from "@/lib/seo";
import { getPage, getSite } from "@/lib/cms/store";
import { plain, RichText } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("track-order")]);
  return buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/track-order", site });
}

export default async function TrackOrderPage() {
  const [site, page] = await Promise.all([getSite(), getPage("track-order")]);
  return (
    <>
      <PageHero variant="aurora" accent="teal" size="sm" eyebrow={plain(page.hero.eyebrow, site)} title={<RichText text={page.hero.title} site={site} />} description={plain(page.hero.description, site)} crumbs={[{ name: "Track order", path: "/track-order" }]} />
      <Section size="sm" className="pt-0"><TrackOrder /></Section>
    </>
  );
}
