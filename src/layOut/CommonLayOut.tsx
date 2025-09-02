import Fotter from "@/components/Fotter";
import Nav from "@/components/Nav";
import { adminSideBar } from "@/router/adminSideBar";
import { genareteRoute } from "@/utils/genareteRoutes";
import { Outlet } from "react-router";

export default function CommonLayOut() {
  console.log(genareteRoute(adminSideBar));
  return (
    <div className="min-h-screen flex flex-col">
      <Nav></Nav>
      <div className="grow-1">
        <Outlet></Outlet>
      </div>
      <Fotter></Fotter>
    </div>
  );
}
