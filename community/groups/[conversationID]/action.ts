"use server";

// app/action.ts

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { User } from "@supabase/supabase-js";

export async function getCurrentUser(): Promise<{ user: User | null }> {
  const supabase = createClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user ?? null;

  return { user };
}
