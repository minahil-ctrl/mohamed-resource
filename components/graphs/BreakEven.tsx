"use client";
import { useState } from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import GraphFrame from "@/components/ui/GraphFrame";
import { Slider } from "@/components/ui/Slider";
import { fmt, money, niceTicks } from "@/lib/chart";

const W = 680, H = 404, L = 62, R = 22, T = 22, B = 56;

export default function BreakEven() {
  const [fc, setFc] = useState(8000);
  const [price, setPrice] = useState(10);
  const [vc, setVc] = useState(6);
  const [fcast, setFcast] = useState(3000);

  const contrib = price - vc;
  const bep = contrib > 0 ? fc / contrib : null;

  const xt = niceTicks(Math.max(bep ? bep * 1.7 : 0, fcast * 1.25, 100), 5);
  const xmax = xt[xt.length - 1];
  const yt = niceTicks(Math.max(price * xmax, fc + vc * xmax), 5);
  const ymax = yt[yt.length - 1];
  const sx = (x: number) => L + (x / xmax) * (W - L - R);
  const sy = (y: number) => H - B - (y / ymax) * (H - T - B);

  const rev = (q: number) => price * q;
  const tc = (q: number) => fc + vc * q;

  const lossPoly =
    bep && bep < xmax
      ? `${sx(0)},${sy(0)} ${sx(bep)},${sy(rev(bep))} ${sx(0)},${sy(fc)}`
      : `${sx(0)},${sy(0)} ${sx(xmax)},${sy(rev(xmax))} ${sx(xmax)},${sy(tc(xmax))} ${sx(0)},${sy(fc)}`;
  const profitPoly =
    bep && bep < xmax ? `${sx(bep)},${sy(rev(bep))} ${sx(xmax)},${sy(rev(xmax))} ${sx(xmax)},${sy(tc(xmax))}` : "";

  const mos = bep ? fcast - bep : null;
  const profitAtF = contrib * fcast - fc;

  const whatIf = [
    { label: "Raise price by 10%", p: price * 1.1, v: vc, f: fc },
    { label: "Cut variable cost by 10%", p: price, v: vc * 0.9, f: fc },
    { label: "Cut fixed costs by 10%", p: price, v: vc, f: fc * 0.9 },
    { label: "Variable cost up 10%", p: price, v: vc * 1.1, f: fc },
    { label: "Fixed costs up 10%", p: price, v: vc, f: fc * 1.1 },
  ].map((w) => {
    const c = w.p - w.v;
    const b = c > 0 ? w.f / c : null;
    return { ...w, bep: b, delta: b !== null && bep !== null ? b - bep : null };
  });

  return (
    <GraphFrame
      title="Break-even lab"
      caption="Drag the sliders and watch the break-even point move. Revenue starts at the origin; total costs start at the fixed-cost intercept. Profit lies to the right of break-even, loss to the left."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Break-even chart">
            <defs>
              <linearGradient id="be-profit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="be-loss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {yt.map((t) => (
              <g key={`y${t}`}>
                <line x1={L} x2={W - R} y1={sy(t)} y2={sy(t)} className="stroke-white/10" />
                <text x={L - 8} y={sy(t) + 4} textAnchor="end" className="fill-slate-400 text-[11px]">
                  {fmt(t)}
                </text>
              </g>
            ))}
            {xt.map((t) => (
              <g key={`x${t}`}>
                <line x1={sx(t)} x2={sx(t)} y1={T} y2={H - B} className="stroke-white/5" />
                <text x={sx(t)} y={H - B + 18} textAnchor="middle" className="fill-slate-400 text-[11px]">
                  {fmt(t)}
                </text>
              </g>
            ))}
            <polygon points={lossPoly} fill="url(#be-loss)" />
            {profitPoly && <polygon points={profitPoly} fill="url(#be-profit)" />}

            <line x1={L} x2={L} y1={T} y2={H - B} className="stroke-slate-500" />
            <line x1={L} x2={W - R} y1={H - B} y2={H - B} className="stroke-slate-500" />
            <text x={(L + W - R) / 2} y={H - 6} textAnchor="middle" className="fill-slate-300 text-[12px]">
              Output (units)
            </text>
            <text
              transform={`translate(16 ${(T + H - B) / 2}) rotate(-90)`}
              textAnchor="middle"
              className="fill-slate-300 text-[12px]"
            >
              Costs and revenue ($)
            </text>

            <line x1={sx(0)} x2={sx(xmax)} y1={sy(fc)} y2={sy(fc)} className="stroke-slate-400" strokeDasharray="5 5" />
            <text x={sx(xmax) * 0.5 + 40} y={sy(fc) + (fc / ymax > 0.5 ? 16 : -6)} className="fill-slate-400 text-[11px]">
              Fixed costs
            </text>

            <line x1={sx(0)} y1={sy(tc(0))} x2={sx(xmax)} y2={sy(tc(xmax))} className="stroke-rose-400" strokeWidth={2.5} />
            <line x1={sx(0)} y1={sy(0)} x2={sx(xmax)} y2={sy(rev(xmax))} className="stroke-accent" strokeWidth={3} />
            <text
              x={sx(xmax) - 4}
              y={sy(rev(xmax)) + (price >= vc ? -8 : 14)}
              textAnchor="end"
              className="fill-soft text-[12px] font-semibold"
            >
              Revenue
            </text>
            <text
              x={sx(xmax) - 4}
              y={sy(tc(xmax)) + (price >= vc ? 16 : -8)}
              textAnchor="end"
              className="fill-rose-300 text-[12px] font-semibold"
            >
              Total costs
            </text>

            <line x1={sx(fcast)} x2={sx(fcast)} y1={T} y2={H - B} className="stroke-sky-300" strokeDasharray="3 4" />
            <text x={sx(fcast) + 5} y={T + 12} className="fill-sky-300 text-[11px]">
              Forecast {fmt(fcast)}
            </text>
            {bep && mos !== null && mos > 0 && (
              <g>
                <line x1={sx(bep)} x2={sx(fcast)} y1={H - B - 14} y2={H - B - 14} className="stroke-emerald-300" strokeWidth={2} />
                <line x1={sx(bep)} x2={sx(bep)} y1={H - B - 20} y2={H - B - 8} className="stroke-emerald-300" strokeWidth={2} />
                <line x1={sx(fcast)} x2={sx(fcast)} y1={H - B - 20} y2={H - B - 8} className="stroke-emerald-300" strokeWidth={2} />
                <text
                  x={(sx(bep) + sx(fcast)) / 2}
                  y={H - B - 24}
                  textAnchor="middle"
                  className="fill-emerald-300 text-[11px] font-semibold"
                >
                  Margin of safety {fmt(Math.round(mos))}
                </text>
              </g>
            )}

            {bep && bep <= xmax && (
              <g>
                <line x1={sx(bep)} x2={sx(bep)} y1={sy(rev(bep))} y2={H - B} className="stroke-white/60" strokeDasharray="4 4" />
                <line x1={L} x2={sx(bep)} y1={sy(rev(bep))} y2={sy(rev(bep))} className="stroke-white/60" strokeDasharray="4 4" />
                <circle cx={sx(bep)} cy={sy(rev(bep))} r={9} className="animate-pulse fill-white/10" />
                <circle cx={sx(bep)} cy={sy(rev(bep))} r={5} className="fill-white stroke-accent" strokeWidth={2} />
                <text x={sx(bep)} y={H - B + 34} textAnchor="middle" className="fill-white text-[11px] font-semibold">
                  BEP {fmt(Math.round(bep))}
                </text>
              </g>
            )}
            {!bep && (
              <text x={(L + W) / 2} y={T + 40} textAnchor="middle" className="fill-rose-300 text-[13px] font-semibold">
                Variable cost is not below price: the business can never break even
              </text>
            )}
          </svg>
        </div>

        <div className="space-y-4">
          <Slider label="Fixed costs ($)" value={fc} onChange={setFc} min={1000} max={40000} step={500} format={(v) => money(v)} />
          <Slider label="Selling price per unit ($)" value={price} onChange={setPrice} min={2} max={30} step={0.5} format={(v) => money(v, 2)} />
          <Slider label="Variable cost per unit ($)" value={vc} onChange={setVc} min={0.5} max={30} step={0.5} format={(v) => money(v, 2)} />
          <Slider label="Forecast sales (units)" value={fcast} onChange={setFcast} min={100} max={20000} step={100} format={(v) => v.toLocaleString()} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {[
          { k: "Contribution / unit", v: money(contrib, 2), note: "price − variable cost", bad: contrib <= 0 },
          { k: "Break-even output", v: bep ? `${Math.ceil(bep).toLocaleString()} units` : "never", note: "fixed ÷ contribution", bad: false },
          { k: "Break-even revenue", v: bep ? money(Math.ceil(bep) * price) : "n/a", note: "BEP × price", bad: false },
          {
            k: "Margin of safety",
            v: mos !== null ? `${Math.round(mos).toLocaleString()} units` : "n/a",
            note: mos !== null && fcast > 0 ? `${((mos / fcast) * 100).toFixed(0)}% of forecast` : "forecast − BEP",
            bad: mos !== null && mos < 0,
          },
          { k: "Profit at forecast", v: money(profitAtF), note: "contribution × units − fixed", bad: profitAtF < 0 },
        ].map((s) => (
          <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-[11px] uppercase tracking-wider text-slate-400">{s.k}</p>
            <p className={`num mt-1 text-lg font-semibold ${s.bad ? "text-rose-300" : "text-white"}`}>{s.v}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-white/[0.05] text-[11px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-2.5 font-semibold">What if…</th>
              <th className="px-4 py-2.5 font-semibold">New break-even</th>
              <th className="px-4 py-2.5 font-semibold">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {whatIf.map((w) => (
              <tr key={w.label}>
                <td className="px-4 py-2.5 text-slate-200">{w.label}</td>
                <td className="num px-4 py-2.5 text-white">{w.bep ? `${Math.ceil(w.bep).toLocaleString()} units` : "never"}</td>
                <td className="px-4 py-2.5">
                  {w.delta === null || Math.abs(w.delta) < 0.5 ? (
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <Minus className="h-3.5 w-3.5" /> none
                    </span>
                  ) : w.delta < 0 ? (
                    <span className="num inline-flex items-center gap-1 text-emerald-300">
                      <ArrowDown className="h-3.5 w-3.5" /> {Math.abs(Math.round(w.delta)).toLocaleString()} (safer)
                    </span>
                  ) : (
                    <span className="num inline-flex items-center gap-1 text-rose-300">
                      <ArrowUp className="h-3.5 w-3.5" /> {Math.round(w.delta).toLocaleString()} (riskier)
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GraphFrame>
  );
}
