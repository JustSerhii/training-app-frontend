import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setsApi } from "../../api/sets.api";
import { setsKeys } from "./setsKeys";
import { toast } from "sonner";
import { workoutExercisesKeys } from "../workout-exercises-hooks";

export function useDeleteSet(workoutId: string, workoutExerciseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (setId: string) =>
      setsApi.deleteSet(workoutId, workoutExerciseId, setId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: setsKeys.all(workoutId, workoutExerciseId),
      });
      queryClient.invalidateQueries({
        queryKey: workoutExercisesKeys.full(workoutId),
      });
      toast.success("Set deleted");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
