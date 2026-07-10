"use client";

import Container from "@/components/ui/Container";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 5000, suffix: "+", label: "Merchants Onboarded" },
  { value: 200, suffix: "+", label: "Cities & Towns" },
  { value: 2, prefix: "₹", suffix: "Cr+", label: "Monthly Transaction Value" },
  { value: 99, suffix: "%", label: "Transaction Success Rate" },
];

export default function AboutStats() {
  const scope = useCountUp();

  return (
    <section ref={scope} className="bg-bg py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p
                data-count={s.value}
                data-prefix={s.prefix ?? ""}
                data-suffix={s.suffix ?? ""}
                className="text-3xl font-bold text-ink sm:text-4xl"
              >
                0
              </p>
              <p className="mt-1 text-sm text-ink/60">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}