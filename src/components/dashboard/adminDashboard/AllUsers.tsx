// import { useGetAllUserQuery } from "@/redux/api/adminApi";
// import { Loader2 } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const Users = () => {
//   const { data, isLoading, error } = useGetAllUserQuery(undefined);
//   const users = data?.data || [];

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64 text-gray-600">
//         <Loader2 className="animate-spin w-5 h-5 mr-2" />
//         <span>Loading users...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 text-center p-4">Failed to fetch users.</div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-lg font-semibold mb-4">All Users </h1>
//       <h1 className="text-lg font-semibold mb-4">Total {users.length} </h1>
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>#</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Phone</TableHead>
//               <TableHead>Role</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {users.length > 0 ? (
//               users.map((user: any, index: number) => (
//                 <TableRow key={user._id} className="hover:bg-gray-50">
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell className="font-medium">{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.phone}</TableCell>
//                   <TableCell className="capitalize text-gray-600">
//                     {user.role}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center text-gray-500">
//                   No users found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default Users;
