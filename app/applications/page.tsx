import type { Metadata } from "next";
import ApplicationBank from "@/components/learn/ApplicationBank";

export const metadata: Metadata = { title: "Real-World Application Bank" };

export default function ApplicationsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6">
      <header>
        <p className="eyebrow">AO2 · Application</p>
        <h1 className="h-display text-4xl font-semibold text-white sm:text-5xl">
          <span className="grad-text">Real-world application bank</span>
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-300">
          Abstract theory earns knowledge marks. Real context earns application marks. Every card links a concept to FMCG and retail dynamics and shows how to word it in an
          exam answer.
        </p>
      </header>
      <ApplicationBank />
    </div>
  );
}
