import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CategoryBento } from "@/components/home/CategoryBento";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { SolutionsShowcase } from "@/components/home/SolutionsShowcase";
import { Process } from "@/components/home/Process";
import { ProjectStrip } from "@/components/home/ProjectStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { FAQ } from "@/components/home/FAQ";
import { buildMetadata } from "@/lib/seo";
import { getCategories, getFaqs, getFlagshipBrands, getPage, getProducts, getProjects, getSite, getSolutions, getTestimonials } from "@/lib/cms/store";
import { listOf, plain, sectionOf } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("home")]);
  return buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/", site });
}

export default async function HomePage() {
  const [site, page, brands, categories, products, solutions, projects, testimonials, faqs] = await Promise.all([
    getSite(), getPage("home"), getFlagshipBrands(), getCategories(), getProducts(), getSolutions(), getProjects(), getTestimonials(), getFaqs(),
  ]);
  return (
    <>
      <Hero page={page} />
      <BrandMarquee brands={brands} section={sectionOf(page, "brands")} site={site} />
      <CategoryBento categories={categories} section={sectionOf(page, "categories")} site={site} />
      <FeaturedProducts products={products} section={sectionOf(page, "featured")} />
      <SolutionsShowcase solutions={solutions} section={sectionOf(page, "solutions")} site={site} />
      <Process section={sectionOf(page, "process")} steps={listOf(page, "process")} site={site} />
      <ProjectStrip projects={projects} section={sectionOf(page, "projects")} site={site} />
      <Testimonials testimonials={testimonials} section={sectionOf(page, "testimonials")} site={site} />
      <QuoteCTA />
      <FAQ items={faqs} section={sectionOf(page, "faq")} site={site} />
    </>
  );
}
