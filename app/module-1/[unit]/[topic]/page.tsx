import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ClipboardCheck } from "lucide-react";
import { CHAPTERS, chapterBySlug, chaptersOf, notesHref, practiceHref } from "@/lib/content";
import { unitById, unitBySlug } from "@/lib/units";
import ViewTabs from "@/components/ui/ViewTabs";
import ChapterCheatSheet from "@/components/learn/ChapterCheatSheet";
import ChapterFullNotes from "@/components/learn/ChapterFullNotes";
import UnitTabs from "@/components/ui/UnitTabs";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ unit: unitById(c.unit).slug, topic: c.slug }));
}

export function generateMetadata({ params }: { params: { unit: string; topic: string } }): Metadata {
  const u = unitBySlug(params.unit);
  const c = u && chapterBySlug(u.id, params.topic);
  return { title: c ? `${c.code} ${c.title}` : "Topic" };
}

export default function TopicPage({ params }: { params: { unit: string; topic: string } }) {
  const unit = unitBySlug(params.unit);
  if (!unit) notFound();
  const ch = chapterBySlug(unit.id, params.topic);
  if (!ch) notFound();
  const list = chaptersOf(unit.id);
  const i = list.findIndex((c) => c.id === ch.id);
  const prev = list[i - 1];
  const next = list[i + 1];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6">
      <UnitTabs base="/module-1" active={unit.slug} />
      <nav aria-label="Breadcrumb" className="no-print flex flex-wrap items-center gap-1.5 text-sm text-white/60">
        <Link href="/module-1" className="hover:text-white">Module 1</Link>/
        <Link href={`/module-1/${unit.slug}`} className="hover:text-white">{unit.name}</Link>/
        <span className="font-semibold text-white">{ch.code}</span>
      </nav>

      <header className="pat card overflow-hidden p-6 sm:p-8">
        <p className="eyebrow">Unit {unit.number} · Topic {ch.code}</p>
        <h1 className="h-display mt-2 text-3xl text-white sm:text-5xl">{ch.title}</h1>
        <div className="no-print mt-5 flex flex-wrap gap-2">
          <Link href={practiceHref(ch, "quiz")} className="btn-accent">
            <ClipboardCheck className="h-4 w-4" /> Quiz me on this topic
          </Link>
          <Link href={practiceHref(ch, "questions")} className="btn">Practice questions</Link>
        </div>
      </header>

      <Suspense fallback={<div className="card h-40 animate-pulse" />}>
        <ViewTabs
          tabs={[
            { id: "cheat", label: "Cheat sheet", hint: "1 screen", node: <ChapterCheatSheet ch={ch} /> },
            { id: "full", label: "Full notes", hint: "complete", node: <ChapterFullNotes ch={ch} /> },
          ]}
        />
      </Suspense>

      <footer className="no-print grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
        {prev ? (
          <Link href={notesHref(prev)} className="card card-hover flex items-center gap-3 p-4">
            <ArrowLeft className="h-5 w-5 text-accent-ink" />
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-white/50">Previous</span>
              <span className="font-semibold text-white">{prev.code} {prev.title}</span>
            </span>
          </Link>
        ) : <span />}
        {next && (
          <Link href={notesHref(next)} className="card card-hover flex items-center justify-end gap-3 p-4 text-right">
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-white/50">Next</span>
              <span className="font-semibold text-white">{next.code} {next.title}</span>
            </span>
            <ArrowRight className="h-5 w-5 text-accent-ink" />
          </Link>
        )}
      </footer>
    </div>
  );
}
