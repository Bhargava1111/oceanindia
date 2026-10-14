import type { Site } from "@/data/site";

/** Build a wa.me link from site settings. */
export const whatsappUrlFor = (site: Pick<Site, "contact">, text?: string) =>
  `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telUrlFor = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

/** Replace {brands} {years} {projects} {products} {phone} {hours} {city} {name} tokens. */
export function interpolate(text: string | undefined, site: Site, extra: Record<string, string | number> = {}): string {
  if (!text) return "";
  const map: Record<string, string | number> = {
    brands: site.brandsCount,
    years: site.yearsExperience,
    projects: site.projectsCount,
    products: site.productsCount.toLocaleString("en-IN"),
    phone: site.contact.phonePrimary,
    hours: site.contact.hours,
    city: site.contact.address.city,
    name: site.name,
    email: site.contact.email,
    legalName: site.legalName,
    url: site.url,
    state: site.contact.address.state,
    dispatchDays: site.policies.dispatchDays,
    returnWindowDays: site.policies.returnWindowDays,
    refundDays: site.policies.refundDays,
    ...extra,
  };
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in map ? String(map[k]) : m));
}

export const toNumber = (v: string | number | undefined, site: Site) => {
  const s = interpolate(typeof v === "number" ? String(v) : v, site).replace(/[^0-9.]/g, "");
  return Number(s) || 0;
};
