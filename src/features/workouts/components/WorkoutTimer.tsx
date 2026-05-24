"use client";

import { useWorkoutTimer } from "@/shared/hooks";


interface WorkoutTimerProps {
  savedDuration?: number | null;
}

export function WorkoutTimer({ savedDuration = null }: WorkoutTimerProps) {
  const { formattedTime, isActive } = useWorkoutTimer();

  const displayTime =
    savedDuration != null && savedDuration > 0
      ? formatDuration(savedDuration)
      : formattedTime;

  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 shadow-sm">
      <span className="text-xs text-muted-foreground uppercase tracking-wider">
        {savedDuration != null && savedDuration > 0
          ? "Duration"
          : isActive
            ? "In progress"
            : "Time"}
      </span>
      <div className="font-mono text-xl font-bold tracking-wider text-foreground min-w-[90px] text-center">
        {displayTime}
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
