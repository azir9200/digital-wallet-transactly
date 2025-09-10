import PersonalQuestionnaires from "@/components/dashboard/userDashboard/personalQues";
import type { ISidebarItem } from "@/types/authTypes";
import Balance from "@/components/dashboard/userDashboard/Balance";
import RecentTransactions from "@/components/dashboard/userDashboard/RecentTransactions";
import StatsCards from "@/components/dashboard/userDashboard/StatsCards";
import Setting from "@/components/dashboard/adminDashboard/Settings";
import UserHome from "@/components/dashboard/userDashboard/UserHome";
import Deposit from "@/components/dashboard/userDashboard/Deposit";
import SendMoney from "@/components/dashboard/userDashboard/SendMoney";
import Withdraw from "@/components/dashboard/userDashboard/Withdraw";
import TransactionHistory from "@/components/dashboard/userDashboard/TransactionHistory";
import QRCodePage from "@/components/dashboard/userDashboard/QRCode";
import Referral from "@/components/dashboard/userDashboard/Referral";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Welcome User",
    items: [
      {
        title: "User Home",
        url: "/user/userHome",
        component: UserHome,
      },
      {
        title: "Personal Questionnaires",
        url: "/user/questionaries",
        component: PersonalQuestionnaires,
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
        title: "Check  Balance",
        url: "/user/balance",
        component: Balance,
      },
      {
        title: "Send",
        url: "/user/send",
        component: SendMoney,
      },
      {
        title: "Deposit",
        url: "/user/deposit",
        component: Deposit,
      },
      {
        title: "Withdraw",
        url: "/user/withdraw",
        component: Withdraw,
      },
      {
        title: "Transaction",
        url: "/user/transaction",
        component: TransactionHistory,
      },
      {
        title: "QRCode",
        url: "/user/qrcode",
        component: QRCodePage,
      },
      {
        title: "Referral",
        url: "/user/referral",
        component: Referral,
      },

      {
        title: "Settings",
        url: "/user/settings",
        component: Setting,
      },
    ],
  },
];
