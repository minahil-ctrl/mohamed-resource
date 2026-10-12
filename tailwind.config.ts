import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        shell: "#0F172A",
        // Accent colours are driven by animated CSS custom properties (see globals.css)
        accent: "rgb(var(--ar) var(--ag) var(--ab) / <alpha-value>)",
        soft: "rgb(var(--sr) var(--sg) var(--sb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--ar) var(--ag) var(--ab) / 0.35), 0 10px 50px -10px rgb(var(--ar) var(--ag) var(--ab) / 0.45)",
        lift: "0 20px 60px -25px rgba(0,0,0,0.8)",
      },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pulseRing: { "0%": { transform: "scale(1)", opacity: "0.6" }, "100%": { transform: "scale(2.2)", opacity: "0" } },
        sheen: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      animation: {
        rise: "rise .55s cubic-bezier(.2,.7,.2,1) both",
        pulseRing: "pulseRing 2s ease-out infinite",
        sheen: "sheen 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
