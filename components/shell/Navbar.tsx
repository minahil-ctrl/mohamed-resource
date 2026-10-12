"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardCheck, Flag, LayoutDashboard, Printer, Store } from "lucide-react";
import SearchBox from "./SearchBox";
import { SITE_NAME, SITE_SUB } from "@/lib/config";

const LINKS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, match: (p: string) => p === "/" },
  { href: "/module-1", label: "Module 1 · Cheat Sheets", short: "Module 1", icon: BookOpen, match: (p: string) => p.startsWith("/module-1") },
  { href: "/module-2", label: "Module 2 · Practice", short: "Module 2", icon: ClipboardCheck, match: (p: string) => p.startsWith("/module-2") },
  { href: "/applications", label: "Application Bank", short: "Applications", icon: Store, match: (p: string) => p.startsWith("/applications") },
  { href: "/traps", label: "Trap Log", icon: Flag, match: (p: string) => p.startsWith("/traps") },
];

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  return (
    <header className="no-print sticky top-0 z-50 border-b border-white/10 bg-shell/80 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-soft/80 font-serif text-lg font-bold text-shell shadow-glow transition group-hover:scale-105">
            B
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-[17px] font-semibold tracking-tight text-white">{SITE_NAME}</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-soft">{SITE_SUB}</span>
          </span>
        </Link>

        <nav className="order-3 -mx-1 flex w-full items-center gap-1 overflow-x-auto no-scrollbar lg:order-none lg:mx-0 lg:ml-6 lg:w-auto">
          {LINKS.map((l) => {
            const active = l.match(pathname);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-accent/15 text-white ring-1 ring-accent/50" : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-soft" : "text-slate-400"}`} />
                <span className="hidden xl:inline">{l.label}</span>
                <span className="xl:hidden">{l.short ?? l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchBox />
          <Link href="/booklet" className="btn hidden sm:inline-flex" title="Open the print-ready booklet">
            <Printer className="h-4 w-4" />
            <span className="hidden md:inline">Booklet</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
