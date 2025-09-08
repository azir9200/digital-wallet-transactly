import { useState } from "react";
import {
  Settings as SettingsIcon,
  Shield,
  DollarSign,
  Bell,
  Database,
  Users,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface SystemSettings {
  // Fee Settings
  transferFeePercent: number;
  withdrawFeeFlat: number;
  cashOutFeePercent: number;
  minimumTransfer: number;
  maximumTransfer: number;

  // Limits
  dailyTransactionLimit: number;
  monthlyTransactionLimit: number;
  defaultWalletBalance: number;
  agentCommissionRate: number;

  // Security
  enableTwoFactorAuth: boolean;
  sessionTimeout: number;
  maxFailedAttempts: number;
  passwordExpiryDays: number;

  // Notifications
  emailNotifications: boolean;
  smsNotifications: boolean;
  transactionAlerts: boolean;
  lowBalanceAlerts: boolean;

  // System
  maintenanceMode: boolean;
  allowNewRegistrations: boolean;
  autoApproveAgents: boolean;
}

const defaultSettings: SystemSettings = {
  transferFeePercent: 1.5,
  withdrawFeeFlat: 2.0,
  cashOutFeePercent: 0.5,
  minimumTransfer: 10.0,
  maximumTransfer: 10000.0,
  dailyTransactionLimit: 5000.0,
  monthlyTransactionLimit: 50000.0,
  defaultWalletBalance: 50.0,
  agentCommissionRate: 2.5,
  enableTwoFactorAuth: true,
  sessionTimeout: 30,
  maxFailedAttempts: 5,
  passwordExpiryDays: 90,
  emailNotifications: true,
  smsNotifications: false,
  transactionAlerts: true,
  lowBalanceAlerts: true,
  maintenanceMode: false,
  allowNewRegistrations: true,
  autoApproveAgents: false,
};

const Settings = () => {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);

    toast("System settings have been updated successfully.");
  };

  const updateSetting = (key: keyof SystemSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <Tabs defaultValue="fees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="fees" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Fees</span>
          </TabsTrigger>
          <TabsTrigger value="limits" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Limits</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center space-x-2"
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>System</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="transferFee">Transfer Fee (%)</Label>
                  <Input
                    id="transferFee"
                    type="number"
                    step="0.1"
                    value={settings.transferFeePercent}
                    onChange={(e) =>
                      updateSetting(
                        "transferFeePercent",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="withdrawFee">Withdraw Fee (Flat)</Label>
                  <Input
                    id="withdrawFee"
                    type="number"
                    step="0.01"
                    value={settings.withdrawFeeFlat}
                    onChange={(e) =>
                      updateSetting(
                        "withdrawFeeFlat",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cashOutFee">Cash Out Fee (%)</Label>
                  <Input
                    id="cashOutFee"
                    type="number"
                    step="0.1"
                    value={settings.cashOutFeePercent}
                    onChange={(e) =>
                      updateSetting(
                        "cashOutFeePercent",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">
                    Agent Commission Rate (%)
                  </Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    step="0.1"
                    value={settings.agentCommissionRate}
                    onChange={(e) =>
                      updateSetting(
                        "agentCommissionRate",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="minTransfer">Minimum Transfer Amount</Label>
                  <Input
                    id="minTransfer"
                    type="number"
                    step="0.01"
                    value={settings.minimumTransfer}
                    onChange={(e) =>
                      updateSetting(
                        "minimumTransfer",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxTransfer">Maximum Transfer Amount</Label>
                  <Input
                    id="maxTransfer"
                    type="number"
                    step="0.01"
                    value={settings.maximumTransfer}
                    onChange={(e) =>
                      updateSetting(
                        "maximumTransfer",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dailyLimit">Daily Transaction Limit</Label>
                  <Input
                    id="dailyLimit"
                    type="number"
                    step="0.01"
                    value={settings.dailyTransactionLimit}
                    onChange={(e) =>
                      updateSetting(
                        "dailyTransactionLimit",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyLimit">
                    Monthly Transaction Limit
                  </Label>
                  <Input
                    id="monthlyLimit"
                    type="number"
                    step="0.01"
                    value={settings.monthlyTransactionLimit}
                    onChange={(e) =>
                      updateSetting(
                        "monthlyTransactionLimit",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultBalance">Default Wallet Balance</Label>
                  <Input
                    id="defaultBalance"
                    type="number"
                    step="0.01"
                    value={settings.defaultWalletBalance}
                    onChange={(e) =>
                      updateSetting(
                        "defaultWalletBalance",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all admin and agent accounts
                  </p>
                </div>
                <Switch
                  checked={settings.enableTwoFactorAuth}
                  onCheckedChange={(checked) =>
                    updateSetting("enableTwoFactorAuth", checked)
                  }
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      updateSetting("sessionTimeout", parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAttempts">Max Failed Login Attempts</Label>
                  <Input
                    id="maxAttempts"
                    type="number"
                    value={settings.maxFailedAttempts}
                    onChange={(e) =>
                      updateSetting(
                        "maxFailedAttempts",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={settings.passwordExpiryDays}
                    onChange={(e) =>
                      updateSetting(
                        "passwordExpiryDays",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications for important events
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      updateSetting("emailNotifications", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send SMS notifications for critical alerts
                    </p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) =>
                      updateSetting("smsNotifications", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Transaction Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Alert on suspicious transaction patterns
                    </p>
                  </div>
                  <Switch
                    checked={settings.transactionAlerts}
                    onCheckedChange={(checked) =>
                      updateSetting("transactionAlerts", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Low Balance Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Alert users when balance is low
                    </p>
                  </div>
                  <Switch
                    checked={settings.lowBalanceAlerts}
                    onCheckedChange={(checked) =>
                      updateSetting("lowBalanceAlerts", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable the system for maintenance
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    updateSetting("maintenanceMode", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow New Registrations</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new users to register accounts
                  </p>
                </div>
                <Switch
                  checked={settings.allowNewRegistrations}
                  onCheckedChange={(checked) =>
                    updateSetting("allowNewRegistrations", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Approve Agents</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically approve new agent applications
                  </p>
                </div>
                <Switch
                  checked={settings.autoApproveAgents}
                  onCheckedChange={(checked) =>
                    updateSetting("autoApproveAgents", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Bulk User Actions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Export User Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Data Backup & Recovery
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
