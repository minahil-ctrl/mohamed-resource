import { ALL_EXAMS, ALL_MCQS, ALL_TOPICS } from "./data";
import { unitById } from "./units";
import type { UnitId } from "./types";

export type HitKind = "Topic" | "Term" | "Formula" | "Application" | "Red flag" | "Quiz" | "Exam Q";

export interface Hit {
  kind: HitKind;
  title: string;
  snippet: string;
  unit: UnitId;
  href: string;
  haystack: string;
  weight: number;
}

function build(): Hit[] {
  const hits: Hit[] = [];
  for (const t of ALL_TOPICS) {
    const u = unitById(t.unit);
    const base = `/module-1/${u.slug}`;
    hits.push({
      kind: "Topic",
      title: `${t.code} ${t.title}`,
      snippet: t.blurb,
      unit: t.unit,
      href: `${base}#${t.id}`,
      haystack: `${t.title} ${t.blurb} ${t.points.join(" ")}`.toLowerCase(),
      weight: 3,
    });
    for (const k of t.terms) {
      hits.push({
        kind: "Term",
        title: k.term,
        snippet: k.def,
        unit: t.unit,
        href: `${base}#${t.id}`,
        haystack: `${k.term} ${k.def}`.toLowerCase(),
        weight: 4,
      });
    }
    for (const f of t.formulas ?? []) {
      hits.push({
        kind: "Formula",
        title: f.name,
        snippet: f.expr,
        unit: t.unit,
        href: `${base}#${t.id}`,
        haystack: `${f.name} ${f.expr} ${f.note ?? ""}`.toLowerCase(),
        weight: 4,
      });
    }
    for (const a of t.applications) {
      hits.push({
        kind: "Application",
        title: a.title,
        snippet: a.scenario,
        unit: t.unit,
        href: `${base}#${t.id}`,
        haystack: `${a.title} ${a.concept} ${a.scenario}`.toLowerCase(),
        weight: 2,
      });
    }
    for (const r of t.redFlags) {
      hits.push({
        kind: "Red flag",
        title: r.length > 70 ? `${r.slice(0, 68)}…` : r,
        snippet: r,
        unit: t.unit,
        href: `${base}#${t.id}`,
        haystack: r.toLowerCase(),
        weight: 1,
      });
    }
  }
  ALL_MCQS.forEach((q) => {
    const u = unitById(q.unit);
    const idx = Number(q.id.split("-q")[1]) - 1;
    hits.push({
      kind: "Quiz",
      title: q.q,
      snippet: `Correct: ${q.options[q.answer]}`,
      unit: q.unit,
      href: `/module-2/${u.slug}?tab=quiz&q=${idx}`,
      haystack: `${q.q} ${q.options.join(" ")}`.toLowerCase(),
      weight: 1,
    });
  });
  ALL_EXAMS.forEach((q) => {
    const u = unitById(q.unit);
    hits.push({
      kind: "Exam Q",
      title: `${q.marks} marks · ${q.question}`,
      snippet: q.stimulus ?? q.indicative[0],
      unit: q.unit,
      href: `/module-2/${u.slug}?tab=bank&open=${q.id}`,
      haystack: `${q.question} ${q.stimulus ?? ""} ${q.indicative.join(" ")}`.toLowerCase(),
      weight: 1,
    });
  });
  return hits;
}

let INDEX: Hit[] | null = null;

export function search(query: string, limit = 14): Hit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  INDEX = INDEX ?? build();
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored: { h: Hit; s: number }[] = [];
  for (const h of INDEX) {
    if (!tokens.every((t) => h.haystack.includes(t))) continue;
    const title = h.title.toLowerCase();
    let s = h.weight;
    if (title === q) s += 20;
    else if (title.startsWith(q)) s += 12;
    else if (title.includes(q)) s += 8;
    for (const t of tokens) if (title.includes(t)) s += 2;
    scored.push({ h, s });
  }
  scored.sort((a, b) => b.s - a.s);
  // keep a mix of kinds: at most 4 of the lowest-weight kinds
  const out: Hit[] = [];
  const perKind: Record<string, number> = {};
  for (const { h } of scored) {
    perKind[h.kind] = (perKind[h.kind] ?? 0) + 1;
    if (perKind[h.kind] > 5) continue;
    out.push(h);
    if (out.length >= limit) break;
  }
  return out;
}
