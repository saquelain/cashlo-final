"use client";

import Link from "next/link";
import Image from "next/image";
import { navItems } from "./navData";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/cashlo-logo.png"
            alt="Cashlo"
            width={140}
            height={40}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Center nav — hidden on mobile for now */}
        <div className="hidden items-center gap-1 rounded-full border border-black/5 bg-white/70 px-2 py-1.5 shadow-sm backdrop-blur-md lg:flex">
          {navItems.map((item) => (
            <NavDropdown key={item.label} item={item} />
          ))}
        </div>

        {/* Right side: CTA on desktop, hamburger on mobile */}
        <div className="flex items-center gap-3">
            <Link
                href="/become-merchant"
                className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark lg:block"
            >
                Become Merchant
            </Link>
            <MobileMenu />
        </div>
      </nav>
    </header>
  );
}