import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { workoutExercisesApi } from "../../api/workout-exercises.api";
import { workoutExercisesKeys } from "./workout-exercises.keys";
import { FullWorkout, WorkoutExercise } from "../../api/workouts.types";

export function useReorderWorkoutExercises(workoutId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workoutExercisesIds: string[]) =>
      workoutExercisesApi.reorderWorkoutExercises(
        workoutId,
        workoutExercisesIds,
      ),

    //optimistic loading realization
    onMutate: async (workoutExercisesIds) => {
      await queryClient.cancelQueries({
        queryKey: workoutExercisesKeys.full(workoutId),
      });

      const previous = queryClient.getQueryData<FullWorkout>(
        workoutExercisesKeys.full(workoutId),
      );

      if (previous) {
        const reordered = workoutExercisesIds
          .map((id) => previous.workoutExercises.find((e) => e.id === id))
          .filter(Boolean) as WorkoutExercise[];

        queryClient.setQueryData(workoutExercisesKeys.full(workoutId), {
          ...previous,
          workoutExercises: reordered,
        });
      }

      return { previous };
    },

    onSuccess: (reorderedExercises) => {
      queryClient.setQueryData(
        workoutExercisesKeys.full(workoutId),
        (old: FullWorkout | undefined) => {
          if (!old) return old;
          return { ...old, workoutExercises: reorderedExercises };
        },
      );
    },

    //roll back if response is not ok
    onError: (error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          workoutExercisesKeys.full(workoutId),
          context.previous,
        );
      }
      toast.error(error.message);
    },
  });
}