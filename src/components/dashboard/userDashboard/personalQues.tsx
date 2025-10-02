/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  occupation: z.string().min(2, "Occupation is required"),
  occupationDescription: z
    .string()
    .min(10, "This field must be at least 10 characters"),
  countries: z.string().min(1, "Please specify a country"),
  monthlyTurnover: z.string().min(1, "Estimated Monthly Turnover is required"),
  monthlyTransactions: z
    .string()
    .min(1, "Estimated Monthly Transactions is required"),
  usagePurposes: z.string().min(1, "Usage Purposes is required"),
  sourceOfFunds: z.string().min(1, "Source of funds is required"),
  thirdPartyPayments: z.boolean(),
});

const PersonalQuestionnaires = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occupation: "",
      occupationDescription: "",
      countries: "",
      monthlyTurnover: "",
      monthlyTransactions: "",
      usagePurposes: "",
      sourceOfFunds: "",
      thirdPartyPayments: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-muted-foreground">
              Tell us about yous preferences.
            </p>
          </div>
          <div className="sm:mt-0"></div>
        </div>

        <h1 className="text-xl font-semibold mb-6">Personal Questionnaire</h1>

        <Form {...(form as any)}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Occupation */}
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your occupation?</FormLabel>
                  <FormControl>
                    <Input placeholder="Private sector" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Occupation Description */}
            <FormField
              control={form.control}
              name="occupationDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your occupation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Intended Countries */}
            <FormField
              control={form.control}
              name="countries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intended countries for in/out payments</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., BD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Monthly Turnover */}
            <FormField
              control={form.control}
              name="monthlyTurnover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Monthly Turnover</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Monthly Transactions */}
            <FormField
              control={form.control}
              name="monthlyTransactions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Monthly Transactions</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Usage Purposes */}
            <FormField
              control={form.control}
              name="usagePurposes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Purposes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Business payments, personal transfers..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Source of Funds */}
            <FormField
              control={form.control}
              name="sourceOfFunds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source of funds</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Salary, Business Income, Savings..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Third-party Payments */}
            <FormField
              control={form.control}
              name="thirdPartyPayments"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">
                    Do you accept or make payments on behalf of third parties?
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PersonalQuestionnaires;
