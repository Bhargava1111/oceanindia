export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMinutes: number;
  category: "Studio" | "Live sound" | "Home theatre" | "Buying guides" | "Acoustics";
  hue: number;
  image?: string;
  author?: string;
  body: { h?: string; p: string }[];
};

export const posts: Post[] = [
  {
    slug: "treat-the-room-before-you-upgrade-the-monitors",
    image: "/images/blog/treat-the-room-before-you-upgrade-the-monitors.webp",
    title: "Treat the room before you upgrade the monitors",
    excerpt: "Why ₹30,000 of absorption usually beats ₹1,00,000 of new speakers, and how to spend it.",
    date: "2026-09-18",
    readMinutes: 6,
    category: "Acoustics",
    hue: 190,
    body: [
      { p: "Every week someone asks us which monitors to buy to fix a mix that 'doesn't translate'. Nine times out of ten the monitors are fine. The room is lying to them." },
      { h: "What an untreated room does", p: "Small rooms have strong modal resonances below 200 Hz — some bass notes boom, others vanish. First reflections from the desk, side walls and ceiling smear the stereo image and shift the midrange. New speakers reproduce those problems more accurately; they don't remove them." },
      { h: "Where the first ₹30,000 goes", p: "Bass traps in the front corners, floor to ceiling. Broadband absorption at the first-reflection points on the side walls and ceiling. A thick rug if the floor is hard. That's it — and it changes more than any speaker swap." },
      { h: "Then measure", p: "A ₹7,000 measurement mic and free software show you what's left. Only then does a monitor upgrade pay off, because you'll finally hear what it does." },
      { p: "If you want us to look at your room, send photos and dimensions on WhatsApp. We'll tell you honestly whether to buy panels or speakers first." },
    ],
  },
  {
    slug: "condenser-vs-dynamic-for-indian-vocals",
    image: "/images/blog/condenser-vs-dynamic-for-indian-vocals.webp",
    title: "Condenser or dynamic? Choosing a vocal mic for Indian voices and rooms",
    excerpt: "Bright condensers flatter some voices and punish others. A practical guide for home and project studios.",
    date: "2026-08-30",
    readMinutes: 7,
    category: "Buying guides",
    hue: 275,
    body: [
      { p: "Most 'best vocal mic' lists assume a treated room and a Western pop voice. Indian classical and film-style vocals have strong upper-mid energy and a lot of ornamentation, and most home studios are small and reflective. That changes the answer." },
      { h: "When a dynamic wins", p: "In an untreated bedroom, a quality dynamic rejects the room and tames sibilance. For powerful singers close to the mic, it stays composed where a bright condenser gets harsh." },
      { h: "When a condenser wins", p: "For breathy, intimate performances or detailed harmonium-and-voice recordings in a treated space, a large-diaphragm condenser captures air and nuance a dynamic can't." },
      { h: "Our shortlist", p: "Under ₹20,000: Aston Origin for a forgiving condenser, or a broadcast dynamic. ₹20,000–₹70,000: Aston Spirit, Audio-Technica AT4033a. Above that, the AKG C414 XLII's nine patterns make it a studio-for-life purchase." },
      { p: "Book a demo at our Bengaluru centre and sing through all of them in one sitting." },
    ],
  },
  {
    slug: "home-theatre-budget-split",
    image: "/images/blog/home-theatre-budget-split.webp",
    title: "How to split a home theatre budget (hint: not 80% on the projector)",
    excerpt: "A realistic allocation across display, speakers, processing, acoustics and calibration for ₹8–40 lakh rooms.",
    date: "2026-08-12",
    readMinutes: 8,
    category: "Home theatre",
    hue: 320,
    body: [
      { p: "The most common home-theatre mistake is a flagship projector in a bright, echoey room with speakers chosen as an afterthought. Here's how we allocate budgets after ninety-plus installs." },
      { h: "The split", p: "Display and screen 30%. Speakers and subwoofers 30%. Processor and amplification 15%. Acoustic treatment and light control 15%. Seating, control and calibration 10%." },
      { h: "Why acoustics gets 15%", p: "Dialogue intelligibility and bass control come from the room. Dark, absorptive side walls also lift perceived contrast more than a brighter projector does." },
      { h: "Why calibration isn't optional", p: "Speaker distances, levels, crossovers and EQ set by ear are wrong more often than not. A measured calibration is the cheapest upgrade in the room." },
      { p: "Planning a theatre? Our free consultation gives you a budget split for your specific room." },
    ],
  },
  {
    slug: "pa-system-sizing-for-halls",
    image: "/images/blog/pa-system-sizing-for-halls.webp",
    title: "Sizing a PA for a school hall or auditorium: a non-technical checklist",
    excerpt: "Seats, ceiling height, speech vs. music and reverberation — the four numbers that decide the system.",
    date: "2026-07-25",
    readMinutes: 5,
    category: "Live sound",
    hue: 150,
    body: [
      { p: "Committees often start with a brand or a wattage. Start with these four numbers instead and any good integrator can size the system properly." },
      { h: "1. Seats and depth", p: "Coverage distance drives speaker type. Under 25 m, point-source boxes work; beyond that, a small line array or delays keep the back rows intelligible." },
      { h: "2. Ceiling height", p: "High ceilings mean flown speakers and more reverberation to fight. Low ceilings favour distributed systems." },
      { h: "3. Speech or music", p: "Speech needs clarity and even coverage; music needs headroom and low end. Most halls need both, which decides subwoofers and processing." },
      { h: "4. Reverberation", p: "If you can clap and hear a ring longer than 1.5 seconds, treatment belongs in the budget before amplifiers." },
      { p: "Send us the four numbers and a few photos; we'll return a system outline and a budget range." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
