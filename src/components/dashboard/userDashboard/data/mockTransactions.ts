interface Transaction {
  id: string;
  type: "SEND" | "RECEIVE" | "DEPOSIT" | "WITHDRAW" | "CASH_IN" | "CASH_OUT";
  amount: number;
  fee: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  date: string;
  reference: string;
  recipient?: string;
  sender?: string;
  description: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "SEND",
    amount: 250.0,
    fee: 2.5,
    status: "COMPLETED",
    date: "2024-01-15T10:30:00Z",
    reference: "TXN001",
    recipient: "john@example.com",
    description: "Money transfer to John Doe",
  },
  {
    id: "2",
    type: "DEPOSIT",
    amount: 1000.0,
    fee: 10.0,
    status: "COMPLETED",
    date: "2024-01-14T14:22:00Z",
    reference: "TXN002",
    description: "Card deposit",
  },
  {
    id: "3",
    type: "WITHDRAW",
    amount: 500.0,
    fee: 5.0,
    status: "PENDING",
    date: "2024-01-13T09:15:00Z",
    reference: "TXN003",
    description: "Bank withdrawal",
  },
  {
    id: "4",
    type: "RECEIVE",
    amount: 75.0,
    fee: 0.0,
    status: "COMPLETED",
    date: "2024-01-12T16:45:00Z",
    reference: "TXN004",
    sender: "sarah@example.com",
    description: "Money received from Sarah Wilson",
  },
  {
    id: "5",
    type: "CASH_OUT",
    amount: 200.0,
    fee: 3.0,
    status: "FAILED",
    date: "2024-01-11T11:20:00Z",
    reference: "TXN005",
    description: "Cash withdrawal via agent",
  },
];