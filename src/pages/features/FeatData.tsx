import {
  Shield,
  Zap,
  Globe,
  DollarSign,
  Clock,
  Smartphone,
  Users,
  BarChart3,
  Bell,
  Lock,
} from "lucide-react";
export const mainFeatures = [
  {
    icon: Zap,
    title: "Instant Transfers",
    description:
      "Send money in seconds, not days. Our advanced processing system ensures your transfers are completed almost instantly.",
    benefits: [
      "Real-time processing",
      "24/7 availability",
      "Instant notifications",
      "Emergency transfer support",
    ],
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Your money and data are protected with military-grade encryption and multi-factor authentication.",
    benefits: [
      "256-bit SSL encryption",
      "Fraud detection",
      "Regulatory compliance",
      "Secure vault storage",
    ],
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "No hidden fees, no surprises. See exactly what you pay upfront with our competitive exchange rates.",
    benefits: [
      "Low transfer fees",
      "Real-time rates",
      "Fee calculator",
      "No markup on exchange",
    ],
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "Send money to 180+ countries with extensive banking network and local payment methods.",
    benefits: [
      "180+ countries",
      "Local bank transfers",
      "Mobile money",
      "Cash pickup locations",
    ],
  },
];

export const additionalFeatures = [
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Full-featured mobile app for iOS and Android",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Stay updated with instant SMS and email alerts",
  },
  {
    icon: BarChart3,
    title: "Transaction History",
    description: "Detailed records and analytics of all transfers",
  },
  {
    icon: Users,
    title: "Multi-user Support",
    description: "Add family members and manage permissions",
  },
  {
    icon: Lock,
    title: "Biometric Security",
    description: "Fingerprint and face ID authentication",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service assistance",
  },
];

export const comparisonData = [
  {
    feature: "Transfer Speed",
    remitswift: "< 1 minute",
    traditional: "1-5 days",
    competitor: "30 minutes",
  },
  {
    feature: "Transfer Fees",
    remitswift: "From $0.99",
    traditional: "$15-45",
    competitor: "$2.99",
  },
  {
    feature: "Exchange Rate Markup",
    remitswift: "0%",
    traditional: "3-5%",
    competitor: "1-2%",
  },
  {
    feature: "Coverage",
    remitswift: "180+ countries",
    traditional: "50-100",
    competitor: "160+",
  },
  {
    feature: "Security",
    remitswift: "Military-grade",
    traditional: "Standard",
    competitor: "Standard",
  },
];
