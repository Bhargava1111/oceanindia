"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import * as React from "react";

export function Reveal({ children, className, delay = 0, variants = fadeUp, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; variants?: Variants; as?: "div" | "li" | "section" | "article" }) {
  const Comp = (motion as any)[as] as typeof motion.div;
  return (
    <Comp initial="hidden" whileInView="show" viewport={viewport} variants={variants} transition={{ delay }} className={className}>
      {children}
    </Comp>
  );
}

export function RevealGroup({ children, className, delay = 0.08, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "ul" | "ol" }) {
  const Comp = (motion as any)[as] as typeof motion.div;
  return (
    <Comp initial="hidden" whileInView="show" viewport={viewport} variants={stagger(delay)} className={className}>
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const Comp = (motion as any)[as] as typeof motion.div;
  return <Comp variants={fadeUp} className={className}>{children}</Comp>;
}
