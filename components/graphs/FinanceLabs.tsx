"use client";
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import GraphFrame from "@/components/ui/GraphFrame";
import { NumField, Slider } from "@/components/ui/Slider";
import { fmt, money } from "@/lib/chart";

/* ------------------------------------------------------------------ */
/*  Ratio analysis                                                     */
/* ------------------------------------------------------------------ */
interface Year {
  rev: number;
  cos: number;
  exp: number;
  ce: number;
}

const calc = (y: Year) => {
  const gp = y.rev - y.cos;
  const np = gp - y.exp;
  return {
    gp,
    np,
    gpm: y.rev ? (gp / y.rev) * 100 : 0,
    npm: y.rev ? (np / y.rev) * 100 : 0,
    roce: y.ce ? (np / y.ce) * 100 : 0,
  };
};

function Delta({ a, b, unit = "pts" }: { a: number; b: number; unit?: string }) {
  const d = b - a;
  if (Math.abs(d) < 0.05) return <span className="inline-flex items-center gap-1 text-slate-400"><Minus className="h-3.5 w-3.5" /> 0</span>;
  const up = d > 0;
  return (
    <span className={`num inline-flex items-center gap-1 ${up ? "text-emerald-300" : "text-rose-300"}`}>
      {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
      {up ? "+" : ""}
      {d.toFixed(1)} {unit}
    </span>
  );
}

export function RatiosLab() {
  const [y1, setY1] = useState<Year>({ rev: 200000, cos: 120000, exp: 50000, ce: 250000 });
  const [y2, setY2] = useState<Year>({ rev: 240000, cos: 150000, exp: 60000, ce: 260000 });
  const a = calc(y1), b = calc(y2);

  const notes: string[] = [];
  const dg = b.gpm - a.gpm, dn = b.npm - a.npm, dr = b.roce - a.roce;
  if (dg < -0.5) notes.push(`Gross margin fell by ${Math.abs(dg).toFixed(1)} points: cost of sales grew faster than revenue. Check supplier prices, discounting or product mix.`);
  else if (dg > 0.5) notes.push(`Gross margin improved by ${dg.toFixed(1)} points: better pricing, cheaper inputs or a richer product mix.`);
  else notes.push("Gross margin is broadly stable, so direct cost control is unchanged.");
  if (dn < -0.5 && dg >= -0.5) notes.push("Net margin fell although gross margin held up: overheads (staff, rent, energy, marketing) rose faster than revenue.");
  else if (dn < -0.5) notes.push(`Net margin fell by ${Math.abs(dn).toFixed(1)} points, partly due to the weaker gross margin and partly due to overheads.`);
  else if (dn > 0.5) notes.push(`Net margin improved by ${dn.toFixed(1)} points: overheads are being controlled relative to sales.`);
  if (dr < -0.5) notes.push(`ROCE fell to ${b.roce.toFixed(1)}%: the capital invested is earning less. Compare with the bank rate before judging.`);
  else if (dr > 0.5) notes.push(`ROCE improved to ${b.roce.toFixed(1)}%: more profit per dollar invested.`);
  if (y2.rev > y1.rev && b.np <= a.np) notes.push("Revenue grew but net profit did not: growth in sales is not the same as growth in profit.");

  const field = (label: string, k: keyof Year, y: Year, set: (y: Year) => void) => (
    <NumField label={label} prefix="$" value={y[k]} onChange={(v) => set({ ...y, [k]: v })} step={1000} />
  );

  const rows: [string, string, string, React.ReactNode][] = [
    ["Gross profit", money(a.gp), money(b.gp), <Delta key="gp" a={a.gp / 1000} b={b.gp / 1000} unit="k" />],
    ["Gross profit margin", `${a.gpm.toFixed(1)}%`, `${b.gpm.toFixed(1)}%`, <Delta key="gpm" a={a.gpm} b={b.gpm} />],
    ["Net profit", money(a.np), money(b.np), <Delta key="np" a={a.np / 1000} b={b.np / 1000} unit="k" />],
    ["Net profit margin", `${a.npm.toFixed(1)}%`, `${b.npm.toFixed(1)}%`, <Delta key="npm" a={a.npm} b={b.npm} />],
    ["ROCE", `${a.roce.toFixed(1)}%`, `${b.roce.toFixed(1)}%`, <Delta key="roce" a={a.roce} b={b.roce} />],
  ];

  return (
    <GraphFrame
      title="Income statement & ratio lab"
      caption="Edit either year. Net profit here is operating profit (gross profit − expenses). Always say what changed AND why."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { t: "Year 1", y: y1, set: setY1 },
          { t: "Year 2", y: y2, set: setY2 },
        ].map(({ t, y, set }) => (
          <div key={t} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="eyebrow mb-3">{t}</p>
            <div className="grid grid-cols-2 gap-3">
              {field("Revenue", "rev", y, set)}
              {field("Cost of sales", "cos", y, set)}
              {field("Expenses", "exp", y, set)}
              {field("Capital employed", "ce", y, set)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-white/[0.05] text-[11px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-2.5">Measure</th><th className="px-4 py-2.5">Year 1</th><th className="px-4 py-2.5">Year 2</th><th className="px-4 py-2.5">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map(([k, v1, v2, d]) => (
              <tr key={k}>
                <td className="px-4 py-2.5 text-slate-200">{k}</td>
                <td className="num px-4 py-2.5 text-white">{v1}</td>
                <td className="num px-4 py-2.5 text-white">{v2}</td>
                <td className="px-4 py-2.5">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 rounded-xl border border-accent/30 bg-accent/[0.07] p-4">
        <p className="eyebrow mb-2">Auto-commentary (copy the style, not the words)</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-100">
          {notes.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </div>
    </GraphFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Investment appraisal                                               */
/* ------------------------------------------------------------------ */
export function InvestmentLab() {
  const [inv, setInv] = useState(100000);
  const [flows, setFlows] = useState<number[]>([20000, 30000, 35000, 35000, 30000]);
  const [target, setTarget] = useState(8);
  const [maxPay, setMaxPay] = useState(4);

  const total = flows.reduce((s, f) => s + f, 0);
  const years = flows.length;
  const avg = (total - inv) / years;
  const arr = inv ? (avg / inv) * 100 : 0;

  let cum = 0;
  let payback: number | null = null;
  const cums = flows.map((f) => (cum += f));
  for (let i = 0; i < flows.length; i++) {
    const before = i === 0 ? 0 : cums[i - 1];
    if (before < inv && cums[i] >= inv) {
      payback = i + (inv - before) / flows[i];
      break;
    }
  }

  const maxV = Math.max(inv, ...cums) * 1.1;
  const W = 520, H = 220, L = 44, B = 30, T = 14;
  const bw = (W - L - 10) / years;
  const sy = (v: number) => H - B - (v / maxV) * (H - B - T);

  return (
    <GraphFrame
      title="Investment appraisal lab: payback & ARR"
      caption="Payback ignores profits after the cost is recovered; ARR uses the whole life of the project. Strong answers use both and add a non-financial factor."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <NumField label="Initial investment" prefix="$" value={inv} onChange={setInv} step={5000} />
          <div>
            <p className="mb-1 text-xs font-medium text-slate-300">Net cash returns each year</p>
            <div className="grid grid-cols-5 gap-2">
              {flows.map((f, i) => (
                <label key={i} className="block">
                  <span className="mb-0.5 block text-center text-[10px] text-slate-500">Y{i + 1}</span>
                  <input
                    type="number"
                    value={f}
                    step={1000}
                    onChange={(e) => setFlows(flows.map((v, j) => (j === i ? Number(e.target.value) || 0 : v)))}
                    className="num w-full rounded-lg border border-white/10 bg-white/5 px-1.5 py-1.5 text-center text-xs text-white focus:border-accent/60 focus:outline-none"
                  />
                </label>
              ))}
            </div>
          </div>
          <Slider label="Target ARR (e.g. bank rate + risk premium)" value={target} onChange={setTarget} min={1} max={30} step={1} format={(v) => `${v}%`} />
          <Slider label="Maximum acceptable payback" value={maxPay} onChange={setMaxPay} min={1} max={5} step={0.5} format={(v) => `${v} yrs`} />
        </div>

        <div>
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Cumulative cash returns against investment">
            <line x1={L} x2={L} y1={T} y2={H - B} className="stroke-slate-500" />
            <line x1={L} x2={W - 10} y1={H - B} y2={H - B} className="stroke-slate-500" />
            {cums.map((c, i) => (
              <g key={i}>
                <rect
                  x={L + i * bw + 8}
                  y={sy(c)}
                  width={bw - 16}
                  height={Math.max(H - B - sy(c), 0)}
                  rx={4}
                  className={c >= inv ? "fill-emerald-400/60" : "fill-accent/50"}
                />
                <text x={L + i * bw + bw / 2} y={H - B + 16} textAnchor="middle" className="fill-slate-400 text-[11px]">Year {i + 1}</text>
                <text x={L + i * bw + bw / 2} y={sy(c) - 5} textAnchor="middle" className="num fill-slate-200 text-[10px]">{fmt(c)}</text>
              </g>
            ))}
            <line x1={L} x2={W - 10} y1={sy(inv)} y2={sy(inv)} className="stroke-rose-300" strokeDasharray="5 5" strokeWidth={1.5} />
            <text x={W - 12} y={sy(inv) - 5} textAnchor="end" className="fill-rose-300 text-[11px] font-semibold">Investment {fmt(inv)}</text>
          </svg>
          <p className="text-center text-[11px] text-slate-500">Bars = cumulative cash returned. Green once the investment is recovered.</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { k: "Payback period", v: payback === null ? "not within 5 yrs" : `${payback.toFixed(1)} yrs`, note: `≈ ${payback === null ? "n/a" : Math.round(payback * 12)} months`, ok: payback !== null && payback <= maxPay },
          { k: "Average annual profit", v: money(avg), note: "(total returns − investment) ÷ years", ok: avg > 0 },
          { k: "ARR", v: `${arr.toFixed(1)}%`, note: "average profit ÷ investment × 100", ok: arr >= target },
        ].map((s) => (
          <div key={s.k} className={`rounded-xl border p-3 ${s.ok ? "border-emerald-400/30 bg-emerald-400/[0.06]" : "border-rose-400/30 bg-rose-400/[0.06]"}`}>
            <p className="text-[11px] uppercase tracking-wider text-slate-400">{s.k}</p>
            <p className="num mt-1 text-lg font-semibold text-white">{s.v}</p>
            <p className="mt-0.5 text-[11px] text-slate-400">{s.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-slate-200">
        <strong className="text-white">Verdict:</strong>{" "}
        {payback !== null && payback <= maxPay && arr >= target
          ? `Both tests are met: payback of ${payback.toFixed(1)} years is within ${maxPay} years and ARR of ${arr.toFixed(1)}% beats the ${target}% target. Still check risk, finance and market trends before deciding.`
          : payback !== null && payback <= maxPay
            ? `Quick payback, but ARR of ${arr.toFixed(1)}% is below the ${target}% target: the project recovers cash fast but does not earn enough overall.`
            : arr >= target
              ? `ARR of ${arr.toFixed(1)}% meets the target, but payback is slower than ${maxPay} years: profitable, yet cash is tied up for longer.`
              : "Neither test is met on these figures. A firm would probably reject the project unless qualitative factors are very strong."}
      </p>
    </GraphFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Cash flow forecast                                                 */
/* ------------------------------------------------------------------ */
const MONTHS = ["M1", "M2", "M3", "M4", "M5", "M6"];

export function CashFlowLab() {
  const [opening, setOpening] = useState(5000);
  const [sales, setSales] = useState([12000, 13000, 16000, 14000, 15000, 18000]);
  const [other, setOther] = useState([0, 0, 5000, 0, 0, 0]);
  const [purch, setPurch] = useState([9000, 9000, 11000, 10000, 10000, 12000]);
  const [wages, setWages] = useState([4000, 4000, 4500, 4500, 4500, 5000]);
  const [over, setOver] = useState([2500, 2500, 2500, 2500, 2500, 2500]);

  const rows = MONTHS.map((_, i) => {
    const inn = sales[i] + other[i];
    const out = purch[i] + wages[i] + over[i];
    return { inn, out, net: inn - out };
  });
  const open: number[] = [];
  const close: number[] = [];
  rows.forEach((r, i) => {
    const o = i === 0 ? opening : close[i - 1];
    open.push(o);
    close.push(o + r.net);
  });
  const worst = Math.min(...close);
  const firstNeg = close.findIndex((c) => c < 0);

  const cell = (arr: number[], set: (a: number[]) => void, i: number) => (
    <input
      type="number"
      value={arr[i]}
      step={500}
      onChange={(e) => set(arr.map((v, j) => (j === i ? Number(e.target.value) || 0 : v)))}
      className="num w-full min-w-[72px] rounded-md border border-white/10 bg-white/5 px-1.5 py-1 text-right text-xs text-white focus:border-accent/60 focus:outline-none"
    />
  );

  const W = 560, H = 190, L = 48, B = 26, T = 14;
  const hi = Math.max(...close, 1000), lo = Math.min(...close, 0);
  const span = hi - lo || 1;
  const sy = (v: number) => T + ((hi - v) / span) * (H - T - B);
  const bw = (W - L - 10) / close.length;

  return (
    <GraphFrame
      title="Cash flow forecast builder"
      caption="Edit the white boxes. The opening balance of each month is always the previous month's closing balance. Red means the business cannot pay its bills."
    >
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-white/[0.05] text-[11px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-3 py-2 text-left">$</th>
              {MONTHS.map((m) => <th key={m} className="px-2 py-2 text-right">{m}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="px-3 py-2 text-slate-200">Opening balance</td>
              {open.map((o, i) => (
                <td key={i} className="px-2 py-1.5 text-right">
                  {i === 0 ? (
                    <input type="number" value={opening} step={500} onChange={(e) => setOpening(Number(e.target.value) || 0)}
                      className="num w-full min-w-[72px] rounded-md border border-white/10 bg-white/5 px-1.5 py-1 text-right text-xs text-white focus:border-accent/60 focus:outline-none" />
                  ) : (
                    <span className={`num ${o < 0 ? "text-rose-300" : "text-slate-200"}`}>{o.toLocaleString()}</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="bg-emerald-400/[0.04]"><td className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300" colSpan={7}>Cash in</td></tr>
            <tr><td className="px-3 py-1.5 text-slate-300">Sales receipts</td>{MONTHS.map((_, i) => <td key={i} className="px-2 py-1">{cell(sales, setSales, i)}</td>)}</tr>
            <tr><td className="px-3 py-1.5 text-slate-300">Other (loan, capital)</td>{MONTHS.map((_, i) => <td key={i} className="px-2 py-1">{cell(other, setOther, i)}</td>)}</tr>
            <tr className="bg-rose-400/[0.04]"><td className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-rose-300" colSpan={7}>Cash out</td></tr>
            <tr><td className="px-3 py-1.5 text-slate-300">Purchases (stock)</td>{MONTHS.map((_, i) => <td key={i} className="px-2 py-1">{cell(purch, setPurch, i)}</td>)}</tr>
            <tr><td className="px-3 py-1.5 text-slate-300">Wages</td>{MONTHS.map((_, i) => <td key={i} className="px-2 py-1">{cell(wages, setWages, i)}</td>)}</tr>
            <tr><td className="px-3 py-1.5 text-slate-300">Rent & overheads</td>{MONTHS.map((_, i) => <td key={i} className="px-2 py-1">{cell(over, setOver, i)}</td>)}</tr>
            <tr className="bg-white/[0.03]">
              <td className="px-3 py-2 font-medium text-slate-100">Net cash flow</td>
              {rows.map((r, i) => <td key={i} className={`num px-2 py-2 text-right font-medium ${r.net < 0 ? "text-rose-300" : "text-emerald-300"}`}>{r.net.toLocaleString()}</td>)}
            </tr>
            <tr className="bg-white/[0.06]">
              <td className="px-3 py-2 font-semibold text-white">Closing balance</td>
              {close.map((c, i) => <td key={i} className={`num px-2 py-2 text-right font-semibold ${c < 0 ? "text-rose-300" : "text-white"}`}>{c.toLocaleString()}</td>)}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Closing balance by month">
          <line x1={L} x2={W - 10} y1={sy(0)} y2={sy(0)} className="stroke-slate-400" />
          {close.map((c, i) => (
            <g key={i}>
              <rect x={L + i * bw + 10} y={Math.min(sy(c), sy(0))} width={bw - 20} height={Math.abs(sy(c) - sy(0))} rx={3} className={c < 0 ? "fill-rose-400/70" : "fill-emerald-400/60"} />
              <text x={L + i * bw + bw / 2} y={H - 8} textAnchor="middle" className="fill-slate-400 text-[11px]">{MONTHS[i]}</text>
              <text x={L + i * bw + bw / 2} y={c < 0 ? sy(c) + 13 : sy(c) - 4} textAnchor="middle" className="num fill-white text-[10px]">{fmt(c)}</text>
            </g>
          ))}
          <text x={L - 6} y={sy(0) + 4} textAnchor="end" className="fill-slate-400 text-[10px]">0</text>
        </svg>
        <div className={`rounded-xl border p-4 text-sm ${firstNeg >= 0 ? "border-rose-400/30 bg-rose-400/[0.07]" : "border-emerald-400/30 bg-emerald-400/[0.07]"}`}>
          <p className="eyebrow mb-1">Diagnosis</p>
          {firstNeg >= 0 ? (
            <>
              <p className="text-slate-100">
                Cash runs out in <strong className="text-white">{MONTHS[firstNeg]}</strong>. The lowest closing balance is{" "}
                <strong className="num text-rose-300">{money(worst)}</strong>, so the firm needs at least that much short-term finance.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Solutions: arrange an overdraft, chase customers who owe money, negotiate longer trade credit, cut or delay purchases, lease instead of buy.
                Always say what each solution COSTS the business.
              </p>
            </>
          ) : (
            <p className="text-slate-100">
              The balance stays positive in every month, with the lowest closing balance at <strong className="num text-white">{money(worst)}</strong>. Even so,
              a forecast is only an estimate. Check what would happen if sales fell 10%.
            </p>
          )}
        </div>
      </div>
    </GraphFrame>
  );
}
