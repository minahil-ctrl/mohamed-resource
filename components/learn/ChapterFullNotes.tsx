import type { Chapter } from "@/lib/content";
import Marker from "@/components/ui/Marker";
import StarMd from "./StarMd";
import { Fold } from "./TopicCard";

/** The complete chapter: objectives, glossary, full explanation, worked examples, case studies. */
export default function ChapterFullNotes({ ch }: { ch: Chapter }) {
  const id = (k: string) => `${ch.id}-full-${k}`;
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {ch.spec && <span className="chip">{ch.spec}</span>}
        {ch.appliesTo && <span className="chip">{ch.appliesTo}</span>}
      </div>

      <section>
        <h3 className="eyebrow mb-3">Learning objectives</h3>
        <ul className="space-y-1.5">
          {ch.objectives.map((o, i) => (
            <li key={o} id={id(`o${i}`)} className="mark-target flex items-start gap-2 text-[15px] text-white/90">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
              <span className="flex-1">{o}</span>
              <Marker id={id(`o${i}`)} label={o} />
            </li>
          ))}
        </ul>
      </section>

      {ch.why && (
        <section id={id("why")} className="mark-target rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="eyebrow mb-2">Why this matters</h3>
            <Marker id={id("why")} label={ch.why} />
          </div>
          <p className="text-[15.5px] leading-relaxed text-white/90">{ch.why}</p>
        </section>
      )}

      <section>
        <h3 className="eyebrow mb-3">Key terms</h3>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-white/[0.06] text-[11px] uppercase tracking-wider text-white/60">
              <tr>
                <th className="px-4 py-2.5">Term</th>
                <th className="px-4 py-2.5">Definition</th>
                <th className="px-4 py-2.5">Example</th>
                <th className="w-[72px]" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {ch.terms.map((t, i) => (
                <tr key={t.term} id={id(`k${i}`)} className="mark-target align-top">
                  <td className="px-4 py-3 font-bold text-lime-ink">{t.term}</td>
                  <td className="px-4 py-3 text-white/90">{t.def}</td>
                  <td className="px-4 py-3 text-white/65">{t.example}</td>
                  <td className="px-2 py-2 text-right">
                    <Marker id={id(`k${i}`)} label={`${t.term}: ${t.def}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="eyebrow mb-1">Full explanation</h3>
        <StarMd md={ch.core} scope={`${ch.id}-core`} />
      </section>

      {ch.largeSmall && (
        <section>
          <h3 className="eyebrow mb-1">Large vs small business</h3>
          <StarMd md={ch.largeSmall} scope={`${ch.id}-ls`} />
        </section>
      )}

      {ch.caseStudiesMd && (
        <section>
          <h3 className="eyebrow mb-1">Case studies</h3>
          <StarMd md={ch.caseStudiesMd} scope={`${ch.id}-cs`} />
        </section>
      )}

      {ch.diagramsMd && (
        <Fold label="Diagrams you should be able to draw">
          <StarMd md={ch.diagramsMd} scope={`${ch.id}-dg`} />
        </Fold>
      )}
    </div>
  );
}
