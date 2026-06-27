"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function DownloadCTA() {
  const scope = useScrollReveal();

  return (
    <section ref={scope} className="bg-white py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand px-8 py-16 text-center sm:px-16 sm:py-20">
          {/* subtle decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <h2
            data-reveal
            className="relative text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Start Earning with Cashlo Today
          </h2>
          <p
            data-reveal
            className="relative mx-auto mt-4 max-w-2xl text-lg text-white/85"
          >
            Join thousands of merchants providing UPI CashPoint services across
            India. Complete your registration in minutes and earn commission on
            every eligible transaction.
          </p>

          <div data-reveal className="relative mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/download"
              className="rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand shadow-lg transition-transform hover:scale-[1.03]"
            >
              Download App
            </Link>
            <Link
              href="/become-merchant"
              className="rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Become Merchant
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}