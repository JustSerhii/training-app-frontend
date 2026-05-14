import { PaginationParams } from "../api/workouts.types";

export const workoutsKeys = {
  all: ["workouts"] as const,
  list: (params: PaginationParams) => ["workouts", "list", params] as const,
  one: (workoutId: string) => ["workouts", workoutId] as const,
}; 
