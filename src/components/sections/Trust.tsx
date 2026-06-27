"use client";

import Container from "@/components/ui/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pillars = [
  {
    title: "100% Secure",
    desc: "Every transaction is protected through secure UPI payment infrastructure with encrypted processing.",
  },
  {
    title: "RBI Compliant Process",
    desc: "Cashlo follows applicable banking partner processes and operational guidelines.",
  },
  {
    title: "Bank-grade Security",
    desc: "Every payment travels through trusted UPI rails ensuring reliable, fast fund transfers.",
  },
  {
    title: "Data Protection",
    desc: "Merchant and customer information is handled with strict privacy and security standards.",
  },
];

export default function Trust() {
  const scope = useScrollReveal();

  return (
    <section ref={scope} className="bg-white py-24">
      <Container>
        {/* Heading block */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            data-reveal
            className="text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            Trusted by Dukandaars Everywhere
          </h2>
          <p data-reveal className="mt-3 text-lg font-medium text-brand">
            Aapka Vishwas, Hamari Zimmedari
          </p>
          <p data-reveal className="mt-4 text-base text-ink/60">
            Every transaction on Cashlo is protected using secure banking
            infrastructure and trusted UPI payment systems — a safe, transparent
            experience for merchants and customers alike.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              data-reveal
              className="rounded-2xl border border-black/5 bg-gray-50/50 p-6 transition-shadow hover:shadow-lg hover:shadow-black/5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10">
                <span className="h-3 w-3 rounded-full bg-brand" />
              </div>
              <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}