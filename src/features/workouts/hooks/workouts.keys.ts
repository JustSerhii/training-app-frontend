import { GetWorkoutsParams } from "../api/workouts.types";

export const workoutsKeys = {
  all: ["workouts"] as const,
  list: (params: GetWorkoutsParams) =>
    ["workouts", "list", JSON.stringify(params)] as const,
  one: (workoutId: string) => ["workouts", workoutId] as const,
}; 
