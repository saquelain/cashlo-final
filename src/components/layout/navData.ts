import type { LucideIcon } from "lucide-react";
import {
  QrCode,
  Store,
  Landmark,
  Calculator,
  Smartphone,
  Car,
  ShieldCheck,
  Tv,
  Info,
  HelpCircle,
  Phone,
  Wallet,
} from "lucide-react";

export type NavLink = { label: string; href: string; icon: LucideIcon };

export type NavItem = {
  label: string;
  href?: string;
  children?: NavLink[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "UPI Service",
    children: [
      { label: "UPI CashPoint", href: "/upi-cashpoint", icon: QrCode },
      { label: "UPI for Merchant", href: "/upi-for-merchant", icon: Store },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Instant Loan", href: "/services/instant-loan", icon: Landmark },
      { label: "EMI Calculator", href: "/calculators/emi-calculator", icon: Calculator },
      { label: "Recharge & Bill Payments", href: "/services/recharge-bills", icon: Smartphone },
      { label: "Travel (FASTag, NCMC)", href: "/services/travel", icon: Car },
      { label: "Finance & Insurance", href: "/services/finance", icon: ShieldCheck },
      { label: "Entertainment (DTH, OTT)", href: "/services/entertainment", icon: Tv },
      { label: "QuickKhata", href: "/quickkhata", icon: Wallet },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/about", icon: Info },
      { label: "Blog", href: "/blog", icon: Info },
      { label: "FAQ", href: "/faq", icon: HelpCircle },
      { label: "Contact", href: "/contact", icon: Phone },
    ],
  },
];