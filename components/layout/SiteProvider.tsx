"use client";

import * as React from "react";
import type { Site } from "@/data/site";
import { site as defaultSite } from "@/data/site";
import { telUrlFor, whatsappUrlFor } from "@/lib/site";

type Ctx = { site: Site; whatsappUrl: (text?: string) => string; telUrl: (phone?: string) => string };

const SiteContext = React.createContext<Ctx | null>(null);

export function SiteProvider({ site, children }: { site: Site; children: React.ReactNode }) {
  const value = React.useMemo<Ctx>(
    () => ({ site, whatsappUrl: (text) => whatsappUrlFor(site, text), telUrl: (phone) => telUrlFor(phone ?? site.contact.phonePrimary) }),
    [site],
  );
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

/** Access live site settings from client components. Falls back to code defaults outside the provider. */
export function useSite(): Ctx {
  const ctx = React.useContext(SiteContext);
  if (ctx) return ctx;
  return { site: defaultSite, whatsappUrl: (t) => whatsappUrlFor(defaultSite, t), telUrl: (p) => telUrlFor(p ?? defaultSite.contact.phonePrimary) };
}
