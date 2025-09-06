import { useState } from "react";
import { Search, User, Eye, Phone, Mail, Wallet } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: number;
  totalTransactions: number;
  lastTransactionDate: string;
  isActive: boolean;
  joinDate: string;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "+1234567890",
    email: "john@example.com",
    balance: 250.0,
    totalTransactions: 15,
    lastTransactionDate: "2024-01-20",
    isActive: true,
    joinDate: "2023-12-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "+1234567891",
    email: "jane@example.com",
    balance: 150.75,
    totalTransactions: 8,
    lastTransactionDate: "2024-01-19",
    isActive: true,
    joinDate: "2023-11-15",
  },
  {
    id: "3",
    name: "Mike Johnson",
    phone: "+1234567892",
    email: "mike@example.com",
    balance: 500.0,
    totalTransactions: 22,
    lastTransactionDate: "2024-01-18",
    isActive: true,
    joinDate: "2023-10-20",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    phone: "+1234567893",
    email: "sarah@example.com",
    balance: 75.25,
    totalTransactions: 5,
    lastTransactionDate: "2024-01-15",
    isActive: false,
    joinDate: "2024-01-01",
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = filteredCustomers.length;
  const activeCustomers = filteredCustomers.filter((c) => c.isActive).length;
  const totalBalance = filteredCustomers.reduce((sum, c) => sum + c.balance, 0);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
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
                <p className="text-2xl font-bold">${totalBalance.toFixed(2)}</p>
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
            {filteredCustomers.length} customer(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Joined {customer.joinDate}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {customer.email}
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
                    <div className="text-center">
                      <p className="font-medium">
                        {customer.totalTransactions}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{customer.lastTransactionDate}</p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={customer.isActive ? "default" : "secondary"}
                    >
                      {customer.isActive ? "Active" : "Inactive"}
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
                                    selectedCustomer.isActive
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {selectedCustomer.isActive
                                    ? "Active"
                                    : "Inactive"}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Phone
                                </p>
                                <p className="text-sm">
                                  {selectedCustomer.phone}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Email
                                </p>
                                <p className="text-sm">
                                  {selectedCustomer.email}
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
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Total Transactions
                                </p>
                                <p className="text-sm">
                                  {selectedCustomer.totalTransactions}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Join Date
                                </p>
                                <p className="text-sm">
                                  {selectedCustomer.joinDate}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Last Activity
                                </p>
                                <p className="text-sm">
                                  {selectedCustomer.lastTransactionDate}
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
