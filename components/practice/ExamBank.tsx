"use client";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Marker from "@/components/ui/Marker";
import { AlertTriangle, CheckCircle2, ChevronDown, Clock, Eye, EyeOff, FileText, Minus, PenLine, Plus } from "lucide-react";
import type { AOSplit, ExamQ } from "@/lib/types";
import { AO_ALLOCATION, AO_INFO, MARKS_META } from "@/lib/data/marking";
import { topicTitle } from "@/lib/data";
import { LS, type BankMarks, useLocalStorage } from "@/lib/useLocalStorage";
import { AO_TONE } from "./MarkerToolkit";

const ZERO: AOSplit = { ao1: 0, ao2: 0, ao3: 0, ao4: 0 };

function ModelAnswer({ text }: { text: string }) {
  return (
    <div className="space-y-3 text-[15px] leading-relaxed text-slate-100">
      {text.split("\n\n").map((para, i) => (
        <p key={i}>
          {para.split(/(\[AO[1-4](?:, AO[1-4])*\])/g).map((part, j) => {
            const m = part.match(/^\[(AO[1-4](?:, AO[1-4])*)\]$/);
            if (!m) return <Fragment key={j}>{part}</Fragment>;
            const tone = AO_TONE[m[1].slice(0, 3).toLowerCase()];
            return (
              <span key={j} className={`num mx-0.5 inline-block rounded-md border px-1.5 py-px align-baseline text-[10px] font-bold tracking-wide ${tone}`}>
                {m[1].replace(", ", " + ")}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}

export function QuestionCard({
  q,
  open,
  onToggle,
  draft,
  setDraft,
  marks,
  setMarks,
}: {
  q: ExamQ;
  open: boolean;
  onToggle: () => void;
  draft: string;
  setDraft: (s: string) => void;
  marks: BankMarks[string] | undefined;
  setMarks: (m: BankMarks[string]) => void;
}) {
  const [reveal, setReveal] = useState(false);
  const pathname = usePathname();
  const alloc = AO_ALLOCATION[q.marks];
  const meta = MARKS_META[q.marks];
  const ao = marks?.ao ?? ZERO;
  const got = ao.ao1 + ao.ao2 + ao.ao3 + ao.ao4;
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const [lo, hi] = meta.words.split(" to ").map(Number);
  const wordTone = words === 0 ? "text-slate-500" : words < lo * 0.7 ? "text-amber-700 dark:text-amber-300" : words > hi * 1.4 ? "text-amber-700 dark:text-amber-300" : "text-emerald-700 dark:text-emerald-300";

  const level = meta.levels.find((l) => {
    const [a, b] = l.range.split("-").map(Number);
    return got >= a && got <= (b ?? a);
  });

  const bump = (k: keyof AOSplit, d: number) => {
    const v = Math.min(alloc[k], Math.max(0, ao[k] + d));
    const next = { ...ao, [k]: v };
    setMarks({ got: next.ao1 + next.ao2 + next.ao3 + next.ao4, max: q.marks, ao: next });
  };

  return (
    <article id={q.id} className="card relative overflow-hidden scroll-mt-40">
      <Marker id={q.id} label={q.question} href={`${pathname}?view=questions&open=${q.id}`} className="absolute right-14 top-5 z-10" />
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-start gap-4 p-5 text-left transition hover:bg-white/[0.03] sm:p-6">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-accent/40 bg-accent/15 shadow-glow">
          <span className="num text-2xl font-bold leading-none text-white">{q.marks}</span>
          <span className="-mt-3 text-[9px] font-semibold uppercase tracking-wider text-soft">marks</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="chip">{q.command}</span>
            <span className="text-xs text-slate-400">{topicTitle(q.topic)}</span>
            {marks && marks.got > 0 && (
              <span className="num inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-3 w-3" /> {marks.got}/{marks.max}
              </span>
            )}
          </span>
          <span className="mt-2 block text-lg font-medium leading-snug text-white">{q.question}</span>
          <span className="mt-2 flex flex-wrap gap-1.5">
            {(["ao1", "ao2", "ao3", "ao4"] as const).map((k) =>
              alloc[k] > 0 ? (
                <span key={k} className={`num rounded-md border px-1.5 py-0.5 text-[10px] font-bold ${AO_TONE[k]}`}>
                  {k.toUpperCase()}×{alloc[k]}
                </span>
              ) : null,
            )}
          </span>
        </span>
        <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="space-y-5 border-t border-white/10 p-5 sm:p-6">
          {q.stimulus && (
            <div className="rounded-xl border border-accent/25 bg-accent/[0.07] p-4">
              <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-soft">
                <FileText className="h-3.5 w-3.5" /> Case information
              </p>
              <p className="text-[15px] leading-relaxed text-slate-100">{q.stimulus}</p>
            </div>
          )}
          <p className="text-lg font-semibold text-white">{q.question} <span className="num text-sm font-normal text-slate-400">[{q.marks}]</span></p>

          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300"><PenLine className="h-3.5 w-3.5" /> Write your answer</span>
              <span className="flex items-center gap-4 text-slate-400">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> aim for ~{meta.minutes} min</span>
                <span className={`num ${wordTone}`}>{words} words (target {meta.words})</span>
              </span>
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={q.marks >= 9 ? 12 : q.marks >= 6 ? 8 : 4}
              placeholder="Type your answer here. It is saved in your browser automatically."
              className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.05] p-4 text-[15px] leading-relaxed text-white placeholder:text-slate-600 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
            />
          </div>

          <button onClick={() => setReveal((v) => !v)} className="btn-accent no-print">
            {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} {reveal ? "Hide mark scheme" : "Reveal mark scheme & model answer"}
          </button>

          {reveal && (
            <div className="animate-rise space-y-6">
              <section>
                <h4 className="eyebrow mb-3">Self-mark by Assessment Objective</h4>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {AO_INFO.map((a) => {
                    const max = alloc[a.key];
                    const v = ao[a.key];
                    return (
                      <div key={a.key} className={`rounded-xl border p-3 ${max ? AO_TONE[a.key] : "border-white/5 bg-white/[0.02] opacity-40"}`}>
                        <p className="num text-xs font-bold tracking-widest">{a.code}</p>
                        <p className="text-[11px] text-slate-200">{a.name}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <button disabled={!max || v <= 0} onClick={() => bump(a.key, -1)} aria-label={`Decrease ${a.code}`} className="grid h-7 w-7 place-items-center rounded-lg bg-white/[0.05] text-white disabled:opacity-30">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="num text-lg font-bold text-white">{v}<span className="text-sm font-normal text-slate-400">/{max}</span></span>
                          <button disabled={!max || v >= max} onClick={() => bump(a.key, 1)} aria-label={`Increase ${a.code}`} className="grid h-7 w-7 place-items-center rounded-lg bg-white/[0.05] text-white disabled:opacity-30">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-sm text-slate-200">
                  Your mark: <strong className="num text-white">{got}/{q.marks}</strong>
                  {level && q.marks >= 6 && <span className="text-soft"> · {level.title}</span>}
                </p>
              </section>

              <section>
                <h4 className="eyebrow mb-2">Indicative content (what the examiner looks for)</h4>
                <ul className="prose-points space-y-2 text-sm leading-relaxed text-slate-200">
                  {q.indicative.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </section>

              {q.marks >= 6 && (
                <section>
                  <h4 className="eyebrow mb-2">Level descriptors</h4>
                  <ul className="grid gap-2 md:grid-cols-3">
                    {meta.levels.map((l) => (
                      <li key={l.range} className={`rounded-xl border p-3 text-sm ${level?.range === l.range ? "border-accent/70 bg-accent/15" : "border-white/10 bg-white/[0.03]"}`}>
                        <p className="num text-xs font-bold text-soft">{l.title} · {l.range} marks</p>
                        <p className="mt-1 text-slate-200">{l.text}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h4 className="eyebrow mb-2">Model answer (with AO tags)</h4>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] p-5">
                  <ModelAnswer text={q.model} />
                </div>
              </section>

              <section className="rounded-xl border border-red-500/35 bg-red-500/[0.08] p-4">
                <h4 className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300">
                  <AlertTriangle className="h-3.5 w-3.5" /> Where students lose marks here
                </h4>
                <ul className="space-y-1.5 text-sm text-red-50/95">
                  {q.traps.map((t) => (
                    <li key={t} className="flex gap-2"><span className="text-red-400">✗</span> {t}</li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

const GROUPS = [
  { title: "2-mark", command: "State / Define", marks: [2] as const, desc: "AO1 Knowledge only: a precise definition or two facts. No explanation." },
  { title: "3-mark", command: "Explain", marks: [3] as const, desc: "Knowledge + Analysis: one point, then one developed chain of reasoning." },
  { title: "6-mark", command: "Analyse", marks: [6] as const, desc: "Knowledge + Application + Analysis: two developed chains, in the context of the case." },
  { title: "9 / 12-mark", command: "Evaluate / Justify", marks: [9, 12] as const, desc: "AO1 to AO4: analyse both sides, then reach a justified judgement." },
];

export default function ExamBank({ questions, initialOpen }: { questions: ExamQ[]; initialOpen?: string }) {
  const [openId, setOpenId] = useState<string | null>(initialOpen ?? null);
  const [drafts, setDrafts] = useLocalStorage<Record<string, string>>(LS.drafts, {});
  const [marks, setMarks] = useLocalStorage<BankMarks>(LS.bankMarks, {});

  useEffect(() => {
    if (initialOpen) {
      setOpenId(initialOpen);
      setTimeout(() => document.getElementById(initialOpen)?.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
    }
  }, [initialOpen]);

  return (
    <div className="space-y-10">
      {GROUPS.map((g) => {
        const list = questions.filter((q) => (g.marks as readonly number[]).includes(q.marks));
        if (!list.length) return null;
        return (
          <section key={g.title}>
            <header className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-lg bg-accent px-3 py-1 text-sm font-extrabold text-shell">{g.title}</span>
                <h3 className="text-xl font-bold text-white">{g.command}</h3>
              </div>
              <p className="mt-2 text-sm text-white/65">{g.desc}</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {g.marks.map((m) => (
                  <div key={m} className="flex items-center gap-2">
                    <span className="num text-xs font-bold text-white/60">{m} marks =</span>
                    {(["ao1", "ao2", "ao3", "ao4"] as const).map((k) =>
                      AO_ALLOCATION[m][k] > 0 ? (
                        <span key={k} className={"num rounded-md border px-1.5 py-0.5 text-[11px] font-bold " + AO_TONE[k]}>
                          {k.toUpperCase()} × {AO_ALLOCATION[m][k]}
                        </span>
                      ) : null,
                    )}
                  </div>
                ))}
              </div>
            </header>
            <div className="space-y-4">
              {list.map((q) => (
                <QuestionCard
                  key={q.id}
                  q={q}
                  open={openId === q.id}
                  onToggle={() => setOpenId(openId === q.id ? null : q.id)}
                  draft={drafts[q.id] ?? ""}
                  setDraft={(v) => setDrafts((d) => ({ ...d, [q.id]: v }))}
                  marks={marks[q.id]}
                  setMarks={(m) => setMarks((b) => ({ ...b, [q.id]: m }))}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
