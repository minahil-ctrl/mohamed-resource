"use client";
import { useEffect, useState } from "react";
import { CalendarClock, Flame } from "lucide-react";
import { EXAM_DATE, PLAN_START, SPRINT_START, STUDENT_NAME } from "@/lib/config";

const DAY = 86400000;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const exam = EXAM_DATE.getTime();
  const start = PLAN_START.getTime();
  const sprint = SPRINT_START.getTime();
  const diff = now === null ? 0 : Math.max(exam - now, 0);
  const d = Math.floor(diff / DAY);
  const h = Math.floor((diff % DAY) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const progress = now === null ? 0 : Math.min(Math.max((now - start) / (exam - start), 0), 1);
  const sprintPct = ((sprint - start) / (exam - start)) * 100;

  let phase = "";
  if (now !== null) {
    if (now >= exam) phase = "Exam time. Good luck!";
    else if (now < sprint) phase = `Warm-up phase · the 10-day sprint begins in ${Math.ceil((sprint - now) / DAY)} day${Math.ceil((sprint - now) / DAY) === 1 ? "" : "s"}`;
    else {
      const dayNo = Math.min(Math.floor((now - sprint) / DAY) + 1, 10);
      phase = dayNo >= 10 && now >= sprint + 10 * DAY ? "Exam day tomorrow" : `Sprint Day ${dayNo} of 10`;
    }
  }

  const tiles = [
    { v: d, l: "Days" },
    { v: h, l: "Hours" },
    { v: m, l: "Minutes" },
    { v: s, l: "Seconds" },
  ];

  return (
    <section className="card relative overflow-hidden border-accent/40 p-6 shadow-glow sm:p-10" aria-label="Exam countdown">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-soft/10 blur-3xl" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="chip">
              <Flame className="h-3.5 w-3.5" /> Emergency crash course
            </span>
            <span className="chip">
              <CalendarClock className="h-3.5 w-3.5" /> Exam: 29 October 2026
            </span>
          </div>
          <h1 className="h-display text-4xl font-semibold leading-[1.05] text-white sm:text-6xl">
            {STUDENT_NAME}&apos;s <span className="grad-text">Business Studies</span> sprint
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
            Everything for Edexcel IGCSE Business (4BS1) in one place: cheat sheets, interactive graphs, 100 quiz questions and a marker&apos;s question bank.
          </p>
          {now !== null && <p className="mt-5 inline-block rounded-lg border border-accent/40 bg-accent/10 px-3.5 py-2 text-sm font-medium text-soft">{phase}</p>}
        </div>

        <div>
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {tiles.map((t) => (
              <div key={t.l} className="rounded-2xl border border-white/10 bg-black/30 px-1 py-4 text-center backdrop-blur sm:py-6">
                <p className="num text-4xl font-bold text-white sm:text-5xl" suppressHydrationWarning>
                  {now === null ? "--" : pad(t.v)}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-soft sm:text-[11px]">{t.l}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-slate-400">
            {now === null ? " " : <><strong className="num text-white">{d}</strong> full day{d === 1 ? "" : "s"} of study left before exam day</>}
          </p>

          <div className="mt-6">
            <div className="relative h-3 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent transition-all duration-1000" style={{ width: `${progress * 100}%` }} />
              <span className="absolute top-1/2 h-5 w-0.5 -translate-y-1/2 bg-white/40" style={{ left: `${sprintPct}%` }} />
              <span
                className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent shadow-glow"
                style={{ left: `${progress * 100}%` }}
              >
                <span className="absolute inset-0 animate-pulseRing rounded-full bg-accent" />
              </span>
            </div>
            <div className="num relative mt-2 flex justify-between text-[11px] text-slate-400">
              <span>12 Oct · today&apos;s plan</span>
              <span className="absolute -translate-x-1/2 text-soft" style={{ left: `${sprintPct}%` }}>19 Oct · sprint</span>
              <span>29 Oct · exam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
