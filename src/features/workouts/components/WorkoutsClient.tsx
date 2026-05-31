"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetWorkouts } from "@/features/workouts/hooks/use-get-workouts";
import { useCreateWorkout } from "@/features/workouts/hooks/use-create-workout";
import { useDeleteWorkout } from "@/features/workouts/hooks/use-delete-workout";
import { useExportSelectedWorkouts } from "@/features/workouts/hooks/use-export-selected-workouts";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { getTimeBasedWorkoutName } from "@/shared/utils/get-workout-name";
import { WorkoutCard } from ".";
import { useWorkoutTimerStore } from "@/shared/store/workout-timer.store";
import { toast } from "sonner";

export function WorkoutsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 9);

  const searchFromUrl = searchParams.get("search") ?? "";
  const [searchInput, setSearchInput] = useState(searchFromUrl);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
      params.set("page", "1");
    } else {
      params.delete("search");
    }
    router.push(`/workouts?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const { data, isLoading } = useGetWorkouts({
    page,
    limit,
    search: debouncedSearch.trim() || undefined,
  });

  const createWorkout = useCreateWorkout();
  const deleteWorkout = useDeleteWorkout();
  const exportBulk = useExportSelectedWorkouts(); 

  const workouts = data?.data ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/workouts?${params.toString()}`);
  };

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleExport = () => {
    if (selectedIds.size === 0) return;
    exportBulk.mutate(
      { workoutIds: Array.from(selectedIds) },
      {
        onSuccess: () => {
          setSelectedIds(new Set());
          toast.success("PDF downloaded successfully");
        },
      },
    );
  };

  const handleCreateWorkout = () => {
    const title = getTimeBasedWorkoutName();
    createWorkout.mutate(
      { title },
      {
        onSuccess: (newWorkout) => {
          useWorkoutTimerStore.getState().start(newWorkout.id);
          router.push(`/workouts/${newWorkout.id}`);
        },
      },
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">My Workouts</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your training sessions
          </p>
        </div>
        <div className="flex items-center gap-4">
          {data && (
            <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {data.pagination.totalRecords} total
            </span>
          )}
          <button
            onClick={handleCreateWorkout}
            disabled={createWorkout.isPending}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            <span>
              {createWorkout.isPending ? "Creating..." : "+ New Workout"}
            </span>
          </button>
        </div>
      </div>

      <div className="relative mb-8">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder="Search workouts..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        {searchInput && (
          <button
            onClick={() => setSearchInput("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
          >
            ✕
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : workouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border rounded-2xl">
          <span className="text-5xl mb-4">🏋️</span>
          <h3 className="text-xl font-bold">No workouts yet</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Create your first workout to get started
          </p>
          <button
            onClick={handleCreateWorkout}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold"
          >
            Create Workout
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              isDeleting={deleteWorkout.isPending}
              onDelete={() =>
                deleteWorkout.mutate(workout.id, {
                  onSuccess: () => {
                    if (workouts.length === 1 && page > 1) goToPage(page - 1);
                  },
                })
              }
              isSelected={selectedIds.has(workout.id)}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border bg-card hover:bg-muted disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border bg-card hover:bg-muted disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {selectedIds.size > 0 && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-card border border-border shadow-xl rounded-2xl p-3 animate-in slide-in-from-bottom-4 fade-in">
          <span className="text-sm font-medium px-2 text-muted-foreground">
            {selectedIds.size} selected
          </span>
          <button
            onClick={handleExport}
            disabled={exportBulk.isPending}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
          >
            {exportBulk.isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <> Export PDF</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
