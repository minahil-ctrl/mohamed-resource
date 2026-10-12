import type { ExamQ, MCQ, UnitId } from "../types";
import { ALL_EXAMS, MCQS } from "./index";

export interface Mock {
  n: 1 | 2 | 3;
  title: string;
  minutes: number;
  mcqs: MCQ[];
  questions: ExamQ[];
  marks: number;
}

const UNITS: UnitId[] = ["u1", "u2", "u3", "u4", "u5"];
const MARKS = [2, 3, 6, 9, 12] as const;

/**
 * Three disjoint mock papers.
 * Section A: 25 MCQs (5 per unit, interleaved; no question repeats across mocks).
 * Section B: one question each of 2, 3, 6, 9 and 12 marks. The unit rotates so that mock 1, 2 and 3 use different case studies.
 */
function build(k: 0 | 1 | 2): Mock {
  const mcqs: MCQ[] = [];
  for (let i = 0; i < 5; i++) for (const u of UNITS) mcqs.push(MCQS[u][k * 5 + i]);
  const questions = MARKS.map((m, i) => ALL_EXAMS.find((q) => q.marks === m && q.unit === UNITS[(i + k) % 5])!);
  const marks = mcqs.length + questions.reduce((s, q) => s + q.marks, 0);
  return { n: (k + 1) as 1 | 2 | 3, title: `Mock Exam ${k + 1}`, minutes: 60, mcqs, questions, marks };
}

export const MOCKS: Mock[] = [build(0), build(1), build(2)];
