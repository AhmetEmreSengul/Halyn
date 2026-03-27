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
