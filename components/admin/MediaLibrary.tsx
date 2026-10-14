"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MediaLibrary({ files }: { files: { name: string; url: string; size: number }[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function upload(list: FileList | null) {
    if (!list?.length) return;
    setPending(true);
    setError("");
    for (const file of Array.from(list)) {
      const body = new FormData();
      body.set("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Could not upload ${file.name}`);
        break;
      }
    }
    setPending(false);
    router.refresh();
  }

  async function remove(name: string) {
    if (!confirm(`Delete ${name}? Pages using this file will show a broken image.`)) return;
    await fetch(`/api/admin/upload?name=${encodeURIComponent(name)}`, { method: "DELETE" });
    router.refresh();
  }

  function copy(url: string) {
    navigator.clipboard?.writeText(url);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Media</h1>
          <p className="text-sm text-muted">Uploads are served from /uploads and can be picked on any image field.</p>
        </div>
        <label className="cursor-pointer rounded-full bg-aqua px-4 py-2 text-sm font-semibold text-abyss">
          {pending ? "Uploading…" : "Upload images"}
          <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => upload(e.target.files)} />
        </label>
      </div>
      {error && <p className="mb-4 text-sm text-rose-400">{error}</p>}
      {files.length === 0 && <p className="text-sm text-muted">No uploads yet.</p>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {files.map((f) => (
          <figure key={f.name} className="overflow-hidden rounded-2xl border border-line/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.url} alt={f.name} className="aspect-square w-full object-cover" />
            <figcaption className="space-y-1 p-3 text-xs">
              <p className="truncate font-medium">{f.name}</p>
              <p className="text-muted">{Math.ceil(f.size / 1024)} KB</p>
              <div className="flex gap-3">
                <button onClick={() => copy(f.url)} className="text-aqua">Copy path</button>
                <button onClick={() => remove(f.name)} className="text-rose-400">Delete</button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
