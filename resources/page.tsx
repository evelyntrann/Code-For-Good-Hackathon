"use client";

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FileText, Book, ShoppingBag, Video } from "lucide-react"

export default function CareerResources() {
    const router = useRouter();

    // Navigate to the resume page
    const handleResumePage = () => {
        router.push('resources/resume');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-primary text-primary-foreground py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold">Career Development Resources</h1>
                    <p className="mt-2">Enhance your skills and boost your career prospects</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Resume Builder
                            </CardTitle>
                            <CardDescription>Create a mini professional resume</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">Our resume builder helps you learn how to build a standout mini resume.</p>
                            <Button onClick={handleResumePage} className="w-full">Build Your Resume</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Book className="h-5 w-5" />
                                Coursera Certificates
                            </CardTitle>
                            <CardDescription>Expand your knowledge</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">Access a wide range of online courses and earn certificates from top universities and companies.</p>
                            <Button className="w-full">
                                <a href="https://www.coursera.org/certificates" target="_blank" rel="noopener noreferrer" className="w-full">
                                    Browse Certificates
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                National Retail Certificates
                            </CardTitle>
                            <CardDescription>Boost your retail career</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">Gain industry-recognized certifications to advance your career in the retail sector.</p>
                            <Button className="w-full">
                                <a href="https://nrf.com/career-center/certifications" target="_blank" rel="noopener noreferrer" className="w-full">
                                    Explore Retail Certificates
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Video className="h-5 w-5" />
                                Mock Interviews
                            </CardTitle>
                            <CardDescription>Practice your interview skills</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">Prepare for your next job interview with our AI-powered mock interview simulator.</p>
                            <Button className="w-full">
                                <a href="https://practice.hirevue.com/signup/3m4pjuhLArd6v5kvbT6BHv/" target="_blank" rel="noopener noreferrer" className="w-full">
                                    Practice Mock Interview
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Why These Resources Matter</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>A well-crafted resume increases your chances of landing interviews</li>
                        <li>Online certificates demonstrate your commitment to continuous learning</li>
                        <li>Industry-specific certifications set you apart in competitive job markets</li>
                        <li>Mock interviews help you feel more confident and prepared for the real thing</li>
                    </ul>
                </section>
            </main>
        </div>
    )
}