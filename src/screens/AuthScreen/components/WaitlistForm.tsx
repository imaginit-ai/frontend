import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asterisk } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createSignup, fetchGeoLocation } from "@/utils/waitlistUtils";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import WaitListPosition from "./WaitListPosition";
import { Textarea } from "@/components/ui/textarea";
import { browserName } from "react-device-detect";
import { WaitlistUser } from "@/types";
import { toast } from "@/hooks/use-toast";

const waitlistSchema = z
  .object({
    fullName: z.string(),
    email: z.string().email("Please enter a valid email address"),
    userType: z.string().optional(),
    otherType: z.string().optional(),
    reason: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (
      values.userType &&
      values.userType === "other" &&
      (!values.otherType || values.otherType.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please breifly describe yourself",
        path: ["otherType"],
      });
    }
  });

export const WaitlistForm = () => {
  const [waitlistUserData, setWaitlistUserData] = useState<
    WaitlistUser | undefined
  >(undefined);

  const form = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
      userType: undefined,
    },
  });

  const watchSelectedOther = form.watch("userType");

  useEffect(() => {
    if (watchSelectedOther && watchSelectedOther === "other") {
      form.register("otherType");
    } else {
      form.unregister("otherType");
    }
  }, [watchSelectedOther]);

  const onSubmit = async (values: z.infer<typeof waitlistSchema>) => {
    const getQ1Answer = (userType?: string, otherType?: string): string => {
      if (userType) {
        if (userType === "other") {
          return otherType || "[BLANK]";
        }
        return userType;
      }
      return "[BLANK]";
    };

    const locationData = await fetchGeoLocation();

    const signupRes = await createSignup(
      values.fullName.split(" ")[0],
      values.fullName.split(" ")[1] || "",
      values.email,
      [
        {
          question_value: "How would you describe yourself?",
          optional: false,
          answer_value: getQ1Answer(values.userType, values.otherType),
        },
        {
          question_value: "What brings you to Imaginit?",
          optional: true,
          answer_value: values.reason || "[BLANK]",
        },
      ],
      {
        browser: browserName,
        ...locationData,
      }
    );
    if (signupRes.success) {
      toast({
        variant: "success",
        title: "Thank you for signing up!",
        description: "You have been added to the waitlist.",
      });
      setWaitlistUserData(signupRes.data);
    }
  };

  const formLabel = (label: string, required?: boolean) => {
    if (required) {
      return (
        <FormLabel className="text-left flex items-center justify-start">
          {label}
          <Asterisk className="text-destructive w-3 h-3 ml-0.5 mb-0.5" />
        </FormLabel>
      );
    }
    return (
      <FormLabel className="text-left flex items-center justify-start">
        {label}
        <p className="ml-2 text-[12px] opacity-50 hidden sm:block">
          {"(optional)"}
        </p>
      </FormLabel>
    );
  };

  return (
    <>
      <div className="auth__header flex flex-col gap-3 sm:gap-5">
        <TypographyH1 className="text-[30px] text-center sm:text-5xl sm:text-left">
          join the waitlist.
        </TypographyH1>
        <TypographyH3 className="text-sm text-center sm:text-lg opacity-50 sm:text-left">
          Get early access to the most powerful visual learning platform.
        </TypographyH3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex w-full flex-col sm:flex-row gap-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-full">
                  {formLabel("Full Name", true)}
                  <FormControl className="w-full">
                    <Input
                      {...field}
                      placeholder="Full name"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  {formLabel("Email", true)}
                  <FormControl className="w-full">
                    <Input
                      {...field}
                      placeholder="Email address"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="userType"
            render={({ field }) => (
              <FormItem>
                {formLabel("How would you describe yourself?")}
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student/learner">
                        Student/Learner
                      </SelectItem>
                      <SelectItem value="creator">Creator</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="space-y-1 leading-none">
                  {watchSelectedOther === "other" && (
                    <div className="!mt-5 !mb-2.5">
                      <FormField
                        control={form.control}
                        name="otherType"
                        render={({ field }) => (
                          <FormItem>
                            {formLabel("Other (please specify)", true)}
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Please specify"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                {formLabel("What brings you to Imaginit?")}
                <FormControl>
                  <Textarea {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Join Waitlist</Button>
        </form>
      </Form>
      <WaitListPosition userData={waitlistUserData} />
    </>
  );
};
