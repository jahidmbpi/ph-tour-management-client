import { createBrowserRouter } from "react-router-dom";
import CommonLayOut from "../layOut/CommonLayOut";
import Home from "../pages/Home";
import About from "../pages/About";
import LogIn from "@/pages/LogIn";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";

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
]);
