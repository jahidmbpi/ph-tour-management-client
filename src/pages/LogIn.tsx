import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { HTMLAttributes } from "react";
import z from "zod/v3";

import imag from "../../src/assets/athentication/login.svg";
import { Link } from "react-router";
import Password from "@/components/Password";
type RegisterProps = HTMLAttributes<HTMLDivElement>;

export default function LogIn({ className, ...props }: RegisterProps) {
  const { reset } = useForm();
  const logInSchema = z.object({
    email: z.string().email({ message: "please provide a valid email" }),
    password: z
      .string()
      .min(10, {
        message:
          "password must be at least 10 characters or special charecter.",
      })
      .max(20, {
        message: "password exceed 20 charecter long",
      }),
  });

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof logInSchema>) => {
    console.log(data);
    reset();
  };
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="mx-auto items-center">
          <h2 className="capitalize text-3xl lg:text-4xl md:text-5xl">
            please login
          </h2>
        </div>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-6 md:grid-cols-2 mx-auto items-center gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 md:px-10"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter your email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full" type="submit">
                  Submit
                </Button>
                <div>
                  <span className="flex items-center">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></span>

                    <span className="shrink-0 px-4 text-gray-900 dark:text-white">
                      Or
                    </span>

                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></span>
                  </span>
                </div>
                <Button
                  className="w-full bg-black hover:bg-blue-700"
                  type="submit"
                >
                  google
                </Button>
                <div>
                  <h2>
                    Don’t have an account?{" "}
                    <span className="font-bold">
                      <Link to="/register">Register</Link>
                    </span>
                  </h2>
                </div>
              </form>
            </Form>
            <div className="hidden sm:block">
              <img src={imag} alt="" />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
