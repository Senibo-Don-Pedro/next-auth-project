"use server";

import { RegisterShema } from "@/schemas";
import { z } from "zod";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function register(values: z.infer<typeof RegisterShema>) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const validatedFields = RegisterShema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!!" };

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) return { error: "Email already in use" };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Todo: send verification email
  return { success: "User Created!!" };
}
