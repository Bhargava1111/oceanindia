import type { MetadataRoute } from "next";
import { getCategories, getLandingPages, getLegalDocs, getPosts, getProducts, getSite, getSolutions } from "@/lib/cms/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, categories, products, solutions, landingPages, posts, legal] = await Promise.all([
    getSite(), getCategories(), getProducts(), getSolutions(), getLandingPages(), getPosts(), getLegalDocs(),
  ]);
  const now = new Date();
  const staticPaths = ["", "/about", "/store", "/solutions", "/brands", "/gallery", "/blog", "/contact", "/quote", "/bulk-orders"];
  return [
    ...staticPaths.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...legal.map((d) => ({ url: `${site.url}/legal/${d.slug}`, lastModified: new Date(d.updated), changeFrequency: "yearly" as const, priority: 0.3 })),
    ...categories.map((c) => ({ url: `${site.url}/store/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: `${site.url}/product/${p.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...solutions.map((s) => ({ url: `${site.url}/solutions/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...landingPages.map((l) => ({ url: `${site.url}/lp/${l.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...posts.map((b) => ({ url: `${site.url}/blog/${b.slug}`, lastModified: new Date(b.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
