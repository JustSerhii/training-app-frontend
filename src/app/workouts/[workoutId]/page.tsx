import type { Metadata } from "next";
import { WorkoutDetailClient } from "@/features/workouts/components";

export const metadata: Metadata = {
  title: "Workout | Training App",
};

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  const { workoutId } = await params;
  return <WorkoutDetailClient workoutId={workoutId} />;
}
