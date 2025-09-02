import { adminSideBar } from "@/router/adminSideBar";
import { userSideBar } from "@/router/userSidebar";
import type { TRole } from "@/types/role";

export const role = {
  admin: "ADMIN",
  superAdmin: "SUPER_ADMIN",
  user: "USER",
};

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminSideBar];
    case role.user:
      return [...userSideBar];
    case role.superAdmin:
      return [...adminSideBar];

    default:
      return [];
  }
};
