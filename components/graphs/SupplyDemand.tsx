"use client";
import { useState } from "react";
import GraphFrame from "@/components/ui/GraphFrame";
import { Slider } from "@/components/ui/Slider";

const W = 640, H = 380, L = 56, R = 24, T = 20, B = 48;
const QMAX = 140, PMAX = 120;
const sx = (q: number) => L + (q / QMAX) * (W - L - R);
const sy = (p: number) => H - B - (p / PMAX) * (H - T - B);

/** Demand: P = 100 + sd − Q. Supply: P = 0.8 (Q − ss) + 10. */
const dP = (q: number, sd: number) => 100 + sd - q;
const sP = (q: number, ss: number) => 0.8 * (q - ss) + 10;
const eq = (sd: number, ss: number) => {
  const q = (90 + sd + 0.8 * ss) / 1.8;
  return { q, p: dP(q, sd) };
};

const SCENARIOS = [
  { label: "Heatwave: bottled water demand rises", sd: 25, ss: 0, why: "A hot spell raises demand at every price (demand shifts right)." },
  { label: "Health scare about sugary drinks", sd: -25, ss: 0, why: "Tastes change against the product (demand shifts left)." },
  { label: "Sugar price rises", sd: 0, ss: -25, why: "Higher input costs reduce supply at every price (supply shifts left)." },
  { label: "New bottling technology", sd: 0, ss: 25, why: "Lower costs raise supply at every price (supply shifts right)." },
  { label: "Festival: demand up AND costs up", sd: 20, ss: -15, why: "Both curves shift. Price rises for sure, but quantity depends on which shift is bigger." },
];

export default function SupplyDemand() {
  const [sd, setSd] = useState(0);
  const [ss, setSs] = useState(0);
  const [why, setWhy] = useState("Use the sliders or pick a scenario to shift demand or supply.");

  const e0 = eq(0, 0);
  const e1 = eq(sd, ss);
  const dp = e1.p - e0.p;
  const dq = e1.q - e0.q;
  const dir = (v: number) => (Math.abs(v) < 0.5 ? "unchanged" : v > 0 ? "rises" : "falls");

  const dLine = (shift: number) => {
    const q0 = Math.max(0, shift - 20), q1 = Math.min(QMAX, 100 + shift);
    return { x1: sx(q0), y1: sy(dP(q0, shift)), x2: sx(q1), y2: sy(dP(q1, shift)) };
  };
  const sLine = (shift: number) => {
    const q0 = Math.max(0, shift - 12.5), q1 = Math.min(QMAX, shift + 137.5);
    return { x1: sx(q0), y1: sy(sP(q0, shift)), x2: sx(q1), y2: sy(sP(q1, shift)) };
  };

  const D0 = dLine(0), S0 = sLine(0), D1 = dLine(sd), S1 = sLine(ss);
  const dShifted = sd !== 0, sShifted = ss !== 0;

  return (
    <GraphFrame
      title="Supply & demand equilibrium lab"
      caption="A change in price moves you ALONG a curve; any other factor SHIFTS the curve. Faded lines are the original curves."
    >
      <div className="mb-4 flex flex-wrap gap-2 no-print">
        {SCENARIOS.map((s) => (
          <button
            key={s.label}
            onClick={() => {
              setSd(s.sd);
              setSs(s.ss);
              setWhy(s.why);
            }}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-accent/60 hover:bg-accent/15"
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={() => {
            setSd(0);
            setSs(0);
            setWhy("Reset to the original equilibrium.");
          }}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:text-white"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Supply and demand diagram">
          {[0, 20, 40, 60, 80, 100, 120].map((p) => (
            <g key={p}>
              <line x1={L} x2={W - R} y1={sy(p)} y2={sy(p)} className="stroke-white/[0.07]" />
              <text x={L - 8} y={sy(p) + 4} textAnchor="end" className="fill-slate-500 text-[10px]">{p}</text>
            </g>
          ))}
          {[0, 20, 40, 60, 80, 100, 120, 140].map((q) => (
            <text key={q} x={sx(q)} y={H - B + 16} textAnchor="middle" className="fill-slate-500 text-[10px]">{q}</text>
          ))}
          <line x1={L} x2={L} y1={T} y2={H - B} className="stroke-slate-500" />
          <line x1={L} x2={W - R} y1={H - B} y2={H - B} className="stroke-slate-500" />
          <text x={(L + W - R) / 2} y={H - 8} textAnchor="middle" className="fill-slate-300 text-[12px]">Quantity (Q)</text>
          <text transform={`translate(14 ${(T + H - B) / 2}) rotate(-90)`} textAnchor="middle" className="fill-slate-300 text-[12px]">Price (P)</text>

          <line {...D0} className={dShifted ? "stroke-sky-300/35" : "stroke-sky-300"} strokeWidth={dShifted ? 2 : 3} strokeDasharray={dShifted ? "5 5" : undefined} />
          <line {...S0} className={sShifted ? "stroke-amber-300/35" : "stroke-amber-300"} strokeWidth={sShifted ? 2 : 3} strokeDasharray={sShifted ? "5 5" : undefined} />
          {dShifted && <line {...D1} className="stroke-sky-300" strokeWidth={3} />}
          {sShifted && <line {...S1} className="stroke-amber-300" strokeWidth={3} />}

          <text x={D0.x1 + 6} y={D0.y1 + 14} className="fill-sky-300 text-[12px] font-semibold">D{dShifted ? "₀" : ""}</text>
          <text x={S0.x2 - 22} y={S0.y2 - 6} className="fill-amber-300 text-[12px] font-semibold">S{sShifted ? "₀" : ""}</text>
          {dShifted && <text x={D1.x1 + 6} y={D1.y1 + 14} className="fill-sky-300 text-[12px] font-semibold">D₁</text>}
          {sShifted && <text x={S1.x2 - 22} y={S1.y2 - 6} className="fill-amber-300 text-[12px] font-semibold">S₁</text>}

          {(dShifted || sShifted) && (
            <g>
              <circle cx={sx(e0.q)} cy={sy(e0.p)} r={5} className="fill-white/40" />
              <text x={sx(e0.q) + 8} y={sy(e0.p) + 16} className="fill-white/50 text-[11px]">E₀</text>
            </g>
          )}
          <line x1={sx(e1.q)} x2={sx(e1.q)} y1={sy(e1.p)} y2={H - B} className="stroke-white/60" strokeDasharray="4 4" />
          <line x1={L} x2={sx(e1.q)} y1={sy(e1.p)} y2={sy(e1.p)} className="stroke-white/60" strokeDasharray="4 4" />
          <circle cx={sx(e1.q)} cy={sy(e1.p)} r={9} className="animate-pulse fill-white/10" />
          <circle cx={sx(e1.q)} cy={sy(e1.p)} r={5.5} className="fill-white stroke-accent" strokeWidth={2} />
          <text x={sx(e1.q) + 10} y={sy(e1.p) - 10} className="fill-white text-[12px] font-semibold">
            {dShifted || sShifted ? "E₁" : "Equilibrium"}
          </text>
          <text x={sx(e1.q)} y={H - B + 32} textAnchor="middle" className="num fill-white text-[11px] font-semibold">Q = {e1.q.toFixed(0)}</text>
          <text x={L + 8} y={sy(e1.p) - 7} className="num fill-white text-[11px] font-semibold">P = {e1.p.toFixed(0)}</text>
        </svg>

        <div className="space-y-4">
          <Slider label="Demand shift (D)" value={sd} onChange={(v) => { setSd(v); setWhy("Demand shifts when income, tastes, population, advertising or the price of substitutes changes."); }} min={-40} max={40} step={1} format={(v) => (v === 0 ? "none" : v > 0 ? `→ right ${v}` : `← left ${-v}`)} />
          <Slider label="Supply shift (S)" value={ss} onChange={(v) => { setSs(v); setWhy("Supply shifts when costs, technology, taxes or the number of producers change."); }} min={-40} max={40} step={1} format={(v) => (v === 0 ? "none" : v > 0 ? `→ right ${v}` : `← left ${-v}`)} />
          <div className="rounded-xl border border-accent/30 bg-accent/[0.07] p-4 text-sm">
            <p className="eyebrow mb-1">Outcome</p>
            <p className="text-slate-100">
              Equilibrium price <strong className="text-white">{dir(dp)}</strong>
              {Math.abs(dp) >= 0.5 && <span className="num text-soft"> ({dp > 0 ? "+" : ""}{dp.toFixed(0)})</span>}; quantity{" "}
              <strong className="text-white">{dir(dq)}</strong>
              {Math.abs(dq) >= 0.5 && <span className="num text-soft"> ({dq > 0 ? "+" : ""}{dq.toFixed(0)})</span>}.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{why}</p>
          </div>
          <p className="text-xs text-slate-400">
            Label rule: <strong className="text-white">axes</strong> (P and Q), <strong className="text-white">curves</strong> (D, S, D₁, S₁),{" "}
            <strong className="text-white">equilibrium</strong> (P, Q). Three easy marks.
          </p>
        </div>
      </div>
    </GraphFrame>
  );
}
