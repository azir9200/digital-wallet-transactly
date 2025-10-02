import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Search, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useGetAllUserQuery } from "@/redux/api/userApi";

interface Customer {
  id: string;
  name: string;
  phone?: string;
  email: string;
  balance: number;
}

const CashOperations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  console.log(processing);
  // const [cashIn] = useCashInMutation();
  const { data, isLoading } = useGetAllUserQuery(undefined);
  const customers = data?.data || [];
  console.log("cash operation", customers);

  const filteredCustomers = customers.filter(
    (customer: Customer) =>
      (customer.name?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (customer.phone || "").includes(searchQuery) ||
      (customer.email?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const handleCashIn = async () => {
    // await cashIn();
    if (!selectedCustomer || !amount) {
      toast("Please select a customer and enter an amount");
      return;
    }

    setProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`$${amount} added to ${selectedCustomer.name}'s wallet`);

      setAmount("");
      setSelectedCustomer(null);
    } finally {
      setProcessing(false);
    }
  };

  const handleCashOut = async () => {
    if (!selectedCustomer || !amount) {
      toast("Please select a customer and enter an amount");
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > selectedCustomer.balance) {
      toast.error("Withdrawal amount exceeds balance");
      return;
    }

    setProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        `$${amount} withdrawn from ${selectedCustomer.name}'s wallet`
      );

      setAmount("");
      setSelectedCustomer(null);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cash Operations</h1>
        <p className="text-muted-foreground">
          Manage customer cash-in and cash-out transactions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Customer
            </CardTitle>
            <CardDescription>
              Search by name, phone number, or email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Customer</Label>
              <Input
                id="search"
                placeholder="Enter name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredCustomers.map((customer: Customer) => (
                <div
                  key={customer.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedCustomer?.id === customer.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {customer?.phone}
                        </p>
                      </div>
                    </div>
                    {/* <Badge variant="outline">
                      ${customer?.balance?.toFixed(2)}
                    </Badge> */}

                    <Badge variant="outline">
                      $
                      {typeof customer?.balance === "number"
                        ? customer.balance.toFixed(2)
                        : "0.00"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction Form */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>
              {selectedCustomer
                ? `Selected: ${selectedCustomer.name}`
                : "Select a customer to proceed"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedCustomer ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedCustomer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedCustomer.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedCustomer.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Current Balance
                      </p>
                      <p className="text-lg font-semibold">
                        $
                        {typeof selectedCustomer.balance === "number"
                          ? selectedCustomer.balance.toFixed(2)
                          : "0.00"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>

                <Tabs defaultValue="cash-in" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cash-in">Cash In</TabsTrigger>
                    <TabsTrigger value="cash-out">Cash Out</TabsTrigger>
                  </TabsList>

                  <TabsContent value="cash-in" className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <ArrowDownToLine className="h-4 w-4" />
                        <span className="font-medium">Cash In Transaction</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        Add money to customer's digital wallet
                      </p>
                    </div>
                    <Button
                      onClick={handleCashIn}
                      disabled={isLoading || !amount}
                      className="w-full"
                    >
                      {isLoading
                        ? "Processing..."
                        : `Cash In $${amount || "0.00"}`}
                    </Button>
                  </TabsContent>

                  <TabsContent value="cash-out" className="space-y-4">
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 text-orange-700">
                        <ArrowUpFromLine className="h-4 w-4" />
                        <span className="font-medium">
                          Cash Out Transaction
                        </span>
                      </div>
                      <p className="text-sm text-orange-600 mt-1">
                        Withdraw money from customer's digital wallet
                      </p>
                    </div>
                    <Button
                      onClick={handleCashOut}
                      disabled={isLoading || !amount}
                      variant="outline"
                      className="w-full"
                    >
                      {isLoading
                        ? "Processing..."
                        : `Cash Out $${amount || "0.00"}`}
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a customer to start a transaction</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashOperations;
