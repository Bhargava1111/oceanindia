import type { Metadata } from "next";
import { Compass, Ear, Handshake, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { Button } from "@/components/ui/Button";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { buildMetadata } from "@/lib/seo";
import { getPage, getSite } from "@/lib/cms/store";
import { imageOf, listOf, paragraphOf, plain, RichText, sectionOf } from "@/lib/pages";
import { toNumber } from "@/lib/site";

const valueIcons = [Ear, Ruler, Handshake, ShieldCheck, Sparkles, Compass];

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSite(), getPage("about")]);
  return buildMetadata({ title: plain(page.seo.title, site), description: plain(page.seo.description, site), path: "/about", site });
}

export default async function AboutPage() {
  const [site, page] = await Promise.all([getSite(), getPage("about")]);
  const story = sectionOf(page, "story");
  const values = listOf(page, "values");
  const timeline = listOf(page, "timeline");
  const team = listOf(page, "team");
  const stats = listOf(page, "stats");
  const img1 = imageOf(page, "control-room");
  const img2 = imageOf(page, "experience-centre");

  return (
    <>
      <PageHero
        variant="rings"
        size="lg"
        eyebrow={plain(page.hero.eyebrow, site)}
        title={<RichText text={page.hero.title} site={site} />}
        description={plain(page.hero.description, site)}
        crumbs={[{ name: "About", path: "/about" }]}
      >
        <div className="flex flex-wrap gap-3">
          {page.hero.primaryCta && <Button href={page.hero.primaryCta.href}>{page.hero.primaryCta.label}</Button>}
          {page.hero.secondaryCta && <Button href={page.hero.secondaryCta.href} variant="outline">{page.hero.secondaryCta.label}</Button>}
        </div>
      </PageHero>

      <Section size="sm">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            <ImageSlot src={img1?.src} alt={img1?.alt ?? "Team at work"} label={img1?.label ?? "Team at work"} hue={190} aspect="aspect-[3/4]" className="translate-y-6" />
            <ImageSlot src={img2?.src} alt={img2?.alt ?? "Experience centre"} label={img2?.label ?? "Experience centre"} hue={270} aspect="aspect-[3/4]" />
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-4">{plain(story.eyebrow, site)}</p>
              <h2 className="text-h2"><RichText text={story.title} site={site} /></h2>
              <div className="prose-ocean mt-5 space-y-4 text-base md:text-lg">
                {page.paragraphs.filter((p) => p.key.startsWith("story")).map((p) => <p key={p.key}>{plain(p.text, site)}</p>)}
              </div>
            </Reveal>
            {stats.length > 0 && (
              <RevealGroup className="mt-8 grid grid-cols-3 gap-3">
                {stats.map((st) => (
                  <RevealItem key={st.title} className="glass rounded-2xl p-4 text-center">
                    <p className="font-heading text-3xl font-bold tabular-nums text-gradient"><Counter to={toNumber(st.meta, site)} suffix={st.text} /></p>
                    <p className="mt-1 text-xs text-muted">{st.title}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>
        </div>
      </Section>

      <WaveDivider flip />
      <Section className="bg-bg-2">
        <SectionHeader align="center" eyebrow={plain(sectionOf(page, "values").eyebrow, site)} title={<RichText text={sectionOf(page, "values").title} site={site} />} />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <RevealItem key={v.title} className="glass rounded-3xl p-6 border-gradient">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-aqua/15 text-aqua"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 font-heading text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{plain(v.text, site)}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>
      <WaveDivider />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeader className="lg:col-span-4 lg:sticky lg:top-32 self-start mb-0" eyebrow={plain(sectionOf(page, "timeline").eyebrow, site)} title={<RichText text={sectionOf(page, "timeline").title} site={site} />} description={plain(sectionOf(page, "timeline").description, site)} />
          <ol className="lg:col-span-8 relative border-l border-line/15 pl-8 space-y-10">
            {timeline.map((t, i) => (
              <Reveal as="li" key={`${t.meta}-${t.title}`} delay={i * 0.05} className="relative">
                <span aria-hidden className="absolute -left-[2.45rem] top-1.5 grid h-5 w-5 place-items-center rounded-full bg-bg ring-2 ring-aqua"><span className="h-2 w-2 rounded-full bg-aqua" /></span>
                <p className="font-heading text-sm font-bold text-aqua">{t.meta}</p>
                <h3 className="mt-1 font-heading text-xl font-bold">{t.title}</h3>
                <p className="mt-2 text-muted">{plain(t.text, site)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section size="sm" className="bg-bg-2/30">
        <SectionHeader eyebrow={plain(sectionOf(page, "team").eyebrow, site)} title={<RichText text={sectionOf(page, "team").title} site={site} />} description={plain(sectionOf(page, "team").description, site)} />
        <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {team.map((m, i) => (
            <RevealItem key={`${m.title}-${i}`}>
              <ImageSlot src={m.meta || undefined} alt={`${site.name} team — ${m.text}`} label="Team photo" hue={180 + i * 30} aspect="aspect-[4/5]" className="rounded-3xl" />
              <p className="mt-3 font-heading font-semibold">{m.title}</p>
              <p className="text-xs text-muted">{m.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <QuoteCTA />
    </>
  );
}
