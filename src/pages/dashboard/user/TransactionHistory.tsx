import { useState } from "react";
import { History, Search, Filter, Download, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const mockTransactions: Transaction[] = [
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

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const getStatusBadge = (status: string) => {
    const variants = {
      COMPLETED: "default",
      PENDING: "secondary",
      FAILED: "destructive",
      CANCELLED: "outline",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status}
      </Badge>
    );
  };

  const getTransactionIcon = (type: string) => {
    // Return appropriate icon based on type
    return "💸";
  };

  const formatAmount = (amount: number, type: string) => {
    const sign = ["SEND", "WITHDRAW", "CASH_OUT"].includes(type) ? "-" : "+";
    return `${sign}$${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || transaction.status === statusFilter;
    const matchesType = typeFilter === "ALL" || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Transaction History
        </h1>
        <p className="text-muted-foreground">
          View and manage all your financial transactions
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="SEND">Send</SelectItem>
                  <SelectItem value="RECEIVE">Receive</SelectItem>
                  <SelectItem value="DEPOSIT">Deposit</SelectItem>
                  <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                  <SelectItem value="CASH_IN">Cash In</SelectItem>
                  <SelectItem value="CASH_OUT">Cash Out</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {getTransactionIcon(transaction.type)}
                        </span>
                        <span className="font-medium">
                          {transaction.type.replace("_", " ")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          Ref: {transaction.reference}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          ["SEND", "WITHDRAW", "CASH_OUT"].includes(
                            transaction.type
                          )
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {formatAmount(transaction.amount, transaction.type)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        ${transaction.fee.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="text-sm">
                      {formatDate(transaction.date)}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Transaction Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Reference
                                </label>
                                <p className="font-mono">
                                  {transaction.reference}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Type
                                </label>
                                <p>{transaction.type.replace("_", " ")}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Amount
                                </label>
                                <p className="font-medium">
                                  ${transaction.amount.toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Fee
                                </label>
                                <p>${transaction.fee.toFixed(2)}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Status
                                </label>
                                <p>{getStatusBadge(transaction.status)}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Date
                                </label>
                                <p>{formatDate(transaction.date)}</p>
                              </div>
                            </div>
                            {transaction.recipient && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Recipient
                                </label>
                                <p>{transaction.recipient}</p>
                              </div>
                            )}
                            {transaction.sender && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Sender
                                </label>
                                <p>{transaction.sender}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
