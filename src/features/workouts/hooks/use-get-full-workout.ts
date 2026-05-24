import { useQuery } from "@tanstack/react-query";
import { workoutExercisesApi } from "../api/workout-exercises.api";
import { workoutExercisesKeys } from "./workout-exercises-hooks";

export function useGetFullWorkout(workoutId: string) {
  return useQuery({
    queryKey: workoutExercisesKeys.full(workoutId),
    queryFn: () => workoutExercisesApi.getFullWorkout(workoutId),
    enabled: !!workoutId,
    staleTime: 1000 * 60 * 2,
  });
}
