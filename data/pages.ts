/**
 * Editable copy for every static page. Managed from /admin → Pages.
 *
 * Text conventions (rendered by <RichText/> in lib/pages.tsx):
 *   **text**   → gradient highlight
 *   \n         → line break
 *   {brands} {years} {projects} {products} {phone} {hours} {city} {name} → live values from Site settings
 */
export type Cta = { label: string; href: string };
export type PageSection = { key: string; eyebrow?: string; title: string; description?: string };
export type PageItem = { title: string; text: string; meta?: string };
export type PageList = { key: string; label: string; items: PageItem[] };
export type PageImage = { key: string; src: string; alt: string; label?: string };

export type PageCopy = {
  slug: string;
  label: string;
  path: string;
  seo: { title: string; description: string };
  hero: { eyebrow?: string; title: string; description?: string; primaryCta?: Cta; secondaryCta?: Cta };
  sections: PageSection[];
  lists: PageList[];
  paragraphs: { key: string; text: string }[];
  images: PageImage[];
  faqs: { q: string; a: string }[];
};

export const pages: PageCopy[] = [
  {
    slug: "home",
    label: "Home",
    path: "/",
    seo: { title: "{name} — Pro audio & AV, engineered for 2030.", description: "OceanIndia supplies professional audio, studio, live-sound and musical-instrument gear from 90+ brands, and designs turnkey AV spaces — recording studios, home theatres, auditoriums and podcast rooms — across India." },
    hero: {
      eyebrow: "Pro audio · AV integration · Bengaluru → all India",
      title: "Hear the future.\n**Build it with OceanIndia.**",
      description: "Studio, live and DJ gear from {brands}+ authorised brands, plus turnkey rooms — recording studios, home theatres, auditoriums and podcast suites — designed and installed by engineers with {years}+ years at the console.",
      primaryCta: { label: "Shop the store", href: "/store" },
      secondaryCta: { label: "Plan a room", href: "/quote" },
    },
    sections: [
      { key: "brands", eyebrow: "Authorised dealer for", title: "All {brands}+ brands →" },
      { key: "categories", eyebrow: "The store", title: "Every link in the chain, **from capsule to cone.**", description: "Thirteen categories, 1,800+ products, one place to compare them. Filter by brand and budget, or ask us to shortlist." },
      { key: "featured", eyebrow: "Curated", title: "Gear worth your **attention.**", description: "Hand-picked by our engineers. Prices include GST; shipping is free." },
      { key: "solutions", eyebrow: "Solutions", title: "We don’t just ship boxes. **We finish rooms.**", description: "Acoustic design, equipment specification, installation, calibration and training — one team, from the first measurement to the last preset." },
      { key: "process", eyebrow: "How we work", title: "Four steps. **Zero guesswork.**", description: "The same process whether it's a bedroom vocal booth or a 1,200-seat auditorium." },
      { key: "projects", eyebrow: "Recent work", title: "Rooms we’ve **finished.**" },
      { key: "testimonials", eyebrow: "Client voices", title: "Trusted in studios, halls **and living rooms.**", description: "A few of the people whose rooms we've measured, built and tuned." },
      { key: "quote", eyebrow: "Get a quote", title: "Tell us the room and the goal.\nWe’ll send a plan and a price.", description: "Product quotes within hours on working days. Project proposals with drawings in two to five days. No obligation, no pressure." },
      { key: "faq", eyebrow: "FAQ", title: "Questions we hear **every day.**", description: "Can't find yours? WhatsApp us — a human answers." },
    ],
    lists: [
      {
        key: "highlights",
        label: "Hero trust points",
        items: [
          { title: "Authorised warranty on every unit", text: "" },
          { title: "Free insured shipping, 2-day dispatch", text: "" },
          { title: "Engineer advice before you buy", text: "" },
        ],
      },
      {
        key: "stats",
        label: "Hero statistics (value in meta)",
        items: [
          { title: "Authorised brands", text: "+", meta: "{brands}" },
          { title: "Products ready to ship", text: "+", meta: "{products}" },
          { title: "Rooms designed & installed", text: "+", meta: "{projects}" },
          { title: "Engineering experience", text: " yrs", meta: "{years}" },
        ],
      },
      {
        key: "process",
        label: "Process steps",
        items: [
          { title: "Measure", text: "Room dimensions, noise floor, reflections and how you actually work. No quote before we understand the space." },
          { title: "Design", text: "Acoustic plan, speaker layout, signal flow and a bill of materials with options at two budget levels." },
          { title: "Supply & install", text: "Authorised equipment, clean cabling, racks and power — installed by our team or alongside your contractor." },
          { title: "Calibrate & train", text: "Measured tuning, presets, documentation and a hands-on session so your team runs it with confidence." },
        ],
      },
    ],
    paragraphs: [],
    images: [],
    faqs: [],
  },
  {
    slug: "about",
    label: "About",
    path: "/about",
    seo: { title: "About OceanIndia — engineers first, dealers second", description: "OceanIndia is a Bengaluru-based pro-audio and AV company: authorised dealer for {brands}+ brands and a turnkey integrator for studios, theatres, auditoriums and podcast rooms across India." },
    hero: {
      eyebrow: "About OceanIndia",
      title: "Engineers first. **Dealers second.**",
      description: "We are a Bengaluru pro-audio and AV company that has spent fifteen years at the console, in the rack and up the ladder. We sell equipment because we know how to make it sound right in a room.",
      primaryCta: { label: "What we build", href: "/solutions" },
      secondaryCta: { label: "Visit the experience centre", href: "/contact" },
    },
    sections: [
      { key: "story", eyebrow: "Our story", title: "Built by people who had to make it work on show night." },
      { key: "values", eyebrow: "How we think", title: "Six habits we **won’t compromise on.**" },
      { key: "timeline", eyebrow: "Milestones", title: "Fifteen years, **one obsession.**", description: "From a single counter to studios, theatres and auditoriums across India." },
      { key: "team", eyebrow: "The people", title: "Small team, **senior hands.**", description: "Acoustic designers, systems engineers, installers and a sales team that has mixed shows." },
    ],
    lists: [
      {
        key: "values",
        label: "Values",
        items: [
          { title: "Listen before we specify", text: "Every engagement starts with how you work and what the room does — not with a product list." },
          { title: "Measure, don’t guess", text: "Room analysis, coverage modelling and post-install verification. If we can’t measure it, we don’t claim it." },
          { title: "Brand-neutral advice", text: "With {brands}+ brands on the shelf, we recommend what fits your room and budget — not what’s on promotion." },
          { title: "Authorised, always", text: "Official India warranty on every unit and service coordination handled by us, not forwarded to you." },
          { title: "Finish the room", text: "Supply is the easy part. We cable, calibrate, document and train until the system is boring to operate." },
          { title: "Here for the long run", text: "Twelve-month workmanship warranty, annual maintenance options, and engineers who pick up the phone." },
        ],
      },
      {
        key: "timeline",
        label: "Timeline (year in meta)",
        items: [
          { meta: "2010", title: "A counter and a console", text: "Started as a two-person pro-audio counter in Bengaluru, selling microphones and mixers to local studios and churches." },
          { meta: "2014", title: "First full studio build", text: "Designed and commissioned our first ground-up recording studio — acoustics, monitoring, patching and training." },
          { meta: "2018", title: "Integration division", text: "Added auditorium, conference and home-theatre design as campuses and corporates asked for turnkey rooms." },
          { meta: "2022", title: "Immersive & podcast", text: "Delivered our first Dolby-aligned 7.1.4 mix room and a wave of multi-host podcast studios for media teams." },
          { meta: "2026", title: "OceanIndia online", text: "Launched this store so the same engineer-led advice is available to every studio and venue in India." },
        ],
      },
      {
        key: "team",
        label: "Team (name, role; photo path in meta)",
        items: [
          { title: "Name Surname", text: "Founder & principal engineer", meta: "/images/about/team-1.webp" },
          { title: "Name Surname", text: "Acoustic designer", meta: "/images/about/team-2.webp" },
          { title: "Name Surname", text: "Systems & networking", meta: "/images/about/team-3.webp" },
          { title: "Name Surname", text: "Install & calibration lead", meta: "/images/about/team-4.webp" },
        ],
      },
      {
        key: "stats",
        label: "Story statistics (value in meta)",
        items: [
          { title: "years", text: "+", meta: "{years}" },
          { title: "rooms delivered", text: "+", meta: "{projects}" },
          { title: "brands", text: "+", meta: "{brands}" },
        ],
      },
    ],
    paragraphs: [
      { key: "story-1", text: "OceanIndia started behind a counter in Bengaluru, selling microphones and mixers to studios and churches that needed gear to work the first time. The questions were never just “how much?” — they were “will this survive my room?”" },
      { key: "story-2", text: "So we learned rooms. Acoustics, coverage, gain structure, networking, control. That knowledge became an integration practice, and the counter became an experience centre. Today we supply {brands}+ authorised brands and design turnkey spaces — but the habit is the same: understand the room before recommending anything." },
    ],
    images: [
      { key: "control-room", src: "/images/about/control-room.webp", alt: "OceanIndia engineers calibrating a control room", label: "Team at work" },
      { key: "experience-centre", src: "/images/about/experience-centre.webp", alt: "OceanIndia experience centre monitor wall", label: "Experience centre" },
    ],
    faqs: [],
  },
  {
    slug: "store",
    label: "Store",
    path: "/store",
    seo: { title: "Store — Pro audio, studio, live & DJ gear", description: "Shop microphones, audio interfaces, studio monitors, mixers, headphones, PA systems and more from {brands}+ authorised brands. GST invoice, free insured shipping, engineer support." },
    hero: { eyebrow: "The store", title: "Everything between the **source and the speaker.**", description: "Curated pro-audio and AV equipment from authorised brands. Filter by category, brand and budget — or ask an engineer to shortlist for you." },
    sections: [
      { key: "category-help", title: "Not sure which one?", description: "Send your use case and budget — an engineer replies with two or three options that fit, not a catalogue." },
      { key: "beyond", eyebrow: "Beyond the box", title: "Building a {solution}? We design the whole room." },
      { key: "keep-browsing", eyebrow: "Keep browsing", title: "" },
    ],
    lists: [],
    paragraphs: [],
    images: [],
    faqs: [],
  },
  {
    slug: "solutions",
    label: "Solutions",
    path: "/solutions",
    seo: { title: "Solutions — studios, theatres, auditoriums & AV rooms, designed and installed", description: "Turnkey pro-audio and AV integration: recording and podcast studios, Dolby Atmos rooms, auditoriums, conference rooms, classrooms, LED walls, home theatres, clubs, gyms and acoustic treatment." },
    hero: { eyebrow: "Solutions", title: "Fifteen kinds of room. **One way of working.**", description: "We design, supply, install, calibrate and train — so the room is finished, not just furnished. Pick a space below or tell us about yours." },
    sections: [
      { key: "Create", title: "Create", description: "Rooms where sound and picture are made — studios, booths, floors and mix rooms." },
      { key: "Gather", title: "Gather", description: "Spaces where people meet and listen — halls, boardrooms, classrooms and venues." },
      { key: "Experience", title: "Experience", description: "Places built to be felt — theatres, clubs, gyms and the treatment that makes them work." },
    ],
    lists: [],
    paragraphs: [],
    images: [
      { key: "Create", src: "/images/solutions/recording-studio.webp", alt: "Create spaces by OceanIndia", label: "Create — project photo" },
      { key: "Gather", src: "/images/solutions/auditorium.webp", alt: "Gather spaces by OceanIndia", label: "Gather — project photo" },
      { key: "Experience", src: "/images/solutions/home-theatre.webp", alt: "Experience spaces by OceanIndia", label: "Experience — project photo" },
    ],
    faqs: [],
  },
  {
    slug: "brands",
    label: "Brands",
    path: "/brands",
    seo: { title: "Brands — {brands}+ authorised pro-audio & AV brands", description: "OceanIndia is an authorised Indian dealer for ADAM Audio, AKG, Allen & Heath, Antelope Audio, Audio-Technica, beyerdynamic, Neumann, PreSonus, Steinberg and 80+ more." },
    hero: { eyebrow: "Authorised dealer", title: "{brands}+ brands. **Zero grey imports.**", description: "Every brand below is sold with its official India warranty and our service coordination. Flagship lines are starred. Tap a brand to see its products in the store." },
    sections: [],
    lists: [],
    paragraphs: [],
    images: [],
    faqs: [],
  },
  {
    slug: "gallery",
    label: "Projects / Gallery",
    path: "/gallery",
    seo: { title: "Projects — studios, theatres, auditoriums and venues we have finished", description: "A gallery of {projects}+ rooms designed, installed and calibrated by OceanIndia across India — recording studios, podcast suites, auditoriums, boardrooms, classrooms, home theatres and venues." },
    hero: { eyebrow: "Project gallery", title: "Rooms we’ve **measured, built and tuned.**", description: "A selection from fifteen years of work. Tap a project for scope and details." },
    sections: [],
    lists: [
      {
        key: "stats",
        label: "Hero statistics (value in meta)",
        items: [
          { title: "Rooms delivered", text: "+", meta: "{projects}" },
          { title: "Auditorium seats", text: "+", meta: "40000" },
          { title: "Cities", text: "", meta: "12" },
        ],
      },
    ],
    paragraphs: [],
    images: [],
    faqs: [],
  },
  {
    slug: "blog",
    label: "Blog",
    path: "/blog",
    seo: { title: "Blog — studio, live-sound and AV advice from working engineers", description: "Buying guides, acoustics explainers and setup advice written by the OceanIndia engineering team. No fluff, no affiliate links." },
    hero: { eyebrow: "The journal", title: "Notes from **the console.**", description: "Short, practical articles on choosing gear and fixing rooms — written by the people who install them." },
    sections: [],
    lists: [],
    paragraphs: [],
    images: [],
    faqs: [],
  },
  {
    slug: "contact",
    label: "Contact",
    path: "/contact",
    seo: { title: "Contact OceanIndia — call, WhatsApp or visit the Bengaluru experience centre", description: "Reach OceanIndia on {phone}, WhatsApp or email, or visit our experience centre in {city}. {hours}." },
    hero: { eyebrow: "Contact", title: "Talk to an engineer, **not a bot.**", description: "Product questions, project enquiries, demos, service — one team handles all of it. Pick whichever channel you prefer." },
    sections: [
      { key: "form", title: "Send a message" },
      { key: "visit", eyebrow: "Visit", title: "Experience centre" },
      { key: "faq", eyebrow: "FAQ", title: "Before you write, **quick answers.**", description: "Can't find yours? WhatsApp us — a human answers." },
    ],
    lists: [],
    paragraphs: [
      { key: "whatsapp-note", text: "Fastest — replies in minutes" },
      { key: "visit-note", text: "Demos of monitors, microphones and headphones by appointment. Street parking available; metro two minutes away." },
    ],
    images: [{ key: "storefront", src: "/images/contact/storefront.webp", alt: "OceanIndia experience centre storefront", label: "Storefront photo" }],
    faqs: [],
  },
  {
    slug: "quote",
    label: "Get a quote",
    path: "/quote",
    seo: { title: "Get a quote — product pricing or a room proposal", description: "Request a firm price on any product, or a design-and-install proposal for a studio, theatre, auditorium or AV room. Engineers reply within working hours." },
    hero: { eyebrow: "Get a quote", title: "Tell us what you need. **We’ll price it properly.**", description: "A firm price on any product, or a full proposal for a room — from a single engineer-led team." },
    sections: [
      { key: "product-hero", title: "Price for **{product}**", description: "Pro-line pricing moves with stock and exchange rates, so we quote firm and fast. Fill in the form and we’ll reply with price, lead time and alternatives if useful." },
      { key: "next", eyebrow: "What happens next", title: "" },
      { key: "talk", title: "Prefer to talk?" },
    ],
    lists: [
      {
        key: "steps",
        label: "What happens next",
        items: [
          { title: "You send the brief", text: "Products you want, or the room, use and budget range. Photos and dimensions help." },
          { title: "We reply within hours", text: "Product quotes the same working day. Project proposals in 2–5 days with drawings." },
          { title: "We talk it through", text: "A short call to confirm fit, options and timeline. No pressure, no lock-in." },
        ],
      },
    ],
    paragraphs: [],
    images: [],
    faqs: [],
  },
  {
    slug: "bulk-orders",
    label: "Bulk orders",
    path: "/bulk-orders",
    seo: { title: "Bulk & institutional orders — tiered pricing, GST invoicing, pan-India delivery", description: "Volume pricing for schools, colleges, studios, event companies, corporates and resellers. Dedicated account manager, GST invoicing, consolidated shipping and installation support." },
    hero: { eyebrow: "Bulk & institutional", title: "Buying for a campus, **a fleet or a chain?**", description: "One engineer-led team for specification, pricing, paperwork, delivery and installation — at volume rates that reflect the order." },
    sections: [
      { key: "who", eyebrow: "Who we supply", title: "Built for buyers who **answer to someone.**" },
      { key: "perks", eyebrow: "What you get", title: "More than **a discount.**" },
      { key: "faq", eyebrow: "Bulk FAQ", title: "Procurement **questions.**" },
    ],
    lists: [
      {
        key: "tiers",
        label: "Pricing tiers (range in meta)",
        items: [
          { meta: "₹2 – 5 lakh", title: "Volume pricing", text: "Discounted rates on multi-unit orders and bundles." },
          { meta: "₹5 – 20 lakh", title: "Account manager", text: "A named engineer for specification, quotes and delivery." },
          { meta: "₹20 lakh +", title: "Project pricing", text: "Tender-ready documentation, staged delivery, on-site commissioning." },
        ],
      },
      {
        key: "who",
        label: "Who we supply",
        items: [
          { title: "Schools & universities", text: "Classrooms, labs, auditoriums and music departments." },
          { title: "Corporates & campuses", text: "Meeting rooms, town halls, training rooms, signage." },
          { title: "Studios & event companies", text: "Microphones, wireless, consoles and PA fleets." },
          { title: "Resellers & integrators", text: "Trade pricing on {brands}+ authorised brands." },
        ],
      },
      {
        key: "perks",
        label: "What you get",
        items: [
          { title: "Tiered pricing", text: "Better rates as volume grows, with transparent line items." },
          { title: "GST & tender paperwork", text: "Tax invoices, proforma, authorisation letters and compliance docs." },
          { title: "Consolidated delivery", text: "Single insured shipment or staged deliveries to multiple sites." },
          { title: "Install & AMC", text: "Commissioning, training and annual maintenance contracts." },
        ],
      },
    ],
    paragraphs: [],
    images: [],
    faqs: [
      { q: "What is the minimum for bulk pricing?", a: "Volume pricing starts around ₹2 lakh per order or ten-plus units of the same product. Below that, our regular store prices already include GST and free shipping." },
      { q: "Can you supply against a purchase order?", a: "Yes, for institutions and registered companies. We provide a proforma, accept PO terms and ship against advance or agreed credit terms." },
      { q: "Do you participate in tenders?", a: "Yes. We provide manufacturer authorisation letters, technical compliance statements and demo units where required." },
      { q: "Can you deliver outside Karnataka?", a: "We deliver and install across India. Outstation installs are quoted with travel included; many classroom and conference deployments are done through trained partner teams." },
    ],
  },
  {
    slug: "wishlist",
    label: "Wishlist",
    path: "/wishlist",
    seo: { title: "Wishlist", description: "Products you have saved on OceanIndia." },
    hero: { eyebrow: "Saved", title: "Your **wishlist.**", description: "Saved on this device. Share a screenshot with us on WhatsApp and we’ll price the lot." },
    sections: [], lists: [], paragraphs: [], images: [], faqs: [],
  },
  {
    slug: "track-order",
    label: "Track order",
    path: "/track-order",
    seo: { title: "Track your order", description: "Check the status of your OceanIndia order with your order ID and mobile number." },
    hero: { eyebrow: "Orders", title: "Where is **my gear?**", description: "Enter your order ID and the mobile number used at checkout." },
    sections: [], lists: [], paragraphs: [], images: [], faqs: [],
  },
  {
    slug: "cart",
    label: "Cart",
    path: "/cart",
    seo: { title: "Cart", description: "Your OceanIndia cart." },
    hero: { eyebrow: "Cart", title: "Your **cart.**" },
    sections: [], lists: [], paragraphs: [], images: [], faqs: [],
  },
  {
    slug: "checkout",
    label: "Checkout",
    path: "/checkout",
    seo: { title: "Checkout", description: "Secure checkout for your OceanIndia order." },
    hero: { eyebrow: "Secure checkout", title: "Almost **there.**", description: "Contact, delivery and payment. GST invoice available." },
    sections: [], lists: [], paragraphs: [], images: [], faqs: [],
  },
  {
    slug: "not-found",
    label: "404 page",
    path: "/404",
    seo: { title: "Page not found", description: "" },
    hero: { eyebrow: "404", title: "Lost at sea.", description: "That page drifted away or never existed. The store, solutions and contact pages are still right where you left them.", primaryCta: { label: "Back to home", href: "/" }, secondaryCta: { label: "Browse the store", href: "/store" } },
    sections: [], lists: [], paragraphs: [], images: [], faqs: [],
  },
];

export const getPageDefault = (slug: string) => pages.find((p) => p.slug === slug);
