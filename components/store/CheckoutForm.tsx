"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Landmark, LoaderCircle, Lock, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { checkoutSchema, type CheckoutInput } from "@/lib/schemas";
import { openPayment } from "@/lib/razorpay";
import { useCart } from "./CartProvider";
import { ProductArt } from "@/components/graphics/ProductArt";
import { Input, Textarea, Select, Field } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn, formatINR } from "@/lib/utils";

const states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Chandigarh", "Jammu & Kashmir", "Ladakh", "Andaman & Nicobar", "Dadra & Nagar Haveli and Daman & Diu", "Lakshadweep"];

export function CheckoutForm() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [phase, setPhase] = React.useState<"idle" | "creating" | "paying">("idle");
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => setMounted(true), []);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { payment: "razorpay", state: "Karnataka" },
  });
  const payment = watch("payment");

  const onSubmit = async (data: CheckoutInput) => {
    setError(null);
    setPhase("creating");
    try {
      const res = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customer: data, items: items.map((i) => ({ slug: i.slug, qty: i.qty })) }) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Could not create the order.");
      let paymentId: string | undefined;
      if (data.payment === "razorpay") {
        setPhase("paying");
        const pay = await openPayment({ amount: json.subtotal, orderId: json.id, name: data.name, email: data.email, contact: data.phone });
        if (!pay.ok) throw new Error(pay.reason);
        paymentId = pay.paymentId;
      }
      const summary = { id: json.id, subtotal: json.subtotal, payment: data.payment, paymentId, name: data.name, email: data.email, items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })) };
      sessionStorage.setItem("oceanindia:last-order", JSON.stringify(summary));
      clear();
      router.push(`/checkout/success?order=${json.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setPhase("idle");
    }
  };

  if (!mounted) return <div className="h-96 glass rounded-3xl animate-pulse" />;

  if (items.length === 0) {
    return (
      <div className="glass rounded-3xl p-12 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-aqua/10 text-aqua"><ShoppingBag className="h-7 w-7" /></span>
        <h2 className="mt-5 font-heading text-xl font-bold">Your cart is empty.</h2>
        <p className="mt-2 text-sm text-muted">Add something from the store to check out.</p>
        <Button href="/store" className="mt-6">Browse the store</Button>
      </div>
    );
  }

  const busy = phase !== "idle";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-7 space-y-6">
        <fieldset className="glass rounded-3xl p-6 md:p-8">
          <legend className="sr-only">Contact</legend>
          <h2 className="font-heading text-lg font-bold mb-5 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-aqua text-abyss text-xs font-bold">1</span>Contact</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" error={errors.name?.message}><Input autoComplete="name" aria-invalid={!!errors.name} {...register("name")} /></Field>
            <Field label="Mobile" error={errors.phone?.message}><Input inputMode="tel" autoComplete="tel" placeholder="+91" aria-invalid={!!errors.phone} {...register("phone")} /></Field>
            <Field label="Email" error={errors.email?.message}><Input type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} /></Field>
            <Field label="GSTIN (optional)" error={errors.gstin?.message} hint="For a tax invoice in your company’s name."><Input placeholder="29ABCDE1234F1Z5" className="uppercase" aria-invalid={!!errors.gstin} {...register("gstin")} /></Field>
          </div>
        </fieldset>

        <fieldset className="glass rounded-3xl p-6 md:p-8">
          <legend className="sr-only">Delivery address</legend>
          <h2 className="font-heading text-lg font-bold mb-5 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-aqua text-abyss text-xs font-bold">2</span>Delivery address</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><Field label="Address line 1" error={errors.address1?.message}><Input autoComplete="address-line1" aria-invalid={!!errors.address1} {...register("address1")} /></Field></div>
            <div className="sm:col-span-2"><Field label="Address line 2 (optional)"><Input autoComplete="address-line2" {...register("address2")} /></Field></div>
            <Field label="City" error={errors.city?.message}><Input autoComplete="address-level2" aria-invalid={!!errors.city} {...register("city")} /></Field>
            <Field label="PIN code" error={errors.pincode?.message}><Input inputMode="numeric" autoComplete="postal-code" aria-invalid={!!errors.pincode} {...register("pincode")} /></Field>
            <div className="sm:col-span-2"><Field label="State" error={errors.state?.message}><Select autoComplete="address-level1" {...register("state")}>{states.map((s) => <option key={s}>{s}</option>)}</Select></Field></div>
            <div className="sm:col-span-2"><Field label="Delivery notes (optional)"><Textarea rows={2} placeholder="Floor, landmark, preferred delivery window…" {...register("notes")} /></Field></div>
          </div>
        </fieldset>

        <fieldset className="glass rounded-3xl p-6 md:p-8">
          <legend className="sr-only">Payment</legend>
          <h2 className="font-heading text-lg font-bold mb-5 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-aqua text-abyss text-xs font-bold">3</span>Payment</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { id: "razorpay", Icon: CreditCard, t: "Pay online", d: "UPI, cards, net banking, EMI via Razorpay." },
              { id: "bank", Icon: Landmark, t: "Bank transfer", d: "NEFT/RTGS — details on the next screen. For institutions." },
            ].map((o) => (
              <label key={o.id} className={cn("flex cursor-pointer gap-3 rounded-2xl border p-4 transition", payment === o.id ? "border-aqua bg-aqua/10 shadow-glow" : "border-line/15 hover:border-aqua/50")}>
                <input type="radio" value={o.id} {...register("payment")} className="sr-only" />
                <o.Icon className={cn("mt-0.5 h-5 w-5 shrink-0", payment === o.id ? "text-aqua" : "text-muted")} />
                <span><span className="block font-semibold">{o.t}</span><span className="block text-xs text-muted">{o.d}</span></span>
              </label>
            ))}
          </div>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted"><Lock className="h-3.5 w-3.5" />Payments are processed by the gateway — card details never touch our servers. Currently in test mode.</p>
        </fieldset>
      </div>

      <aside className="lg:col-span-5 lg:sticky lg:top-32">
        <div className="glass rounded-3xl p-6 md:p-8">
          <h2 className="font-heading text-lg font-bold">Order summary</h2>
          <ul className="mt-5 space-y-4 max-h-80 overflow-y-auto pr-1">
            {items.map((it) => (
              <li key={it.slug} className="flex gap-3">
                <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-bg-2/60"><ProductArt product={{ slug: it.slug, hue: it.hue, category: "", name: it.name }} /></span>
                <span className="flex-1 min-w-0"><span className="block text-sm font-medium line-clamp-2">{it.name}</span><span className="text-xs text-muted">Qty {it.qty}</span></span>
                <span className="text-sm font-semibold tabular-nums">{formatINR(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-line/10 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal (incl. GST)</dt><dd className="tabular-nums">{formatINR(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="text-teal">Free, insured</dd></div>
            <div className="flex justify-between border-t border-line/10 pt-3 font-heading text-lg font-bold"><dt>Total</dt><dd className="tabular-nums">{formatINR(subtotal)}</dd></div>
          </dl>
          {error && <p role="alert" className="mt-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-400">{error}</p>}
          <Button type="submit" size="lg" disabled={busy} magnetic={false} className="mt-6 w-full" icon={busy ? <LoaderCircle className="animate-spin" /> : payment === "bank" ? <Landmark /> : <CreditCard />}>
            {phase === "creating" ? "Creating order…" : phase === "paying" ? "Opening payment…" : payment === "bank" ? `Place order · ${formatINR(subtotal)}` : `Pay ${formatINR(subtotal)}`}
          </Button>
          <ul className="mt-5 space-y-2 text-xs text-muted">
            <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-teal" />Authorised dealer · official India warranty</li>
            <li className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-teal" />Dispatch within 2 business days</li>
          </ul>
          <p className="mt-4 text-[11px] text-muted">By placing the order you agree to our <Link href="/legal/terms" className="underline">terms</Link> and <Link href="/legal/shipping-returns" className="underline">shipping & returns policy</Link>.</p>
        </div>
      </aside>
    </form>
  );
}
