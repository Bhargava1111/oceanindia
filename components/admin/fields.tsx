"use client";

import { useState } from "react";
import type { Field } from "@/lib/cms/schema";

export function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined), obj);
}

export function setPath(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let cur: Record<string, unknown> = obj;
  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      cur[key] = value;
      return;
    }
    const next = cur[key];
    if (!next || typeof next !== "object" || Array.isArray(next)) cur[key] = {};
    cur = cur[key] as Record<string, unknown>;
  });
}

export function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const cls = "mt-1.5 w-full rounded-2xl border border-line/15 bg-bg px-3 py-2.5 text-sm outline-none focus:border-aqua";
  if (field.type === "textarea") {
    return <textarea rows={4} className={cls} value={value == null ? "" : String(value)} onChange={(e) => onChange(e.target.value)} />;
  }
  if (field.type === "number") {
    return (
      <input
        type="number"
        className={cls}
        value={value == null || value === "" ? "" : String(value)}
        onChange={(e) => onChange(e.target.value === "" ? (field.nullable ? null : undefined) : Number(e.target.value))}
      />
    );
  }
  if (field.type === "boolean") {
    return (
      <label className="mt-2 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} />
        <span>{value === true ? "Yes" : "No"}</span>
      </label>
    );
  }
  if (field.type === "select") {
    return (
      <select className={cls} value={value == null ? "" : String(value)} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {(field.options ?? []).filter(Boolean).map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    );
  }
  if (field.type === "tags") {
    const text = Array.isArray(value) ? value.join(", ") : value == null ? "" : String(value);
    return <input className={cls} value={text} onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} placeholder="comma, separated" />;
  }
  if (field.type === "json") return <JsonInput value={value} onChange={onChange} />;
  if (field.type === "image") return <ImageInput value={value == null ? "" : String(value)} onChange={onChange} />;
  return <input className={cls} value={value == null ? "" : String(value)} onChange={(e) => onChange(e.target.value)} />;
}

function JsonInput({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const [text, setText] = useState(() => JSON.stringify(value ?? null, null, 2));
  const [error, setError] = useState("");
  return (
    <div>
      <textarea
        rows={8}
        className="mt-1.5 w-full rounded-2xl border border-line/15 bg-bg px-3 py-2.5 font-mono text-xs outline-none focus:border-aqua"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          try {
            onChange(JSON.parse(e.target.value));
            setError("");
          } catch {
            setError("Invalid JSON — fix it before saving.");
          }
        }}
      />
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  );
}

export function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  async function browse() {
    setOpen(true);
    const res = await fetch("/api/admin/upload");
    const data = await res.json();
    setFiles(data.files ?? []);
  }
  return (
    <div>
      <div className="mt-1.5 flex gap-2">
        <input className="w-full rounded-2xl border border-line/15 bg-bg px-3 py-2.5 text-sm outline-none focus:border-aqua" value={value} onChange={(e) => onChange(e.target.value)} placeholder="/uploads/photo.webp or /images/…" />
        <button type="button" onClick={browse} className="shrink-0 rounded-full border border-line/20 px-3 text-sm hover:border-aqua/50">Library</button>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-2 h-24 w-40 rounded-xl object-cover" />
      )}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-bg-2 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-heading font-bold">Choose an image</p>
              <button type="button" onClick={() => setOpen(false)} className="text-sm text-muted">Close</button>
            </div>
            {files.length === 0 && <p className="text-sm text-muted">No uploads yet. Add files from Media.</p>}
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {files.map((f) => (
                <button type="button" key={f.url} onClick={() => { onChange(f.url); setOpen(false); }} className="overflow-hidden rounded-xl border border-line/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.url} alt={f.name} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function FieldList({ fields, record, onChange }: { fields: Field[]; record: Record<string, unknown>; onChange: (next: Record<string, unknown>) => void }) {
  return (
    <div className="grid gap-5">
      {fields.map((field) => (
        <label key={field.key} className="block">
          <span className="text-sm font-medium">{field.label}</span>
          {field.hint && <span className="mt-0.5 block text-xs text-muted">{field.hint}</span>}
          <FieldInput
            field={field}
            value={getPath(record, field.key)}
            onChange={(v) => {
              const next = structuredClone(record);
              if (v === undefined) {
                const keys = field.key.split(".");
                let cur: Record<string, unknown> = next;
                for (let i = 0; i < keys.length - 1; i++) cur = (cur[keys[i]] ?? {}) as Record<string, unknown>;
                delete cur[keys[keys.length - 1]];
              } else setPath(next, field.key, v);
              onChange(next);
            }}
          />
        </label>
      ))}
    </div>
  );
}
