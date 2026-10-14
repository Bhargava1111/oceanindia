"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Copy, Landmark, MessageCircle, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSite } from "@/components/layout/SiteProvider";
import { formatINR } from "@/lib/utils";

type Summary = { id: string; subtotal: number; payment: "razorpay" | "bank"; paymentId?: string; name: string; email: string; items: { name: string; qty: number; price: number }[] };

export function OrderSuccess() {
  const { site, whatsappUrl } = useSite();
  const sp = useSearchParams();
  const id = sp.get("order") ?? "";
  const [s, setS] = React.useState<Summary | null>(null);
  const [copied, setCopied] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    try { const raw = sessionStorage.getItem("oceanindia:last-order"); if (raw) { const d = JSON.parse(raw) as Summary; if (d.id === id) setS(d); } } catch {}
  }, [id]);

  const copy = async () => { try { await navigator.clipboard.writeText(id); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-[2rem] glass border-gradient p-8 md:p-12 text-center">
        <span aria-hidden className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-teal/25 blur-3xl" />
        <span aria-hidden className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-violet/25 blur-3xl" />
        <motion.span initial={reduce ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-teal/15 text-teal shadow-glow-teal"><CheckCircle2 className="h-10 w-10" /></motion.span>
        <h1 className="relative mt-6 text-h1">{s?.payment === "bank" ? "Order placed." : "Payment received."}</h1>
        <p className="relative mt-3 text-muted">{s ? `Thanks, ${s.name.split(" ")[0]}. A confirmation is on its way to ${s.email}.` : "Thank you for your order."}</p>
        <button onClick={copy} className="relative mt-5 inline-flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 font-mono text-sm hover:border-aqua/60" aria-label="Copy order ID">
          {id || "—"} <Copy className="h-3.5 w-3.5 text-muted" />{copied && <span className="text-xs text-teal">Copied</span>}
        </button>
      </div>

      {s && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <h2 className="font-heading font-bold">Items</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {s.items.map((it) => <li key={it.name} className="flex justify-between gap-3"><span className="text-muted">{it.qty} × {it.name}</span><span className="tabular-nums">{formatINR(it.price * it.qty)}</span></li>)}
            </ul>
            <p className="mt-4 flex justify-between border-t border-line/10 pt-3 font-heading font-bold"><span>Total paid</span><span className="tabular-nums">{formatINR(s.subtotal)}</span></p>
            {s.paymentId && <p className="mt-2 text-[11px] text-muted">Payment ref {s.paymentId}</p>}
          </div>
          <div className="glass rounded-3xl p-6">
            {s.payment === "bank" ? (
              <>
                <h2 className="font-heading font-bold inline-flex items-center gap-2"><Landmark className="h-4 w-4 text-aqua" />Bank transfer details</h2>
                <dl className="mt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between"><dt className="text-muted">Account name</dt><dd>{site.bank.accountName || site.legalName}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">Bank</dt><dd>{site.bank.bankName}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">Account no.</dt><dd className="font-mono">{site.bank.accountNumber}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">IFSC</dt><dd className="font-mono">{site.bank.ifsc}</dd></div>
                  {site.bank.upi && <div className="flex justify-between"><dt className="text-muted">UPI</dt><dd className="font-mono">{site.bank.upi}</dd></div>}
                  <div className="flex justify-between"><dt className="text-muted">Reference</dt><dd className="font-mono">{s.id}</dd></div>
                </dl>
                <p className="mt-3 text-xs text-muted">Your order is reserved for 48 hours. Share the transfer receipt on WhatsApp to speed things up.</p>
              </>
            ) : (
              <>
                <h2 className="font-heading font-bold">What happens next</h2>
                <ol className="mt-4 space-y-2 text-sm text-muted list-decimal pl-5">
                  <li>We check and pack your order within {site.policies.dispatchDays} business days.</li>
                  <li>You receive a tracking link by SMS and email.</li>
                  <li>An engineer is one WhatsApp away for setup help.</li>
                </ol>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={`/track-order`} variant="outline" icon={<PackageSearch />}>Track order</Button>
        <Button href={whatsappUrl(`Hi ${site.name}, about my order ${id}.`)} variant="whatsapp" icon={<MessageCircle />}>WhatsApp support</Button>
        <Button href="/store" variant="ghost">Continue shopping</Button>
      </div>
    </div>
  );
}
