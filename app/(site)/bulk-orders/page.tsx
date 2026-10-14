import type { Metadata } from "next";
import { Building2, GraduationCap, Mic2, Store, BadgePercent, FileCheck2, Truck, Wrench } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { FAQ } from "@/components/home/FAQ";
import { buildMetadata } from "@/lib/seo";
import { getPage, getSite } from "@/lib/cms/store";
import { listOf, plain, RichText, sectionOf } from "@/lib/pages";

const whoIcons = [GraduationCap, Building2, Mic2, Store];
const perkIcons = [BadgePercent, FileCheck2, Truck, Wrench];

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("bulk-orders")]);
  return buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/bulk-orders", site });
}

export default async function BulkOrdersPage() {
  const [site, page] = await Promise.all([getSite(), getPage("bulk-orders")]);
  const tiers = listOf(page, "tiers");
  const who = listOf(page, "who");
  const perks = listOf(page, "perks");
  return (
    <>
      <PageHero
        variant="rings"
        size="md"
        eyebrow={plain(page.hero.eyebrow, site)}
        title={<RichText text={page.hero.title} site={site} />}
        description={plain(page.hero.description, site)}
        crumbs={[{ name: "Bulk orders", path: "/bulk-orders" }]}
        aside={
          tiers.length > 0 ? (
            <RevealGroup className="grid gap-3">
              {tiers.map((t, i) => (
                <RevealItem key={t.meta ?? t.title} className={`glass rounded-2xl p-5 flex items-center gap-5 ${i === 1 ? "border-gradient" : ""}`}>
                  <p className="font-heading text-lg font-bold text-gradient whitespace-nowrap">{t.meta}</p>
                  <div><p className="font-semibold">{t.title}</p><p className="text-xs text-muted">{plain(t.text, site)}</p></div>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : undefined
        }
      />

      <Section size="sm">
        <SectionHeader eyebrow={plain(sectionOf(page, "who").eyebrow, site)} title={<RichText text={sectionOf(page, "who").title} site={site} />} />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {who.map((w, i) => {
            const Icon = whoIcons[i % whoIcons.length];
            return (
              <RevealItem key={w.title} className="glass rounded-3xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet/15 text-violet"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-heading font-bold">{w.title}</h3>
                <p className="mt-1 text-sm text-muted">{plain(w.text, site)}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <WaveDivider flip />
      <Section className="bg-bg-2" size="sm">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={plain(sectionOf(page, "perks").eyebrow, site)} title={<RichText text={sectionOf(page, "perks").title} site={site} />} className="mb-8" />
            <ul className="space-y-5">
              {perks.map((p, i) => {
                const Icon = perkIcons[i % perkIcons.length];
                return (
                  <Reveal as="li" key={p.title} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-aqua/15 text-aqua"><Icon className="h-5 w-5" /></span>
                    <div><p className="font-heading font-semibold">{p.title}</p><p className="text-sm text-muted">{plain(p.text, site)}</p></div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <LeadForm source="bulk-orders" showCompany defaultInterest="Buying equipment" interestOptions={["Buying equipment", "Classrooms / campus AV", "Auditorium / PA", "Conference rooms", "Studio fleet", "Reseller / trade account"]} cta="Request bulk pricing" successTitle="Got it — an account manager will be in touch." />
          </div>
        </div>
      </Section>
      <WaveDivider />

      <FAQ items={page.faqs} section={sectionOf(page, "faq")} site={site} />
    </>
  );
}
