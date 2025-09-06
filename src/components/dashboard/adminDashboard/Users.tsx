import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Status, TRole } from "@/types/authTypes";

interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  role: TRole;
  status: Status;
  isActive?: Status;
  isVerified?: boolean;
  balance?: number;
  createdAt: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    mobile: "+1234567890",
    role: "USER" as TRole,
    status: "ACTIVE",
    isActive: "ACTIVE",
    isVerified: true,
    balance: 2500.5,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    mobile: "+1234567891",
    role: "USER" as TRole,
    status: "BLOCKED",
    isActive: "BLOCKED",
    isVerified: true,
    balance: 1200.0,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    mobile: "+1234567892",
    role: "USER" as TRole,
    status: "InACTIVE",
    isActive: "InACTIVE",
    isVerified: false,
    balance: 0,
    createdAt: "2024-02-01",
  },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case status:
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        );
      case (status = "InACTIVE"):
        return <Badge variant="secondary">Inactive</Badge>;
      case (status = "BLOCKED"):
        return <Badge variant="destructive">Blocked</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleUserAction = (userId: string, action: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          switch (action) {
            case "activate":
              return {
                ...user,
                status: "ACTIVE",
                isActive: "ACTIVE",
              };
            case "block":
              return {
                ...user,
                status: "BLOCKED",
                isActive: "BLOCKED",
              };

            default:
              return user;
          }
        }
        return user;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.status === "ACTIVE").length}
            </div>
            <p className="text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {users.filter((u) => u.status === "ACTIVE").length}
            </div>
            <p className="text-muted-foreground">Inactive Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">
              {users.filter((u) => u.status === "BLOCKED").length}
            </div>
            <p className="text-muted-foreground">Blocked Users</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="all">All status</option>
              <option value={"ACTIVE"}>Active</option>
              <option value={"INACTIVE"}>Inactive</option>
              <option value={"BLOCKED"}>Blocked</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>status</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {user.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile || "N/A"}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>${user.balance?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell>
                    {user.isVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        {user.status === "ACTIVE" ? (
                          <DropdownMenuItem
                            onClick={() => handleUserAction(user.id, "block")}
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Block User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              handleUserAction(user.id, "activate")
                            }
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Activate User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default Users;
