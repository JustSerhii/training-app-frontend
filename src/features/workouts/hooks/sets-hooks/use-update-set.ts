import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateSetPayload } from "../../api/workouts.types";
import { setsApi } from "../../api/sets.api";
import { setsKeys } from "./setsKeys";
import { toast } from "sonner";

export function useUpdateSet(workoutId: string, workoutExerciseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      setId,
      payload,
    }: {
      setId: string;
      payload: UpdateSetPayload;
    }) => setsApi.updateSet(workoutId, workoutExerciseId, setId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: setsKeys.all(workoutId, workoutExerciseId),
      });
      toast.success("Set updated");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
