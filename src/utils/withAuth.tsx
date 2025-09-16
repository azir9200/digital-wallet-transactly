import type { TRole } from "@/types/authTypes";
import { useUserInfoQuery } from "@/redux/api/authApi";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const user = data?.data;
    console.log("withAuth", user);

    if (!isLoading && !user?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading && requiredRole !== user?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
