"use client";

import { Globe, UserRound } from 'lucide-react';
import { signup } from "../login/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup1: React.FC = () => {
  const [role, setRole] = useState<'candidate' | 'employer' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signup(formData);

    if (result.success) {
      // Redirect based on role
      router.push(role === 'candidate' ? '/profile' : '/');
    } else {
      setError(result.error || "An unknown error occurred");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <Card className="mx-auto w-full max-w-md">
            <CardHeader className="items-center">
              <UserRound className="size-10 rounded-full bg-accent p-2.5 text-muted-foreground" />
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Type here..."
                      required
                    />

                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Type here..."
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Role</Label>
                    <div className="flex gap-4">
                      <label>
                        <input
                          type="radio"
                          name="role"
                          value="candidate"
                          checked={role === 'candidate'}
                          onChange={(e) => setRole(e.target.value as 'candidate')}
                          required
                        />
                        Candidate
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="role"
                          value="employer"
                          checked={role === 'employer'}
                          onChange={(e) => setRole(e.target.value as 'employer')}
                          required
                        />
                        Employer
                      </label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Sign up
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="mx-auto flex gap-1 text-sm">
            <p>Already have an account?</p>
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup1;