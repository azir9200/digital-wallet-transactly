import {
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  DollarSign,
} from "lucide-react";
interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  color: string;
}

export const statsData: StatCard[] = [
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