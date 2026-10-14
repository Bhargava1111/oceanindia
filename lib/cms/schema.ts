/**
 * Client-safe field definitions for the admin editor.
 * `key` is a dot path into the record ("contact.email", "seo.title").
 */
export type FieldType = "text" | "textarea" | "number" | "boolean" | "select" | "image" | "json" | "tags";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  hint?: string;
  /** Empty number inputs become null instead of 0. */
  nullable?: boolean;
};

export type Column = { key: string; label: string };

export type SchemaContext = { categories?: string[]; brands?: string[] };

export function columnsFor(name: string): Column[] {
  switch (name) {
    case "pages":
      return [
        { key: "label", label: "Page" },
        { key: "path", label: "Path" },
        { key: "seo.title", label: "SEO title" },
      ];
    case "products":
      return [
        { key: "name", label: "Product" },
        { key: "brand", label: "Brand" },
        { key: "price", label: "Price" },
        { key: "stock", label: "Stock" },
        { key: "sku", label: "SKU" },
      ];
    case "categories":
      return [
        { key: "name", label: "Category" },
        { key: "slug", label: "Slug" },
        { key: "accent", label: "Accent" },
      ];
    case "brands":
      return [
        { key: "name", label: "Brand" },
        { key: "category", label: "Category" },
        { key: "tier", label: "Tier" },
      ];
    case "solutions":
      return [
        { key: "name", label: "Solution" },
        { key: "group", label: "Group" },
        { key: "slug", label: "Slug" },
      ];
    case "projects":
      return [
        { key: "title", label: "Project" },
        { key: "type", label: "Type" },
        { key: "city", label: "City" },
        { key: "year", label: "Year" },
      ];
    case "blog":
      return [
        { key: "title", label: "Post" },
        { key: "category", label: "Category" },
        { key: "date", label: "Date" },
      ];
    case "landing":
      return [
        { key: "title", label: "Landing page" },
        { key: "slug", label: "Slug" },
        { key: "layout", label: "Layout" },
      ];
    case "testimonials":
      return [
        { key: "name", label: "Name" },
        { key: "project", label: "Project" },
        { key: "rating", label: "Rating" },
      ];
    case "faqs":
      return [{ key: "q", label: "Question" }];
    case "legal":
      return [
        { key: "title", label: "Document" },
        { key: "slug", label: "Slug" },
        { key: "updated", label: "Updated" },
      ];
    case "leads":
      return [
        { key: "createdAt", label: "Received" },
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "interest", label: "Interest" },
        { key: "status", label: "Status" },
      ];
    case "orders":
      return [
        { key: "id", label: "Order" },
        { key: "createdAt", label: "Placed" },
        { key: "customer.name", label: "Customer" },
        { key: "total", label: "Total" },
        { key: "status", label: "Status" },
      ];
    case "subscribers":
      return [
        { key: "email", label: "Email" },
        { key: "createdAt", label: "Joined" },
        { key: "source", label: "Source" },
      ];
    default:
      return [{ key: "id", label: "ID" }];
  }
}

export function fieldsFor(name: string, ctx: SchemaContext = {}): Field[] {
  const cats = ctx.categories?.length ? ctx.categories : undefined;
  switch (name) {
    case "site":
      return [
        { key: "name", label: "Brand name", type: "text" },
        { key: "legalName", label: "Legal name", type: "text" },
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "url", label: "Public URL", type: "text", hint: "Used in SEO, sitemap and legal pages." },
        { key: "announcement", label: "Announcement bar", type: "text" },
        { key: "foundedYear", label: "Founded year", type: "number" },
        { key: "yearsExperience", label: "Years of experience", type: "number" },
        { key: "brandsCount", label: "Brands count", type: "number" },
        { key: "productsCount", label: "Products count", type: "number" },
        { key: "projectsCount", label: "Projects count", type: "number" },
        { key: "contact.phonePrimary", label: "Primary phone", type: "text" },
        { key: "contact.phoneSecondary", label: "Secondary phone", type: "text" },
        { key: "contact.whatsapp", label: "WhatsApp number", type: "text", hint: "Digits only, with country code. Example: 919000000000" },
        { key: "contact.email", label: "Email", type: "text" },
        { key: "contact.hours", label: "Hours", type: "text" },
        { key: "contact.address.line1", label: "Address line 1", type: "text" },
        { key: "contact.address.line2", label: "Address line 2", type: "text" },
        { key: "contact.address.city", label: "City", type: "text" },
        { key: "contact.address.state", label: "State", type: "text" },
        { key: "contact.address.postalCode", label: "PIN code", type: "text" },
        { key: "contact.address.landmark", label: "Landmark", type: "text" },
        { key: "contact.address.mapsUrl", label: "Google Maps URL", type: "text" },
        { key: "contact.address.geo.lat", label: "Latitude", type: "number" },
        { key: "contact.address.geo.lng", label: "Longitude", type: "number" },
        { key: "social.instagram", label: "Instagram", type: "text" },
        { key: "social.facebook", label: "Facebook", type: "text" },
        { key: "social.youtube", label: "YouTube", type: "text" },
        { key: "social.linkedin", label: "LinkedIn", type: "text" },
        { key: "policies.dispatchDays", label: "Dispatch days", type: "number" },
        { key: "policies.returnWindowDays", label: "Return window (days)", type: "number" },
        { key: "policies.refundDays", label: "Refund timeline", type: "text" },
        { key: "policies.shippingCharge", label: "Shipping charge (₹)", type: "number" },
        { key: "policies.codAvailable", label: "Cash on delivery", type: "boolean" },
        { key: "policies.gstCaptured", label: "GST invoice", type: "boolean" },
        { key: "bank.accountName", label: "Bank account name", type: "text" },
        { key: "bank.accountNumber", label: "Account number", type: "text" },
        { key: "bank.ifsc", label: "IFSC", type: "text" },
        { key: "bank.bankName", label: "Bank name", type: "text" },
        { key: "bank.upi", label: "UPI ID", type: "text" },
      ];
    case "nav":
      return [
        { key: "mainNav", label: "Main navigation", type: "json", hint: "Array of { label, href?, children?: [{ label, href, description? }] }." },
        { key: "footerNav", label: "Footer navigation", type: "json", hint: "Object of column name → [{ label, href }]." },
      ];
    case "products":
      return [
        { key: "name", label: "Name", type: "text" },
        { key: "slug", label: "Slug", type: "text", hint: "URL: /product/<slug>" },
        { key: "sku", label: "SKU", type: "text" },
        { key: "brand", label: "Brand", type: ctx.brands?.length ? "select" : "text", options: ctx.brands },
        { key: "category", label: "Category", type: cats ? "select" : "text", options: cats },
        { key: "subcategory", label: "Subcategory slug", type: "text" },
        { key: "price", label: "Price (₹)", type: "number", nullable: true, hint: "Leave empty for “price on request”." },
        { key: "mrp", label: "MRP (₹)", type: "number", nullable: true },
        { key: "stock", label: "Stock", type: "number", hint: "Units on hand. Leave empty to use the in-stock flag only." },
        { key: "lowStockAt", label: "Low-stock warning at", type: "number" },
        { key: "inStock", label: "Available (when stock is empty)", type: "boolean" },
        { key: "featured", label: "Featured on home", type: "boolean" },
        { key: "badges", label: "Badges", type: "tags", hint: "new, bestseller, combo, offer, pre-owned" },
        { key: "rating", label: "Rating", type: "number" },
        { key: "hue", label: "Placeholder hue", type: "number" },
        { key: "short", label: "Short line", type: "textarea" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image", label: "Main image", type: "image" },
        { key: "gallery", label: "Gallery images", type: "json", hint: "Array of image paths, e.g. [\"/uploads/front.webp\"]." },
        { key: "specs", label: "Specifications", type: "json", hint: "Array of { \"label\", \"value\" }." },
      ];
    case "categories":
      return [
        { key: "name", label: "Name", type: "text" },
        { key: "slug", label: "Slug", type: "text" },
        { key: "short", label: "Short line", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "icon", label: "Icon", type: "select", options: ["mic", "waves", "speaker", "sliders", "headphones", "disc", "guitar", "cable", "cpu", "layers", "gift", "tag", "recycle", "zap"] },
        { key: "accent", label: "Accent", type: "select", options: ["aqua", "teal", "violet"] },
        { key: "featured", label: "Featured", type: "boolean" },
        { key: "image", label: "Image", type: "image" },
        { key: "children", label: "Subcategories", type: "json", hint: "Array of { \"slug\", \"name\" }." },
      ];
    case "brands":
      return [
        { key: "name", label: "Name", type: "text" },
        { key: "category", label: "Category", type: "text" },
        { key: "tier", label: "Tier", type: "select", options: ["", "flagship"] },
      ];
    case "solutions":
      return [
        { key: "name", label: "Name", type: "text" },
        { key: "slug", label: "Slug", type: "text" },
        { key: "group", label: "Group", type: "select", options: ["Create", "Gather", "Experience"] },
        { key: "accent", label: "Accent", type: "select", options: ["aqua", "teal", "violet"] },
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "summary", label: "Summary", type: "textarea" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image", label: "Image", type: "image" },
        { key: "gallery", label: "Gallery", type: "json" },
        { key: "deliverables", label: "Deliverables", type: "json" },
        { key: "idealFor", label: "Ideal for", type: "json" },
        { key: "stats", label: "Stats", type: "json", hint: "Array of { \"label\", \"value\" }." },
        { key: "faqs", label: "FAQs", type: "json", hint: "Array of { \"q\", \"a\" }." },
      ];
    case "projects":
      return [
        { key: "title", label: "Title", type: "text" },
        { key: "slug", label: "Slug", type: "text" },
        { key: "type", label: "Type", type: "select", options: ["Studio", "Podcast", "Auditorium", "Conference", "Classroom", "Home theatre", "Venue", "Acoustics"] },
        { key: "city", label: "City", type: "text" },
        { key: "year", label: "Year", type: "number" },
        { key: "summary", label: "Summary", type: "textarea" },
        { key: "scope", label: "Scope", type: "tags" },
        { key: "hue", label: "Hue", type: "number" },
        { key: "aspect", label: "Aspect class", type: "text", hint: "Tailwind class, e.g. aspect-[4/3]" },
        { key: "image", label: "Image", type: "image" },
      ];
    case "blog":
      return [
        { key: "title", label: "Title", type: "text" },
        { key: "slug", label: "Slug", type: "text" },
        { key: "excerpt", label: "Excerpt", type: "textarea" },
        { key: "date", label: "Date", type: "text", hint: "YYYY-MM-DD" },
        { key: "readMinutes", label: "Read minutes", type: "number" },
        { key: "category", label: "Category", type: "select", options: ["Studio", "Live sound", "Home theatre", "Buying guides", "Acoustics"] },
        { key: "author", label: "Author", type: "text" },
        { key: "hue", label: "Hue", type: "number" },
        { key: "image", label: "Cover image", type: "image" },
        { key: "body", label: "Body", type: "json", hint: "Array of { \"h\"?: heading, \"p\": paragraph }." },
      ];
    case "landing":
      return [
        { key: "title", label: "Internal title", type: "text" },
        { key: "slug", label: "Slug", type: "text", hint: "URL: /lp/<slug>" },
        { key: "layout", label: "Layout", type: "select", options: ["countdown", "split", "enterprise", "starter", "festival", "whatsapp", "product", "comparison"] },
        { key: "accent", label: "Accent", type: "select", options: ["aqua", "teal", "violet", "amber", "rose", "emerald"] },
        { key: "metaTitle", label: "SEO title", type: "text" },
        { key: "metaDescription", label: "SEO description", type: "textarea" },
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "headline", label: "Headline", type: "textarea" },
        { key: "subheadline", label: "Subheadline", type: "textarea" },
        { key: "cta", label: "Primary button", type: "text" },
        { key: "secondaryCta.label", label: "Secondary button label", type: "text" },
        { key: "secondaryCta.href", label: "Secondary button link", type: "text" },
        { key: "offerEndsAt", label: "Offer ends (ISO)", type: "text" },
        { key: "productSlug", label: "Spotlight product slug", type: "text" },
        { key: "benefits", label: "Benefits", type: "json" },
        { key: "proof", label: "Proof stats", type: "json" },
        { key: "steps", label: "Steps", type: "json" },
        { key: "faqs", label: "FAQs", type: "json" },
        { key: "comparison", label: "Comparison rows", type: "json" },
        { key: "interestOptions", label: "Form interests", type: "json" },
      ];
    case "testimonials":
      return [
        { key: "name", label: "Name", type: "text" },
        { key: "role", label: "Role", type: "text" },
        { key: "project", label: "Project", type: "text" },
        { key: "rating", label: "Rating", type: "number" },
        { key: "quote", label: "Quote", type: "textarea" },
      ];
    case "faqs":
      return [
        { key: "q", label: "Question", type: "text" },
        { key: "a", label: "Answer", type: "textarea" },
      ];
    case "legal":
      return [
        { key: "title", label: "Title", type: "text" },
        { key: "slug", label: "Slug", type: "select", options: ["privacy", "terms", "shipping-returns"] },
        { key: "summary", label: "Summary", type: "textarea" },
        { key: "updated", label: "Updated", type: "text", hint: "YYYY-MM-DD" },
        { key: "sections", label: "Sections", type: "json", hint: "Array of { \"h\", \"p\"?: string[], \"items\"?: string[] }. Tokens: {legalName} {url} {city} {email} {dispatchDays} {returnWindowDays} {refundDays}." },
      ];
    case "leads":
      return [
        { key: "status", label: "Status", type: "select", options: ["new", "contacted", "quoted", "won", "lost"] },
        { key: "name", label: "Name", type: "text" },
        { key: "phone", label: "Phone", type: "text" },
        { key: "email", label: "Email", type: "text" },
        { key: "company", label: "Company", type: "text" },
        { key: "interest", label: "Interest", type: "text" },
        { key: "budget", label: "Budget", type: "text" },
        { key: "product", label: "Product", type: "text" },
        { key: "source", label: "Source", type: "text" },
        { key: "message", label: "Message", type: "textarea" },
        { key: "notes", label: "Internal notes", type: "textarea" },
      ];
    case "orders":
      return [
        { key: "status", label: "Status", type: "select", options: ["pending-payment", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"] },
        { key: "payment", label: "Payment", type: "select", options: ["razorpay", "bank"] },
        { key: "paymentRef", label: "Payment reference", type: "text" },
        { key: "customer.name", label: "Customer name", type: "text" },
        { key: "customer.phone", label: "Phone", type: "text" },
        { key: "customer.email", label: "Email", type: "text" },
        { key: "customer.gstin", label: "GSTIN", type: "text" },
        { key: "address.line1", label: "Address", type: "text" },
        { key: "address.line2", label: "Address line 2", type: "text" },
        { key: "address.city", label: "City", type: "text" },
        { key: "address.state", label: "State", type: "text" },
        { key: "address.pincode", label: "PIN code", type: "text" },
        { key: "address.notes", label: "Delivery notes", type: "textarea" },
        { key: "tracking.courier", label: "Courier", type: "text" },
        { key: "tracking.awb", label: "AWB / tracking number", type: "text" },
        { key: "tracking.url", label: "Tracking URL", type: "text" },
        { key: "notes", label: "Internal notes", type: "textarea" },
        { key: "items", label: "Line items", type: "json" },
        { key: "subtotal", label: "Subtotal", type: "number" },
        { key: "shipping", label: "Shipping", type: "number" },
        { key: "total", label: "Total", type: "number" },
      ];
    case "subscribers":
      return [
        { key: "email", label: "Email", type: "text" },
        { key: "source", label: "Source", type: "text" },
      ];
    default:
      return [{ key: "json", label: "Record", type: "json" }];
  }
}

export function blankFor(name: string): Record<string, unknown> {
  switch (name) {
    case "products":
      return { slug: "", name: "", brand: "", category: "", price: null, short: "", description: "", stock: 0, inStock: true, badges: [], specs: [], gallery: [], featured: false };
    case "categories":
      return { slug: "", name: "", short: "", description: "", icon: "mic", accent: "aqua", featured: false, children: [] };
    case "brands":
      return { name: "", category: "", tier: "" };
    case "solutions":
      return { slug: "", name: "", tagline: "", summary: "", description: "", group: "Create", accent: "aqua", deliverables: [], idealFor: [], faqs: [], gallery: [] };
    case "projects":
      return { slug: "", title: "", type: "Studio", city: "", year: new Date().getFullYear(), summary: "", scope: [], hue: 190, aspect: "aspect-[4/3]" };
    case "blog":
      return { slug: "", title: "", excerpt: "", date: new Date().toISOString().slice(0, 10), readMinutes: 5, category: "Studio", hue: 190, body: [{ p: "" }] };
    case "landing":
      return { slug: "", title: "", layout: "split", accent: "aqua", metaTitle: "", metaDescription: "", eyebrow: "", headline: "", subheadline: "", cta: "Get a quote", benefits: [], proof: [], steps: [], faqs: [], interestOptions: [] };
    case "testimonials":
      return { name: "", role: "", project: "", rating: 5, quote: "" };
    case "faqs":
      return { q: "", a: "" };
    case "legal":
      return { slug: "privacy", title: "", summary: "", updated: new Date().toISOString().slice(0, 10), sections: [] };
    case "leads":
      return { id: "", name: "", phone: "", source: "admin", status: "new", createdAt: new Date().toISOString() };
    case "orders":
      return { id: "", createdAt: new Date().toISOString(), status: "pending-payment", payment: "bank", customer: { name: "", phone: "", email: "" }, address: { line1: "", city: "", state: "", pincode: "" }, items: [], subtotal: 0, shipping: 0, total: 0 };
    case "subscribers":
      return { email: "", createdAt: new Date().toISOString(), source: "admin" };
    case "pages":
      return { slug: "", label: "", path: "/", seo: { title: "", description: "" }, hero: { eyebrow: "", title: "", description: "" }, sections: [], lists: [], paragraphs: [], images: [], faqs: [] };
    default:
      return {};
  }
}

/** Collections that should not be created or deleted from the generic table. */
export const lockedCreate = new Set(["site", "nav", "legal"]);
