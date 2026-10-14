"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
  side = false,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  side?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={title}>
          <motion.button
            aria-label="Close"
            className="absolute inset-0 bg-abyss/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={ref}
            tabIndex={-1}
            initial={side ? { x: "100%" } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={side ? { x: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={side ? { x: "100%" } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "glass-strong outline-none",
              side
                ? "absolute right-0 top-0 h-full w-full max-w-md rounded-l-3xl flex flex-col"
                : "absolute left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl",
              className,
            )}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-line/10">
              <h3 className="text-lg font-heading font-bold">{title}</h3>
              <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-fg/5">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className={cn("p-6", side && "flex-1 overflow-y-auto")}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
