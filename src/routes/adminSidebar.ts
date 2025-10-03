import AdminHome from "@/components/dashboard/adminDashboard/AdminHome";
import Agents from "@/components/dashboard/adminDashboard/Agents";
import Setting from "@/components/dashboard/adminDashboard/Settings";
import StatTransactions from "@/components/dashboard/adminDashboard/StatTransaction";
import AdminTransactions from "@/components/dashboard/adminDashboard/AdminTransaction";
import Users from "@/components/dashboard/adminDashboard/Users";
import type { ISidebarItem } from "@/types/authTypes";
import UserProfile from "@/components/share/Profile";

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
        component: AdminTransactions,
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
        title: "StatTrans",
        url: "/admin/stat/trans",
        component: StatTransactions,
      },
      {
        title: "Profile",
        url: "/admin/profile",
        component: UserProfile,
      },
      {
        title: "Settings",
        url: "/admin/setting",
        component: Setting,
      },
    ],
  },
];
