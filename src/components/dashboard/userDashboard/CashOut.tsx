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
import { Textarea } from "@/components/ui/textarea";
import {
  useCashOutMutation,
  useGetMyTransactionQuery,
} from "@/redux/api/transactionApi";
import { useGetAllAgentQuery } from "@/redux/api/userApi";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  History,
  MinusIcon,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CashOut = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setloading] = useState(false);
  const { data } = useGetAllAgentQuery({});
  const agent = data?.data?.filter(
    (item: any) => item.agentstatus == "approved"
  );
  const [cashOut] = useCashOutMutation();
  const { data: Transfers } = useGetMyTransactionQuery({});

  const recentTransfer = Transfers?.data.filter(
    (item: any) => item.type == "CASH_OUT"
  );
  console.log(recentTransfer);
  const handleSendMoney = async () => {
    if (!selectedRecipient || !amount || parseFloat(amount) <= 0) {
      toast.error("Please select a recipient and enter a valid amount.");
      return;
    }
    console.log(selectedRecipient);

    const payload = {
      agentId: selectedRecipient._id,
      amount: parseFloat(amount),
    };
    setloading(true);
    try {
      const res = await cashOut(payload).unwrap();
      if (res.success) {
        toast.success(res.message || "Cash out successful!");
        setSelectedRecipient(null);
        setAmount("");
        setloading(false);
        setNote("");
      } else {
        toast.error(res.message || "Cash out failed!");
        setloading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "Something went wrong."
      );
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-subtle">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-primary bg-clip-text text-transparent">
              Cash Out
            </h1>
            <p className="text-muted-foreground">
              Transfer money to Agent Number
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">Balance: $2,547.85</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Send Money Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Recipient</CardTitle>
                <CardDescription>
                  Search by name, email, or phone number
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {selectedRecipient ? (
                  <div className="p-4 border rounded-lg bg-primary/5 border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                        {selectedRecipient.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{selectedRecipient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedRecipient.email}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRecipient(null)}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h4 className="font-medium">Recent Recipients</h4>
                    {agent?.map((recipient: any) => (
                      <div
                        key={recipient.id}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedRecipient(recipient)}
                      >
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {recipient.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex gap-2">
                            <p className="font-medium">{recipient.name},</p>
                            <p className="font-medium">
                              {recipient.role} Number
                            </p>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {recipient.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transfer Details</CardTitle>
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
                  <p className="text-xs text-muted-foreground">
                    Daily limit: $1,000
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Textarea
                    id="note"
                    placeholder="What is this for?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleSendMoney}
                  className="w-full"
                  variant="default"
                  disabled={!selectedRecipient || !amount || loading}
                >
                  {loading ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <MinusIcon className="h-4 w-4 mr-2" />
                      CashOut
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transfers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransfer?.map((transfer: any) => (
                  <div
                    key={transfer.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{transfer.receiver?.name}</p>
                        <p className=" font-medium">
                          {transfer.receiver?.email}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {transfer.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">-${transfer.amount}</p>
                      <Badge
                        variant={
                          transfer.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {transfer.status === "completed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 mr-1" />
                        )}
                        {transfer.status}
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

export default CashOut;
