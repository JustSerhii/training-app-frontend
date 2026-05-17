import { apiClient } from "@/shared/api/client";
import {
  CreateWorkoutExercisePayload,
  CursorPaginatedResponse,
  FullWorkout,
  WorkoutExercise,
} from "./workouts.types";

export const workoutExercisesApi = {
  getFullWorkout: (workoutId: string): Promise<FullWorkout> =>
    apiClient.get(`/workouts/${workoutId}/full`),

  getWorkoutExercises: (
    workoutId: string,
    params: { afterCursor?: string; limit?: number } = {},
  ): Promise<CursorPaginatedResponse<WorkoutExercise>> => {
    const query = new URLSearchParams();
    if (params.afterCursor) query.set("afterCursor", params.afterCursor);
    if (params.limit) query.set("limit", String(params.limit));
    return apiClient.get(`/workouts/${workoutId}/workout-exercises?${query}`);
  },

  createWorkoutExercise: (
    workoutId: string,
    payload: CreateWorkoutExercisePayload,
  ): Promise<WorkoutExercise> =>
    apiClient.post(`/workouts/${workoutId}/workout-exercises`, payload),

  deleteWorkoutExercise: (
    workoutId: string,
    workoutExerciseId: string,
  ): Promise<void> =>
    apiClient.delete(
      `/workouts/${workoutId}/workout-exercises/${workoutExerciseId}`,
    ),

  reorderWorkoutExercises: (
    workoutId: string,
    workoutExercisesIds: string[],
  ): Promise<WorkoutExercise[]> =>
    apiClient.patch(`/workouts/${workoutId}/workout-exercises/reorder`, {
      workoutExercisesIds,
    }),
};
