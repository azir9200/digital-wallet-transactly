import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Wallet } from "lucide-react";
import { useUserInfoQuery } from "@/redux/api/authApi";
import { motion } from "framer-motion";
import WalletCard from "./WalletCard";

const Balance = () => {
  const { data, isLoading, error } = useUserInfoQuery(undefined);
  const user = data?.data?.user;
  console.log("balance user", user);
  const wallet = data?.data?.wallet;
  console.log("balance wallet", wallet);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">Failed to load user info.</p>
    );
  }

  return (
    <div className="">
      <div className="flex justify-center items-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <Card className="p-6 rounded-2xl shadow-md">
            <CardContent className="space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <p className="text-xs text-gray-400">Role: {user?.role}</p>
                </div>
              </div>

              {/* Wallet Info */}
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Wallet className="w-6 h-6 text-gray-600" />
                  <span className="font-medium">Wallet Balance</span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  ${wallet?.balance?.toFixed(2) ?? "0.00"}
                </span>
              </div>

              {/* Extra Info */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-400">User ID</p>
                  <p className="font-medium break-all">{user?._id}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-400">Wallet ID</p>
                  <p className="font-medium break-all">{wallet?._id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <WalletCard />
    </div>
  );
};

export default Balance;
