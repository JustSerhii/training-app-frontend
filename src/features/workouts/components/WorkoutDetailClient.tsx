"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetFullWorkout } from "../hooks/use-get-full-workout";
import { useGetExercises } from "../hooks/use-get-exercises";
import { useUpdateWorkout } from "@/features/workouts/hooks/use-update-workout";
import {
  useCreateWorkoutExercise,
  useDeleteWorkoutExercise,
  useReorderWorkoutExercises,
} from "../hooks/workout-exercises-hooks";
import { ExerciseCard } from "./ExerciseCard";
import { useWorkoutTimerStore } from "@/shared/store/workout-timer.store";
import { toast } from "sonner";
import { WorkoutTimer } from "./WorkoutTimer";

interface WorkoutDetailClientProps {
  workoutId: string;
}

export function WorkoutDetailClient({ workoutId }: WorkoutDetailClientProps) {
  const router = useRouter();
  const { data: workout, isLoading } = useGetFullWorkout(workoutId);
  const { data: exercises = [], isLoading: exercisesLoading } = useGetExercises();
  const updateWorkout = useUpdateWorkout();

  useEffect(() => {
    if (workout?.id) {
      if (workout.duration && workout.duration > 0) {
        useWorkoutTimerStore.getState().reset();
      } else {
        const { workoutId: storedId, isActive } =
          useWorkoutTimerStore.getState();
        if (!storedId && !isActive) {
          useWorkoutTimerStore.setState({ workoutId: workout.id });
        }
      }
    }
  }, [workout?.id]);

  const handleFinishWorkout = (durationSeconds: number) => {
    if (!workout) return;

    updateWorkout.mutate(
      { workoutId: workout.id, payload: { duration: durationSeconds } },
      {
        onSuccess: () => {
          toast.success(
            `Workout finished: ${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s`,
          );
        },
      },
    );
  };


  const createExercise = useCreateWorkoutExercise(workoutId);
  const deleteExercise = useDeleteWorkoutExercise(workoutId);
  const reorderExercises = useReorderWorkoutExercises(workoutId);

  const [exerciseId, setExerciseId] = useState("");
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // Inline Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const isFinished = workout?.duration != null && workout.duration > 0;


  const handleAddExercise = () => {
    if (!exerciseId.trim()) return;
    createExercise.mutate(
      { exerciseId },
      { onSuccess: () => setExerciseId("") },
    );
  };

  const handleDragStart = (id: string) => setDraggedId(id);
  const handleDragOver = (id: string) => setDragOverId(id);
  const handleDrop = (droppedOnId: string) => {
    if (!draggedId || draggedId === droppedOnId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }
    const reordered = [...(workout?.workoutExercises ?? [])];
    const draggedIndex = reordered.findIndex((e) => e.id === draggedId);
    const droppedIndex = reordered.findIndex((e) => e.id === droppedOnId);
    [reordered[draggedIndex], reordered[droppedIndex]] = [reordered[droppedIndex], reordered[draggedIndex]];
    setDraggedId(null);
    setDragOverId(null);
    reorderExercises.mutate(reordered.map((e) => e.id));
  };

  

  const startEditing = () => {
    if (workout) {
      setEditTitle(workout.title);
      setEditDesc(workout.description || "");
      setIsEditing(true);
    }
  };

  const saveEdit = () => {
    if (workout && (editTitle !== workout.title || editDesc !== workout.description)) {
      updateWorkout.mutate({
        workoutId: workout.id,
        payload: { title: editTitle, description: editDesc },
      }, {
        onSuccess: () => setIsEditing(false)
      });
    } else {
      setIsEditing(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 max-w-4xl mx-auto"><div className="h-12 w-64 bg-muted rounded animate-pulse mb-4" /></div>;
  }

  if (!workout) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <p className="text-xl font-bold mb-4">Workout not found</p>
        <button onClick={() => router.push("/workouts")} className="text-primary hover:underline">← Back to workouts</button>
      </div>
    );
  }

  
  const date = new Date(workout.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <button
        onClick={() => router.push("/workouts")}
        className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1"
      >
        ← Back to workouts
      </button>

      {/* Header with Inline Edit */}
      <div className="mb-8">
        {isEditing ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full text-3xl md:text-4xl font-bold bg-transparent border-b-2 border-primary focus:outline-none pb-2"
              autoFocus
            />
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Add description..."
              className="w-full text-muted-foreground bg-transparent border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                disabled={updateWorkout.isPending}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
              >
                {updateWorkout.isPending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded-lg hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div
                className="cursor-pointer group flex-1"
                onClick={startEditing}
              >
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {workout.title}
                </h1>
                <time className="block text-muted-foreground mt-2 text-sm font-medium">
                  {date}
                </time>
              </div>

              {!isFinished && (
                <button
                  onClick={() => {
                    const elapsed = useWorkoutTimerStore.getState().finish();
                    handleFinishWorkout(elapsed);
                  }}
                  disabled={updateWorkout.isPending}
                  className="px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
                >
                  {updateWorkout.isPending ? "Finishing..." : "Finish Workout"}
                </button>
              )}

              {isFinished && (
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-xl font-semibold text-sm border border-primary/20 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Completed
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <WorkoutTimer
                savedDuration={isFinished ? workout.duration : undefined}
              />

              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                {workout.workoutExercises.length} exercises
              </div>
            </div>

            {workout.description && (
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {workout.description}
              </p>
            )}
            {!workout.description && !isFinished && (
              <p
                className="text-muted-foreground/50 mt-2 text-sm italic cursor-pointer hover:text-muted-foreground transition-colors"
                onClick={startEditing}
              >
                Click to add description
              </p>
            )}
          </div>
        )}
      </div>
      {/* Add exercise */}
      <div className="rounded-xl border border-border bg-card p-4 mb-8 shadow-sm">
        <p className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
          Add exercise
        </p>
        <div className="flex gap-3">
          <select
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={exerciseId}
            onChange={(e) => setExerciseId(e.target.value)}
            disabled={exercisesLoading}
          >
            <option value="">
              {exercisesLoading ? "Loading..." : "Select an exercise"}
            </option>
            {exercises.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.title}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddExercise}
            disabled={createExercise.isPending || !exerciseId}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>

      {/* List */}
      {workout.workoutExercises.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
          <span className="text-4xl block mb-3">💪</span>
          <p className="font-semibold text-lg">No exercises yet</p>
          <p className="text-muted-foreground text-sm">
            Add your first exercise to start training
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {(workout.workoutExercises ?? []).map((we, index) => (
            <ExerciseCard
              key={we.id}
              workoutExercise={we}
              index={index}
              isDeleting={deleteExercise.isPending}
              isDragging={draggedId === we.id}
              isDragOver={dragOverId === we.id}
              onDelete={() => deleteExercise.mutate(we.id)}
              onDragStart={() => handleDragStart(we.id)}
              onDragOver={() => handleDragOver(we.id)}
              onDrop={() => handleDrop(we.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}