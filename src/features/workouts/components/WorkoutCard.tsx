"use client";

import { useRouter } from "next/navigation";
import { Workout } from "../api/workouts.types";

interface WorkoutCardProps {
  workout: Workout;
  isDeleting: boolean;
  onEdit: () => void; 
  onDelete: () => void;
}

export function WorkoutCard({
  workout,
  isDeleting,
  onEdit,
  onDelete,
}: WorkoutCardProps) {
  const router = useRouter();

  const date = new Date(workout.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="workout-card">
      <div className="workout-card__body">
        <time className="workout-card__date">{date}</time>
        <h3 className="workout-card__title">{workout.title}</h3>
        {workout.description && (
          <p className="workout-card__desc">{workout.description}</p>
        )}
      </div>
      <div className="workout-card__footer">
        <button
          className="workout-card__btn"
          onClick={onEdit} 
        >
          Edit
        </button>

        <button
          className="workout-card__btn"
          onClick={() => router.push(`/workouts/${workout.id}`)}
        >
          View
        </button>
        <button
          className="workout-card__btn workout-card__btn--danger"
          onClick={onDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "..." : "Delete"}
        </button>
      </div>
    </article>
  );
}
