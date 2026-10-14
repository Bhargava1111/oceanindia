/**
 * Tokens like {legalName} {url} {city} {state} {email} {dispatchDays} {returnWindowDays} {refundDays}
 * are replaced with live Site settings when rendered.
 */
export type LegalDoc = {
  slug: "privacy" | "terms" | "shipping-returns";
  title: string;
  summary: string;
  updated: string; // ISO
  sections: { h: string; p?: string[]; items?: string[] }[];
};

/**
 * Plain-language legal pages. Review with your legal advisor before launch and
 * update `updated` whenever you change a section.
 */
export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    summary: "What we collect, why, and how to get it removed.",
    updated: "2026-10-01",
    sections: [
      { h: "Who we are", p: [`{legalName} (“OceanIndia”, “we”) operates {url} and the OceanIndia experience centre in {city}. Questions about this policy can be sent to {email}.`] },
      { h: "What we collect", items: ["Contact details you give us in forms, at checkout or on WhatsApp: name, phone, email, company and GSTIN.", "Order details: products, delivery address, invoices and payment status. Card and UPI details are handled by our payment gateway and never stored on our servers.", "Technical data: device type, pages viewed, approximate location and referrer, collected through cookies and analytics if you consent.", "Preferences stored in your browser: cart contents, wishlist, theme and cookie choice."] },
      { h: "Why we use it", items: ["To quote, invoice, deliver and support what you buy.", "To reply to enquiries and follow up on proposals.", "To send occasional product news if you subscribed — unsubscribe in one click.", "To understand which pages help customers so we can improve them."] },
      { h: "Who we share it with", p: ["Only with partners needed to serve you: payment gateway, courier, our email and CRM providers, and the manufacturer when a warranty claim requires it. We do not sell personal data."] },
      { h: "Cookies", p: ["Essential cookies keep your cart and preferences working. Analytics cookies are set only after you accept them in the cookie bar; you can change your choice any time by clearing site data in your browser."] },
      { h: "Retention", p: ["Order and invoice records are kept as long as Indian tax law requires. Enquiry data is kept for up to 24 months after our last contact, then deleted."] },
      { h: "Your rights", p: [`You may ask for a copy of your data, correct it or have it deleted (except records we must legally retain). Email {email} and we will respond within 30 days.`] },
      { h: "Changes", p: ["We update this page when our practices change and show the latest revision date at the top."] },
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    summary: "The agreement that applies when you buy from or engage OceanIndia.",
    updated: "2026-10-01",
    sections: [
      { h: "Scope", p: [`These terms govern purchases from {url}, our experience centre and project work carried out by {legalName}. Placing an order or accepting a proposal means you agree to them.`] },
      { h: "Products and pricing", items: ["Prices on the store are in Indian rupees and include GST unless stated otherwise. Items marked “Price on request” are quoted individually and the quote is valid for the period written on it.", "We try to keep stock and specifications accurate, but manufacturers change products. If an item becomes unavailable after you order, we will offer an equivalent or a full refund.", "Obvious pricing errors may be corrected before dispatch; you may cancel for a full refund if you do not accept the corrected price."] },
      { h: "Orders and payment", items: ["An order is accepted when we issue an order confirmation. Payment is collected through our payment gateway or by bank transfer for institutional orders.", "Cash on delivery is not available.", "GST invoices are issued in the name and GSTIN provided at checkout and cannot be changed after issue."] },
      { h: "Warranty", p: ["All new products carry the manufacturer’s India warranty. OceanIndia coordinates service with the manufacturer on your behalf but is not the warranty provider. Pre-owned items carry the warranty stated on their listing."] },
      { h: "Project work", items: ["Design, supply and installation projects are governed by the written proposal and its payment schedule, which take precedence over these terms where they differ.", "Installations include a 12-month workmanship warranty from handover. Equipment is covered by the manufacturer warranty.", "Timelines assume site readiness and timely approvals; delays caused by civil work, access or scope changes may move the schedule."] },
      { h: "Liability", p: ["To the extent permitted by law, our liability for any order or project is limited to the amount you paid for it. We are not liable for indirect losses such as lost revenue or recording time."] },
      { h: "Intellectual property", p: ["All text, graphics and code on this site are owned by OceanIndia or licensed to us. Brand names belong to their respective owners and are used to identify genuine products we are authorised to sell."] },
      { h: "Governing law", p: [`These terms are governed by the laws of India. Courts in {city}, {state} have exclusive jurisdiction.`] },
    ],
  },
  {
    slug: "shipping-returns",
    title: "Shipping, returns & refunds",
    summary: "How we ship, when you can return, and how refunds work.",
    updated: "2026-10-01",
    sections: [
      { h: "Shipping", items: [`In-stock items dispatch within {dispatchDays} business days. Shipping is free and insured on standard orders across India.`, "Large or heavy items — consoles, main monitors, acoustic panels, LED cabinets — ship by surface freight; we share the carrier and tracking details on dispatch.", "Delivery typically takes 2–5 business days for metros and 4–8 days for other locations after dispatch.", "Please inspect the carton on delivery. If it is damaged, note it with the courier and inform us within 48 hours with photos."] },
      { h: "Returns", items: [`Defective, damaged or incorrectly shipped items can be returned within {returnWindowDays} days of delivery in original condition with all accessories and packaging.`, "Non-returnable: customised or specially ordered products, activated software and licences, opened consumables (cables, strings, batteries), and items marked final sale.", "Change-of-mind returns are accepted at our discretion on unopened items; a restocking fee may apply and return shipping is paid by the customer.", `To start a return, WhatsApp or email {email} with your order ID and photos. We will issue a return authorisation and pickup where available.`] },
      { h: "Refunds", items: [`Approved refunds are processed to the original payment method within {refundDays} after we receive and inspect the item.`, "Bank-transfer orders are refunded to the originating account.", "If you prefer, we can issue store credit or an exchange immediately on approval."] },
      { h: "Cancellations", p: ["Orders can be cancelled free of charge before dispatch. Price-on-request and special-order items may be subject to the cancellation terms on their quote."] },
      { h: "Warranty service", p: ["For faults after the return window, contact us first. We coordinate repair or replacement with the manufacturer’s India service network and keep you updated throughout."] },
    ],
  },
];

export const getLegal = (slug: string) => legalDocs.find((d) => d.slug === slug);
