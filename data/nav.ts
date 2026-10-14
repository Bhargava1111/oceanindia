export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href?: string; columns?: { title: string; links: NavLink[] }[]; featured?: NavLink };

export const mainNav: NavGroup[] = [
  {
    label: "Store",
    href: "/store",
    columns: [
      {
        title: "Studio & Recording",
        links: [
          { label: "Microphones", href: "/store/microphones" },
          { label: "Audio Interfaces", href: "/store/audio-interfaces" },
          { label: "Studio Monitors", href: "/store/studio-monitors" },
          { label: "Preamps & Channel Strips", href: "/store/preamps-channel-strips" },
          { label: "Mixers & Consoles", href: "/store/mixers-consoles" },
          { label: "Signal Processors", href: "/store/signal-processors" },
        ],
      },
      {
        title: "Live, DJ & Listening",
        links: [
          { label: "PA & Live Sound", href: "/store/live-sound" },
          { label: "Headphones", href: "/store/headphones" },
          { label: "DJ Gear", href: "/store/dj-gear" },
          { label: "Acoustic Treatment", href: "/store/acoustic-treatment" },
          { label: "Software & DAWs", href: "/store/software" },
        ],
      },
      {
        title: "Instruments & More",
        links: [
          { label: "Musical Instruments", href: "/store/musical-instruments" },
          { label: "Accessories & Stands", href: "/store/accessories" },
          { label: "Combo Offers", href: "/store/combo-offers" },
          { label: "Special Offers", href: "/store/special-offers" },
          { label: "Pre-owned Gear", href: "/store/pre-owned" },
        ],
      },
    ],
    featured: { label: "Browse all 1,800+ products", href: "/store", description: "Filter by brand, price and category." },
  },
  {
    label: "Solutions",
    href: "/solutions",
    columns: [
      {
        title: "Create",
        links: [
          { label: "Recording Studios", href: "/solutions/recording-studio" },
          { label: "Podcast Studios", href: "/solutions/podcast-studio" },
          { label: "Dolby Atmos Rooms", href: "/solutions/atmos-studio" },
          { label: "Shooting Floors", href: "/solutions/shooting-floor" },
        ],
      },
      {
        title: "Gather",
        links: [
          { label: "Auditoriums", href: "/solutions/auditorium" },
          { label: "Conference Rooms", href: "/solutions/conference-room" },
          { label: "Smart Classrooms", href: "/solutions/smart-classroom" },
          { label: "LED Walls & Signage", href: "/solutions/led-wall-signage" },
        ],
      },
      {
        title: "Experience",
        links: [
          { label: "Home Theatres", href: "/solutions/home-theatre" },
          { label: "Pubs, Bars & Clubs", href: "/solutions/pub-club" },
          { label: "Gyms & Studios", href: "/solutions/gym" },
          { label: "Acoustic Treatment", href: "/solutions/acoustic-treatment" },
        ],
      },
    ],
    featured: { label: "All 15 solutions", href: "/solutions", description: "Design, supply, install, calibrate." },
  },
  { label: "Brands", href: "/brands" },
  { label: "Projects", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  shop: [
    { label: "All products", href: "/store" },
    { label: "Microphones", href: "/store/microphones" },
    { label: "Studio monitors", href: "/store/studio-monitors" },
    { label: "Audio interfaces", href: "/store/audio-interfaces" },
    { label: "Live sound", href: "/store/live-sound" },
    { label: "Combo offers", href: "/store/combo-offers" },
    { label: "Pre-owned gear", href: "/store/pre-owned" },
  ],
  solutions: [
    { label: "Recording studios", href: "/solutions/recording-studio" },
    { label: "Home theatres", href: "/solutions/home-theatre" },
    { label: "Auditoriums", href: "/solutions/auditorium" },
    { label: "Podcast studios", href: "/solutions/podcast-studio" },
    { label: "Acoustic treatment", href: "/solutions/acoustic-treatment" },
    { label: "Get a quote", href: "/quote" },
  ],
  company: [
    { label: "About OceanIndia", href: "/about" },
    { label: "Brands we carry", href: "/brands" },
    { label: "Project gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Track order", href: "/track-order" },
  ],
  legal: [
    { label: "Privacy policy", href: "/legal/privacy" },
    { label: "Terms of service", href: "/legal/terms" },
    { label: "Shipping & returns", href: "/legal/shipping-returns" },
  ],
};
