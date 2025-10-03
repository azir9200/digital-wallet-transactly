import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllTransactionQuery } from "@/redux/api/transactionApi";
import { format } from "date-fns";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  Search,
} from "lucide-react";
import { useState } from "react";

const AdminTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dateRange, setDateRange] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data } = useGetAllTransactionQuery(undefined);
  console.log(data);
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-success" />;
      case "send":
        return <ArrowUpRight className="h-4 w-4 text-primary" />;
      case "withdraw":
        return <ArrowUpRight className="h-4 w-4 text-destructive" />;
      default:
        return <RefreshCw className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "processing":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredTransactions = data?.data.filter((transaction: any) => {
    const matchesSearch = transaction?.receiver?.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus =
      filterStatus === "all" || transaction.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransactions?.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-gradient-subtle">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-primary bg-clip-text text-transparent">
              Transaction History
            </h1>
            <p className="text-muted-foreground">
              View and manage your transaction history
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">+$1,750</div>
              <p className="text-xs text-muted-foreground">Net income</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average Transaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$186</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="deposit">Deposits</SelectItem>
                  <SelectItem value="withdraw">Withdrawals</SelectItem>
                  <SelectItem value="send">Sent Money</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Date Range
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Showing {paginatedTransactions?.length} of{" "}
              {filteredTransactions?.length} transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paginatedTransactions?.map((transaction: any) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium capitalize">
                        {transaction.type}{" "}
                        {transaction.type === "send" ? "to" : "from"}{" "}
                        {transaction.receiver.email}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>
                          {format(
                            new Date(transaction.createdAt),
                            "MMM dd, yyyy HH:mm"
                          )}
                        </span>
                        <span>•</span>
                        <span>ID: #{transaction.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.amount > 0
                          ? "text-success"
                          : "text-foreground"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}$
                      {Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={getStatusColor(transaction.status) as any}
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                      {transaction.fee > 0 && (
                        <span className="text-xs text-muted-foreground">
                          Fee: ${transaction.fee}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminTransactions;
