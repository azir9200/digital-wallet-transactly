import AgentHome from "@/components/dashboard/agentDashboard/AgentHome";
import CashOperations from "@/components/dashboard/agentDashboard/CashOperations";
import Commission from "@/components/dashboard/agentDashboard/Commission";
import Customers from "@/components/dashboard/agentDashboard/Customers";
import Transaction from "@/components/dashboard/agentDashboard/Transactions";
import type { ISidebarItem } from "@/types/authTypes";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Welcome Agent ",
    items: [
      {
        title: "Agent Home",
        url: "/agent",
        component: AgentHome,
      },

      {
        title: "CashOperations",
        url: "/agent/cashOperations",
        component: CashOperations,
      },
      {
        title: "Commission",
        url: "/agent/commission",
        component: Commission,
      },
      {
        title: "Customers",
        url: "/agent/customers",
        component: Customers,
      },
      {
        title: "Transaction",
        url: "/agent/transaction",
        component: Transaction,
      },
    ],
  },
];
