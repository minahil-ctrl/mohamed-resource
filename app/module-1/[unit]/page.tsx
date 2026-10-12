import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UNITS, unitBySlug } from "@/lib/units";
import { TOPICS } from "@/lib/data";
import UnitTabs from "@/components/ui/UnitTabs";
import UnitHeader from "@/components/learn/UnitHeader";
import TopicCard from "@/components/learn/TopicCard";

export function generateStaticParams() {
  return UNITS.map((u) => ({ unit: u.slug }));
}

export function generateMetadata({ params }: { params: { unit: string } }): Metadata {
  const u = unitBySlug(params.unit);
  return { title: u ? `${u.name} · Cheat Sheets` : "Cheat Sheets" };
}

export default function Module1UnitPage({ params }: { params: { unit: string } }) {
  const unit = unitBySlug(params.unit);
  if (!unit) notFound();
  const topics = TOPICS[unit.id];

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6">
      <UnitTabs base="/module-1" active={unit.slug} />
      <UnitHeader unit={unit} module={1} topics={topics.length} />

      <nav aria-label="Topics in this unit" className="no-print sticky top-[76px] z-30 -mx-4 border-y border-white/10 bg-shell/85 px-4 py-2.5 backdrop-blur-xl sm:mx-0 sm:rounded-xl sm:border">
        <ul className="no-scrollbar flex gap-2 overflow-x-auto">
          {topics.map((t) => (
            <li key={t.id} className="shrink-0">
              <a
                href={`#${t.id}`}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-200 transition hover:border-accent/60 hover:bg-accent/15 hover:text-white"
              >
                <span className="num text-xs font-semibold text-soft">{t.code}</span>
                {t.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-8">
        {topics.map((t) => (
          <TopicCard key={t.id} topic={t} />
        ))}
      </div>
    </div>
  );
}
