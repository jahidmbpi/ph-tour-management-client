/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTourTypeInfoQuery } from "@/redux/fetures/tour/tour.api";
import { formatISO } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

import { useForm } from "react-hook-form";

export default function Add_tour() {
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [startOpen, setStartOpen] = React.useState(false);
  const [endOpen, setEndOpen] = React.useState(false);

  const { data: tourTypeData } = useTourTypeInfoQuery(undefined);
  console.log(tourTypeData);

  const form = useForm({
    defaultValues: {
      name: "",
      tourTypeId: "",
      DivisionId: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const onSubmitHandelar = (data: any) => {
    const tourdata = {
      ...data,
      startdate: formatISO(data.startDate),
      enddate: formatISO(data.endDate),
    };
    console.log(tourdata);
    form.reset();
  };

  return (
    <div className=" flex  justify-center items-center mx-auto w-full h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>add tour</CardTitle>
          <CardDescription>add a new tour type to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form id="add-tour" onSubmit={form.handleSubmit(onSubmitHandelar)}>
              <div className=" space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>tour title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter your  tour type name "
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="tourTypeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>tour type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tourTypeData?.data?.map(
                                (item: { _id: string; name: string }) => (
                                  <SelectItem value={item._id}>
                                    {item.name}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="DivisionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Division</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tourTypeData?.data?.map(
                                (item: { _id: string; name: string }) => (
                                  <SelectItem value={item._id}>
                                    {item.name}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Start Date</FormLabel>
                        <Popover open={startOpen} onOpenChange={setStartOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="start-date"
                              className="w-full justify-between font-normal"
                            >
                              {startDate
                                ? startDate.toLocaleDateString()
                                : "Select start date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              {...field}
                              mode="single"
                              selected={startDate}
                              onSelect={(date) => {
                                setStartDate(date);
                                setStartOpen(false);
                                field.onChange(date);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>End Date</FormLabel>
                        <Popover open={endOpen} onOpenChange={setEndOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="end-date"
                              className="w-full justify-between font-normal"
                            >
                              {endDate
                                ? endDate.toLocaleDateString()
                                : "Select end date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              {...field}
                              mode="single"
                              selected={endDate}
                              onSelect={(date) => {
                                setEndDate(date);
                                setEndOpen(false);
                                field.onChange(date);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="enter your  division description "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button form="add-tour" type="submit" className="w-full">
            add tour
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
