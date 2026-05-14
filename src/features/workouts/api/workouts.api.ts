import { apiClient } from "@/shared/api/client";
import {
  CreateWorkoutPayload,
  PaginatedResponse,
  PaginationParams,
  UpdateWorkoutPayload,
  Workout,
} from "./workouts.types";

export const workoutsApi = {
  getWorkouts: (
    params: PaginationParams,
  ): Promise<PaginatedResponse<Workout>> => {
    const query = new URLSearchParams({
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 10),
    });
    return apiClient.get(`/workouts?${query}`);
  },

  createWorkout: (payload: CreateWorkoutPayload): Promise<Workout> => {
    return apiClient.post("/workouts/", payload);
  },

  updateWorkout: (workoutId: string, payload: UpdateWorkoutPayload): Promise<Workout> => {
    return apiClient.patch(`/workouts/${workoutId}`, payload)
  },

  deleteWorkout: (workoutId: string): Promise<void> =>
    apiClient.delete(`/workouts/${workoutId}`),
};
