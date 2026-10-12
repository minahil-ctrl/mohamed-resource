export interface SprintDay {
  day: number;
  date: Date;
  title: string;
  /** chapter ids ("c28") covered that day */
  topics: string[];
  extras?: string[];
}

/** Day 1 = 19 Oct 2026 ... Day 10 = 28 Oct 2026. Exam: 29 Oct 2026. All 45 chapters are covered. */
const d = (day: number) => new Date(2026, 9, 18 + day, 0, 0, 0);

export const SPRINT: SprintDay[] = [
  { day: 1, date: d(1), title: "Business Activity, Objectives & Measuring Success", topics: ["c1", "c2", "c7", "c14", "c15"] },
  { day: 2, date: d(2), title: "Business Ownership & Location", topics: ["c3", "c4", "c5", "c6", "c8"] },
  { day: 3, date: d(3), title: "Globalisation, Trade & the External Environment", topics: ["c9", "c10", "c11", "c12", "c13"] },
  { day: 4, date: d(4), title: "People in Business: Structure, Recruitment, Law & Training", topics: ["c23", "c24", "c18", "c19", "c20"] },
  { day: 5, date: d(5), title: "Communication & Motivation", topics: ["c16", "c17", "c21", "c22"] },
  { day: 6, date: d(6), title: "Marketing: Research, Segmentation & Product", topics: ["c33", "c34", "c35", "c36"] },
  { day: 7, date: d(7), title: "Marketing Mix: Price, Place & Promotion", topics: ["c37", "c38", "c39"], extras: ["Take Mock Exam 1 sections on marketing"] },
  { day: 8, date: d(8), title: "Business Operations: Scale, Production, Lean, Technology & Quality", topics: ["c40", "c41", "c42", "c43", "c44", "c45"] },
  { day: 9, date: d(9), title: "Finance I: Sources, Cash Flow, Costs & Break-even", topics: ["c25", "c26", "c27", "c28"] },
  {
    day: 10,
    date: d(10),
    title: "Finance II: Accounts & Ratios, Full Mock Sprint & Exam Strategy",
    topics: ["c29", "c30", "c31", "c32"],
    extras: ["Sit a full mock exam (Mock 1, 2 or 3) under timed conditions", "Read the AO3 / AO4 marker guide", "Review everything you starred"],
  },
];
