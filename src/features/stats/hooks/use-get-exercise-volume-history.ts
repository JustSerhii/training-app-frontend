import { useQuery } from "@tanstack/react-query";
import { statsApi } from "../api/stats.api";

export function useGetExerciseVolumeHistory(exerciseId: string | null) {
  return useQuery({
    queryKey: ["stats", "volume-history", exerciseId],
    queryFn: () => statsApi.getExerciseVolumeHistory(exerciseId!, 20),
    enabled: !!exerciseId,
    refetchOnWindowFocus: false,
  });
}
