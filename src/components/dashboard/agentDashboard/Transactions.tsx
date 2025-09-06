import { useState } from "react";
import { Filter, Download, Eye, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

interface Transaction {
  id: string;
  type: "cash_in" | "cash_out" | "transfer" | "withdrawal";
  customer: string;
  amount: number;
  fee: number;
  commission: number;
  status: "completed" | "pending" | "failed";
  date: string;
  time: string;
  reference: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "cash_in",
    customer: "John Doe",
    amount: 500.0,
    fee: 5.0,
    commission: 2.5,
    status: "completed",
    date: "2024-01-20",
    time: "10:30 AM",
    reference: "TXN001",
  },
  {
    id: "2",
    type: "cash_out",
    customer: "Jane Smith",
    amount: 250.0,
    fee: 2.5,
    commission: 1.25,
    status: "completed",
    date: "2024-01-20",
    time: "11:15 AM",
    reference: "TXN002",
  },
  {
    id: "3",
    type: "cash_in",
    customer: "Mike Johnson",
    amount: 1000.0,
    fee: 10.0,
    commission: 5.0,
    status: "pending",
    date: "2024-01-20",
    time: "12:00 PM",
    reference: "TXN003",
  },
  {
    id: "4",
    type: "cash_out",
    customer: "Sarah Wilson",
    amount: 75.0,
    fee: 1.5,
    commission: 0.75,
    status: "failed",
    date: "2024-01-19",
    time: "3:45 PM",
    reference: "TXN004",
  },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "cash_in":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Cash In
          </Badge>
        );
      case "cash_out":
        return (
          <Badge
            variant="outline"
            className="text-orange-600 border-orange-600"
          >
            Cash Out
          </Badge>
        );
      case "transfer":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Transfer
          </Badge>
        );
      case "withdrawal":
        return (
          <Badge
            variant="outline"
            className="text-purple-600 border-purple-600"
          >
            Withdrawal
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const totalAmount = filteredTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const totalCommission = filteredTransactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.commission, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">
            View and manage all your transactions
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Volume
                </p>
                <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {filteredTransactions.length} transactions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Commission
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalCommission.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Success Rate
                </p>
                <p className="text-2xl font-bold">
                  {filteredTransactions.length > 0
                    ? Math.round(
                        (filteredTransactions.filter(
                          (t) => t.status === "completed"
                        ).length /
                          filteredTransactions.length) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by customer or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Transaction Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="cash_in">Cash In</SelectItem>
                  <SelectItem value="cash_out">Cash Out</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                  <SelectItem value="withdrawal">Withdrawal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transaction(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.reference}
                  </TableCell>
                  <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-green-600">
                    ${transaction.commission.toFixed(2)}
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{transaction.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.time}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTransaction(transaction)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <AlertDialogHeader>
                          <DialogTitle>Transaction Details</DialogTitle>
                          <DialogDescription>
                            Reference: {transaction.reference}
                          </DialogDescription>
                        </AlertDialogHeader>
                        {selectedTransaction && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">
                                  Type
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {getTypeBadge(selectedTransaction.type)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Status
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {getStatusBadge(selectedTransaction.status)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Customer
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {selectedTransaction.customer}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Amount
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  ${selectedTransaction.amount.toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Fee
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  ${selectedTransaction.fee.toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Commission
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  ${selectedTransaction.commission.toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Date
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {selectedTransaction.date}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Time
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {selectedTransaction.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
