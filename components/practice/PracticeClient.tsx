"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ClipboardCheck, ListChecks } from "lucide-react";
import { EXAMS, MCQS } from "@/lib/data";
import type { UnitId } from "@/lib/types";
import Quiz from "./Quiz";
import ExamBank from "./ExamBank";
import MarkerToolkit from "./MarkerToolkit";

export default function PracticeClient({ unit }: { unit: UnitId }) {
  const params = useSearchParams();
  const [tab, setTab] = useState<"quiz" | "bank">(params.get("tab") === "bank" ? "bank" : "quiz");
  const qParam = Number(params.get("q"));
  const open = params.get("open") ?? undefined;

  return (
    <div className="space-y-6">
      <div role="tablist" className="no-print grid gap-3 sm:grid-cols-2">
        {(
          [
            { id: "quiz", icon: ListChecks, title: "Part A · Interactive quiz", sub: `${MCQS[unit].length} MCQs with an explanation for every option` },
            { id: "bank", icon: ClipboardCheck, title: "Part B · Exam marker question bank", sub: `${EXAMS[unit].length} questions: 2, 3, 6, 9 and 12 marks with AO mark scheme` },
          ] as const
        ).map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition duration-300 ${
                active ? "border-accent/70 bg-accent/15 shadow-glow" : "border-white/10 bg-white/[0.03] hover:border-accent/40"
              }`}
            >
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${active ? "bg-accent text-white" : "bg-white/10 text-slate-300"}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-white">{t.title}</span>
                <span className="block text-sm text-slate-400">{t.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      {tab === "quiz" ? (
        <Quiz questions={MCQS[unit]} storeKey={unit} initialIndex={Number.isFinite(qParam) ? qParam : 0} />
      ) : (
        <div className="space-y-6">
          <MarkerToolkit />
          <ExamBank questions={EXAMS[unit]} initialOpen={open} />
        </div>
      )}
    </div>
  );
}
