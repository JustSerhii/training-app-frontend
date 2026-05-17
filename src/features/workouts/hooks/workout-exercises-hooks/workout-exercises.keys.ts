export const workoutExercisesKeys = {
  all: (workoutId: string) => ["workout-exercises", workoutId] as const,
  full: (workoutId: string) =>
    ["workout-exercises", workoutId, "full"] as const,
};
