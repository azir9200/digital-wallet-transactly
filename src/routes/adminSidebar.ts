
import AdminHome from "@/components/dashboard/adminDashboard/AdminHome";
import Agents from "@/components/dashboard/adminDashboard/Agents";
import Setting from "@/components/dashboard/adminDashboard/Settings";

import Users from "@/components/dashboard/adminDashboard/Users";
import TransactionHistory from "@/components/dashboard/userDashboard/TransactionHistory";

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
        component: TransactionHistory,
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
