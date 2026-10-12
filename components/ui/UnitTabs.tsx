import Link from "next/link";
import { UNITS, unitVars } from "@/lib/units";
import UnitIcon from "./UnitIcon";

export default function UnitTabs({ base, active, query }: { base: "/module-1" | "/module-2"; active: string; query?: string }) {
  return (
    <nav aria-label="Select unit" className="no-print -mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
      <ul className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
        {UNITS.map((u) => {
          const isActive = u.slug === active;
          return (
            <li key={u.id} style={unitVars(u) as React.CSSProperties}>
              <Link
                href={`${base}/${u.slug}${query ?? ""}`}
                aria-current={isActive ? "page" : undefined}
                className={`group flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition duration-300 ${
                  isActive
                    ? "border-accent/70 bg-accent/20 text-white shadow-glow"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-accent/50 hover:bg-accent/10 hover:text-white"
                }`}
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-bold transition ${
                    isActive ? "bg-accent text-white" : "bg-accent/15 text-soft group-hover:bg-accent/30"
                  }`}
                >
                  <UnitIcon icon={u.icon} className="h-4 w-4" />
                </span>
                <span className="whitespace-nowrap">
                  <span className="num mr-1.5 text-[11px] opacity-70">U{u.number}</span>
                  {u.short}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
