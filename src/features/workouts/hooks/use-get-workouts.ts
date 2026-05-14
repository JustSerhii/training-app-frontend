import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "../api/workouts.types";
import { workoutsApi } from "../api/workouts.api";
import { workoutsKeys } from "./workouts.keys";

export function useGetWorkouts(params: PaginationParams = {}) {
  return useQuery({
    queryKey: workoutsKeys.list(params),
    queryFn: () => workoutsApi.getWorkouts(params),
    staleTime: 1000 * 60 * 2,
  });
}
