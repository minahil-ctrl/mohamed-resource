"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search, X } from "lucide-react";
import type { Hit } from "@/lib/search";
import { unitById } from "@/lib/units";

type SearchFn = (q: string, limit?: number) => Hit[];

const KIND_STYLE: Record<string, string> = {
  Topic: "bg-white/10 text-white",
  Term: "bg-sky-400/15 text-sky-700 dark:text-sky-300",
  Formula: "bg-amber-400/15 text-amber-700 dark:text-amber-300",
  Application: "bg-emerald-400/15 text-emerald-700 dark:text-emerald-300",
  "Red flag": "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  Quiz: "bg-violet-400/15 text-violet-700 dark:text-violet-300",
  "Exam Q": "bg-fuchsia-400/15 text-fuchsia-700 dark:text-fuchsia-300",
};

export default function SearchBox() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [hits, setHits] = useState<Hit[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<SearchFn | null>(null);

  const run = useCallback(async (value: string) => {
    if (!searchRef.current) {
      const mod = await import("@/lib/search");
      searchRef.current = mod.search;
    }
    setHits(searchRef.current(value));
    setActive(0);
  }, []);

  useEffect(() => {
    if (q.trim().length < 2) {
      setHits([]);
      return;
    }
    void run(q);
  }, [q, run]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const go = (h: Hit) => {
    setOpen(false);
    setQ("");
    router.push(h.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && hits[active]) {
      e.preventDefault();
      go(hits[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const show = open && q.trim().length >= 2;

  return (
    <div ref={boxRef} className="relative">
      <div className="flex w-44 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition focus-within:border-accent/60 focus-within:bg-white/[0.08] focus-within:shadow-glow sm:w-56 lg:w-72">
        <Search className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search the syllabus…"
          aria-label="Search the whole syllabus"
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />
        {q ? (
          <button onClick={() => setQ("")} aria-label="Clear search" className="text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        ) : (
          <kbd className="hidden rounded border border-white/15 px-1.5 text-[10px] text-slate-400 lg:block">/</kbd>
        )}
      </div>

      {show && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(92vw,34rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#00172f]/95 shadow-lift backdrop-blur-xl">
          {hits.length === 0 ? (
            <p className="px-4 py-6 text-sm text-slate-400">No matches. Try a shorter keyword such as “margin” or “loan”.</p>
          ) : (
            <ul className="max-h-[60vh] overflow-y-auto scroll-thin py-1">
              {hits.map((h, i) => {
                const u = unitById(h.unit);
                return (
                  <li key={`${h.kind}-${h.href}-${i}`}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(h)}
                      className={`flex w-full items-start gap-3 px-4 py-2.5 text-left transition ${active === i ? "bg-white/[0.07]" : ""}`}
                    >
                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full"
                        style={{ background: u.hex, boxShadow: `0 0 10px ${u.hex}` }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className={`shrink-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${KIND_STYLE[h.kind]}`}>
                            {h.kind}
                          </span>
                          <span className="truncate text-sm font-medium text-white">{h.title}</span>
                        </span>
                        <span className="mt-0.5 line-clamp-1 block text-xs text-slate-400">{h.snippet}</span>
                      </span>
                      {active === i && <CornerDownLeft className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-500" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="border-t border-white/10 px-4 py-2 text-[11px] text-slate-500">
            ↑ ↓ to move · Enter to open · Esc to close
          </div>
        </div>
      )}
    </div>
  );
}
