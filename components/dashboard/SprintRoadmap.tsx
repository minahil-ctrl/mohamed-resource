"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Clock, Map as MapIcon, Sunrise } from "lucide-react";
import { SPRINT, WARMUP } from "@/lib/data/sprint";
import { accentVars, HOME_ACCENT, unitById } from "@/lib/units";
import { LS, useLocalStorage } from "@/lib/useLocalStorage";

const fmtDate = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export default function SprintRoadmap() {
  const [open, setOpen] = useLocalStorage<boolean>(LS.roadmapOpen, true);
  const [done, setDone] = useLocalStorage<Record<string, boolean>>(LS.sprint, {});
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const allKeys = [...WARMUP.tasks.map((_, i) => `w-${i}`), ...SPRINT.flatMap((d) => d.tasks.map((_, i) => `${d.day}-${i}`))];
  const doneCount = allKeys.filter((k) => done[k]).length;
  const pct = Math.round((doneCount / allKeys.length) * 100);
  const toggle = (k: string) => setDone((d) => ({ ...d, [k]: !d[k] }));

  return (
    <section className="card overflow-hidden" aria-label="10-day sprint roadmap">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="no-print flex w-full flex-wrap items-center gap-4 p-5 text-left transition hover:bg-white/[0.03] sm:p-6"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/20 text-soft ring-1 ring-accent/40">
          <MapIcon className="h-6 w-6" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-2xl font-semibold text-white">10-Day Sprint Roadmap</span>
          <span className="block text-sm text-slate-400">19 to 28 October, then the exam on the 29th. Tick tasks off as you go.</span>
        </span>
        <span className="flex items-center gap-4">
          <span className="hidden text-right sm:block">
            <span className="num block text-xl font-bold text-white">{pct}%</span>
            <span className="block text-[11px] uppercase tracking-wider text-slate-400">{doneCount}/{allKeys.length} tasks</span>
          </span>
          <ChevronDown className={`h-5 w-5 text-slate-300 transition ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      <h2 className="print-only px-5 pt-5 font-serif text-2xl font-semibold">10-Day Sprint Roadmap</h2>
      <div className="no-print h-1 bg-white/5">
        <div className="h-full bg-gradient-to-r from-accent/50 to-accent transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>

      <div className={`${open ? "block" : "hidden"} print:block border-t border-white/10 p-5 sm:p-6`}>
        <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5" style={accentVars(HOME_ACCENT.rgb, HOME_ACCENT.soft) as React.CSSProperties}>
          <div className="flex flex-wrap items-center gap-2">
            <Sunrise className="h-5 w-5 text-soft" />
            <h3 className="font-serif text-lg font-semibold text-white">{WARMUP.title}</h3>
            {today && today < SPRINT[0].date && <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-shell">Now</span>}
          </div>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {WARMUP.tasks.map((t, i) => {
              const k = `w-${i}`;
              return (
                <li key={k}>
                  <TaskRow checked={!!done[k]} onToggle={() => toggle(k)} label={t} />
                </li>
              );
            })}
          </ul>
          <div className="no-print mt-3 flex flex-wrap gap-2">
            {WARMUP.link.map((l) => (
              <Link key={l.href} href={l.href} className="btn !py-1.5 text-xs">{l.label}</Link>
            ))}
          </div>
        </div>

        <ol className="grid gap-4 md:grid-cols-2">
          {SPRINT.map((d) => {
            const style = d.unit === "mixed" ? accentVars(HOME_ACCENT.rgb, HOME_ACCENT.soft) : accentVars(unitById(d.unit).rgb, unitById(d.unit).soft);
            const isToday = today ? sameDay(today, d.date) : false;
            const complete = d.tasks.every((_, i) => done[`${d.day}-${i}`]);
            return (
              <li
                key={d.day}
                style={style as React.CSSProperties}
                className={`avoid-break relative rounded-2xl border p-5 transition ${
                  isToday ? "border-accent bg-accent/[0.12] shadow-glow" : complete ? "border-emerald-400/30 bg-emerald-400/[0.04]" : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`num grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg font-bold ${complete ? "bg-emerald-400 text-slate-900" : "bg-accent text-white"}`}>
                    {complete ? <Check className="h-6 w-6" /> : d.day}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
                      <span className="text-soft">Day {d.day} · {fmtDate(d.date)}</span>
                      {isToday && <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">Today</span>}
                      <span className="num flex items-center gap-1 text-slate-400"><Clock className="h-3 w-3" /> {d.hours}h</span>
                    </div>
                    <h3 className="mt-1 text-[17px] font-semibold leading-snug text-white">{d.title}</h3>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {d.tasks.map((t, i) => {
                    const k = `${d.day}-${i}`;
                    return (
                      <li key={k}>
                        <TaskRow checked={!!done[k]} onToggle={() => toggle(k)} label={t} />
                      </li>
                    );
                  })}
                </ul>
                <div className="no-print mt-4 flex flex-wrap gap-2">
                  {d.link.map((l) => (
                    <Link key={l.href} href={l.href} className="btn !py-1.5 text-xs">{l.label}</Link>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
          <strong className="text-white">29 October · Exam day.</strong> Light skim of the formula list and the trap log only. Eat, arrive early, read every command word twice.
        </p>
      </div>
    </section>
  );
}

function TaskRow({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 transition hover:bg-white/5">
      <input type="checkbox" checked={checked} onChange={onToggle} className="peer sr-only" />
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-white/25 bg-white/5 transition peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent/60">
        {checked && <Check className="h-3.5 w-3.5 text-white" />}
      </span>
      <span className={`text-sm leading-relaxed ${checked ? "text-slate-500 line-through" : "text-slate-200"}`}>{label}</span>
    </label>
  );
}
