import { Link } from "react-router-dom";
import {
  Send,
  CreditCard,
  History,
  ArrowDownToLine,
  QrCode,
  UserPlus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const quickActions = [
  {
    title: "Send Money",
    description: "Transfer to anyone",
    icon: Send,
    href: "/dashboard/send",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Add Money",
    description: "Via agent or card",
    icon: CreditCard,
    href: "/dashboard/deposit",
    bgColor: "bg-success/10",
    iconColor: "text-success",
  },
  {
    title: "Withdraw",
    description: "Cash out funds",
    icon: ArrowDownToLine,
    href: "/dashboard/withdraw",
    bgColor: "bg-warning/10",
    iconColor: "text-warning",
  },
  {
    title: "Transactions",
    description: "View history",
    icon: History,
    href: "/dashboard/transactions",
    bgColor: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    title: "QR Code",
    description: "Receive payments",
    icon: QrCode,
    href: "/dashboard/qr-code",
    bgColor: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    title: "Invite Friends",
    description: "Earn rewards",
    icon: UserPlus,
    href: "/dashboard/referral",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
];

const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <Link key={action.title} to={action.href}>
            <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div
                    className={`p-3 rounded-full ${action.bgColor} group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className={`h-6 w-6 ${action.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{action.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default QuickActions;
