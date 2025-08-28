import {
  DollarSign,
  TrendingUp,
  Users,
  Activity,
  ArrowUpDown,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUserInfoQuery } from "@/redux/api/auth.api";

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

const mockAgentTransactions: AgentTransaction[] = [
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

const AgentDashboard = () => {
  const { data } = useUserInfoQuery(undefined);

  const totalCommission = mockAgentTransactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.commission, 0);

  const todayTransactions = mockAgentTransactions.filter(
    (t) => t.date === "2024-01-20"
  ).length;

  const totalVolume = mockAgentTransactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "cash_in":
        return <ArrowDownToLine className="h-4 w-4 text-green-500" />;
      case "cash_out":
        return <ArrowUpFromLine className="h-4 w-4 text-orange-500" />;
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
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <p className="text-muted-foreground">
          Manage cash-in/out operations and track your performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Commission
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalCommission.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Transactions
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayTransactions}</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalVolume.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/dashboard/cash-operations">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <ArrowDownToLine className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Cash In</h3>
                  <p className="text-sm text-muted-foreground">
                    Add money to customer wallet
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/cash-operations">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <ArrowUpFromLine className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Cash Out</h3>
                  <p className="text-sm text-muted-foreground">
                    Withdraw from customer wallet
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest cash-in/out operations
              </CardDescription>
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
            {mockAgentTransactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium">
                      {transaction.type === "cash_in" ? "Cash In" : "Cash Out"}{" "}
                      - {transaction.customer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date} • {transaction.reference}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-600">
                    Commission: ${transaction.commission.toFixed(2)}
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

export default AgentDashboard;
