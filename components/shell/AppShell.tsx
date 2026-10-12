"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { accentVars, HOME_ACCENT, unitBySlug } from "@/lib/units";
import { DISCLAIMER, STUDENT_NAME } from "@/lib/config";

function scopeFor(path: string) {
  const m = path.match(/^\/module-[12]\/([^/?#]+)/);
  if (m) {
    const u = unitBySlug(m[1]);
    if (u) return accentVars(u.rgb, u.soft);
  }
  return accentVars(HOME_ACCENT.rgb, HOME_ACCENT.soft);
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  return (
    <div className="accent-scope relative min-h-screen" style={scopeFor(pathname) as React.CSSProperties}>
      <div className="atmosphere no-print" aria-hidden />
      <Navbar />
      <main className="relative z-10 pt-6">{children}</main>
      <footer className="relative z-10 mt-24 border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-xs leading-relaxed text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl">{DISCLAIMER}</p>
          <p className="num text-slate-500">Prepared for {STUDENT_NAME} · Pearson Edexcel IGCSE Business (4BS1)</p>
        </div>
      </footer>
    </div>
  );
}
