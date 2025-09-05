import PersonalQuestionnaires from "@/components/dashboard/userDashboard/personalQues";
import type { ISidebarItem } from "@/types/authTypes";
import TransferMoney from "@/components/dashboard/userDashboard/TransferMoney";
import Transaction from "@/components/dashboard/userDashboard/Transaction";
import Deposit from "@/components/dashboard/userDashboard/Deposit";
import Balance from "@/components/dashboard/userDashboard/Balance";

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
        title: "Transfer Money",
        url: "/user/transfer",
        component: TransferMoney,
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
        title: "Transaction",
        url: "/user/transaction",
        component: Transaction,
      },
      // {
      //   title: "Add to Account",
      //   url: "/transaction/cashIn",
      //   component: CashIn,
      // },
      // {
      //   title: "Cash Out",
      //   url: "/transactions/cashOut",
      //   component: CashOut,
      // },
    ],
  },
];
