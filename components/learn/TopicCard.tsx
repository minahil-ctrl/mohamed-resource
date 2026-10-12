import { Calculator, Check, ChevronDown, Flag, Quote, Store, ThumbsDown, ThumbsUp, X } from "lucide-react";
import type { Application, Topic } from "@/lib/types";
import { COMPARE } from "@/lib/data/compare";
import GraphSwitch from "@/components/graphs/GraphSwitch";

export function RedFlagBanner({ flags }: { flags: string[] }) {
  return (
    <aside className="avoid-break rounded-2xl border border-[#E11D48]/60 bg-[#E11D48]/[0.09] p-5">
      <header className="mb-3 flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#E11D48] text-white">
          <Flag className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FB7185]">Examiner&apos;s red flags</p>
          <p className="text-sm font-semibold text-white">How students lose marks here</p>
        </div>
      </header>
      <ul className="space-y-2">
        {flags.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-white/90">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-[#FB7185]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function ApplicationCard({ a }: { a: Application }) {
  return (
    <div className="avoid-break flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <span className="chip mb-3 self-start">
        <Store className="h-3.5 w-3.5 text-accent" /> {a.concept}
      </span>
      <h5 className="text-base font-bold text-white">{a.title}</h5>
      <p className="mt-1.5 text-sm leading-relaxed text-white/75">{a.scenario}</p>
      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-lime/40 bg-lime/[0.07] p-3">
          <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-lime">
            <Quote className="h-3 w-3" /> Say it like this (AO2)
          </p>
          <p className="text-[13px] leading-relaxed text-white/90">{tipText(a.tip)}</p>
        </div>
      </div>
    </div>
  );
}

const tipText = (t: string) => t;

function CompareTable({ title, adv, dis }: { title: string; adv: string[]; dis: string[] }) {
  return (
    <div className="avoid-break overflow-hidden rounded-2xl border border-white/10">
      <p className="border-b border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-bold text-white">{title}</p>
      <div className="grid grid-cols-2 divide-x divide-white/10">
        <div>
          <p className="flex items-center gap-1.5 bg-accent px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-shell">
            <ThumbsUp className="h-3.5 w-3.5" /> Advantages
          </p>
          <ul className="space-y-1.5 p-4">
            {adv.map((x) => (
              <li key={x} className="flex gap-2 text-[13px] leading-snug text-white/90">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="flex items-center gap-1.5 bg-[#E11D48]/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
            <ThumbsDown className="h-3.5 w-3.5" /> Disadvantages
          </p>
          <ul className="space-y-1.5 p-4">
            {dis.map((x) => (
              <li key={x} className="flex gap-2 text-[13px] leading-snug text-white/90">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FB7185]" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Fold({ label, open, children }: { label: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group rounded-2xl border border-white/10 bg-white/[0.03]">
      <summary className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm font-semibold text-white/90 hover:text-white">
        {label}
        <ChevronDown className="no-print h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5">{children}</div>
    </details>
  );
}

export default function TopicCard({ topic, expanded = false }: { topic: Topic; expanded?: boolean }) {
  const compare = COMPARE[topic.id] ?? [];
  const [keyTerm, ...otherTerms] = topic.terms;
  const core = topic.points.slice(0, 6);
  const more = topic.points.slice(6);

  return (
    <article id={topic.id} className="topic-card card overflow-hidden p-5 sm:p-8">
      <header className="flex flex-wrap items-center gap-4">
        <span className="num grid h-14 min-w-14 place-items-center rounded-2xl bg-accent px-3 text-xl font-extrabold text-shell">{topic.code}</span>
        <div className="min-w-0 flex-1">
          <h3 className="h-display text-2xl text-white sm:text-3xl">{topic.title}</h3>
          <p className="mt-1 text-white/60">{topic.blurb}</p>
        </div>
      </header>

      {/* KEY DEFINITION */}
      <section className="pat avoid-break mt-6 rounded-2xl border-2 border-lime bg-lime/[0.06] p-5 sm:p-6">
        <p className="eyebrow mb-2">Key definition · learn word for word</p>
        <p className="text-xl font-extrabold text-lime sm:text-2xl">{keyTerm.term}</p>
        <p className="mt-1.5 max-w-3xl text-lg leading-snug text-white">{keyTerm.def}</p>
      </section>

      {topic.formulas && topic.formulas.length > 0 && (
        <section className="mt-4">
          <h4 className="eyebrow mb-2 flex items-center gap-1.5">
            <Calculator className="h-3.5 w-3.5" /> Formulas
          </h4>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {topic.formulas.map((f) => (
              <div key={f.name} className="avoid-break rounded-xl border border-lime/40 bg-lime/[0.05] px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">{f.name}</p>
                <p className="num mt-0.5 text-[15px] font-bold text-lime">{f.expr}</p>
                {f.note && <p className="mt-1 text-xs text-white/60">{f.note}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MUST-KNOW POINTS */}
      <section className="mt-6">
        <h4 className="eyebrow mb-3">Must-know points</h4>
        <ol className="grid gap-3 md:grid-cols-2">
          {core.map((p, i) => (
            <li key={p} className="avoid-break flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <span className="num grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/20 text-sm font-extrabold text-accent">{i + 1}</span>
              <span className="text-[15px] leading-relaxed text-white/90">{p}</span>
            </li>
          ))}
        </ol>
        {more.length > 0 && (
          <div className="mt-3">
            <Fold label={`More points (${more.length})`} open={expanded}>
              <ul className="prose-points space-y-2 text-[15px] leading-relaxed text-white/85">
                {more.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Fold>
          </div>
        )}
      </section>

      {/* ADVANTAGES vs DISADVANTAGES */}
      {compare.length > 0 && (
        <section className="mt-6">
          <h4 className="eyebrow mb-3">Advantages vs disadvantages</h4>
          <div className={`grid gap-4 ${compare.length > 1 ? "lg:grid-cols-2" : ""}`}>
            {compare.map((c) => (
              <CompareTable key={c.title} {...c} />
            ))}
          </div>
        </section>
      )}

      {/* DIAGRAMS */}
      {topic.graphs && topic.graphs.length > 0 && (
        <div className="mt-6 space-y-6">
          {topic.graphs.map((g) => (
            <GraphSwitch key={g} id={g} />
          ))}
        </div>
      )}

      {/* RED FLAGS */}
      <div className="mt-6">
        <RedFlagBanner flags={topic.redFlags} />
      </div>

      {/* SECONDARY */}
      <div className="mt-4 space-y-3">
        {otherTerms.length > 0 && (
          <Fold label={`More definitions (${otherTerms.length})`} open={expanded}>
            <dl className="grid gap-2.5 md:grid-cols-2">
              {otherTerms.map((t) => (
                <div key={t.term} className="avoid-break rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <dt className="text-sm font-bold text-lime">{t.term}</dt>
                  <dd className="mt-0.5 text-[13px] leading-relaxed text-white/80">{t.def}</dd>
                </div>
              ))}
            </dl>
          </Fold>
        )}
        <Fold label="Real-world examples to quote (AO2)" open={expanded}>
          <div className="grid gap-4 md:grid-cols-2">
            {topic.applications.map((a) => (
              <ApplicationCard key={a.title} a={a} />
            ))}
          </div>
        </Fold>
      </div>
    </article>
  );
}
