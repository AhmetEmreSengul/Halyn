interface NavItemTypes {
  link: string;
  title: string;
  protected: boolean;
  requiresAdmin: boolean;
}

export const navItems: NavItemTypes[] = [
  {
    link: "/scan-history",
    title: "Scan History",
    protected: true,
    requiresAdmin: false,
  },
  {
    link: "/admin-dashboard",
    title: "Admin Dashboard",
    protected: true,
    requiresAdmin: true,
  },
];

export const statusConfig = {
  halal: {
    label: "Halal",
    icon: "✓",
    badge: "bg-green-50 border-green-200",
    iconBg: "bg-green-500",
    iconRing: "ring-green-100",
    label_color: "text-green-600",
    bullet: "bg-green-400",
  },
  haram: {
    label: "Haram",
    icon: "✕",
    badge: "bg-red-50 border-red-200",
    iconBg: "bg-red-500",
    iconRing: "ring-red-100",
    label_color: "text-red-600",
    bullet: "bg-red-400",
  },
  doubtful: {
    label: "Doubtful",
    icon: "?",
    badge: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-400",
    iconRing: "ring-amber-100",
    label_color: "text-amber-500",
    bullet: "bg-amber-400",
  },
  unknown: {
    label: "Unknown",
    icon: "–",
    badge: "bg-slate-50 border-slate-200",
    iconBg: "bg-slate-400",
    iconRing: "ring-slate-100",
    label_color: "text-slate-500",
    bullet: "bg-slate-300",
  },
};
