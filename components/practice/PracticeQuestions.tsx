"use client";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronDown, Clock, PenLine } from "lucide-react";
import type { Chapter } from "@/lib/content";
import type { ExamMarks, ExamQ } from "@/lib/types";
import { AO_ALLOCATION, MARKS_META } from "@/lib/data/marking";
import Marker from "@/components/ui/Marker";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { AO_TONE } from "./MarkerToolkit";
import { QuestionCard } from "./ExamBank";
import { LS, type BankMarks } from "@/lib/useLocalStorage";

const categoryFor = (m: number): ExamMarks => (m <= 2 ? 2 : m <= 4 ? 3 : m <= 6 ? 6 : m <= 9 ? 9 : 12);

const HOW: Record<string, string> = {
  Define: "Give the precise meaning, then add a short example if marks allow.",
  State: "Give the fact only. No explanation needed.",
  Identify: "Name it. One short phrase.",
  Calculate: "Write the formula, show your working, then the answer with the right unit or % sign.",
  Explain: "Point, because, so. Build one chain per mark pair, linked to the business.",
  Analyse: "Develop two chains of reasoning (cause, effect, consequence) in context.",
  Evaluate: "Analyse both sides, then give a judgement that says which matters most and why.",
  Justify: "Make a decision, support it with evidence, and reject the alternative with a reason.",
  Assess: "Weigh up the importance of the factors and reach a supported conclusion.",
  Discuss: "Give arguments for and against, then conclude.",
  Describe: "Say what it is or what happens. Add detail, not reasons.",
};

function PracticeQ({ ch, i, q }: { ch: Chapter; i: number; q: Chapter["questions"][number] }) {
  const id = `${ch.id}-pq${i}`;
  const pathname = usePathname();
  const [drafts, setDrafts] = useLocalStorage<Record<string, string>>(LS.drafts, {});
  const [done, setDone] = useLocalStorage<Record<string, boolean>>("qb.pqDone", {});
  const [open, setOpen] = useState(false);
  const cat = categoryFor(q.marks);
  const meta = MARKS_META[cat];
  const alloc = AO_ALLOCATION[cat];
  const text = drafts[id] ?? "";
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <article id={id} className="card scroll-mt-40 p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-shell">
          <span className="num text-xl font-extrabold leading-none">{q.marks}</span>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">{q.command}</span>
            {(["ao1", "ao2", "ao3", "ao4"] as const).map((k) =>
              alloc[k] > 0 ? (
                <span key={k} className={`num rounded-md border px-1.5 py-0.5 text-[10px] font-bold ${AO_TONE[k]}`}>
                  {k.toUpperCase()}
                </span>
              ) : null,
            )}
            {done[id] && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/25 px-2 py-0.5 text-xs font-bold text-accent-ink">
                <CheckCircle2 className="h-3 w-3" /> attempted
              </span>
            )}
          </div>
          <p className="mt-2 text-lg font-semibold leading-snug text-white">{q.text}</p>
        </div>
        <Marker id={id} label={q.text} href={`${pathname}?view=questions#${id}`} />
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
          <span className="flex items-center gap-1.5"><PenLine className="h-3.5 w-3.5" /> Your answer (saved on this device)</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> ~{Math.max(1, q.marks)} min</span>
            <span className="num">{words} words · target {meta.words}</span>
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setDrafts((d) => ({ ...d, [id]: e.target.value }))}
          rows={q.marks >= 8 ? 9 : q.marks >= 6 ? 6 : 3}
          placeholder="Type your answer…"
          className="w-full resize-y rounded-xl border border-white/15 bg-white/[0.04] p-3 text-[15px] leading-relaxed text-white placeholder:text-white/35 focus:border-accent focus:outline-none"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button onClick={() => setOpen((v) => !v)} className="btn !py-1.5 text-xs" aria-expanded={open}>
          How to answer a {q.marks}-marker <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
        </button>
        <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-white/70">
          <input type="checkbox" checked={!!done[id]} onChange={() => setDone((d) => ({ ...d, [id]: !d[id] }))} className="h-4 w-4 accent-[#00804c]" />
          Mark as attempted
        </label>
      </div>
      {open && (
        <div className="mt-3 rounded-xl border border-lime-ink/50 bg-lime/[0.08] p-4 text-sm leading-relaxed text-white/90">
          <p><strong className="text-lime-ink">{q.command}:</strong> {HOW[q.command] ?? meta.structure}</p>
          <p className="mt-1.5"><strong className="text-lime-ink">Structure:</strong> {meta.structure}</p>
          <p className="mt-1.5 text-white/60">No model answer is stored for this question. Star the question mark to save it for your tutor.</p>
        </div>
      )}
    </article>
  );
}

export default function PracticeQuestions({ ch, modelled }: { ch: Chapter; modelled: ExamQ[] }) {
  const params = useSearchParams();
  const [openId, setOpenId] = useState<string | null>(params.get("open"));
  const [drafts, setDrafts] = useLocalStorage<Record<string, string>>(LS.drafts, {});
  const [marks, setMarks] = useLocalStorage<BankMarks>(LS.bankMarks, {});

  return (
    <div className="space-y-8">
      {modelled.length > 0 && (
        <section>
          <h3 className="eyebrow mb-1">Exam-style questions with mark scheme and model answer</h3>
          <p className="mb-4 text-sm text-white/60">Write your answer, reveal the mark scheme, then self-mark by AO.</p>
          <div className="space-y-4">
            {modelled.map((q) => (
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
      )}

      <section>
        <h3 className="eyebrow mb-1">Command-word practice for this topic ({ch.questions.length})</h3>
        <p className="mb-4 text-sm text-white/60">From the 2 mark define questions up to the 8 mark evaluate questions. Attempt them in order.</p>
        <div className="space-y-4">
          {ch.questions.map((q, i) => (
            <PracticeQ key={i} ch={ch} i={i} q={q} />
          ))}
        </div>
      </section>
    </div>
  );
}
