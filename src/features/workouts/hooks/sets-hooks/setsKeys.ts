export const setsKeys = {
  all: (workoutId: string, workoutExerciseId: string) =>
    ["sets", workoutId, workoutExerciseId] as const,
};
