import Link from "next/link";
import type { Metadata } from "next";
import MockCards from "@/components/practice/MockCards";

export const metadata: Metadata = { title: "Mock exams" };

export default function MocksPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
      <header>
        <p className="eyebrow">Module 2 · Mock exams</p>
        <h1 className="h-display mt-1 text-4xl text-white sm:text-5xl">Three timed mock exams</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/70">
          Each mock mixes all five units, never repeats a question from the other mocks, and ends with the answers, explanations and model answers. For the full 90-minute
          exam experience, move on to a real paper from the <Link href="/module-2/past-papers" className="font-semibold text-accent-ink underline">past papers page</Link>.
        </p>
      </header>
      <MockCards />
    </div>
  );
}
