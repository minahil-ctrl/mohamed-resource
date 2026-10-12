"use client";
import { Award, BookCheck, Gauge, PenLine } from "lucide-react";
import { ALL_EXAMS, MCQS } from "@/lib/data";
import { LS, type BankMarks, type QuizBest, useLocalStorage } from "@/lib/useLocalStorage";

export default function ProgressStats() {
  const [best] = useLocalStorage<QuizBest>(LS.quizBest, {});
  const [marks] = useLocalStorage<BankMarks>(LS.bankMarks, {});
  const units = ["u1", "u2", "u3", "u4", "u5"] as const;
  const taken = units.filter((u) => best[u]);
  const avg = taken.length ? Math.round(taken.reduce((s, u) => s + (best[u].score / best[u].total) * 100, 0) / taken.length) : null;
  const mocked = ALL_EXAMS.filter((q) => (marks[q.id]?.got ?? 0) > 0);
  const got = mocked.reduce((s, q) => s + marks[q.id].got, 0);
  const max = mocked.reduce((s, q) => s + q.marks, 0);
  const totalMcq = units.reduce((s, u) => s + MCQS[u].length, 0);

  const stats = [
    { icon: BookCheck, k: "Unit quizzes taken", v: `${taken.length}/5`, sub: `${totalMcq} questions in the bank` },
    { icon: Gauge, k: "Average best quiz score", v: avg === null ? "n/a" : `${avg}%`, sub: "target: 80% in every unit" },
    { icon: PenLine, k: "Exam questions self-marked", v: `${mocked.length}/${ALL_EXAMS.length}`, sub: "2, 3, 6, 9 and 12 markers" },
    { icon: Award, k: "Self-marked score", v: max ? `${Math.round((got / max) * 100)}%` : "n/a", sub: max ? `${got} of ${max} marks` : "reveal a mark scheme to start" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.k} className="card p-5">
            <Icon className="h-5 w-5 text-soft" />
            <p className="num mt-3 text-3xl font-bold text-white">{s.v}</p>
            <p className="mt-0.5 text-sm font-medium text-slate-200">{s.k}</p>
            <p className="mt-0.5 text-xs text-slate-500">{s.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
