export function niceTicks(max: number, count = 5): number[] {
  if (!(max > 0)) return [0, 1];
  const raw = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * mag;
  const ticks: number[] = [];
  for (let v = 0; v <= max + 1e-9; v += step) ticks.push(Math.round(v * 1e9) / 1e9);
  if (ticks[ticks.length - 1] < max - 1e-9) ticks.push(ticks[ticks.length - 1] + step);
  return ticks;
}

export const fmt = (n: number): string => {
  const a = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (a >= 1e6) return sign + (a / 1e6).toFixed(1).replace(/\.0$/, "") + "m";
  if (a >= 1e4) return sign + (a / 1e3).toFixed(0) + "k";
  if (a >= 1e3) return sign + (a / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  return sign + String(Math.round(a * 100) / 100);
};

export const money = (n: number, dp = 0): string =>
  (n < 0 ? "-" : "") + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
