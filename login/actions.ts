"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type SignupResult = {
  success: boolean;
  error?: string;
  role?: string;
};

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData): Promise<SignupResult> {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as string,
  };

  // Validate inputs
  if (!data.email || !data.password || !data.role) {
    return { success: false, error: "All fields are required." };
  }

  if (data.password.length < 6) {
    return {
      success: false,
      error: "Password must be at least 6 characters long.",
    };
  }

  if (!["candidate", "employer"].includes(data.role)) {
    return { success: false, error: "Invalid role selected." };
  }

  try {
    // Sign up the user
    const { data: authData, error: signUpError } = await supabase.auth.signUp(
      data
    );

    if (signUpError) {
      console.log(signUpError);
      return { success: false, error: "An error occurred during signup." };
    }

    if (authData.user) {
      // Insert the user data into your custom users table
      const { error: insertError } = await supabase
        .from("custom_users")
        .insert({
          id: authData.user.id,
          email: data.email,
          role: data.role,
        });

      if (insertError) {
        console.log("Error inserting into custom_users table:", insertError);
        return {
          success: false,
          error: "An error occurred while creating your profile.",
        };
      }
    }

    revalidatePath("/", "layout");
    return { success: true, role: data.role };
  } catch (error) {
    console.error("Unexpected error during signup:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
