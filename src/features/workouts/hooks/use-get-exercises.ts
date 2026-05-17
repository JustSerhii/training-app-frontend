import { useQuery } from "@tanstack/react-query";
import { exercisesApi } from "../api/exercises.api";

export function useGetExercises() {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: () => exercisesApi.getMany(),
    staleTime: 1000 * 60 * 5,
  });
}
