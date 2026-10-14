"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Circle, PackageCheck, Search, Truck, Warehouse, ClipboardCheck } from "lucide-react";
import { Input, Field } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useSite } from "@/components/layout/SiteProvider";
import { cn } from "@/lib/utils";

const schema = z.object({
  order: z.string().regex(/^OI-[A-Z0-9]{4,24}$/i, "Order IDs look like OI-ABC123"),
  phone: z.string().regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter the mobile number used at checkout"),
});
type Form = z.infer<typeof schema>;

const stages = [
  { Icon: ClipboardCheck, t: "Order confirmed", d: "Payment received and invoice issued." },
  { Icon: Warehouse, t: "Packed", d: "Checked, packed and insured at our Bengaluru warehouse." },
  { Icon: Truck, t: "In transit", d: "Handed to the carrier with tracking." },
  { Icon: PackageCheck, t: "Delivered", d: "Signed for at your address." },
];

const stageFor: Record<string, number> = { "pending-payment": 0, paid: 0, processing: 1, shipped: 2, delivered: 3 };

type Lookup = {
  id: string;
  status: string;
  total: number;
  items: { name: string; qty: number }[];
  tracking: { courier?: string; awb?: string; url?: string } | null;
};

export function TrackOrder() {
  const { site, whatsappUrl } = useSite();
  const [result, setResult] = React.useState<Lookup | null>(null);
  const [error, setError] = React.useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    setError("");
    setResult(null);
    const res = await fetch(`/api/order?id=${encodeURIComponent(data.order)}&phone=${encodeURIComponent(data.phone)}`);
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(body.error || "We couldn’t find that order.");
      return;
    }
    setResult(body.order);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="lg:col-span-5 glass rounded-3xl p-6 md:p-8 space-y-4 self-start">
        <Field label="Order ID" error={errors.order?.message} hint="From your confirmation email or invoice."><Input placeholder="OI-ABC123" autoComplete="off" aria-invalid={!!errors.order} {...register("order")} /></Field>
        <Field label="Mobile number" error={errors.phone?.message}><Input placeholder="+91 98765 43210" inputMode="tel" aria-invalid={!!errors.phone} {...register("phone")} /></Field>
        <Button type="submit" disabled={isSubmitting} icon={<Search />} magnetic={false} className="w-full">{isSubmitting ? "Looking up…" : "Track order"}</Button>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <p className="text-xs text-muted">Can’t find your ID? <a className="text-aqua hover:underline" href={whatsappUrl(`Hi ${site.name}, I need help tracking my order.`)}>Message us</a> with your name and we’ll look it up.</p>
      </form>

      <div className="lg:col-span-7">
        {result ? (
          <div className="glass rounded-3xl p-6 md:p-8" role="status" aria-live="polite">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><p className="text-xs uppercase tracking-wider text-muted">Order</p><p className="font-heading text-xl font-bold">{result.id}</p></div>
              <div className="text-right"><p className="text-xs uppercase tracking-wider text-muted">Status</p><p className="font-heading text-xl font-bold text-teal capitalize">{result.status.replace("-", " ")}</p></div>
            </div>
            <p className="mt-3 text-sm text-muted">{result.items.map((i) => `${i.qty} × ${i.name}`).join(" · ")} · ₹{result.total.toLocaleString("en-IN")}</p>
            {(result.status === "cancelled" || result.status === "refunded") ? (
              <p className="mt-6 text-sm">This order is {result.status}. Message us if you need the invoice or a replacement.</p>
            ) : (
              <ol className="mt-8 relative space-y-6">
                <span aria-hidden className="absolute left-5 top-2 bottom-2 w-px bg-line/15" />
                {stages.map((s, i) => {
                  const stage = stageFor[result.status] ?? 0;
                  const done = i <= stage && result.status !== "pending-payment";
                  const current = i === stage;
                  return (
                    <li key={s.t} className="relative flex gap-4">
                      <span className={cn("relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border", done ? "border-teal bg-teal/15 text-teal" : "border-line/15 bg-bg text-muted/50", current && "shadow-glow-teal")}>{done ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-4 w-4" />}</span>
                      <div className={cn(!done && "opacity-50")}>
                        <p className="font-heading font-semibold flex items-center gap-2"><s.Icon className="h-4 w-4 text-muted" />{s.t}</p>
                        <p className="text-sm text-muted">{i === 0 && result.status === "pending-payment" ? "Waiting for payment confirmation." : s.d}</p>
                        {current && result.tracking?.awb && <p className="mt-1 text-xs text-aqua">{result.tracking.courier} · AWB {result.tracking.awb}</p>}
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        ) : (
          <div className="h-full glass rounded-3xl p-8 flex flex-col justify-center text-center text-muted">
            <Truck className="mx-auto h-10 w-10 text-aqua/60" />
            <p className="mt-4 font-heading font-semibold text-fg">Your shipment timeline will appear here.</p>
            <p className="mt-1 text-sm">In-stock orders dispatch within two business days; most of India receives them in 2–5 days after that.</p>
          </div>
        )}
      </div>
    </div>
  );
}
