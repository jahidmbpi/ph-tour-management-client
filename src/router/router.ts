import { createBrowserRouter } from "react-router-dom";
import CommonLayOut from "../layOut/CommonLayOut";
import Home from "../pages/Home";
import About from "../pages/About";

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
]);
