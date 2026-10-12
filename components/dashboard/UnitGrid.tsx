"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardCheck } from "lucide-react";
import { EXAMS, MCQS, TOPICS } from "@/lib/data";
import { UNITS, unitVars } from "@/lib/units";
import { LS, type BankMarks, type QuizBest, useLocalStorage } from "@/lib/useLocalStorage";
import UnitIcon from "@/components/ui/UnitIcon";

export default function UnitGrid({ focus = "both" }: { focus?: "learn" | "practice" | "both" }) {
  const [best] = useLocalStorage<QuizBest>(LS.quizBest, {});
  const [marks] = useLocalStorage<BankMarks>(LS.bankMarks, {});

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {UNITS.map((u) => {
        const b = best[u.id];
        const pct = b ? Math.round((b.score / b.total) * 100) : null;
        const attempted = EXAMS[u.id].filter((q) => (marks[q.id]?.got ?? 0) > 0).length;
        return (
          <article
            key={u.id}
            style={unitVars(u) as React.CSSProperties}
            className="card card-hover group relative flex flex-col overflow-hidden p-6"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-nuit/30 blur-3xl transition group-hover:bg-accent/35" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="relative flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-shell shadow-glow">
                <UnitIcon icon={u.icon} className="h-6 w-6" />
              </span>
              <span className="num text-5xl font-bold text-white/[0.08]">0{u.number}</span>
            </div>
            <h3 className="relative mt-4 font-serif text-2xl font-semibold leading-tight text-white">{u.name}</h3>
            <p className="relative mt-1.5 text-sm text-slate-400">{u.tagline}</p>

            <ul className="relative mt-4 space-y-1">
              {TOPICS[u.id].map((t) => (
                <li key={t.id}>
                  <Link href={`/module-1/${u.slug}#${t.id}`} className="flex gap-2 text-[13px] text-slate-300 transition hover:text-white">
                    <span className="num w-7 shrink-0 text-soft">{t.code}</span>
                    <span className="truncate">{t.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {focus !== "learn" && (
              <div className="relative mt-5 space-y-2.5 rounded-xl border border-white/10 bg-black/20 p-3.5">
                <div>
                  <div className="mb-1 flex justify-between text-[11px] uppercase tracking-wider text-slate-400">
                    <span>Quiz best ({MCQS[u.id].length} MCQs)</span>
                    <span className="num text-white">{pct === null ? "not taken" : `${pct}%`}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${pct ?? 0}%` }} />
                  </div>
                </div>
                <p className="flex justify-between text-[11px] uppercase tracking-wider text-slate-400">
                  <span>Exam questions self-marked</span>
                  <span className="num text-white">{attempted}/{EXAMS[u.id].length}</span>
                </p>
              </div>
            )}

            <div className="relative mt-auto flex flex-wrap gap-2 pt-5">
              {focus !== "practice" && (
                <Link href={`/module-1/${u.slug}`} className="btn-accent flex-1">
                  <BookOpen className="h-4 w-4" /> Cheat sheet
                </Link>
              )}
              {focus !== "learn" && (
                <Link href={`/module-2/${u.slug}`} className={focus === "practice" ? "btn-accent flex-1" : "btn flex-1"}>
                  <ClipboardCheck className="h-4 w-4" /> Practise <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
