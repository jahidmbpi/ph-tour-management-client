/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";

export function DiviionMotal() {
  const [image, setImage] = useState<File | null>(null);
  console.log(image);
  const tourTypeSchema = z.object({
    name: z.string().min(1, "Tour type name is required"),
    description: z.string().min(1, "division description is required"),
  });
  const form = useForm<z.infer<typeof tourTypeSchema>>({
    resolver: zodResolver(tourTypeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  console.log("inside ad division modal", image);
  const onSubmit = async (data: z.infer<typeof tourTypeSchema>) => {
    try {
      //   if (result.data.success === true) {
      //     toast.success("Tour type created successfully!");
      //     form.reset();
      //   }
      console.log(data);
    } catch (error: any) {
      console.log(error.error?.data.message);
      const errorMessage =
        error?.error?.data?.message || "Something went wrong";
      toast.error(`${errorMessage}`);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Division</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="add-tour" onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
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
          <ImageUpload onChange={setImage} />
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button form="add-tour" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button form="add-tour" type="submit">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
