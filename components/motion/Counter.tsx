"use client";

import * as React from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function Counter({ to, suffix = "", prefix = "", duration = 1.6, className }: { to: number; suffix?: string; prefix?: string; duration?: number; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  React.useEffect(() => spring.on("change", (v) => setVal(Math.round(v))), [spring]);

  const display = reduce ? to : val;
  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString("en-IN")}{suffix}
    </span>
  );
}
