import { apiClient } from "@/shared/api/client";
import {
  CreateSetPayload,
  UpdateSetPayload,
  WorkoutSet,
} from "./workouts.types";

export const setsApi = {
  getSets: (
    workoutId: string,
    workoutExerciseId: string,
  ): Promise<WorkoutSet[]> => {
    return apiClient.get(
      `/workouts/${workoutId}/workout-exercises/${workoutExerciseId}/sets`,
    );
  },

  createSet: (
    workoutId: string,
    workoutExerciseId: string,
    payload: CreateSetPayload,
  ): Promise<WorkoutSet> =>
    apiClient.post(
      `/workouts/${workoutId}/workout-exercises/${workoutExerciseId}/sets`,
      payload,
    ),

  deleteSet: (
    workoutId: string,
    workoutExerciseId: string,
    setId: string,
  ): Promise<void> =>
    apiClient.delete(
      `/workouts/${workoutId}/workout-exercises/${workoutExerciseId}/sets/${setId}`,
    ),

  reorderSets: (
    workoutId: string,
    workoutExerciseId: string,
    setsIds: string[],
  ): Promise<WorkoutSet[]> =>
    apiClient.patch(
      `/workouts/${workoutId}/workout-exercises/${workoutExerciseId}/sets/reorder`,
      {setsIds: setsIds},
    ),

  updateSet: (
    workoutId: string,
    workoutExerciseId: string,
    setId: string,
    payload: UpdateSetPayload,
  ): Promise<WorkoutSet> =>
    apiClient.patch(
      `/workouts/${workoutId}/workout-exercises/${workoutExerciseId}/sets/${setId}`,
      payload,
    ),
};
