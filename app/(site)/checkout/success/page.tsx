import * as React from "react";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { OrderSuccess } from "@/components/store/OrderSuccess";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

export default function SuccessPage() {
  return (
    <Section size="md">
      <React.Suspense fallback={<div className="mx-auto max-w-3xl h-72 glass rounded-3xl animate-pulse" />}>
        <OrderSuccess />
      </React.Suspense>
    </Section>
  );
}
