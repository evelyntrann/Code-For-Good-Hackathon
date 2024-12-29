export interface OptionType {
  value: string;
  label: string;
}

export interface JobPostingFormData {
  id?: number;
  title: string;
  description: string;
  salary: number;
  recruiter: string;
  skills: OptionType[];
  qualification: OptionType;
  company: string;
}