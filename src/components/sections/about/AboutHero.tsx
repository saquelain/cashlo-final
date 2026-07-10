"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutHero() {
  const scope = useScrollReveal();

  return (
    <section ref={scope} className="bg-bg pb-16 pt-40 sm:pt-44">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 sm:grid-cols-2 sm:gap-16">
        <div>
          <p
            data-reveal
            className="text-sm font-semibold uppercase tracking-wider text-brand"
          >
            About Cashlo
          </p>
          <h1
            data-reveal
            className="mt-3 max-w-xl text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            Turning Every Local Store Into a Digital Banking Point
          </h1>
          <p data-reveal className="mt-5 max-w-xl text-lg text-ink/60">
            We&apos;re building the financial rails that bring banking,
            payments, and everyday services within walking distance of every
            Indian household — starting with the retailer next door.
          </p>
        </div>
        <div data-reveal className="relative mx-auto w-full max-w-md">
          <Image
            src="/illustrations/about/about-hero.svg"
            alt="Community banking illustration"
            width={560}
            height={480}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}