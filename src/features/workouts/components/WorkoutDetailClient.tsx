"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetFullWorkout } from "../hooks/use-get-full-workout";
import { useGetExercises } from "../hooks/use-get-exercises";
import {
  useCreateWorkoutExercise,
  useDeleteWorkoutExercise,
  useReorderWorkoutExercises,
} from "../hooks/workout-exercises-hooks";
import { ExerciseCard } from "./ExerciseCard";

interface WorkoutDetailClientProps {
  workoutId: string;
}

export function WorkoutDetailClient({ workoutId }: WorkoutDetailClientProps) {
  const router = useRouter();
  const { data: workout, isLoading } = useGetFullWorkout(workoutId);
  const { data: exercises = [], isLoading: exercisesLoading } =
    useGetExercises();
  const createExercise = useCreateWorkoutExercise(workoutId);
  const deleteExercise = useDeleteWorkoutExercise(workoutId);
  const reorderExercises = useReorderWorkoutExercises(workoutId);

  const [exerciseId, setExerciseId] = useState("");
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleAddExercise = () => {
    if (!exerciseId.trim()) return;
    createExercise.mutate(
      { exerciseId },
      { onSuccess: () => setExerciseId("") },
    );
  };

  const displayExercises = workout?.workoutExercises ?? [];

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (id: string) => {
    setDragOverId(id);
  };

  const handleDrop = (droppedOnId: string) => {
    if (!draggedId || draggedId === droppedOnId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    const reordered = [...displayExercises];
    const draggedIndex = reordered.findIndex((e) => e.id === draggedId);
    const droppedIndex = reordered.findIndex((e) => e.id === droppedOnId);

    [reordered[draggedIndex], reordered[droppedIndex]] = [
      reordered[droppedIndex],
      reordered[draggedIndex],
    ];

    setDraggedId(null);
    setDragOverId(null);

    reorderExercises.mutate(reordered.map((e) => e.id));
  };

  if (isLoading) {
    return (
      <div className="workout-detail-page">
        <div className="workout-detail__inner">
          <div className="workout-detail-skeleton">
            <div className="workout-detail-skeleton__title" />
            <div className="workout-detail-skeleton__sub" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="workout-detail-skeleton__card" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="workout-detail-page">
        <div className="workout-detail__inner">
          <div className="workout-detail-empty">
            <p className="workout-detail-empty__title">Workout not found</p>
            <button
              className="workout-detail-back"
              onClick={() => router.push("/workouts")}
            >
              ← Back to workouts
            </button>
          </div>
        </div>
      </div>
    );
  }

  const date = new Date(workout.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="workout-detail-page">
      <div className="workout-detail__inner">
        {/* Back */}
        <button
          className="workout-detail-back"
          onClick={() => router.push("/workouts")}
        >
          ← Back to workouts
        </button>

        {/* Header */}
        <div className="workout-detail-header">
          <div>
            <h1 className="workout-detail-header__title">{workout.title}</h1>
            <time className="workout-detail-header__date">{date}</time>
            {workout.description && (
              <p className="workout-detail-header__desc">
                {workout.description}
              </p>
            )}
          </div>
          <div className="workout-detail-header__badge">
            {workout.workoutExercises.length} exercises
          </div>
        </div>

        {/* Add exercise */}
        <div className="workout-detail-add">
          <p className="workout-detail-add__label">Add exercise</p>
          <div className="workout-detail-add__row">
            <select
              className="workout-detail-add__input"
              value={exerciseId}
              onChange={(e) => setExerciseId(e.target.value)}
              disabled={exercisesLoading}
            >
              <option value="">
                {exercisesLoading
                  ? "Loading exercises..."
                  : "Select an exercise"}
              </option>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.title}
                </option>
              ))}
            </select>
            <button
              className="workout-detail-add__btn"
              onClick={handleAddExercise}
              disabled={createExercise.isPending || !exerciseId.trim()}
            >
              {createExercise.isPending ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        {/* Exercises list */}
        {workout.workoutExercises.length === 0 ? (
          <div className="workout-detail-empty">
            <span className="workout-detail-empty__icon">💪</span>
            <p className="workout-detail-empty__title">No exercises yet</p>
            <p className="workout-detail-empty__sub">
              Add your first exercise to this workout
            </p>
          </div>
        ) : (
          <div className="workout-detail-exercises">
            {displayExercises.map((we, index) => (
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
    </div>
  );
}
