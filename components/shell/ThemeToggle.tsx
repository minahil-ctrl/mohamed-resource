"use client";
import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Mode = "light" | "dark" | "auto";
const ORDER: Mode[] = ["light", "dark", "auto"];

function apply(mode: Mode) {
  const dark = mode === "dark" || (mode === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("qb.theme") as Mode | null;
      if (saved && ORDER.includes(saved)) setMode(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (mode !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => apply("auto");
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [mode]);

  const next = () => {
    const n = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    setMode(n);
    try {
      localStorage.setItem("qb.theme", n);
    } catch {
      /* ignore */
    }
    apply(n);
  };

  const Icon = mode === "light" ? Sun : mode === "dark" ? Moon : Monitor;
  const label = mode === "light" ? "Light mode" : mode === "dark" ? "Dark mode" : "Match system";
  return (
    <button onClick={next} className="btn !px-3" title={`${label} (click to change)`} aria-label={`Theme: ${label}. Click to change.`}>
      <Icon className="h-4 w-4" />
      <span className="hidden text-xs font-semibold md:inline">{label}</span>
    </button>
  );
}
