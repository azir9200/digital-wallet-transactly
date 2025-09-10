export interface Transaction {
  id: string;
  type:
    | "deposit"
    | "withdrawal"
    | "transfer"
    | "received"
    | "cashIn"
    | "cashOut";
  amount: number;
  recipient?: string;
  sender?: string;
  status: "completed" | "pending" | "failed";
  date: string;
  reference: string;
  fee?: number;
  commission?: number;
}

export const transactions: Transaction[] = [
  {
    id: "1",
    type: "received",
    amount: 500.0,
    sender: "John Smith",
    status: "completed",
    date: "2024-01-20",
    reference: "TXN001",
    fee: 5.0,
  },
  {
    id: "2",
    type: "transfer",
    amount: 250.0,
    recipient: "Jane Doe",
    status: "completed",
    date: "2024-01-19",
    reference: "TXN002",
    fee: 2.5,
  },
  {
    id: "3",
    type: "cashIn",
    amount: 1000.0,
    status: "completed",
    date: "2024-01-18",
    reference: "TXN003",
    fee: 10.0,
  },
  {
    id: "4",
    type: "withdrawal",
    amount: 100.0,
    status: "pending",
    date: "2024-01-17",
    reference: "TXN004",
    fee: 1.0,
  },
  {
    id: "5",
    type: "cashOut",
    amount: 200.0,
    status: "failed",
    date: "2024-01-16",
    reference: "TXN005",
    fee: 2.0,
  },
];
