
import AgentHome from "@/components/dashboard/agentDashboard/AgentHome";
import CashOperations from "@/components/dashboard/agentDashboard/CashOperations";
import Commission from "@/components/dashboard/agentDashboard/Commission";
import Customers from "@/components/dashboard/agentDashboard/Customers";
import Transaction from "@/components/dashboard/agentDashboard/Transactions";
import UserDeposit from "@/components/dashboard/userDashboard/Deposit";
import UserWithdraw from "@/components/dashboard/userDashboard/Withdraw";
import UserProfile from "@/components/share/Profile";
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
        title: "Customers",
        url: "/agent/customers",
        component: Customers,
      },
      {
        title: "Transaction",
        url: "/agent/transaction",
        component: Transaction,
      },
      {
        title: "Deposit",
        url: "/agent/deposit",
        component: UserDeposit,
      },
      {
        title: "Withdraw",
        url: "/agent/withdraw",
        component: UserWithdraw,
      },
      {
        title: "Commission",
        url: "/agent/commission",
        component: Commission,
      },
      {
        title: "Profile",
        url: "/agent/profile",
        component: UserProfile,
      },
      // {
      //   title: "Settings",
      //   url: "/user/settings",
      //   component: Settings,
      // },
    ],
  },
];
