import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import logo from "../../assets/logoipsum-248.png";

export default function HeroSection() {
  return (
    <div className="items-center mx-auto justify-center h-screen w-full text-center flex flex-col">
      <div className="space-y-4 ">
        <div>
          <img className="w-[80px] mx-auto " src={logo} alt="" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold capitalize">
          explore the beauty of <span className="text-primary">bangladesh</span>
        </h2>
        <p>
          Turn your travel dreams into reality. Discover new places, organize{" "}
          <br />
          trips, and manage your tours in just a few clicks
        </p>
        <Button asChild>
          <Link to="/tour">Explore</Link>
        </Button>
      </div>
    </div>
  );
}
