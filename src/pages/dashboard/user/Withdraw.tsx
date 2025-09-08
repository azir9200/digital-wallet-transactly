import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowDownToLine,
  Building2,
  CreditCard,
  DollarSign,
} from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const withdrawSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Amount must be a positive number"
    ),
  method: z.string().min(1, "Withdrawal method is required"),
  accountDetails: z.string().optional(),
});

type WithdrawForm = z.infer<typeof withdrawSchema>;

const Withdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("bank");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WithdrawForm>({
    resolver: zodResolver(withdrawSchema),
  });

  const onSubmit = async (data: WithdrawForm) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Withdrawal Initiated",
        description: `$${data.amount} withdrawal has been processed`,
      });

      reset();
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const agents = [
    {
      id: "1",
      name: "Agent Store A",
      distance: "0.5 km",
      rating: 4.8,
      cashAvailable: "$5,000",
    },
    {
      id: "2",
      name: "Agent Store B",
      distance: "1.2 km",
      rating: 4.6,
      cashAvailable: "$3,200",
    },
    {
      id: "3",
      name: "Agent Store C",
      distance: "2.1 km",
      rating: 4.9,
      cashAvailable: "$8,500",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Withdraw Money
        </h1>
        <p className="text-muted-foreground">
          Cash out your funds to bank account or through agents
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bank" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Bank Account
              </TabsTrigger>
              <TabsTrigger value="agent" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Cash via Agent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bank" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bank Withdrawal</CardTitle>
                  <CardDescription>
                    Transfer money directly to your bank account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
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
                      <Label>Bank Account</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bank account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank1">
                            Chase Bank - ****1234
                          </SelectItem>
                          <SelectItem value="bank2">
                            Wells Fargo - ****5678
                          </SelectItem>
                          <SelectItem value="bank3">
                            Bank of America - ****9012
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Processing Time</h4>
                      <p className="text-sm text-muted-foreground">
                        Bank transfers typically take 1-3 business days to
                        process
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading ? "Processing..." : "Withdraw to Bank"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agent" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cash Withdrawal</CardTitle>
                  <CardDescription>
                    Get cash from a nearby agent location
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
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
                      <Label>Select Agent</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an agent" />
                        </SelectTrigger>
                        <SelectContent>
                          {agents.map((agent) => (
                            <SelectItem key={agent.id} value={agent.id}>
                              <div className="flex items-center justify-between w-full">
                                <span>{agent.name}</span>
                                <span className="text-sm text-muted-foreground ml-2">
                                  {agent.distance}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Instant Cash</h4>
                      <p className="text-sm text-muted-foreground">
                        Get your cash instantly at the selected agent location
                        with your withdrawal code
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading
                        ? "Generating Code..."
                        : "Generate Withdrawal Code"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {agents.map((agent) => (
                      <div
                        key={agent.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{agent.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {agent.distance} away
                          </p>
                          <p className="text-sm text-success">
                            Cash available: {agent.cashAvailable}
                          </p>
                        </div>
                        <Badge variant="secondary">⭐ {agent.rating}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  $12,450.75
                </div>
                <p className="text-sm text-muted-foreground">
                  Available for withdrawal
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Limits</CardTitle>
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
                <Badge variant="outline">$4,200</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Bank Transfer</span>
                <span className="text-sm font-medium">$2.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Agent Cash Out</span>
                <span className="text-sm font-medium">1.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Express Bank Transfer</span>
                <span className="text-sm font-medium">$10.00</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
