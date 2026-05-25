import { useQuery } from "@tanstack/react-query";
import { statsApi } from "../api/stats.api";

export function useGetExerciseVolumeHistory(exerciseId: string | null) {
  return useQuery({
    queryKey: ["stats", "volume-history", exerciseId],
    queryFn: async () => {
      return statsApi.getExerciseVolumeHistory(exerciseId!, 20);
    },
    enabled: !!exerciseId,

    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}
