import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { CookieBar } from "@/components/layout/CookieBar";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";
import { getCategories, getNav, getProducts, getSite, getSolutions } from "@/lib/cms/store";

/** Public-site shell: navbar (with live search index), footer, floating contact, cookie bar. */
export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const [site, nav, products, categories, solutions] = await Promise.all([getSite(), getNav(), getProducts(), getCategories(), getSolutions()]);
  const searchIndex = {
    products: products.map((p) => ({ slug: p.slug, name: p.name, brand: p.brand, category: p.category, price: p.price, image: p.image, hue: p.hue })),
    categories: categories.map((c) => ({ slug: c.slug, name: c.name, short: c.short })),
    solutions: solutions.map((s) => ({ slug: s.slug, name: s.name, tagline: s.tagline })),
  };
  return (
    <>
      <Navbar nav={nav.mainNav} searchIndex={searchIndex} />
      <main id="main" className="min-w-0 flex-1 overflow-x-clip pt-20 lg:pt-28">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer nav={nav.footerNav} categories={categories} />
      <FloatingContact />
      <CookieBar />
      <JsonLd data={[organizationJsonLd(site), localBusinessJsonLd(site)]} />
    </>
  );
}

export type SearchIndex = {
  products: { slug: string; name: string; brand: string; category: string; price: number | null; image?: string; hue?: number }[];
  categories: { slug: string; name: string; short: string }[];
  solutions: { slug: string; name: string; tagline: string }[];
};
