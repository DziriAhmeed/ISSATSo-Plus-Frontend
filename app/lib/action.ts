"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes("please confirm your email")) {
        return "Please confirm your email";
      } else if (errorMessage.includes("invalid credentials")) {
        return "Invalid credentials";
      } else if (errorMessage.includes("user not found")) {
        return "User not found";
      } else if (errorMessage.includes("banned")) {
        return "Your account has been banned";
      } else {
        return "Something went wrong.";
      }
    }
    throw error;
  }
}

export const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  identityNumber: string
): Promise<string> => {
  try {
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        identityNumber,
      }),
    });

    if (response.ok) {
      return "success";
    } else {
      const errorData = await response.json();
      console.log(errorData);
      const errorMessage = errorData?.message || "Registration failed";
      return errorMessage;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return "error";
  }
};
