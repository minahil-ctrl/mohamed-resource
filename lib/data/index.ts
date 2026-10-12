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
import { OLD_TO_CHAPTER } from "./extras";
import { chapterById } from "../content";

/** Hand-written cheat-sheet blocks (attached to chapters via extras.ts). */
export const LEGACY_TOPICS: Topic[] = [...topicsU1, ...topicsU2, ...topicsU3, ...topicsU4, ...topicsU5];
export const legacyTopic = (id: string) => LEGACY_TOPICS.find((t) => t.id === id);

const toChapter = <T extends { topic: string }>(x: T): T => ({ ...x, topic: OLD_TO_CHAPTER[x.topic] ?? x.topic });

export const MCQS: Record<UnitId, MCQ[]> = {
  u1: mcqU1.map(toChapter),
  u2: mcqU2.map(toChapter),
  u3: mcqU3.map(toChapter),
  u4: mcqU4.map(toChapter),
  u5: mcqU5.map(toChapter),
};

const allExam = [...examA, ...examB].map(toChapter);
export const EXAMS: Record<UnitId, ExamQ[]> = {
  u1: allExam.filter((q) => q.unit === "u1"),
  u2: allExam.filter((q) => q.unit === "u2"),
  u3: allExam.filter((q) => q.unit === "u3"),
  u4: allExam.filter((q) => q.unit === "u4"),
  u5: allExam.filter((q) => q.unit === "u5"),
};

export const ALL_MCQS: MCQ[] = Object.values(MCQS).flat();
export const ALL_EXAMS: ExamQ[] = allExam;

export function topicTitle(chapterId: string): string {
  const c = chapterById(chapterId);
  return c ? `${c.code} ${c.title}` : chapterId;
}
