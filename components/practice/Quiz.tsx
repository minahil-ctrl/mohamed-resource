"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, RotateCcw, Shuffle, Target, X } from "lucide-react";
import type { MCQ } from "@/lib/types";
import { topicTitle } from "@/lib/data";
import { chapterById, notesHref } from "@/lib/content";
import Marker from "@/components/ui/Marker";
import { usePathname } from "next/navigation";
import { LS, type QuizBest, useLocalStorage } from "@/lib/useLocalStorage";

const LETTERS = ["A", "B", "C", "D"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function topicLink(topicId: string) {
  const c = chapterById(topicId);
  return c ? notesHref(c) : "/module-1";
}

export default function Quiz({
  questions,
  storeKey,
  initialIndex = 0,
}: {
  questions: MCQ[];
  storeKey: string;
  initialIndex?: number;
}) {
  const [, setBest] = useLocalStorage<QuizBest>(LS.quizBest, {});
  const [order, setOrder] = useState<number[]>(() => questions.map((_, i) => i));
  const [pos, setPos] = useState(Math.min(Math.max(initialIndex, 0), questions.length - 1));
  const [picked, setPicked] = useState<number | null>(null);
  const [chosen, setChosen] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const pathname = usePathname();

  // reset when the question set changes (e.g. mixed quiz generated)
  useEffect(() => {
    setOrder(questions.map((_, i) => i));
    setPos(Math.min(Math.max(initialIndex, 0), Math.max(questions.length - 1, 0)));
    setPicked(null);
    setChosen({});
    setDone(false);
  }, [questions, initialIndex]);

  const q = questions[order[pos]];
  const total = order.length;
  const answered = Object.keys(chosen).length;
  const score = useMemo(
    () => Object.entries(chosen).filter(([id, c]) => questions.find((x) => x.id === id)?.answer === c).length,
    [chosen, questions],
  );

  const choose = useCallback(
    (i: number) => {
      if (picked !== null || !q) return;
      setPicked(i);
      setChosen((c) => ({ ...c, [q.id]: i }));
    },
    [picked, q],
  );

  const next = useCallback(() => {
    if (picked === null) return;
    if (pos < total - 1) {
      setPos(pos + 1);
      setPicked(null);
    } else {
      const finalScore = Object.entries(chosen).filter(([id, c]) => questions.find((x) => x.id === id)?.answer === c).length;
      setBest((b) => {
        const prev = b[storeKey];
        const better = !prev || finalScore / total >= prev.score / prev.total;
        return better ? { ...b, [storeKey]: { score: finalScore, total } } : b;
      });
      setDone(true);
    }
  }, [picked, pos, total, chosen, questions, setBest, storeKey]);

  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const k = e.key.toLowerCase();
      const idx = ["1", "2", "3", "4"].indexOf(k) >= 0 ? Number(k) - 1 : ["a", "b", "c", "d"].indexOf(k);
      if (idx >= 0) choose(idx);
      else if (k === "enter" || k === "arrowright") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, next, done]);

  const restart = (missedOnly: boolean) => {
    const idxs = questions.map((_, i) => i);
    const missed = idxs.filter((i) => chosen[questions[i].id] !== questions[i].answer);
    setOrder(missedOnly && missed.length ? shuffle(missed) : shuffle(idxs));
    setPos(0);
    setPicked(null);
    setChosen({});
    setDone(false);
  };

  if (!q) return <p className="text-slate-400">No questions available.</p>;

  /* ---------------------------- results ---------------------------- */
  if (done) {
    const pct = Math.round((score / total) * 100);
    const byTopic = new Map<string, { right: number; n: number }>();
    order.forEach((oi) => {
      const x = questions[oi];
      const e = byTopic.get(x.topic) ?? { right: 0, n: 0 };
      e.n += 1;
      if (chosen[x.id] === x.answer) e.right += 1;
      byTopic.set(x.topic, e);
    });
    const missed = order.map((oi) => questions[oi]).filter((x) => chosen[x.id] !== x.answer);
    const C = 2 * Math.PI * 54;
    const msg =
      pct >= 90 ? "Outstanding. Exam-ready on this section." : pct >= 75 ? "Strong. Patch the gaps below and move on." : pct >= 55 ? "Getting there. Revisit the topics flagged below." : "Needs work. Re-read the cheat sheet, then retry.";
    return (
      <div className="animate-rise space-y-6">
        <div className="card flex flex-col items-center gap-6 border-accent/30 p-8 text-center sm:flex-row sm:text-left">
          <svg viewBox="0 0 128 128" className="h-36 w-36 shrink-0 -rotate-90">
            <circle cx="64" cy="64" r="54" className="fill-none stroke-white/10" strokeWidth="10" />
            <circle cx="64" cy="64" r="54" className="fill-none stroke-accent transition-all duration-1000" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} />
            <text x="64" y="64" textAnchor="middle" dominantBaseline="central" transform="rotate(90 64 64)" className="h-display fill-white text-[30px] font-semibold">{pct}%</text>
          </svg>
          <div>
            <p className="eyebrow">Result</p>
            <p className="h-display text-4xl font-semibold text-white">{score} <span className="text-slate-400">/ {total}</span></p>
            <p className="mt-2 text-slate-300">{msg}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              <button onClick={() => restart(false)} className="btn-accent"><Shuffle className="h-4 w-4" /> Retry (shuffled)</button>
              {missed.length > 0 && (
                <button onClick={() => restart(true)} className="btn"><RotateCcw className="h-4 w-4" /> Redo {missed.length} missed</button>
              )}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="eyebrow mb-4">Performance by topic</h3>
          <ul className="space-y-3">
            {[...byTopic.entries()].map(([t, v]) => (
              <li key={t}>
                <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-200">{topicTitle(t)}</span>
                  <span className="num text-slate-400">{v.right}/{v.n}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full transition-all duration-700 ${v.right / v.n < 0.6 ? "bg-rose-400" : "bg-accent"}`} style={{ width: `${(v.right / v.n) * 100}%` }} />
                </div>
                {v.right / v.n < 0.75 && (
                  <Link href={topicLink(t)} className="mt-1 inline-flex items-center gap-1 text-xs text-soft hover:underline">
                    <BookOpen className="h-3 w-3" /> Revise this topic
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {missed.length > 0 && (
          <div className="card p-6">
            <h3 className="eyebrow mb-4">Questions to review</h3>
            <ul className="space-y-4">
              {missed.map((m) => (
                <li key={m.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
                  <p className="font-medium text-white">{m.q}</p>
                  <p className="mt-2 text-rose-700 dark:text-rose-300">Your answer: {m.options[chosen[m.id]]}</p>
                  <p className="mt-0.5 text-emerald-700 dark:text-emerald-300">Correct: {m.options[m.answer]}</p>
                  <p className="mt-1 text-slate-300">{m.why[m.answer]}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  /* ---------------------------- question ---------------------------- */
  const isRight = picked !== null && picked === q.answer;
  return (
    <div className="space-y-5">
      <div className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="num text-sm text-slate-300">
            Question <strong className="text-white">{pos + 1}</strong> / {total}
          </p>
          <p className="num flex items-center gap-2 text-sm text-slate-300">
            <Target className="h-4 w-4 text-soft" /> Score <strong className="text-white">{score}</strong>/{answered}
          </p>
        </div>
        <div className="mt-3 flex gap-1">
          {order.map((oi, i) => {
            const x = questions[oi];
            const c = chosen[x.id];
            const state = c === undefined ? (i === pos ? "cur" : "todo") : c === x.answer ? "ok" : "bad";
            return (
              <span
                key={x.id}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  state === "ok" ? "bg-emerald-400" : state === "bad" ? "bg-rose-400" : state === "cur" ? "bg-accent" : "bg-white/10"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div key={q.id} className="card animate-rise p-5 sm:p-8">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="chip">{topicTitle(q.topic)}</span>
          <Marker id={q.id} label={q.q} href={`${pathname}?view=quiz&q=${questions.findIndex((x) => x.id === q.id)}`} />
        </div>
        <h3 className="h-display text-2xl font-semibold leading-snug text-white sm:text-[28px]">{q.q}</h3>

        <ul className="mt-6 space-y-3">
          {q.options.map((opt, i) => {
            const isAns = i === q.answer;
            const isPick = i === picked;
            const state = picked === null ? "idle" : isAns ? "correct" : isPick ? "wrong" : "dim";
            return (
              <li key={i}>
                <button
                  onClick={() => choose(i)}
                  disabled={picked !== null}
                  className={`group w-full rounded-xl border p-4 text-left transition duration-200 ${
                    state === "idle"
                      ? "border-white/10 bg-white/[0.03] hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/10"
                      : state === "correct"
                        ? "border-emerald-400/70 bg-emerald-400/10"
                        : state === "wrong"
                          ? "border-rose-400/70 bg-rose-400/10"
                          : "border-white/5 bg-white/[0.02] opacity-80"
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={`num mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                        state === "correct" ? "bg-emerald-400 text-slate-900" : state === "wrong" ? "bg-rose-400 text-slate-900" : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {state === "correct" ? <Check className="h-4 w-4" /> : state === "wrong" ? <X className="h-4 w-4" /> : LETTERS[i]}
                    </span>
                    <span className="text-[15px] leading-relaxed text-slate-100">{opt}</span>
                  </span>
                  {picked !== null && (
                    <span
                      className={`mt-2 block pl-10 text-[13px] leading-relaxed ${
                        isAns ? "text-emerald-700 dark:text-emerald-300" : isPick ? "text-rose-700 dark:text-rose-300" : "text-slate-400"
                      }`}
                    >
                      {q.why[i]}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {picked !== null && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 animate-rise">
            <div className="flex items-center gap-3">
              <span className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${isRight ? "bg-emerald-400/15 text-emerald-700 dark:text-emerald-300" : "bg-rose-400/15 text-rose-700 dark:text-rose-300"}`}>
                {isRight ? "Correct" : "Not quite"}
              </span>
              <Link href={topicLink(q.topic)} className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-soft">
                <BookOpen className="h-3.5 w-3.5" /> Revise this topic
              </Link>
            </div>
            <button onClick={next} className="btn-accent">
              {pos < total - 1 ? "Next question" : "See results"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
        {picked === null && <p className="mt-5 text-xs text-slate-500">Tip: press 1-4 or A-D to answer, Enter for the next question.</p>}
      </div>
    </div>
  );
}
