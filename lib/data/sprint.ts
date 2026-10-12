import type { UnitId } from "../types";

export interface SprintDay {
  day: number;
  date: Date;
  title: string;
  unit: UnitId | "mixed";
  hours: number;
  tasks: string[];
  link: { label: string; href: string }[];
}

/** Day 1 = 19 Oct 2026 ... Day 10 = 28 Oct 2026. Exam: 29 Oct 2026. */
const d = (day: number) => new Date(2026, 9, 18 + day, 0, 0, 0);

export const WARMUP = {
  title: "Warm-up Week (12 to 18 October)",
  tasks: [
    "Take the mixed 20-question diagnostic and note your three weakest topics.",
    "Read the cheat sheets for Units 5 and 1 (maths-heavy and definition-heavy: highest return per hour).",
    "Copy every formula onto one page and test yourself daily.",
    "Attend your remaining classes with a list of questions from the diagnostic.",
  ],
  link: [
    { label: "Diagnostic quiz", href: "/module-2/mixed" },
    { label: "Formula check: Finance", href: "/module-1/finance" },
  ],
};

export const SPRINT: SprintDay[] = [
  {
    day: 1,
    date: d(1),
    title: "Business Activity I: enterprise, ownership & aims",
    unit: "u1",
    hours: 3,
    tasks: [
      "Learn the 6 ownership types: liability, shares, control.",
      "Memorise added value, opportunity cost, SMART.",
      "Quiz: Unit 1 (aim 16/20).",
      "Write the 3-mark answer on limited liability from memory.",
    ],
    link: [
      { label: "Cheat sheet", href: "/module-1/business-activity" },
      { label: "Unit 1 practice", href: "/module-2/business-activity" },
    ],
  },
  {
    day: 2,
    date: d(2),
    title: "Finance I: sources of finance, costs & break-even",
    unit: "u5",
    hours: 3.5,
    tasks: [
      "Break-even: do 5 calculations with the slider lab.",
      "Margin of safety and target profit: learn both formulas.",
      "Match every source of finance to a use and a business type.",
      "Quiz: Unit 5 (first 10 questions).",
    ],
    link: [
      { label: "Cheat sheet", href: "/module-1/finance" },
      { label: "Unit 5 practice", href: "/module-2/finance" },
    ],
  },
  {
    day: 3,
    date: d(3),
    title: "Finance II: cash flow, accounts, ratios & appraisal",
    unit: "u5",
    hours: 3.5,
    tasks: [
      "Cash flow table: complete 2 forecasts and check each opening balance.",
      "Ratios: gross margin, net margin, ROCE. Say why each moved.",
      "ARR and payback: use the investment lab.",
      "Write the 12-mark Daily Basket answer under timed conditions.",
    ],
    link: [
      { label: "Cash flow & ratios", href: "/module-1/finance#u5-cashflow" },
      { label: "12-mark bank", href: "/module-2/finance?tab=bank" },
    ],
  },
  {
    day: 4,
    date: d(4),
    title: "People I: structures, recruitment & training",
    unit: "u2",
    hours: 3,
    tasks: [
      "Draw tall vs flat from memory and list 2 pros and 2 cons of each.",
      "Job description vs person specification: write one of each.",
      "Internal vs external recruitment table.",
      "Quiz: Unit 2 (first 10 questions).",
    ],
    link: [
      { label: "Cheat sheet", href: "/module-1/people-in-business" },
      { label: "Unit 2 practice", href: "/module-2/people-in-business" },
    ],
  },
  {
    day: 5,
    date: d(5),
    title: "People II: motivation, leadership + Unit 1 market forces",
    unit: "u2",
    hours: 3.5,
    tasks: [
      "Maslow and Herzberg: link each to a workplace example.",
      "Leadership styles: match style to situation.",
      "Supply and demand: draw three shifts with correct labels.",
      "Quiz: remaining Unit 2 and 1.3 and 1.4 questions.",
    ],
    link: [
      { label: "Motivation", href: "/module-1/people-in-business#u2-motivation" },
      { label: "Supply & demand", href: "/module-1/business-activity#u1-markets" },
    ],
  },
  {
    day: 6,
    date: d(6),
    title: "Marketing I: research, segmentation, PLC & Boston Matrix",
    unit: "u3",
    hours: 3,
    tasks: [
      "Primary vs secondary: 2 pros and 2 cons each.",
      "Draw the PLC with an extension strategy and label each stage.",
      "Classify five products on the Boston Matrix and state the strategy for each.",
      "Quiz: Unit 3 (first 10 questions).",
    ],
    link: [
      { label: "Cheat sheet", href: "/module-1/marketing" },
      { label: "Unit 3 practice", href: "/module-2/marketing" },
    ],
  },
  {
    day: 7,
    date: d(7),
    title: "Marketing II: price, promotion, place + 6-mark drills",
    unit: "u3",
    hours: 3.5,
    tasks: [
      "Name 6 pricing strategies with one FMCG example each.",
      "Match promotion methods to target market and budget.",
      "Write two 6-mark answers (PEEL ×2 with context).",
      "Quiz: remaining Unit 3 questions.",
    ],
    link: [
      { label: "Price & promotion", href: "/module-1/marketing#u3-price" },
      { label: "6-mark bank", href: "/module-2/marketing?tab=bank" },
    ],
  },
  {
    day: 8,
    date: d(8),
    title: "Operations I: production, scale & quality",
    unit: "u4",
    hours: 3,
    tasks: [
      "Job vs batch vs flow: match each to a product.",
      "Economies of scale: 5 types, each with a one-line example.",
      "Capacity utilisation and average cost calculations.",
      "Quiz: Unit 4 (first 10 questions).",
    ],
    link: [
      { label: "Cheat sheet", href: "/module-1/business-operations" },
      { label: "Unit 4 practice", href: "/module-2/business-operations" },
    ],
  },
  {
    day: 9,
    date: d(9),
    title: "Operations II + Growth: supply chain, location, tech & growth",
    unit: "u4",
    hours: 4,
    tasks: [
      "JIT vs just-in-case: when does each work?",
      "Location factors for retail vs manufacturing.",
      "Merger vs takeover; horizontal vs vertical integration.",
      "Timed: one 9-mark and one 12-mark answer, then self-mark with the AO grid.",
    ],
    link: [
      { label: "Supply & location", href: "/module-1/business-operations#u4-supply" },
      { label: "9 and 12-mark bank", href: "/module-2/business-operations?tab=bank" },
    ],
  },
  {
    day: 10,
    date: d(10),
    title: "Final consolidation: red flags, formulas & rest",
    unit: "mixed",
    hours: 2.5,
    tasks: [
      "Read the full Examiner's Red Flag Trap Log once.",
      "Recite all formulas from memory, then check.",
      "One mixed 20-question quiz, review errors only.",
      "Pack your bag, set two alarms, then stop. Sleep beats cramming.",
    ],
    link: [
      { label: "Trap log", href: "/traps" },
      { label: "Mixed quiz", href: "/module-2/mixed" },
    ],
  },
];
