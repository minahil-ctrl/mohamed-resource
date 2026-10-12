"use client";
import { useState } from "react";
import GraphFrame from "@/components/ui/GraphFrame";

const LEVELS = [
  {
    name: "Physiological",
    sub: "Food, water, shelter",
    work: "A wage high enough to pay for food and rent.",
    firm: "Fair basic pay; breaks and rest areas.",
    herz: "Hygiene factor (pay).",
    example: "A supermarket cashier on minimum wage worrying about rent will not respond to 'team spirit' alone.",
  },
  {
    name: "Safety",
    sub: "Security, stability",
    work: "A permanent contract; a safe workplace.",
    firm: "Permanent contracts, health and safety, pension.",
    herz: "Hygiene factors (job security, conditions).",
    example: "Moving seasonal stackers onto permanent contracts removes fear of sudden job loss.",
  },
  {
    name: "Social",
    sub: "Belonging, friendship",
    work: "Being part of a team and feeling accepted.",
    firm: "Team projects, social events, friendly culture.",
    herz: "Hygiene factor (relationships).",
    example: "Team-based shifts in a bakery where colleagues cover for each other.",
  },
  {
    name: "Esteem",
    sub: "Recognition, status",
    work: "Respect, praise, promotion, a job title.",
    firm: "Recognition schemes, promotion, responsibility.",
    herz: "Motivator (recognition, advancement).",
    example: "'Employee of the month' with a reserved parking space and a thank-you note.",
  },
  {
    name: "Self-actualisation",
    sub: "Fulfilling potential",
    work: "Challenging work and personal growth.",
    firm: "Job enrichment, development programmes, creative freedom.",
    herz: "Motivator (the work itself, achievement).",
    example: "A checkout assistant trained to manage a team and run store promotions.",
  },
];

const W = 560, CX = 280, BASE = 330, STEP = 62, TOPY = 20;
const hw = (y: number) => 40 + ((y - TOPY) / (BASE - TOPY)) * 240;

export default function Maslow() {
  const [sel, setSel] = useState(3);
  const info = LEVELS[sel];

  return (
    <GraphFrame
      title="Maslow's hierarchy of needs"
      caption="Lower needs must be reasonably met before higher ones motivate. Herzberg's hygiene factors map to the lower levels; his motivators map to the upper levels."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <svg viewBox={`0 0 ${W} 350`} className="h-auto w-full" role="img" aria-label="Maslow pyramid">
          {LEVELS.map((l, i) => {
            const yb = BASE - i * STEP;
            const yt = yb - (STEP - 4);
            const pts = `${CX - hw(yb)},${yb} ${CX + hw(yb)},${yb} ${CX + hw(yt)},${yt} ${CX - hw(yt)},${yt}`;
            const active = sel === i;
            return (
              <g key={l.name} onClick={() => setSel(i)} className="cursor-pointer">
                <polygon
                  points={pts}
                  className={`transition ${active ? "fill-accent stroke-white" : "fill-accent/20 stroke-accent/50 hover:fill-accent/40"}`}
                  strokeWidth={active ? 2 : 1}
                />
                <text x={CX} y={yb - 28} textAnchor="middle" className={`text-[13px] font-semibold ${active ? "fill-white" : "fill-slate-100"}`}>
                  {l.name}
                </text>
                <text x={CX} y={yb - 12} textAnchor="middle" className={`text-[10px] ${active ? "fill-white/90" : "fill-slate-400"}`}>
                  {l.sub}
                </text>
              </g>
            );
          })}
          <text x={8} y={346} className="fill-slate-500 text-[10px]">Hygiene factors (prevent dissatisfaction)</text>
          <text x={W - 8} y={34} textAnchor="end" className="fill-slate-500 text-[10px]">Motivators (create motivation)</text>
        </svg>
        <div className="rounded-xl border border-accent/30 bg-accent/[0.07] p-4">
          <p className="eyebrow">Level {sel + 1} of 5</p>
          <h5 className="font-serif text-2xl font-semibold text-white">{info.name}</h5>
          <dl className="mt-3 space-y-3 text-sm">
            {(
              [
                ["At work this looks like", info.work],
                ["How a business meets it", info.firm],
                ["Herzberg link", info.herz],
                ["FMCG / retail example", info.example],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-soft">{k}</dt>
                <dd className="mt-0.5 text-slate-200">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-slate-300">
            <strong className="text-white">Exam tip:</strong> name the need AND the method: &ldquo;Recognition meets esteem needs, so an employee-of-the-month
            scheme may motivate staff once their pay and job security are satisfied.&rdquo;
          </p>
        </div>
      </div>
    </GraphFrame>
  );
}
