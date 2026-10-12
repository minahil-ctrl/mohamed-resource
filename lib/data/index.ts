import type { ExamQ, MCQ, Topic, UnitId } from "../types";
import { topicsU1 } from "./topics-u1";
import { topicsU2 } from "./topics-u2";
import { topicsU3 } from "./topics-u3";
import { topicsU4 } from "./topics-u4";
import { topicsU5 } from "./topics-u5";
import { mcqU1 } from "./mcq-u1";
import { mcqU2 } from "./mcq-u2";
import { mcqU3 } from "./mcq-u3";
import { mcqU4 } from "./mcq-u4";
import { mcqU5 } from "./mcq-u5";
import { examA } from "./exam-a";
import { examB } from "./exam-b";

export const TOPICS: Record<UnitId, Topic[]> = {
  u1: topicsU1,
  u2: topicsU2,
  u3: topicsU3,
  u4: topicsU4,
  u5: topicsU5,
};

export const MCQS: Record<UnitId, MCQ[]> = {
  u1: mcqU1,
  u2: mcqU2,
  u3: mcqU3,
  u4: mcqU4,
  u5: mcqU5,
};

const allExam = [...examA, ...examB];
export const EXAMS: Record<UnitId, ExamQ[]> = {
  u1: allExam.filter((q) => q.unit === "u1"),
  u2: allExam.filter((q) => q.unit === "u2"),
  u3: allExam.filter((q) => q.unit === "u3"),
  u4: allExam.filter((q) => q.unit === "u4"),
  u5: allExam.filter((q) => q.unit === "u5"),
};

export const ALL_MCQS: MCQ[] = Object.values(MCQS).flat();
export const ALL_EXAMS: ExamQ[] = allExam;
export const ALL_TOPICS: (Topic & { unit: UnitId })[] = (Object.keys(TOPICS) as UnitId[]).flatMap((u) =>
  TOPICS[u].map((t) => ({ ...t, unit: u })),
);

export function topicTitle(topicId: string): string {
  return ALL_TOPICS.find((t) => t.id === topicId)?.title ?? topicId;
}
