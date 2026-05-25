import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkoutTimerState {
  workoutId: string | null;
  startedAt: number | null;
  isActive: boolean;

  start: (workoutId: string) => void;
  finish: () => number;
  reset: () => void;
  getElapsed: () => number;
}

export const useWorkoutTimerStore = create<WorkoutTimerState>()(
  persist(
    (set, get) => ({
      workoutId: null,
      startedAt: null,
      isActive: false,

      start: (workoutId) =>
        set({
          workoutId,
          startedAt: Date.now(),
          isActive: true,
        }),

      finish: () => {
        const { startedAt } = get();
        const elapsed =
          startedAt !== null ? Math.floor((Date.now() - startedAt) / 1000) : 0;
        set({ workoutId: null, startedAt: null, isActive: false });
        return elapsed;
      },

      reset: () => set({ workoutId: null, startedAt: null, isActive: false }),

      getElapsed: () => {
        const { startedAt } = get();
        if (startedAt === null) return 0;
        return Math.floor((Date.now() - startedAt) / 1000);
      },
    }),
    {
      name: "workout-timer",
    },
  ),
);
