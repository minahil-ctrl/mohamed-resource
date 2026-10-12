import type { Metadata } from "next";
import UnitGrid from "@/components/dashboard/UnitGrid";
import { CHAPTERS } from "@/lib/content";

export const metadata: Metadata = { title: "Module 1 · Notes" };

export default function Module1Hub() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6">
      <header>
        <p className="eyebrow">Module 1</p>
        <h1 className="h-display mt-1 text-4xl text-white sm:text-5xl">Notes for every topic</h1>
        <p className="mt-3 max-w-3xl text-lg text-white/70">
          {CHAPTERS.length} topics across five units. Each topic has a one-screen <strong className="text-white">cheat sheet</strong> and a complete{" "}
          <strong className="text-white">full notes</strong> version. Tap the star on anything to review it later, or the question mark to save it for your tutor.
        </p>
      </header>
      <UnitGrid focus="learn" />
    </div>
  );
}
