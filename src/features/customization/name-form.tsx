"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpCircle, Loader2 } from "lucide-react";
import { FC, useState, useEffect } from "react";
import { uploadLogo } from "../common/blob";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

interface Prop {
  };

const customizationFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
})

type CustomizationFormValues = z.infer<typeof customizationFormSchema>

export const NameForm: FC<Prop> = (props) => {

  var form = useForm<CustomizationFormValues>({
    resolver: zodResolver(customizationFormSchema),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/customization`)
        const data = await response.json();
        let dataName = JSON.parse(data).name;
        form.reset({name: dataName});
      } catch (error) {
        //console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [form]);

  function onSubmit(data: z.infer<typeof customizationFormSchema>) {
    try {
      console.log("Sending name to API: ", JSON.stringify(data));
      const response = fetch('/api/customization', {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-8 gap-2">
                    <div className="col-span-7">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Your Copilot's name" {...field} />
                                </FormControl>
                                <FormDescription>
                                This is the name that will be displayed on your profile and in
                                emails.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-1 flex justify-center items-center h-full">
                        <Button type="submit" className="w-full">
                            Update
                        </Button>
                    </div>
            </div>
          </form>
         </Form> 

  )
}
