"use client";

import Container from "@/components/ui/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const limits = [
  { label: "Per Transaction", value: "₹5,000" },
  { label: "Per Day", value: "₹10,000" },
  { label: "Per Month", value: "₹50,000" },
  { label: "Max Per Day", value: "2 Txns" },
];

export default function WithdrawalLimits() {
  const scope = useScrollReveal();

  return (
    <section ref={scope} className="bg-bg py-24">
      <Container>
        <p
          data-reveal
          className="text-sm font-semibold uppercase tracking-wider text-brand"
        >
          Withdrawal Limits
        </p>
        <h2
          data-reveal
          className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
        >
          Clear, Transparent Limits
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {limits.map((l) => (
            <div
              key={l.label}
              data-reveal
              className="rounded-2xl bg-brand p-8 text-white"
            >
              <div className="text-4xl font-bold sm:text-5xl">{l.value}</div>
              <div className="mt-2 text-sm text-white/80">{l.label}</div>
            </div>
          ))}
        </div>

        <p data-reveal className="mt-6 text-xs leading-relaxed text-ink/50">
          A 30-minute cooling period applies between transactions. Limits may
          change based on applicable banking partner policies and regulatory
          requirements.
        </p>
      </Container>
    </section>
  );
}