# OceanIndia — pro audio & AV, engineered for 2030

A brand-new, original Next.js 14 site for **OceanIndia**: an e-commerce store for pro-audio / studio / live-sound gear plus a turnkey AV-integration practice (studios, theatres, auditoriums, podcast rooms). Dark-first "OCEAN 2030" design system, glassmorphism, original SVG/3D graphics, eight conversion landing pages, cart + checkout (Razorpay-ready), SEO baked in.

> Everything here is original: copy, layouts, graphics and code. The reference site was used only for information architecture, feature list and factual business data.

---

## 1. Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run build`     | Production build (also type-checks)            |
| `npm run start`     | Serve the production build                     |
| `npm run lint`      | ESLint (next/core-web-vitals)                  |
| `npm run typecheck` | `tsc --noEmit`                                 |

Requirements: Node 18.17+ (Node 20 recommended).

---

## 2. Project structure

```
app/                     Routes (App Router)
  page.tsx               Home
  about/ store/ product/[slug]/ solutions/[slug]/ brands/ gallery/
  blog/[slug]/ contact/ quote/ bulk-orders/ wishlist/ track-order/
  cart/ checkout/ checkout/success/ legal/[slug]/ lp/[slug]/
  api/lead | api/newsletter | api/order      Form + order endpoints (stubs)
  layout.tsx sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
components/
  ui/         Button, Card, Section, Badge, Modal, Accordion, Tabs, Input
  motion/     Reveal, Counter, Parallax
  graphics/   Logo, WaveDivider, ProductArt (generative), ImageSlot, CategoryIcon
  layout/     Navbar, MobileDrawer, Footer, PageHero, Breadcrumbs, ThemeToggle,
              FloatingContact, CookieBar, PageTransition, Providers
  store/      CartProvider, CartDrawer, CartView, ProductCard, StoreBrowser,
              AddToCart, CheckoutForm, OrderSuccess, SearchModal, WishlistView, TrackOrder
  forms/      LeadForm (RHF + Zod → /api/lead)
  landing/    shared sections, Countdown, StickyCTA, layouts/ (8 variants)
  home/       Hero, BrandMarquee, CategoryBento, FeaturedProducts, SolutionsShowcase,
              Process, ProjectStrip, Testimonials, QuoteCTA, FAQ
  three/      OceanHero (React Three Fiber point-wave, lazy-loaded)
  brands/ gallery/ seo/
app/(site)/              Public pages
app/admin/               Admin panel (login, pages, products, inventory, media, leads, orders)
data/                    Built-in defaults. Admin edits override these via content/*.json
content/                 Saved CMS data (created on first admin save)
public/uploads/          Images uploaded from the admin media library
lib/cms/                 Storage, auth, typed getters used by every page
```

---

## 3. Admin panel

Open [http://localhost:3000/admin](http://localhost:3000/admin). The development password is `admin123` until you set environment variables:

```bash
ADMIN_PASSWORD=choose-a-long-password
ADMIN_SECRET=a-different-random-string
```

From the panel you can edit:

- **Pages** — hero, SEO, section titles, lists, FAQs and images for every public page. `**text**` becomes a gradient highlight. Tokens such as `{name}`, `{city}`, `{phone}`, `{brands}`, `{years}`, `{products}` and `{projects}` insert live site settings.
- **Products, categories, brands, solutions, projects, blog, landing pages, testimonials, FAQs, legal, navigation**
- **Site settings** — phone, WhatsApp, address, announcement bar, bank details, policies
- **Inventory** — stock, SKU, price and low-stock warning. Checkout reduces stock when a number is set.
- **Media** — upload images and pick them on any image field
- **Leads, orders, subscribers** — quote forms, newsletter signups and checkout orders

Edits are written to `content/<collection>.json` and layered on top of the defaults in `/data`. “Reset defaults” deletes that file. The public site refreshes after each save.

**Hosting note:** Vercel’s filesystem is read-only, so this file store works on a VPS, Docker volume, or your own machine. For Vercel, point `CONTENT_DIR` at a persistent disk or replace `lib/cms/storage.ts` with a database.

The tables in section 3b are the defaults the admin starts from. You can still edit those TypeScript files; the admin copy wins once a collection has been saved.

## 3b. Built-in content files

| File                   | Controls                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `data/site.ts`         | Brand name, tagline, **phone / WhatsApp / email / address / hours / socials**, policies, counts. Everything (header, footer, JSON-LD, contact page) reads from here. **Replace the TODO placeholders before launch.** |
| `data/nav.ts`          | Mega-menu columns, mobile menu, footer link groups                                           |
| `data/categories.ts`   | Store categories, sub-categories, icons, accents                                             |
| `data/products.ts`     | Products: name, brand, category, price (`null` = price on request), MRP, specs, badges, stock |
| `data/solutions.ts`    | 15 integration solutions with deliverables, ideal-for, stats and FAQs                        |
| `data/brands.ts`       | Brand directory (mark `tier: "flagship"` to star + include in marquees)                      |
| `data/projects.ts`     | Gallery projects (type, city, year, scope)                                                   |
| `data/blog.ts`         | Blog posts (`body` is an array of `{ h?, p }` blocks)                                        |
| `data/landing.ts`      | The 8 landing pages: headline, benefits, proof, steps, FAQs, CTA, countdown date, comparison |
| `data/testimonials.ts` | Client quotes (placeholders — replace with real ones)                                        |
| `data/faqs.ts`         | General FAQ shown on Home and Contact                                                        |
| `data/legal.ts`        | Privacy, Terms, Shipping & Returns (review with legal counsel)                               |

### Adding a product
Append to `products` in `data/products.ts`:

```ts
{ slug: "shure-sm7b", name: "Shure SM7B Dynamic Vocal Microphone", brand: "Shure",
  category: "microphones", subcategory: "dynamic", price: 36999, mrp: 41000,
  short: "Broadcast dynamic for vocals and podcasts.", description: "…",
  specs: [{ label: "Pattern", value: "Cardioid" }], badges: ["bestseller"], hue: 200, rating: 4.9, inStock: true }
```
The product page, store filters, search, sitemap and JSON-LD pick it up automatically.

### Adding a landing page
Add an object to `data/landing.ts` with one of the eight `layout` values (`countdown | split | enterprise | starter | festival | whatsapp | product | comparison`) and an `accent` (`aqua | teal | violet | amber | rose | emerald`). It is served at `/lp/<slug>` and added to the sitemap.

---

## 4. Images

Upload photos in **Admin → Media**, then choose them on a product, category, project, blog post or page image field. Files land in `public/uploads` and are served from `/uploads/<file>`.

Until a photo is set, product cards draw original generative art (`ProductArt`) and other slots draw a labelled gradient (`ImageSlot`). You can also drop files in `public/images/…` and paste the path (for example `/images/products/akg-c414-xlii.webp`) into the image field.

---

## 5. Design system ("OCEAN 2030")

* **Tokens** — `tailwind.config.ts` + `app/globals.css`
  * Brand: `abyss #050B1A`, `navy #0A1A3A`, `aqua #22D3EE`, `teal #2DD4BF`, `violet #8B5CF6`, `foam #F1F5F9`
  * Semantic (CSS variables, theme-aware): `bg`, `bg-2`, `fg`, `muted`, `line`, `card`, `accent`
  * Type: Space Grotesk (headings) / Inter (body) via `next/font`; fluid sizes `text-display-xl`, `text-display`, `text-h1…h3`
  * Effects: `.glass`, `.glass-strong`, `.text-gradient`, `.border-gradient`, `.grain`, `shadow-glow*`, animated mesh background, `marquee / float / shimmer / drift / pulse-ring` keyframes
* **Theme** — dark by default, light toggle in the navbar (`next-themes`, class strategy).
* **Motion** — Framer Motion reveals, stagger, magnetic buttons, card tilt, counters, parallax, page transitions. Everything respects `prefers-reduced-motion` (the 3D hero is skipped entirely).

---

## 6. Wiring the back end

Quote forms, the newsletter and checkout already save into the admin inbox (`content/leads.json`, `content/subscribers.json`, `content/orders.json`). Checkout recomputes prices on the server and reduces stock. You can still forward those records to email or a CRM from the route handlers.

| Route                   | Called by                                        | Stored as                                      |
| ----------------------- | ------------------------------------------------ | ---------------------------------------------- |
| `app/api/lead/route.ts` | Quote, Contact, Bulk, Solutions, landing pages  | A lead in Admin → Leads                        |
| `app/api/newsletter/route.ts` | Footer newsletter                          | A subscriber                                   |
| `app/api/order/route.ts` | Checkout and order tracking                    | An order; stock is reduced                     |

### Razorpay
`lib/razorpay.ts` is a mock that resolves after ~1.4 s so the full checkout → success flow can be reviewed. The file documents the four steps to go live (server-side order creation, Checkout.js, signature verification). Add `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` and `NEXT_PUBLIC_RAZORPAY_KEY_ID` to `.env.local`.

### Bank-transfer details
Set the account name, number, IFSC, bank and UPI ID under **Admin → Site settings**. The checkout success page reads those values.

### Order tracking
`/track-order` looks up the order ID plus the mobile number used at checkout. Update status and add a courier / AWB under **Admin → Orders**.

---

## 7. SEO & quality checklist

* Per-page `<title>`, description, canonical and Open Graph via `lib/seo.ts → buildMetadata()`
* Dynamic OG image at `/opengraph-image`, SVG favicon at `/icon.svg`
* `sitemap.xml` and `robots.txt` generated from `/data`
* JSON-LD: Organization + LocalBusiness (global), Product, BreadcrumbList, FAQPage, Article
* Accessible: skip link, labelled controls, focus rings, `aria-live` on dynamic regions, reduced-motion support
* Performance: fonts self-hosted via `next/font`, 3D hero lazy-loaded on idle, images through `next/image`

Before launch: run `npm run build`, test with Lighthouse (aim 90+), replace placeholders in `data/site.ts`, `data/testimonials.ts`, team names in `app/about/page.tsx`, and bank details.

---

## 8. Deploying to Netlify

`netlify.toml` already sets the build command, Node 20, and the Next.js runtime plugin.

1. In [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project** → GitHub → `Bhargava1111/oceanindia`.
2. Leave the build settings as detected (`npm run build`). Netlify installs `@netlify/plugin-nextjs` from `netlify.toml`.
3. Add environment variables before the first production deploy: `ADMIN_PASSWORD` and `ADMIN_SECRET`. Add Razorpay keys only when payments are wired (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`).
4. Deploy. Pushes to `main` redeploy. Then set the site domain and update `url` under **Admin → Site settings** (or `data/site.ts`) so canonicals and the sitemap use the live domain.

Admin edits and uploads are stored on the server disk (`content/` and `public/uploads`). Netlify’s filesystem does not keep those writes between deploys, so the published site uses the content committed in this repo. Change copy in the repo, or move `lib/cms/storage.ts` to a database, if editors need to save from the live admin.

---

## 9. Route map

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About, values, timeline, team slots |
| `/store` · `/store/[category]` | Store with filters (category, type, brand, price, tags, stock), search `?q=`, sort |
| `/product/[slug]` | Product detail, specs, related, Product JSON-LD |
| `/solutions` · `/solutions/[slug]` | 15 integration solutions with enquiry forms |
| `/brands` | Brand directory with letter nav + filters |
| `/gallery` | Project gallery (filterable, modal) |
| `/blog` · `/blog/[slug]` | Articles |
| `/contact` · `/quote` · `/bulk-orders` | Lead forms |
| `/cart` · `/checkout` · `/checkout/success` | Commerce flow |
| `/wishlist` · `/track-order` | Account-free utilities |
| `/legal/privacy` · `/legal/terms` · `/legal/shipping-returns` | Policies |
| `/admin` | Admin: pages, catalogue, inventory, media, leads, orders |
| `/lp/launch-offer` `/lp/free-consultation` `/lp/bulk-orders` `/lp/first-studio` `/lp/festival-sale` `/lp/whatsapp-quote` `/lp/studio-monitors` `/lp/why-oceanindia` | Landing pages (8 distinct layouts) |
