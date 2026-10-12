import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { CHAPTERS, chapterBySlug, chaptersOf, notesHref } from "@/lib/content";
import { unitById, unitBySlug } from "@/lib/units";
import { ALL_EXAMS, MCQS } from "@/lib/data";
import { autoMcqs } from "@/lib/autoMcq";
import UnitTabs from "@/components/ui/UnitTabs";
import TopicPractice from "@/components/practice/TopicPractice";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ unit: unitById(c.unit).slug, topic: c.slug }));
}

export function generateMetadata({ params }: { params: { unit: string; topic: string } }): Metadata {
  const u = unitBySlug(params.unit);
  const c = u && chapterBySlug(u.id, params.topic);
  return { title: c ? `Practice · ${c.code} ${c.title}` : "Practice" };
}

export default function TopicPracticePage({ params }: { params: { unit: string; topic: string } }) {
  const unit = unitBySlug(params.unit);
  if (!unit) notFound();
  const ch = chapterBySlug(unit.id, params.topic);
  if (!ch) notFound();

  const mcqs = [...MCQS[unit.id].filter((q) => q.topic === ch.id), ...autoMcqs(ch)];
  const modelled = ALL_EXAMS.filter((q) => q.topic === ch.id);
  const list = chaptersOf(unit.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6">
      <UnitTabs base="/module-2" active={unit.slug} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
        <Link href="/module-2" className="hover:text-white">Module 2</Link>/
        <Link href={`/module-2/${unit.slug}`} className="hover:text-white">{unit.name}</Link>/
        <span className="font-semibold text-white">{ch.code}</span>
      </nav>

      <header className="pat card overflow-hidden p-6 sm:p-8">
        <p className="eyebrow">Practice · Topic {ch.code}</p>
        <h1 className="h-display mt-2 text-3xl text-white sm:text-4xl">{ch.title}</h1>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={notesHref(ch)} className="btn"><BookOpen className="h-4 w-4" /> Cheat sheet</Link>
          <Link href={notesHref(ch, "full")} className="btn">Full notes</Link>
        </div>
      </header>

      <Suspense fallback={<div className="card h-40 animate-pulse" />}>
        <TopicPractice ch={ch} mcqs={mcqs} modelled={modelled} />
      </Suspense>

      <p className="text-center text-xs text-white/40">{list.findIndex((c) => c.id === ch.id) + 1} of {list.length} topics in this unit</p>
    </div>
  );
}
