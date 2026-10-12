import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/shell/AppShell";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Montserrat({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Edexcel IGCSE Business · 10-Day Sprint",
  description:
    "Revision portal for Pearson Edexcel IGCSE Business (4BS1): a cheat sheet and full notes for every topic, topic quizzes, mock exams and past papers.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/** Runs before first paint: light by default; dark if chosen, or if "auto" and the system is dark. */
const THEME_SCRIPT = `(function(){try{var m=localStorage.getItem('qb.theme')||'light';var d=m==='dark'||(m==='auto'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
