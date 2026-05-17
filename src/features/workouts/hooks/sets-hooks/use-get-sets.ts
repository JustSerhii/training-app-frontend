import { useQuery } from "@tanstack/react-query";
import { setsApi } from "../../api/sets.api";
import { setsKeys } from "./setsKeys";

export function useGetSets(workoutId: string, workoutExerciseId: string) {
  return useQuery({
    queryKey: setsKeys.all(workoutId, workoutExerciseId),
    queryFn: () => setsApi.getSets(workoutId, workoutExerciseId),
    staleTime: 1000 * 60 * 2,
  });
}
