import type { MetadataRoute } from "next";
import { getSite } from "@/lib/cms/store";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSite();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/checkout", "/cart", "/api/", "/wishlist", "/admin"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
