"use client";
import { useEffect, useState } from "react";
import { EXAM_DATE, SPRINT_START, STUDENT_NAME } from "@/lib/config";

const DAY = 86400000;
const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const exam = EXAM_DATE.getTime();
  const sprint = SPRINT_START.getTime();
  const diff = now === null ? 0 : Math.max(exam - now, 0);
  const d = Math.floor(diff / DAY);
  const h = Math.floor((diff % DAY) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  let phase = " ";
  if (now !== null) {
    if (now >= exam) phase = "Exam time. You are ready.";
    else if (now < sprint) {
      const n = Math.ceil((sprint - now) / DAY);
      phase = `Sprint Day 1 starts in ${n} day${n === 1 ? "" : "s"}`;
    } else phase = `Sprint Day ${Math.min(Math.floor((now - sprint) / DAY) + 1, 10)} of 10`;
  }

  return (
    <section className="pat card overflow-hidden border-white/15 p-6 sm:p-9" aria-label="Exam countdown">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow">{STUDENT_NAME}&apos;s Edexcel IGCSE Business sprint</p>
          <h1 className="h-display mt-2 text-5xl text-white sm:text-7xl" suppressHydrationWarning>
            Exam in <span className="text-lime">{now === null ? "--" : d}</span> day{d === 1 ? "" : "s"}
          </h1>
          <p className="mt-3 inline-block rounded-lg bg-accent px-3.5 py-1.5 text-sm font-bold text-shell" suppressHydrationWarning>
            {phase}
          </p>
          <p className="mt-3 text-sm text-white/55">29 October 2026 · the 10-day sprint runs 19 to 28 October</p>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {(
            [
              [d, "Days"],
              [h, "Hours"],
              [m, "Min"],
              [s, "Sec"],
            ] as const
          ).map(([v, l]) => (
            <div key={l} className="min-w-[68px] rounded-2xl border border-white/15 bg-shell/70 px-2 py-4 text-center sm:min-w-[84px] sm:py-5">
              <p className="num text-3xl font-extrabold text-white sm:text-4xl" suppressHydrationWarning>
                {now === null ? "--" : pad(v)}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-lime">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
