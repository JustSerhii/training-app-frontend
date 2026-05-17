import { apiClient } from "@/shared/api/client";

export interface ExerciseOption {
  id: string;
  title: string;
  muscleGroups: { id: string; name: string }[];
}

export const exercisesApi = {
  getMany: (): Promise<ExerciseOption[]> =>
    apiClient.get("/exercises"),
};
