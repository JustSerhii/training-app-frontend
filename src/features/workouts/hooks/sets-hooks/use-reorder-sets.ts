import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setsApi } from "../../api/sets.api";
import { setsKeys } from "./setsKeys";
import { toast } from "sonner";

export function useReorderSets(workoutId: string, workoutExerciseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: string[]) =>
      setsApi.reorderSets(workoutId, workoutExerciseId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: setsKeys.all(workoutId, workoutExerciseId),
      });
      toast.success("Sets reordered");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
