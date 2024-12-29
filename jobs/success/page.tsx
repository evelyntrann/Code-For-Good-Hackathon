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

export default function Page() {
    
    return (
        <div className="flex flex-col items-center space-y-4">
       
            <Card className="box-border h-full w-full">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl text-center">Congratulations</CardTitle>
                    <CardDescription className="text-4xl text-center">You've successfully applied</CardDescription>
                </CardHeader>
                <div className="flex justify-center space-x-4">
                    <a href="/jobs" className="px-8 py-6 text-2xl">
                        <Button className="px-8 py-6 text-2xl">Back to Jobs</Button>
                    </a>
                </div>
            </Card>
    </div>

    )
}

