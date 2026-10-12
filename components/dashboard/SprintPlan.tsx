"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";
import { SPRINT } from "@/lib/data/sprint";
import { ALL_TOPICS } from "@/lib/data";
import { unitById } from "@/lib/units";
import { LS, useLocalStorage } from "@/lib/useLocalStorage";

const fmtDate = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export default function SprintPlan() {
  const [done, setDone] = useLocalStorage<Record<string, boolean>>(LS.sprint, {});
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const keys = SPRINT.flatMap((d) => [...d.topics.map((t) => `${d.day}-${t}`), ...(d.extras ?? []).map((_, i) => `${d.day}-x${i}`)]);
  const count = keys.filter((k) => done[k]).length;
  const pct = Math.round((count / keys.length) * 100);
  const toggle = (k: string) => setDone((d) => ({ ...d, [k]: !d[k] }));

  return (
    <section aria-label="10-day sprint plan">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">The plan</p>
          <h2 className="h-display text-3xl text-white">10-Day Sprint Plan</h2>
        </div>
        <div className="w-full max-w-xs">
          <div className="mb-1 flex justify-between text-xs font-semibold">
            <span className="text-white/60">Progress</span>
            <span className="num text-accent">
              {count}/{keys.length} · {pct}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <ol className="space-y-3">
        {SPRINT.map((day) => {
          const items = day.topics.map((id) => ALL_TOPICS.find((t) => t.id === id)!);
          const codes = items.length > 1 ? `${items[0].code} to ${items[items.length - 1].code}` : items[0].code;
          const dayKeys = [...day.topics.map((t) => `${day.day}-${t}`), ...(day.extras ?? []).map((_, i) => `${day.day}-x${i}`)];
          const complete = dayKeys.every((k) => done[k]);
          const isToday = today ? sameDay(today, day.date) : false;
          return (
            <li
              key={day.day}
              className={`card grid gap-4 p-5 transition md:grid-cols-[210px_1fr] ${isToday ? "!border-lime" : complete ? "!border-accent/60" : ""}`}
            >
              <div className="flex items-start gap-3.5">
                <span
                  className={`num grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg font-extrabold ${
                    complete ? "bg-[#00804C] text-white" : isToday ? "bg-lime text-shell" : "bg-white/10 text-white"
                  }`}
                >
                  {complete ? <Check className="h-6 w-6" /> : day.day}
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-lime">
                    Day {day.day} {isToday && <span className="ml-1 rounded bg-lime px-1.5 py-0.5 text-shell">Today</span>}
                  </p>
                  <p className="num text-sm text-white/60">{fmtDate(day.date)}</p>
                  <p className="num mt-1 inline-block rounded-md border border-white/15 px-2 py-0.5 text-[11px] font-bold text-white/80">
                    Syllabus {codes}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold leading-snug text-white">{day.title}</h3>
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {items.map((t) => {
                    const k = `${day.day}-${t.id}`;
                    const u = unitById(t.unit);
                    return (
                      <li key={k} className="flex items-center gap-1">
                        <Check_ checked={!!done[k]} onToggle={() => toggle(k)} label={`${t.code} ${t.title}`} />
                        <Link href={`/module-1/${u.slug}#${t.id}`} aria-label={`Open ${t.title}`} className="shrink-0 rounded-md p-1.5 text-white/40 transition hover:bg-white/10 hover:text-lime">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    );
                  })}
                  {(day.extras ?? []).map((x, i) => {
                    const k = `${day.day}-x${i}`;
                    return (
                      <li key={k}>
                        <Check_ checked={!!done[k]} onToggle={() => toggle(k)} label={x} />
                      </li>
                    );
                  })}
                </ul>
                {day.day === 10 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href="/module-2/mixed" className="btn-accent !py-1.5 text-xs">Start the mixed mock</Link>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Check_({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 transition hover:bg-white/5">
      <input type="checkbox" checked={checked} onChange={onToggle} className="peer sr-only" />
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-white/30 bg-white/5 transition peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-lime">
        {checked && <Check className="h-3.5 w-3.5 text-shell" strokeWidth={3} />}
      </span>
      <span className={`text-sm font-medium leading-snug ${checked ? "text-white/40 line-through" : "text-white/90"}`}>{label}</span>
    </label>
  );
}
