import Link from "next/link";
import { UNITS } from "@/lib/units";

export default function UnitTabs({ base, active, query }: { base: "/module-1" | "/module-2"; active: string; query?: string }) {
  return (
    <nav aria-label="Select unit" className="no-print -mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
      <ul className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
        {UNITS.map((u) => {
          const isActive = u.slug === active;
          return (
            <li key={u.id}>
              <Link
                href={`${base}/${u.slug}${query ?? ""}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? "border-accent bg-accent text-shell"
                    : "border-white/15 bg-white/[0.04] text-white/85 hover:border-accent hover:text-white"
                }`}
              >
                <span className={`num text-xs font-bold ${isActive ? "text-shell/70" : "text-lime-ink"}`}>U{u.number}</span>
                <span className="whitespace-nowrap">{u.short}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
