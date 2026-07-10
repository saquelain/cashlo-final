"use client";

import Container from "@/components/ui/Container";
import { useSpotlight } from "@/hooks/useSpotlight";

const values = [
  {
    title: "Financial Inclusion",
    desc: "Bringing essential banking services to communities underserved by traditional infrastructure.",
  },
  {
    title: "Trust & Security",
    desc: "Every transaction runs on secure, UPI-based rails with zero cash-handling risk for merchants.",
  },
  {
    title: "Simplicity",
    desc: "No complex onboarding, no hidden steps — just scan, transact, and go.",
  },
  {
    title: "Reliability",
    desc: "Built to work in real conditions, on real networks, for merchants who can't afford downtime.",
  },
  {
    title: "Merchant First",
    desc: "Every product decision starts with what makes a retailer's day easier and more profitable.",
  },
  {
    title: "Built to Scale",
    desc: "One platform, growing from a single store to a nationwide network of digital banking points.",
  },
];

export default function AboutValues() {
  const { scope, gridRef } = useSpotlight();

  return (
    <section ref={scope} className="bg-bg py-20 sm:py-24">
      <Container>
        <div data-reveal className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            What We Stand For
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Our Values
          </h2>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((v) => (
            <div key={v.title} data-card className="spotlight-card">
              <div className="spotlight-card__inner">
                <h3 className="text-lg font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}