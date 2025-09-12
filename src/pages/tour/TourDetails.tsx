import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAllTourQuery } from "@/redux/fetures/tour/tour.api";
import { MapPin } from "lucide-react";

import { useParams } from "react-router";

export default function TourDetails() {
  const { id } = useParams();
  const { data, isLoading } = useAllTourQuery({ _id: id });
  const tourData = data?.allTour?.data[0];
  console.log(tourData);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="px-5">
      <div className=" flex items-center justify-between mx-auto  p-2">
        <div>
          <h2 className="text-2xl font-medium">this is title </h2>
          <div className="flex space-x-4">
            <p className=" flex gap-2">
              <MapPin />
              <span> loaction</span>
            </p>
            <p>cost from</p>
            <p>max guest</p>
          </div>
        </div>
        <Button>book</Button>
      </div>
    </div>
  );
}
