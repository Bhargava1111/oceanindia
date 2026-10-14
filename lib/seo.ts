import type { Metadata } from "next";
import { site as defaultSite, type Site } from "@/data/site";
import type { Product } from "@/data/products";
import { isInStock } from "@/lib/catalog";

export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
  image,
  site = defaultSite,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  site?: Site;
}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const img = image ? (image.startsWith("http") ? image : `${site.url}${image}`) : `${site.url}/opengraph-image`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description, url, siteName: site.name, type, locale: site.locale, images: [{ url: img, width: 1200, height: 630, alt: site.name }] },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export const organizationJsonLd = (site: Site = defaultSite) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description: site.description,
  foundingDate: String(site.foundedYear),
  contactPoint: [{ "@type": "ContactPoint", telephone: site.contact.phonePrimary, contactType: "sales", email: site.contact.email, areaServed: "IN", availableLanguage: ["en", "hi", "kn"] }],
  sameAs: Object.values(site.social).filter(Boolean),
});

export const localBusinessJsonLd = (site: Site = defaultSite) => ({
  "@context": "https://schema.org",
  "@type": "ElectronicsStore",
  name: site.name,
  url: site.url,
  telephone: site.contact.phonePrimary,
  email: site.contact.email,
  priceRange: "₹₹₹",
  image: `${site.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.contact.address.line1}, ${site.contact.address.line2}`,
    addressLocality: site.contact.address.city,
    addressRegion: site.contact.address.state,
    postalCode: site.contact.address.postalCode,
    addressCountry: site.contact.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.contact.address.geo.lat, longitude: site.contact.address.geo.lng },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:30" }],
});

export const productJsonLd = (p: Product, site: Site = defaultSite) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.description,
  brand: { "@type": "Brand", name: p.brand },
  sku: p.sku ?? p.slug,
  image: p.image ? `${site.url}${p.image}` : `${site.url}/opengraph-image`,
  url: `${site.url}/product/${p.slug}`,
  ...(p.price
    ? { offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: isInStock(p) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", url: `${site.url}/product/${p.slug}`, seller: { "@type": "Organization", name: site.name } } }
    : {}),
  ...(p.rating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: 12 } } : {}),
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[], site: Site = defaultSite) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
