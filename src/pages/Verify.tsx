import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/fetures/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { z } from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);

  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  const handleConfirm = async () => {
    try {
      const result = await sendOtp({ email }).unwrap();
      console.log("OTP sent:", result);
      setConfirmed(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Submit button: verify OTP
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const result = await verifyOtp({ email, otp: data.pin }).unwrap();
      console.log("OTP verified:", result);
      // optionally redirect user after verification
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      {!confirmed ? (
        // Confirm Card
        <Card className="w-[300px] max-w-sm">
          <CardHeader>
            <CardTitle>Verify your account</CardTitle>
            <CardDescription>{`OTP will be sent to ${email}`}</CardDescription>
          </CardHeader>

          <CardFooter>
            <Button onClick={handleConfirm} type="button" className="w-full">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      ) : (
        // OTP Form Card
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Enter OTP</CardTitle>
            <CardDescription>Enter the OTP sent to your email</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                id="verify-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <Button type="submit" form="verify-form" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
