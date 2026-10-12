"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ALL_TOPICS } from "@/lib/data";
import { UNITS, unitById, unitVars } from "@/lib/units";
import type { UnitId } from "@/lib/types";
import { ApplicationCard } from "./TopicCard";

export default function ApplicationBank() {
  const [unit, setUnit] = useState<UnitId | "all">("all");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL_TOPICS.flatMap((t) => t.applications.map((a) => ({ a, t }))).filter(
      ({ a, t }) =>
        (unit === "all" || t.unit === unit) &&
        (!needle || `${a.title} ${a.concept} ${a.scenario} ${a.tip} ${t.title}`.toLowerCase().includes(needle)),
    );
  }, [unit, q]);

  return (
    <div className="space-y-6">
      <div className="no-print flex flex-wrap items-center gap-3">
        <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 focus-within:border-accent/60">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter examples: e.g. cash flow, loss leader, JIT…"
            aria-label="Filter applications"
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setUnit("all")}
            className={`rounded-lg border px-3 py-2 text-sm transition ${unit === "all" ? "border-accent/70 bg-accent/20 text-white" : "border-white/10 text-slate-300 hover:border-accent/40"}`}
          >
            All units
          </button>
          {UNITS.map((u) => (
            <button
              key={u.id}
              style={unitVars(u) as React.CSSProperties}
              onClick={() => setUnit(u.id)}
              className={`rounded-lg border px-3 py-2 text-sm transition ${unit === u.id ? "border-accent/80 bg-accent/25 text-white" : "border-white/10 text-slate-300 hover:border-accent/60"}`}
            >
              <span className="num mr-1 text-soft">U{u.number}</span>
              {u.short}
            </button>
          ))}
        </div>
      </div>

      <p className="num text-sm text-slate-400">{items.length} example{items.length === 1 ? "" : "s"}</p>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map(({ a, t }) => {
          const u = unitById(t.unit);
          return (
            <div key={a.title} style={unitVars(u) as React.CSSProperties} className="flex flex-col gap-2">
              <Link href={`/module-1/${u.slug}#${t.id}`} className="num text-xs text-slate-400 transition hover:text-soft">
                U{u.number} · {t.code} {t.title} →
              </Link>
              <ApplicationCard a={a} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
