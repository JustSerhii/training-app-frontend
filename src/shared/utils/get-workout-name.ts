export function getTimeBasedWorkoutName(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Morning Workout";
  if (hour >= 12 && hour < 17) return "Afternoon Workout";
  if (hour >= 17 && hour < 21) return "Evening Workout";
  return "Night Workout";
}
