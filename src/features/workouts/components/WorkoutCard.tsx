"use client";

import { useRouter } from "next/navigation";
import { Workout } from "../api/workouts.types";

interface WorkoutCardProps {
  workout: Workout;
  isDeleting: boolean;
  onDelete: () => void;
  isSelected?: boolean;
  onSelect?: (id: string, checked: boolean) => void;
}

export function WorkoutCard({
  workout,
  isDeleting,
  onDelete,
  isSelected = false,
  onSelect,
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
        <div className="flex items-center gap-3 mb-2">
          {onSelect && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(workout.id, e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-primary rounded border-gray-300 focus:ring-primary"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <time className="workout-card__date">{date}</time>
        </div>

        <h3 className="workout-card__title">{workout.title}</h3>
        {workout.description && (
          <p className="workout-card__desc">{workout.description}</p>
        )}
      </div>
      <div className="workout-card__footer">
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
