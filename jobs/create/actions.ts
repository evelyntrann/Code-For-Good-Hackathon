'use server';

import { createClient } from "@/utils/supabase/server";
import { OptionType, JobPostingFormData } from '@/app/types/jobs';

export async function submitJobPosting(data: JobPostingFormData) {
  const supabase = createClient();

  console.log('Received data:', JSON.stringify(data, null, 2));
  
  try {
    const skillsArray = data.skills.map(skill => skill.value);
    const qualificationValue = data.qualification.value;

    console.log('Processed data:', JSON.stringify({
      ...data,
      skills: skillsArray,
      qualifications: qualificationValue
    }, null, 2));

    const { data: insertedData, error } = await supabase
      .from('Job')
      .insert([
        {
          title: data.title,
          description: data.description,
          salary: data.salary,
          recruiter: data.recruiter,
          skills: skillsArray,
          qualification: qualificationValue,
          company: data.company
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Inserted data:', insertedData);
    return { success: true, data: insertedData };
  } catch (error) {
    console.error('Error details:', error);
    return { success: false, error: 'Failed to post job. Please try again.' };
  }
}