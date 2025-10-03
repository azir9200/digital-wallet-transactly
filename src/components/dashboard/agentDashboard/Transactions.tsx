import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Download, Filter, Search } from "lucide-react";
import { useState } from "react";

import { useGetMyTransactionQuery } from "@/redux/api/transactionApi";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data } = useGetMyTransactionQuery(undefined);
  console.log(data);
  const filteredTransactions = data?.data?.filter((transaction: any) => {
    const matchesSearch = transaction?.receiver?.email
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
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

  const totalAmount = filteredTransactions?.reduce(
    (sum: any, t: any) => sum + t.amount,
    0
  );
  // const totalCommission = filteredTransactions
  //   .filter((t) => t.status === "completed")
  //   .reduce((sum, t) => sum + t.commission, 0);

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
                <p className="text-2xl font-bold">${totalAmount?.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {filteredTransactions?.length} transactions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* <Card>
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
        </Card> */}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Success Rate
                </p>
                <p className="text-2xl font-bold">
                  {filteredTransactions?.length > 0
                    ? Math.round(
                        (filteredTransactions.filter(
                          (t: any) => t.status === "completed"
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
            {filteredTransactions?.length} transaction(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions?.map((transaction: any) => (
                <TableRow key={transaction.id}>
                  <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell>{transaction.receiver.email}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>

                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{transaction.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.createdAt}
                      </p>
                    </div>
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
