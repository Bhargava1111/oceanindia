import { cache } from "react";
import { revalidatePath } from "next/cache";
import { readJson, writeJson } from "./storage";
import { site as defaultSite, type Site } from "@/data/site";
import { mainNav, footerNav, type NavGroup, type NavLink } from "@/data/nav";
import { pages as defaultPages, type PageCopy } from "@/data/pages";
import { products as defaultProducts, type Product } from "@/data/products";
import { categories as defaultCategories, type Category } from "@/data/categories";
import { brands as defaultBrands, type Brand } from "@/data/brands";
import { solutions as defaultSolutions, type Solution } from "@/data/solutions";
import { projects as defaultProjects, type Project } from "@/data/projects";
import { posts as defaultPosts, type Post } from "@/data/blog";
import { landingPages as defaultLanding, type LandingPage } from "@/data/landing";
import { testimonials as defaultTestimonials, type Testimonial } from "@/data/testimonials";
import { generalFaqs as defaultFaqs, type FAQ } from "@/data/faqs";
import { legalDocs as defaultLegal, type LegalDoc } from "@/data/legal";

/* ------------------------------------------------------------------ */
/* Records created at runtime                                          */
/* ------------------------------------------------------------------ */
export type Lead = {
  id: string;
  createdAt: string;
  source: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  interest?: string;
  budget?: string;
  product?: string;
  message?: string;
  status: "new" | "contacted" | "quoted" | "won" | "lost";
  notes?: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: "pending-payment" | "paid" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
  payment: "razorpay" | "bank";
  paymentRef?: string;
  customer: { name: string; phone: string; email: string; gstin?: string };
  address: { line1: string; line2?: string; city: string; state: string; pincode: string; notes?: string };
  items: { slug: string; name: string; qty: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  tracking?: { courier?: string; awb?: string; url?: string };
  notes?: string;
};

export type Subscriber = { email: string; createdAt: string; source?: string };

export type NavData = { mainNav: NavGroup[]; footerNav: Record<string, NavLink[]> };

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */
export type CollectionDef = { label: string; defaults: unknown; idField?: string; singleton?: boolean };

export const registry: Record<string, CollectionDef> = {
  site: { label: "Site settings", defaults: defaultSite, singleton: true },
  nav: { label: "Navigation", defaults: { mainNav, footerNav } satisfies NavData, singleton: true },
  pages: { label: "Pages", defaults: defaultPages, idField: "slug" },
  products: { label: "Products", defaults: defaultProducts, idField: "slug" },
  categories: { label: "Categories", defaults: defaultCategories, idField: "slug" },
  brands: { label: "Brands", defaults: defaultBrands, idField: "name" },
  solutions: { label: "Solutions", defaults: defaultSolutions, idField: "slug" },
  projects: { label: "Projects", defaults: defaultProjects, idField: "slug" },
  blog: { label: "Blog posts", defaults: defaultPosts, idField: "slug" },
  landing: { label: "Landing pages", defaults: defaultLanding, idField: "slug" },
  testimonials: { label: "Testimonials", defaults: defaultTestimonials, idField: "name" },
  faqs: { label: "FAQs", defaults: defaultFaqs, idField: "q" },
  legal: { label: "Legal pages", defaults: defaultLegal, idField: "slug" },
  leads: { label: "Leads", defaults: [] as Lead[], idField: "id" },
  orders: { label: "Orders", defaults: [] as Order[], idField: "id" },
  subscribers: { label: "Subscribers", defaults: [] as Subscriber[], idField: "email" },
};

export const isCollection = (name: string): name is keyof typeof registry => Object.prototype.hasOwnProperty.call(registry, name);

/* ------------------------------------------------------------------ */
/* Generic read / write                                                */
/* ------------------------------------------------------------------ */
export const getCollection = cache(async <T,>(name: string): Promise<T> => {
  const def = registry[name];
  if (!def) throw new Error(`Unknown collection: ${name}`);
  const saved = await readJson<T>(name);
  if (saved === undefined) return def.defaults as T;
  if (def.singleton) return deepMerge(def.defaults, saved) as T;
  return saved;
});

export async function saveCollection(name: string, data: unknown) {
  if (!registry[name]) throw new Error(`Unknown collection: ${name}`);
  await writeJson(name, data);
  revalidateAll();
}

export async function upsertItem<T extends Record<string, unknown>>(name: string, item: T, previousId?: string): Promise<T[]> {
  const def = registry[name];
  if (!def || def.singleton || !def.idField) throw new Error(`Collection ${name} is not a list`);
  const list = [...(await getCollection<T[]>(name))];
  const id = String(item[def.idField]);
  const matchId = previousId ?? id;
  const idx = list.findIndex((x) => String(x[def.idField!]) === matchId);
  if (idx >= 0) list[idx] = item;
  else list.unshift(item);
  await saveCollection(name, list);
  return list;
}

export async function deleteItem(name: string, id: string) {
  const def = registry[name];
  if (!def || def.singleton || !def.idField) throw new Error(`Collection ${name} is not a list`);
  const list = (await getCollection<Record<string, unknown>[]>(name)).filter((x) => String(x[def.idField!]) !== id);
  await saveCollection(name, list);
  return list;
}

export async function appendItem<T>(name: string, item: T) {
  const list = [item, ...(await getCollection<T[]>(name))];
  await writeJson(name, list); // no revalidation needed for leads/orders/subscribers
  return list;
}

export function revalidateAll() {
  try {
    revalidatePath("/", "layout");
  } catch {
    /* outside a request scope (e.g. scripts) */
  }
}

/* ------------------------------------------------------------------ */
/* Typed getters                                                       */
/* ------------------------------------------------------------------ */
export const getSite = cache(() => getCollection<Site>("site"));
export const getNav = cache(() => getCollection<NavData>("nav"));
export const getProducts = cache(async () => {
  const list = await getCollection<Product[]>("products");
  // Give seeded products a starting stock so inventory and checkout work before the first edit.
  return list.map((p) => (typeof p.stock === "number" ? p : { ...p, stock: p.inStock === false ? 0 : 12 }));
});
export const getCategories = cache(() => getCollection<Category[]>("categories"));
export const getBrands = cache(() => getCollection<Brand[]>("brands"));
export const getSolutions = cache(() => getCollection<Solution[]>("solutions"));
export const getProjects = cache(() => getCollection<Project[]>("projects"));
export const getPosts = cache(() => getCollection<Post[]>("blog"));
export const getLandingPages = cache(() => getCollection<LandingPage[]>("landing"));
export const getTestimonials = cache(() => getCollection<Testimonial[]>("testimonials"));
export const getFaqs = cache(() => getCollection<FAQ[]>("faqs"));
export const getLegalDocs = cache(() => getCollection<LegalDoc[]>("legal"));
export const getLeads = cache(() => getCollection<Lead[]>("leads"));
export const getOrders = cache(() => getCollection<Order[]>("orders"));
export const getSubscribers = cache(() => getCollection<Subscriber[]>("subscribers"));

export const getProduct = async (slug: string) => (await getProducts()).find((p) => p.slug === slug);
export const getCategory = async (slug: string) => (await getCategories()).find((c) => c.slug === slug);
export const getSolution = async (slug: string) => (await getSolutions()).find((s) => s.slug === slug);
export const getPost = async (slug: string) => (await getPosts()).find((p) => p.slug === slug);
export const getLanding = async (slug: string) => (await getLandingPages()).find((l) => l.slug === slug);
export const getLegal = async (slug: string) => (await getLegalDocs()).find((l) => l.slug === slug);
export const getFlagshipBrands = async () => (await getBrands()).filter((b) => b.tier === "flagship");

/** Page copy merged with code defaults so newly added keys always resolve. */
export const getPage = cache(async (slug: string): Promise<PageCopy> => {
  const base = defaultPages.find((p) => p.slug === slug);
  const saved = (await getCollection<PageCopy[]>("pages")).find((p) => p.slug === slug);
  if (!base) {
    if (!saved) throw new Error(`Unknown page: ${slug}`);
    return saved;
  }
  if (!saved) return base;
  return {
    ...base,
    ...saved,
    seo: { ...base.seo, ...saved.seo },
    hero: { ...base.hero, ...saved.hero },
    sections: mergeByKey(base.sections, saved.sections, "key"),
    lists: mergeByKey(base.lists, saved.lists, "key"),
    paragraphs: mergeByKey(base.paragraphs, saved.paragraphs, "key"),
    images: mergeByKey(base.images, saved.images, "key"),
    faqs: saved.faqs?.length ? saved.faqs : base.faqs,
  };
});

export const getPages = cache(async (): Promise<PageCopy[]> => {
  const saved = await getCollection<PageCopy[]>("pages");
  const slugs = Array.from(new Set([...defaultPages.map((p) => p.slug), ...saved.map((p) => p.slug)]));
  return Promise.all(slugs.map((s) => getPage(s)));
});

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
function mergeByKey<T extends Record<string, unknown>>(base: T[] = [], saved: T[] = [], key: string): T[] {
  const out = base.map((b) => saved.find((s) => s[key] === b[key]) ?? b);
  saved.forEach((s) => {
    if (!base.some((b) => b[key] === s[key])) out.push(s);
  });
  return out;
}

export function deepMerge<T>(base: T, patch: unknown): T {
  if (Array.isArray(base) || Array.isArray(patch)) return (patch ?? base) as T;
  if (base && typeof base === "object" && patch && typeof patch === "object") {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(patch as Record<string, unknown>)) {
      out[k] = k in out ? deepMerge(out[k], v) : v;
    }
    return out as T;
  }
  return (patch === undefined ? base : patch) as T;
}

export const newId = (prefix: string) => `${prefix}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
