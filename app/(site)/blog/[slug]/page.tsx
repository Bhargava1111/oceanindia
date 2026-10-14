import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { getPost, getPosts, getSite } from "@/lib/cms/store";
import { whatsappUrlFor } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const [p, site] = await Promise.all([getPost(params.slug), getSite()]);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, type: "article", image: p.image, site });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: { slug: string } }) {
  const [site, posts] = await Promise.all([getSite(), getPosts()]);
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const idx = posts.findIndex((x) => x.slug === p.slug);
  const next = posts[(idx + 1) % posts.length];
  const headings = p.body.filter((b) => b.h).map((b) => b.h!);
  const anchor = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.excerpt, datePublished: p.date, image: p.image ? `${site.url}${p.image}` : undefined, author: { "@type": "Organization", name: p.author ?? site.name }, publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` } }, mainEntityOfPage: `${site.url}/blog/${p.slug}` }} />
      <article className="container pt-4 pb-24">
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }]} className="mb-8" />
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{p.category}</p>
          <h1 className="mt-4 text-display">{p.title}</h1>
          <p className="mt-5 text-lg text-muted">{p.excerpt}</p>
          <p className="mt-6 inline-flex items-center gap-4 text-sm text-muted"><span>{fmt(p.date)}</span><span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{p.readMinutes} min read</span><span>By {p.author ?? `${site.name} engineering`}</span></p>
        </header>
        <Reveal className="mt-10">
          <ImageSlot src={p.image} alt={p.title} label="Cover image" hue={p.hue} aspect="aspect-[21/9]" className="rounded-[2rem]" priority />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 glass rounded-3xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">In this article</p>
              <ol className="space-y-2 text-sm">{headings.map((h) => <li key={h}><a href={`#${anchor(h)}`} className="text-muted hover:text-aqua">{h}</a></li>)}</ol>
              <Button href={whatsappUrlFor(site, `Hi ${site.name}, I read “${p.title}” and have a question.`)} variant="whatsapp" size="sm" icon={<MessageCircle />} className="mt-6 w-full">Ask about this</Button>
            </div>
          </aside>
          <div className="lg:col-span-7 prose-ocean text-base md:text-lg">
            {p.body.map((b, i) => (
              <section key={i}>
                {b.h && <h2 id={anchor(b.h)} className="scroll-mt-32">{b.h}</h2>}
                <p>{b.p}</p>
              </section>
            ))}
            <div className="mt-12 rounded-3xl glass p-6 not-prose">
              <p className="font-heading font-bold text-fg">Want a second opinion on your setup?</p>
              <p className="mt-1 text-sm text-muted">Send photos and dimensions. An engineer replies with what to buy first — and what not to.</p>
              <div className="mt-4 flex flex-wrap gap-3"><Button href="/quote" size="sm">Get advice</Button><Button href="/store" size="sm" variant="outline">Browse the store</Button></div>
            </div>
          </div>
        </div>

        <nav className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-line/10 pt-8" aria-label="More articles">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-aqua"><ArrowLeft className="h-4 w-4" />All articles</Link>
          {next && <Link href={`/blog/${next.slug}`} className="group inline-flex items-center gap-2 text-sm font-semibold hover:text-aqua">Next: {next.title}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>}
        </nav>
      </article>
    </>
  );
}
