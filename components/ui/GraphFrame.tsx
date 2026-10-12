import { Sparkles } from "lucide-react";

export default function GraphFrame({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card avoid-break overflow-hidden border-accent/25 bg-gradient-to-b from-accent/[0.07] to-transparent p-4 sm:p-6">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-serif text-lg font-semibold text-white">{title}</h4>
        <span className="chip no-print">
          <Sparkles className="h-3.5 w-3.5" /> Interactive
        </span>
      </header>
      {children}
      {caption && <p className="mt-4 text-xs leading-relaxed text-slate-400">{caption}</p>}
    </section>
  );
}
