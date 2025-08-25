import { Navigate } from "react-router-dom";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { ReactNode } from "react";
import type { TRole } from "@/types/authTypes";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: TRole;
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { data, isLoading } = useUserInfoQuery(undefined);

  if (!isLoading && !data?.data?.email) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
}
