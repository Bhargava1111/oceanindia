"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const dark = resolvedTheme === "dark";
  return (
    <button
      aria-label={mounted ? (dark ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn("relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/15 hover:border-aqua/60 hover:text-aqua transition", className)}
    >
      {mounted && (dark ? <Sun className="h-4.5 w-4.5 h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />)}
    </button>
  );
}
