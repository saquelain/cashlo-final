"use client";

import Container from "@/components/ui/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    num: "01",
    title: "Enter Withdrawal Amount",
    desc: "The merchant enters the amount the customer wants to withdraw in the Cashlo app.",
  },
  {
    num: "02",
    title: "Generate Dynamic QR",
    desc: "A unique, one-time Dynamic QR is generated — valid for that single transaction only.",
  },
  {
    num: "03",
    title: "Customer Pays via UPI",
    desc: "The customer scans the QR with any supported UPI app and completes a secure payment.",
  },
  {
    num: "04",
    title: "Hand Over Cash & Earn",
    desc: "Once payment is confirmed, the merchant hands over cash and earns commission.",
  },
];

export default function HowItWorks() {
  const scope = useScrollReveal();

  return (
    <section ref={scope} className="bg-gray-50 py-24">
      <Container>
        {/* Heading — centered, to alternate with the left-aligned section above */}
        <div className="mx-auto max-w-2xl text-center">
          <p data-reveal className="text-sm font-semibold uppercase tracking-wider text-brand">
            How It Works
          </p>
          <h2
            data-reveal
            className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            Cash Withdrawal in 4 Simple Steps
          </h2>
          <p data-reveal className="mt-4 text-lg text-ink/60">
            A simple, secure process designed for everyday use at your
            neighbourhood shop.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} data-reveal className="relative">
              <div className="text-5xl font-bold text-brand/20">{s.num}</div>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}