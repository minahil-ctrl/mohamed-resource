"use client";
import { useMemo, useState } from "react";
import GraphFrame from "@/components/ui/GraphFrame";
import { Slider } from "@/components/ui/Slider";

const W = 680;
const N = 40; // total employees

const TITLES = ["CEO", "Directors", "Senior managers", "Managers", "Supervisors", "Team leaders", "Operational staff"];

function levelsFor(span: number): number[] {
  const out: number[] = [];
  let remaining = N;
  let count = 1;
  while (remaining > 0) {
    const c = Math.min(count, remaining);
    out.push(c);
    remaining -= c;
    count = c * span;
  }
  return out;
}

export default function OrgChart() {
  const [span, setSpan] = useState(2);
  const levels = useMemo(() => levelsFor(span), [span]);
  const layers = levels.length;
  const H = Math.max(220, layers * 62 + 40);
  const bottom = levels[layers - 1];
  const managers = N - bottom;
  const type = span <= 3 ? "Tall" : span >= 6 ? "Flat" : "Medium";

  const label = (i: number) => {
    if (i === 0) return "CEO";
    if (i === layers - 1) return "Operational staff";
    const idx = Math.round((i / (layers - 1)) * (TITLES.length - 1));
    return TITLES[Math.min(Math.max(idx, 1), TITLES.length - 2)];
  };

  const xs = useMemo(() => {
    const pad = 54 + 90;
    const usable = W - pad - 54;
    return levels.map((c) => Array.from({ length: c }, (_, j) => pad + ((j + 0.5) * usable) / c));
  }, [levels]);

  const pos = (lvl: number, j: number) => ({
    x: xs[lvl][j],
    y: 34 + lvl * ((H - 70) / Math.max(layers - 1, 1)),
  });

  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let l = 1; l < layers; l++) {
    for (let j = 0; j < levels[l]; j++) {
      const p = pos(l - 1, Math.floor((j * levels[l - 1]) / levels[l]));
      const c = pos(l, j);
      edges.push({ x1: p.x, y1: p.y, x2: c.x, y2: c.y });
    }
  }

  const pros =
    type === "Tall"
      ? ["Close supervision and clear chain of command", "Many promotion steps motivate staff", "Specialist managers"]
      : type === "Flat"
        ? ["Fast communication and decisions", "Lower management cost", "Empowered, more motivated staff"]
        : ["A balance between control and speed"];
  const cons =
    type === "Tall"
      ? ["Slow communication between layers", "High cost: many managers to pay", "Staff far from decision-makers"]
      : type === "Flat"
        ? ["Managers overloaded by wide span", "Fewer promotion opportunities", "Less supervision of staff"]
        : ["Must choose carefully for the task and staff skills"];

  return (
    <GraphFrame
      title="Tall vs flat structure builder"
      caption={`The same ${N} employees are arranged using different spans of control. Notice how a narrow span creates many layers and many managers.`}
    >
      <div className="mb-4 flex flex-wrap items-center gap-3 no-print">
        <button onClick={() => setSpan(2)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${span <= 3 ? "border-accent/60 bg-accent/20 text-white" : "border-white/10 text-slate-300 hover:border-accent/40"}`}>
          Tall preset
        </button>
        <button onClick={() => setSpan(8)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${span >= 6 ? "border-accent/60 bg-accent/20 text-white" : "border-white/10 text-slate-300 hover:border-accent/40"}`}>
          Flat preset
        </button>
        <div className="w-full sm:w-64">
          <Slider label="Span of control" value={span} onChange={setSpan} min={2} max={9} step={1} format={(v) => `${v} per manager`} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${type} organisational structure`}>
          {levels.map((_, i) => (
            <g key={`lbl${i}`}>
              <line x1={8} x2={W - 8} y1={pos(i, 0).y} y2={pos(i, 0).y} className="stroke-white/[0.05]" />
              <text x={8} y={pos(i, 0).y - 8} className="fill-slate-500 text-[10px]">
                L{i + 1} · {label(i)}
              </text>
            </g>
          ))}
          {edges.map((e, i) => (
            <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} className="stroke-accent/40 transition-all duration-500" strokeWidth={1.2} />
          ))}
          {levels.map((c, l) =>
            Array.from({ length: c }).map((_, j) => {
              const p = pos(l, j);
              const r = Math.min(11, (W - 108 - 90) / c / 2.4);
              return (
                <circle
                  key={`${l}-${j}`}
                  cx={p.x}
                  cy={p.y}
                  r={Math.max(r, 3)}
                  className={`transition-all duration-500 ${l === 0 ? "fill-white stroke-accent" : l === layers - 1 ? "fill-accent/30 stroke-accent" : "fill-accent stroke-white/40"}`}
                  strokeWidth={1.5}
                />
              );
            }),
          )}
        </svg>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Structure", type],
              ["Layers", String(layers)],
              ["Span of control", String(span)],
              ["Managers needed", String(managers)],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <p className="text-[11px] uppercase tracking-wider text-slate-400">{k}</p>
                <p className="num mt-1 text-xl font-semibold text-white">{v}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Advantages</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-slate-200">
              {pros.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-rose-400/25 bg-rose-400/[0.06] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-300">Disadvantages</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-slate-200">
              {cons.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <p className="text-xs text-slate-400">
            A message from the CEO to the bottom crosses <strong className="text-white">{layers - 1}</strong> levels: the more layers, the slower and more
            distorted it becomes.
          </p>
        </div>
      </div>
    </GraphFrame>
  );
}
