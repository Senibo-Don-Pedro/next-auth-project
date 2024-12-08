"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";

export async function login(values: z.infer<typeof LoginSchema>) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) return { error: "Invalid fields!!" };

  return { success: "Email sent!!" };
}
