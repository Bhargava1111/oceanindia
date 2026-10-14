"use client";

import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/components/store/CartProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
