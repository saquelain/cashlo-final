"use client";

import { useMorphRules } from "@/hooks/useMorphRules";

const rules = [
  {
    num: "01",
    title: "Never Accept QR Screenshots",
    desc: "Always generate a fresh Dynamic QR for every transaction. Never use photos or shared QR codes.",
  },
  {
    num: "02",
    title: "Maintain a Withdrawal Register",
    desc: "Record customer name, mobile, amount, signature, and transaction reference (RRN) for every withdrawal.",
  },
  {
    num: "03",
    title: "Never Accept QR via WhatsApp",
    desc: "Customers must be physically present. Don't process withdrawals from QR images shared on messaging apps.",
  },
];

export default function ImportantRules() {
  const { scope, wrapRef, shapeRef } = useMorphRules();

  return (
    <section ref={scope} className="relative overflow-hidden bg-bg md:h-screen">
      {/* ---------- Desktop: pinned morph scene ---------- */}
      <div className="relative hidden h-full flex-col items-center justify-center md:flex">
        {/* Heading */}
        <div
          data-morph-head
          className="absolute top-20 z-10 px-6 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Important Rules
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Three Rules Every Merchant Must Follow
          </h2>
        </div>

        {/* Morphing shape + rule cards */}
        <div ref={wrapRef} className="morph-wrap">
          <svg viewBox="0 0 600 600">
            <path ref={shapeRef} />
          </svg>

          {rules.map((r) => (
            <div key={r.num} data-rule-card className="morph-card">
              <div className="text-lg font-bold text-brand/50">{r.num}</div>
              <h3 className="mt-2 font-semibold text-ink">{r.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/60">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Final message inside the full-screen brand circle */}
        <div
          data-morph-final
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0"
        >
          <div className="max-w-3xl px-6 text-center text-white">
            <h3 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
              Follow the rules. Keep earning.
            </h3>
            <p className="mt-5 whitespace-nowrap text-lg text-white/80 sm:text-xl">
              Safe transactions protect you, your customers, and your commission.
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Mobile: simple cards ---------- */}
      <div className="px-6 py-20 md:hidden">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Important Rules
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">
          Three Rules Every Merchant Must Follow
        </h2>
        <div className="mt-8 space-y-4">
          {rules.map((r) => (
            <div
              key={r.num}
              data-mrule
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="text-xl font-bold text-brand/40">{r.num}</div>
              <h3 className="mt-3 font-semibold text-ink">{r.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/60">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}