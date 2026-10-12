export type UnitId = "u1" | "u2" | "u3" | "u4" | "u5";

export type GraphId =
  | "supply-demand"
  | "plc"
  | "boston"
  | "breakeven"
  | "org"
  | "maslow"
  | "ratios"
  | "investment"
  | "cashflow";

export interface KeyTerm {
  term: string;
  def: string;
}

export interface Formula {
  name: string;
  expr: string;
  note?: string;
}

export interface Application {
  title: string;
  concept: string;
  scenario: string;
  /** How to phrase this for AO2 (application) marks */
  tip: string;
}

export interface Topic {
  id: string;
  code: string;
  title: string;
  blurb: string;
  points: string[];
  terms: KeyTerm[];
  formulas?: Formula[];
  redFlags: string[];
  applications: Application[];
  graphs?: GraphId[];
}

export interface Unit {
  id: UnitId;
  slug: string;
  number: number;
  name: string;
  short: string;
  tagline: string;
  hex: string;
  /** accent rgb triplet */
  rgb: [number, number, number];
  /** lighter tint used for text on dark */
  soft: [number, number, number];
  icon: "lightbulb" | "users" | "megaphone" | "factory" | "landmark";
  caseStudy: { name: string; blurb: string };
}

export interface MCQ {
  id: string;
  unit: UnitId;
  topic: string;
  q: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  /** one explanation per option: why right / why wrong */
  why: [string, string, string, string];
}

export type ExamMarks = 2 | 3 | 6 | 9 | 12;

export interface AOSplit {
  ao1: number;
  ao2: number;
  ao3: number;
  ao4: number;
}

export interface ExamQ {
  id: string;
  unit: UnitId;
  topic: string;
  marks: ExamMarks;
  command: string;
  stimulus?: string;
  question: string;
  indicative: string[];
  model: string;
  traps: string[];
}
