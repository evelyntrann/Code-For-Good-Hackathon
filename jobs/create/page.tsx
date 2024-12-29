'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Select, {MultiValue, SingleValue} from 'react-select'
import { submitJobPosting } from './actions';
import { OptionType, JobPostingFormData } from '@/app/types/jobs';

export default function JobPostingForm(): JSX.Element {
  const { register, control, handleSubmit, formState: { errors } } = useForm<JobPostingFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<JobPostingFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitJobPosting(data);
      if (result.success) {
        alert('Job posted successfully!');

      } else {
        setSubmitError(result.error || 'An error occurred while submitting the job posting.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const qualificationOptions = [
    { value: 'high_school_ged', label: 'High School/GED' },
    { value: 'associates_degree', label: "Associate's Degree" },
    { value: 'bachelors_degree', label: "Bachelor's Degree" },
  ];

  const skillsOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'sql', label: 'SQL' },
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'docker', label: 'Docker' },
    { value: 'aws', label: 'AWS' },
    { value: 'problem solving', label: 'Problem Solving' },
    { value: 'communication', label: 'Communication' },
    { value: 'teamwork', label: 'Teamwork' },
    { value: "customer service", label: "Customer Service"},
    { value: "google data analytics certificate", label: "Google Data Analytics Certificate" },
    { value: "google it support certificate", label: "Google IT Support Certificate" },
    { value: "google UI/UX design certificate", label: "Google UI/UX Design Certificate"},
    { value: "google project management certificate", label: "Google Project Management Certificate"},   
    { value: "google cybersecurity certificate", label: "Google Cybersecurity Certificate"},
  ];
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Job Posting</CardTitle>
        <CardDescription>Fill in the details for the new job posting.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" {...register("title", { required: "Title is required" })} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description", { required: "Description is required" })} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Salary</Label>
            <Input 
              id="salary" 
              type="number" 
              {...register("salary", { 
                required: "Salary is required",
                valueAsNumber: true 
              })} 
            />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="recruiter">Recruiter</Label>
            <Input id="recruiter" {...register("recruiter", { required: "Recruiter is required" })} />
            {errors.recruiter && <p className="text-red-500 text-sm">{errors.recruiter.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <Select
              {...field}
              options={skillsOptions}
              getOptionLabel={(option: OptionType) => option.label}
              getOptionValue={(option: OptionType) => option.value}
              placeholder="Select skills"
              isSearchable={true}
              isMulti={true}
              onChange={(selectedOption: MultiValue<OptionType>) => field.onChange(selectedOption)}
              />
            )}
            />
            {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualification">Qualifications</Label>
            <Controller
              name="qualification"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={qualificationOptions}
                  getOptionLabel={(option: OptionType) => option.label} 
                  getOptionValue={(option: OptionType) => option.value} 
                  onChange={(selectedOption: SingleValue<OptionType>) => field.onChange(selectedOption)}
                  placeholder="Select qualification"
                />
              )}
            />
            {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" {...register("company", { required: "Company is required" })} />
            {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
          </div>

          {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

          <div className="pt-6 flex justify-center">
            <Button type="submit" className="w-full sm:w-auto">
              { isSubmitting && <span>Submitting...</span>}
              { !isSubmitting && <span>Submit Job Posting</span>}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};