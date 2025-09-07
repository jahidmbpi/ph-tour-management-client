/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTourTypeInfoQuery } from "@/redux/fetures/tour/tour.api";

import { useForm } from "react-hook-form";

export default function Add_tour() {
  const { data: tourTypeData } = useTourTypeInfoQuery(undefined);
  console.log(tourTypeData);

  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
            <form id="add-tour" onSubmit={form.handleSubmit(onSubmit)}>
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
                          <FormLabel>tour title</FormLabel>
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
                          <FormLabel>tour title</FormLabel>
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
      </Card>
    </div>
  );
}
