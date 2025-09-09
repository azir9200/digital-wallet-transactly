import PersonalQuestionnaires from "@/components/dashboard/userDashboard/personalQues";
import type { ISidebarItem } from "@/types/authTypes";
import Balance from "@/components/dashboard/userDashboard/Balance";
import QuickActions from "@/components/dashboard/userDashboard/QuickActions";
import RecentTransactions from "@/components/dashboard/userDashboard/RecentTransactions";
import StatsCards from "@/components/dashboard/userDashboard/StatsCards";
import WalletCard from "@/components/dashboard/userDashboard/WalletCard";
import Setting from "@/components/dashboard/adminDashboard/Settings";
import UserHome from "@/components/dashboard/userDashboard/UserHome";
import Deposit from "@/pages/dashboard/user/Deposit";
import SendMoney from "@/pages/dashboard/user/SendMoney";
import Withdraw from "@/pages/dashboard/user/Withdraw";
import TransactionHistory from "@/pages/dashboard/user/TransactionHistory";
import QRCodePage from "@/pages/dashboard/user/QRCode";
import Referral from "@/pages/dashboard/user/Referral";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
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
