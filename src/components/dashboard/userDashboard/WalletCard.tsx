import { useState } from "react";
import { Eye, EyeOff, TrendingUp, Wallet, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserInfoQuery } from "@/redux/api/auth.api";
import { useGetMyTransactionQuery } from "@/redux/api/transactionApi";

const WalletCard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const { data, isLoading, error } = useUserInfoQuery(undefined);
  const user = data?.data;

  const { data: myTransactions } = useGetMyTransactionQuery(undefined);
  const transaction = myTransactions?.data;
   console.log("object 1123", transaction);

  if (isLoading) {
    console.log("Loading user info...");
  }
  if (error) {
    console.error("Failed to fetch user info", error);
  }

  const getStatusBadge = () => {
    if (!user?.isVerified) {
      return (
        <Badge variant="destructive" className="animate-pulse">
          Unverified
        </Badge>
      );
    }

    switch (user?.status) {
      case "ACTIVE":
        return (
          <Badge className="bg-success text-success-foreground">Active</Badge>
        );
      case "BLOCKED":
        return <Badge variant="destructive">Blocked</Badge>;
      case "InACTIVE":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card className="bg-gradient-primary text-white border-0 shadow-brand">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <CardDescription className="text-blue-100">
                Wallet Balance
              </CardDescription>
              <CardTitle className="text-3xl font-bold">
                {showBalance
                  ? `$${user?.balance?.toFixed(2) || "0.00"}`
                  : "••••••"}
              </CardTitle>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
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
            {getStatusBadge()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-blue-100">
              <TrendingUp className="h-4 w-4" />
              <span>+5.2% from last month</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-100">
              <CreditCard className="h-4 w-4" />
              <span>ID: {user?._id}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-xs text-blue-200">Member Since</p>
              <p className="text-sm font-medium">{user?.createdAt}</p>
            </div>
            <div>
              <p className="text-xs text-blue-200">Verification</p>
              <p className="text-sm font-medium">
                {user?.isVerified ? "Verified" : "Pending"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
