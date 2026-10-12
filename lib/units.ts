import type { Unit, UnitId } from "./types";

export const UNITS: Unit[] = [
  {
    id: "u1",
    slug: "business-activity",
    number: 1,
    name: "Business Activity",
    short: "Business Activity",
    tagline: "Enterprise, ownership, markets, the outside world and growth.",
    hex: "#4F46E5",
    rgb: [79, 70, 229],
    soft: [165, 180, 252],
    icon: "lightbulb",
    caseStudy: {
      name: "Crescent Juices Ltd",
      blurb:
        "A family-run private limited company that bottles fruit juice and sells through supermarkets and small neighbourhood shops.",
    },
  },
  {
    id: "u2",
    slug: "people-in-business",
    number: 2,
    name: "People in Business",
    short: "People / HR",
    tagline: "Structures, hiring, training, motivation and leadership.",
    hex: "#E11D48",
    rgb: [225, 29, 72],
    soft: [253, 164, 175],
    icon: "users",
    caseStudy: {
      name: "FreshMart",
      blurb: "A 12-store supermarket chain with 240 employees, a tall hierarchy and rising staff turnover.",
    },
  },
  {
    id: "u3",
    slug: "marketing",
    number: 3,
    name: "Marketing",
    short: "Marketing",
    tagline: "Research, product, price, promotion and place.",
    hex: "#059669",
    rgb: [5, 150, 105],
    soft: [110, 231, 183],
    icon: "megaphone",
    caseStudy: {
      name: "Zing Drinks",
      blurb: "A mid-sized soft-drink brand launching 'Zing Zero', a sugar-free energy drink aimed at 16-25 year olds.",
    },
  },
  {
    id: "u4",
    slug: "business-operations",
    number: 4,
    name: "Business Operations",
    short: "Operations",
    tagline: "Production, efficiency, quality, supply chains and location.",
    hex: "#0891B2",
    rgb: [8, 145, 178],
    soft: [103, 232, 249],
    icon: "factory",
    caseStudy: {
      name: "Golden Crust Biscuits",
      blurb: "A biscuit manufacturer using batch production and considering moving to automated flow production.",
    },
  },
  {
    id: "u5",
    slug: "finance",
    number: 5,
    name: "Financial Information & Decisions",
    short: "Finance",
    tagline: "Sources of finance, break-even, cash flow, accounts and appraisal.",
    hex: "#D97706",
    rgb: [217, 119, 6],
    soft: [252, 211, 77],
    icon: "landmark",
    caseStudy: {
      name: "Daily Basket",
      blurb: "An owner-run convenience store weighing up a second shop and how to pay for it.",
    },
  },
];

export const HOME_ACCENT = { rgb: [226, 178, 74] as [number, number, number], soft: [243, 214, 140] as [number, number, number], hex: "#E2B24A" };

export const unitById = (id: UnitId): Unit => UNITS.find((u) => u.id === id)!;
export const unitBySlug = (slug: string): Unit | undefined => UNITS.find((u) => u.slug === slug);

/** CSS custom properties that drive the animated accent system. */
export function accentVars(rgb: [number, number, number], soft: [number, number, number]): Record<string, string> {
  return {
    "--ar": String(rgb[0]),
    "--ag": String(rgb[1]),
    "--ab": String(rgb[2]),
    "--sr": String(soft[0]),
    "--sg": String(soft[1]),
    "--sb": String(soft[2]),
  };
}

export function unitVars(u: Unit) {
  return accentVars(u.rgb, u.soft);
}
