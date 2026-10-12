"use client";
import { useSearchParams } from "next/navigation";
import type { Chapter } from "@/lib/content";
import type { ExamQ, MCQ } from "@/lib/types";
import Quiz from "./Quiz";
import PracticeQuestions from "./PracticeQuestions";
import ViewTabs from "@/components/ui/ViewTabs";

export default function TopicPractice({ ch, mcqs, modelled }: { ch: Chapter; mcqs: MCQ[]; modelled: ExamQ[] }) {
  const params = useSearchParams();
  const q = Number(params.get("q"));
  return (
    <ViewTabs
      tabs={[
        {
          id: "quiz",
          label: "Quiz",
          hint: `${mcqs.length} MCQs`,
          node:
            mcqs.length > 0 ? (
              <Quiz questions={mcqs} storeKey={ch.id} initialIndex={Number.isFinite(q) ? q : 0} />
            ) : (
              <p className="card p-6 text-white/70">No multiple-choice questions for this topic yet. Try the practice questions tab.</p>
            ),
        },
        { id: "questions", label: "Practice questions", hint: `${ch.questions.length + modelled.length}`, node: <PracticeQuestions ch={ch} modelled={modelled} /> },
      ]}
    />
  );
}
