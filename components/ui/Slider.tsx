"use client";

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  format?: (v: number) => string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-3 text-xs">
        <span className="font-medium text-slate-300">{label}</span>
        <span className="num rounded-md bg-accent/15 px-2 py-0.5 text-[13px] font-semibold text-soft">
          {format ? format(value) : value}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </label>
  );
}

export function NumField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
}: {
  label?: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
}) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-xs font-medium text-slate-300">{label}</span>}
      <span className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 focus-within:border-accent/60">
        {prefix && <span className="text-xs text-slate-400">{prefix}</span>}
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          step={step}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className="num w-full min-w-0 bg-transparent text-sm text-white focus:outline-none"
        />
        {suffix && <span className="text-xs text-slate-400">{suffix}</span>}
      </span>
    </label>
  );
}
