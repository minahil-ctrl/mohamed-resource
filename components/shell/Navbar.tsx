"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardCheck, LayoutDashboard, Printer } from "lucide-react";
import SearchBox from "./SearchBox";
import { SITE_NAME, SITE_SUB } from "@/lib/config";

const LINKS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, match: (p: string) => p === "/" },
  { href: "/module-1", label: "Module 1", sub: "Visual Cheat Sheets", icon: BookOpen, match: (p: string) => p.startsWith("/module-1") || p.startsWith("/booklet") },
  { href: "/module-2", label: "Module 2", sub: "Practice & Exam Bank", icon: ClipboardCheck, match: (p: string) => p.startsWith("/module-2") },
];

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  return (
    <header className="no-print sticky top-0 z-50 border-b border-white/10 bg-shell/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-lg font-extrabold text-shell transition group-hover:scale-105">B</span>
          <span className="leading-tight">
            <span className="block text-[15px] font-bold tracking-tight text-white">{SITE_NAME}</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-lime">{SITE_SUB}</span>
          </span>
        </Link>

        <nav className="order-3 -mx-1 flex w-full items-center gap-1.5 overflow-x-auto no-scrollbar md:order-none md:mx-0 md:ml-6 md:w-auto">
          {LINKS.map((l) => {
            const active = l.match(pathname);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  active ? "bg-accent text-shell" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{l.label}</span>
                {l.sub && <span className={`hidden font-medium lg:inline ${active ? "text-shell/70" : "text-white/50"}`}>· {l.sub}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchBox />
          <Link href="/booklet" className="btn hidden !px-3 sm:inline-flex" title="Print-ready booklet" aria-label="Print-ready booklet">
            <Printer className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
