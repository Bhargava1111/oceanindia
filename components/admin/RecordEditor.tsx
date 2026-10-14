"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { blankFor, fieldsFor, type SchemaContext } from "@/lib/cms/schema";
import { FieldList, ImageInput } from "./fields";

type PageCopy = {
  slug: string;
  label: string;
  path: string;
  seo: { title: string; description: string };
  hero: { eyebrow?: string; title: string; description?: string; primaryCta?: { label: string; href: string }; secondaryCta?: { label: string; href: string } };
  sections: { key: string; eyebrow?: string; title: string; description?: string }[];
  lists: { key: string; label: string; items: { title: string; text: string; meta?: string }[] }[];
  paragraphs: { key: string; text: string }[];
  images: { key: string; src: string; alt: string; label?: string }[];
  faqs: { q: string; a: string }[];
};

export function RecordEditor({
  collection,
  label,
  singleton,
  idField,
  initial,
  isNew,
  ctx,
}: {
  collection: string;
  label: string;
  singleton?: boolean;
  idField?: string;
  initial: Record<string, unknown> | null;
  isNew?: boolean;
  ctx?: SchemaContext;
}) {
  const router = useRouter();
  const [record, setRecord] = useState<Record<string, unknown>>(() => (initial ? structuredClone(initial) : blankFor(collection)));
  const [previousId] = useState(() => (initial && idField ? String(initial[idField] ?? "") : undefined));
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const fields = useMemo(() => fieldsFor(collection, ctx), [collection, ctx]);

  async function save() {
    setPending(true);
    setError("");
    setSaved(false);
    const res = await fetch(`/api/admin/${collection}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: record, previousId: isNew ? undefined : previousId }),
    });
    const data = await res.json().catch(() => ({}));
    setPending(false);
    if (!res.ok) {
      setError(data.error || "Could not save.");
      return;
    }
    setSaved(true);
    router.refresh();
    if (!singleton && isNew && data.id) router.push(`/admin/content/${collection}/${encodeURIComponent(data.id)}`);
  }

  async function resetDefaults() {
    if (!confirm("Discard every saved edit in this collection and go back to the built-in defaults?")) return;
    await fetch(`/api/admin/${collection}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reset: true }) });
    router.refresh();
    if (!singleton) router.push(`/admin/content/${collection}`);
    else window.location.reload();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href={singleton ? "/admin" : `/admin/content/${collection}`} className="text-sm text-muted hover:text-aqua">← {label}</Link>
          <h1 className="mt-1 font-heading text-2xl font-bold">{isNew ? `New ${label.replace(/s$/, "")}` : singleton ? label : String(record.name || record.title || record.label || record.q || record.slug || "Edit")}</h1>
        </div>
        <div className="flex gap-2">
          {singleton && <button onClick={resetDefaults} className="rounded-full border border-line/20 px-4 py-2 text-sm text-muted">Reset defaults</button>}
          <button onClick={save} disabled={pending} className="rounded-full bg-aqua px-5 py-2 text-sm font-semibold text-abyss disabled:opacity-50">{pending ? "Saving…" : "Save"}</button>
        </div>
      </div>
      {error && <p className="mb-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}
      {saved && <p className="mb-4 rounded-2xl bg-teal/10 px-4 py-3 text-sm text-teal">Saved. The public site updates on the next visit.</p>}
      {collection === "pages" ? <PageFields page={record as PageCopy} onChange={(p) => setRecord(p as unknown as Record<string, unknown>)} /> : <FieldList fields={fields} record={record} onChange={setRecord} />}
      <div className="mt-8 flex justify-end">
        <button onClick={save} disabled={pending} className="rounded-full bg-aqua px-5 py-2 text-sm font-semibold text-abyss disabled:opacity-50">{pending ? "Saving…" : "Save"}</button>
      </div>
    </div>
  );
}

const input = "mt-1 w-full rounded-2xl border border-line/15 bg-bg px-3 py-2 text-sm outline-none focus:border-aqua";

function PageFields({ page, onChange }: { page: PageCopy; onChange: (p: PageCopy) => void }) {
  const set = (patch: Partial<PageCopy>) => onChange({ ...page, ...patch });
  return (
    <div className="space-y-8">
      <Card title="Page">
        <div className="grid gap-4 sm:grid-cols-3">
          <L label="Label"><input className={input} value={page.label} onChange={(e) => set({ label: e.target.value })} /></L>
          <L label="Slug"><input className={input} value={page.slug} onChange={(e) => set({ slug: e.target.value })} /></L>
          <L label="Path"><input className={input} value={page.path} onChange={(e) => set({ path: e.target.value })} /></L>
        </div>
      </Card>
      <Card title="SEO">
        <L label="Title"><input className={input} value={page.seo?.title ?? ""} onChange={(e) => set({ seo: { ...page.seo, title: e.target.value } })} /></L>
        <L label="Description"><textarea rows={3} className={input} value={page.seo?.description ?? ""} onChange={(e) => set({ seo: { ...page.seo, description: e.target.value } })} /></L>
      </Card>
      <Card title="Hero" hint="**text** becomes a gradient highlight. {name} {city} {brands} {years} {products} {projects} {phone} pull live site settings.">
        <L label="Eyebrow"><input className={input} value={page.hero?.eyebrow ?? ""} onChange={(e) => set({ hero: { ...page.hero, eyebrow: e.target.value } })} /></L>
        <L label="Title"><textarea rows={2} className={input} value={page.hero?.title ?? ""} onChange={(e) => set({ hero: { ...page.hero, title: e.target.value } })} /></L>
        <L label="Description"><textarea rows={3} className={input} value={page.hero?.description ?? ""} onChange={(e) => set({ hero: { ...page.hero, description: e.target.value } })} /></L>
        <div className="grid gap-4 sm:grid-cols-2">
          <L label="Primary button label"><input className={input} value={page.hero?.primaryCta?.label ?? ""} onChange={(e) => set({ hero: { ...page.hero, primaryCta: { label: e.target.value, href: page.hero?.primaryCta?.href ?? "/" } } })} /></L>
          <L label="Primary button link"><input className={input} value={page.hero?.primaryCta?.href ?? ""} onChange={(e) => set({ hero: { ...page.hero, primaryCta: { label: page.hero?.primaryCta?.label ?? "", href: e.target.value } } })} /></L>
          <L label="Secondary button label"><input className={input} value={page.hero?.secondaryCta?.label ?? ""} onChange={(e) => set({ hero: { ...page.hero, secondaryCta: { label: e.target.value, href: page.hero?.secondaryCta?.href ?? "/" } } })} /></L>
          <L label="Secondary button link"><input className={input} value={page.hero?.secondaryCta?.href ?? ""} onChange={(e) => set({ hero: { ...page.hero, secondaryCta: { label: page.hero?.secondaryCta?.label ?? "", href: e.target.value } } })} /></L>
        </div>
      </Card>
      <Card title="Sections">
        {(page.sections ?? []).map((s, i) => (
          <div key={i} className="mb-4 rounded-2xl border border-line/10 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <L label="Key"><input className={input} value={s.key} onChange={(e) => patchAt(page.sections, i, { key: e.target.value }, (sections) => set({ sections }))} /></L>
              <L label="Eyebrow"><input className={input} value={s.eyebrow ?? ""} onChange={(e) => patchAt(page.sections, i, { eyebrow: e.target.value }, (sections) => set({ sections }))} /></L>
            </div>
            <L label="Title"><input className={input} value={s.title} onChange={(e) => patchAt(page.sections, i, { title: e.target.value }, (sections) => set({ sections }))} /></L>
            <L label="Description"><textarea rows={2} className={input} value={s.description ?? ""} onChange={(e) => patchAt(page.sections, i, { description: e.target.value }, (sections) => set({ sections }))} /></L>
          </div>
        ))}
        <button type="button" className="text-sm text-aqua" onClick={() => set({ sections: [...(page.sections ?? []), { key: "section", title: "" }] })}>+ Add section</button>
      </Card>
      <Card title="Lists" hint="Used for steps, stats, highlights and similar repeating blocks.">
        {(page.lists ?? []).map((list, li) => (
          <div key={li} className="mb-4 rounded-2xl border border-line/10 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <L label="Key"><input className={input} value={list.key} onChange={(e) => patchAt(page.lists, li, { key: e.target.value }, (lists) => set({ lists }))} /></L>
              <L label="Label"><input className={input} value={list.label} onChange={(e) => patchAt(page.lists, li, { label: e.target.value }, (lists) => set({ lists }))} /></L>
            </div>
            {(list.items ?? []).map((item, ii) => (
              <div key={ii} className="mt-3 grid gap-2 rounded-xl bg-fg/5 p-3 sm:grid-cols-3">
                <input className={input} placeholder="Title" value={item.title} onChange={(e) => updateItem(page, li, ii, { title: e.target.value }, set)} />
                <input className={input} placeholder="Text" value={item.text} onChange={(e) => updateItem(page, li, ii, { text: e.target.value }, set)} />
                <input className={input} placeholder="Meta" value={item.meta ?? ""} onChange={(e) => updateItem(page, li, ii, { meta: e.target.value }, set)} />
              </div>
            ))}
            <button type="button" className="mt-2 text-sm text-aqua" onClick={() => {
              const lists = page.lists.map((l, i) => i === li ? { ...l, items: [...l.items, { title: "", text: "" }] } : l);
              set({ lists });
            }}>+ Item</button>
          </div>
        ))}
      </Card>
      <Card title="Images">
        {(page.images ?? []).map((img, i) => (
          <div key={i} className="mb-4 rounded-2xl border border-line/10 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <L label="Key"><input className={input} value={img.key} onChange={(e) => patchAt(page.images, i, { key: e.target.value }, (images) => set({ images }))} /></L>
              <L label="Alt"><input className={input} value={img.alt} onChange={(e) => patchAt(page.images, i, { alt: e.target.value }, (images) => set({ images }))} /></L>
            </div>
            <L label="Image"><ImageInput value={img.src} onChange={(src) => patchAt(page.images, i, { src }, (images) => set({ images }))} /></L>
          </div>
        ))}
      </Card>
      <Card title="FAQs">
        {(page.faqs ?? []).map((f, i) => (
          <div key={i} className="mb-3 rounded-2xl border border-line/10 p-4">
            <L label="Question"><input className={input} value={f.q} onChange={(e) => patchAt(page.faqs, i, { q: e.target.value }, (faqs) => set({ faqs }))} /></L>
            <L label="Answer"><textarea rows={3} className={input} value={f.a} onChange={(e) => patchAt(page.faqs, i, { a: e.target.value }, (faqs) => set({ faqs }))} /></L>
          </div>
        ))}
        <button type="button" className="text-sm text-aqua" onClick={() => set({ faqs: [...(page.faqs ?? []), { q: "", a: "" }] })}>+ Add FAQ</button>
      </Card>
      <Card title="Paragraphs">
        {(page.paragraphs ?? []).map((p, i) => (
          <div key={i} className="mb-3">
            <L label="Key"><input className={input} value={p.key} onChange={(e) => patchAt(page.paragraphs, i, { key: e.target.value }, (paragraphs) => set({ paragraphs }))} /></L>
            <L label="Text"><textarea rows={3} className={input} value={p.text} onChange={(e) => patchAt(page.paragraphs, i, { text: e.target.value }, (paragraphs) => set({ paragraphs }))} /></L>
          </div>
        ))}
      </Card>
    </div>
  );
}

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="glass rounded-3xl p-5">
      <h2 className="font-heading font-bold">{title}</h2>
      {hint && <p className="mt-1 mb-3 text-xs text-muted">{hint}</p>}
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm"><span className="text-muted">{label}</span>{children}</label>;
}

function patchAt<T>(list: T[], index: number, patch: Partial<T>, commit: (next: T[]) => void) {
  commit(list.map((item, i) => (i === index ? { ...item, ...patch } : item)));
}

function updateItem(page: PageCopy, li: number, ii: number, patch: Partial<PageCopy["lists"][number]["items"][number]>, set: (p: Partial<PageCopy>) => void) {
  const lists = page.lists.map((l, i) => i === li ? { ...l, items: l.items.map((item, j) => j === ii ? { ...item, ...patch } : item) } : l);
  set({ lists });
}
