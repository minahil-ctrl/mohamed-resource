import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { UNITS, unitBySlug } from "@/lib/units";
import { chaptersOf, notesHref, practiceHref } from "@/lib/content";
import UnitTabs from "@/components/ui/UnitTabs";
import UnitHeader from "@/components/learn/UnitHeader";

export function generateStaticParams() {
  return UNITS.map((u) => ({ unit: u.slug }));
}

export function generateMetadata({ params }: { params: { unit: string } }): Metadata {
  const u = unitBySlug(params.unit);
  return { title: u ? `${u.name} · Topics` : "Topics" };
}

export default function Module1UnitPage({ params }: { params: { unit: string } }) {
  const unit = unitBySlug(params.unit);
  if (!unit) notFound();
  const list = chaptersOf(unit.id);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6">
      <UnitTabs base="/module-1" active={unit.slug} />
      <UnitHeader unit={unit} module={1} topics={list.length} />
      <ol className="grid gap-3 md:grid-cols-2">
        {list.map((c) => (
          <li key={c.id} className="card card-hover flex flex-col p-5">
            <Link href={notesHref(c)} className="group flex items-start gap-4">
              <span className="num grid h-12 min-w-12 place-items-center rounded-xl bg-accent px-2 text-base font-extrabold text-shell">{c.code}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-bold leading-snug text-white group-hover:text-accent-ink">{c.title}</span>
                <span className="mt-1 block text-sm text-white/55">
                  {c.terms.length} key terms · {c.formulas.length ? `${c.formulas.length} formulas · ` : ""}
                  {c.questions.length} practice questions
                </span>
              </span>
              <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-white/30 transition group-hover:translate-x-1 group-hover:text-accent-ink" />
            </Link>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
              <Link href={notesHref(c)} className="rounded-lg border border-white/15 px-3 py-1.5 hover:border-accent">Cheat sheet</Link>
              <Link href={notesHref(c, "full")} className="rounded-lg border border-white/15 px-3 py-1.5 hover:border-accent">Full notes</Link>
              <Link href={practiceHref(c)} className="rounded-lg border border-white/15 px-3 py-1.5 hover:border-accent">Quiz</Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
