import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const response = await fetch(
             "http://localhost:3001/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          if (response.ok) {
            const user = await response.json();
            return user;
          } else {
            const errorResponse = await response.json();
            const errorMessage =
              errorResponse?.message ||
              "Failed to authenticate user with external API";
            console.log(errorMessage);
            switch (errorMessage) {
              case "Please confirm your email":
                throw new AuthError("Please confirm your email");
              case "Invalid credentials":
                throw new AuthError("Invalid credentials");
              case "User not found":
                throw new AuthError("User not found");
              case "You are banned. you cant access this site anymore.":
                throw new AuthError(
                  "You are banned. you cant access this site anymore."
                );
              default:
                throw new AuthError("Something went wrong");
            }
          }
        }
      },
    }),
  ],
});