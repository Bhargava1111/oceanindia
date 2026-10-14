"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "whatsapp";
type Size = "sm" | "md" | "lg";

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-aqua via-teal to-aqua bg-[length:200%_100%] text-abyss font-semibold shadow-glow hover:bg-right transition-[background-position,transform] duration-500",
  secondary: "bg-violet text-white font-semibold shadow-glow-violet hover:bg-violet/90",
  ghost: "text-fg hover:bg-fg/5",
  outline: "border border-line/20 text-fg hover:border-aqua/60 hover:text-aqua glass",
  whatsapp: "bg-[#25D366] text-abyss font-semibold hover:brightness-110",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5 rounded-full",
  md: "h-11 px-6 text-sm gap-2 rounded-full",
  lg: "h-13 px-8 text-base gap-2.5 rounded-full py-3.5",
};

export function Button({ variant = "primary", size = "md", href, external, magnetic = true, className, children, icon, iconRight, ...rest }: ButtonProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magnetic || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const classes = cn(
    "relative inline-flex items-center justify-center whitespace-nowrap select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-aqua",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{iconRight}</span>}
    </>
  );

  if (href) {
    const isExternal = external || /^https?:|^mailto:|^tel:/.test(href);
    return (
      <motion.span style={{ x: sx, y: sy }} className="inline-block" onMouseMove={onMove} onMouseLeave={onLeave}>
        {isExternal ? (
          <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
            {content}
          </a>
        ) : (
          <Link href={href} className={classes}>{content}</Link>
        )}
      </motion.span>
    );
  }

  return (
    <motion.span style={{ x: sx, y: sy }} className="inline-block" onMouseMove={onMove} onMouseLeave={onLeave}>
      <button className={classes} {...rest}>{content}</button>
    </motion.span>
  );
}
