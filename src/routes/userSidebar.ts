import PersonalQuestionnaires from "@/components/dashboard/userDashboard/personalQues";
import SendMoney from "@/components/dashboard/userDashboard/TransferMoney";

import type { ISidebarItem } from "@/types/authTypes";
import TransferMoney from "@/components/dashboard/userDashboard/TransferMoney";
import Transaction from "@/components/dashboard/userDashboard/Transaction";


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
