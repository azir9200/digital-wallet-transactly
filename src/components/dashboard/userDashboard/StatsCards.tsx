import {
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  color: string;
}

const statsData: StatCard[] = [
  {
    title: "Total Received",
    value: "$2,340.00",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-success",
  },
  {
    title: "Total Sent",
    value: "$1,890.50",
    change: "+8.2%",
    trend: "up",
    icon: TrendingDown,
    color: "text-primary",
  },
  {
    title: "This Month",
    value: "$449.50",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-accent",
  },
  {
    title: "Transactions",
    value: "28",
    change: "+4",
    trend: "up",
    icon: ArrowUpDown,
    color: "text-secondary",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp
                  className={`h-3 w-3 ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                />
                <span
                  className={
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }
                >
                  {stat.change}
                </span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
