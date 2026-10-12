import type { MCQ } from "./types";
import { CHAPTERS, type Chapter } from "./content";

/** First sentence, capped, so options stay readable. */
function short(def: string, max = 130): string {
  const first = def.split(/(?<=[.;])\s/)[0].trim();
  const t = first.length > max ? first.slice(0, max).replace(/\s+\S*$/, "") + "…" : first;
  return t.replace(/\.$/, "");
}

/**
 * Vocabulary questions generated from the chapter's key-terms table.
 * Alternates "which term?" and "what does this term mean?"; every option is explained in one line.
 * Distractors come from the same chapter first, then from other chapters in the same unit.
 */
export function autoMcqs(ch: Chapter, limit = 8): MCQ[] {
  const own = ch.terms.filter((t) => t.term.length < 60 && t.def.length > 12);
  if (own.length < 2) return [];
  const pool = [...own, ...CHAPTERS.filter((c) => c.unit === ch.unit && c.id !== ch.id).flatMap((c) => c.terms.filter((t) => t.term.length < 60 && t.def.length > 12))];
  const out: MCQ[] = [];

  own.slice(0, limit).forEach((t, i) => {
    const distract: typeof own = [];
    // rotate through the pool deterministically
    for (let k = 1; distract.length < 3 && k <= pool.length; k++) {
      const cand = pool[(i * 3 + k * 2 + 1) % pool.length];
      if (cand.term !== t.term && !distract.some((d) => d.term === cand.term)) distract.push(cand);
    }
    if (distract.length < 3) return;

    const all = [t, ...distract];
    const rot = (i * 3 + 1) % 4; // spread the correct answer across A-D
    const order = all.map((_, j) => all[(j - rot + 4) % 4]);
    const answer = order.findIndex((x) => x.term === t.term) as 0 | 1 | 2 | 3;

    if (i % 2 === 0) {
      out.push({
        id: `${ch.id}-auto${i + 1}`,
        unit: ch.unit,
        topic: ch.id,
        q: `Which term is defined as: "${short(t.def, 170)}"?`,
        options: order.map((x) => x.term) as MCQ["options"],
        answer,
        why: order.map((x) => (x.term === t.term ? `Correct: ${x.term} means exactly this.` : `Wrong: ${x.term} means ${short(x.def, 90)}.`)) as MCQ["why"],
      });
    } else {
      out.push({
        id: `${ch.id}-auto${i + 1}`,
        unit: ch.unit,
        topic: ch.id,
        q: `What does "${t.term}" mean?`,
        options: order.map((x) => short(x.def, 110)) as MCQ["options"],
        answer,
        why: order.map((x) => (x.term === t.term ? `Correct: this is the definition of ${t.term}.` : `Wrong: this describes ${x.term}.`)) as MCQ["why"],
      });
    }
  });
  return out;
}
