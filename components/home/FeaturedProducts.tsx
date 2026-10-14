"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/store/ProductCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useSite } from "@/components/layout/SiteProvider";
import type { Product } from "@/data/products";
import type { PageSection } from "@/data/pages";
import { plain, RichText } from "@/lib/pages";

const tabs = [
  { id: "new", label: "New arrivals" },
  { id: "bestseller", label: "Bestsellers" },
  { id: "combo", label: "Combo offers" },
  { id: "offer", label: "Deals" },
];

export function FeaturedProducts({ products, section }: { products: Product[]; section: PageSection }) {
  const { site } = useSite();
  const [tab, setTab] = React.useState("new");
  const list = products.filter((p) => p.badges?.includes(tab as any)).slice(0, 8);
  return (
    <Section id="featured" className="bg-bg-2/30">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
        <SectionHeader eyebrow={plain(section.eyebrow, site)} title={<RichText text={section.title} site={site} />} description={plain(section.description, site)} className="mb-0" />
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
      </div>
      <RevealGroup key={tab} className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {list.map((p) => <RevealItem key={p.slug}><ProductCard product={p} /></RevealItem>)}
      </RevealGroup>
      <div className="mt-10 text-center">
        <Button href="/store" variant="outline" iconRight={<ArrowRight />}>Browse all products</Button>
      </div>
    </Section>
  );
}
