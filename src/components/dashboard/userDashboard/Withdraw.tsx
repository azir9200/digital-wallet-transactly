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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  useGetMyTransactionQuery,
  useWithdrawMutation,
} from "@/redux/api/transactionApi";
import {
  AlertTriangle,
  Building2,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  Minus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UserWithdraw = () => {
  const [withdrawMethod, setWithdrawMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [withdraw] = useWithdrawMutation();
  const { data: Transfers } = useGetMyTransactionQuery(undefined);
  const recentWithdrawals = Transfers?.data.filter(
    (item:any) => item.type == "WITHDRAW"
  );
  const withdrawMethods = [
    {
      id: "bank",
      name: "Bank Account",
      icon: Building2,
      fee: "Free",
      time: "1-2 business days",
      description: "Transfer to your linked bank account",
    },
    {
      id: "card",
      name: "Debit Card",
      icon: CreditCard,
      fee: "$1.50",
      time: "Instant",
      description: "Send to your debit card instantly",
    },
    {
      id: "atm",
      name: "ATM Withdrawal",
      icon: MapPin,
      fee: "$2.00",
      time: "Instant",
      description: "Generate code for ATM withdrawal",
    },
  ];

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    if (parseFloat(amount) > 2547.85) {
      toast.info("Higest Withdraw 25000 tk");
      return;
    }

    setProcessing(true);

    // ✅ Prepare correct payload
    const payload = {
      amount: parseFloat(amount),
    };

    try {
      const res = await withdraw(payload).unwrap(); // ✅ unwrap() gives direct data or throws error
      console.log(res);
      if (res.success) {
        toast.success(res.message || "Withdraw successful!");
        setAmount(""); // ✅ reset amount
      } else {
        toast.error(res.error.data.message || "Withdraw failed!");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const selectedMethod = withdrawMethods.find(
    (method) => method.id === withdrawMethod
  );
  const availableBalance = 2547.85;

  return (
    <div className="flex min-h-screen bg-gradient-subtle">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-primary bg-clip-text text-transparent">
              Withdraw Money
            </h1>
            <p className="text-muted-foreground">
              Transfer money from your PayWallet
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">
              Available: ${availableBalance.toLocaleString()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Withdrawal Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Withdrawal Method</CardTitle>
                <CardDescription>
                  Select how you'd like to receive your money
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={withdrawMethod}
                  onValueChange={setWithdrawMethod}
                >
                  <div className="space-y-3">
                    {withdrawMethods?.map((method) => {
                      const Icon = method.icon;
                      return (
                        <div
                          key={method.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label
                            htmlFor={method.id}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex items-center gap-3">
                                <Icon className="h-5 w-5 text-primary" />
                                <div>
                                  <p className="font-medium">{method.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {method.description}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-primary">
                                  {method.fee}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {method.time}
                                </p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Amount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                    max={availableBalance}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Minimum: $10</span>
                    <span>Available: ${availableBalance.toLocaleString()}</span>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[50, 100, 250, 500].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      disabled={quickAmount > availableBalance}
                    >
                      ${quickAmount}
                    </Button>
                  ))}
                </div>

                {selectedMethod && amount && (
                  <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Withdrawal Amount:</span>
                      <span className="font-medium">${amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fee:</span>
                      <span className="font-medium">{selectedMethod.fee}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>You'll Receive:</span>
                      <span>
                        $
                        {selectedMethod.fee === "Free"
                          ? amount
                          : (
                              parseFloat(amount) -
                              parseFloat(selectedMethod.fee.replace("$", ""))
                            ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Warning for large amounts */}
                {amount && parseFloat(amount) > 1000 && (
                  <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Large Withdrawal Notice</p>
                      <p>
                        Withdrawals over $1,000 may require additional
                        verification.
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleWithdraw}
                  className="w-full"
                  variant="ghost"
                  disabled={
                    !amount ||
                    processing ||
                    parseFloat(amount) > availableBalance
                  }
                >
                  {processing ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Minus className="h-4 w-4 mr-2" />
                      Withdraw Money
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Withdrawals */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Withdrawals</CardTitle>
              <CardDescription>Your latest withdrawal history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentWithdrawals?.map((withdrawal:any) => (
                  <div
                    key={withdrawal.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-destructive/10 text-destructive rounded-full flex items-center justify-center">
                        <Minus className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{withdrawal.method}</p>
                        <p className="text-sm text-muted-foreground">
                          {withdrawal.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-destructive">
                        -${withdrawal.amount}
                      </p>
                      <Badge
                        variant={
                          withdrawal.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {withdrawal.status === "completed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {withdrawal.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserWithdraw;
