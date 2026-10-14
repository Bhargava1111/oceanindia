import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Edge OG image uses the built-in site defaults (the OG renderer cannot read the CMS files). */
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #050B1A 0%, #0A1A3A 60%, #1b1540 100%)", color: "#F1F5F9", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", right: -120, top: -120, width: 520, height: 520, borderRadius: 999, background: "radial-gradient(circle, rgba(34,211,238,0.45), transparent 65%)" }} />
        <div style={{ position: "absolute", left: -80, bottom: -200, width: 600, height: 600, borderRadius: 999, background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 65%)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, border: "3px solid #22D3EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, color: "#22D3EE" }}>≈</div>
          <div style={{ fontSize: 44, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>{site.tagline}</div>
          <div style={{ fontSize: 26, color: "#94A3B8" }}>{site.brandsCount}+ brands · {site.productsCount.toLocaleString("en-IN")}+ products · {site.contact.address.city}</div>
        </div>
      </div>
    ),
    size,
  );
}
