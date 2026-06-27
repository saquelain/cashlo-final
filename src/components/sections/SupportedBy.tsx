"use client";

import Container from "@/components/ui/Container";
import { useOrbit } from "@/hooks/useOrbit";

const apps = [
  "Paytm", "Google Pay", "BHIM", "Navi", "WhatsApp Pay", "CRED",
  "SBI YONO", "Axis Mobile", "PayZapp", "Kotak 811", "Jio Finance", "Samsung Pay",
];

const banks = [
  "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank",
  "Bank of Baroda", "Punjab National Bank", "Union Bank", "Kotak Mahindra",
  "IDFC FIRST", "YES BANK", "Federal Bank", "NSDL Payments Bank",
];

export default function SupportedBy() {
  const { scope, stageRef, innerRef, outerRef } = useOrbit();

  return (
    <section ref={scope} className="overflow-hidden bg-gray-50 py-24">
      <Container className="text-center">
        <p
          data-reveal
          className="text-sm font-semibold uppercase tracking-wider text-brand"
        >
          Works Everywhere
        </p>
        <h2
          data-reveal
          className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl"
        >
          Supported Apps &amp; Banks
        </h2>
        <p data-reveal className="mx-auto mt-4 max-w-2xl text-lg text-ink/60">
          Customers can pay using any major UPI app, backed by a wide network of
          partner banks across India.
        </p>
      </Container>

      {/* DESKTOP: orbital constellation */}
      <div
        ref={stageRef}
        className="orbit-stage mx-auto mt-12 hidden aspect-square w-full max-w-[680px] md:block"
      >
        {/* faint orbit tracks */}
        <span className="orbit-track" style={{ "--d": "calc(var(--ri) * 2)" } as React.CSSProperties} />
        <span className="orbit-track" style={{ "--d": "calc(var(--ro) * 2)" } as React.CSSProperties} />

       {/* central hub — bare icon, no disc */}
        <div className="orbit-hub">
          <img
            src="/cashlo-icon.svg"
            alt="Cashlo"
            className="h-20 w-20"
            draggable={false}
          />
        </div>

        {/* inner ring — apps */}
        <div ref={innerRef} className="orbit-ring">
          {apps.map((a, i) => (
            <span
              key={a}
              className="orbit-slot"
              style={{ "--a": `${(i * 360) / apps.length}deg`, "--r": "var(--ri)" } as React.CSSProperties}
            >
              <span data-pill className="orbit-pill">
                {a}
              </span>
            </span>
          ))}
        </div>

        {/* outer ring — banks */}
        <div ref={outerRef} className="orbit-ring">
          {banks.map((b, i) => (
            <span
              key={b}
              className="orbit-slot"
              style={{ "--a": `${(i * 360) / banks.length + 15}deg`, "--r": "var(--ro)" } as React.CSSProperties}
            >
              <span data-pill className="orbit-pill">
                {b}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* MOBILE: tag cloud */}
      <div
        data-cloud
        className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-2.5 px-6 md:hidden"
      >
        {[...apps, ...banks].map((x) => (
          <span
            key={x}
            data-cloud-item
            className="whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-ink/70 shadow-sm"
          >
            {x}
          </span>
        ))}
      </div>
    </section>
  );
}