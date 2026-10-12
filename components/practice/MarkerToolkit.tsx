"use client";
import { useState } from "react";
import { ChevronDown, Clock, Scale } from "lucide-react";
import { AO_ALLOCATION, AO_INFO, COMMAND_WORDS, MARKS_META } from "@/lib/data/marking";
import type { ExamMarks } from "@/lib/types";

export const AO_TONE: Record<string, string> = {
  ao1: "border-sky-400/40 bg-sky-400/10 text-sky-700 dark:text-sky-300",
  ao2: "border-emerald-400/40 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300",
  ao3: "border-amber-400/40 bg-amber-400/10 text-amber-700 dark:text-amber-300",
  ao4: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-700 dark:text-fuchsia-300",
};

export default function MarkerToolkit() {
  const [open, setOpen] = useState(false);
  const marks: ExamMarks[] = [2, 3, 6, 9, 12];
  return (
    <section className="card border-accent/30 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Marker&apos;s toolkit</p>
          <h3 className="font-serif text-xl font-semibold text-white">How the four Assessment Objectives earn marks</h3>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="btn no-print" aria-expanded={open}>
          {open ? "Hide" : "Show"} command words &amp; mark ladders
          <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {AO_INFO.map((a) => (
          <div key={a.key} className={`rounded-xl border p-4 ${AO_TONE[a.key]}`}>
            <p className="num text-xs font-bold tracking-widest">{a.code}</p>
            <p className="mt-0.5 text-sm font-semibold text-white">{a.name}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-200">{a.how}</p>
            <p className="mt-2 text-xs italic text-slate-300/80">&ldquo;{a.cue}&rdquo;</p>
          </div>
        ))}
      </div>

      <div className={`${open ? "block" : "hidden"} print:block mt-6 space-y-6`}>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-white/[0.05] text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-2.5">Question</th>
                <th className="px-4 py-2.5">Command word</th>
                <th className="px-4 py-2.5">Time</th>
                <th className="px-4 py-2.5">Words</th>
                <th className="px-4 py-2.5">AO split (indicative)</th>
                <th className="px-4 py-2.5">Structure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {marks.map((m) => {
                const a = AO_ALLOCATION[m];
                const meta = MARKS_META[m];
                return (
                  <tr key={m} className="align-top">
                    <td className="num px-4 py-3 font-semibold text-white">{meta.label}</td>
                    <td className="px-4 py-3 text-slate-200">{meta.command}</td>
                    <td className="num px-4 py-3 text-slate-300">~{meta.minutes} min</td>
                    <td className="num px-4 py-3 text-slate-300">{meta.words}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {(["ao1", "ao2", "ao3", "ao4"] as const).map((k) =>
                          a[k] > 0 ? (
                            <span key={k} className={`num rounded-md border px-1.5 py-0.5 text-[11px] font-semibold ${AO_TONE[k]}`}>
                              {k.toUpperCase()}×{a[k]}
                            </span>
                          ) : null,
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-slate-300">{meta.structure}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
          <Scale className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          The AO split above is the indicative allocation used in this portal for self-marking. Real Edexcel mark schemes vary by question, so treat it as
          a checklist, not an official allocation.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-white/[0.05] text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-2.5">Command word</th>
                <th className="px-4 py-2.5">Marks</th>
                <th className="px-4 py-2.5">What it means</th>
                <th className="px-4 py-2.5">AO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {COMMAND_WORDS.map((c) => (
                <tr key={c.word}>
                  <td className="px-4 py-2.5 font-medium text-white">{c.word}</td>
                  <td className="num px-4 py-2.5 text-slate-300">{c.marks}</td>
                  <td className="px-4 py-2.5 text-slate-300">{c.means}</td>
                  <td className="num px-4 py-2.5 text-soft">{c.ao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" /> Rule of thumb: about one minute per mark. Keep five minutes at the end for adding a missing judgement.
        </p>
      </div>
    </section>
  );
}
