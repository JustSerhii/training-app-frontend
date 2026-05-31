import { useMutation } from "@tanstack/react-query";
import { workoutsApi } from "../api/workouts.api";
import { toast } from "sonner";
import { WorkoutIdsPayload } from "../api/workouts.types";

export function useExportSelectedWorkouts() {
  return useMutation({
    mutationFn: (payload: WorkoutIdsPayload) =>
      workoutsApi.exportSelectedWorkouts(payload),

    onSuccess: ({ blob, filename }) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success(`Exported: ${filename}`);
    },

    onError: (error: Error) => {
      toast.error(`Export failed: ${error.message}`);
    },
  });
}
