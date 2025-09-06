import Add_Division from "@/pages/admin/division/Add_Division";
import { withAuth } from "./../utils/withAuth";
import Add_tour from "@/pages/admin/tour/Add_tour";

import Analytics from "@/pages/admin/analytics/Analytics";
import Add_tourType from "@/pages/admin/tourType/Add_tourType";

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
        Component: withAuth(Add_Division, "SUPER_ADMIN"),
      },
    ],
  },
];
