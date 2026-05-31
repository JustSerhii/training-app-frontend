import { apiClient, getAccessToken } from "@/shared/api/client";
import {
  CreateWorkoutPayload,
  PaginatedResponse,
  GetWorkoutsParams,
  UpdateWorkoutPayload,
  Workout,
  WorkoutIdsPayload,
} from "./workouts.types";

export const workoutsApi = {
  getWorkouts: (
    params: GetWorkoutsParams,
  ): Promise<PaginatedResponse<Workout>> => {
    const query = new URLSearchParams({
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 10),
    });
    if (params.search?.trim()) {
      query.set("search", params.search.trim());
    }
    return apiClient.get(`/workouts?${query}`);
  },

  createWorkout: (payload: CreateWorkoutPayload): Promise<Workout> => {
    return apiClient.post("/workouts/", payload);
  },

  updateWorkout: (
    workoutId: string,
    payload: UpdateWorkoutPayload,
  ): Promise<Workout> => {
    return apiClient.patch(`/workouts/${workoutId}`, payload);
  },

  deleteWorkout: (workoutId: string): Promise<void> =>
    apiClient.delete(`/workouts/${workoutId}`),

  exportWorkout: async (workoutId: string): Promise<Blob> => {
    const token = getAccessToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/workouts/${workoutId}/export`,
      {
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
        credentials: "include",
      },
    );

    if (!res.ok) throw new Error("Export failed");

    return res.blob();
  },

  exportSelectedWorkouts: async (
    payload: WorkoutIdsPayload,
  ): Promise<{ blob: Blob; filename: string }> => {
    const token = getAccessToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/workouts/export/bulk`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      },
    );

    if (!res.ok) throw new Error("Bulk export failed");

    const disposition = res.headers.get("content-disposition");
    let filename = `workouts-export-${Date.now()}.pdf`;
    if (disposition) {
      const match = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/);
      if (match && match[1]) filename = decodeURIComponent(match[1]);
    }

    return { blob: await res.blob(), filename };
  },
};
