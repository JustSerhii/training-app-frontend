import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSetPayload } from "../../api/workouts.types";
import { setsApi } from "../../api/sets.api";
import { setsKeys } from "./setsKeys";
import { toast } from "sonner";
import { workoutExercisesKeys } from "../workout-exercises-hooks/workout-exercises.keys";

export function useCreateSet(workoutId: string, workoutExerciseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSetPayload) =>
      setsApi.createSet(workoutId, workoutExerciseId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: setsKeys.all(workoutId, workoutExerciseId),
      });
      queryClient.invalidateQueries({
        queryKey: workoutExercisesKeys.full(workoutId),
      });
      queryClient.invalidateQueries({
        queryKey: ["stats", "volume-history"],
        exact: false,
      });
      toast.success("Set added");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
