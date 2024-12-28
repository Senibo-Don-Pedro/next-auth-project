"use client";

// form imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResetSchema } from "@/schemas";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

// card wrapper import
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";

export function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof ResetSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);

        // TODO: add when we add 2FA
        setSuccess(data?.success);
      });
    });
  }

  return (
    <CardWrapper
      headerLabel="Forgot your Password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      // showSocial
    >
      <div className="">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@example.com"
                        disabled={isPending}
                        {...field}
                        className={
                          form.formState.errors.email && " bg-destructive/15"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? (
                <div>
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                "Send reset email"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
}
