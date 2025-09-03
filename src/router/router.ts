import { createBrowserRouter } from "react-router-dom";
import CommonLayOut from "../layOut/CommonLayOut";
import Home from "../pages/Home";
import About from "../pages/About";
import LogIn from "@/pages/LogIn";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import DeshbordLayOut from "@/layOut/DeshbordLayOut";
import { genareteRoute } from "@/utils/genareteRoutes";
import { adminSideBar } from "./adminSideBar";
import { userSideBar } from "./userSidebar";
import Unauthrized from "@/pages/Unauthrized";
import { withAuth } from "@/utils/withAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CommonLayOut,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
    ],
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: LogIn,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/unauthorized",
    Component: Unauthrized,
  },
  {
    Component: withAuth(DeshbordLayOut, "ADMIN"),
    path: "/admin",
    children: [...genareteRoute(adminSideBar)],
  },
  {
    Component: DeshbordLayOut,
    path: "/user",
    children: [...genareteRoute(userSideBar)],
  },
]);
