"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  tilt?: boolean;
  glow?: "aqua" | "teal" | "violet" | "none";
  as?: "div" | "article" | "li";
};

const glows = {
  aqua: "hover:shadow-glow",
  teal: "hover:shadow-glow-teal",
  violet: "hover:shadow-glow-violet",
  none: "",
};

export function Card({ className, children, tilt = false, glow = "none", ...rest }: CardProps) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      style={tilt && !reduce ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" } : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("glass rounded-3xl transition-shadow duration-500 will-change-transform", glows[glow], className)}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}
