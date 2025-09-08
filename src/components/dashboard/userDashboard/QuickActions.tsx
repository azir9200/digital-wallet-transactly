import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { quickActions } from "./data";

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
