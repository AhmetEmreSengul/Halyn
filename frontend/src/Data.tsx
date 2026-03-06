interface NavItemTypes {
  link: string;
  title: string;
  protected: boolean;
  requiresAuth: boolean;
}

export const navItems: NavItemTypes[] = [
  {
    link: "/scan-history",
    title: "Scan History",
    protected: true,
    requiresAuth: true,
  },
];
