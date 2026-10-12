import Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import Countdown from "@/components/dashboard/Countdown";
import SprintRoadmap from "@/components/dashboard/SprintRoadmap";
import UnitGrid from "@/components/dashboard/UnitGrid";
import ProgressStats from "@/components/dashboard/ProgressStats";
import { COMMAND_WORDS, TOP_TRAPS } from "@/lib/data/marking";

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6">
      <Countdown />
      <SprintRoadmap />

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Your progress</p>
            <h2 className="h-display text-3xl font-semibold text-white">Saved automatically in this browser</h2>
          </div>
        </div>
        <ProgressStats />
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">The syllabus</p>
            <h2 className="h-display text-3xl font-semibold text-white">Five units, one colour each</h2>
          </div>
          <Link href="/module-2/mixed" className="btn-accent">
            Mixed 20-question diagnostic <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <UnitGrid />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <p className="eyebrow">Exam technique</p>
          <h2 className="mb-4 font-serif text-2xl font-semibold text-white">Command words decoded</h2>
          <ul className="divide-y divide-white/10">
            {COMMAND_WORDS.map((c) => (
              <li key={c.word} className="flex gap-4 py-2.5">
                <span className="w-32 shrink-0 text-sm font-semibold text-white">{c.word}</span>
                <span className="flex-1 text-sm text-slate-300">{c.means}</span>
                <span className="num hidden text-xs text-soft sm:block">{c.marks} marks</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card relative overflow-hidden border-red-500/30 p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-500/20 blur-3xl" />
          <p className="eyebrow !text-red-300">Examiner&apos;s red flags</p>
          <h2 className="mb-4 font-serif text-2xl font-semibold text-white">The five costliest habits</h2>
          <ul className="space-y-3">
            {TOP_TRAPS.slice(0, 5).map((t) => (
              <li key={t.trap} className="flex gap-3">
                <Flag className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">{t.trap}.</strong> {t.fix}
                </p>
              </li>
            ))}
          </ul>
          <Link href="/traps" className="btn mt-5">
            Open the full trap log <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
