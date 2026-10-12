import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Shuffle } from "lucide-react";
import UnitGrid from "@/components/dashboard/UnitGrid";

export const metadata: Metadata = { title: "Module 2 · Quizzes & Exam Marker Bank" };

export default function Module2Hub() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">Module 2</p>
          <h1 className="h-display text-4xl font-semibold text-white sm:text-5xl">
            <span className="grad-text">Quizzes &amp; exam marker bank</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">
            <strong className="text-white">Part A:</strong> 20 multiple-choice questions per unit with instant feedback and a reason for every option.{" "}
            <strong className="text-white">Part B:</strong> past-paper-style questions from 2 to 12 marks, with AO1 to AO4 mark schemes and tagged model answers.
          </p>
        </div>
        <Link href="/module-2/mixed" className="btn-accent">
          <Shuffle className="h-4 w-4" /> Mixed diagnostic <ArrowRight className="h-4 w-4" />
        </Link>
      </header>
      <UnitGrid focus="practice" />
    </div>
  );
}
