"use client";
import { useState } from "react";
import GraphFrame from "@/components/ui/GraphFrame";

const W = 680, H = 360;
const AX = 56, AY = 300; // axis origin
const STAGES = [
  { id: "dev", name: "Development", x0: 56, x1: 140 },
  { id: "intro", name: "Introduction", x0: 140, x1: 235 },
  { id: "growth", name: "Growth", x0: 235, x1: 360 },
  { id: "maturity", name: "Maturity", x0: 360, x1: 500 },
  { id: "decline", name: "Decline", x0: 500, x1: 650 },
] as const;

type StageId = (typeof STAGES)[number]["id"];

const INFO: Record<StageId, { sales: string; profit: string; cash: string; marketing: string; price: string; example: string }> = {
  dev: {
    sales: "None yet. Research and design only.",
    profit: "Negative: money is spent but nothing is earned.",
    cash: "Strong outflow (R&D, testing, prototypes).",
    marketing: "Market research, concept testing, product design.",
    price: "Not set; costs and target price are planned.",
    example: "Zing Drinks taste-tests 12 sugar-free flavours before choosing one.",
  },
  intro: {
    sales: "Low and slow as customers become aware.",
    profit: "Usually a loss: promotion and set-up costs are high.",
    cash: "Negative: heavy spending on launch and distribution.",
    marketing: "Build awareness: samples, adverts, distribution deals.",
    price: "Penetration (low) or skimming (high).",
    example: "Zing Zero launches with free samples at university campuses.",
  },
  growth: {
    sales: "Rising fast as the product catches on.",
    profit: "Rising; losses turn to profit as volumes grow.",
    cash: "Improving, but still needs funds for capacity.",
    marketing: "Persuade and build brand loyalty; widen distribution.",
    price: "Often maintained; competitors start to enter.",
    example: "Supermarkets stock Zing Zero nationally and rivals copy the idea.",
  },
  maturity: {
    sales: "Peak and flatten; the market is saturated.",
    profit: "Highest, but competition squeezes margin.",
    cash: "Strong positive: a cash cow.",
    marketing: "Defend share, differentiate, run extension strategies.",
    price: "Competitive; promotions and multi-buy offers.",
    example: "A leading cola uses new flavours and packs to defend share.",
  },
  decline: {
    sales: "Falling as tastes change or better products arrive.",
    profit: "Falling, possibly into losses.",
    cash: "Weakening; stock may be cleared with discounts.",
    marketing: "Cut promotion, reduce range, or relaunch/withdraw.",
    price: "Discounting to clear stock.",
    example: "Old-style glucose biscuits lose shelf space to healthier snacks.",
  },
};

const SALES =
  "M56,300 L140,300 C165,298 200,282 235,262 C275,215 320,95 360,72 C400,52 455,56 500,84 C545,118 600,205 650,262";
const PROFIT =
  "M56,222 C76,232 108,255 140,262 C175,272 205,262 235,246 C265,230 285,190 320,138 C345,108 365,98 390,98 C430,100 468,122 500,152 C545,198 600,238 650,272";
const EXTENSION = "M470,70 C505,62 540,36 590,30 C615,28 635,30 650,34";

export default function ProductLifeCycle() {
  const [sel, setSel] = useState<StageId>("growth");
  const [showProfit, setShowProfit] = useState(true);
  const [showExt, setShowExt] = useState(false);
  const info = INFO[sel];
  const stage = STAGES.find((s) => s.id === sel)!;

  return (
    <GraphFrame
      title="Product life cycle explorer"
      caption="Click a stage to see what happens to sales, profit, cash flow and marketing. Toggle the extension strategy to see how a firm can delay decline."
    >
      <div className="mb-4 flex flex-wrap gap-2 no-print">
        <button
          onClick={() => setShowProfit((v) => !v)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${showProfit ? "border-lime-ink/60 bg-[#DBE64C]/10 text-lime-ink" : "border-white/10 text-slate-400"}`}
        >
          {showProfit ? "Hide profit curve" : "Show profit curve"}
        </button>
        <button
          onClick={() => setShowExt((v) => !v)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${showExt ? "border-accent/60 bg-accent/15 text-soft" : "border-white/10 text-slate-300 hover:border-accent/40"}`}
        >
          {showExt ? "Remove extension strategy" : "Add extension strategy"}
        </button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Product life cycle curve">
        {STAGES.map((s) => (
          <g key={s.id} onClick={() => setSel(s.id)} className="cursor-pointer">
            <rect
              x={s.x0}
              y={20}
              width={s.x1 - s.x0}
              height={AY - 20}
              className={`transition ${sel === s.id ? "fill-accent/20" : "fill-white/[0.02] hover:fill-white/[0.06]"}`}
            />
            <line x1={s.x1} x2={s.x1} y1={20} y2={AY} className="stroke-white/10" strokeDasharray="3 5" />
            <text
              x={(s.x0 + s.x1) / 2}
              y={AY + 22}
              textAnchor="middle"
              className={`text-[12px] font-semibold ${sel === s.id ? "fill-white" : "fill-slate-400"}`}
            >
              {s.name}
            </text>
          </g>
        ))}
        <line x1={AX} x2={AX} y1={20} y2={AY} className="stroke-slate-500" />
        <line x1={AX} x2={650} y1={AY} y2={AY} className="stroke-slate-500" />
        <text x={(AX + 650) / 2} y={H - 6} textAnchor="middle" className="fill-slate-300 text-[12px]">Time</text>
        <text transform={`translate(16 ${(20 + AY) / 2}) rotate(-90)`} textAnchor="middle" className="fill-slate-300 text-[12px]">
          Sales ($) and profit
        </text>

        {showProfit && (
          <>
            <line x1={AX} x2={650} y1={222} y2={222} className="stroke-lime-ink/40" strokeDasharray="4 4" />
            <text x={AX + 4} y={216} className="fill-lime-ink/80 text-[10px]">zero profit</text>
            <path d={PROFIT} fill="none" className="stroke-lime-ink" strokeWidth={2.5} />
            <text x={392} y={90} className="fill-lime-ink text-[11px] font-semibold">Profit</text>
          </>
        )}
        <path d={SALES} fill="none" className="stroke-accent" strokeWidth={4} strokeLinecap="round" />
        <text x={330} y={62} textAnchor="end" className="fill-soft text-[12px] font-semibold">Sales</text>
        {showExt && (
          <g>
            <path d={EXTENSION} fill="none" className="stroke-soft" strokeWidth={3} strokeDasharray="7 6" strokeLinecap="round" />
            <circle cx={470} cy={70} r={5} className="fill-soft" />
            <text x={560} y={22} textAnchor="middle" className="fill-soft text-[11px] font-semibold">Extension strategy</text>
          </g>
        )}
      </svg>

      <div className="mt-4 grid gap-3 rounded-xl border border-accent/30 bg-accent/[0.07] p-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3">
          <p className="eyebrow">Stage</p>
          <p className="font-serif text-xl font-semibold text-white">{stage.name}</p>
        </div>
        {(
          [
            ["Sales", info.sales],
            ["Profit", info.profit],
            ["Cash flow", info.cash],
            ["Marketing focus", info.marketing],
            ["Pricing", info.price],
            ["FMCG example", info.example],
          ] as const
        ).map(([k, v]) => (
          <div key={k}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-soft">{k}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-slate-200">{v}</p>
          </div>
        ))}
      </div>
    </GraphFrame>
  );
}
