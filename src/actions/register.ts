"use server";

import { RegisterShema } from "@/schemas";
import { z } from "zod";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export async function register(values: z.infer<typeof RegisterShema>) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const validatedFields = RegisterShema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!!" };

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already in use" };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Todo: send verification email
  const verificationToken = await generateVerificationToken(email)






  return { success: "Confirmation email sent " };
}
