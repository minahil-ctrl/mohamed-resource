import type { Metadata } from "next";
import MixedQuiz from "@/components/practice/MixedQuiz";

export const metadata: Metadata = { title: "Mixed 20-question diagnostic" };

export default function MixedPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6">
      <header>
        <p className="eyebrow">Module 2 · Diagnostic</p>
        <h1 className="h-display mt-1 text-4xl text-white sm:text-5xl">Mixed 20-question diagnostic</h1>
        <p className="mt-3 max-w-2xl text-white/70">
          Four random questions from each of the five units. Take it first to find your weak topics, and again on Day 10 as a final check.
        </p>
      </header>
      <MixedQuiz />
    </div>
  );
}
