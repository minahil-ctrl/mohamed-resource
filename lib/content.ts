import raw from "./data/generated/chapters.json";
import type { UnitId } from "./types";
import { unitById } from "./units";

export interface Chapter {
  id: string; // "c28"
  num: number;
  unit: UnitId;
  slug: string;
  title: string;
  code: string; // "5.4"
  spec: string;
  appliesTo: string;
  objectives: string[];
  terms: { term: string; def: string; example: string }[];
  why: string;
  core: string;
  largeSmall: string;
  caseStudiesMd: string;
  cases: string[];
  diagramsMd: string;
  formulas: string[];
  flags: string[];
  tips: string[];
  questions: { text: string; marks: number; command: string }[];
}

export const CHAPTERS = raw as unknown as Chapter[];

export const chaptersOf = (u: UnitId) => CHAPTERS.filter((c) => c.unit === u);
export const chapterById = (id: string) => CHAPTERS.find((c) => c.id === id);
export const chapterBySlug = (unit: UnitId, slug: string) => CHAPTERS.find((c) => c.unit === unit && c.slug === slug);

export const notesHref = (c: Chapter, view: "cheat" | "full" = "cheat") => `/module-1/${unitById(c.unit).slug}/${c.slug}${view === "full" ? "?view=full" : ""}`;
export const practiceHref = (c: Chapter, view: "quiz" | "questions" = "quiz") => `/module-2/${unitById(c.unit).slug}/${c.slug}${view === "questions" ? "?view=questions" : ""}`;
