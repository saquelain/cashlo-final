export type NavLink = { label: string; href: string; icon: string };

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
      { label: "UPI Cash Point", href: "/upi-cashpoint", icon: "/icons/services/upicashpoint.png" },
      { label: "Quick Khata", href: "/quickkhata", icon: "/icons/services/quickkhata.png" },
      { label: "Instant Loan", href: "/services/instant-loan", icon: "/icons/services/instant-loan.png" },
      { label: "Recharge / Bill Pay", href: "/services/recharge-bills", icon: "/icons/services/recharge.png" },
      { label: "Gold Loan / Invest in Gold", href: "/services/gold-loan", icon: "/icons/services/gold-loan.png" },
      { label: "ITR Filing", href: "/services/itr-filing", icon: "/icons/services/itr-filing.png" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];