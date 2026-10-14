"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowRight, MessageCircle, Play, ShieldCheck, Truck, Headphones } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/motion/Counter";
import { useSite } from "@/components/layout/SiteProvider";
import type { PageCopy } from "@/data/pages";
import { listOf, RichText } from "@/lib/pages";
import { toNumber } from "@/lib/site";

const OceanHero = dynamic(() => import("@/components/three/OceanHero"), { ssr: false, loading: () => null });
const icons = [ShieldCheck, Truck, Headphones];
const glows = ["from-aqua/30", "from-teal/30", "from-violet/30", "from-aqua/30"];

export function Hero({ page }: { page: PageCopy }) {
  const { site, whatsappUrl } = useSite();
  const reduce = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [show3d, setShow3d] = React.useState(false);
  React.useEffect(() => {
    if (reduce) return;
    const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 600));
    idle(() => setShow3d(true));
  }, [reduce]);

  const highlights = listOf(page, "highlights");
  const stats = listOf(page, "stats");
  const { hero } = page;

  return (
    <section className="relative overflow-hidden -mt-20 lg:-mt-28 pt-32 lg:pt-44 pb-20 min-h-[92dvh] flex items-center">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_20%,rgb(34_211_238/0.22),transparent_70%)] animate-drift motion-reduce:animate-none" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_15%_70%,rgb(139_92_246/0.25),transparent_70%)]" />
        {show3d && <OceanHero dark={resolvedTheme !== "light"} />}
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-bg via-bg/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="container grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow mb-6">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75 motion-reduce:hidden" /><span className="relative inline-flex h-2 w-2 rounded-full bg-teal" /></span>
            <RichText text={hero.eyebrow} site={site} />
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="text-display-xl">
            <RichText text={hero.title} site={site} />
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-6 max-w-xl text-base sm:text-lg md:text-xl text-muted leading-relaxed">
            <RichText text={hero.description} site={site} />
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-9 flex flex-wrap items-center gap-3">
            {hero.primaryCta && <Button href={hero.primaryCta.href} size="lg" iconRight={<ArrowRight />}>{hero.primaryCta.label}</Button>}
            {hero.secondaryCta && <Button href={hero.secondaryCta.href} size="lg" variant="outline" icon={<Play />}>{hero.secondaryCta.label}</Button>}
            <Button href={whatsappUrl(`Hi ${site.name}, I'd like a quick quote.`)} size="lg" variant="ghost" icon={<MessageCircle />}>WhatsApp</Button>
          </motion.div>
          {highlights.length > 0 && (
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }} className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted">
              {highlights.map((h, i) => {
                const Icon = icons[i % icons.length];
                return <li key={h.title} className="inline-flex items-center gap-2"><Icon className="h-4 w-4 text-teal" /><RichText text={h.title} site={site} /></li>;
              })}
            </motion.ul>
          )}
        </div>

        {stats.length > 0 && (
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((st, i) => (
                <div key={st.title} className={`glass rounded-3xl p-5 sm:p-6 relative overflow-hidden ${i === 1 || i === 2 ? "translate-y-6" : ""}`}>
                  <span aria-hidden className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${glows[i % glows.length]} to-transparent blur-xl`} />
                  <p className="font-heading text-3xl sm:text-4xl font-bold tabular-nums"><Counter to={toNumber(st.meta, site)} suffix={st.text} /></p>
                  <p className="mt-1 text-xs sm:text-sm text-muted">{st.title}</p>
                </div>
              ))}
            </div>
            <div aria-hidden className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-aqua/10 via-transparent to-violet/10 blur-2xl" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
