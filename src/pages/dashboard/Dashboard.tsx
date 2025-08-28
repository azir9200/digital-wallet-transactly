import UserDashboard from "./UserDashboard";
import AgentDashboard from "./AgentDashboard";
import AdminDashboard from "./AdminDashboard";
import { useUserInfoQuery } from "@/redux/api/auth.api";


const Dashboard = () => {
  const { data: user } = useUserInfoQuery(undefined);

  const renderDashboard = () => {
    switch (user?.role) {
      case "user":
        return <UserDashboard />;
      case "agent":
        return <AgentDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return renderDashboard();
};

export default Dashboard;
