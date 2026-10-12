import Link from "next/link";
import { ArrowRight, Printer } from "lucide-react";
import type { Unit } from "@/lib/types";
import UnitIcon from "@/components/ui/UnitIcon";

export default function UnitHeader({
  unit,
  module,
  topics,
}: {
  unit: Unit;
  module: 1 | 2;
  topics?: number;
}) {
  const other = module === 1 ? "/module-2" : "/module-1";
  return (
    <header className="card relative overflow-hidden border-accent/40 p-6 sm:p-9">
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="relative flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="chip">
              <UnitIcon icon={unit.icon} className="h-3.5 w-3.5" /> Unit {unit.number}
            </span>
            <span className="chip">{module === 1 ? "Module 1 · Cheat sheet" : "Module 2 · Practice"}</span>
            {topics !== undefined && <span className="chip">{topics} topics</span>}
          </div>
          <h1 className="h-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
            <span className="grad-text">{unit.name}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">{unit.tagline}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-200">Case study used in practice questions:</strong> {unit.caseStudy.name}. {unit.caseStudy.blurb}
          </p>
        </div>
        <div className="no-print flex flex-col gap-2">
          <Link href={`${other}/${unit.slug}`} className="btn-accent">
            {module === 1 ? "Practise this unit" : "Open cheat sheet"} <ArrowRight className="h-4 w-4" />
          </Link>
          {module === 1 && (
            <Link href="/booklet" className="btn">
              <Printer className="h-4 w-4" /> Print booklet
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
