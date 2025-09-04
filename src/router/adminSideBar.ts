import Add_Division from "@/pages/admin/Add_Division";
import { withAuth } from "./../utils/withAuth";
import Add_tour from "@/pages/admin/Add_tour";
import Add_tourType from "@/pages/admin/Add_tourType";
import Analytics from "@/pages/admin/Analytics";

export const adminSideBar = [
  {
    title: "deshbord",
    url: "#",
    items: [
      {
        title: "analytics",
        url: "/admin/analytics",
        Component: withAuth(Analytics, "SUPER_ADMIN"),
      },
      {
        title: "add tour",
        url: "/admin/add-tour",
        Component: withAuth(Add_tour, "SUPER_ADMIN"),
      },
      {
        title: "add tour type",
        url: "/admin/add-tour-type",
        Component: withAuth(Add_tourType, "SUPER_ADMIN"),
      },
      {
        title: "add Division",
        url: "/admin/add-Division",
        Component: withAuth(Add_Division, "ADMIN"),
      },
    ],
  },
];
