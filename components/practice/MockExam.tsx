"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Clock, FileText, Play, RotateCcw, X } from "lucide-react";
import type { Mock } from "@/lib/data/mocks";
import { topicTitle } from "@/lib/data";
import Marker from "@/components/ui/Marker";
import { LS, type BankMarks, useLocalStorage } from "@/lib/useLocalStorage";
import { QuestionCard } from "./ExamBank";

interface State {
  phase: "intro" | "running" | "done";
  startedAt: number;
  endedAt: number;
  picks: Record<string, number>;
}
const INITIAL: State = { phase: "intro", startedAt: 0, endedAt: 0, picks: {} };
const mmss = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};
const LETTERS = ["A", "B", "C", "D"];

export default function MockExam({ mock }: { mock: Mock }) {
  const pathname = usePathname();
  const [st, setSt] = useLocalStorage<State>(`qb.mock${mock.n}`, INITIAL);
  const [drafts, setDrafts] = useLocalStorage<Record<string, string>>(LS.drafts, {});
  const [marks, setMarks] = useLocalStorage<BankMarks>(LS.bankMarks, {});
  const [, setBest] = useLocalStorage<Record<string, { score: number; total: number; ts: number }>>("qb.mockBest", {});
  const [now, setNow] = useState(() => Date.now());
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const limit = mock.minutes * 60000;
  const remaining = st.phase === "running" ? limit - (now - st.startedAt) : limit;
  const score = mock.mcqs.filter((q) => st.picks[q.id] === q.answer).length;
  const answered = Object.keys(st.picks).length;
  const sectionB = mock.questions.reduce((s, q) => s + (marks[q.id]?.got ?? 0), 0);
  const maxB = mock.questions.reduce((s, q) => s + q.marks, 0);

  const start = () => setSt({ phase: "running", startedAt: Date.now(), endedAt: 0, picks: {} });
  const submit = () => {
    const sc = mock.mcqs.filter((q) => st.picks[q.id] === q.answer).length;
    setSt({ ...st, phase: "done", endedAt: Date.now() });
    setBest((b) => (!b[mock.n] || sc >= b[mock.n].score ? { ...b, [mock.n]: { score: sc, total: mock.mcqs.length, ts: Date.now() } } : b));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const reset = () => confirm("Start this mock again? Your MCQ answers will be cleared (written answers stay).") && setSt(INITIAL);

  /* ------------------------------ intro ------------------------------ */
  if (st.phase === "intro") {
    return (
      <div className="card p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white">Before you start</h2>
        <ul className="mt-4 space-y-2 text-white/85">
          <li className="flex gap-2"><Clock className="mt-1 h-4 w-4 shrink-0 text-accent-ink" /> {mock.minutes} minutes for {mock.marks} marks. The clock starts when you press start.</li>
          <li className="flex gap-2"><FileText className="mt-1 h-4 w-4 shrink-0 text-accent-ink" /> <strong>Section A:</strong> {mock.mcqs.length} multiple-choice questions ({mock.mcqs.length} marks).</li>
          <li className="flex gap-2"><FileText className="mt-1 h-4 w-4 shrink-0 text-accent-ink" /> <strong>Section B:</strong> five written questions of 2, 3, 6, 9 and 12 marks ({maxB} marks).</li>
          <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" /> You can star any question to review later. After you submit you get the answers, explanations, mark schemes and model answers.</li>
        </ul>
        <button onClick={start} className="btn-accent mt-6 !px-6 !py-3 text-base"><Play className="h-5 w-5" /> Start Mock {mock.n}</button>
      </div>
    );
  }

  const done = st.phase === "done";
  const used = done ? st.endedAt - st.startedAt : now - st.startedAt;

  return (
    <div className="space-y-8">
      <div className="card sticky top-[76px] z-30 flex flex-wrap items-center justify-between gap-3 p-4 backdrop-blur">
        {done ? (
          <>
            <p className="text-lg font-bold text-white">
              Section A: <span className="num text-accent-ink">{score}/{mock.mcqs.length}</span> · Section B (self-marked): <span className="num text-accent-ink">{sectionB}/{maxB}</span>
              <span className="ml-2 text-sm font-medium text-white/55">time used {mmss(used)}</span>
            </p>
            <button onClick={reset} className="btn"><RotateCcw className="h-4 w-4" /> Retake</button>
          </>
        ) : (
          <>
            <p className="num text-2xl font-extrabold text-white" aria-live="off">
              <Clock className="mr-2 inline h-5 w-5 text-accent-ink" />
              <span className={remaining < 300000 ? "text-[#E11D48]" : ""}>{mmss(remaining)}</span>
              <span className="ml-3 text-sm font-medium text-white/55">{answered}/{mock.mcqs.length} answered</span>
            </p>
            <button onClick={() => (answered === mock.mcqs.length || confirm(`You have answered ${answered} of ${mock.mcqs.length} multiple-choice questions. Submit anyway?`)) && submit()} className="btn-accent">
              Submit paper
            </button>
          </>
        )}
      </div>

      {/* SECTION A */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-white">Section A · Multiple choice <span className="num text-base font-semibold text-white/50">({mock.mcqs.length} marks)</span></h2>
        <ol className="space-y-4">
          {mock.mcqs.map((q, i) => {
            const pick = st.picks[q.id];
            return (
              <li key={q.id} id={q.id} className="card scroll-mt-40 p-5">
                <div className="flex items-start gap-3">
                  <span className="num grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/25 text-sm font-extrabold text-accent-ink">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/45">{topicTitle(q.topic)}</p>
                    <p className="mt-0.5 text-lg font-semibold leading-snug text-white">{q.q}</p>
                  </div>
                  <Marker id={q.id} label={q.q} href={`${pathname}#${q.id}`} />
                </div>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {q.options.map((o, j) => {
                    const chosen = pick === j;
                    const right = j === q.answer;
                    const cls = !done
                      ? chosen ? "border-accent bg-accent/20" : "border-white/15 hover:border-accent"
                      : right ? "border-accent bg-accent/20" : chosen ? "border-[#E11D48] bg-[#E11D48]/10" : "border-white/10 opacity-80";
                    return (
                      <li key={j}>
                        <button
                          disabled={done}
                          onClick={() => setSt((cur) => ({ ...cur, picks: { ...cur.picks, [q.id]: j } }))}
                          className={`w-full rounded-xl border p-3 text-left text-sm transition ${cls}`}
                        >
                          <span className="flex gap-2.5">
                            <span className="num grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/10 text-xs font-bold">
                              {done && right ? <Check className="h-3.5 w-3.5 text-accent-ink" /> : done && chosen ? <X className="h-3.5 w-3.5 text-[#E11D48]" /> : LETTERS[j]}
                            </span>
                            <span className="text-white/90">{o}</span>
                          </span>
                          {done && <span className="mt-1.5 block pl-8 text-xs text-white/65">{q.why[j]}</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      {/* SECTION B */}
      <section>
        <h2 className="mb-1 text-2xl font-bold text-white">Section B · Written questions <span className="num text-base font-semibold text-white/50">({maxB} marks)</span></h2>
        <p className="mb-4 text-sm text-white/60">{done ? "Open each question to reveal the mark scheme, then self-mark by AO." : "Answer all five. About one minute per mark."}</p>
        <div className="space-y-4">
          {mock.questions.map((q) =>
            done ? (
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
            ) : (
              <article key={q.id} id={q.id} className="card scroll-mt-40 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="num grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-xl font-extrabold text-shell">{q.marks}</span>
                  <div className="min-w-0 flex-1">
                    {q.stimulus && <p className="mb-2 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/85">{q.stimulus}</p>}
                    <p className="text-lg font-semibold text-white">{q.question}</p>
                  </div>
                  <Marker id={q.id} label={q.question} href={`${pathname}#${q.id}`} />
                </div>
                <textarea
                  value={drafts[q.id] ?? ""}
                  onChange={(e) => setDrafts((d) => ({ ...d, [q.id]: e.target.value }))}
                  rows={q.marks >= 9 ? 12 : q.marks >= 6 ? 8 : 4}
                  placeholder="Type your answer…"
                  className="mt-3 w-full resize-y rounded-xl border border-white/15 bg-white/[0.04] p-3 text-[15px] leading-relaxed text-white placeholder:text-white/35 focus:border-accent focus:outline-none"
                />
              </article>
            ),
          )}
        </div>
        {!done && (
          <div className="mt-6 text-center">
            <button onClick={() => submit()} className="btn-accent !px-6 !py-3 text-base">Submit paper</button>
          </div>
        )}
      </section>
    </div>
  );
}
