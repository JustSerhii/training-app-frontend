import { apiClient } from "@/shared/api/client";
import { ExerciseVolume } from "./stats.types";

export const statsApi = {
  getExerciseVolumeHistory: (
    exerciseId: string,
    limit = 20,
  ): Promise<ExerciseVolume[]> =>
    apiClient.get(
      `/exercise-sessions/exercises/${exerciseId}/history?limit=${limit}`,
    ),
};
