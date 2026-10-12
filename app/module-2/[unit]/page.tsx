import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UNITS, unitBySlug } from "@/lib/units";
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
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6">
      <UnitTabs base="/module-2" active={unit.slug} />
      <UnitHeader unit={unit} module={2} />
      <Suspense fallback={<div className="card h-40 animate-pulse" />}>
        <PracticeClient key={unit.id} unit={unit.id} />
      </Suspense>
    </div>
  );
}
