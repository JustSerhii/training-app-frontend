export interface Workout {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

export interface PaginationMeta {
  currentPage: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  nextPage?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface CreateWorkoutPayload {
  title: string;
  description?: string;
}

export interface UpdateWorkoutPayload {
  title?: string;
  description?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface GetWorkoutsParams extends PaginationParams {
  search?: string;
}

export interface Exercise {
  id: string;
  title: string;
  muscleGroups: string[];
}

export interface WorkoutSet {
  id: string;
  weight: number | null;
  order: number;
  reps: number;
  type: string;
  workoutExerciseId: string;
}

export interface WorkoutExercise {
  id: string;
  description: string | null;
  workoutId: string;
  order: number;
  exercise: Exercise;
  sets: WorkoutSet[];
}

export interface FullWorkout {
  id: string;
  title: string;
  description?: string | null;
  createdAt: string;
  workoutExercises: WorkoutExercise[];
}

export interface CreateWorkoutExercisePayload {
  exerciseId: string;
  description?: string;
}

export interface CursorPaginatedResponse<T> {
  data: T[];
  lastId: string | null;
  total: number;
  hasNextPage: boolean;
}

export interface CreateSetPayload {
  weight?: number;
  reps: number;
  type?: SetType;
}

export interface UpdateSetPayload {
  weight?: number;
  reps?: number;
  type?: SetType;
}

export enum SetType {
  warmup = "warmup",
  failure = "failure",
  dropset = "dropset",
  normal = "normal",
}
