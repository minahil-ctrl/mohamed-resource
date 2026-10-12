import { Briefcase, Calculator, Lightbulb, Target } from "lucide-react";
import type { Chapter } from "@/lib/content";
import { CHAPTER_EXTRAS } from "@/lib/data/extras";
import { legacyTopic } from "@/lib/data";
import { COMPARE } from "@/lib/data/compare";
import GraphSwitch from "@/components/graphs/GraphSwitch";
import Marker from "@/components/ui/Marker";
import { ApplicationCard, CompareTable, Fold, RedFlagBanner } from "./TopicCard";

/** One-screen revision sheet: key definition, formulas, must-know points, tables, diagrams, traps. */
export default function ChapterCheatSheet({ ch, expanded = false }: { ch: Chapter; expanded?: boolean }) {
  const extras = (CHAPTER_EXTRAS[ch.id] ?? []).map(legacyTopic).filter((t): t is NonNullable<typeof t> => !!t);
  const [keyTerm, ...otherTerms] = ch.terms;

  const formulas = [
    ...ch.formulas.map((f) => ({ name: "", expr: f })),
    ...extras.flatMap((t) => (t.formulas ?? []).map((f) => ({ name: f.name, expr: f.expr }))),
  ].filter((f, i, a) => a.findIndex((x) => x.expr.replace(/\s/g, "") === f.expr.replace(/\s/g, "")) === i);

  const points = extras.length ? extras.flatMap((t) => t.points.slice(0, 6)).slice(0, 8) : ch.objectives.slice(0, 8);
  const compare = extras.flatMap((t) => COMPARE[t.id] ?? []);
  const graphs = [...new Set(extras.flatMap((t) => t.graphs ?? []))];
  const flags = [...ch.flags, ...extras.flatMap((t) => t.redFlags)];
  const apps = extras.flatMap((t) => t.applications);
  const mid = (k: string, i: number) => `${ch.id}-${k}${i}`;

  return (
    <div className="space-y-6">
      {keyTerm && (
        <section id={mid("key", 0)} className="pat mark-target avoid-break rounded-2xl border-2 border-lime-ink bg-lime/[0.12] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="eyebrow mb-2">Key definition · learn word for word</p>
            <Marker id={mid("key", 0)} label={`${keyTerm.term}: ${keyTerm.def}`} />
          </div>
          <p className="text-xl font-extrabold text-lime-ink sm:text-2xl">{keyTerm.term}</p>
          <p className="mt-1.5 max-w-3xl text-lg leading-snug text-white">{keyTerm.def}</p>
          {keyTerm.example && <p className="mt-2 max-w-3xl text-sm italic text-white/60">e.g. {keyTerm.example}</p>}
        </section>
      )}

      {formulas.length > 0 && (
        <section>
          <h4 className="eyebrow mb-2 flex items-center gap-1.5">
            <Calculator className="h-3.5 w-3.5" /> Formulas
          </h4>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {formulas.map((f, i) => (
              <div key={f.expr} id={mid("f", i)} className="mark-target avoid-break flex items-start justify-between gap-2 rounded-xl border border-lime-ink/50 bg-lime/[0.1] px-4 py-3">
                <div>
                  {f.name && <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">{f.name}</p>}
                  <p className="num text-[15px] font-bold text-lime-ink">{f.expr}</p>
                </div>
                <Marker id={mid("f", i)} label={`${f.name ? f.name + ": " : ""}${f.expr}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h4 className="eyebrow mb-3 flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5" /> {extras.length ? "Must-know points" : "You must be able to"}
        </h4>
        <ol className="grid gap-3 md:grid-cols-2">
          {points.map((p, i) => (
            <li key={p} id={mid("p", i)} className="mark-target avoid-break flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <span className="num grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/25 text-sm font-extrabold text-accent-ink">{i + 1}</span>
              <span className="flex-1 text-[15px] leading-relaxed text-white/90">{p}</span>
              <Marker id={mid("p", i)} label={p} className="self-start" />
            </li>
          ))}
        </ol>
      </section>

      {compare.length > 0 && (
        <section>
          <h4 className="eyebrow mb-3">Advantages vs disadvantages</h4>
          <div className={`grid gap-4 ${compare.length > 1 ? "lg:grid-cols-2" : ""}`}>
            {compare.map((c) => (
              <CompareTable key={c.title} {...c} />
            ))}
          </div>
        </section>
      )}

      {graphs.length > 0 && (
        <div className="space-y-6">
          {graphs.map((g) => (
            <GraphSwitch key={g} id={g} />
          ))}
        </div>
      )}

      {(flags.length > 0 || ch.tips.length > 0) && (
        <div className="space-y-3">
          {flags.length > 0 && <RedFlagBanner flags={flags} />}
          {ch.tips.length > 0 && (
            <aside className="avoid-break rounded-2xl border border-accent bg-accent/[0.1] p-5">
              <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-ink">
                <Lightbulb className="h-4 w-4" /> Exam tips
              </p>
              <ul className="space-y-2">
                {ch.tips.map((t, i) => (
                  <li key={t} id={mid("t", i)} className="mark-target flex gap-2 text-sm leading-relaxed text-white/90">
                    <span className="flex-1">{t}</span>
                    <Marker id={mid("t", i)} label={t} className="self-start" />
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      )}

      <div className="space-y-3">
        {otherTerms.length > 0 && (
          <Fold label={`More key terms (${otherTerms.length})`} open={expanded || otherTerms.length <= 6}>
            <dl className="grid gap-2.5 md:grid-cols-2">
              {otherTerms.map((t, i) => (
                <div key={t.term} id={mid("k", i + 1)} className="mark-target avoid-break flex items-start justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div>
                    <dt className="text-sm font-bold text-lime-ink">{t.term}</dt>
                    <dd className="mt-0.5 text-[13px] leading-relaxed text-white/80">{t.def}</dd>
                  </div>
                  <Marker id={mid("k", i + 1)} label={`${t.term}: ${t.def}`} />
                </div>
              ))}
            </dl>
          </Fold>
        )}
        {apps.length > 0 && (
          <Fold label="Real-world examples to quote (AO2)" open={expanded}>
            <div className="grid gap-4 md:grid-cols-2">
              {apps.map((a) => (
                <ApplicationCard key={a.title} a={a} />
              ))}
            </div>
          </Fold>
        )}
        {ch.cases.length > 0 && (
          <Fold label={`Case studies to name-drop (${ch.cases.length}), details in Full notes`} open={expanded}>
            <ul className="space-y-1.5 text-sm text-white/85">
              {ch.cases.map((c) => (
                <li key={c} className="flex gap-2">
                  <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
                  {c}
                </li>
              ))}
            </ul>
          </Fold>
        )}
      </div>
    </div>
  );
}
