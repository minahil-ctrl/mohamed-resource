import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/shell/AppShell";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Montserrat({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Edexcel IGCSE Business · 10-Day Sprint",
  description:
    "Premium 10-day emergency crash course and practice portal for Pearson Edexcel IGCSE Business Studies (4BS1): cheat sheets, interactive graphs, 100 MCQs and a mark-scheme question bank.",
};

export const viewport: Viewport = {
  themeColor: "#001F3F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
