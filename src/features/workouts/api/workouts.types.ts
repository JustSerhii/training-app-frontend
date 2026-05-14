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
