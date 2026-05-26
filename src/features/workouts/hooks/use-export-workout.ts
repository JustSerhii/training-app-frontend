import { useMutation } from "@tanstack/react-query";
import { workoutsApi } from "../api/workouts.api";
import { toast } from "sonner";

export function useExportWorkout() {
  return useMutation({
    mutationFn: (workoutId: string) => workoutsApi.exportWorkout(workoutId),

    onSuccess: (blob, workoutId) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `workout-${workoutId.slice(0, 8)}.pdf`;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Workout exported successfully");
    },

    onError: (error: Error) => {
      toast.error(`Failed to export: ${error.message}`);
    },
  });
}
