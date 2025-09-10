/* eslint-disable @typescript-eslint/no-explicit-any */
import MultipulImageUpload from "@/components/MultipulImageUpload";
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
import { useDivisionInfoQuery } from "@/redux/fetures/division/division.api";
import { useCreateTourMutation } from "@/redux/fetures/tour/tour.api";
import { useTourTypeInfoQuery } from "@/redux/fetures/tourType/tourType.api";

import { formatISO } from "date-fns";
import { ChevronDownIcon, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function Add_tour() {
  const [startOpen, setStartOpen] = React.useState(false);
  const [endOpen, setEndOpen] = React.useState(false);
  const [images, setImages] = useState<File[] | []>([]);
  const { data: tourTypeData } = useTourTypeInfoQuery(undefined);
  const { data: divisionData } = useDivisionInfoQuery(undefined);
  const [createTour] = useCreateTourMutation();

  type TourFormValues = {
    title: string;
    tourType: string;
    division: string;
    startDate?: Date;
    endDate?: Date;
    description: string;
    included: { value: string }[];
    excluded: { value: string }[];
    amenities: { value: string }[];
    tourPlan: { value: string }[];
    maxGuest: number;
    minAge: number;
    departureLocation: string;
    arrivalLocation: string;
    location: string;
    costFrom: number;
  };

  const form = useForm<TourFormValues>({
    defaultValues: {
      title: "",
      tourType: "",
      division: "",
      startDate: undefined,
      endDate: undefined,
      description: "",
      included: [{ value: "" }],
      excluded: [{ value: "" }],
      amenities: [{ value: "" }],
      tourPlan: [{ value: "" }],
      maxGuest: 3,
      minAge: 18,
      departureLocation: "Dhaka Bus Terminal",
      arrivalLocation: "Dhaka Bus Terminal",
      location: "cox bazar",
      costFrom: 3500,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "included",
  });
  const {
    fields: exludedFields,
    append: excludedAppend,
    remove: excludedRemove,
  } = useFieldArray({
    control: form.control,
    name: "excluded",
  });

  const {
    fields: exludAmenities,
    append: amenitiesAppend,
    remove: amenitiesRemove,
  } = useFieldArray({
    control: form.control,
    name: "amenities",
  });

  const {
    fields: exludTourPlan,
    append: tourPlanAppend,
    remove: tourPlanRemove,
  } = useFieldArray({
    control: form.control,
    name: "tourPlan",
  });

  const onSubmitHandelar = async (data: any) => {
    const formData = new FormData();
    const tourdata = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included.map((item: { value: string }) => item.value),
      excluded: data.excluded.map((item: { value: string }) => item.value),
      amenities: data.amenities.map((item: { value: string }) => item.value),
      tourPlan: data.tourPlan.map((item: { value: string }) => item.value),
    };
    formData.append("data", JSON.stringify(tourdata));

    if (images && images.length > 0) {
      images.forEach((file) => {
        formData.append("files", file as File);
      });
    }
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.log(tourdata);
    try {
      const res = await createTour(formData).unwrap();
      console.log(res);
      // form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto w-full h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Add Tour</CardTitle>
          <CardDescription>add a new tour type to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form id="add-tour" onSubmit={form.handleSubmit(onSubmitHandelar)}>
              <div className="space-y-3">
                {/* Tour Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your tour title"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tour Type + Division */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="tourType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tour Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tourTypeData?.data?.map(
                                (item: { _id: string; name: string }) => (
                                  <SelectItem key={item._id} value={item._id}>
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
                      name="division"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Division</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select division" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {divisionData?.data?.data?.map(
                                (item: { _id: string; name: string }) => (
                                  <SelectItem key={item._id} value={item._id}>
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

                {/* Start Date + End Date */}
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
                              className="w-full justify-between font-normal"
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : "Select start date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              disabled={(date) =>
                                date <
                                new Date(
                                  new Date().setDate(new Date().getDate() - 1)
                                )
                              }
                              onSelect={(date) => {
                                field.onChange(date);
                                setStartOpen(false);
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
                              className="w-full justify-between font-normal"
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : "Select end date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setEndOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter tour description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" flex justify-between">
                  <FormField
                    control={form.control}
                    name="maxGuest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> max guest</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your tour title"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Min Age</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your tour title"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" flex justify-between">
                  <FormField
                    control={form.control}
                    name="departureLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Deperture location</FormLabel>
                        <FormControl>
                          <Input placeholder="" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="arrivalLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Arrivel location</FormLabel>
                        <FormControl>
                          <Input placeholder="" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>location</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="costFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>costFrom</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <MultipulImageUpload onChange={setImages} />
              </div>
            </form>
            <div className="mt-5">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p>included</p>
                  <Button
                    size="icon"
                    type="button"
                    variant="outline"
                    onClick={() => append({ value: "" })}
                  >
                    <Plus />
                  </Button>
                </div>
                {fields.map((field, index) => (
                  <div className="flex gap-2">
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`included.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" onClick={() => remove(index)}>
                      <Trash2></Trash2>
                    </Button>
                  </div>
                ))}
              </div>{" "}
              <div className="space-y-4 mt-5">
                <div className="flex justify-between">
                  <p>Excluded</p>
                  <Button
                    size="icon"
                    type="button"
                    variant="outline"
                    onClick={() => excludedAppend({ value: "" })}
                  >
                    <Plus />
                  </Button>
                </div>
                {exludedFields.map((field, index) => (
                  <div className="flex gap-2">
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`excluded.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" onClick={() => excludedRemove(index)}>
                      <Trash2></Trash2>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="space-y-4 mt-5">
                <div className="flex justify-between">
                  <p>Excluded</p>
                  <Button
                    size="icon"
                    type="button"
                    variant="outline"
                    onClick={() => amenitiesAppend({ value: "" })}
                  >
                    <Plus />
                  </Button>
                </div>
                {exludAmenities.map((field, index) => (
                  <div className="flex gap-2">
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`amenities.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      onClick={() => amenitiesRemove(index)}
                    >
                      <Trash2></Trash2>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="space-y-4 mt-5">
                <div className="flex justify-between">
                  <p>tourPlan</p>
                  <Button
                    size="icon"
                    type="button"
                    variant="outline"
                    onClick={() => tourPlanAppend({ value: "" })}
                  >
                    <Plus />
                  </Button>
                </div>
                {exludTourPlan.map((field, index) => (
                  <div className="flex gap-2">
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`tourPlan.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" onClick={() => tourPlanRemove(index)}>
                      <Trash2></Trash2>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button form="add-tour" type="submit" className="w-full">
            Add Tour
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
