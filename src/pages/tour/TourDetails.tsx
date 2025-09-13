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
          <h2 className="text-2xl font-medium">{tourData?.title} </h2>
          <div className="flex space-x-4">
            <p className=" flex gap-2">
              <MapPin />
              <span> {tourData?.location}</span>
            </p>
            <p>cost {tourData?.costFrom}</p>
            <p>max {tourData?.maxGuest} guest</p>
          </div>
        </div>
        <Button>book</Button>
      </div>
      <div className="flex gap-2">
        {tourData?.images?.map((image) => (
          <img
            className="w-full h-[200px] overflow-hidden"
            src={image}
            alt=""
          />
        ))}
      </div>
      <div className="flex justify-between mt-6">
        {/* this is tour details  */}
        <div className="space-y-6 font-serif">
          <h2 className="">tour detail</h2>
          <div className="space-y-2 text-[16px] text-[#CBDCEE]">
            <p>
              <span>{tourData?.startDate}</span>-{" "}
              <span>{tourData?.endDate}</span>
            </p>
            <h2>deperture: {tourData?.departureLocation}</h2>
            <h2>Arraived: {tourData?.arrivalLocation}</h2>
            <h2>division: {tourData?.division}</h2>
            <h2>tour Type: {tourData?.tourType}</h2>
            <h2>min Age: {tourData?.tourType}</h2>
          </div>
        </div>
        <div className="space-y-4 font-serif">
          <h2 className="text-lg font-medium">description</h2>
          <p className="text-[16px] text-[#CBDCEE]">{tourData?.description}</p>
        </div>
      </div>
      <div className="flex justify-between mt-7">
        <div className="space-y-3">
          <h2 className="capitalize font-medium font-serif">amenities</h2>
          <div>
            {tourData?.amenities.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="capitalize font-medium font-serif">amenities</h2>
          <div>
            {tourData?.included.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="capitalize font-medium font-serif">amenities</h2>
          <div>
            {" "}
            {tourData?.excluded.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
