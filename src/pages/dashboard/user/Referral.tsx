
import { UserPlus, Copy, Share2, Gift, Users, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Referral = () => {
  
  const referralCode = "REF123ABC";
  const referralLink = `https://yourapp.com/register?ref=${referralCode}`;

  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 240.0,
    pendingEarnings: 45.0,
    thisMonthReferrals: 3,
    thisMonthEarnings: 60.0,
  };

  const recentReferrals = [
    {
      id: 1,
      name: "John D.",
      email: "john.d@example.com",
      status: "Active",
      earnings: 20.0,
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah M.",
      email: "sarah.m@example.com",
      status: "Pending",
      earnings: 15.0,
      date: "2024-01-14",
    },
    {
      id: 3,
      name: "Mike R.",
      email: "mike.r@example.com",
      status: "Active",
      earnings: 20.0,
      date: "2024-01-12",
    },
    {
      id: 4,
      name: "Lisa K.",
      email: "lisa.k@example.com",
      status: "Active",
      earnings: 20.0,
      date: "2024-01-10",
    },
  ];

  const rewardTiers = [
    { referrals: 5, bonus: 50, current: referralStats.totalReferrals >= 5 },
    { referrals: 10, bonus: 100, current: referralStats.totalReferrals >= 10 },
    { referrals: 25, bonus: 300, current: referralStats.totalReferrals >= 25 },
    { referrals: 50, bonus: 750, current: referralStats.totalReferrals >= 50 },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied!,Referral link copied to clipboard.");
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join our digital wallet",
        text: "Get $20 bonus when you sign up with my referral link!",
        url: referralLink,
      });
    } else {
      copyToClipboard(referralLink);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "default",
      Pending: "secondary",
      Expired: "destructive",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Invite Friends
        </h1>
        <p className="text-muted-foreground">
          Earn rewards by inviting friends to join our platform
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">
                  {referralStats.totalReferrals}
                </p>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <UserPlus className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">
                  {referralStats.activeReferrals}
                </p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">
                  ${referralStats.totalEarnings}
                </p>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Gift className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">
                  ${referralStats.pendingEarnings}
                </p>
                <p className="text-sm text-muted-foreground">Pending Rewards</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Link & Sharing */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Link</CardTitle>
              <CardDescription>
                Share this link with friends to earn rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Referral Code</label>
                <div className="flex gap-2">
                  <Input value={referralCode} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(referralCode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Referral Link</label>
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="text-sm" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(referralLink)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={shareReferral} className="w-full" size="lg">
                <Share2 className="h-4 w-4 mr-2" />
                Share Referral Link
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full p-2 shrink-0">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Share Your Link</h4>
                  <p className="text-sm text-muted-foreground">
                    Send your referral link to friends and family
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full p-2 shrink-0">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium">They Sign Up</h4>
                  <p className="text-sm text-muted-foreground">
                    Your friend creates an account using your link
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full p-2 shrink-0">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Both Get Rewards</h4>
                  <p className="text-sm text-muted-foreground">
                    You both receive $20 bonus after their first transaction
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rewards & Progress */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reward Tiers</CardTitle>
              <CardDescription>
                Unlock bigger bonuses as you refer more friends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rewardTiers.map((tier, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {tier.referrals} Referrals
                    </span>
                    <Badge variant={tier.current ? "default" : "outline"}>
                      ${tier.bonus} Bonus
                    </Badge>
                  </div>
                  <Progress
                    value={Math.min(
                      (referralStats.totalReferrals / tier.referrals) * 100,
                      100
                    )}
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReferrals.map((referral) => (
                  <div
                    key={referral.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{referral.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {referral.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {referral.date}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(referral.status)}
                      <p className="text-sm font-medium mt-1">
                        ${referral.earnings}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Referral;
