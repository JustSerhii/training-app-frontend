import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { workoutExercisesKeys } from "./workout-exercises.keys";
import { CreateWorkoutExercisePayload } from "../../api/workouts.types";
import { workoutExercisesApi } from "../../api/workout-exercises.api";

export function useCreateWorkoutExercise(workoutId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWorkoutExercisePayload) =>
      workoutExercisesApi.createWorkoutExercise(workoutId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workoutExercisesKeys.all(workoutId),
      });
      toast.success("Exercise added");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
