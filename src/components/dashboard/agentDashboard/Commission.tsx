/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { DollarSign, TrendingUp, Calendar, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CommissionRecord {
  id: string;
  date: string;
  transactionType: "cash_in" | "cash_out";
  amount: number;
  commission: number;
  rate: number;
  customer: string;
  reference: string;
}

const mockCommissionData: CommissionRecord[] = [
  {
    id: "1",
    date: "2024-01-20",
    transactionType: "cash_in",
    amount: 500.0,
    commission: 5.0,
    rate: 1.0,
    customer: "John Doe",
    reference: "TXN001",
  },
  {
    id: "2",
    date: "2024-01-20",
    transactionType: "cash_out",
    amount: 250.0,
    commission: 2.5,
    rate: 1.0,
    customer: "Jane Smith",
    reference: "TXN002",
  },
  {
    id: "3",
    date: "2024-01-19",
    transactionType: "cash_in",
    amount: 1000.0,
    commission: 10.0,
    rate: 1.0,
    customer: "Mike Johnson",
    reference: "TXN003",
  },
  {
    id: "4",
    date: "2024-01-19",
    transactionType: "cash_out",
    amount: 150.0,
    commission: 1.5,
    rate: 1.0,
    customer: "Sarah Wilson",
    reference: "TXN004",
  },
  {
    id: "5",
    date: "2024-01-18",
    transactionType: "cash_in",
    amount: 750.0,
    commission: 7.5,
    rate: 1.0,
    customer: "David Brown",
    reference: "TXN005",
  },
];

const Commission = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");

  const totalCommission = mockCommissionData.reduce(
    (sum, record) => sum + record.commission,
    0
  );
  const totalTransactionVolume = mockCommissionData.reduce(
    (sum, record) => sum + record.amount,
    0
  );
  const averageCommissionRate =
    mockCommissionData.length > 0
      ? (totalCommission / totalTransactionVolume) * 100
      : 0;

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "cash_in":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Cash In
          </Badge>
        );
      case "cash_out":
        return (
          <Badge
            variant="outline"
            className="text-orange-600 border-orange-600"
          >
            Cash Out
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  // Group data by date for summary view
  const dailySummary = mockCommissionData.reduce((acc, record) => {
    const date = record.date;
    if (!acc[date]) {
      acc[date] = {
        date,
        totalCommission: 0,
        transactionCount: 0,
        totalVolume: 0,
      };
    }
    acc[date].totalCommission += record.commission;
    acc[date].transactionCount += 1;
    acc[date].totalVolume += record.amount;
    return acc;
  }, {} as Record<string, any>);

  const summaryData = Object.values(dailySummary).sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Commission History</h1>
          <p className="text-muted-foreground">
            Track your earnings and commission rates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Commission
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalCommission.toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Transaction Volume
                </p>
                <p className="text-2xl font-bold">
                  ${totalTransactionVolume.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Rate
                </p>
                <p className="text-2xl font-bold">
                  {averageCommissionRate.toFixed(2)}%
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Consistent rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Transactions
                </p>
                <p className="text-2xl font-bold">
                  {mockCommissionData.length}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">This period</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed View */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Summary</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Records</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Commission Summary</CardTitle>
              <CardDescription>
                Commission earnings grouped by day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Total Volume</TableHead>
                    <TableHead>Total Commission</TableHead>
                    <TableHead>Average Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaryData.map((day: any) => (
                    <TableRow key={day.date}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell>{day.transactionCount}</TableCell>
                      <TableCell>${day.totalVolume.toFixed(2)}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        ${day.totalCommission.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {(
                          (day.totalCommission / day.totalVolume) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Commission Records</CardTitle>
              <CardDescription>
                Individual transaction commission details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCommissionData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.reference}
                      </TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        {getTypeBadge(record.transactionType)}
                      </TableCell>
                      <TableCell>{record.customer}</TableCell>
                      <TableCell>${record.amount.toFixed(2)}</TableCell>
                      <TableCell>{record.rate.toFixed(1)}%</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        ${record.commission.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Commission;
