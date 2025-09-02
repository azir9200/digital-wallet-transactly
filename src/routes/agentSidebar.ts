import CashOperations from "@/components/dashboard/agentDashboard/CashOperations";
import Commission from "@/components/dashboard/agentDashboard/Commission";
import Transaction from "@/components/dashboard/agentDashboard/Transaction";
import type { ISidebarItem } from "@/types/authTypes";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Transaction",
        url: "/agent/transaction",
        component: Transaction,
      },
    ],
  },
  {
    title: "Commission",
    items: [
      {
        title: "Commission",
        url: "/agent/commission",
        component: Commission,
      },
    ],
  },
  {
    title: "CashOperations",
    items: [
      {
        title: "CashOperations",
        url: "/agent/cashOperations",
        component: CashOperations,
      },
    ],
  },
];
