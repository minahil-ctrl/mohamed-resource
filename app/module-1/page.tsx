import type { Metadata } from "next";
import UnitGrid from "@/components/dashboard/UnitGrid";

export const metadata: Metadata = { title: "Module 1 · Crash Course Cheat Sheets" };

export default function Module1Hub() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6">
      <header>
        <p className="eyebrow">Module 1</p>
        <h1 className="h-display text-4xl font-semibold text-white sm:text-5xl">
          <span className="grad-text">Comprehensive crash-course cheat sheets</span>
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-300">
          25 topics across five units. Each has high-yield points, Edexcel-style definitions, formulas, an examiner&apos;s red-flag banner and an application bank
          for AO2 marks. Interactive graphs are built in.
        </p>
      </header>
      <UnitGrid focus="learn" />
    </div>
  );
}
