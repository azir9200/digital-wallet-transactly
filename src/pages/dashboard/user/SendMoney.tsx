import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, User, DollarSign, MessageSquare } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const sendMoneySchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Amount must be a positive number"
    ),
  note: z.string().optional(),
});

type SendMoneyForm = z.infer<typeof sendMoneySchema>;

const SendMoney = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SendMoneyForm>({
    resolver: zodResolver(sendMoneySchema),
  });

  const onSubmit = async (data: SendMoneyForm) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast(`Money Sent Successfully , ${data.amount} has been sent to ${data.recipient}`);

      reset();
    } catch (error) {
      console.log(error)
      toast("Transfer Failed, Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Send Money
        </h1>
        <p className="text-muted-foreground">
          Transfer money to anyone instantly and securely
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Send Money Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Transfer Details
              </CardTitle>
              <CardDescription>
                Enter the recipient details and amount to send
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="recipient"
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Recipient (Email/Phone/Account ID)
                  </Label>
                  <Input
                    id="recipient"
                    placeholder="Enter email, phone number, or account ID"
                    {...register("recipient")}
                  />
                  {errors.recipient && (
                    <p className="text-sm text-destructive">
                      {errors.recipient.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("amount")}
                  />
                  {errors.amount && (
                    <p className="text-sm text-destructive">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Note (Optional)
                  </Label>
                  <Textarea
                    id="note"
                    placeholder="Add a note for this transfer"
                    {...register("note")}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? "Sending..." : "Send Money"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Transfer Info & Limits */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Daily Limit
                </span>
                <Badge variant="secondary">$5,000</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Monthly Limit
                </span>
                <Badge variant="secondary">$50,000</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Available Today
                </span>
                <Badge variant="outline">$4,750</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transfer Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Domestic Transfer</span>
                <span className="text-sm font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">International Transfer</span>
                <span className="text-sm font-medium">2.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Express Transfer</span>
                <span className="text-sm font-medium">$5.00</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
