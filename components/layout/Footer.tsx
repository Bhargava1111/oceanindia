"use client";

import * as React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { NavLink } from "@/data/nav";
import type { Category } from "@/data/categories";
import { useSite } from "@/components/layout/SiteProvider";
import { Logo } from "@/components/graphics/Logo";
import { WaveDivider } from "@/components/graphics/WaveDivider";

const schema = z.object({ email: z.string().email("Enter a valid email") });
type Form = z.infer<typeof schema>;

function Newsletter() {
  const [done, setDone] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: Form) => {
    await fetch("/api/newsletter", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }).catch(() => {});
    setDone(true);
  };
  return (
    <div>
      <h3 className="font-heading font-bold text-lg">Gear drops, deals and studio tips</h3>
      <p className="mt-1 text-sm text-muted">One email a fortnight. No noise.</p>
      {done ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal/15 px-4 py-2 text-sm text-teal"><Check className="h-4 w-4" />You’re on the list.</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex gap-2" noValidate>
          <div className="flex-1">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input id="nl-email" type="email" placeholder="you@studio.in" aria-invalid={!!errors.email} {...register("email")} className="w-full rounded-full border border-line/15 bg-bg-2/60 px-4 py-2.5 text-sm outline-none focus:border-aqua focus:ring-2 focus:ring-aqua/30" />
            {errors.email && <p role="alert" className="mt-1 text-xs text-rose-400">{errors.email.message}</p>}
          </div>
          <button disabled={isSubmitting} className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-aqua text-abyss hover:brightness-110" aria-label="Subscribe"><ArrowRight className="h-4 w-4" /></button>
        </form>
      )}
    </div>
  );
}

export function Footer({ nav: footerNav }: { nav: Record<string, NavLink[]>; categories?: Category[] }) {
  const { site, telUrl } = useSite();
  const a = site.contact.address;
  return (
    <footer className="relative mt-24">
      <WaveDivider />
      <div className="bg-bg-2 border-t border-line/10">
        <div className="container py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-6">
              <Logo />
              <p className="text-sm text-muted leading-relaxed max-w-sm">{site.description}</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-muted"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua" /><a href={a.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg">{a.line1}, {a.line2}, {a.city} {a.postalCode}</a></li>
                <li className="flex items-center gap-2 text-muted"><Phone className="h-4 w-4 shrink-0 text-aqua" /><a href={telUrl()} className="hover:text-fg">{site.contact.phonePrimary}</a></li>
                <li className="flex items-center gap-2 text-muted"><Mail className="h-4 w-4 shrink-0 text-aqua" /><a href={`mailto:${site.contact.email}`} className="hover:text-fg">{site.contact.email}</a></li>
              </ul>
              <div className="flex gap-2">
                {[{ Icon: Instagram, href: site.social.instagram, label: "Instagram" }, { Icon: Youtube, href: site.social.youtube, label: "YouTube" }, { Icon: Facebook, href: site.social.facebook, label: "Facebook" }, { Icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" }].map(({ Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/15 text-muted hover:border-aqua hover:text-aqua transition"><Icon className="h-4 w-4" /></a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {[{ title: "Shop", links: footerNav.shop ?? [] }, { title: "Solutions", links: footerNav.solutions ?? [] }, { title: "Company", links: footerNav.company ?? [] }].map((col) => (
                <div key={col.title}>
                  <p className="eyebrow text-[10px] mb-4">{col.title}</p>
                  <ul className="space-y-2.5">
                    {col.links.map((l) => <li key={l.href}><Link href={l.href} className="text-sm text-muted hover:text-aqua transition">{l.label}</Link></li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="lg:col-span-3"><Newsletter /></div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-line/10 pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved. Authorised dealer for every brand listed.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {(footerNav.legal ?? []).map((l) => <li key={l.href}><Link href={l.href} className="hover:text-aqua">{l.label}</Link></li>)}
              <li><Link href="/sitemap.xml" className="hover:text-aqua">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
