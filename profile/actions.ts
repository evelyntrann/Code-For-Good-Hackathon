'use server'

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function fetchUserData() {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data, error } = await supabase
      .from('custom_users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
    return data;
  }
  return null;
}

export async function getResumeUrl(path: string) {
  const { data } = supabase.storage.from('resumes').getPublicUrl(path)
  return data.publicUrl;
}

export async function saveUserProfile(profileData: any, resumeUrl: string | null) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return false;
  }

  const { error } = await supabase
    .from('custom_users')
    .update({
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      phone: profileData.phone,
      address: profileData.address,
      gender: profileData.gender,
      disability: profileData.disability,
      work_auth: profileData.workAuth,
      linkedin: profileData.linkedin,
      roles: profileData.roles,
      resume_url: resumeUrl || undefined,
    })
    .eq('id', user.id);

  if (error) {
    console.error("Error updating profile:", error);
    return false;
  }
  return true;
}