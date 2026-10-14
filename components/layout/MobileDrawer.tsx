"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X, Phone, MessageCircle } from "lucide-react";
import type { NavGroup } from "@/data/nav";
import { useSite } from "@/components/layout/SiteProvider";
import { Logo } from "@/components/graphics/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function MobileDrawer({ open, onClose, nav: mainNav }: { open: boolean; onClose: () => void; nav: NavGroup[] }) {
  const { site, telUrl, whatsappUrl } = useSite();
  const [expanded, setExpanded] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <motion.button aria-label="Close menu" className="absolute inset-0 bg-abyss/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute left-0 top-0 h-full w-[88%] max-w-sm glass-strong rounded-r-3xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-line/10">
              <Logo />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-fg/5"><X className="h-5 w-5" /></button>
              </div>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                {mainNav.map((g) => (
                  <li key={g.label}>
                    {g.columns ? (
                      <>
                        <button
                          className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left font-heading font-semibold"
                          aria-expanded={expanded === g.label}
                          onClick={() => setExpanded(expanded === g.label ? null : g.label)}
                        >
                          {g.label}
                          <ChevronDown className={cn("h-4 w-4 transition-transform", expanded === g.label && "rotate-180")} />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === g.label && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="pl-3 pb-2">
                                {g.href && <Link href={g.href} onClick={onClose} className="block rounded-xl px-3 py-2 text-sm text-aqua">All {g.label.toLowerCase()} →</Link>}
                                {g.columns.map((c) => (
                                  <div key={c.title} className="mt-2">
                                    <p className="px-3 text-[10px] uppercase tracking-widest text-muted">{c.title}</p>
                                    {c.links.map((l) => (
                                      <Link key={l.href} href={l.href} onClick={onClose} className="block rounded-xl px-3 py-2 text-sm text-fg/85 hover:bg-aqua/10 hover:text-aqua">{l.label}</Link>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link href={g.href!} onClick={onClose} className="block rounded-2xl px-3 py-3 font-heading font-semibold hover:bg-aqua/10 hover:text-aqua">{g.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-line/10 p-4 grid grid-cols-2 gap-2">
              <a href={telUrl()} className="inline-flex items-center justify-center gap-2 rounded-full border border-line/15 py-2.5 text-sm"><Phone className="h-4 w-4" />Call</a>
              <a href={whatsappUrl("Hi OceanIndia, I'd like some help choosing gear.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-sm font-semibold text-abyss"><MessageCircle className="h-4 w-4" />WhatsApp</a>
              <Link href="/wishlist" onClick={onClose} className="inline-flex items-center justify-center rounded-full border border-line/15 py-3 text-sm font-semibold">Wishlist</Link>
              <Link href="/quote" onClick={onClose} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-aqua to-teal py-3 text-sm font-semibold text-abyss">Get a quote</Link>
              <p className="col-span-2 text-center text-[11px] text-muted">{site.contact.hours}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
