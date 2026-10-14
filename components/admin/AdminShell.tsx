"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links: { href: string; label: string; group: string }[] = [
  { group: "Overview", href: "/admin", label: "Dashboard" },
  { group: "Catalogue", href: "/admin/content/products", label: "Products" },
  { group: "Catalogue", href: "/admin/inventory", label: "Inventory" },
  { group: "Catalogue", href: "/admin/content/categories", label: "Categories" },
  { group: "Catalogue", href: "/admin/content/brands", label: "Brands" },
  { group: "Content", href: "/admin/content/pages", label: "Pages" },
  { group: "Content", href: "/admin/content/solutions", label: "Solutions" },
  { group: "Content", href: "/admin/content/projects", label: "Projects" },
  { group: "Content", href: "/admin/content/blog", label: "Blog" },
  { group: "Content", href: "/admin/content/landing", label: "Landing pages" },
  { group: "Content", href: "/admin/content/testimonials", label: "Testimonials" },
  { group: "Content", href: "/admin/content/faqs", label: "FAQs" },
  { group: "Content", href: "/admin/content/legal", label: "Legal" },
  { group: "Content", href: "/admin/content/nav", label: "Navigation" },
  { group: "Content", href: "/admin/content/site", label: "Site settings" },
  { group: "Content", href: "/admin/media", label: "Media" },
  { group: "Inbox", href: "/admin/content/leads", label: "Leads" },
  { group: "Inbox", href: "/admin/content/orders", label: "Orders" },
  { group: "Inbox", href: "/admin/content/subscribers", label: "Subscribers" },
];

export function AdminShell({ children, warnPassword }: { children: React.ReactNode; warnPassword?: boolean }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  const nav = (
    <nav className="flex flex-col gap-6 p-4 text-sm">
      {["Overview", "Catalogue", "Content", "Inbox"].map((group) => (
        <div key={group}>
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">{group}</p>
          <ul className="space-y-0.5">
            {links.filter((l) => l.group === group).map((l) => {
              const active = l.href === "/admin" ? path === "/admin" : path === l.href || path.startsWith(l.href + "/");
              return (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className={`block rounded-xl px-3 py-2 ${active ? "bg-aqua/15 font-semibold text-aqua" : "text-muted hover:bg-fg/5 hover:text-fg"}`}>
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 overflow-y-auto border-r border-line/10 bg-bg-2 lg:block">{nav}</aside>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button className="absolute inset-0 bg-black/60" aria-label="Close menu" onClick={() => setOpen(false)} />
            <aside className="relative h-full w-64 overflow-y-auto bg-bg-2">{nav}</aside>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line/10 bg-bg/80 px-4 py-3 backdrop-blur md:px-8">
            <div className="flex items-center gap-3">
              <button className="rounded-lg border border-line/15 px-2 py-1 text-sm lg:hidden" onClick={() => setOpen(true)}>Menu</button>
              <p className="font-heading font-bold">OceanIndia admin</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/" className="text-muted hover:text-aqua">View site</Link>
              <button onClick={logout} className="rounded-full border border-line/20 px-3 py-1.5 hover:border-aqua/40">Log out</button>
            </div>
          </header>
          {warnPassword && (
            <p className="border-b border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200 md:px-8">
              The admin password is still the default <code>admin123</code>. Set <code>ADMIN_PASSWORD</code> and <code>ADMIN_SECRET</code> before this site is public.
            </p>
          )}
          <div className="px-4 py-6 md:px-8 md:py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
