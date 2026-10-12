"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ClipboardCheck, ListChecks } from "lucide-react";
import { EXAMS, MCQS } from "@/lib/data";
import type { UnitId } from "@/lib/types";
import Quiz from "./Quiz";
import ExamBank from "./ExamBank";
import MarkGuide from "./MarkGuide";
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
            { id: "quiz", icon: ListChecks, title: "Part A · Sectional quiz", sub: `${MCQS[unit].length} MCQs · 1-line reason for every option` },
            { id: "bank", icon: ClipboardCheck, title: "Part B · Command word practice", sub: `${EXAMS[unit].length} questions · 2, 3, 6, 9 and 12 marks` },
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
              className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition duration-200 ${
                active ? "border-accent bg-accent text-shell" : "border-white/15 bg-white/[0.04] hover:border-accent"
              }`}
            >
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${active ? "bg-shell/15 text-shell" : "bg-white/10 text-accent"}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-bold">{t.title}</span>
                <span className={`block text-sm ${active ? "text-shell/70" : "text-white/55"}`}>{t.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      {tab === "quiz" ? (
        <Quiz questions={MCQS[unit]} storeKey={unit} initialIndex={Number.isFinite(qParam) ? qParam : 0} />
      ) : (
        <div className="space-y-6">
          <MarkGuide />
          <MarkerToolkit />
          <ExamBank questions={EXAMS[unit]} initialOpen={open} />
        </div>
      )}
    </div>
  );
}
