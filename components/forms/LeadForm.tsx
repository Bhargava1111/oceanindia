"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, MessageCircle, Send, LoaderCircle } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/schemas";
import { Input, Textarea, Select, Field } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useSite } from "@/components/layout/SiteProvider";
import { cn } from "@/lib/utils";

export const budgetOptions = ["Under ₹50,000", "₹50,000 – ₹2 lakh", "₹2 – 10 lakh", "₹10 – 50 lakh", "₹50 lakh+", "Not sure yet"];

const defaultInterests = ["Buying equipment", "Recording / podcast studio", "Home theatre", "Auditorium / PA", "Conference / classroom AV", "Acoustic treatment", "Something else"];

/**
 * Universal lead form. Posts to /api/lead (wire that route to your CRM / email).
 * `source` tags where the lead came from (e.g. "contact", "lp:launch-offer", "product:akg-c414").
 */
export function LeadForm({
  source,
  interestOptions = defaultInterests,
  defaultInterest,
  product,
  showCompany = false,
  showBudget = true,
  cta = "Send my request",
  compact = false,
  className,
  successTitle = "Request received.",
  successText = "An engineer will reply within a few working hours. Prefer to talk now? Continue on WhatsApp with your reference.",
}: {
  source: string;
  interestOptions?: string[];
  defaultInterest?: string;
  product?: string;
  showCompany?: boolean;
  showBudget?: boolean;
  cta?: string;
  compact?: boolean;
  className?: string;
  successTitle?: string;
  successText?: string;
}) {
  const { whatsappUrl } = useSite();
  const [ref, setRef] = React.useState<string | null>(null);
  const [failed, setFailed] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { source, product, interest: defaultInterest ?? (product ? "Buying equipment" : interestOptions[0]) },
  });

  const onSubmit = async (data: LeadInput) => {
    setFailed(false);
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error("bad");
      setRef(json.id);
    } catch {
      setFailed(true);
    }
  };

  if (ref) {
    return (
      <div className={cn("glass rounded-3xl p-8 text-center", className)} role="status" aria-live="polite">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/15 text-teal"><Check className="h-7 w-7" /></span>
        <h3 className="mt-5 font-heading text-2xl font-bold">{successTitle}</h3>
        <p className="mt-2 text-sm text-muted">Reference <span className="font-mono text-fg">{ref}</span></p>
        <p className="mt-3 text-muted">{successText}</p>
        <Button href={whatsappUrl(`Hi OceanIndia, following up on request ${ref}.`)} variant="whatsapp" icon={<MessageCircle />} className="mt-6">Continue on WhatsApp</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("glass rounded-3xl p-6 md:p-8 space-y-4", className)}>
      <input type="hidden" {...register("source")} />
      {product && <input type="hidden" {...register("product")} />}
      {product && (
        <p className="rounded-2xl bg-aqua/10 px-4 py-3 text-sm"><span className="text-muted">Enquiring about </span><span className="font-semibold">{product}</span></p>
      )}
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field label="Name" error={errors.name?.message}><Input placeholder="Your name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} /></Field>
        <Field label="Mobile" error={errors.phone?.message}><Input placeholder="+91 98765 43210" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register("phone")} /></Field>
        <Field label="Email (optional)" error={errors.email?.message}><Input type="email" placeholder="you@studio.in" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} /></Field>
        {showCompany && <Field label="Company / institution"><Input placeholder="Organisation name" autoComplete="organization" {...register("company")} /></Field>}
        <Field label="I’m interested in">
          <Select {...register("interest")}>{interestOptions.map((o) => <option key={o}>{o}</option>)}</Select>
        </Field>
        {showBudget && (
          <Field label="Budget range">
            <Select defaultValue="" {...register("budget")}><option value="">Select (optional)</option>{budgetOptions.map((o) => <option key={o}>{o}</option>)}</Select>
          </Field>
        )}
      </div>
      <Field label="Tell us more" error={errors.message?.message} hint="Room size, use case, deadline, products you have in mind — anything helps.">
        <Textarea rows={compact ? 3 : 4} placeholder="e.g. 12×10 ft bedroom studio, vocals and guitar, budget around ₹1.5 lakh…" {...register("message")} />
      </Field>
      {failed && <p role="alert" className="text-sm text-rose-400">Something went wrong sending the form. Please try again or WhatsApp us.</p>}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting} icon={isSubmitting ? <LoaderCircle className="animate-spin" /> : <Send />} magnetic={false}>{isSubmitting ? "Sending…" : cta}</Button>
        <p className="text-xs text-muted">No spam. We reply Mon–Sat, 10:00–19:30 IST.</p>
      </div>
    </form>
  );
}
