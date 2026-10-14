import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Compass, Search } from "lucide-react";
import { getPage, getSite } from "@/lib/cms/store";
import { RichText } from "@/lib/pages";

export default async function NotFound() {
  const [page, site] = await Promise.all([getPage("not-found"), getSite()]);
  return (
    <SiteChrome>
      <Section size="lg" className="text-center">
        <div className="relative mx-auto max-w-2xl">
          <p className="font-heading text-[clamp(6rem,20vw,12rem)] font-bold leading-none text-gradient opacity-90 select-none" aria-hidden>404</p>
          <h1 className="text-h2 -mt-6"><RichText text={page.hero.title} site={site} /></h1>
          <p className="mt-4 text-muted text-lg"><RichText text={page.hero.description} site={site} /></p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {page.hero.primaryCta && <Button href={page.hero.primaryCta.href} icon={<Compass />}>{page.hero.primaryCta.label}</Button>}
            {page.hero.secondaryCta && <Button href={page.hero.secondaryCta.href} variant="outline" icon={<Search />}>{page.hero.secondaryCta.label}</Button>}
          </div>
        </div>
      </Section>
    </SiteChrome>
  );
}
