import type { AOSplit, ExamMarks } from "../types";

/**
 * Indicative AO allocation used in this portal. Real Edexcel mark schemes vary by question;
 * treat these as a self-marking checklist rather than the official split.
 */
export const AO_ALLOCATION: Record<ExamMarks, AOSplit> = {
  2: { ao1: 2, ao2: 0, ao3: 0, ao4: 0 },
  3: { ao1: 1, ao2: 0, ao3: 2, ao4: 0 },
  6: { ao1: 1, ao2: 2, ao3: 3, ao4: 0 },
  9: { ao1: 2, ao2: 2, ao3: 2, ao4: 3 },
  12: { ao1: 2, ao2: 3, ao3: 3, ao4: 4 },
};

export const AO_INFO = [
  {
    key: "ao1" as const,
    code: "AO1",
    name: "Knowledge & understanding",
    how: "Define terms, state facts, quote formulas correctly.",
    cue: "A business is…, This means…",
  },
  {
    key: "ao2" as const,
    code: "AO2",
    name: "Application",
    how: "Use the case: names, numbers, products, market details from the stimulus.",
    cue: "For Crescent Juices, with 240 staff…",
  },
  {
    key: "ao3" as const,
    code: "AO3",
    name: "Analysis",
    how: "Build a chain of reasoning: cause, so effect, so consequence.",
    cue: "…which leads to… so…",
  },
  {
    key: "ao4" as const,
    code: "AO4",
    name: "Evaluation",
    how: "Weigh both sides, judge importance, reach a justified conclusion.",
    cue: "On balance… because… although…",
  },
];

export const MARKS_META: Record<
  ExamMarks,
  { label: string; command: string; minutes: number; words: string; structure: string; levels: { range: string; title: string; text: string }[] }
> = {
  2: {
    label: "2-mark",
    command: "Define / State / Identify",
    minutes: 2,
    words: "10 to 25",
    structure: "Definition + example, or two short distinct points. No explanation needed.",
    levels: [
      { range: "1", title: "Partial", text: "Vague or incomplete definition." },
      { range: "2", title: "Full", text: "Accurate definition with the second element or example." },
    ],
  },
  3: {
    label: "3-mark",
    command: "Explain",
    minutes: 4,
    words: "35 to 55",
    structure: "Knowledge point, then ONE developed chain of analysis (cause, effect, consequence in context).",
    levels: [
      { range: "1", title: "Identify", text: "A relevant point with no development." },
      { range: "2", title: "Analyse", text: "Point linked to a consequence for the business." },
      { range: "3", title: "Develop", text: "Chain developed to a clear, logical consequence in context." },
    ],
  },
  6: {
    label: "6-mark",
    command: "Analyse",
    minutes: 8,
    words: "100 to 150",
    structure: "Two developed chains in context (PEEL ×2). No conclusion required.",
    levels: [
      { range: "1-2", title: "Level 1", text: "Isolated knowledge, little or no context, no chain." },
      { range: "3-4", title: "Level 2", text: "Some application and a partly developed chain." },
      { range: "5-6", title: "Level 3", text: "Fully developed, logical chains throughout, firmly in context." },
    ],
  },
  9: {
    label: "9-mark",
    command: "Evaluate",
    minutes: 12,
    words: "180 to 250",
    structure: "Define briefly, two chains for one side, one or two for the other, then a justified judgement.",
    levels: [
      { range: "1-3", title: "Level 1", text: "Mainly knowledge; description; no judgement." },
      { range: "4-6", title: "Level 2", text: "Applied analysis of both sides; judgement weak or unsupported." },
      { range: "7-9", title: "Level 3", text: "Balanced, developed analysis and a supported, contextual judgement." },
    ],
  },
  12: {
    label: "12-mark",
    command: "Justify / Assess / Evaluate",
    minutes: 16,
    words: "250 to 350",
    structure: "Decision up front or at the end, three weighted arguments, reject the alternative, conditions or risks.",
    levels: [
      { range: "1-4", title: "Level 1", text: "Generic points; list; no clear decision." },
      { range: "5-8", title: "Level 2", text: "Developed arguments in context; conclusion present but weakly justified." },
      { range: "9-12", title: "Level 3", text: "Balanced, in-context analysis; a clear, justified decision that weighs evidence and alternatives." },
    ],
  },
};

export const COMMAND_WORDS = [
  { word: "State / Identify / Name", marks: "1-2", means: "Give a fact. No explanation.", ao: "AO1" },
  { word: "Define", marks: "2", means: "Give the meaning, plus an example if marks allow.", ao: "AO1" },
  { word: "Calculate", marks: "2-4", means: "Show the formula, working and answer with units/%.", ao: "AO1-AO2" },
  { word: "Explain", marks: "3", means: "Point, then because, then so (one chain).", ao: "AO1-AO3" },
  { word: "Analyse", marks: "6", means: "Develop two chains of reasoning in context.", ao: "AO2-AO3" },
  { word: "Evaluate / Assess", marks: "9", means: "Weigh up both sides and make a supported judgement.", ao: "AO3-AO4" },
  { word: "Justify", marks: "12", means: "Make a decision and defend it with evidence; reject the alternatives.", ao: "AO3-AO4" },
];

export const TOP_TRAPS = [
  { trap: "Not using the case", fix: "In every 3+ mark answer, name the business or use one number from the stimulus. This is the AO2 mark." },
  { trap: "Listing instead of chaining", fix: "Replace 'and' with 'which means', 'so' and 'therefore'. One developed point beats three bare ones." },
  { trap: "No conclusion on 9 or 12 markers", fix: "Last paragraph starts 'On balance…' and gives a decision with a reason and a condition." },
  { trap: "Confusing profit and cash", fix: "Profit = revenue − costs. Cash = money actually in the bank at that time. Do not swap them." },
  { trap: "Mark-up vs margin", fix: "Mark-up divides profit by COST. Margin divides profit by SELLING PRICE." },
  { trap: "Forgetting units and %", fix: "Break-even and margin of safety in units, ratios in %, money with a currency sign. Always." },
  { trap: "Mixing up shift vs movement", fix: "A price change moves ALONG a curve. Any other factor SHIFTS the curve." },
  { trap: "One-sided answers", fix: "Every evaluation needs an 'however…' sentence that gives the strongest counter-argument." },
  { trap: "Generic textbook answers", fix: "If your sentence could be written about any firm, rewrite it with a detail from this firm." },
  { trap: "Poor time management", fix: "About one minute per mark. Leave 5 minutes at the end to add a missing judgement." },
];
