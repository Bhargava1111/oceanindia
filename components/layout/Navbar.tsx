"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Heart, Menu, Phone, Search, ShoppingBag, ArrowRight } from "lucide-react";
import type { NavGroup } from "@/data/nav";
import { useSite } from "@/components/layout/SiteProvider";
import type { SearchIndex } from "@/components/layout/SiteChrome";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/graphics/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { MobileDrawer } from "./MobileDrawer";
import { useCart } from "@/components/store/CartProvider";
import { CartDrawer } from "@/components/store/CartDrawer";
import { SearchModal } from "@/components/store/SearchModal";

export function Navbar({ nav: mainNav, searchIndex }: { nav: NavGroup[]; searchIndex: SearchIndex }) {
  const { site, telUrl } = useSite();
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [drawer, setDrawer] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const pathname = usePathname();
  const { count, setOpen, wishlist } = useCart();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  React.useEffect(() => { setOpenMenu(null); setDrawer(false); }, [pathname]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-aqua focus:px-4 focus:py-2 focus:text-abyss">
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-[90] pointer-events-none">
        {/* top utility strip */}
        <div className={cn("hidden lg:block transition-all duration-500 pointer-events-auto", scrolled ? "-translate-y-full opacity-0 h-0" : "h-9 opacity-100")}>
          <div className="container flex h-9 items-center justify-between text-xs text-muted">
            <p>{site.announcement}</p>
            <div className="flex items-center gap-5">
              <a href={telUrl()} className="inline-flex items-center gap-1.5 hover:text-aqua"><Phone className="h-3.5 w-3.5" />{site.contact.phonePrimary}</a>
              <span aria-hidden>·</span>
              <span>{site.contact.hours}</span>
            </div>
          </div>
        </div>

        <div className={cn("transition-all duration-500", scrolled ? "pt-2" : "pt-2 lg:pt-1")}>
          <div className="container pointer-events-auto">
            <nav
              aria-label="Primary"
              className={cn("glass-strong rounded-full flex items-center justify-between gap-3 px-3 sm:px-4 h-16 transition-shadow duration-500", scrolled && "shadow-glow/40")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div className="flex items-center gap-2">
                <button className="lg:hidden rounded-full p-2 hover:bg-fg/5" aria-label="Open menu" onClick={() => setDrawer(true)}>
                  <Menu className="h-5 w-5" />
                </button>
                <Logo />
              </div>

              <ul className="hidden lg:flex items-center gap-1">
                {mainNav.map((g) => {
                  const active = g.href && pathname.startsWith(g.href);
                  return (
                    <li key={g.label} className="relative" onMouseEnter={() => setOpenMenu(g.columns ? g.label : null)}>
                      <Link
                        href={g.href ?? "#"}
                        className={cn("inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-aqua", active ? "text-aqua" : "text-fg/90")}
                        aria-haspopup={g.columns ? "true" : undefined}
                        aria-expanded={g.columns ? openMenu === g.label : undefined}
                        onFocus={() => setOpenMenu(g.columns ? g.label : null)}
                      >
                        {g.label}
                        {g.columns && <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", openMenu === g.label && "rotate-180")} />}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-1.5">
                <button onClick={() => setSearch(true)} aria-label="Search products (Ctrl+K)" className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full border border-line/15 text-sm text-muted hover:border-aqua/60 hover:text-aqua transition sm:w-auto sm:px-3">
                  <Search className="h-4 w-4" /><span className="hidden md:inline">Search</span><kbd className="hidden xl:inline rounded border border-line/20 px-1.5 text-[10px]">⌘K</kbd>
                </button>
                <Link href="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`} className="relative hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/15 hover:border-aqua/60 hover:text-aqua transition">
                  <Heart className="h-[18px] w-[18px]" />
                  {wishlist.length > 0 && <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-violet px-1 text-[10px] font-bold text-white grid place-items-center">{wishlist.length}</span>}
                </Link>
                <button onClick={() => setOpen(true)} aria-label={`Cart, ${count} items`} className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/15 hover:border-aqua/60 hover:text-aqua transition">
                  <ShoppingBag className="h-[18px] w-[18px]" />
                  {count > 0 && <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-aqua px-1 text-[10px] font-bold text-abyss grid place-items-center">{count}</span>}
                </button>
                <ThemeToggle className="hidden sm:inline-flex" />
                <Link href="/quote" className="hidden md:inline-flex h-10 items-center rounded-full bg-gradient-to-r from-aqua to-teal px-4 text-sm font-semibold text-abyss shadow-glow hover:brightness-110 transition">
                  Get a quote
                </Link>
              </div>

              {/* Mega menu */}
              <AnimatePresence>
                {openMenu && (() => {
                  const g = mainNav.find((n) => n.label === openMenu);
                  if (!g?.columns) return null;
                  return (
                    <motion.div
                      key={g.label}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 top-[calc(100%+10px)] hidden lg:block"
                    >
                      <div className="glass-strong rounded-3xl p-6 grid grid-cols-4 gap-6 border-gradient">
                        {g.columns.map((col) => (
                          <div key={col.title}>
                            <p className="eyebrow mb-3 text-[10px]">{col.title}</p>
                            <ul className="space-y-1">
                              {col.links.map((l) => (
                                <li key={l.href}>
                                  <Link href={l.href} className="block rounded-xl px-2 py-1.5 text-sm text-fg/85 hover:bg-aqua/10 hover:text-aqua transition">{l.label}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {g.featured && (
                          <Link href={g.featured.href} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-abyss to-violet/40 p-5 text-foam flex flex-col justify-end min-h-[180px]">
                            <span className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-aqua/30 blur-2xl group-hover:bg-aqua/50 transition" />
                            <span className="text-xs uppercase tracking-widest text-aqua">{g.label}</span>
                            <span className="mt-1 font-heading font-bold text-lg leading-tight">{g.featured.label}</span>
                            <span className="text-xs text-foam/70 mt-1">{g.featured.description}</span>
                            <ArrowRight className="mt-3 h-4 w-4 text-aqua transition-transform group-hover:translate-x-1" />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </nav>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} nav={mainNav} />
      <CartDrawer />
      <SearchModal open={search} onClose={() => setSearch(false)} index={searchIndex} />
    </>
  );
}
