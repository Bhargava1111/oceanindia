/**
 * Global site facts for OceanIndia.
 * Replace the placeholder contact values with your real details — everything
 * (header, footer, WhatsApp button, JSON-LD, contact page) reads from here.
 */
export type Site = {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  foundedYear: number;
  yearsExperience: number;
  brandsCount: number;
  productsCount: number;
  projectsCount: number;
  locale: string;
  announcement: string;
  contact: {
    phonePrimary: string;
    phoneSecondary: string;
    whatsapp: string;
    email: string;
    hours: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      landmark: string;
      mapsUrl: string;
      geo: { lat: number; lng: number };
    };
  };
  social: { instagram: string; facebook: string; youtube: string; linkedin: string };
  policies: {
    returnWindowDays: number;
    refundDays: string;
    dispatchDays: number;
    shippingCharge: number;
    codAvailable: boolean;
    gstCaptured: boolean;
  };
  bank: { accountName: string; accountNumber: string; ifsc: string; bankName: string; upi: string };
};

export const site: Site = {
  name: "OceanIndia",
  legalName: "OceanIndia Pro Audio & AV",
  tagline: "Pro audio & AV, engineered for 2030.",
  description:
    "OceanIndia supplies professional audio, studio, live-sound and musical-instrument gear from 90+ brands, and designs turnkey AV spaces — recording studios, home theatres, auditoriums and podcast rooms — across India.",
  url: "https://oceanindia.in", // TODO: your production domain
  foundedYear: 2010,
  yearsExperience: 15,
  brandsCount: 90,
  productsCount: 1800,
  projectsCount: 400,
  locale: "en_IN",
  announcement: "Free insured shipping across India on in-stock orders · Dispatch in 2 business days",
  contact: {
    // TODO: replace placeholders
    phonePrimary: "+91 90000 00000",
    phoneSecondary: "+91 90000 00001",
    whatsapp: "919000000000", // digits only, with country code
    email: "hello@oceanindia.in",
    hours: "Mon – Sat, 10:00 – 19:30 IST",
    address: {
      line1: "1st Floor, OceanIndia Experience Centre",
      line2: "Rajajinagar",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560021",
      country: "IN",
      landmark: "Near Mahakavi Kuvempu Metro Station",
      mapsUrl: "https://maps.google.com/?q=12.998173,77.557763",
      geo: { lat: 12.998173, lng: 77.557763 },
    },
  },
  social: {
    instagram: "https://instagram.com/oceanindia", // TODO
    facebook: "https://facebook.com/oceanindia", // TODO
    youtube: "https://youtube.com/@oceanindia", // TODO
    linkedin: "https://linkedin.com/company/oceanindia", // TODO
  },
  policies: {
    returnWindowDays: 7,
    refundDays: "7–10 business days",
    dispatchDays: 2,
    shippingCharge: 0,
    codAvailable: false,
    gstCaptured: true,
  },
  bank: {
    // TODO: shown to customers who choose bank transfer at checkout
    accountName: "OceanIndia Pro Audio & AV",
    accountNumber: "XXXX XXXX XXXX",
    ifsc: "XXXX0000000",
    bankName: "Your bank, Bengaluru",
    upi: "oceanindia@upi",
  },
};
