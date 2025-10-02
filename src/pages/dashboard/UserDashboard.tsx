/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMyTransactionQuery } from "@/redux/api/transactionApi";
import { useGeMEWalletQuery } from "@/redux/api/userApi";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  Minus,
  Plus,
  Send,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  // const { data } = useUserInfoQuery();
  const { data } = useGeMEWalletQuery(undefined);
  const { data: trans } = useGetMyTransactionQuery(undefined);

  console.log(data);
  // console.log(data);
  const quickActions = [
    {
      title: "Send Money",
      description: "Transfer to friends & family",
      icon: Send,
      href: "/user/send",
      color: "bg-primary text-primary-foreground",
    },
    {
      title: "Deposit",
      description: "Add money via agent",
      icon: Plus,
      href: "/user/deposit",
      color: "bg-success text-success-foreground",
    },
    {
      title: "Withdraw",
      description: "Cash out your money",
      icon: Minus,
      href: "/user/withdraw",
      color: "bg-warning text-warning-foreground",
    },
    {
      title: "View All",
      description: "Transaction history",
      icon: Eye,
      href: "/user/transactions",
      color: "bg-muted text-muted-foreground",
    },
  ];
  const recently = trans?.data?.slice(0, 5);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "SEND_MONEY":
        return <ArrowUpRight className="w-4 h-4 text-destructive" />;
      case "RECEIVE_MONEY":
        return <ArrowDownLeft className="w-4 h-4 text-success" />;
      case "DEPOSIT":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "WITHDRAW":
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

      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-br from-primary via-primary to-accent text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <CardHeader className="relative">
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="w-6 h-6" />
            <span>My Wallet</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            <div>
              <p className="text-white/80 text-sm">Available Balance</p>
              <p className="text-3xl font-bold">{`${data?.data?.balance}`}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <div>
                <p className="text-white/80 text-xs">Daily Limit</p>
                <p className="text-sm font-medium">
                  ${`${data?.data?.dailyLimit}`}
                </p>
              </div>
              <div>
                <p className="text-white/80 text-xs">Monthly Limit</p>
                <p className="text-sm font-medium">
                  ${`${data?.data?.monthlyLimit}`}
                </p>
              </div>
              <div>
                <p className="text-white/80 text-xs">Status</p>
                <p className="text-sm font-medium capitalize">{"Active"}</p>
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

      {/* Recent Transactions */}
      <Card className="card-gradient">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Link to="/user/transactions">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recently?.map((transaction: any, index: any) => (
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
                      {new Date(transaction.createdAt).toLocaleDateString()} •{" "}
                      {transaction.description}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center space-x-3">
                  <div>
                    <p
                      className={`font-semibold ${
                        transaction.type === "RECEIVE_MONEY" ||
                        transaction.type === "DEPOSIT"
                          ? "text-success"
                          : "text-foreground"
                      }`}
                    >
                      {transaction.type === "RECEIVE_MONEY" ||
                      transaction.type === "DEPOSIT"
                        ? "+"
                        : "-"}
                      ${transaction.amount.toFixed(2)}
                    </p>
                    {transaction.fee && transaction.fee > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Fee: ${transaction.fee.toFixed(2)}
                      </p>
                    )}
                  </div>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            ))}

            {recently?.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowUpRight className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No transactions yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start by sending money or making a deposit
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
