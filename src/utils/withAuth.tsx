import Loader from "@/components/Loader";
import { useUserInfoQuery } from "@/redux/fetures/auth/auth.api";
import type { TRole } from "@/types/role";
import { type ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requireRole: TRole) => {
  return function AuthWraper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) {
      return <Loader></Loader>;
    }
    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }
    console.log(data?.data?.role);
    if (requireRole && requireRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
