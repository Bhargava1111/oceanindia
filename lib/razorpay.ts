/**
 * Payment adapter. Today this is a MOCK that resolves after a short delay so the
 * checkout flow can be reviewed end-to-end without keys.
 *
 * To go live with Razorpay:
 *  1. `npm i razorpay` and add RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET to .env.local
 *  2. In app/api/order/route.ts create a Razorpay order server-side:
 *       const rzp = new Razorpay({ key_id, key_secret });
 *       const order = await rzp.orders.create({ amount: subtotal * 100, currency: "INR", receipt: id });
 *     and return `order.id` to the client.
 *  3. Replace `openPayment` below with Razorpay Checkout.js:
 *       const rz = new (window as any).Razorpay({ key: NEXT_PUBLIC_RAZORPAY_KEY_ID, order_id, amount, currency: "INR", name: "OceanIndia", prefill: { name, email, contact }, theme: { color: "#22D3EE" }, handler: resolve });
 *       rz.open();
 *     (load https://checkout.razorpay.com/v1/checkout.js via next/script in app/checkout/page.tsx)
 *  4. Verify the payment signature server-side (HMAC SHA256 of order_id|payment_id with the secret)
 *     in a /api/payment/verify route before marking the order paid.
 */
export type PaymentResult = { ok: true; paymentId: string } | { ok: false; reason: string };

export async function openPayment(_opts: { amount: number; orderId: string; name: string; email: string; contact: string }): Promise<PaymentResult> {
  await new Promise((r) => setTimeout(r, 1400));
  return { ok: true, paymentId: `pay_MOCK${Date.now().toString(36).toUpperCase()}` };
}
