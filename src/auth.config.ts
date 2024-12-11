import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          //because google and github login doesn't have password. If they signed up with that, and want to use this, it shouldnt work
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig;
