import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    // Fetch current wallet balance (example API call)
    const fetchBalance = async () => {
      const res = await fetch("/api/wallet/me");
      const data = await res.json();
      setBalance(data.balance);
    };
    fetchBalance();
  }, []);

  const handleDeposit = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      const res = await fetch("/api/transactions/add-money", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, method }),
      });
      if (!res.ok) throw new Error("Deposit failed");
      const data = await res.json();
      setBalance((prev) =>
        prev !== null ? prev + Number(amount) : Number(amount)
      );
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 shadow-lg rounded-2xl">
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Deposit Money</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Wallet className="w-5 h-5" />
                <span className="font-medium">
                  Balance: {balance !== null ? `$${balance.toFixed(2)}` : "..."}
                </span>
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
              />
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleDeposit}
              disabled={loading || !amount}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Deposit Now"
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Your money will be securely added to your Transactly wallet.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
export default Deposit;
