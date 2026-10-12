"use client";
import { useState } from "react";
import GraphFrame from "@/components/ui/GraphFrame";

type Q = "star" | "question" | "cow" | "dog";

const QUADS: Record<
  Q,
  { name: string; x: number; y: number; fill: string; bubble: string; stroke: string; text: string; share: string; growth: string; cash: string; strategy: string; example: string }
> = {
  question: {
    name: "Question Mark",
    x: 330,
    y: 40,
    fill: "fill-[#1E488F]/15",
    bubble: "fill-[#1E488F]/40",
    stroke: "stroke-[#8FB2EE]",
    text: "text-[#1E488F] dark:text-[#8FB2EE]",
    share: "Low",
    growth: "High",
    cash: "Cash drain: needs heavy investment to grow.",
    strategy: "Decide: invest heavily to turn it into a star, or sell/drop it.",
    example: "Zing Zero in the fast-growing sugar-free market, but with small share so far.",
  },
  star: {
    name: "Star",
    x: 60,
    y: 40,
    fill: "fill-lime-ink/15",
    bubble: "fill-lime-ink/40",
    stroke: "stroke-lime-ink",
    text: "text-lime-ink",
    share: "High",
    growth: "High",
    cash: "Roughly cash-neutral: profits are reinvested.",
    strategy: "Invest to keep leading as the market grows.",
    example: "A leading oat snack bar in a booming healthy-snack market.",
  },
  dog: {
    name: "Dog",
    x: 330,
    y: 190,
    fill: "fill-slate-400/15",
    bubble: "fill-slate-400/40",
    stroke: "stroke-slate-300",
    text: "text-slate-300",
    share: "Low",
    growth: "Low",
    cash: "Low profit; may just break even or lose money.",
    strategy: "Harvest, reposition or drop; keep only if it helps sell other products.",
    example: "An old-style glucose biscuit as shoppers move to healthier snacks.",
  },
  cow: {
    name: "Cash Cow",
    x: 60,
    y: 190,
    fill: "fill-[#74C365]/15",
    bubble: "fill-[#74C365]/40",
    stroke: "stroke-[#74C365]",
    text: "text-[#74C365]",
    share: "High",
    growth: "Low",
    cash: "Cash generator: earns more than it needs.",
    strategy: "'Milk' for cash to fund question marks; defend share cheaply.",
    example: "A classic cola brand: leading share in a mature, slow-growing market.",
  },
};

const BUBBLES: { name: string; q: Q; cx: number; cy: number; r: number }[] = [
  { name: "Oat Crunch Bar", q: "star", cx: 160, cy: 110, r: 34 },
  { name: "Zing Zero", q: "question", cx: 440, cy: 120, r: 24 },
  { name: "Classic Cola", q: "cow", cx: 170, cy: 270, r: 48 },
  { name: "Glucose Biscuit", q: "dog", cx: 440, cy: 270, r: 28 },
];

export default function Boston() {
  const [sel, setSel] = useState<Q>("cow");
  const info = QUADS[sel];

  return (
    <GraphFrame
      title="Boston Matrix"
      caption="Click a quadrant or a product bubble. Bubble size shows revenue. High share is on the LEFT by convention."
    >
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <svg viewBox="0 0 600 380" className="h-auto w-full" role="img" aria-label="Boston Matrix">
          <text x={315} y={364} textAnchor="middle" className="fill-slate-300 text-[12px]">
            Relative market share  (High ← → Low)
          </text>
          <text transform="translate(16 190) rotate(-90)" textAnchor="middle" className="fill-slate-300 text-[12px]">
            Market growth  (Low ← → High)
          </text>
          {(Object.keys(QUADS) as Q[]).map((k) => {
            const q = QUADS[k];
            const active = sel === k;
            return (
              <g key={k} onClick={() => setSel(k)} className="cursor-pointer">
                <rect
                  x={q.x}
                  y={q.y}
                  width={250}
                  height={150}
                  rx={14}
                  className={`${q.fill} transition ${active ? q.stroke : "stroke-white/10"}`}
                  strokeWidth={active ? 2.5 : 1}
                />
                <text x={q.x + 16} y={q.y + 28} className={`text-[13px] font-semibold ${active ? "fill-white" : "fill-slate-300"}`}>
                  {q.name}
                </text>
              </g>
            );
          })}
          {/* cash flow arrow: cow -> question mark */}
          <path d="M240 200 C 270 160, 290 120, 330 100" fill="none" className="stroke-white/50" strokeDasharray="5 5" strokeWidth={2} />
          <polygon points="330,100 318,100 324,110" className="fill-white/60" />
          <text x={252} y={150} className="fill-white/60 text-[10px]">cash funds</text>
          {BUBBLES.map((b) => (
            <g key={b.name} onClick={() => setSel(b.q)} className="cursor-pointer">
              <circle cx={b.cx + 15} cy={b.cy + 10} r={b.r} className={`${QUADS[b.q].bubble} ${QUADS[b.q].stroke}`} strokeWidth={2} />
              <text x={b.cx + 15} y={b.cy + 14} textAnchor="middle" className="fill-white text-[10px] font-semibold">
                {b.name.split(" ")[0]}
              </text>
              <text x={b.cx + 15} y={b.cy + 26} textAnchor="middle" className="fill-white/80 text-[9px]">
                {b.name.split(" ").slice(1).join(" ")}
              </text>
            </g>
          ))}
        </svg>

        <div className="rounded-xl border border-accent/30 bg-accent/[0.07] p-4">
          <p className="eyebrow">Selected</p>
          <h5 className={`font-serif text-2xl font-semibold ${info.text}`}>{info.name}</h5>
          <dl className="mt-3 space-y-3 text-sm">
            <div className="flex gap-6">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-slate-400">Market share</dt>
                <dd className="font-semibold text-white">{info.share}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-slate-400">Market growth</dt>
                <dd className="font-semibold text-white">{info.growth}</dd>
              </div>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-slate-400">Cash position</dt>
              <dd className="text-slate-200">{info.cash}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-slate-400">Strategy</dt>
              <dd className="text-slate-200">{info.strategy}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-slate-400">FMCG example</dt>
              <dd className="text-slate-200">{info.example}</dd>
            </div>
          </dl>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-slate-300">
            <strong className="text-white">Exam tip:</strong> the matrix classifies products; it does not prove a decision. For 9 and 12 marks add
            context: how much cash is the cow really making, and is the question mark's market still growing?
          </p>
        </div>
      </div>
    </GraphFrame>
  );
}
