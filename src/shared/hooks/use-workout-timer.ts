import { useState, useEffect } from "react";
import { useWorkoutTimerStore } from "@/shared/store/workout-timer.store";

export function useWorkoutTimer() {
  const { isActive, startedAt, workoutId, start, finish, reset } =
    useWorkoutTimerStore();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isActive || !startedAt) return;

    setElapsed(Math.floor((Date.now() - startedAt) / 1000));

    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, startedAt]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0)
      return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return {
    isActive,
    workoutId,
    elapsed,
    formattedTime: formatTime(elapsed),
    start,
    finish,
    reset,
  };
}
