"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CalculatorDefaults } from "@/lib/api/calculators";

/* ---------------- math ---------------- */

function calculateEmi(principal: number, annualRate: number, years: number) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  if (n === 0) return { emi: 0, totalInterest: 0, totalAmount: principal };
  if (r === 0) {
    const emi = principal / n;
    return { emi, totalInterest: 0, totalAmount: principal };
  }
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmount = emi * n;
  const totalInterest = totalAmount - principal;
  return { emi, totalInterest, totalAmount };
}

const formatINR = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

/** ₹10K, ₹5L, ₹1.2Cr — for slider min/max hints */
function compactINR(n: number) {
  if (n >= 1e7) return `₹${trimZero(n / 1e7)}Cr`;
  if (n >= 1e5) return `₹${trimZero(n / 1e5)}L`;
  if (n >= 1e3) return `₹${trimZero(n / 1e3)}K`;
  return `₹${n}`;
}
const trimZero = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

/* ---------------- animated number ---------------- */

function useAnimatedNumber(value: number, duration = 450) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      fromRef.current = to;
      setDisplay(to);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const current = from + (to - from) * eased;
      setDisplay(current);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      fromRef.current = to;
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return display;
}

/* ---------------- slider field ---------------- */

type SliderFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  formatChip: (v: number) => string;
  formatHint: (v: number) => string;
  suffix?: string;
  decimals?: number;
};

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatChip,
  formatHint,
  suffix,
  decimals = 0,
}: SliderFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const pct = ((value - min) / (max - min)) * 100;

  const commit = () => {
    const parsed = parseFloat(draft.replace(/[^0-9.]/g, ""));
    if (!Number.isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      onChange(decimals ? Number(clamped.toFixed(decimals)) : Math.round(clamped));
    }
    setEditing(false);
  };

  return (
    <div className="group">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-ink">{label}</label>

        {editing ? (
          <span className="flex items-center gap-1 rounded-lg bg-brand/10 px-2.5 py-1 ring-1 ring-brand/40">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === "Enter") commit();
                if (e.key === "Escape") setEditing(false);
              }}
              inputMode="decimal"
              className="w-20 bg-transparent text-right text-sm font-semibold text-brand outline-none"
              aria-label={label}
            />
            {suffix && <span className="text-sm font-semibold text-brand">{suffix}</span>}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => {
              setDraft(String(value));
              setEditing(true);
              requestAnimationFrame(() => inputRef.current?.select());
            }}
            className="rounded-lg bg-surface px-3 py-1 text-sm font-semibold tabular-nums text-ink transition-colors hover:bg-brand/10 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
            title="Click to type a value"
          >
            {formatChip(value)}
          </button>
        )}
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="cashlo-range mt-4 w-full"
        style={{
          background: `linear-gradient(to right, var(--color-brand) ${pct}%, var(--color-border) ${pct}%)`,
        }}
        aria-label={label}
      />

      <div className="mt-1.5 flex justify-between text-[11px] font-medium tracking-wide text-ink/35">
        <span>{formatHint(min)}</span>
        <span>{formatHint(max)}</span>
      </div>
    </div>
  );
}

/* ---------------- donut ---------------- */

function Donut({ principalPct }: { principalPct: number }) {
  const R = 42;
  const C = 2 * Math.PI * R;
  const interestPct = Math.max(0, 100 - principalPct);

  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg viewBox="0 0 108 108" className="h-full w-full -rotate-90">
        <circle
          cx="54"
          cy="54"
          r={R}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="11"
          opacity="0.55"
        />
        <circle
          cx="54"
          cy="54"
          r={R}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - principalPct / 100)}
          style={{ transition: "stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold tabular-nums text-ink">
          {Math.round(interestPct)}%
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-ink/40">
          Interest
        </span>
      </div>
    </div>
  );
}

/* ---------------- widget ---------------- */

export default function EmiCalculatorWidget({ defaults }: { defaults: CalculatorDefaults }) {
  const [amount, setAmount] = useState(defaults.amount);
  const [rate, setRate] = useState(defaults.rate);
  const [years, setYears] = useState(defaults.years);

  const result = useMemo(() => calculateEmi(amount, rate, years), [amount, rate, years]);
  const principalPct = (amount / result.totalAmount) * 100;

  const emi = useAnimatedNumber(result.emi);
  const totalInterest = useAnimatedNumber(result.totalInterest);
  const totalAmount = useAnimatedNumber(result.totalAmount);
  const principal = useAnimatedNumber(amount);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        {/* Inputs */}
        <div className="cashlo-rise space-y-8 p-6 sm:p-8">
          <SliderField
            label="Loan amount"
            value={amount}
            min={10000}
            max={5000000}
            step={10000}
            onChange={setAmount}
            formatChip={formatINR}
            formatHint={compactINR}
            suffix="₹"
          />
          <SliderField
            label="Interest rate (p.a.)"
            value={rate}
            min={defaults.minRate}
            max={defaults.maxRate}
            step={0.1}
            onChange={setRate}
            formatChip={(v) => `${v}%`}
            formatHint={(v) => `${v}%`}
            suffix="%"
            decimals={1}
          />
          <SliderField
            label="Loan tenure"
            value={years}
            min={defaults.minYears}
            max={defaults.maxYears}
            step={1}
            onChange={setYears}
            formatChip={(v) => `${v} Yr`}
            formatHint={(v) => `${v} Yr`}
            suffix="Yr"
          />

          <p className="hidden text-xs leading-relaxed text-ink/35 lg:block">
            Tip: click any value to type an exact figure.
          </p>
        </div>

        {/* Results */}
        <div
          className="cashlo-rise border-t border-border bg-surface/60 p-6 sm:p-8 lg:border-l lg:border-t-0"
          style={{ animationDelay: "90ms" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/45">
            Your monthly EMI
          </p>
          <p className="mt-1.5 text-4xl font-bold tabular-nums tracking-tight text-ink">
            {formatINR(emi)}
          </p>
          <p className="mt-1 text-xs text-ink/40">
            for {years * 12} months at {rate}% p.a.
          </p>

          <div className="mt-6 flex items-center gap-6 border-t border-border pt-6">
            <Donut principalPct={principalPct} />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-ink/55">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
                  Principal
                </span>
                <span className="text-sm font-semibold tabular-nums text-ink">
                  {formatINR(principal)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-ink/55">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-border" />
                  Interest
                </span>
                <span className="text-sm font-semibold tabular-nums text-ink">
                  {formatINR(totalInterest)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl bg-brand/[0.07] px-4 py-3.5 ring-1 ring-inset ring-brand/15">
            <span className="text-sm font-medium text-ink/70">Total payable</span>
            <span className="text-base font-bold tabular-nums text-brand">
              {formatINR(totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Component-scoped styles: custom slider + entrance animation */}
      <style jsx global>{`
        .cashlo-range {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 9999px;
          outline: none;
          cursor: pointer;
        }
        .cashlo-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 9999px;
          background: var(--color-card, #fff);
          border: 3.5px solid var(--color-brand);
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.2);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }
        .cashlo-range::-webkit-slider-thumb:hover {
          transform: scale(1.18);
          box-shadow: 0 0 0 7px color-mix(in srgb, var(--color-brand) 12%, transparent);
        }
        .cashlo-range:active::-webkit-slider-thumb {
          transform: scale(1.05);
          box-shadow: 0 0 0 9px color-mix(in srgb, var(--color-brand) 16%, transparent);
        }
        .cashlo-range:focus-visible::-webkit-slider-thumb {
          box-shadow: 0 0 0 7px color-mix(in srgb, var(--color-brand) 20%, transparent);
        }
        .cashlo-range::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 9999px;
          background: var(--color-card, #fff);
          border: 3.5px solid var(--color-brand);
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.2);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }
        .cashlo-range::-moz-range-thumb:hover {
          transform: scale(1.18);
        }

        @keyframes cashlo-rise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .cashlo-rise {
          animation: cashlo-rise 560ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .cashlo-rise {
            animation: none;
          }
          .cashlo-range::-webkit-slider-thumb,
          .cashlo-range::-moz-range-thumb {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}