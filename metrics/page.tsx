// app/page.tsx (or app/[your-directory]/page.tsx)

import { Component, ComponentPie } from "@/components/ui/chart";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Metrics</h1>
        <h2 className="text-2xl font-bold mb-4">Recruiter Usage Current Year vs Previous Year</h2>
        <Component />
        <ComponentPie />
    </div>
  );
}
