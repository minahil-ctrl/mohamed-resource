import { Calculator, Flag, Quote, Store, X } from "lucide-react";
import type { Application, Topic } from "@/lib/types";
import GraphSwitch from "@/components/graphs/GraphSwitch";

export function RedFlagBanner({ flags }: { flags: string[] }) {
  return (
    <aside className="avoid-break relative overflow-hidden rounded-2xl border border-red-500/40 bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent p-5">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-red-500/20 blur-2xl" />
      <header className="mb-3 flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/90 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]">
          <Flag className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300">Examiner&apos;s Red Flags</p>
          <p className="text-sm font-semibold text-white">How students lose marks on this topic</p>
        </div>
      </header>
      <ul className="space-y-2">
        {flags.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-red-50/95">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function ApplicationCard({ a }: { a: Application }) {
  return (
    <div className="avoid-break flex h-full flex-col rounded-2xl border border-accent/25 bg-gradient-to-b from-accent/[0.09] to-transparent p-5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="chip">
          <Store className="h-3.5 w-3.5" /> {a.concept}
        </span>
      </div>
      <h5 className="font-serif text-lg font-semibold text-white">{a.title}</h5>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{a.scenario}</p>
      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-soft">
            <Quote className="h-3 w-3" /> AO2 application phrasing
          </p>
          <p className="text-[13px] leading-relaxed text-slate-200">{a.tip}</p>
        </div>
      </div>
    </div>
  );
}

export default function TopicCard({ topic }: { topic: Topic }) {
  return (
    <article id={topic.id} className="topic-card card page-break-inside-avoid overflow-hidden p-5 sm:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <header className="flex flex-wrap items-start gap-4">
        <span className="num grid h-14 min-w-14 place-items-center rounded-2xl border border-accent/40 bg-accent/15 px-3 text-xl font-bold text-soft shadow-glow">
          {topic.code}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="h-display text-2xl font-semibold text-white sm:text-3xl">{topic.title}</h3>
          <p className="mt-1 text-slate-400">{topic.blurb}</p>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <section>
          <h4 className="eyebrow mb-3">High-yield points</h4>
          <ul className="prose-points space-y-2.5 text-[15px] leading-relaxed text-slate-200">
            {topic.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <div className="space-y-5">
          <section>
            <h4 className="eyebrow mb-3">Key terms (Edexcel-style definitions)</h4>
            <dl className="space-y-2.5">
              {topic.terms.map((t) => (
                <div key={t.term} className="avoid-break rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
                  <dt className="text-sm font-semibold text-white">{t.term}</dt>
                  <dd className="mt-0.5 text-[13px] leading-relaxed text-slate-300">{t.def}</dd>
                </div>
              ))}
            </dl>
          </section>
          {topic.formulas && topic.formulas.length > 0 && (
            <section>
              <h4 className="eyebrow mb-3 flex items-center gap-1.5">
                <Calculator className="h-3.5 w-3.5" /> Formulas to memorise
              </h4>
              <div className="space-y-2">
                {topic.formulas.map((f) => (
                  <div key={f.name} className="avoid-break rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-2.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-soft">{f.name}</p>
                    <p className="num mt-0.5 text-sm text-white">{f.expr}</p>
                    {f.note && <p className="mt-1 text-xs text-slate-400">{f.note}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="mt-6">
        <RedFlagBanner flags={topic.redFlags} />
      </div>

      {topic.graphs && topic.graphs.length > 0 && (
        <div className="mt-6 space-y-6">
          {topic.graphs.map((g) => (
            <GraphSwitch key={g} id={g} />
          ))}
        </div>
      )}

      <section className="mt-8">
        <h4 className="eyebrow mb-3">Real-world application bank (secure your AO2 marks)</h4>
        <div className="grid gap-4 md:grid-cols-2">
          {topic.applications.map((a) => (
            <ApplicationCard key={a.title} a={a} />
          ))}
        </div>
      </section>
    </article>
  );
}
