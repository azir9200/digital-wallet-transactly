// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Download, } from "lucide-react";
// import {
//   Table,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// const StatTransactions = () => {
//   // const { data, isLoading, error } = useGetTransactionStatQuery(undefined);
//   // console.log("transaction stat4545", data?.data);
//   // console.log("transaction stat", data);

//   // const transactions = data?.data || [];

//   // if (isLoading) {
//   //   return (
//   //     <div className="flex items-center justify-center h-64 text-gray-600">
//   //       <Loader2 className="animate-spin w-5 h-5 mr-2" />
//   //       <span>Loading transactions...</span>
//   //     </div>
//   //   );
//   // }
//   // if (error) {
//   //   return (
//   //     <div className="text-red-500 text-center p-4">
//   //       Failed to fetch transactions.
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">
//           Transaction Management == transactions.totalTransaction
//         </h1>
//         <Button>
//           <Download className="h-4 w-4 mr-2" />
//           Export Data
//         </Button>
//       </div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="text-2xl font-bold">transactions.length</div>
//             <p className="text-muted-foreground">Total Stat</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="text-2xl font-bold text-green-600">amount</div>
//             <p className="text-muted-foreground">Total Volume</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="text-2xl font-bold text-blue-600">fee</div>
//             <p className="text-muted-foreground">Total Fees</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="text-2xl font-bold text-yellow-600">pending</div>
//             <p className="text-muted-foreground">Pending Review</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="text-2xl font-bold text-green-600">
//               completedTransactions
//             </div>
//             <p className="text-muted-foreground">Completed Review</p>
//           </CardContent>
//         </Card>
//         {/* Filters */}
//         <Card></Card>
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
//           {/* <TableBody>
//             transactions.length > 0 ? (
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
//           </TableBody> */}
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default StatTransactions;
