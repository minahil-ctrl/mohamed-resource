"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export interface Tab {
  id: string;
  label: string;
  hint?: string;
  node: React.ReactNode;
}

/** Segmented tabs that keep every panel mounted (so anchors and stars always resolve) and mirror the choice in ?view=. */
export default function ViewTabs({ tabs, param = "view" }: { tabs: Tab[]; param?: string }) {
  const params = useSearchParams();
  const initial = params.get(param);
  const [active, setActive] = useState(tabs.find((t) => t.id === initial)?.id ?? tabs[0].id);

  useEffect(() => {
    const want = params.get(param);
    if (want && tabs.some((t) => t.id === want)) setActive(want);
  }, [params, param, tabs]);

  // deep links (#id) must scroll once the right panel is visible
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (!h) return;
    const t = setTimeout(() => {
      const el = document.getElementById(h);
      if (el) {
        el.scrollIntoView({ block: "center" });
        el.classList.add("mark-hit");
        setTimeout(() => el.classList.remove("mark-hit"), 2500);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [active]);

  const choose = (id: string) => {
    setActive(id);
    const u = new URL(window.location.href);
    u.searchParams.set(param, id);
    u.hash = "";
    window.history.replaceState(null, "", u.toString());
  };

  return (
    <div>
      <div role="tablist" className="no-print mb-6 inline-flex max-w-full overflow-x-auto rounded-2xl border border-white/15 bg-white/[0.04] p-1 no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => choose(t.id)}
            className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold transition ${active === t.id ? "bg-accent text-shell" : "text-white/70 hover:text-white"}`}
          >
            {t.label}
            {t.hint && <span className={`ml-2 text-xs font-semibold ${active === t.id ? "text-shell/70" : "text-white/40"}`}>{t.hint}</span>}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" hidden={active !== t.id} className="print:!block">
          {t.node}
        </div>
      ))}
    </div>
  );
}
