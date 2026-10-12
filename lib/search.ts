import { ALL_EXAMS, ALL_MCQS } from "./data";
import { CHAPTERS, notesHref, practiceHref } from "./content";
import { unitById } from "./units";
import type { UnitId } from "./types";

export type HitKind = "Topic" | "Term" | "Formula" | "Question" | "Quiz" | "Exam Q";

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
  for (const c of CHAPTERS) {
    hits.push({
      kind: "Topic",
      title: `${c.code} ${c.title}`,
      snippet: c.objectives[0] ?? "",
      unit: c.unit,
      href: notesHref(c),
      haystack: `${c.title} ${c.objectives.join(" ")} ${c.why}`.toLowerCase(),
      weight: 3,
    });
    for (const t of c.terms) {
      hits.push({ kind: "Term", title: t.term, snippet: t.def, unit: c.unit, href: notesHref(c), haystack: `${t.term} ${t.def}`.toLowerCase(), weight: 4 });
    }
    for (const f of c.formulas) {
      hits.push({ kind: "Formula", title: f.split("=")[0].trim(), snippet: f, unit: c.unit, href: notesHref(c), haystack: f.toLowerCase(), weight: 4 });
    }
    for (const q of c.questions) {
      hits.push({
        kind: "Question",
        title: `${q.marks} marks · ${q.text}`,
        snippet: `${c.code} ${c.title}`,
        unit: c.unit,
        href: practiceHref(c, "questions"),
        haystack: q.text.toLowerCase(),
        weight: 1,
      });
    }
  }
  ALL_MCQS.forEach((q) => {
    const c = CHAPTERS.find((x) => x.id === q.topic);
    hits.push({
      kind: "Quiz",
      title: q.q,
      snippet: `Correct: ${q.options[q.answer]}`,
      unit: q.unit,
      href: c ? practiceHref(c) : `/module-2/${unitById(q.unit).slug}`,
      haystack: `${q.q} ${q.options.join(" ")}`.toLowerCase(),
      weight: 1,
    });
  });
  ALL_EXAMS.forEach((q) => {
    const c = CHAPTERS.find((x) => x.id === q.topic);
    hits.push({
      kind: "Exam Q",
      title: `${q.marks} marks · ${q.question}`,
      snippet: q.stimulus ?? q.indicative[0],
      unit: q.unit,
      href: c ? `${practiceHref(c, "questions")}${"&open=" + q.id}` : `/module-2/${unitById(q.unit).slug}?tab=bank&open=${q.id}`,
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
