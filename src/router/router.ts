import { createBrowserRouter } from "react-router-dom";
import CommonLayOut from "../layOut/CommonLayOut";

import Verify from "@/pages/public/Verify";
import DeshbordLayOut from "@/layOut/DeshbordLayOut";
import { genareteRoute } from "@/utils/genareteRoutes";
import { adminSideBar } from "./adminSideBar";
import { userSideBar } from "./userSidebar";
import Unauthrized from "@/pages/public/Unauthrized";
import Home from "@/pages/public/Home";
import About from "@/pages/public/About";
import Register from "@/pages/public/Register";
import LogIn from "@/pages/public/LogIn";

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
    Component: DeshbordLayOut,
    path: "/admin",
    children: [...genareteRoute(adminSideBar)],
  },
  {
    Component: DeshbordLayOut,
    path: "/user",
    children: [...genareteRoute(userSideBar)],
  },
]);
