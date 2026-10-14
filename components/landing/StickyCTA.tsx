"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useSite } from "@/components/layout/SiteProvider";
import { accents, type AccentKey } from "./shared";
import { cn } from "@/lib/utils";

/**
 * Bottom sticky bar: appears after the hero scrolls away, hides while the lead form (#lead) is on screen.
 */
export function StickyCTA({ label, accent, href = "#lead", note, whatsappText }: { label: string; accent: AccentKey; href?: string; note?: string; whatsappText?: string }) {
  const { whatsappUrl } = useSite();
  const [show, setShow] = React.useState(false);
  const [formVisible, setFormVisible] = React.useState(false);
  const a = accents[accent];

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const lead = document.getElementById("lead");
    let io: IntersectionObserver | undefined;
    if (lead) {
      io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 });
      io.observe(lead);
    }
    return () => { window.removeEventListener("scroll", onScroll); io?.disconnect(); };
  }, []);

  const isExternal = href.startsWith("http");

  return (
    <AnimatePresence>
      {show && !formVisible && (
        <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-x-0 bottom-0 z-[75] px-3 pb-3 sm:px-6 sm:pb-4 pointer-events-none">
          <div className="pointer-events-auto mx-auto flex max-w-3xl items-center gap-3 rounded-full glass-strong border-gradient py-2 pl-5 pr-2 pr-[5.5rem] sm:pr-2">
            <p className="hidden sm:block flex-1 text-sm text-muted truncate">{note ?? "Takes 30 seconds. An engineer replies within working hours."}</p>
            <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className={cn("inline-flex h-11 flex-1 sm:flex-none items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold", a.btn)}>
              {label}<ArrowRight className="h-4 w-4" />
            </a>
            {whatsappText && (
              <a href={whatsappUrl(whatsappText)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-abyss"><MessageCircle className="h-5 w-5" /></a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
