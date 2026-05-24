import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateWorkoutPayload } from "../api/workouts.types";
import { workoutsApi } from "../api/workouts.api";
import { toast } from "sonner";
import { workoutsKeys } from "./workouts.keys";
import { workoutExercisesKeys } from "./workout-exercises-hooks";

export function useUpdateWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workoutId,
      payload,
    }: {
      workoutId: string;
      payload: UpdateWorkoutPayload;
    }) => workoutsApi.updateWorkout(workoutId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: workoutsKeys.all });
      queryClient.invalidateQueries({
        queryKey: workoutsKeys.one(variables.workoutId),
      });
      queryClient.invalidateQueries({
        queryKey: workoutExercisesKeys.full(variables.workoutId),
      });

      toast.success("Workout updated");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
