/**
 * The 26 hand-written cheat-sheet topics (points, advantage/disadvantage tables, red flags,
 * graphs, AO2 examples) are attached to the repo's 45 chapters here.
 * Chapter ids are "c" + chapter number from the content repo.
 */
export const OLD_TO_CHAPTER: Record<string, string> = {
  "u1-enterprise": "c1",
  "u1-ownership": "c6",
  "u1-location": "c8",
  "u1-growth": "c10",
  "u1-markets": "c13",
  "u1-external": "c13",
  "u2-leadership": "c16",
  "u2-recruit": "c18",
  "u2-training": "c20",
  "u2-motivation": "c22",
  "u2-structure": "c23",
  "u5-sources": "c25",
  "u5-cashflow": "c26",
  "u5-breakeven": "c28",
  "u5-statements": "c29",
  "u5-ratios": "c31",
  "u5-invest": "c32",
  "u3-research": "c33",
  "u3-product": "c36",
  "u3-price": "c37",
  "u3-place": "c38",
  "u3-promotion": "c39",
  "u4-scale": "c40",
  "u4-production": "c41",
  "u4-supply": "c42",
  "u4-quality": "c45",
};

export const CHAPTER_EXTRAS: Record<string, string[]> = {};
for (const [old, ch] of Object.entries(OLD_TO_CHAPTER)) (CHAPTER_EXTRAS[ch] ??= []).push(old);
