"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    const res = await fetch("/api/admin/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    setPending(false);
    if (!res.ok) {
      setError("That password is not right.");
      return;
    }
    router.push(next.startsWith("/admin") ? next : "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="glass w-full max-w-sm rounded-3xl p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aqua">OceanIndia</p>
      <h1 className="mt-2 font-heading text-2xl font-bold">Admin sign in</h1>
      <p className="mt-2 text-sm text-muted">One password manages pages, products, stock, leads and orders.</p>
      <label className="mt-6 block text-sm font-medium" htmlFor="password">Password</label>
      <input id="password" type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-line/15 bg-bg px-4 py-3 outline-none focus:border-aqua" />
      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
      <button disabled={pending || !password} className="mt-6 w-full rounded-full bg-aqua px-4 py-3 font-semibold text-abyss disabled:opacity-50">
        {pending ? "Checking…" : "Enter admin"}
      </button>
    </form>
  );
}
