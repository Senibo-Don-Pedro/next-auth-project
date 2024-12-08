"use server";

import { RegisterShema } from "@/schemas";
import { z } from "zod";

export async function register(values: z.infer<typeof RegisterShema>) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const validatedFields = RegisterShema.safeParse(values);

  if (!validatedFields) return { error: "Invalid fields!!" };

  return { success: "Email sent!!" };
}
