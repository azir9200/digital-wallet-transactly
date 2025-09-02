import SendMoney from "@/components/dashboard/userDashboard/SendMoney";
import Transaction from "@/components/dashboard/userDashboard/Transaction";
import type { ISidebarItem } from "@/types/authTypes";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Send Money",
        url: "/user/sendMoney",
        component: SendMoney,
      },
      {
        title: "Deposit",
        url: "/user/sendMoney",
        component: SendMoney,
      },
      {
        title: "Transaction",
        url: "/user/transaction",
        component: Transaction,
      },
    ],
  },
];
