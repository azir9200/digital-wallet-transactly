import Agents from "@/components/dashboard/adminDashboard/Agents";
import Setting from "@/components/dashboard/adminDashboard/Setting";
import Transaction from "@/components/dashboard/adminDashboard/Transaction";
import Users from "@/components/dashboard/adminDashboard/Users";
import type { ISidebarItem } from "@/types/authTypes";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
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
        title: "Setting",
        url: "/admin/setting",
        component: Setting,
      },
    ],
  },
];
