"use client";

// form imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";

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
import { useSearchParams } from "next/navigation";

// card wrapper import
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Emai already in use with different provider!"
      : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);

        // TODO: add when we add 2FA
        setSuccess(data?.success);
      });
    });
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        disabled={isPending}
                        {...field}
                        className={
                          form.formState.errors.password && "bg-destructive/15"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? (
                <div>
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
}
