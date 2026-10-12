import type { Metadata } from "next";
import { ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { DIRECT_PDFS, SOURCES, type Source } from "@/lib/data/sources";

export const metadata: Metadata = { title: "Past papers" };

function Row({ s }: { s: Source }) {
  return (
    <li className="card card-hover">
      <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/25 text-accent-ink">
          <FileText className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-white">{s.name}</span>
            {s.official && (
              <span className="inline-flex items-center gap-1 rounded-full bg-lime/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lime-ink">
                <ShieldCheck className="h-3 w-3" /> Official
              </span>
            )}
          </span>
          <span className="mt-1 block text-sm text-white/70">{s.what}</span>
          <span className="mt-1 block text-xs text-white/45">{s.access}</span>
        </span>
        <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-white/40" />
      </a>
    </li>
  );
}

export default function PastPapersPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6">
      <header>
        <p className="eyebrow">Module 2 · Past papers</p>
        <h1 className="h-display mt-1 text-4xl text-white sm:text-5xl">Real past papers and mark schemes</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/70">
          The exam has two papers, both 1 hour 30 minutes: Paper 1 (Investigating Small Businesses, 4BS1/01) and Paper 2 (Investigating Large Businesses, 4BS1/02).
          Always mark with the official mark scheme.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-xl font-bold text-white">Direct downloads from Pearson</h2>
        <ul className="space-y-3">{DIRECT_PDFS.map((s) => <Row key={s.url} s={s} />)}</ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-white">Libraries of past papers</h2>
        <ul className="space-y-3">{SOURCES.map((s) => <Row key={s.url} s={s} />)}</ul>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-bold text-white">How to use a past paper in your last week</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-white/85">
          <li>Sit one full paper in 90 minutes, no notes. Do it after finishing a mock exam here.</li>
          <li>Mark it with the official mark scheme. Highlight every mark you lost on analysis or evaluation.</li>
          <li>Star each question you could not do, then add the question-mark icon for anything to ask your tutor.</li>
          <li>Redo only the lost-mark questions the next day.</li>
        </ol>
        <p className="mt-4 text-xs text-white/45">
          Links were found through web search and are third-party sites except the Pearson ones. Websites change; if one stops working, search the paper code (4BS1) with the session month and year.
        </p>
      </section>
    </div>
  );
}
