"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Clock, Coffee, Flag, Pause, Play, RotateCcw, Timer, TimerReset } from "lucide-react";
import { CHAPTERS, chapterById } from "@/lib/content";
import { SPRINT } from "@/lib/data/sprint";
import { LS, useLocalStorage } from "@/lib/useLocalStorage";

interface LogEntry {
  ts: number;
  date: string;
  minutes: number;
  topicId: string;
}

type Mode = "pomodoro" | "stopwatch";
interface TimerState {
  mode: Mode;
  phase: "focus" | "break";
  focusMin: number;
  breakMin: number;
  topicId: string;
  running: boolean;
  startedAt: number; // epoch ms when the current run began
  before: number; // ms accumulated before the current run
}

const INITIAL: TimerState = { mode: "pomodoro", phase: "focus", focusMin: 25, breakMin: 5, topicId: "general", running: false, startedAt: 0, before: 0 };
const dayKey = (t: number) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const mmss = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};
const topicName = (id: string) => {
  if (id === "general") return "General revision";
  const t = chapterById(id);
  return t ? `${t.code} ${t.title}` : id;
};

export default function StudyHub() {
  const [log, setLog] = useLocalStorage<LogEntry[]>("qb.studyLog", []);
  const [timer, setTimer, ready] = useLocalStorage<TimerState>("qb.timer", INITIAL);
  const [done] = useLocalStorage<Record<string, boolean>>(LS.sprint, {});
  const [now, setNow] = useState(() => Date.now());
  const [flash, setFlash] = useState<string | null>(null);
  const timerRef = useRef(timer);
  timerRef.current = timer;

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, []);

  const elapsed = timer.before + (timer.running ? now - timer.startedAt : 0);
  const target = (timer.phase === "focus" ? timer.focusMin : timer.breakMin) * 60000;
  const remaining = target - elapsed;

  const addLog = useCallback(
    (minutes: number, topicId: string) => {
      if (minutes < 1) return;
      const ts = Date.now();
      setLog((l) => [...l, { ts, date: dayKey(ts), minutes, topicId }]);
      setFlash(`Logged ${minutes} min on ${topicName(topicId)}`);
      setTimeout(() => setFlash(null), 4000);
    },
    [setLog],
  );

  // pomodoro completion
  useEffect(() => {
    const t = timerRef.current;
    if (!ready || t.mode !== "pomodoro" || !t.running) return;
    if (remaining > 0) return;
    if (t.phase === "focus") {
      addLog(t.focusMin, t.topicId);
      setTimer({ ...t, phase: "break", running: true, startedAt: Date.now(), before: 0 });
    } else {
      setTimer({ ...t, phase: "focus", running: false, startedAt: 0, before: 0 });
    }
  }, [remaining, ready, addLog, setTimer]);

  const start = () => setTimer({ ...timer, running: true, startedAt: Date.now() });
  const pause = () => setTimer({ ...timer, running: false, before: elapsed, startedAt: 0 });
  const reset = () => setTimer({ ...timer, running: false, before: 0, startedAt: 0, phase: "focus" });
  const finish = () => {
    if (timer.phase === "focus") addLog(Math.floor(elapsed / 60000), timer.topicId);
    reset();
  };
  const update = (patch: Partial<TimerState>) => setTimer({ ...timer, ...patch });

  const pct = timer.mode === "pomodoro" ? Math.min(Math.max(elapsed / target, 0), 1) : (elapsed % 3600000) / 3600000;
  const C = 2 * Math.PI * 88;
  const display = timer.mode === "pomodoro" ? mmss(remaining) : mmss(elapsed);

  // ---- log stats
  const today = dayKey(now);
  const byDate = useMemo(() => {
    const m: Record<string, number> = {};
    log.forEach((e) => (m[e.date] = (m[e.date] ?? 0) + e.minutes));
    return m;
  }, [log]);
  const total = log.reduce((s, e) => s + e.minutes, 0);
  const days = SPRINT.map((d) => ({ day: d.day, key: dayKey(d.date.getTime()), mins: byDate[dayKey(d.date.getTime())] ?? 0 }));
  const maxMins = Math.max(60, ...days.map((d) => d.mins));
  const topicsDone = SPRINT.reduce((s, d) => s + d.topics.filter((t) => done[`${d.day}-${t}`]).length, 0);
  const topicsTotal = SPRINT.reduce((s, d) => s + d.topics.length, 0);
  const recent = [...log].reverse().slice(0, 5);

  const durations = timer.mode === "pomodoro" ? [15, 25, 45, 60] : [];

  return (
    <section className="grid gap-5 lg:grid-cols-[1.05fr_1fr]" aria-label="Study sprint timer and log">
      {/* TIMER */}
      <div className="card p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Study sprint timer</p>
            <h2 className="text-xl font-bold text-white">{timer.phase === "break" ? "Break time" : "Focus on one topic"}</h2>
          </div>
          <div className="flex rounded-xl border border-white/15 p-1 text-sm font-semibold">
            {(["pomodoro", "stopwatch"] as Mode[]).map((m) => (
              <button
                key={m}
                disabled={timer.running}
                onClick={() => update({ mode: m, before: 0, phase: "focus" })}
                className={`rounded-lg px-3 py-1.5 capitalize transition disabled:opacity-60 ${timer.mode === m ? "bg-accent text-shell" : "text-white/70 hover:text-white"}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid items-center gap-6 sm:grid-cols-[210px_1fr]">
          <div className="relative mx-auto h-[210px] w-[210px]">
            <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
              <circle cx="100" cy="100" r="88" className="fill-none stroke-white/10" strokeWidth="9" />
              <circle
                cx="100"
                cy="100"
                r="88"
                className={`fill-none ${timer.phase === "break" ? "stroke-lime" : "stroke-accent"}`}
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - pct)}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="num text-5xl font-extrabold text-white" suppressHydrationWarning>
                  {display}
                </p>
                <p className="mt-1 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-lime-ink">
                  {timer.phase === "break" ? <Coffee className="h-3 w-3" /> : <Timer className="h-3 w-3" />}
                  {timer.mode === "stopwatch" ? "elapsed" : timer.phase}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-white/60">Topic you are studying</span>
              <select
                value={timer.topicId}
                disabled={timer.running}
                onChange={(e) => update({ topicId: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-canvas px-3 py-2.5 text-sm text-white focus:border-accent focus:outline-none disabled:opacity-60"
              >
                <option value="general">General revision</option>
                {CHAPTERS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.code} {t.title}
                  </option>
                ))}
              </select>
            </label>

            {durations.length > 0 && (
              <div>
                <span className="mb-1 block text-xs font-semibold text-white/60">Focus length (minutes)</span>
                <div className="flex gap-2">
                  {durations.map((n) => (
                    <button
                      key={n}
                      disabled={timer.running}
                      onClick={() => update({ focusMin: n, breakMin: n >= 45 ? 10 : 5, before: 0 })}
                      className={`num rounded-lg border px-3.5 py-1.5 text-sm font-bold transition disabled:opacity-60 ${
                        timer.focusMin === n ? "border-accent bg-accent text-shell" : "border-white/15 text-white/80 hover:border-accent"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {timer.running ? (
                <button onClick={pause} className="btn-accent flex-1">
                  <Pause className="h-4 w-4" /> Pause
                </button>
              ) : (
                <button onClick={start} className="btn-accent flex-1">
                  <Play className="h-4 w-4" /> {elapsed > 0 ? "Resume" : "Start Study Sprint"}
                </button>
              )}
              {(timer.running || elapsed > 0) && timer.phase === "focus" && (
                <button onClick={finish} className="btn" title="Stop and log the minutes studied">
                  <Flag className="h-4 w-4" /> Finish &amp; log
                </button>
              )}
              {(timer.running || elapsed > 0) && (
                <button onClick={reset} className="btn !px-3" aria-label="Reset timer">
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="mt-4 min-h-5 text-sm font-semibold text-accent-ink" aria-live="polite">
          {flash}
        </p>
      </div>

      {/* LOG */}
      <div className="card p-6 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Study log</p>
            <h2 className="text-xl font-bold text-white">Minutes per sprint day</h2>
          </div>
          <div className="flex gap-5 text-right">
            <div>
              <p className="num text-2xl font-extrabold text-lime-ink">{byDate[today] ?? 0}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">min today</p>
            </div>
            <div>
              <p className="num text-2xl font-extrabold text-white">{total}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">min total</p>
            </div>
            <div>
              <p className="num text-2xl font-extrabold text-white">
                {topicsDone}
                <span className="text-base text-white/40">/{topicsTotal}</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">topics done</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex h-32 items-end gap-2">
          {days.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="num text-[10px] text-white/50">{d.mins || ""}</span>
              <div className="flex h-20 w-full items-end rounded-md bg-white/[0.05]">
                <div
                  className={`w-full rounded-md transition-all duration-500 ${d.key === today ? "bg-lime" : "bg-accent"}`}
                  style={{ height: `${Math.max((d.mins / maxMins) * 100, d.mins ? 6 : 0)}%` }}
                />
              </div>
              <span className={`num text-[11px] font-bold ${d.key === today ? "text-lime-ink" : "text-white/50"}`}>D{d.day}</span>
            </div>
          ))}
        </div>

        <h3 className="mt-5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
          <Clock className="h-3.5 w-3.5" /> Recent sessions
        </h3>
        {recent.length === 0 ? (
          <p className="mt-2 text-sm text-white/55">No sessions yet. Choose a topic, press Start Study Sprint, and your minutes are logged automatically.</p>
        ) : (
          <ul className="mt-2 divide-y divide-white/10">
            {recent.map((e) => (
              <li key={e.ts} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span className="truncate text-white/85">{topicName(e.topicId)}</span>
                <span className="num shrink-0 font-bold text-lime-ink">{e.minutes} min</span>
              </li>
            ))}
          </ul>
        )}
        {log.length > 0 && (
          <button onClick={() => confirm("Clear the whole study log?") && setLog([])} className="mt-3 inline-flex items-center gap-1 text-xs text-white/40 hover:text-white/80">
            <TimerReset className="h-3 w-3" /> Clear log
          </button>
        )}
      </div>
    </section>
  );
}
