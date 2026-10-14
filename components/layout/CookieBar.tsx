"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const KEY = "oceanindia:cookie-consent";

export function CookieBar() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { if (!localStorage.getItem(KEY)) setShow(true); }, []);
  const decide = (v: "all" | "essential") => { localStorage.setItem(KEY, v); setShow(false); };
  return (
    <AnimatePresence>
      {show && (
        <motion.div role="region" aria-label="Cookie consent" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} className="fixed bottom-5 left-4 right-24 z-[85] sm:left-6 sm:right-auto sm:max-w-md">
          <div className="glass-strong rounded-3xl p-4 flex gap-3 border-gradient">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet/20 text-violet"><Cookie className="h-5 w-5" /></span>
            <div className="text-sm">
              <p className="text-fg">We use cookies to keep your cart, remember your theme and measure what works. <Link href="/legal/privacy" className="text-aqua underline-offset-4 hover:underline">Privacy policy</Link></p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => decide("all")} className="rounded-full bg-aqua px-4 py-1.5 text-xs font-semibold text-abyss">Accept all</button>
                <button onClick={() => decide("essential")} className="rounded-full border border-line/20 px-4 py-1.5 text-xs">Essential only</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
