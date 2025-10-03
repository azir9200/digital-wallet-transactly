import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMyTransactionQuery } from "@/redux/api/transactionApi";
import { useGeMEWalletQuery } from "@/redux/api/userApi";
import {
  ArrowUpRight,
  DollarSign,
  Minus,
  Plus,
  Star,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const AgentDashboard = () => {
  const { data } = useGeMEWalletQuery(undefined);
  console.log(data);
  const quickActions = [
    {
      title: "Cash In",
      description: "Add money to user wallet",
      icon: Plus,
      href: "/agent/cash-in",
      color: "bg-success text-success-foreground",
    },
    {
      title: "Cash Out",
      description: "Withdraw from user wallet",
      icon: Minus,
      href: "/agent/cash-out",
      color: "bg-warning text-warning-foreground",
    },
    {
      title: "My Customers",
      description: "View customer list",
      icon: Users,
      href: "/agent/customers",
      color: "bg-primary text-primary-foreground",
    },
    {
      title: "Commissions",
      description: "View earnings",
      icon: DollarSign,
      href: "/agent/commissions",
      color: "bg-accent text-accent-foreground",
    },
  ];
  const { data: trans } = useGetMyTransactionQuery(undefined);
  // Mock agent transactions (cash-in/out)
  const agentTransactions = trans?.data?.slice(0, 5);
  console.log(agentTransactions);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "CASH_IN":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "CASH_OUT":
        return <TrendingDown className="w-4 h-4 text-warning" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-success text-success-foreground">
            Completed
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="outline" className="border-warning text-warning">
            Pending
          </Badge>
        );
      case "FAILED":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Hello Agent {`${data?.data.ownerId.name}`}!
          </h2>
          <p className="text-muted-foreground">
            Manage your cash-in/out services and track your earnings.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            Status:{" "}
            {data?.data.agentstatus == "approved" ? (
              <Badge className="bg-success text-success-foreground">
                Approved
              </Badge>
            ) : (
              <Badge variant="outline" className="border-warning text-warning">
                Pending
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Commission Overview Card */}
      <Card className="bg-gradient-to-br from-primary via-primary to-accent text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <CardHeader className="relative">
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6" />
            <span>Commission Earnings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            <div>
              <p className="text-white/80 text-sm">Total Amount</p>
              <p className="text-3xl font-bold">${data?.data.balance}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <div>
                <p className="text-white/80 text-xs">This Month</p>
                <p className="text-sm font-medium">
                  ${data?.data.monthlyLimit}
                </p>
              </div>
              <div>
                <p className="text-white/80 text-xs">Commission Rate</p>
                <p className="text-sm font-medium">{0}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link key={index} to={action.href}>
                  <Button
                    variant="outline"
                    className="h-20 w-full flex flex-col items-center space-y-2 hover:shadow-card transition-all duration-200 hover:scale-105"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-sm">{action.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="card-gradient">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activities</CardTitle>
          <Link to="/agent/transactions">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agentTransactions?.map((transaction: any, index: any) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {transaction.type
                        .replace("_", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Customer: {transaction.customerName} •{" "}
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center space-x-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      ${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-success">
                      Commission: +${transaction.commission?.toFixed(2)}
                    </p>
                  </div>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            ))}

            {agentTransactions?.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No recent activities</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start helping customers with cash-in and cash-out services
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Agent Tips */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-primary" />
            <span>Agent Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">
                Maximize Your Earnings
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Provide excellent customer service</li>
                <li>• Maintain adequate cash inventory</li>
                <li>• Keep your location updated</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Stay Compliant</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Verify customer identity for large transactions</li>
                <li>• Report suspicious activities</li>
                <li>• Keep transaction records updated</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;
