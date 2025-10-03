import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Mail, Search, User, Wallet } from "lucide-react";
import { useState } from "react";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetAllWalletQuery } from "@/redux/api/agentApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const { data } = useGetAllWalletQuery(undefined);
  const mockCustomers = data?.data;
  console.log(mockCustomers);
  const filteredCustomers = mockCustomers?.filter(
    (customer: any) =>
      customer.ownerId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = filteredCustomers?.length;
  const activeCustomers = filteredCustomers?.filter(
    (c: any) => c.status !== "ACTIVE"
  ).length;
  const totalBalance = filteredCustomers?.reduce(
    (sum: any, c: any) => sum + c.balance,
    0
  );

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      ?.map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <p className="text-muted-foreground">View and manage your customers</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Customers
                </p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
              </div>
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Customers
                </p>
                <p className="text-2xl font-bold">{activeCustomers}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600">
                  {totalCustomers > 0
                    ? Math.round((activeCustomers / totalCustomers) * 100)
                    : 0}
                  % active
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Balance
                </p>
                <p className="text-2xl font-bold">
                  ${totalBalance?.toFixed(2)}
                </p>
              </div>
              <Wallet className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            {filteredCustomers?.length} customer(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers?.map((customer: any) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(customer?.ownerId?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer?.ownerId?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Joined {customer?.ownerId?.createdAt}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {customer?.ownerId?.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-right">
                      <p className="font-medium">
                        ${customer.balance.toFixed(2)}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        customer.ownerId.status == "ACTIVE"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {customer.ownerId.status == "ACTIVE"
                        ? "Active"
                        : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <AlertDialogHeader>
                          <DialogTitle>Customer Details</DialogTitle>
                          <DialogDescription>
                            Customer information and transaction history
                          </DialogDescription>
                        </AlertDialogHeader>
                        {selectedCustomer && (
                          <div className="space-y-6">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                                  {getInitials(selectedCustomer.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {selectedCustomer.name}
                                </h3>
                                <Badge
                                  variant={
                                    customer.ownerId.status == "ACTIVE"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {customer.ownerId.status == "ACTIVE"
                                    ? "Active"
                                    : "Inactive"}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Email
                                </p>
                                <p className="text-sm">
                                  {selectedCustomer?.ownerId?.email}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Current Balance
                                </p>
                                <p className="text-sm font-medium">
                                  ${selectedCustomer.balance.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
