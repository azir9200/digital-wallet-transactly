/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useApprovedAgentMutation } from "@/redux/api/adminApi";
import { useGetAgentQuery } from "@/redux/api/agentApi";
import type { AgentStatus, Status } from "@/types/authTypes";
import {
  AlertCircle,
  Check,
  MoreHorizontal,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
// import { AgentStatus, Status, IsActive } from '@/contexts/AuthContext';

interface Agent {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  agentstatus: AgentStatus;
  status: Status;
  isActive?: Status;
  isVerified?: boolean;
  commissionRate?: number;
  totalCommission?: number;
  totalTransactions?: number;
  createdAt: string;
}

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const { data } = useGetAgentQuery(undefined);
  const [approvedAgent] = useApprovedAgentMutation();
  const agents = data?.data || [];
  console.log(agents, "thisis");
  const pendingAgents = agents.filter((a: any) => a.agentStatus == "pending");
  console.log("pending", pendingAgents);
  const approvedAgents = agents.filter(
    (a: any) => a.agentStatus === "approved"
  );
  const suspendedAgents = agents.filter(
    (a: any) => a.agentStatus === "suspended"
  );
  const handleAgentAction = async (agentId: string, action: string) => {
    const res = await approvedAgent({
      id: agentId,
      userInfo: { agentstatus: action }, // এখানে অবশ্যই agentstatus key থাকতে হবে
    }).unwrap(); // unwrap করলে সরাসরি response পাবেন

    console.log(res, "this");
    if (res.success) {
      toast.success(`${res.message}`);
    } else {
      toast.error(`${res.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agent Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{agents.length}</div>
            <p className="text-muted-foreground">Total Agents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {approvedAgents.length}
            </div>
            <p className="text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {pendingAgents.length}
            </div>
            <p className="text-muted-foreground">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">
              {suspendedAgents.length}
            </div>
            <p className="text-muted-foreground">Suspended</p>
          </CardContent>
        </Card>
      </div>
      {/* Pending Approvals Alert */}
      {pendingAgents.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">
                {pendingAgents.length} agent
                {pendingAgents.length > 1 ? "s" : ""} pending approval
              </span>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents by name or email..."
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
              <option value="all">All Status</option>
              <option value={approvedAgents}>Approved</option>
              <option value={pendingAgents}>Pending</option>
              <option value={suspendedAgents}>Suspended</option>
            </select>
          </div>
        </CardContent>
      </Card>
      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agents List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent: Agent) => (
                <TableRow key={agent._id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-white">
                          {agent.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {agent._id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{agent.mobile || "N/A"}</TableCell>
                  <TableCell>
                    {agent.agentstatus}
                    {/* {getAgentStatusBadge(agent.agentStatus)} */}
                  </TableCell>

                  <TableCell>
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {agent.agentstatus === "pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() =>
                                handleAgentAction(agent._id, "approved")
                              }
                              className="text-green-600"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approve Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleAgentAction(agent._id, "suspended")
                              }
                              className="text-red-600"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reject Agent
                            </DropdownMenuItem>
                          </>
                        )}
                        {agent.agentstatus === "approved" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleAgentAction(agent._id, "suspend")
                            }
                            className="text-red-600"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Suspend Agent
                          </DropdownMenuItem>
                        )}
                        {agent.agentstatus === "suspended" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleAgentAction(agent._id, "approve")
                            }
                            className="text-green-600"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Reactivate Agent
                          </DropdownMenuItem>
                        )}
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

export default Agents;
