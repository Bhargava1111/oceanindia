import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/graphics/ImageSlot";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { FAQ } from "@/components/home/FAQ";
import { ProductCard } from "@/components/store/ProductCard";
import { getProducts, getProjects, getSite, getSolution, getSolutions } from "@/lib/cms/store";
import { whatsappUrlFor } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getSolutions()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const [s, site] = await Promise.all([getSolution(params.slug), getSite()]);
  if (!s) return {};
  return buildMetadata({ title: `${s.name} — design, supply, install & calibrate`, description: s.summary, path: `/solutions/${s.slug}`, image: s.image, site });
}

/** Project gallery types that illustrate each solution (second hero photo). */
const projectTypeFor: Record<string, string> = {
  "recording-studio": "Studio", "podcast-studio": "Podcast", "atmos-studio": "Studio", auditorium: "Auditorium", "pa-system": "Auditorium",
  "conference-room": "Conference", "smart-classroom": "Classroom", "home-theatre": "Home theatre", "pub-club": "Venue", gym: "Venue", "acoustic-treatment": "Acoustics",
};

const hueFor = { aqua: 190, teal: 170, violet: 270 } as const;

/** A few products that commonly appear in each kind of room. */
const gearFor: Record<string, string[]> = {
  "recording-studio": ["studio-monitors", "audio-interfaces", "microphones", "preamps-channel-strips"],
  "podcast-studio": ["microphones", "audio-interfaces", "headphones", "mixers-consoles"],
  "atmos-studio": ["studio-monitors", "audio-interfaces"],
  auditorium: ["live-sound", "mixers-consoles", "microphones"],
  "pa-system": ["live-sound", "mixers-consoles", "microphones"],
  "home-theatre": ["live-sound", "acoustic-treatment"],
  "acoustic-treatment": ["acoustic-treatment", "studio-monitors"],
  "pub-club": ["dj-gear", "live-sound"],
  gym: ["live-sound", "microphones"],
};

export default async function SolutionPage({ params }: { params: { slug: string } }) {
  const [site, solutions, products, projects] = await Promise.all([getSite(), getSolutions(), getProducts(), getProjects()]);
  const s = solutions.find((x) => x.slug === params.slug);
  if (!s) notFound();
  const siblings = solutions.filter((x) => x.group === s.group && x.slug !== s.slug).slice(0, 3);
  const cats = gearFor[s.slug] ?? ["microphones", "studio-monitors"];
  const gear = cats.flatMap((c) => products.filter((p) => p.category === c).slice(0, 1)).slice(0, 4);
  const accentText = s.accent === "aqua" ? "text-aqua" : s.accent === "teal" ? "text-teal" : "text-violet";
  const photo1 = s.gallery?.[0] ?? s.image;
  const photo2 = s.gallery?.[1] ?? projects.find((p) => p.type === projectTypeFor[s.slug] && p.image)?.image;

  return (
    <>
      <PageHero
        variant="aurora"
        accent={s.accent}
        size="md"
        eyebrow={`${s.group} · ${s.tagline}`}
        title={s.name}
        description={s.summary}
        crumbs={[{ name: "Solutions", path: "/solutions" }, { name: s.name, path: `/solutions/${s.slug}` }]}
        aside={
          <div className="grid grid-cols-2 gap-3">
            <ImageSlot src={photo1} alt={`${s.name} — project photo 1`} label="Project photo" hue={hueFor[s.accent]} aspect="aspect-[3/4]" className="translate-y-5" priority />
            <ImageSlot src={photo2} alt={`${s.name} — project photo 2`} label="Project photo" hue={hueFor[s.accent] + 40} aspect="aspect-[3/4]" />
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#enquire" iconRight={<ArrowRight />}>Plan this room</Button>
          <Button href={whatsappUrlFor(site, `Hi ${site.name}, I’m planning a ${s.name.toLowerCase()} project.`)} variant="whatsapp">WhatsApp an engineer</Button>
        </div>
      </PageHero>

      {/* Stats strip */}
      {s.stats && (
        <div className="container -mt-6 mb-10">
          <RevealGroup className="grid gap-3 sm:grid-cols-3">
            {s.stats.map((st) => (
              <RevealItem key={st.label} className="glass rounded-2xl px-5 py-4 flex items-baseline justify-between">
                <span className="text-sm text-muted">{st.label}</span><span className={cn("font-heading text-2xl font-bold", accentText)}>{st.value}</span>
              </RevealItem>
            ))}
            <RevealItem className="glass rounded-2xl px-5 py-4 flex items-baseline justify-between"><span className="text-sm text-muted">Warranty</span><span className={cn("font-heading text-2xl font-bold", accentText)}>12 months</span></RevealItem>
          </RevealGroup>
        </div>
      )}

      {/* Approach + deliverables */}
      <Section size="sm">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-4">Our approach</p>
            <h2 className="text-h2">Designed from the room outward.</h2>
            <p className="mt-5 text-muted leading-relaxed text-base md:text-lg">{s.description}</p>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Ideal for</p>
              <ul className="flex flex-wrap gap-2">{s.idealFor.map((x) => <li key={x} className="rounded-full border border-line/15 px-3 py-1.5 text-sm">{x}</li>)}</ul>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">What you get</p>
            <RevealGroup as="ol" className="space-y-3">
              {s.deliverables.map((d, i) => (
                <RevealItem as="li" key={d} className="glass rounded-2xl p-5 flex items-start gap-4">
                  <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl font-heading font-bold text-sm", s.accent === "aqua" ? "bg-aqua/15 text-aqua" : s.accent === "teal" ? "bg-teal/15 text-teal" : "bg-violet/15 text-violet")}>0{i + 1}</span>
                  <div>
                    <p className="font-heading font-semibold">{d}</p>
                  </div>
                  <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-teal/70" aria-hidden />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* Gear commonly used */}
      {gear.length > 0 && (
        <>
          <WaveDivider flip />
          <Section className="bg-bg-2" size="sm">
            <div className="flex items-end justify-between mb-8">
              <SectionHeader eyebrow="Typical equipment" title={<>Gear that often ends up <span className="text-gradient">in these rooms.</span></>} className="mb-0" />
              <Link href="/store" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold hover:text-aqua">Full store <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <RevealGroup className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
              {gear.map((p) => <RevealItem key={p.slug}><ProductCard product={p} /></RevealItem>)}
            </RevealGroup>
          </Section>
          <WaveDivider />
        </>
      )}

      {/* Enquiry */}
      <Section id="enquire" size="sm">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <SectionHeader className="lg:col-span-5 lg:sticky lg:top-32 mb-0" eyebrow="Start the conversation" title={<>Tell us about <span className="text-gradient">your space.</span></>} description="Dimensions, use, budget range and timeline are enough to begin. We reply with questions, then a plan and a budget — free, no obligation." />
          <div className="lg:col-span-7"><LeadForm source={`solution:${s.slug}`} defaultInterest={s.name} interestOptions={[s.name, ...solutions.filter((x) => x.slug !== s.slug).map((x) => x.name)]} showCompany cta="Request a proposal" /></div>
        </div>
      </Section>

      {s.faqs && <FAQ items={s.faqs} section={{ key: "faq", eyebrow: "Project FAQ", title: `Common questions about **${s.name.toLowerCase()}.**` }} site={site} />}

      {siblings.length > 0 && (
        <Section size="sm" className="bg-bg-2/30">
          <p className="eyebrow mb-4">More in {s.group}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {siblings.map((x) => (
              <Link key={x.slug} href={`/solutions/${x.slug}`} className="group glass rounded-3xl p-6 hover:-translate-y-1 transition-all duration-500">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">{x.tagline}</p>
                <h3 className="mt-2 font-heading text-lg font-bold">{x.name}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-sm group-hover:text-aqua">Explore <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
