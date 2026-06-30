"use client";

import Link from "next/link";
import { useFadeUp } from "@/hooks/useFadeUp";

export default function Hero() {
  const scope = useFadeUp();

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen items-end overflow-hidden"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/hero-poster.jpg"
      >
        <source src="/videos/hero2.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient so white text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32">
        <p
          data-fade
          className="mb-4 text-sm font-medium uppercase tracking-wider text-white/80"
        >
          India&apos;s Trusted UPI CashPoint Network
        </p>

        <h1
          data-fade
          className="max-w-3xl text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          Turn Every Shop into a UPI CashPoint
        </h1>

        <p
          data-fade
          className="mt-5 max-w-xl text-lg font-semibold uppercase tracking-wide text-brand sm:text-xl"
        >
          Scan. Pay. Collect Cash.
        </p>

        <p
          data-fade
          className="mt-6 max-w-xl text-lg text-white/85"
        >
          Cashlo is building India&apos;s next generation cash access network,
          enabling people to withdraw cash through UPI at trusted
          neighborhood merchants. More convenience for customers, more
          earnings for merchants.
        </p>

        <div data-fade className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/become-merchant"
            className="rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-brand-dark"
          >
            Become Merchant
          </Link>
          <Link
            href="/find-cashpoint"
            className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Find CashPoint
          </Link>
        </div>
      </div>
    </section>
  );
}