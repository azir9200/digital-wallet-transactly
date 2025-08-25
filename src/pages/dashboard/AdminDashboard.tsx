import {
  Users,
  UserCheck,
  ArrowUpDown,
  DollarSign,
  AlertCircle,
  Activity,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

interface SystemStats {
  totalUsers: number;
  totalAgents: number;
  totalTransactions: number;
  totalVolume: number;
  activeUsers: number;
  pendingApprovals: number;
}

const mockStats: SystemStats = {
  totalUsers: 2847,
  totalAgents: 156,
  totalTransactions: 12580,
  totalVolume: 2847592.5,
  activeUsers: 1920,
  pendingApprovals: 12,
};

const mockRecentActivity = [
  {
    id: "1",
    type: "user_registration",
    description: "New user registered: John Smith",
    timestamp: "2 minutes ago",
    status: "info",
  },
  {
    id: "2",
    type: "agent_approval",
    description: "Agent approved: Jane Doe",
    timestamp: "15 minutes ago",
    status: "success",
  },
  {
    id: "3",
    type: "large_transaction",
    description: "Large transaction: $5,000 transfer detected",
    timestamp: "1 hour ago",
    status: "warning",
  },
  {
    id: "4",
    type: "system_alert",
    description: "System maintenance scheduled for tonight",
    timestamp: "2 hours ago",
    status: "info",
  },
];

const AdminDashboard = () => {
  const { data: user } = useUserInfoQuery(undefined);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "agent_approval":
        return <UserCheck className="h-4 w-4 text-green-500" />;
      case "large_transaction":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "system_alert":
        return <Shield className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Success
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Warning
          </Badge>
        );
      case "info":
        return <Badge variant="outline">Info</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor system performance and manage platform operations
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalAgents}</div>
            <p className="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.totalTransactions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transaction Volume
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(mockStats.totalVolume / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Current system performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Active Users</span>
                <span className="text-sm text-muted-foreground">
                  {mockStats.activeUsers}/{mockStats.totalUsers}
                </span>
              </div>
              <Progress
                value={(mockStats.activeUsers / mockStats.totalUsers) * 100}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Server Uptime</span>
                <span className="text-sm text-muted-foreground">99.9%</span>
              </div>
              <Progress value={99.9} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Transaction Success Rate
                </span>
                <span className="text-sm text-muted-foreground">98.7%</span>
              </div>
              <Progress value={98.7} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>Items requiring admin attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <UserCheck className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">Agent Approvals</p>
                    <p className="text-sm text-muted-foreground">
                      {mockStats.pendingApprovals} pending
                    </p>
                  </div>
                </div>
                <Link to="/dashboard/agents">
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Disputed Transactions</p>
                    <p className="text-sm text-muted-foreground">3 pending</p>
                  </div>
                </div>
                <Link to="/dashboard/transactions">
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/dashboard/users">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Manage Users</h3>
                  <p className="text-sm text-muted-foreground">
                    View and manage user accounts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/agents">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Manage Agents</h3>
                  <p className="text-sm text-muted-foreground">
                    Approve and monitor agents
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/settings">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">System Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure platform settings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
          <CardDescription>
            Latest platform events and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  {getActivityIcon(activity.type)}
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
                {getActivityBadge(activity.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
