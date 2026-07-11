import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CalculatorVariantSummary } from "@/lib/api/calculators";

function SidebarLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group relative flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
        active
          ? "bg-brand/10 font-semibold text-brand"
          : "text-ink/65 hover:bg-surface hover:pl-4 hover:text-ink"
      }`}
    >
      {/* active indicator bar */}
      <span
        className={`absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-brand transition-opacity duration-200 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <span className="truncate">{label}</span>
      <ArrowUpRight
        className={`h-3.5 w-3.5 shrink-0 transition-all duration-200 ${
          active
            ? "text-brand opacity-100"
            : "-translate-x-1 text-ink/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
        }`}
      />
    </Link>
  );
}

export default function CalculatorSidebar({
  variants,
  currentSlug,
}: {
  variants: CalculatorVariantSummary[];
  currentSlug: string;
}) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/40">
          Explore
        </p>
        <h3 className="mt-1 text-sm font-semibold text-ink">Bank EMI calculators</h3>
        <ul className="mt-3 space-y-0.5">
          {variants.map((v) => (
            <li key={v.slug}>
              <SidebarLink
                href={`/calculators/${v.slug}`}
                label={v.bankName ?? v.title}
                active={v.slug === currentSlug}
              />
            </li>
          ))}
          <li>
            <SidebarLink
              href="/calculators/emi-calculator"
              label="General EMI Calculator"
              active={currentSlug === "emi-calculator"}
            />
          </li>
        </ul>
      </div>

      {/* Contextual CTA — quiet, on-brand */}
      <div className="rounded-2xl border border-brand/20 bg-brand/[0.06] p-5">
        <h3 className="text-sm font-semibold text-ink">Run a shop?</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-ink/55">
          Accept UPI payments and offer banking services to your customers with Cashlo.
        </p>
        <Link
          href="/become-merchant"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand transition-colors hover:text-brand/80"
        >
          Become a merchant
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}