"use client";

import Container from "@/components/ui/Container";
import { useCountUp } from "@/hooks/useCountUp";

type Stat = {
  count?: number;
  prefix?: string;
  suffix?: string;
  static?: string; // for non-numeric like "24×7"
  label: string;
};

const stats: Stat[] = [
  { count: 50000, suffix: "+", label: "Registered Merchants" },
  { count: 1, suffix: "M+", label: "Successful Transactions" },
  { count: 100, suffix: "+", label: "Cities Connected" },
  { static: "24×7", label: "Merchant Support" },
];

export default function Stats() {
  const scope = useCountUp();

  return (
    <section ref={scope} className="bg-brand py-20">
      <Container>
        <p className="mb-12 text-center text-sm font-semibold uppercase tracking-wider text-white/70">
          Growing Every Day
        </p>

        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-white sm:text-5xl">
                {s.static ? (
                  s.static
                ) : (
                  <span
                    data-count={s.count}
                    data-prefix={s.prefix ?? ""}
                    data-suffix={s.suffix ?? ""}
                  >
                    0
                  </span>
                )}
              </div>
              <div className="mt-2 text-sm font-medium text-white/80">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}