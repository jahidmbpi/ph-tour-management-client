import Loader from "@/components/Loader";
import { useUserInfoQuery } from "@/redux/fetures/auth/auth.api";
import type { TRole } from "@/types/role";
import { type ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requireRole: TRole) => {
  console.log(requireRole);
  console.log(Component);
  return function AuthWraper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) {
      return <Loader />;
    }

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (requireRole && requireRole !== data?.data?.role?.toUpperCase()) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
