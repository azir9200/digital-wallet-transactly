import { useState } from "react";
import {
  CreditCard,
  ArrowUpDown,
  History,
  Eye,
  EyeOff,
  TrendingUp,
  ArrowDownToLine,
  Send,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "transfer" | "received";
  amount: number;
  recipient?: string;
  sender?: string;
  status: "completed" | "pending" | "failed";
  date: string;
  reference: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "received",
    amount: 500.0,
    sender: "John Smith",
    status: "completed",
    date: "2024-01-20",
    reference: "TXN001",
  },
  {
    id: "2",
    type: "transfer",
    amount: 250.0,
    recipient: "Jane Doe",
    status: "completed",
    date: "2024-01-19",
    reference: "TXN002",
  },
  {
    id: "3",
    type: "deposit",
    amount: 1000.0,
    status: "completed",
    date: "2024-01-18",
    reference: "TXN003",
  },
  {
    id: "4",
    type: "withdrawal",
    amount: 100.0,
    status: "pending",
    date: "2024-01-17",
    reference: "TXN004",
  },
];

const UserDashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const { data: user } = useUserInfoQuery(undefined);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownToLine className="h-4 w-4 text-green-500" />;
      case "withdrawal":
        return <ArrowUpDown className="h-4 w-4 text-orange-500" />;
      case "transfer":
        return <Send className="h-4 w-4 text-blue-500" />;
      case "received":
        return <ArrowDownToLine className="h-4 w-4 text-green-500" />;
      default:
        return <ArrowUpDown className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">
          Manage your wallet and send money globally
        </p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-primary text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-blue-100">
                Available Balance
              </CardDescription>
              <CardTitle className="text-3xl font-bold">
                {showBalance ? `$${user?.balance?.toFixed(2)}` : "••••••"}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:bg-white/20"
            >
              {showBalance ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-sm text-blue-100">
            <TrendingUp className="h-4 w-4" />
            <span>+5.2% from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/dashboard/send">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Send Money</h3>
                  <p className="text-sm text-muted-foreground">
                    Transfer to anyone
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/deposit">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Add Money</h3>
                  <p className="text-sm text-muted-foreground">
                    Via agent or card
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/transactions">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <History className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">History</h3>
                  <p className="text-sm text-muted-foreground">
                    View all transactions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest wallet activity</CardDescription>
            </div>
            <Link to="/dashboard/transactions">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium">
                      {transaction.type === "transfer" &&
                        `Sent to ${transaction.recipient}`}
                      {transaction.type === "received" &&
                        `Received from ${transaction.sender}`}
                      {transaction.type === "deposit" && "Money Added"}
                      {transaction.type === "withdrawal" && "Money Withdrawn"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date} • {transaction.reference}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "transfer" ||
                      transaction.type === "withdrawal"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {transaction.type === "transfer" ||
                    transaction.type === "withdrawal"
                      ? "-"
                      : "+"}
                    ${transaction.amount.toFixed(2)}
                  </p>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
