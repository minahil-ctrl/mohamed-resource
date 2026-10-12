import type { Metadata } from "next";
import MixedQuiz from "@/components/practice/MixedQuiz";

export const metadata: Metadata = { title: "Mixed 20-question diagnostic" };

export default function MixedPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6">
      <header>
        <p className="eyebrow">Module 2 · Diagnostic</p>
        <h1 className="h-display text-4xl font-semibold text-white sm:text-5xl">
          <span className="grad-text">Mixed 20-question diagnostic</span>
        </h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Four random questions from each of the five units. Take it first to find your weak topics, and again on Day 10 as a final check.
        </p>
      </header>
      <MixedQuiz />
    </div>
  );
}
