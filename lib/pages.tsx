import * as React from "react";
import type { PageCopy, PageItem, PageSection } from "@/data/pages";
import type { Site } from "@/data/site";
import { interpolate } from "@/lib/site";

export const sectionOf = (page: PageCopy, key: string): PageSection => page.sections.find((s) => s.key === key) ?? { key, title: "" };
export const listOf = (page: PageCopy, key: string): PageItem[] => page.lists.find((l) => l.key === key)?.items ?? [];
export const paragraphOf = (page: PageCopy, key: string): string => page.paragraphs.find((p) => p.key === key)?.text ?? "";
export const imageOf = (page: PageCopy, key: string) => page.images.find((i) => i.key === key);

/**
 * Renders CMS text: `**bold**` → gradient highlight, `\n` → <br/>, `{tokens}` → site values.
 */
export function RichText({ text, site, extra, highlight = "text-gradient" }: { text?: string; site: Site; extra?: Record<string, string | number>; highlight?: string }) {
  const src = interpolate(text, site, extra);
  const lines = src.split("\n");
  return (
    <>
      {lines.map((line, li) => (
        <React.Fragment key={li}>
          {li > 0 && <br />}
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <span key={i} className={highlight}>{part.slice(2, -2)}</span>
            ) : (
              <React.Fragment key={i}>{part}</React.Fragment>
            ),
          )}
        </React.Fragment>
      ))}
    </>
  );
}

/** Plain-text version (for metadata, aria labels). */
export const plain = (text: string | undefined, site: Site, extra?: Record<string, string | number>) =>
  interpolate(text, site, extra).replace(/\*\*/g, "").replace(/\n/g, " ");
