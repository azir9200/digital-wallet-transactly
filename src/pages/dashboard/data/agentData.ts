interface AgentTransaction {
  id: string;
  type: "cash_in" | "cash_out";
  amount: number;
  customer: string;
  commission: number;
  status: "completed" | "pending";
  date: string;
  reference: string;
}

export  const mockAgentTransactions: AgentTransaction[] = [
  {
    id: "1",
    type: "cash_in",
    amount: 500.0,
    customer: "John Doe",
    commission: 5.0,
    status: "completed",
    date: "2024-01-20",
    reference: "CI001",
  },
  {
    id: "2",
    type: "cash_out",
    amount: 250.0,
    customer: "Jane Smith",
    commission: 2.5,
    status: "completed",
    date: "2024-01-19",
    reference: "CO001",
  },
  {
    id: "3",
    type: "cash_in",
    amount: 1000.0,
    customer: "Mike Johnson",
    commission: 10.0,
    status: "pending",
    date: "2024-01-18",
    reference: "CI002",
  },
];