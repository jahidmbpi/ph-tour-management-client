import { Button } from "@/components/ui/button";
import { useAllTourQuery } from "@/redux/fetures/tour/tour.api";
import { Link } from "react-router-dom";

export default function Tour() {
  const { data } = useAllTourQuery(undefined);
  console.log(data?.allTour.data);
  return (
    <div className="container grid grid-cols-12 px-5 mx-auto py-8 gap-5">
      <div className="col-span-3 border-2">
        <h2>this is filtter</h2>
      </div>
      <div className="col-span-9 w-full space-y-4">
        {data?.allTour?.data?.map((tour) => (
          <div
            key={tour._id}
            className="flex gap-5 w-full overflow-hidden border border-muted rounded-lg shadow-md p-2"
          >
            <div className="w-2/5 aspect-video flex-shrink-0">
              <img
                className="object-cover w-full h-full "
                src={tour.images[0]}
                alt={tour.title}
              />
            </div>
            <div className="w-full space-y-1">
              <h2 className="text-lg font-semibold">{tour.title}</h2>
              <p className="text-muted-foreground mb-3">{tour.description} </p>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-primary">
                  costFrom:{tour.costFrom}
                </h2>
                <h2 className="text-sm text-muted-foreground">
                  max guest:{tour.maxGuest}
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <h2 className=" font-medium">from:{tour.departureLocation}</h2>
                <h2 className="font-medium">to:{tour.arrivalLocation}</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>deuration:{tour.duration}</h2>
                <h2>min age:{tour.minAge}</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {tour.amenities.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {tour.amenities.length > 3 && (
                  <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                    +{tour.amenities.length - 3} more
                  </span>
                )}
              </div>
              <Button asChild className="w-full" variant="default">
                <Link to={`/tour/${tour._id}`}> view details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
