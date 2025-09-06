import PersonalQuestionnaires from "@/components/dashboard/userDashboard/personalQues";
import type { ISidebarItem } from "@/types/authTypes";
import Deposit from "@/components/dashboard/userDashboard/Deposit";
import Balance from "@/components/dashboard/userDashboard/Balance";
import QuickActions from "@/components/dashboard/userDashboard/QuickActions";
import RecentTransactions from "@/components/dashboard/userDashboard/RecentTransactions";
import StatsCards from "@/components/dashboard/userDashboard/StatsCards";
import WalletCard from "@/components/dashboard/userDashboard/WalletCard";
import Setting from "@/components/dashboard/adminDashboard/Setting";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Personal Questionnaires",
        url: "/user/questionaries",
        component: PersonalQuestionnaires,
      },
      {
        title: "Quick Actions",
        url: "/user/actions",
        component: QuickActions,
      },
      {
        title: "Recent Transaction",
        url: "/user/transactions",
        component: RecentTransactions,
      },
      {
        title: "Stats Cards",
        url: "/user/stats",
        component: StatsCards,
      },
      {
        title: "Wallet Card",
        url: "/user/wallet",
        component: WalletCard,
      },
      {
        title: "My Balance",
        url: "/user/balance",
        component: Balance,
      },
      {
        title: "Deposit",
        url: "/user/deposit",
        component: Deposit,
      },
      {
        title: "Settings",
        url: "/user/settings",
        component: Setting,
      },
    ],
  },
];
