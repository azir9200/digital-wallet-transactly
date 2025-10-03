import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUserQuery } from "@/redux/api/adminApi";
import type { Status, TRole } from "@/types/authTypes";
import { Ban, CheckCircle, MoreHorizontal, Search, Trash2 } from "lucide-react";
import { useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;

  role: TRole;
  status: Status;
  isActive?: Status;
  isVerified?: boolean;
  balance?: number;
  createdAt: string;
}

// Mock data

const Users = () => {
  const { data } = useGetAllUserQuery(undefined);
  const users = data?.data || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredUsers = users.filter((user: User) => {
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
    console.log(userId, action);
  };
  const handleDeleted = (userId: string) => {
    console.log(userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
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
              {users.filter((user: User) => user.status === "ACTIVE").length}
            </div>
            <p className="text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {users.filter((user: User) => user.status === "INACTIVE").length}
            </div>
            <p className="text-muted-foreground">Inactive Users</p>
          </CardContent>
        </Card> */}
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">
              {users.filter((user: User) => user.status === "BLOCKED").length}
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
                <TableHead>status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user: User) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {user._id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>

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
                        {user.status === "ACTIVE" ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleUserAction(user._id, "BLOCKED")
                            }
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Block User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleUserAction(user._id, "ACTIVE")}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Activate User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDeleted(user._id)}
                          className="text-red-600"
                        >
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
