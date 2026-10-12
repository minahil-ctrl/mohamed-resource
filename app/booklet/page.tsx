import type { Metadata } from "next";
import { BookMarked, Printer } from "lucide-react";
import { TOPICS } from "@/lib/data";
import { TOP_TRAPS } from "@/lib/data/marking";
import { UNITS, unitVars } from "@/lib/units";
import { STUDENT_NAME, DISCLAIMER } from "@/lib/config";
import TopicCard from "@/components/learn/TopicCard";
import PrintButton from "@/components/ui/PrintButton";
import MarkerToolkit from "@/components/practice/MarkerToolkit";
import UnitIcon from "@/components/ui/UnitIcon";

export const metadata: Metadata = { title: "Print Booklet" };

export default function BookletPage() {
  const formulas = UNITS.map((u) => ({
    u,
    items: TOPICS[u.id].flatMap((t) => (t.formulas ?? []).map((f) => ({ ...f, code: t.code }))),
  }));

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6">
      <header className="card relative overflow-hidden border-accent/40 p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <p className="eyebrow flex items-center gap-2"><BookMarked className="h-4 w-4" /> Print-ready booklet</p>
        <h1 className="h-display mt-2 text-5xl font-semibold text-white sm:text-6xl">
          <span className="grad-text">Edexcel IGCSE Business</span>
        </h1>
        <p className="mt-2 font-serif text-2xl text-slate-200">10-day crash course · complete cheat sheets</p>
        <p className="mt-4 max-w-2xl text-slate-300">
          Prepared for {STUDENT_NAME}. Use <strong className="text-white">Print / Save as PDF</strong> to export the whole syllabus. The print layout switches to black and white, removes
          navigation and keeps each topic block together.
        </p>
        <div className="no-print mt-6 flex flex-wrap gap-3">
          <PrintButton />
          <span className="chip"><Printer className="h-3.5 w-3.5" /> Tip: choose &ldquo;Save as PDF&rdquo;, A4, margins default, background graphics on</span>
        </div>
      </header>

      <section className="page-break avoid-break">
        <h2 className="mb-4 font-serif text-3xl font-semibold text-white">One-page formula sheet</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {formulas.map(({ u, items }) => (
            <div key={u.id} style={unitVars(u) as React.CSSProperties} className="card avoid-break border-accent/30 p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-soft">
                <UnitIcon icon={u.icon} className="h-4 w-4" /> Unit {u.number}: {u.short}
              </h3>
              {items.length === 0 ? (
                <p className="text-sm text-slate-400">No formulas: definitions and evaluation focus.</p>
              ) : (
                <ul className="space-y-2">
                  {items.map((f) => (
                    <li key={f.name + f.code} className="text-sm">
                      <span className="font-semibold text-white">{f.name}:</span> <span className="num text-slate-200">{f.expr}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {UNITS.map((u) => (
        <section key={u.id} style={unitVars(u) as React.CSSProperties} className="page-break space-y-6">
          <div className="flex items-center gap-4 border-b border-accent/40 pb-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-white shadow-glow">
              <UnitIcon icon={u.icon} className="h-7 w-7" />
            </span>
            <div>
              <p className="eyebrow">Unit {u.number}</p>
              <h2 className="h-display text-4xl font-semibold text-white">{u.name}</h2>
            </div>
          </div>
          {TOPICS[u.id].map((t) => (
            <TopicCard key={t.id} topic={t} />
          ))}
        </section>
      ))}

      <section className="page-break space-y-6">
        <h2 className="font-serif text-3xl font-semibold text-white">Exam technique</h2>
        <MarkerToolkit />
        <div className="card p-6">
          <h3 className="mb-4 font-serif text-xl font-semibold text-white">Top 10 red flags</h3>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-200">
            {TOP_TRAPS.map((t) => (
              <li key={t.trap}><strong className="text-white">{t.trap}.</strong> {t.fix}</li>
            ))}
          </ol>
        </div>
        <p className="text-xs text-slate-500">{DISCLAIMER}</p>
      </section>
    </div>
  );
}
