"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#050B1A", color: "#F1F5F9", fontFamily: "sans-serif" }}>
        <main style={{ textAlign: "center", padding: 24 }}>
          <p style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#22D3EE", fontSize: 12 }}>OceanIndia</p>
          <h1 style={{ fontSize: 32, margin: "12px 0" }}>The site hit an error.</h1>
          <p style={{ color: "#94A3B8", maxWidth: 420 }}>{error.message || "Please try again."}</p>
          <button onClick={reset} style={{ marginTop: 24, border: 0, borderRadius: 999, background: "#22D3EE", color: "#050B1A", padding: "10px 20px", fontWeight: 700 }}>Try again</button>
        </main>
      </body>
    </html>
  );
}
