import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { getPage, getSite } from "@/lib/cms/store";
import { sectionOf, plain, RichText } from "@/lib/pages";
import { telUrlFor, whatsappUrlFor } from "@/lib/site";

/** Shared "get a quote" banner; copy lives in Pages → Home → section "quote". */
export async function QuoteCTA() {
  const [site, home] = await Promise.all([getSite(), getPage("home")]);
  const s = sectionOf(home, "quote");
  return (
    <section className="container py-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border-gradient bg-gradient-to-br from-navy via-abyss to-abyss p-8 md:p-14 text-foam">
          <span aria-hidden className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-aqua/30 blur-3xl animate-float motion-reduce:animate-none" />
          <span aria-hidden className="absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-violet/30 blur-3xl" />
          <svg aria-hidden className="absolute inset-x-0 bottom-0 h-32 w-full opacity-30" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 60c120-40 240-40 360 0s240 40 360 0 240-40 360 0 240 40 360 0v60H0z" fill="url(#cta-w)" /><defs><linearGradient id="cta-w" x1="0" x2="1"><stop stopColor="#22D3EE" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient></defs></svg>
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-4">{plain(s.eyebrow, site)}</p>
              <h2 className="text-h1"><RichText text={s.title} site={site} highlight="text-aqua" /></h2>
              <p className="mt-4 max-w-2xl text-foam/75 text-lg">{plain(s.description, site)}</p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Button href="/quote" size="lg" iconRight={<ArrowRight />} className="w-full">Start a quote</Button>
              <Button href={whatsappUrlFor(site, `Hi ${site.name}, I'd like a quote.`)} size="lg" variant="whatsapp" icon={<MessageCircle />} className="w-full">WhatsApp us</Button>
              <a href={telUrlFor(site.contact.phonePrimary)} className="inline-flex items-center justify-center gap-2 text-sm text-foam/70 hover:text-aqua"><Phone className="h-4 w-4" />{site.contact.phonePrimary} · {site.contact.hours}</a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
