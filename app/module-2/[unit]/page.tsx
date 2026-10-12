import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UNITS, unitBySlug } from "@/lib/units";
import { chaptersOf, practiceHref } from "@/lib/content";
import UnitTabs from "@/components/ui/UnitTabs";
import UnitHeader from "@/components/learn/UnitHeader";
import PracticeClient from "@/components/practice/PracticeClient";

export function generateStaticParams() {
  return UNITS.map((u) => ({ unit: u.slug }));
}

export function generateMetadata({ params }: { params: { unit: string } }): Metadata {
  const u = unitBySlug(params.unit);
  return { title: u ? `${u.name} · Practice` : "Practice" };
}

export default function Module2UnitPage({ params }: { params: { unit: string } }) {
  const unit = unitBySlug(params.unit);
  if (!unit) notFound();
  const list = chaptersOf(unit.id);
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6">
      <UnitTabs base="/module-2" active={unit.slug} />
      <UnitHeader unit={unit} module={2} />

      <section>
        <h2 className="mb-3 text-xl font-bold text-white">Topic by topic</h2>
        <ol className="grid gap-2.5 md:grid-cols-2">
          {list.map((c) => (
            <li key={c.id}>
              <Link href={practiceHref(c)} className="card card-hover flex items-center gap-3 p-4">
                <span className="num grid h-10 min-w-10 place-items-center rounded-lg bg-accent px-1.5 text-sm font-extrabold text-shell">{c.code}</span>
                <span className="flex-1 font-semibold text-white">{c.title}</span>
                <span className="text-xs font-bold text-accent-ink">Quiz + questions →</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-white">Whole-unit test</h2>
        <Suspense fallback={<div className="card h-40 animate-pulse" />}>
          <PracticeClient key={unit.id} unit={unit.id} />
        </Suspense>
      </section>
    </div>
  );
}
