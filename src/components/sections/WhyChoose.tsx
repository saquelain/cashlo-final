"use client";

import Container from "@/components/ui/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const benefits = [
  {
    title: "Increase Daily Income",
    desc: "Earn commission on every successful UPI CashPoint transaction.",
  },
  {
    title: "Increase Footfall",
    desc: "Customers visiting for cash often buy more from your store.",
  },
  {
    title: "Instant Settlement",
    desc: "Receive payments directly into your registered bank account.",
  },
  {
    title: "No Investment",
    desc: "Start earning without purchasing expensive hardware.",
  },
  {
    title: "Fast Onboarding",
    desc: "Simple registration with quick verification.",
  },
  {
    title: "Easy to Use",
    desc: "Generate QR, receive payment, hand over cash, and earn.",
  },
];

export default function WhyChoose() {
  const scope = useScrollReveal();

  return (
    <section ref={scope} className="bg-white py-24">
      <Container>
        {/* Heading */}
        <div className="max-w-2xl">
          <p data-reveal className="text-sm font-semibold uppercase tracking-wider text-brand">
            Why Choose Cashlo
          </p>
          <h2
            data-reveal
            className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            More Than Just Cash Withdrawal
          </h2>
          <p data-reveal className="mt-4 text-lg text-ink/60">
            Cashlo transforms every local shop into a smart financial service
            point.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              data-reveal
              className="group rounded-2xl border border-black/5 bg-white p-7 transition-all hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
            >
              <span className="text-sm font-bold text-brand/40">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-ink">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}