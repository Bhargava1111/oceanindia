"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { columnsFor, lockedCreate } from "@/lib/cms/schema";
import { getPath } from "./fields";
import { RecordEditor } from "./RecordEditor";
import type { SchemaContext } from "@/lib/cms/schema";

export function CollectionManager({
  name,
  label,
  singleton,
  idField,
  data,
  ctx,
}: {
  name: string;
  label: string;
  singleton: boolean;
  idField?: string;
  data: unknown;
  ctx?: SchemaContext;
}) {
  if (singleton) {
    return <RecordEditor collection={name} label={label} singleton initial={(data ?? {}) as Record<string, unknown>} ctx={ctx} />;
  }
  return <Table name={name} label={label} idField={idField || "id"} rows={(Array.isArray(data) ? data : []) as Record<string, unknown>[]} />;
}

function Table({ name, label, idField, rows }: { name: string; label: string; idField: string; rows: Record<string, unknown>[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const columns = columnsFor(name);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(needle));
  }, [rows, q]);

  async function remove(id: string) {
    if (!confirm(`Delete this ${label.replace(/s$/, "").toLowerCase()}?`)) return;
    const res = await fetch(`/api/admin/${name}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Could not delete.");
      return;
    }
    router.refresh();
  }

  async function resetDefaults() {
    if (!confirm("Discard every saved edit in this collection and restore the built-in defaults?")) return;
    await fetch(`/api/admin/${name}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reset: true }) });
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">{label}</h1>
          <p className="text-sm text-muted">{rows.length} records</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={resetDefaults} className="rounded-full border border-line/20 px-4 py-2 text-sm text-muted">Reset defaults</button>
          {!lockedCreate.has(name) && <Link href={`/admin/content/${name}/new`} className="rounded-full bg-aqua px-4 py-2 text-sm font-semibold text-abyss">Add</Link>}
        </div>
      </div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="mb-4 w-full max-w-sm rounded-2xl border border-line/15 bg-bg px-4 py-2.5 text-sm outline-none focus:border-aqua" />
      <div className="overflow-x-auto rounded-3xl border border-line/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-fg/5 text-xs uppercase tracking-wider text-muted">
            <tr>
              {columns.map((c) => <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>)}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const id = String(row[idField] ?? "");
              return (
                <tr key={id} className="border-t border-line/10">
                  {columns.map((c) => <td key={c.key} className="max-w-[16rem] truncate px-4 py-3">{formatCell(getPath(row, c.key))}</td>)}
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Link href={`/admin/content/${name}/${encodeURIComponent(id)}`} className="text-aqua">Edit</Link>
                    {!lockedCreate.has(name) && <button onClick={() => remove(id)} className="ml-3 text-rose-400">Delete</button>}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && <tr><td colSpan={columns.length + 1} className="px-4 py-8 text-center text-muted">Nothing here yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatCell(v: unknown) {
  if (v == null || v === "") return "—";
  if (typeof v === "number") return v.toLocaleString("en-IN");
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) return new Date(v).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  return String(v);
}
