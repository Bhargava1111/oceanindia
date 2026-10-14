import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site as defaultSite } from "@/data/site";
import { getSite } from "@/lib/cms/store";
import { Providers } from "@/components/layout/Providers";
import { SiteProvider } from "@/components/layout/SiteProvider";

const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(site.url || defaultSite.url),
    title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
    description: site.description,
    applicationName: site.name,
    keywords: ["pro audio India", "studio monitors", "microphones", "audio interface", "AV integration Bengaluru", "recording studio design", "home theatre installation", "auditorium sound system"],
    openGraph: { type: "website", siteName: site.name, locale: site.locale, url: site.url, title: `${site.name} — ${site.tagline}`, description: site.description },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    icons: { icon: "/icon.svg" },
  };
}

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#050B1A" }, { media: "(prefers-color-scheme: light)", color: "#F1F5F9" }],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${heading.variable} ${body.variable} dark`}>
      <body className="grain min-h-dvh flex flex-col">
        <Providers>
          <SiteProvider site={site}>{children}</SiteProvider>
        </Providers>
      </body>
    </html>
  );
}
