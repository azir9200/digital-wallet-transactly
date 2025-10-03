import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetChatQuery, useGetStatsQuery } from "@/redux/api/adminApi";
import {
  CheckCircle,
  Clock,
  DollarSign,
  Settings,
  Shield,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminDashboard = () => {
  const quickActions = [
    {
      title: "Manage Users",
      description: "View & manage user accounts",
      icon: Users,
      href: "/admin/users",
      color: "bg-primary text-primary-foreground",
    },
    {
      title: "Manage Agents",
      description: "Approve & manage agents",
      icon: UserCheck,
      href: "/admin/agents",
      color: "bg-success text-success-foreground",
    },
    {
      title: "System Settings",
      description: "Configure system parameters",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-warning text-warning-foreground",
    },
    {
      title: "Security Center",
      description: "Monitor security events",
      icon: Shield,
      href: "/admin/security",
      color: "bg-destructive text-destructive-foreground",
    },
  ];
  const { data } = useGetChatQuery(undefined);
  const { data: stats } = useGetStatsQuery(undefined);
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Admin Dashboard
          </h2>
          <p className="text-muted-foreground">
            Monitor and manage the PayWallet platform.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                System Status
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs text-success">
                  All Systems Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary via-primary to-primary/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Users</p>
                <p className="text-2xl font-bold">{stats?.data.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary via-secondary to-secondary/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Active Agents</p>
                <p className="text-2xl font-bold">{stats?.data.totalAgents}</p>
              </div>
              <UserCheck className="w-8 h-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/80 via-secondary to-secondary/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Transactions</p>
                <p className="text-2xl font-bold">
                  {stats?.data.totalTransactions}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/80 via-secondary to-primary/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Volume</p>
                <p className="text-2xl font-bold">
                  ${(stats?.data.totalVolume / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.data?.transactionVolume}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.data.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="hsl(var(--primary))" />
                <Bar dataKey="agents" fill="hsl(var(--success))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link key={index} to={action.href}>
                  <Button
                    variant="outline"
                    className="h-20 w-full flex flex-col items-center space-y-2 hover:shadow-card transition-all duration-200 hover:scale-105"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-sm">{action.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">API Services</h3>
              <p className="text-sm text-success">Operational</p>
              <p className="text-xs text-muted-foreground">99.9% uptime</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Database</h3>
              <p className="text-sm text-success">Operational</p>
              <p className="text-xs text-muted-foreground">Response: 45ms</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground">Payment Gateway</h3>
              <p className="text-sm text-warning">Degraded</p>
              <p className="text-xs text-muted-foreground">Investigating...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
