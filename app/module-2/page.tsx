import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileText, Shuffle, Timer } from "lucide-react";
import UnitGrid from "@/components/dashboard/UnitGrid";

export const metadata: Metadata = { title: "Module 2 · Practice & Exam Bank" };

export default function Module2Hub() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6">
      <header>
        <p className="eyebrow">Module 2</p>
        <h1 className="h-display mt-1 text-4xl text-white sm:text-5xl">Practice &amp; exam bank</h1>
        <p className="mt-3 max-w-3xl text-lg text-white/70">
          Every one of the 45 topics has its own quiz and practice questions. Then test yourself with three mock exams and real past papers.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { href: "/module-2/mocks", icon: Timer, title: "3 mock exams", text: "Timed, mixed-unit papers with model answers." },
          { href: "/module-2/past-papers", icon: FileText, title: "Past papers", text: "Pearson and trusted sites, with links." },
          { href: "/module-2/mixed", icon: Shuffle, title: "Mixed diagnostic", text: "20 random questions, 4 from each unit." },
        ].map((x) => (
          <Link key={x.href} href={x.href} className="card card-hover group flex items-center gap-4 p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-shell">
              <x.icon className="h-6 w-6" />
            </span>
            <span className="flex-1">
              <span className="block text-lg font-bold text-white">{x.title}</span>
              <span className="block text-sm text-white/60">{x.text}</span>
            </span>
            <ArrowRight className="h-5 w-5 text-white/30 transition group-hover:translate-x-1 group-hover:text-accent-ink" />
          </Link>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-white">Practise by topic</h2>
        <UnitGrid focus="practice" />
      </section>
    </div>
  );
}
