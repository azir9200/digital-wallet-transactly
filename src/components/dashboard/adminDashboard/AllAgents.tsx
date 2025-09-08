// import { useGetAgentQuery } from "@/redux/api/agentApi";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card, CardContent } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";

// const Agents = () => {
//   const { data, isLoading, error } = useGetAgentQuery(undefined);
//   const agents = data?.data || [];

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="animate-spin w-6 h-6 mr-2" />
//         <span>Loading agents...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 text-center p-4">
//         Failed to fetch agents.
//       </div>
//     );
//   }

//   return (
//     <Card className="p-4 shadow-md ">
//       <CardContent>
//         <h1 className="text-xl font-semibold mb-4">Agents List</h1>
//         <Table>
//           <TableCaption>A list of all registered agents.</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[50px]">#</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Phone</TableHead>
//               <TableHead>Role</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Details</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {agents.length > 0 ? (
//               agents.map((agent: IU, index: number) => (
//                 <TableRow key={agent._id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{agent.name}</TableCell>
//                   <TableCell>{agent.email}</TableCell>
//                   <TableCell>{agent.phone}</TableCell>
//                   <TableCell className="capitalize">{agent.role}</TableCell>
//                   <TableCell className="capitalize">
//                     {agent.agentStatus}
//                   </TableCell>
//                   <TableCell className="capitalize">details</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center text-gray-500">
//                   No agents found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export default Agents;
