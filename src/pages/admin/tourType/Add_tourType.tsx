import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useRemoveTourTypeMutation,
  useTourTypeInfoQuery,
} from "@/redux/fetures/tour/tour.api";

import { toast } from "sonner";
import { TourTypeModal } from "./TourTypeModal";
import DeleteConfrim from "@/pages/public/DeleteConfrim";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Add_tourType() {
  const { data } = useTourTypeInfoQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handelremoveTourType = async (tourId: string) => {
    try {
      const res = await removeTourType(tourId).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Tour type delete successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-5">
      <div className=" flex justify-between my-8">
        <h2 className="capitalize text-xl font-semibold"> add tour</h2>
        <TourTypeModal />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.tourType?.map((item: { name: string; _id: string }) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium w-full">{item.name}</TableCell>
              <TableCell>
                <DeleteConfrim onConfrim={() => handelremoveTourType(item._id)}>
                  <Button>
                    <Trash2></Trash2>
                  </Button>
                </DeleteConfrim>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
