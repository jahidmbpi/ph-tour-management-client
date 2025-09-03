import { useUserInfoQuery } from "@/redux/fetures/auth/auth.api";
import type { TRole } from "@/types/role";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requireRole: TRole) => {
  console.log(Component, requireRole);
  return function AuthWraper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    if (!isLoading && data?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (requireRole && !isLoading && !requireRole === data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
