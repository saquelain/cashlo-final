import type { LucideIcon } from "lucide-react";
import {
  QrCode,
  Wallet,
  Landmark,
  Smartphone,
  Coins,
  FileText,
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
    label: "Services",
    children: [
      { label: "UPI Cash Point", href: "/upi-cashpoint", icon: QrCode },
      { label: "Quick Khata", href: "/quickkhata", icon: Wallet },
      { label: "Instant Loan", href: "/services/instant-loan", icon: Landmark },
      { label: "Recharge / Bill Pay", href: "/services/recharge-bills", icon: Smartphone },
      { label: "Gold Loan / Invest in Gold", href: "/services/gold-loan", icon: Coins },
      { label: "ITR Filing", href: "/services/itr-filing", icon: FileText },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];