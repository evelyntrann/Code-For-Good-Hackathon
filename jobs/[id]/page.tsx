import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
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

async function getJob(id: number) {
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


interface PageParams {
    id: number;
}

export default async function Page({ params }: { params: PageParams }) {
    const id = params.id;
    const { success, job } = await getJob(id);

    if (!success) {
        return <div>Error loading jobs</div>;
    }
    return (
        <div className='flex justify-center'>
        {job.map((job: JobPostingData) => (
        <Card key={job.id} className="w-[500px] flex flex-col items-center spact-y-4">
      <CardHeader>
        <CardTitle className='text-3xl'>{job.title}</CardTitle>
        <CardDescription className='text-2xl'>{job.company}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          <p>{job.description}</p>
            <div className="flex flex-col space-y-1.5">
            </div>
            <div className="flex flex-col space-y-1.5">
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
      <CardDescription className='text-clip overflow-hidden text-32'>
            Salary: {"$"+job.salary.toLocaleString()}<br />
            Skills: {Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}<br></br>
            Qualification: {job.qualification}
      </CardDescription>
      <div className='mt-20 pl-20'>
      <a href={`/jobs/${id}/apply`}>
        <Button>Apply</Button>
        </a>
      </div>
      </CardFooter>
    </Card>
       ))}
        </div>

    );
}
