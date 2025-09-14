import {
  Shield,
  Zap,
  Globe,
  DollarSign,
  Clock,
  Users,
  Smartphone,
} from "lucide-react";

// ✅ Features with theme-based colors
export const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Instant transfers in seconds, not days. Real-time processing for urgent payments.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "256-bit encryption, fraud protection, and regulatory compliance for peace of mind.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: DollarSign,
    title: "Low Fees",
    description:
      "Transparent pricing with no hidden costs. Save up to 90% compared to traditional banks.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Send money to 180+ countries with competitive exchange rates and local banking.",
    color: "bg-success/20",
    bgColor: "bg-accent/10",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description:
      "Round-the-clock support and instant processing. Your money moves when you need it.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Intuitive mobile app with biometric security and offline transaction history.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

// ✅ Stats with consistent theme colors
export const stats = [
  {
    label: "Countries Supported",
    value: "180+",
    icon: Globe,
    color: "text-primary",
  },
  { label: "Active Users", value: "5M+", icon: Users, color: "text-secondary" },
  {
    label: "Avg Transfer Time",
    value: "< 1min",
    icon: Clock,
    color: "text-accent",
  },
  {
    label: "Total Transferred",
    value: "$2.5B+",
    icon: DollarSign,
    color: "text-success",
  },
];
