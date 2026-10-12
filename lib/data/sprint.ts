export interface SprintDay {
  day: number;
  date: Date;
  title: string;
  /** topic ids covered (resolved to codes and links in the UI) */
  topics: string[];
  extras?: string[];
}

/** Day 1 = 19 Oct 2026 ... Day 10 = 28 Oct 2026. Exam: 29 Oct 2026. */
const d = (day: number) => new Date(2026, 9, 18 + day, 0, 0, 0);

export const SPRINT: SprintDay[] = [
  { day: 1, date: d(1), title: "Business Activity & Enterprise", topics: ["u1-enterprise", "u1-markets", "u1-growth"] },
  { day: 2, date: d(2), title: "Business Ownership, Location & External Environment (PESTLE)", topics: ["u1-ownership", "u1-location", "u1-external"] },
  { day: 3, date: d(3), title: "People in Business: Structure, Recruitment & Training", topics: ["u2-structure", "u2-recruit", "u2-training"] },
  { day: 4, date: d(4), title: "Motivation & Communication", topics: ["u2-motivation", "u2-leadership"] },
  { day: 5, date: d(5), title: "Marketing: Research & Segmentation", topics: ["u3-research", "u3-product"] },
  { day: 6, date: d(6), title: "Marketing Mix (4 Ps) & Strategy", topics: ["u3-price", "u3-promotion", "u3-place"] },
  { day: 7, date: d(7), title: "Business Operations & Production Methods", topics: ["u4-production", "u4-scale", "u4-quality", "u4-supply"] },
  { day: 8, date: d(8), title: "Finance: Sources of Finance & Cash Flow Forecasting", topics: ["u5-sources", "u5-cashflow"] },
  { day: 9, date: d(9), title: "Finance: Costs, Break-even, Income Statements & Balance Sheets", topics: ["u5-breakeven", "u5-statements"] },
  {
    day: 10,
    date: d(10),
    title: "Ratio Analysis, Full Syllabus Mock Sprint & Exam Strategy",
    topics: ["u5-ratios", "u5-invest"],
    extras: ["Mixed 20-question mock", "Timed 9 and 12-mark answers", "Read the AO3 / AO4 guide"],
  },
];
