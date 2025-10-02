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
  useAddMoneyMutation,
  useGetMyTransactionQuery,
} from "@/redux/api/transactionApi";
import {
  Building2,
  CheckCircle,
  Clock,
  CreditCard,
  Plus,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UserDeposit = () => {
  const [depositMethod, setDepositMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [addMoney] = useAddMoneyMutation();
  const { data: Transfers } = useGetMyTransactionQuery(undefined);
  const recentDeposits = Transfers?.data?.filter(
    (item: any) => item.type == "ADD_MONEY"
  );
  const depositMethods = [
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building2,
      fee: "Free",
      time: "1-2 business days",
      description: "Transfer from your linked bank account",
    },
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
      fee: "2.9%",
      time: "Instant",
      description: "Add money using your debit or credit card",
    },
    {
      id: "mobile",
      name: "Mobile Money",
      icon: Smartphone,
      fee: "1.5%",
      time: "Instant",
      description: "Deposit via mobile money services",
    },
  ];

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) < 10) {
      toast.error("Please enter a valid amount (minimum $10).");
      return;
    }

    setProcessing(true);

    // ✅ Prepare correct payload
    const payload = {
      amount: parseFloat(amount),
      method: depositMethod,
    };

    try {
      const res = await addMoney(payload).unwrap(); // ✅ unwrap() gives direct data or throws error
      console.log(res);
      if (res.success) {
        toast.success(res.message || "Deposit successful!");
        setAmount(""); // ✅ reset amount
      } else {
        toast.error(res.error.data.message || "Deposit failed!");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const selectedMethod = depositMethods.find(
    (method) => method.id === depositMethod
  );

  return (
    <div className="flex min-h-screen bg-gradient-subtle">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-primary bg-clip-text text-transparent">
              Deposit Money
            </h1>
            <p className="text-muted-foreground">
              Add money to your PayWallet account
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">Current Balance: $2,547.85</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deposit Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Deposit Method</CardTitle>
                <CardDescription>
                  Select how you'd like to add money
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={depositMethod}
                  onValueChange={setDepositMethod}
                >
                  <div className="space-y-3">
                    {depositMethods.map((method) => {
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
                <CardTitle>Deposit Amount</CardTitle>
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
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Minimum: $10</span>
                    <span>Maximum: $10,000</span>
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
                    >
                      ${quickAmount}
                    </Button>
                  ))}
                </div>

                {selectedMethod && amount && (
                  <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Deposit Amount:</span>
                      <span className="font-medium">${amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fee ({selectedMethod.fee}):</span>
                      <span className="font-medium">
                        {selectedMethod.fee === "Free"
                          ? "$0.00"
                          : `$${(
                              parseFloat(amount) *
                              (parseFloat(selectedMethod.fee) / 100)
                            ).toFixed(2)}`}
                      </span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>
                        $
                        {selectedMethod.fee === "Free"
                          ? amount
                          : (
                              parseFloat(amount) +
                              parseFloat(amount) *
                                (parseFloat(selectedMethod.fee) / 100)
                            ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleDeposit}
                  className="w-full"
                  variant="ghost"
                  disabled={!amount || processing}
                >
                  {processing ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Deposit Money
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Deposits */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Deposits</CardTitle>
              <CardDescription>Your latest deposit history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDeposits?.map((deposit: any) => (
                  <div
                    key={deposit.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-success/10 text-success rounded-full flex items-center justify-center">
                        <Plus className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{deposit.method}</p>
                        <p className="text-sm text-muted-foreground">
                          {deposit.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-success">
                        +${deposit.amount}
                      </p>
                      <Badge
                        variant={
                          deposit.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {deposit.status === "completed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {deposit.status}
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

export default UserDeposit;
