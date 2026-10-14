"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X, Headphones } from "lucide-react";
import { useSite } from "@/components/layout/SiteProvider";

export function FloatingContact() {
  const { site, telUrl, whatsappUrl } = useSite();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="fixed bottom-5 right-4 z-[80] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.95 }} className="glass-strong rounded-3xl p-2 w-60 border-gradient">
            <a href={whatsappUrl("Hi OceanIndia, I have a question about a product.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-fg/5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-abyss"><MessageCircle className="h-5 w-5" /></span>
              <span><span className="block text-sm font-semibold">WhatsApp us</span><span className="block text-xs text-muted">Replies in minutes, Mon–Sat</span></span>
            </a>
            <a href={telUrl()} className="flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-fg/5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-aqua text-abyss"><Phone className="h-5 w-5" /></span>
              <span><span className="block text-sm font-semibold">Call {site.contact.phonePrimary}</span><span className="block text-xs text-muted">{site.contact.hours}</span></span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Contact OceanIndia"}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-aqua to-teal text-abyss shadow-glow"
      >
        {!open && <span aria-hidden className="absolute inset-0 rounded-full bg-aqua/50 animate-pulse-ring" />}
        <span className="relative">{open ? <X className="h-6 w-6" /> : <Headphones className="h-6 w-6" />}</span>
      </button>
    </div>
  );
}
