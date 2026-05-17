import { WorkoutsClient } from "@/features/workouts/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workouts | Training App",
};

export default function WorkoutsPage() {
  return <WorkoutsClient />;
}
