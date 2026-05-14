import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateWorkoutPayload } from "../api/workouts.types";
import { workoutsApi } from "../api/workouts.api";
import { toast } from "sonner";
import { workoutsKeys } from "./workouts.keys";

export function useCreateWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWorkoutPayload) =>
      workoutsApi.createWorkout(payload),
    onSuccess: (newWorkout) => {
      queryClient.invalidateQueries({
        queryKey: workoutsKeys.all,
      });
      toast.success(`Workout ${newWorkout.title} created!`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
