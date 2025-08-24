import Fotter from "@/components/Fotter";
import Nav from "@/components/Nav";
import { Outlet } from "react-router";

export default function CommonLayOut() {
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
