// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetAllTransactionQuery } from "@/redux/api/transactionApi";
// import { Download, Loader2, Search } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import type { TransactionStatus } from "@/types/transaction.type";
// import { useState } from "react";

// const Transactions = () => {
//   const { data, isLoading, error } = useGetAllTransactionQuery(undefined);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedType, setSelectedType] = useState<string>("all");
//   const [selectedStatus, setSelectedStatus] = useState<string>("all");
//   const transactions = data?.data || [];

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64 text-gray-600">
//         <Loader2 className="animate-spin w-5 h-5 mr-2" />
//         <span>Loading transactions...</span>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="text-red-500 text-center p-4">
//         Failed to fetch transactions.
//       </div>
//     );
//   }
//   const filteredTransactions = transactions.filter((transaction) => {
//     const search = searchTerm.toLowerCase();

//     const matchesSearch =
//       (transaction.id?.toLowerCase().includes(search) ?? false) ||
//       (transaction.sender?.toLowerCase().includes(search) ?? false) ||
//       (transaction.receiver?.toLowerCase().includes(search) ?? false) ||
//       (transaction.userId?.toLowerCase().includes(search) ?? false);

//     const matchesType =
//       selectedType === "all" || transaction.type === selectedType;
//     const matchesStatus =
//       selectedStatus === "all" || transaction.status === selectedStatus;

//     return matchesSearch && matchesType && matchesStatus;
//   });

//   const getStatusBadge = (status: TransactionStatus) => {
//     switch (status) {
//       case "COMPLETED":
//         return (
//           <Badge variant="default" className="bg-green-100 text-green-800">
//             Completed
//           </Badge>
//         );
//       case "PENDING":
//         return (
//           <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
//             Pending
//           </Badge>
//         );
//       case "REVERSED":
//         return <Badge variant="destructive">Failed</Badge>;
//       case "CANCEL":
//         return (
//           <Badge variant="secondary" className="bg-gray-100 text-gray-800">
//             Cancelled
//           </Badge>
//         );
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   const totalAmount = transactions.reduce(
//     (sum: any, t: any) => sum + t.amount,
//     0
//   );
//   const totalFees = transactions.reduce(
//     (sum: any, t: any) => sum + (t.fee || 0),
//     0
//   );
//   const completedTransactions = transactions.filter(
//     (t) => t.status === transactions.status
//   );
//   const pendingTransactions = transactions.filter(
//     (t) => t.status === transactions.status
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Transaction Management</h1>
//         <Button>
//           <Download className="h-4 w-4 mr-2" />
//           Export Data
//         </Button>
//       </div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="text-2xl font-bold">{transactions.length}</div>
//             <p className="text-muted-foreground">Total Transactions</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="text-2xl font-bold text-green-600">
//               ${totalAmount.toFixed(2)}
//             </div>
//             <p className="text-muted-foreground">Total Volume</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="text-2xl font-bold text-blue-600">
//               ${totalFees.toFixed(2)}
//             </div>
//             <p className="text-muted-foreground">Total Fees</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="text-2xl font-bold text-yellow-600">
//               {pendingTransactions.length}
//             </div>
//             <p className="text-muted-foreground">Pending Review</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="text-2xl font-bold text-green-600">
//               {completedTransactions.length}
//             </div>
//             <p className="text-muted-foreground">Completed Review</p>
//           </CardContent>
//         </Card>
//         {/* Filters */}
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search by transaction ID or user name..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//               <select
//                 value={selectedType}
//                 onChange={(e) => setSelectedType(e.target.value)}
//                 className="px-3 py-2 border border-border rounded-md bg-background"
//               >
//                 <option value="all">All Types</option>
//                 {/* <option value={Transactions.type}>Transfer</option>
//                 <option value={TransactionType.ADD_MONEY}>Add Money</option>
//                 <option value={TransactionType.WITHDRAW}>Withdraw</option>
//                 <option value={TransactionType.CASH_IN}>Cash In</option>
//                 <option value={TransactionType.CASH_OUT}>Cash Out</option> */}
//               </select>
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="px-3 py-2 border border-border rounded-md bg-background"
//               >
//                 <option value="all">All Status</option>
//                 <option value={Transactions.status}>Completed</option>
//                 {/* <option value={TransactionStatus.PENDING}>Pending</option>
//                 <option value={TransactionStatus.FAILED}>Failed</option>
//                 <option value={TransactionStatus.CANCELLED}>Cancelled</option> */}
//               </select>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//       {/* //..... */}
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>#</TableHead>
//               <TableHead>Type</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Date</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {transactions.length > 0 ? (
//               transactions.map((txn: any, index: number) => (
//                 <TableRow key={txn._id} className="hover:bg-gray-50">
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell className="capitalize">{txn.type}</TableCell>
//                   <TableCell>${txn.amount.toFixed(2)}</TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={
//                         txn.status === "completed"
//                           ? "default"
//                           : txn.status === "pending"
//                           ? "secondary"
//                           : "destructive"
//                       }
//                     >
//                       {txn.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     {new Date(txn.createdAt).toLocaleDateString()}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center text-gray-500">
//                   No transactions found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default Transactions;
