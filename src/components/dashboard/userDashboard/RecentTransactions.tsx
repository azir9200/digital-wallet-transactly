import { Link } from "react-router-dom";
import { ArrowDownToLine, ArrowUpFromLine, Send, History } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { transactions, type Transaction } from "./data/transaction";

const RecentTransactions = () => {
  
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
      case "cashIn":
      case "received":
        return <ArrowDownToLine className="h-4 w-4 text-success" />;
      case "withdrawal":
      case "cashOut":
        return <ArrowUpFromLine className="h-4 w-4 text-warning" />;
      case "transfer":
        return <Send className="h-4 w-4 text-primary" />;
      default:
        return <History className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success text-success-foreground text-xs">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="text-xs">
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="text-xs">
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        );
    }
  };

  const getTransactionDescription = (transaction: Transaction) => {
    switch (transaction.type) {
      case "transfer":
        return `Sent to ${transaction.recipient}`;
      case "received":
        return `Received from ${transaction.sender}`;
      case "deposit":
        return "Money Added";
      case "withdrawal":
        return "Money Withdrawn";
      case "cashIn":
        return "Cash In via Agent";
      case "cashOut":
        return "Cash Out via Agent";
      default:
        return "Transaction";
    }
  };

  const getAmountDisplay = (transaction: Transaction) => {
    const isDebit = ["transfer", "withdrawal", "cashOut"].includes(
      transaction.type
    );
    const prefix = isDebit ? "-" : "+";
    const colorClass = isDebit ? "text-destructive" : "text-success";

    return (
      <div className="text-right">
        <p className={`font-semibold ${colorClass}`}>
          {prefix}${transaction.amount.toFixed(2)}
        </p>
        {transaction.fee && (
          <p className="text-xs text-muted-foreground">
            Fee: ${transaction.fee.toFixed(2)}
          </p>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <History className="h-5 w-5" />
              <span>Recent Transactions</span>
            </CardTitle>
            <CardDescription>Your latest wallet activity</CardDescription>
          </div>
          <Link to="/user/transaction">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-muted">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {getTransactionDescription(transaction)}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{transaction.date}</span>
                    <span>•</span>
                    <span>{transaction.reference}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {getAmountDisplay(transaction)}
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          ))}

          {transactions.length === 0 && (
            <div className="text-center py-8">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No transactions yet</p>
              <p className="text-sm text-muted-foreground">
                Start by adding money to your wallet
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
