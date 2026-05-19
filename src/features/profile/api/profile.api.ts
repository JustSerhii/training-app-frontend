import { apiClient } from "@/shared/api/client";
import { ExerciseRecord, Profile } from "./profile.types";

export const profileApi = {
  getProfile: (): Promise<Profile> => apiClient.get(`/users/me`),

  getAllRecords: (): Promise<ExerciseRecord[]> =>
    apiClient.get("/exercise-records"),
};
