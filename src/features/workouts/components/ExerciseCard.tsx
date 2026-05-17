import { WorkoutExercise } from "../api/workouts.types";

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

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer!.effectAllowed = "move";
    onDragStart?.();
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = "move";
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
                  <span key={`${workoutExercise.id}-${mg}`} className="exercise-card__muscle-tag">
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

      {/* Sets */}
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
              </tr>
            </thead>
            <tbody>
              {sets.map((set, i) => (
                <tr key={set.id} className="sets-table__row">
                  <td className="sets-table__td sets-table__td--num">
                    {i + 1}
                  </td>
                  <td className="sets-table__td">
                    {set.weight != null ? `${set.weight} kg` : "—"}
                  </td>
                  <td className="sets-table__td">{set.reps}</td>
                  <td className="sets-table__td">
                    <span className="sets-table__type">{set.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </article>
  );
}
