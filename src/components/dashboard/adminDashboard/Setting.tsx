import { useUserInfoQuery } from "@/redux/api/auth.api";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const Setting = () => {
  const { data, isLoading, error } = useUserInfoQuery(undefined);
  const user = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600">
        <Loader2 className="animate-spin w-5 h-5 mr-2" />
        <span>Loading user info...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Failed to fetch user info.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-500 p-4">
        No user information found.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Account Settings</h1>

      <Card>
        <CardContent className="space-y-4 p-4">
          <div>
            <Label>Name</Label>
            <Input value={user.name} disabled />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={user.email} disabled />
          </div>
          <div>
            <Label>Role</Label>
            <Input value={user.role} disabled />
          </div>
          <div>
            <Label>Status</Label>
            <Input value={user.status} disabled />
          </div>
          {user.role === "agent" && (
            <div>
              <Label>Agent Status</Label>
              <Input value={user.agentStatus} disabled />
            </div>
          )}
          {user.role === "agent" && user.commissionRate && (
            <div>
              <Label>Commission Rate</Label>
              <Input value={`${user.commissionRate}%`} disabled />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Setting;
