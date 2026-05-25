"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { WorkoutExercise, SetType } from "../api/workouts.types";
import { useCreateSet, useDeleteSet } from "../hooks/sets-hooks";

interface ExerciseCardProps {
  workoutExercise: WorkoutExercise;
  index: number;
  isDeleting: boolean;
  isDragging?: boolean;
  isDragOver?: boolean;
  onDelete: () => void;
  onDragStart?: () => void;
  onDragOver?: () => void;
  onDrop?: () => void;
}

export function ExerciseCard({
  workoutExercise,
  index,
  isDeleting,
  isDragging = false,
  isDragOver = false,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}: ExerciseCardProps) {
  const { exercise, sets, description } = workoutExercise;
  const { workoutId } = useParams<{ workoutId: string }>();

  const createSet = useCreateSet(workoutId, workoutExercise.id);
  const deleteSet = useDeleteSet(workoutId, workoutExercise.id);

  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [setType, setSetType] = useState<SetType>(SetType.normal);

  const handleAddSet = () => {
    const repsNum = parseInt(reps);
    if (!reps || isNaN(repsNum) || repsNum < 1) return;

    createSet.mutate(
      {
        reps: repsNum,
        weight: weight ? parseFloat(weight) : undefined,
        type: setType,
      },
      {
        onSuccess: () => {
          setReps("");
          setWeight("");
        },
      },
    );
  };

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.effectAllowed = "move";
    onDragStart?.();
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    onDragOver?.();
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    onDrop?.();
  };

  return (
    <article
      className="exercise-card"
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={() => {}}
      onDrop={handleDrop}
      style={{
        opacity: isDragging ? 0.5 : 1,
        borderTop: isDragOver ? "3px solid #3b82f6" : "none",
        paddingTop: isDragOver ? "12px" : "0px",
        cursor: "grab",
      }}
    >
      <div className="exercise-card__header">
        <div className="exercise-card__header-left">
          <span className="exercise-card__index">{index + 1}</span>
          <div>
            <h3 className="exercise-card__title">{exercise.title}</h3>
            {exercise.muscleGroups.length > 0 && (
              <div className="exercise-card__muscles">
                {exercise.muscleGroups.map((mg) => (
                  <span
                    key={`${workoutExercise.id}-${mg}`}
                    className="exercise-card__muscle-tag"
                  >
                    {mg}
                  </span>
                ))}
              </div>
            )}
            {description && (
              <p className="exercise-card__desc">{description}</p>
            )}
          </div>
        </div>
        <button
          className="exercise-card__delete"
          onClick={onDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "..." : "Remove"}
        </button>
      </div>

      <div className="exercise-card__sets">
        {sets.length === 0 ? (
          <p className="exercise-card__no-sets">No sets yet</p>
        ) : (
          <table className="sets-table">
            <thead>
              <tr>
                <th className="sets-table__th">Set</th>
                <th className="sets-table__th">Weight</th>
                <th className="sets-table__th">Reps</th>
                <th className="sets-table__th">Type</th>
                <th className="sets-table__th"></th>
              </tr>
            </thead>
            <tbody>
              {sets.map((set, i) => (
                <tr key={set.id} className="sets-table__row">
                  <td className="sets-table__td sets-table__td--num">
                    {i + 1}
                  </td>
                  <td className="sets-table__td">
                    {set.plateWeight != null ? `${set.plateWeight} kg` : "—"}
                  </td>
                  <td className="sets-table__td">{set.reps}</td>
                  <td className="sets-table__td">
                    <span className="sets-table__type">{set.type}</span>
                  </td>
                  <td className="sets-table__td">
                    <button
                      className="sets-table__delete"
                      onClick={() => deleteSet.mutate(set.id)}
                      disabled={deleteSet.isPending}
                    >
                      {deleteSet.isPending ? "..." : "✕"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="sets-add">
          <input
            className="sets-add__input"
            type="number"
            min="0"
            step="0.5"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            className="sets-add__input"
            type="number"
            min="1"
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <select
            className="sets-add__input"
            value={setType}
            onChange={(e) => setSetType(e.target.value as SetType)}
          >
            <option value={SetType.normal}>Normal</option>
            <option value={SetType.warmup}>Warmup</option>
            <option value={SetType.failure}>Failure</option>
            <option value={SetType.dropset}>Dropset</option>
          </select>
          <button
            className="sets-add__btn"
            onClick={handleAddSet}
            disabled={createSet.isPending || !reps}
          >
            {createSet.isPending ? "..." : "+ Set"}
          </button>
        </div>
      </div>
    </article>
  );
}
