import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFlagshipBrands, getLanding, getLandingPages, getProducts, getSite, getTestimonials } from "@/lib/cms/store";
import { buildMetadata } from "@/lib/seo";
import { CountdownLayout } from "@/components/landing/layouts/CountdownLayout";
import { SplitLayout } from "@/components/landing/layouts/SplitLayout";
import { EnterpriseLayout } from "@/components/landing/layouts/EnterpriseLayout";
import { StarterLayout } from "@/components/landing/layouts/StarterLayout";
import { FestivalLayout } from "@/components/landing/layouts/FestivalLayout";
import { WhatsappLayout } from "@/components/landing/layouts/WhatsappLayout";
import { ProductLayout } from "@/components/landing/layouts/ProductLayout";
import { ComparisonLayout } from "@/components/landing/layouts/ComparisonLayout";

export async function generateStaticParams() {
  return (await getLandingPages()).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const [lp, site] = await Promise.all([getLanding(params.slug), getSite()]);
  if (!lp) return {};
  return buildMetadata({ title: lp.metaTitle, description: lp.metaDescription, path: `/lp/${lp.slug}`, site });
}

export default async function LandingPageRoute({ params }: { params: { slug: string } }) {
  const lp = await getLanding(params.slug);
  if (!lp) notFound();
  const [site, products, testimonials, brands] = await Promise.all([getSite(), getProducts(), getTestimonials(), getFlagshipBrands()]);
  switch (lp.layout) {
    case "countdown":
      return <CountdownLayout lp={lp} products={products} />;
    case "split":
      return <SplitLayout lp={lp} testimonials={testimonials} />;
    case "enterprise":
      return <EnterpriseLayout lp={lp} brands={brands} />;
    case "starter":
      return <StarterLayout lp={lp} products={products} />;
    case "festival":
      return <FestivalLayout lp={lp} />;
    case "whatsapp":
      return <WhatsappLayout lp={lp} site={site} />;
    case "product":
      return <ProductLayout lp={lp} products={products} site={site} />;
    case "comparison":
      return <ComparisonLayout lp={lp} testimonials={testimonials} brandName={site.name} />;
    default:
      return notFound();
  }
}
