import { Navigate } from "react-router-dom";
import { useUserInfoQuery } from "@/redux/api/authApi";
import type { ReactNode } from "react";
import type { TRole } from "@/types/authTypes";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: TRole;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const user = data?.data;

  if (!isLoading && !user) {
    return <Navigate to="/login" />;
  }

  // if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
  //   return <Navigate to="/unauthorized" />;
  // }

  return <>{children}</>;
}
