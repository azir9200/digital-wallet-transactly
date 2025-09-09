
import { useUserInfoQuery } from "@/redux/api/auth.api";
import WalletCard from "./WalletCard";
import StatsCards from "./StatsCards";
import QuickActions from "./QuickActions";
import RecentTransactions from "./RecentTransactions";

const UserHome = () => {
  const { data, isLoading, error } = useUserInfoQuery(undefined);
  const user = data?.data;
  console.log("user dash home", user);
  if (isLoading) {
    console.log("Loading user info...");
  }
  if (error) {
    console.error("Failed to fetch user info", error);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text ">
          Welcome back, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Manage your digital wallet and send money globally with ease
        </p>
      </div>

      {/* Wallet Balance Card */}
      <WalletCard />

      {/* Stats Overview */}
      <StatsCards />

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <QuickActions />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
};

export default UserHome;
