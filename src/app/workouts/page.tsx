import { WorkoutsClient } from "@/features/workouts/components";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Workouts | Training App",
};

export default function WorkoutsPage() {
   return (
     <Suspense
       fallback={<div className="p-8 text-center">Loading workouts...</div>}
     >
       <WorkoutsClient />
     </Suspense>
   );
}
