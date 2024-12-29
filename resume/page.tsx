"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download, Mail, Phone, MapPin } from 'lucide-react';

type FormData = {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  jobDetails: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
  };
  experience: string;
  skills: string[];
};

const initialFormData: FormData = {
  personalInfo: { name: '', email: '', phone: '', location: '' },
  jobDetails: { title: '', company: '', startDate: '', endDate: '' },
  experience: '',
  skills: []
};

export default function EnhancedResumeBuilder() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentSkill, setCurrentSkill] = useState('');

  const updateFormData = (section: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value   
      }
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.personalInfo.name}
                  onChange={(e) => updateFormData('personalInfo', 'name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => updateFormData('personalInfo', 'email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => updateFormData('personalInfo', 'phone', e.target.value)}
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.personalInfo.location}
                  onChange={(e) => updateFormData('personalInfo', 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobDetails.title}
                  onChange={(e) => updateFormData('jobDetails', 'title', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.jobDetails.company}
                  onChange={(e) => updateFormData('jobDetails', 'company', e.target.value)}
                  placeholder="Tech Corp"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.jobDetails.startDate}
                    onChange={(e) => updateFormData('jobDetails', 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.jobDetails.endDate}
                    onChange={(e) => updateFormData('jobDetails', 'endDate', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="experience">Describe your experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Describe your responsibilities and achievements..."
                className="h-40"
              />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="skill">Add a skill</Label>
                <div className="flex space-x-2">
                  <Input
                    id="skill"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    placeholder="e.g. JavaScript"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkill();
                      }
                    }}
                  />
                  <Button onClick={addSkill}>Add</Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  const renderResumePreview = (): JSX.Element => (
    <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h2 className="text-4xl font-bold text-primary mb-2">{formData.personalInfo.name || 'Your Name'}</h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {formData.personalInfo.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {formData.personalInfo.email}
            </div>
          )}
          {formData.personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              {formData.personalInfo.phone}
            </div>
          )}
          {formData.personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {formData.personalInfo.location}
            </div>
          )}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2 text-primary">Professional Experience</h3>
        <div className="mb-4">
          <div className="flex justify-between items-baseline">
            <p className="font-bold">{formData.jobDetails.title || 'Job Title'}</p>
            <p className="text-sm text-gray-600">
              {formData.jobDetails.startDate || 'Start Date'} - {formData.jobDetails.endDate || 'End Date'}
            </p>
          </div>
          <p className="text-gray-700">{formData.jobDetails.company || 'Company Name'}</p>
        </div>
        <ul className="list-disc list-inside text-gray-700">
          {formData.experience.split('\n').filter(line => line.trim() !== '').map((item, index) => (
            <li key={index} className="whitespace-pre-line">{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-2 text-primary">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {formData.skills.length > 0 ? (
            formData.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500">Your skills will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Example Resume Builder</h1>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-1/4 h-2 ${step >= stepNumber ? 'bg-primary' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span>Personal Info</span>
          <span>Job Details</span>
          <span>Experience</span>
          <span>Skills</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {renderStep()}
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <Button onClick={() => setStep(step - 1)} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} className="ml-auto">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => console.log('Generate Resume', formData)} className="ml-auto">
                Generate Resume <Download className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="md:sticky md:top-4 self-start">
          <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
          {renderResumePreview()}
        </div>
      </div>
    </div>
  );
}
