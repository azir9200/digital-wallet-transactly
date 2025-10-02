import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useGeMEWalletQuery } from "@/redux/api/userApi";

const Balance = () => {
  const { data, isLoading, error } = useGeMEWalletQuery(undefined);
  // const { data: trans } = useGetMyTransactionQuery(undefined);

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
      <div className="flex justify-center items-center min-h-screen ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <Card className="bg-gradient-to-br from-primary via-primary to-accent text-white overflow-hidden relative">
            <CardHeader className="relative">
              <CardTitle className="flex items-center space-x-2">
                <Wallet className="w-6 h-6" />
                <span>My Wallet</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4">
                <div>
                  <p className="text-white/80 text-sm">Available Balance</p>
                  <p className="text-3xl font-bold">{`${data?.data?.balance}`}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div>
                    <p className="text-white/80 text-xs">Daily Limit</p>
                    <p className="text-sm font-medium">
                      ${`${data?.data?.dailyLimit}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/80 text-xs">Monthly Limit</p>
                    <p className="text-sm font-medium">
                      ${`${data?.data?.monthlyLimit}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/80 text-xs">Status</p>
                    <p className="text-sm font-medium capitalize">{"Active"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {/* <WalletCard /> */}
    </div>
  );
};

export default Balance;
