import { createClient } from '@/utils/supabase/server';


export interface JobPostingData {
  id?: number;
  title: string;
  description: string;
  salary: number;
  recruiter: string;
  skills: string[]; // Changed from OptionType[] to string[]
  qualification: string; // Changed from OptionType: string
  company: string;
}

export async function getUser() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)
    return user;
}


export async function getJob(id: number) {
    const supabase = createClient();
  
    const { data, error } = await supabase
      .from("Job")
      .select("title, description, salary, recruiter, skills, qualification, company")
      .eq("id", id);
  
    if (error) {
      console.error(error);
      return { success: false, error, job: [] };
    }
  
    return { success: true, job: data as JobPostingData[]};
  }