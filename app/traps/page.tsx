import Link from "next/link";
import type { Metadata } from "next";
import { Flag, X } from "lucide-react";
import { TOPICS } from "@/lib/data";
import { TOP_TRAPS } from "@/lib/data/marking";
import { UNITS, unitVars } from "@/lib/units";
import UnitIcon from "@/components/ui/UnitIcon";

export const metadata: Metadata = { title: "Examiner's Red Flag Trap Log" };

export default function TrapsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6">
      <header>
        <p className="eyebrow !text-red-300">Examiner&apos;s red flag trap log</p>
        <h1 className="h-display text-4xl font-semibold text-white sm:text-5xl">
          Where marks <span className="text-red-400">actually</span> disappear
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-300">
          These are the avoidable errors that cost students the most marks. Read the top ten tonight, then the unit-by-unit log as you revise each topic.
        </p>
      </header>

      <section className="card relative overflow-hidden border-red-500/40 bg-gradient-to-br from-red-600/15 to-transparent p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-red-500/20 blur-3xl" />
        <h2 className="mb-5 flex items-center gap-2 font-serif text-2xl font-semibold text-white">
          <Flag className="h-5 w-5 text-red-400" /> The top 10, across every paper
        </h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {TOP_TRAPS.map((t, i) => (
            <li key={t.trap} className="avoid-break flex gap-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <span className="num grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-500 text-sm font-bold text-white">{i + 1}</span>
              <div>
                <p className="font-semibold text-white">{t.trap}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{t.fix}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {UNITS.map((u) => (
        <section key={u.id} style={unitVars(u) as React.CSSProperties} className="avoid-break">
          <h2 className="mb-4 flex items-center gap-3 font-serif text-2xl font-semibold text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white shadow-glow">
              <UnitIcon icon={u.icon} className="h-5 w-5" />
            </span>
            Unit {u.number}: {u.name}
          </h2>
          <div className="space-y-4">
            {TOPICS[u.id].map((t) => (
              <article key={t.id} className="card border-accent/20 p-5">
                <Link href={`/module-1/${u.slug}#${t.id}`} className="num text-sm font-semibold text-soft hover:underline">
                  {t.code} {t.title}
                </Link>
                <ul className="mt-3 space-y-2">
                  {t.redFlags.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-slate-200">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
