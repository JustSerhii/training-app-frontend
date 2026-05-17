"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useGetWorkouts } from "@/features/workouts/hooks/use-get-workouts";
import { useCreateWorkout } from "@/features/workouts/hooks/use-create-workout";
import { useUpdateWorkout } from "@/features/workouts/hooks/use-update-workout";
import { useDeleteWorkout } from "@/features/workouts/hooks/use-delete-workout";
import { WorkoutCard, WorkoutForm } from ".";
import { EditModal } from "./EditModal";

export function WorkoutsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 9);
  const editId = searchParams.get("edit"); // modal state management via URL

  const { data, isLoading } = useGetWorkouts({ page, limit });
  const createWorkout = useCreateWorkout();
  const updateWorkout = useUpdateWorkout();
  const deleteWorkout = useDeleteWorkout();

  const workouts = data?.data ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;
  const editingWorkout = workouts.find((w) => w.id === editId);

  const openEdit = (workoutId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("edit", workoutId);
    router.push(`/workouts?${params.toString()}`);
  };

  const closeEdit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("edit");
    router.push(`/workouts?${params.toString()}`);
  };

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    params.delete("edit");
    router.push(`/workouts?${params.toString()}`);
  };

  const handleSubmit = (values: { title: string; description?: string }) => {
    createWorkout.mutate(values);
  };

  return (
    <div className="workouts-page">
      <div className="workouts-page__inner">
        <div className="workouts-header">
          <div>
            <h1 className="workouts-header__title">My Workouts</h1>
            <p className="workouts-header__sub">
              Track and manage your training sessions
            </p>
          </div>
          {data && (
            <span className="workouts-header__count">
              {data.pagination.totalRecords} total
            </span>
          )}
        </div>

        <div className="workouts-layout">
          <aside className="workouts-sidebar">
            <div className="workouts-sidebar__sticky">
              <p className="workouts-sidebar__label">New workout</p>
              <WorkoutForm
                isPending={createWorkout.isPending}
                onSubmit={handleSubmit}
              />
            </div>
          </aside>

          <main className="workouts-main">
            {isLoading ? (
              <div className="workouts-skeleton">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="workouts-skeleton__card" />
                ))}
              </div>
            ) : workouts.length === 0 ? (
              <div className="workouts-empty">
                <span className="workouts-empty__icon">🏋️</span>
                <p className="workouts-empty__title">No workouts yet</p>
                <p className="workouts-empty__sub">
                  Create your first workout to get started
                </p>
              </div>
            ) : (
              <div className="workouts-grid">
                {workouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    isDeleting={deleteWorkout.isPending}
                    onEdit={() => openEdit(workout.id)}
                    onDelete={() =>
                      deleteWorkout.mutate(workout.id, {
                        onSuccess: () => {
                          if (workouts.length === 1 && page > 1) {
                            goToPage(page - 1);
                          }
                        },
                      })
                    }
                  />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="workouts-pagination">
                <button
                  className="workouts-pagination__btn"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                >
                  ← Prev
                </button>
                <div className="workouts-pagination__pages">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`workouts-pagination__page ${
                        page === i + 1
                          ? "workouts-pagination__page--active"
                          : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  className="workouts-pagination__btn"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Edit modal — opens when there is ?edit= в URL */}
      <EditModal isOpen={!!editId} onClose={closeEdit}>
        <h2 className="text-xl font-bold mb-4">Edit Workout</h2>
        <WorkoutForm
          key={editId ?? "edit"}
          defaultValues={editingWorkout}
          isPending={updateWorkout.isPending}
          onSubmit={(values) => {
            if (!editId) return;
            updateWorkout.mutate(
              { workoutId: editId, payload: values },
              { onSuccess: closeEdit },
            );
          }}
          onCancel={closeEdit}
        />
      </EditModal>
    </div>
  );
}
