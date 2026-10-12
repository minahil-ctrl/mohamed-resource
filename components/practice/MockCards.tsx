"use client";
import Link from "next/link";
import { ArrowRight, Clock, Trophy } from "lucide-react";
import { MOCKS } from "@/lib/data/mocks";
import { unitById } from "@/lib/units";
import { useLocalStorage } from "@/lib/useLocalStorage";

export default function MockCards() {
  const [best] = useLocalStorage<Record<string, { score: number; total: number }>>("qb.mockBest", {});
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {MOCKS.map((m) => {
        const b = best[m.n];
        return (
          <article key={m.n} className="card card-hover flex flex-col p-6">
            <span className="num grid h-12 w-12 place-items-center rounded-xl bg-accent text-xl font-extrabold text-shell">{m.n}</span>
            <h3 className="mt-4 text-xl font-bold text-white">{m.title}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/60"><Clock className="h-4 w-4" /> {m.minutes} min · {m.marks} marks</p>
            <ul className="mt-3 space-y-1 text-sm text-white/75">
              <li>{m.mcqs.length} multiple-choice questions</li>
              <li>5 written questions: {m.questions.map((q) => q.marks).join(", ")} marks</li>
              <li className="text-white/50">Case studies: {[...new Set(m.questions.map((q) => unitById(q.unit).caseStudy.name))].join(", ")}</li>
            </ul>
            <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-lime-ink">
              <Trophy className="h-4 w-4" /> {b ? `Best MCQ score ${b.score}/${b.total}` : "Not attempted"}
            </p>
            <Link href={`/module-2/mocks/${m.n}`} className="btn-accent mt-auto self-start !mt-5">
              {b ? "Retake" : "Start"} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
