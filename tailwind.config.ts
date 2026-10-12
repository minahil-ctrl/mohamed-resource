import type { Config } from "tailwindcss";

/**
 * Theme tokens flip between light and dark through CSS variables (see globals.css).
 *  white  -> "ink": the main text / line colour (Midnight Mirage in light, Praxeti White in dark)
 *  canvas -> page background
 */
const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "rgb(var(--ink) / <alpha-value>)",
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        slate: {
          100: "rgb(var(--ink) / 1)",
          200: "rgb(var(--ink) / 0.9)",
          300: "rgb(var(--ink) / 0.78)",
          400: "rgb(var(--ink) / 0.64)",
          500: "rgb(var(--ink) / 0.52)",
          600: "rgb(var(--ink) / 0.4)",
          700: "rgb(var(--ink) / 0.28)",
        },
        // fixed palette
        shell: "#001F3F", // Midnight Mirage
        paper: "#F6F7ED", // Praxeti White
        nuit: "#1E488F", // Nuit Blanche
        lime: "#DBE64C", // First Colors of Spring (fills)
        "lime-ink": "rgb(var(--lime-ink) / <alpha-value>)", // lime used as text / lines (darkened in light mode)
        accent: "rgb(var(--ar) var(--ag) var(--ab) / <alpha-value>)", // Mantis
        "accent-ink": "rgb(var(--accent-ink) / <alpha-value>)", // green text (Picture Book Green in light)
        soft: "rgb(var(--sr) var(--sg) var(--sb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "var(--font-sans)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-sans)", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--ar) var(--ag) var(--ab) / 0.3), 0 8px 30px -12px rgb(var(--ar) var(--ag) var(--ab) / 0.25)",
        lift: "0 20px 60px -25px rgba(0,0,0,0.5)",
      },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pulseRing: { "0%": { transform: "scale(1)", opacity: "0.6" }, "100%": { transform: "scale(2.2)", opacity: "0" } },
      },
      animation: {
        rise: "rise .55s cubic-bezier(.2,.7,.2,1) both",
        pulseRing: "pulseRing 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
