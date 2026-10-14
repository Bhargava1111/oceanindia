import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { getLegal, getLegalDocs, getSite } from "@/lib/cms/store";
import { interpolate } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getLegalDocs()).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const [d, site] = await Promise.all([getLegal(params.slug), getSite()]);
  if (!d) return {};
  return buildMetadata({ title: d.title, description: interpolate(`${d.summary} ${site.name} ${d.title.toLowerCase()}.`, site), path: `/legal/${d.slug}`, site });
}

const anchor = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function LegalPage({ params }: { params: { slug: string } }) {
  const [site, docs] = await Promise.all([getSite(), getLegalDocs()]);
  const d = docs.find((x) => x.slug === params.slug);
  if (!d) notFound();
  const t = (s: string) => interpolate(s, site);
  return (
    <>
      <PageHero variant="plain" size="sm" eyebrow={`Legal · updated ${fmt(d.updated)}`} title={d.title} description={t(d.summary)} crumbs={[{ name: "Legal", path: "/legal/privacy" }, { name: d.title, path: `/legal/${d.slug}` }]} />
      <Section size="sm" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-4">
              <nav aria-label="Legal pages" className="glass rounded-3xl p-2">
                {docs.map((x) => (
                  <Link key={x.slug} href={`/legal/${x.slug}`} className={cn("block rounded-2xl px-4 py-2.5 text-sm", x.slug === d.slug ? "bg-aqua/15 text-aqua font-semibold" : "text-muted hover:bg-fg/5")}>{x.title}</Link>
                ))}
              </nav>
              <nav aria-label="On this page" className="hidden lg:block glass rounded-3xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">On this page</p>
                <ol className="space-y-2 text-sm">{d.sections.map((s) => <li key={s.h}><a href={`#${anchor(s.h)}`} className="text-muted hover:text-aqua">{s.h}</a></li>)}</ol>
              </nav>
            </div>
          </aside>
          <div className="lg:col-span-8 lg:col-start-5 prose-ocean">
            {d.sections.map((s) => (
              <section key={s.h} id={anchor(s.h)} className="scroll-mt-32">
                <h2>{s.h}</h2>
                {s.p?.map((para, i) => <p key={i}>{t(para)}</p>)}
                {s.items && <ul>{s.items.map((it) => <li key={it}>{t(it)}</li>)}</ul>}
              </section>
            ))}
            <p className="mt-12 text-sm">Questions? Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or call {site.contact.phonePrimary}.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
