import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workoutsApi } from "../api/workouts.api";
import { toast } from "sonner";
import { workoutsKeys } from "./workouts.keys";

export function useDeleteWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workoutId: string) => workoutsApi.deleteWorkout(workoutId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutsKeys.all });
      toast.success("Workout deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
