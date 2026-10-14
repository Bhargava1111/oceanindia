export type LandingPage = {
  slug: string;
  layout: "countdown" | "split" | "enterprise" | "starter" | "festival" | "whatsapp" | "product" | "comparison";
  accent: "aqua" | "teal" | "violet" | "amber" | "rose" | "emerald";
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  cta: string;
  secondaryCta?: { label: string; href: string };
  offerEndsAt?: string; // ISO date for countdown layouts
  benefits: { title: string; text: string }[];
  proof: { stat: string; label: string }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  productSlug?: string;
  comparison?: { label: string; us: string; them: string }[];
  interestOptions: string[];
};

export const landingPages: LandingPage[] = [
  {
    slug: "launch-offer",
    layout: "countdown",
    accent: "aqua",
    title: "OceanIndia launch offer",
    metaTitle: "Launch Offer — Up to 25% off studio essentials",
    metaDescription: "Celebrate the OceanIndia launch with limited-time pricing on microphones, monitors and interfaces. Free shipping, GST invoice, authorised warranty.",
    eyebrow: "Launch week",
    headline: "The tide's in. Up to 25% off studio essentials.",
    subheadline: "Microphones, monitors, interfaces and headphones from AKG, beyerdynamic, Audio-Technica and more — at launch pricing, with free insured shipping and full India warranty.",
    cta: "Claim my launch price",
    secondaryCta: { label: "See all offers", href: "/store/special-offers" },
    offerEndsAt: new Date(Date.now() + 9 * 24 * 3600 * 1000).toISOString(),
    benefits: [
      { title: "Authorised, not grey", text: "Every unit comes with the manufacturer's India warranty and our service support." },
      { title: "Ships in 2 days", text: "In-stock items dispatch within two business days with insured tracking." },
      { title: "GST invoice", text: "Claim input credit — add your GSTIN at checkout." },
      { title: "Expert matching", text: "Not sure it fits your room or chain? Ask an engineer before you buy." },
    ],
    proof: [{ stat: "90+", label: "Authorised brands" }, { stat: "1,800+", label: "Products in stock" }, { stat: "15 yrs", label: "At the console" }],
    steps: [
      { title: "Pick your gear", text: "Browse launch-priced products or tell us what you're building." },
      { title: "Lock the price", text: "Add to cart or send the form — launch pricing is honoured for 48 hours after enquiry." },
      { title: "Unbox in days", text: "Insured dispatch within two business days, with setup help on WhatsApp." },
    ],
    faqs: [
      { q: "Is launch pricing available on price-on-request items?", a: "Yes — send the enquiry form and we'll quote with the launch discount applied." },
      { q: "Can I combine the launch offer with EMI?", a: "Yes, EMI through our payment gateway applies to discounted prices too." },
      { q: "What happens when the timer ends?", a: "Prices return to regular. Enquiries sent before the deadline are honoured for 48 hours." },
    ],
    interestOptions: ["Microphones", "Studio monitors", "Audio interfaces", "Headphones", "Something else"],
  },
  {
    slug: "free-consultation",
    layout: "split",
    accent: "teal",
    title: "Free AV consultation",
    metaTitle: "Free 30-minute AV consultation with an engineer",
    metaDescription: "Book a free 30-minute call with an OceanIndia AV engineer. Studio, home theatre, auditorium or podcast room — get a plan and a budget range, no obligation.",
    eyebrow: "Free consultation",
    headline: "Thirty minutes with an engineer. Zero sales pitch.",
    subheadline: "Tell us about the room and the goal. We'll come back with a realistic plan, a budget range and the three decisions that matter most — free, whether or not you buy from us.",
    cta: "Book my free call",
    benefits: [
      { title: "Room-first thinking", text: "We ask about dimensions, noise and use before we ever mention a product." },
      { title: "Budget honesty", text: "You'll leave with a realistic range and where to spend versus save." },
      { title: "Brand neutral", text: "90+ brands means we recommend what fits, not what's on promotion." },
      { title: "Written summary", text: "A one-page recap with next steps lands in your inbox after the call." },
    ],
    proof: [{ stat: "400+", label: "Rooms designed" }, { stat: "4.9/5", label: "Client rating" }, { stat: "24 h", label: "To schedule" }],
    steps: [
      { title: "Send the form", text: "Share the space, the goal and a photo or floor plan if you have one." },
      { title: "Pick a slot", text: "We confirm a 30-minute video or phone call within one working day." },
      { title: "Get the plan", text: "A written summary with options, budget range and timeline." },
    ],
    faqs: [
      { q: "Is it really free?", a: "Yes. The first 30-minute consultation and written summary are free. Detailed acoustic design and drawings are quoted separately." },
      { q: "Do you consult outside Bengaluru?", a: "Yes — most consultations are on video, and we deliver projects across India." },
      { q: "What should I prepare?", a: "Room dimensions, a few photos, your use case and a rough budget if you have one." },
    ],
    interestOptions: ["Recording studio", "Home theatre", "Podcast room", "Auditorium / hall", "Office / conference", "Restaurant / club", "Other"],
  },
  {
    slug: "bulk-orders",
    layout: "enterprise",
    accent: "violet",
    title: "Bulk & institutional orders",
    metaTitle: "Bulk & Enterprise Orders — Institutions, studios, integrators",
    metaDescription: "Tiered pricing, GST invoicing, staged delivery and dedicated account management for schools, universities, corporates, broadcasters and integrators.",
    eyebrow: "Enterprise & institutions",
    headline: "Outfit forty classrooms or one broadcast floor. Same care.",
    subheadline: "Tiered pricing across 90+ brands, consolidated GST invoicing, staged delivery to multiple sites and a named account manager who answers the phone.",
    cta: "Request a bulk quote",
    secondaryCta: { label: "Talk to sales", href: "/contact" },
    benefits: [
      { title: "Tiered pricing", text: "Volume breaks across brands, consolidated into one quote." },
      { title: "Multi-site delivery", text: "Staged shipments to campuses and branches, tracked per location." },
      { title: "Procurement-ready", text: "Proforma invoices, vendor registration, GeM and tender documentation." },
      { title: "Install & AMC", text: "Optional installation, training and annual maintenance contracts." },
    ],
    proof: [{ stat: "250+", label: "Institutional clients" }, { stat: "₹50 Cr+", label: "Equipment delivered" }, { stat: "1", label: "Account manager per client" }],
    steps: [
      { title: "Share the requirement", text: "A BOQ, a tender, or just a description of rooms and headcount." },
      { title: "Receive a consolidated quote", text: "Brand-wise pricing, lead times and delivery plan within two working days." },
      { title: "Deliver and support", text: "Staged dispatch, installation if required, and warranty coordination." },
    ],
    faqs: [
      { q: "What is the minimum order for bulk pricing?", a: "Tiered pricing typically starts at ₹2 lakh or 10 units of a line item, whichever comes first." },
      { q: "Do you register as a vendor?", a: "Yes. We complete vendor onboarding, supply bank and GST documents, and support GeM and tender processes." },
      { q: "Can you handle installation across cities?", a: "Yes, through our in-house team and certified partner integrators." },
    ],
    interestOptions: ["Education", "Corporate", "Broadcast / media", "Hospitality", "Government / PSU", "Reseller / integrator"],
  },
  {
    slug: "first-studio",
    layout: "starter",
    accent: "emerald",
    title: "Your first studio",
    metaTitle: "Build Your First Studio — Starter bundles from ₹17,400",
    metaDescription: "New to recording? Matched starter bundles — interface, mic, headphones, monitors and software — chosen by engineers, with setup help included.",
    eyebrow: "New here?",
    headline: "Your first studio, minus the guesswork.",
    subheadline: "Starter bundles matched by engineers, from ₹17,400. Everything works together out of the box, and we stay on WhatsApp until your first recording is done.",
    cta: "Help me choose a bundle",
    secondaryCta: { label: "See combo offers", href: "/store/combo-offers" },
    benefits: [
      { title: "Matched, not random", text: "Interface, mic, monitors and software that actually suit each other." },
      { title: "Setup on WhatsApp", text: "Screen-share or video call until your DAW sees your interface." },
      { title: "Upgrade path", text: "Buy a bundle now, trade in later — we'll credit your starter gear." },
      { title: "Student pricing", text: "Valid ID gets you extra savings on Steinberg and PreSonus bundles." },
    ],
    proof: [{ stat: "₹17,400", label: "Starter bundle from" }, { stat: "2 days", label: "To dispatch" }, { stat: "1,000+", label: "First studios set up" }],
    steps: [
      { title: "Tell us what you make", text: "Vocals, podcast, beats, band — and your budget." },
      { title: "Get two options", text: "A lean bundle and a stretch bundle, with honest trade-offs." },
      { title: "Record this week", text: "Dispatch in two days, setup help included." },
    ],
    faqs: [
      { q: "Do I need acoustic treatment first?", a: "For vocals, a reflection filter and a thick curtain go a long way. We'll tell you when treatment matters more than gear." },
      { q: "Mac or Windows?", a: "Everything we bundle works on both. We'll check your laptop's ports before you order." },
      { q: "Can I pay in EMI?", a: "Yes — EMI options appear at checkout." },
    ],
    interestOptions: ["Vocals / singer-songwriter", "Podcast / voice-over", "Beats / electronic", "Band / multi-track", "Not sure yet"],
  },
  {
    slug: "festival-sale",
    layout: "festival",
    accent: "amber",
    title: "Festival sale",
    metaTitle: "Festival Sale — Lights on, prices down",
    metaDescription: "Festive-season pricing on home theatres, PA systems, instruments and studio gear. EMI available, free shipping, dispatch before the celebrations.",
    eyebrow: "Festive season",
    headline: "Lights on. Prices down.",
    subheadline: "Festive pricing on home theatres, portable PA, pianos, MIDI controllers and studio bundles — with EMI, free shipping and dispatch before the celebrations begin.",
    cta: "Send me the festive price list",
    secondaryCta: { label: "Shop offers", href: "/store/special-offers" },
    offerEndsAt: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
    benefits: [
      { title: "Home theatre packages", text: "Projector, screen, Atmos speakers and calibration, bundled." },
      { title: "Gifts that play", text: "Digital pianos, ukuleles and MIDI controllers with free stands." },
      { title: "Party-ready PA", text: "Portable systems with wireless mics for homes and societies." },
      { title: "No-cost EMI", text: "On select brands through our payment partner." },
    ],
    proof: [{ stat: "Up to 30%", label: "Off MRP" }, { stat: "Free", label: "Insured shipping" }, { stat: "EMI", label: "On most items" }],
    steps: [
      { title: "Tell us the occasion", text: "Gift, party, home upgrade or studio — and a budget." },
      { title: "Get a curated list", text: "Three options at your budget with festive pricing applied." },
      { title: "Delivered in time", text: "Dispatch in two business days; installation slots for theatres." },
    ],
    faqs: [
      { q: "Will it arrive before the festival?", a: "In-stock items dispatch within two business days. We'll confirm delivery dates before you pay." },
      { q: "Do festive prices apply to installations?", a: "Yes — home theatre packages include festive pricing on equipment and standard installation." },
      { q: "Is gift wrapping available?", a: "For instruments and headphones, yes — ask when you order." },
    ],
    interestOptions: ["Home theatre", "Instruments & gifts", "Portable PA", "Studio gear", "Headphones"],
  },
  {
    slug: "whatsapp-quote",
    layout: "whatsapp",
    accent: "emerald",
    title: "WhatsApp quick quote",
    metaTitle: "Quick Quote on WhatsApp — Reply in minutes",
    metaDescription: "Send a product name or a photo of your room on WhatsApp and get a firm quote from an OceanIndia engineer, usually within minutes on working days.",
    eyebrow: "Fastest way to a price",
    headline: "Type it. Send it. Priced in minutes.",
    subheadline: "Send a product name, a screenshot, or a photo of your room on WhatsApp. A real engineer replies with a firm price, stock and lead time — no bots, no callbacks.",
    cta: "Open WhatsApp",
    benefits: [
      { title: "Real engineers", text: "The person quoting has used the gear." },
      { title: "Firm prices", text: "Incl. GST and shipping — what you see is what you pay." },
      { title: "Photos welcome", text: "Send your room or your rack; we'll suggest what fits." },
      { title: "Pay from chat", text: "Secure payment link or GST invoice sent in the same thread." },
    ],
    proof: [{ stat: "< 15 min", label: "Median reply time" }, { stat: "Mon–Sat", label: "10:00 – 19:30" }, { stat: "4.9/5", label: "Chat rating" }],
    steps: [
      { title: "Tap the button", text: "WhatsApp opens with a pre-filled message." },
      { title: "Describe or snap", text: "Product name, screenshot or room photo." },
      { title: "Get the quote", text: "Price, stock, lead time and a payment link if you're ready." },
    ],
    faqs: [
      { q: "Can I negotiate on WhatsApp?", a: "For bundles and bulk, yes. Single items are already at our best price." },
      { q: "Is my number used for marketing?", a: "No. We only message about your enquiry unless you opt in." },
      { q: "What if I message after hours?", a: "You'll get a reply first thing the next working morning." },
    ],
    interestOptions: ["Product quote", "Room setup advice", "Bulk order", "Service / support"],
  },
  {
    slug: "studio-monitors",
    layout: "product",
    accent: "violet",
    title: "ADAM Audio A7V",
    metaTitle: "ADAM Audio A7V — Hear what's actually in the mix",
    metaDescription: "The ADAM Audio A7V nearfield monitor with X-ART tweeter and DSP room adaptation. Demo in Bengaluru or get a quote with calibration advice.",
    eyebrow: "Product spotlight",
    headline: "Hear what's actually in the mix.",
    subheadline: "ADAM Audio's A7V pairs the X-ART ribbon tweeter with a 7-inch woofer and DSP voicing that adapts to your room. Audition it in our Bengaluru centre or get a quote with placement advice.",
    cta: "Get a quote on the A7V",
    secondaryCta: { label: "Book a demo", href: "/contact" },
    productSlug: "adam-audio-a7v",
    benefits: [
      { title: "X-ART tweeter", text: "Air-moving ribbon design with effortless, undistorted highs." },
      { title: "DSP room adaptation", text: "Six voicings plus native Sonarworks SoundID integration." },
      { title: "Rotatable waveguide", text: "Use horizontally or vertically without losing imaging." },
      { title: "5-year warranty", text: "Extended coverage on registration with ADAM Audio." },
    ],
    proof: [{ stat: "7\"", label: "MLM woofer" }, { stat: "130 W", label: "LF amplification" }, { stat: "96 kHz", label: "DSP resolution" }],
    steps: [
      { title: "Tell us the room", text: "Dimensions and desk position help us advise on placement and subs." },
      { title: "Get price and stock", text: "Firm quote with optional stands, isolation and calibration." },
      { title: "Set up right", text: "We walk you through voicing and SoundID on a call." },
    ],
    faqs: [
      { q: "A7V or A77H?", a: "A7V for desks up to 2 m wide and nearfield listening; A77H for wider rooms and midfield distances." },
      { q: "Do I need a subwoofer?", a: "Not for most music mixing; add a Sub10 or Sub15 for film, immersive or bass-heavy genres." },
      { q: "Is the price inclusive of GST?", a: "Yes — quotes include GST and free shipping." },
    ],
    interestOptions: ["A7V pair", "A7V + subwoofer", "A77H", "Compare options"],
  },
  {
    slug: "why-oceanindia",
    layout: "comparison",
    accent: "rose",
    title: "Why OceanIndia",
    metaTitle: "OceanIndia vs. marketplaces — Why buy pro audio from specialists",
    metaDescription: "Compare buying pro audio from OceanIndia with marketplaces and grey importers: authorised warranty, engineer advice, GST invoicing, calibration and support.",
    eyebrow: "The honest comparison",
    headline: "Marketplaces sell boxes. We sell results.",
    subheadline: "The same microphone costs about the same everywhere. What differs is whether it's genuine, whether it suits your room, and who picks up the phone when something hums.",
    cta: "Talk to an engineer",
    comparison: [
      { label: "Warranty", us: "Authorised India warranty + service coordination", them: "Often grey import; warranty void or offshore" },
      { label: "Advice", us: "Engineers who've used the gear", them: "Reviews and chatbots" },
      { label: "Invoicing", us: "GST invoice with input credit", them: "Varies by seller" },
      { label: "Setup", us: "WhatsApp / video setup help included", them: "You're on your own" },
      { label: "Room fit", us: "Placement, treatment and calibration advice", them: "Not offered" },
      { label: "Bundles", us: "Matched bundles with real savings", them: "Random 'frequently bought together'" },
      { label: "Returns", us: "7-day return on defects, handled by us", them: "Seller-dependent" },
    ],
    benefits: [
      { title: "Genuine, always", text: "Authorised for every brand we carry." },
      { title: "Engineer on call", text: "Advice before and after the sale." },
      { title: "Price-matched", text: "Found it cheaper from an authorised seller? Tell us." },
      { title: "Projects too", text: "From a mic to a mastering room — one partner." },
    ],
    proof: [{ stat: "15 yrs", label: "In pro audio" }, { stat: "90+", label: "Authorised brands" }, { stat: "4.9/5", label: "Client rating" }],
    steps: [
      { title: "Ask anything", text: "Product, room or budget question — WhatsApp, call or form." },
      { title: "Get a straight answer", text: "Including 'you don't need that yet'." },
      { title: "Buy with backup", text: "Warranty, setup and support from the same people." },
    ],
    faqs: [
      { q: "Do you price-match?", a: "Yes, against any authorised Indian seller's listed price for the same SKU, subject to stock." },
      { q: "How do I know a product is genuine?", a: "Every unit carries the India distributor's warranty card and serial, registered on purchase." },
      { q: "Do you sell on marketplaces too?", a: "Occasionally, but our own store always has better bundles and support." },
    ],
    interestOptions: ["Buying gear", "Planning a room", "Switching from a marketplace", "Just comparing"],
  },
];

export const getLanding = (slug: string) => landingPages.find((l) => l.slug === slug);
