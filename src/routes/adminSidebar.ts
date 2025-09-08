import AdminHome from "@/components/dashboard/adminDashboard/adminHome";
import Agents from "@/components/dashboard/adminDashboard/Agents";
import Setting from "@/components/dashboard/adminDashboard/Settings";
import Transaction from "@/components/dashboard/adminDashboard/Transaction";
import Users from "@/components/dashboard/adminDashboard/Users";

import type { ISidebarItem } from "@/types/authTypes";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Welcome Admin",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        component: AdminHome,
      },
      {
        title: "Transaction",
        url: "/admin/transaction",
        component: Transaction,
      },
      {
        title: "Agent",
        url: "/admin/agent",
        component: Agents,
      },
      {
        title: "Users",
        url: "/admin/users",
        component: Users,
      },
      {
        title: "Settings",
        url: "/admin/setting",
        component: Setting,
      },
    ],
  },
];
