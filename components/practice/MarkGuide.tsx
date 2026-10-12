import { ArrowRight, Scale, Workflow } from "lucide-react";

const CHAIN = [
  { k: "POINT", v: "State the factor", ex: "Higher sugar prices" },
  { k: "BECAUSE", v: "Give the cause", ex: "raise Crescent's cost of every bottle" },
  { k: "WHICH MEANS", v: "Show the effect", ex: "so supply falls and the market price rises" },
  { k: "SO", v: "Consequence for THIS business", ex: "sales volume drops and profit is squeezed" },
];

const JUDGE = [
  { k: "VERDICT", v: "Answer the question", ex: "Crescent should grow organically" },
  { k: "BECAUSE", v: "Best evidence from the case", ex: "$1.2m is four years of profit" },
  { k: "HOWEVER", v: "Strongest counter-argument", ex: "a takeover would add market share quickly" },
  { k: "CONDITION", v: "When would you change your mind?", ex: "if finance becomes cheap or the rival is failing" },
];

function Flow({ steps, tone }: { steps: typeof CHAIN; tone: "green" | "lime" }) {
  const head = tone === "green" ? "bg-accent text-shell" : "bg-lime text-shell";
  return (
    <ol className="grid gap-2.5 md:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.k} className="avoid-break relative rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <span className={`num inline-block rounded-md px-2 py-0.5 text-[11px] font-extrabold tracking-wider ${head}`}>
            {i + 1} · {s.k}
          </span>
          <p className="mt-2 text-sm font-bold text-white">{s.v}</p>
          <p className="mt-1 text-[13px] italic leading-snug text-white/65">&ldquo;{s.ex}&rdquo;</p>
          {i < steps.length - 1 && <ArrowRight className="no-print absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-white/40 md:block" />}
        </li>
      ))}
    </ol>
  );
}

export default function MarkGuide() {
  return (
    <section className="card pat overflow-hidden p-6 sm:p-8" aria-label="How to score AO3 and AO4 marks">
      <p className="eyebrow">Exam marker guide</p>
      <h3 className="h-display text-2xl text-white sm:text-3xl">Where the big marks are: AO3 &amp; AO4</h3>
      <p className="mt-2 max-w-2xl text-white/65">
        Knowledge (AO1) and application (AO2) get you started. Most of the marks on 6, 9 and 12-markers come from <strong className="text-white">analysis</strong>{" "}
        and <strong className="text-white">evaluation</strong>.
      </p>

      <div className="mt-7">
        <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-white">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-shell">
            <Workflow className="h-4 w-4" />
          </span>
          AO3 Analysis: build a chain of reasoning
        </h4>
        <Flow steps={CHAIN} tone="green" />
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-lime-ink/40 bg-lime/[0.06] p-4">
            <p className="eyebrow mb-1.5">Sentence starters</p>
            <p className="text-sm leading-relaxed text-white/90">which means that… · this leads to… · as a result… · therefore… · this reduces/increases… so…</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">AO3 checklist</p>
            <ul className="space-y-1 text-sm text-white/85">
              <li>✔ At least 3 links in each chain (cause, effect, consequence)</li>
              <li>✔ The final link names the business and a measure (sales, cost, profit, cash)</li>
              <li>✔ Two developed chains beat five bare points</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-white">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-lime text-shell">
            <Scale className="h-4 w-4" />
          </span>
          AO4 Evaluation: make a judgement and defend it
        </h4>
        <Flow steps={JUDGE} tone="lime" />
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-lime-ink/40 bg-lime/[0.06] p-4">
            <p className="eyebrow mb-1.5">Sentence starters</p>
            <p className="text-sm leading-relaxed text-white/90">On balance… · The most significant factor is… · This depends on… · However, this is outweighed by… · I would reject X because…</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">AO4 checklist</p>
            <ul className="space-y-1 text-sm text-white/85">
              <li>✔ A clear decision, not &ldquo;it depends&rdquo; with nothing after it</li>
              <li>✔ Justified with a number or fact from the case</li>
              <li>✔ The alternative rejected, with a reason</li>
              <li>✔ Weigh importance: say WHICH factor matters most</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-white/[0.06] text-[11px] uppercase tracking-wider text-white/60">
            <tr>
              <th className="px-4 py-2.5">Mark type</th>
              <th className="px-4 py-2.5">What you must show</th>
              <th className="px-4 py-2.5">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {[
              ["2 · Define / State", "AO1 only: a precise definition or two facts", "2 min"],
              ["3 · Explain", "Knowledge, then ONE chain of analysis", "4 min"],
              ["6 · Analyse", "Knowledge, application and TWO developed chains, in context", "8 min"],
              ["9 · Evaluate", "Two sides analysed, then a judgement supported by the case", "12 min"],
              ["12 · Justify", "Decision up front, three weighed arguments, reject the alternative", "16 min"],
            ].map(([a, b, c]) => (
              <tr key={a}>
                <td className="px-4 py-2.5 font-bold text-lime-ink">{a}</td>
                <td className="px-4 py-2.5 text-white/85">{b}</td>
                <td className="num px-4 py-2.5 text-white/60">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
