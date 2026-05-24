"use client";

import { useState } from "react";
import Link from "next/link";
import { useGetExercises } from "@/features/workouts/hooks/use-get-exercises";
import { useGetExerciseVolumeHistory } from "../hooks/use-get-exercise-volume-history";

export function StatsClient() {
  const { data: exercises, isLoading: exercisesLoading } = useGetExercises();
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    null,
  );
  const { data: history, isLoading: historyLoading } =
    useGetExerciseVolumeHistory(selectedExerciseId);

  const selectedExercise = exercises?.find((e) => e.id === selectedExerciseId);
  const maxVolume =
    history && history.length > 0
      ? Math.max(...history.map((h) => h.volume))
      : 0;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  const formatNumber = (num: number) => num.toLocaleString();

  if (exercisesLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground animate-pulse">
        Loading exercises...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Statistics</h1>
        <p className="text-muted-foreground mt-2">
          Track your volume progression over time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-4 sticky top-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Exercises
            </h2>
            <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
              {exercises?.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => setSelectedExerciseId(exercise.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedExerciseId === exercise.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  {exercise.title}
                </button>
              ))}
              {(!exercises || exercises.length === 0) && (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No exercises available
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!selectedExerciseId ? (
            <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-border rounded-2xl bg-muted/20">
              <span className="text-5xl mb-4">📊</span>
              <h3 className="text-xl font-bold">Select an exercise</h3>
              <p className="text-muted-foreground mt-2 text-center max-w-md">
                Choose an exercise from the list to view your volume history
              </p>
            </div>
          ) : historyLoading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !history || history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-border rounded-2xl bg-muted/20">
              <span className="text-5xl mb-4">📉</span>
              <h3 className="text-xl font-bold">No data yet</h3>
              <p className="text-muted-foreground mt-2 text-center max-w-md">
                Complete workouts with {selectedExercise?.title} to see
                progression here
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedExercise?.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Volume per workout (kg)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Latest</p>
                    <p className="text-3xl font-bold text-primary">
                      {formatNumber(history[history.length - 1].volume)} kg
                    </p>
                  </div>
                </div>

                <div className="h-64 flex items-end gap-2 w-full">
                  {history.map((item, index) => {
                    const heightPercent =
                      maxVolume > 0
                        ? Math.max(8, (item.volume / maxVolume) * 100)
                        : 8;
                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center gap-2 group h-full"
                      >
                        <div className="relative w-full h-full flex items-end">
                          <div className="absolute -top-10 bg-card border border-border px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg">
                            {formatNumber(item.volume)} kg
                          </div>
                          <div
                            className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-md transition-colors cursor-pointer"
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="grid grid-cols-3 bg-muted/50 px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <span>Date</span>
                  <span className="text-center">Volume</span>
                  <span className="text-right">Workout</span>
                </div>
                <div className="divide-y divide-border">
                  {[...history].reverse().map((item) => (
                    <div
                      key={item.workoutId}
                      className="grid grid-cols-3 px-4 py-3 text-sm hover:bg-muted/30 transition-colors items-center"
                    >
                      <span className="text-foreground">
                        {formatDate(item.createdAt)}
                      </span>
                      <span className="text-center font-medium text-primary">
                        {formatNumber(item.volume)} kg
                      </span>
                      <Link
                        href={`/workouts/${item.workoutId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-right text-primary hover:underline truncate block"
                      >
                        {item.workoutId.slice(0, 20)}...
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
