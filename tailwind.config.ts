import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        abyss: "#050B1A",
        navy: "#0A1A3A",
        aqua: "#22D3EE",
        teal: "#2DD4BF",
        violet: "#8B5CF6",
        foam: "#F1F5F9",
        // semantic tokens driven by CSS variables (dark/light)
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-2": "rgb(var(--bg-2) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.05rem, 9vw, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        display: ["clamp(1.85rem, 6.5vw, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        h1: ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.6rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        h3: ["clamp(1.2rem, 2vw, 1.6rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      borderRadius: { "2xl": "1.25rem", "3xl": "1.75rem", "4xl": "2.5rem" },
      boxShadow: {
        glow: "0 0 0 1px rgb(34 211 238 / 0.25), 0 0 40px -8px rgb(34 211 238 / 0.55)",
        "glow-violet": "0 0 0 1px rgb(139 92 246 / 0.25), 0 0 40px -8px rgb(139 92 246 / 0.55)",
        "glow-teal": "0 0 0 1px rgb(45 212 191 / 0.25), 0 0 40px -8px rgb(45 212 191 / 0.55)",
        glass: "0 8px 32px -12px rgb(0 0 0 / 0.45), inset 0 1px 0 0 rgb(255 255 255 / 0.06)",
      },
      backgroundImage: {
        "mesh-dark":
          "radial-gradient(at 20% 10%, rgb(34 211 238 / 0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(139 92 246 / 0.22) 0px, transparent 50%), radial-gradient(at 50% 90%, rgb(45 212 191 / 0.14) 0px, transparent 55%)",
        "mesh-light":
          "radial-gradient(at 20% 10%, rgb(34 211 238 / 0.22) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(139 92 246 / 0.18) 0px, transparent 50%), radial-gradient(at 50% 90%, rgb(45 212 191 / 0.18) 0px, transparent 55%)",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        shimmer: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        drift: { "0%": { transform: "translate3d(0,0,0) scale(1)" }, "50%": { transform: "translate3d(4%, -3%, 0) scale(1.08)" }, "100%": { transform: "translate3d(0,0,0) scale(1)" } },
        pulseRing: { "0%": { transform: "scale(0.9)", opacity: "0.8" }, "100%": { transform: "scale(1.8)", opacity: "0" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        drift: "drift 18s ease-in-out infinite",
        "pulse-ring": "pulseRing 1.8s cubic-bezier(0.2, 0.6, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
