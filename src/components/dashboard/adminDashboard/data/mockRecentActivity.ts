export interface SystemStats {
  totalUsers: number;
  totalAgents: number;
  totalTransactions: number;
  totalVolume: number;
  activeUsers: number;
  pendingApprovals: number;
}

export const mockStats: SystemStats = {
  totalUsers: 2847,
  totalAgents: 156,
  totalTransactions: 12580,
  totalVolume: 2847592.5,
  activeUsers: 1920,
  pendingApprovals: 12,
};

export const mockRecentActivity = [
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