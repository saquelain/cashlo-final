"use client";

import Container from "@/components/ui/Container";
import Marquee from "@/components/ui/Marquee";

const apps = [
  "Paytm", "Google Pay", "BHIM", "Navi", "WhatsApp Pay", "CRED",
  "SBI YONO", "Axis Mobile", "HDFC PayZapp", "Kotak 811", "Jio Finance",
  "Samsung Pay",
];

const banks = [
  "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank",
  "Bank of Baroda", "Punjab National Bank", "Union Bank", "Kotak Mahindra",
  "IDFC FIRST", "YES BANK", "Federal Bank", "NSDL Payments Bank",
];

export default function SupportedBy() {
  return (
    <section className="bg-gray-50 py-24">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Works Everywhere
        </p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Supported Apps &amp; Banks
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/60">
          Customers can pay using any major UPI app, backed by a wide network of
          partner banks across India.
        </p>
      </Container>

      {/* Marquees are full-width (outside Container) so they bleed edge to edge */}
      <div className="mt-14 space-y-4">
        <Marquee items={apps} direction="left" speed={30} />
        <Marquee items={banks} direction="right" speed={40} />
      </div>
    </section>
  );
}