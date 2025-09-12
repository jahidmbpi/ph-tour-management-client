import { useParams } from "react-router";

export default function TourDetails() {
  const { id } = useParams();
  console.log(id);
  return <div>TourDetails</div>;
}
