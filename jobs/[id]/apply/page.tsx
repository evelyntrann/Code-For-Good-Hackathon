import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getJob, getUser } from "./action";

interface PageParams {
    id: number;
}

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

export default async function Page({ params }: { params: PageParams }) {
    const id = params.id;
    const { success, job } = await getJob(id);
    const user = await getUser();
    if (!success) {
        return <div>Error loading jobs</div>;
    }

    
    return (
        <div className="flex flex-col items-center space-y-4">
            {job.map((job: JobPostingData) => (
                <Card key={job.id} className="box-border h-full w-full">
                    <CardHeader className="text-center">
                        <CardTitle className="text-5xl text-center">{job.title}</CardTitle>
                        <CardDescription className="text-4xl text-center">{job.company}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-3xl text-center">
                        <p>Do you want to apply for this job?</p>
                    </CardContent>
                    <div className="flex justify-center space-x-4">
                        <a href="/jobs/success" className="px-8 py-6 text-2xl">
                            <Button className="px-8 py-6 text-2xl">Yes</Button>
                        </a>
                        <a href="/jobs" className="px-8 py-6 text-2xl">
                            <Button className="px-8 py-6 text-2xl">No</Button>
                        </a>
                    </div>
                </Card>
            ))}
        </div>
    );
}
