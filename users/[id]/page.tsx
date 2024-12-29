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
import Link from 'next/link';

type User = {
  id: string;  // Added id field
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  address?: string;
  gender?: string;
  disability?: string;
  work_auth?: string;
  linkedin?: string;
  resume_url?: string;
};

async function getCurrentUserId() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
      console.error('Error fetching current user:', error);
      return null;
  }
  return user?.id || null;
}

async function getUser(id: number) {
    const supabase = createClient();
  
    const { data, error } = await supabase
      .from("custom_users")
      .select("id, first_name, last_name, email, role, address, gender, disability, work_auth, linkedin, resume_url")
      .eq("id", id)
      .single();
  
    if (error) {
      console.error(error);
      return { success: false, error, user: null };
    }
  
    return { success: true, user: data as User};
  }


interface PageParams {
    id: number;
}

export default async function Page({ params }: { params: PageParams }) {
    const id = params.id;
    const { success, user } = await getUser(id);
    const currentUserId = await getCurrentUserId();

    if (!success || !user) {
        return <div>Error loading User</div>;
    }

    const isPDF = user.resume_url?.toLowerCase().endsWith('.pdf');
    const isOwnProfile = currentUserId === user.id;

    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <Card className="w-full max-w-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold">{user.first_name} {user.last_name}</CardTitle>
                  <CardDescription className="text-xl sm:text-2xl md:text-3xl text-gray-200">{user.role}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 px-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoItem label="Email" value={user.email} />
                      {user.address && <InfoItem label="Address" value={user.address} />}
                      {user.gender && <InfoItem label="Gender" value={user.gender} />}
                      {user.disability && <InfoItem label="Disability" value={user.disability} />}
                      {user.work_auth && <InfoItem label="Work Authorization" value={user.work_auth} />}
                  </div>

                  {user.resume_url && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-2">Resume</h3>
                      {isPDF ? (
                        <iframe 
                          src={`${user.resume_url}#view=FitH`} 
                          className="w-full h-96 border border-gray-300 rounded"
                        >
                          This browser does not support PDFs. Please download the PDF to view it.
                        </iframe>
                      ) : (
                        <a href={user.resume_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          Download Resume
                        </a>
                      )}
                    </div>
                  )}
              </CardContent>
              <CardFooter className="flex flex-col items-start p-6 bg-gray-50 rounded-b-lg">
                  {user.linkedin && (
                      <div className="mb-4 text-sm">
                          <span className="font-semibold">LinkedIn:</span> 
                          <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">
                            {user.linkedin}
                          </a>
                      </div>
                  )}
                  {isOwnProfile && (
                    <Link href={`/profile`} className="self-end">
                        <Button className="bg-primary text-white font-bold py-2 px-4 rounded">
                            Edit Profile
                        </Button>
                    </Link>
                  )}
              </CardFooter>
          </Card>
      </div>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
      <div>
          <span className="font-semibold">{label}:</span> {value}
      </div>
  );
}