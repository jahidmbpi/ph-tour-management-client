import Add_tour from "@/pages/Add_tour";
import Analytics from "@/pages/Analytics";

export const adminSideBar = [
  {
    title: "deshbord",
    url: "#",
    items: [
      {
        title: "analytics",
        url: "/admin/analytics",
        Component: Analytics,
      },
      {
        title: "add tour",
        url: "/admin/add-tour",
        Component: Add_tour,
      },
    ],
  },
];
