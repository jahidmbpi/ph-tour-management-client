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

export default function Add_tourType() {
  const { data } = useTourTypeInfoQuery(undefined);
  console.log(data);
  return (
    <div className="max-w-6xl w-full mx-auto px-5">
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
