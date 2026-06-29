"use client";

import Container from "@/components/ui/Container";
import { useStepTimeline } from "@/hooks/useStepTimeline";

const steps = [
  {
    num: "01",
    title: "Enter Withdrawal Amount",
    desc: "The merchant enters the amount the customer wants to withdraw in the Cashlo app.",
    img: "/howitworks/step-01.jpg",
  },
  {
    num: "02",
    title: "Generate Dynamic QR",
    desc: "A unique, one-time Dynamic QR is generated — valid for that single transaction only.",
    img: "/howitworks/step-02.jpg",
  },
  {
    num: "03",
    title: "Customer Pays via UPI",
    desc: "The customer scans the QR with any supported UPI app and completes a secure payment.",
    img: "/howitworks/step-03.jpg",
  },
  {
    num: "04",
    title: "Hand Over Cash & Earn",
    desc: "Once payment is confirmed, the merchant hands over cash and earns commission.",
    img: "/howitworks/step-04.jpg",
  },
];

export default function HowItWorks() {
  const { scope, trackRef } = useStepTimeline();

  return (
    <section ref={scope} className="bg-surface py-24">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            data-reveal
            className="text-sm font-semibold uppercase tracking-wider text-brand"
          >
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

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Axis: left on mobile, centered on desktop */}
          <div
            ref={trackRef}
            className="absolute inset-y-0 left-6 w-0.5 -translate-x-1/2 lg:left-1/2"
          >
            <div className="absolute inset-0 bg-brand/15" />
            <div data-fill className="absolute inset-0 w-full bg-brand" />
            <div
              data-pulse
              className="absolute left-1/2 top-0 -ml-[7px] h-3.5 w-3.5 rounded-full bg-brand shadow-[0_0_18px_4px_var(--color-brand)]"
            />
          </div>

          {/* Rows */}
          <div className="space-y-16 lg:space-y-0">
            {steps.map((s, i) => {
              const textLeft = i % 2 === 0; // even: text left / image right
              return (
                <div
                  key={s.num}
                  data-row
                  className="timeline-row relative pl-16 lg:grid lg:min-h-[18rem] lg:grid-cols-2 lg:items-center lg:gap-x-24 lg:pl-0"
                >
                  {/* Node on the axis */}
                  <div className="absolute left-6 top-1 -translate-x-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2">
                    <div className="tl-dot flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand/25 bg-card text-xl font-bold text-brand">
                      {s.num}
                    </div>
                  </div>

                  {/* Image — DOM-first so mobile shows image then text */}
                  <div
                    data-content
                    className={`mb-5 lg:mb-0 ${
                      textLeft ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl shadow-sm">
                      <img
                        src={s.img}
                        alt={s.title}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Text — aligned toward the axis on desktop */}
                  <div
                    data-content
                    className={`${textLeft ? "lg:order-1 lg:text-right" : "lg:order-2 lg:text-left"}`}
                  >
                    <h3 className="text-2xl font-semibold text-ink">{s.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-ink/60">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}