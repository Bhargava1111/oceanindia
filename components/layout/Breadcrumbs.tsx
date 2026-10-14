import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={cn("text-xs text-muted", className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="inline-flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-fg/80 line-clamp-1">{c.name}</span>
              ) : (
                <Link href={c.path} className="hover:text-aqua">{c.name}</Link>
              )}
              {!last && <ChevronRight className="h-3 w-3" aria-hidden />}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </nav>
  );
}
