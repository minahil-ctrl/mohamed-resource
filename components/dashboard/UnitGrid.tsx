"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardCheck } from "lucide-react";
import { UNITS } from "@/lib/units";
import { chaptersOf, notesHref, practiceHref } from "@/lib/content";
import UnitIcon from "@/components/ui/UnitIcon";

export default function UnitGrid({ focus = "learn" }: { focus?: "learn" | "practice" }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {UNITS.map((u) => {
        const list = chaptersOf(u.id);
        return (
          <article key={u.id} className="card card-hover group relative flex flex-col overflow-hidden p-6">
            <div className="relative flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-shell">
                <UnitIcon icon={u.icon} className="h-6 w-6" />
              </span>
              <span className="num text-5xl font-bold text-white/[0.08]">0{u.number}</span>
            </div>
            <h3 className="relative mt-4 text-2xl font-bold leading-tight text-white">{u.name}</h3>
            <p className="relative mt-1.5 text-sm text-white/55">
              {list.length} topics · {u.tagline}
            </p>

            <ul className="relative mt-4 space-y-1">
              {list.map((c) => (
                <li key={c.id}>
                  <Link href={focus === "learn" ? notesHref(c) : practiceHref(c)} className="flex gap-2 text-[13px] text-white/75 transition hover:text-accent-ink">
                    <span className="num w-9 shrink-0 font-bold text-lime-ink">{c.code}</span>
                    <span className="truncate">{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="relative mt-auto flex flex-wrap gap-2 pt-5">
              <Link href={`/module-1/${u.slug}`} className={focus === "learn" ? "btn-accent flex-1" : "btn flex-1"}>
                <BookOpen className="h-4 w-4" /> Notes
              </Link>
              <Link href={`/module-2/${u.slug}`} className={focus === "practice" ? "btn-accent flex-1" : "btn flex-1"}>
                <ClipboardCheck className="h-4 w-4" /> Practise <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
