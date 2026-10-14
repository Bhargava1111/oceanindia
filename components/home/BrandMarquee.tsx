import Link from "next/link";
import type { Brand } from "@/data/brands";
import type { PageSection } from "@/data/pages";
import type { Site } from "@/data/site";
import { plain } from "@/lib/pages";

export function BrandMarquee({ brands, section, site }: { brands: Brand[]; section: PageSection; site: Site }) {
  const list = [...brands, ...brands];
  return (
    <section aria-label="Brands we carry" className="py-10 border-y border-line/10 bg-bg-2/40">
      <div className="container flex items-center gap-6 mb-5">
        <p className="eyebrow shrink-0">{plain(section.eyebrow, site)}</p>
        <span className="h-px flex-1 bg-line/10" aria-hidden />
        <Link href="/brands" className="text-sm text-muted hover:text-aqua shrink-0">{plain(section.title, site)}</Link>
      </div>
      <div className="mask-fade-x overflow-hidden pause-on-hover">
        <ul className="flex w-max animate-marquee gap-10 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center">
          {list.map((b, i) => (
            <li key={b.name + i} aria-hidden={i >= brands.length} className="font-heading text-xl md:text-2xl font-bold tracking-tight text-fg/50 hover:text-fg transition whitespace-nowrap">
              {b.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
