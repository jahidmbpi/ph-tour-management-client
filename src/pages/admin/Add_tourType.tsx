import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTourTypeInfoQuery } from "@/redux/fetures/tour/tour.api";
import { Trash2 } from "lucide-react";
import { TourTypeModal } from "./TourTypeModal";

export default function Add_tourType() {
  const { data } = useTourTypeInfoQuery(undefined);

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
                <Button size="sm">
                  <Trash2></Trash2>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
