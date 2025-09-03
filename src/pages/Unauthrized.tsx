import { Link } from "react-router";

export default function Unauthrized() {
  return (
    <div className=" grid place-content-center h-screen">
      <div className=" text-center items-center space-y-4">
        <h2 className=" capitalize text-4xl">sorry....</h2>
        <h2>you are Unauthrized</h2>
        <Link to="/"> back home</Link>
      </div>
    </div>
  );
}
