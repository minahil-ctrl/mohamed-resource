import type { Unit, UnitId } from "./types";

export const UNITS: Unit[] = [
  {
    id: "u1",
    slug: "business-activity",
    number: 1,
    name: "Business Activity",
    short: "Business Activity",
    tagline: "Enterprise, ownership, markets, the outside world and growth.",
    hex: "#74C365",
    rgb: [116, 195, 101],
    soft: [219, 230, 76],
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
    hex: "#74C365",
    rgb: [116, 195, 101],
    soft: [219, 230, 76],
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
    hex: "#74C365",
    rgb: [116, 195, 101],
    soft: [219, 230, 76],
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
    hex: "#74C365",
    rgb: [116, 195, 101],
    soft: [219, 230, 76],
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
    hex: "#74C365",
    rgb: [116, 195, 101],
    soft: [219, 230, 76],
    icon: "landmark",
    caseStudy: {
      name: "Daily Basket",
      blurb: "An owner-run convenience store weighing up a second shop and how to pay for it.",
    },
  },
];

export const HOME_ACCENT = { rgb: [116, 195, 101] as [number, number, number], soft: [219, 230, 76] as [number, number, number], hex: "#74C365" };

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
