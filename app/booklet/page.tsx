import type { Metadata } from "next";
import { BookMarked, Printer } from "lucide-react";
import { CHAPTERS, chaptersOf } from "@/lib/content";
import { UNITS } from "@/lib/units";
import { STUDENT_NAME, DISCLAIMER } from "@/lib/config";
import ChapterCheatSheet from "@/components/learn/ChapterCheatSheet";
import PrintButton from "@/components/ui/PrintButton";
import MarkGuide from "@/components/practice/MarkGuide";
import UnitIcon from "@/components/ui/UnitIcon";

export const metadata: Metadata = { title: "Print Booklet" };

export default function BookletPage() {
  const formulas = UNITS.map((u) => ({ u, items: chaptersOf(u.id).flatMap((c) => c.formulas.map((f) => ({ f, code: c.code }))) }));

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6">
      <header className="pat card overflow-hidden p-8 sm:p-12">
        <p className="eyebrow flex items-center gap-2"><BookMarked className="h-4 w-4" /> Print-ready booklet</p>
        <h1 className="h-display mt-2 text-5xl text-white sm:text-6xl">Edexcel IGCSE Business</h1>
        <p className="mt-2 text-2xl font-semibold text-white/80">Cheat sheets for all {CHAPTERS.length} topics</p>
        <p className="mt-4 max-w-2xl text-white/70">
          Prepared for {STUDENT_NAME}. Use <strong className="text-white">Print / Save as PDF</strong> to export. The print layout switches to black and white and
          removes navigation. For the long version of any topic, open its Full notes page.
        </p>
        <div className="no-print mt-6 flex flex-wrap gap-3">
          <PrintButton />
          <span className="chip"><Printer className="h-3.5 w-3.5" /> Choose &ldquo;Save as PDF&rdquo;, A4</span>
        </div>
      </header>

      <section className="page-break avoid-break">
        <h2 className="mb-4 text-3xl font-bold text-white">One-page formula sheet</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {formulas.map(({ u, items }) => (
            <div key={u.id} className="card avoid-break p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-lime-ink">
                <UnitIcon icon={u.icon} className="h-4 w-4" /> Unit {u.number}: {u.short}
              </h3>
              {items.length === 0 ? (
                <p className="text-sm text-white/60">No formulas: definitions and evaluation focus.</p>
              ) : (
                <ul className="space-y-2">
                  {items.map(({ f, code }) => (
                    <li key={f} className="text-sm text-white/90"><span className="num mr-1 font-bold text-lime-ink">{code}</span>{f}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {UNITS.map((u) => (
        <section key={u.id} className="page-break space-y-8">
          <div className="flex items-center gap-4 border-b border-accent pb-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-shell">
              <UnitIcon icon={u.icon} className="h-7 w-7" />
            </span>
            <div>
              <p className="eyebrow">Unit {u.number}</p>
              <h2 className="h-display text-4xl text-white">{u.name}</h2>
            </div>
          </div>
          {chaptersOf(u.id).map((c) => (
            <article key={c.id} className="avoid-break space-y-4">
              <h3 className="text-2xl font-bold text-white"><span className="num mr-2 text-accent-ink">{c.code}</span>{c.title}</h3>
              <ChapterCheatSheet ch={c} expanded />
            </article>
          ))}
        </section>
      ))}

      <section className="page-break space-y-6">
        <h2 className="text-3xl font-bold text-white">Exam technique</h2>
        <MarkGuide />
        <p className="text-xs text-white/50">{DISCLAIMER}</p>
      </section>
    </div>
  );
}
