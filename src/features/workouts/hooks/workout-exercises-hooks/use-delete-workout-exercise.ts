import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { workoutExercisesApi } from "../../api/workout-exercises.api";
import { workoutExercisesKeys } from "./workout-exercises.keys";

export function useDeleteWorkoutExercise(workoutId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workoutExerciseId: string) =>
      workoutExercisesApi.deleteWorkoutExercise(workoutId, workoutExerciseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workoutExercisesKeys.all(workoutId),
      });
      toast.success("Exercise removed");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
