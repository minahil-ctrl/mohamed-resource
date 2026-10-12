"use client";
import Navbar from "./Navbar";
import { MarksProvider } from "@/lib/marks";
import { DISCLAIMER, STUDENT_NAME } from "@/lib/config";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MarksProvider>
      <div className="relative min-h-screen">
        <div className="atmosphere no-print" aria-hidden />
        <Navbar />
        <main className="relative z-10 pt-6">{children}</main>
        <footer className="relative z-10 mt-24 border-t border-white/10 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-xs leading-relaxed text-white/55 sm:px-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl">{DISCLAIMER}</p>
            <p className="num text-white/40">Prepared for {STUDENT_NAME} · Pearson Edexcel IGCSE Business (4BS1)</p>
          </div>
        </footer>
      </div>
    </MarksProvider>
  );
}
