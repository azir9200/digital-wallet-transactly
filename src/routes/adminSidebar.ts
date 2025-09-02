import Setting from "@/components/dashboard/adminDashboard/Setting";
import Transaction from "@/components/dashboard/adminDashboard/Transaction";
import type { ISidebarItem } from "@/types/authTypes";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Setting",
        url: "/admin/setting",
        component: Setting,
      },
    ],
  },
  {
    title: "Transaction",
    items: [
      {
        title: "Transaction",
        url: "/admin/transaction",
        component: Transaction,
      },
    ],
  },
];
