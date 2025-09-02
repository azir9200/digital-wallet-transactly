import SendMoney from "@/components/dashboard/userDashboard/SendMoney";
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
    ],
  },
  {
    title: "Deposit",
    items: [
      {
        title: "Deposit",
        url: "/user/sendMoney",
        component: SendMoney,
      },
    ],
  },
  {
    title: "History",
    items: [
      {
        title: "Send Money",
        url: "/user/sendMoney",
        component: SendMoney,
      },
    ],
  },
];
