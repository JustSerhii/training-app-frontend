"use client";

import { useState } from "react";
import { useGetProfile, useGetRecords } from "../hooks";
import { useUpdateProfile } from "../hooks/use-update-profile";
import { toast } from "sonner";

export function ProfileClient() {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: records, isLoading: recordsLoading } = useGetRecords();
  const updateProfile = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editWeight, setEditWeight] = useState<string>("");

  const isLoading = profileLoading || recordsLoading;

  const startEditing = () => {
    if (profile) {
      setEditName(profile.name);
      setEditWeight(profile.bodyWeight?.toString() ?? "");
      setIsEditing(true);
    }
  };

  const saveChanges = () => {
    const payload: { name?: string; bodyWeight?: number } = {};
    if (editName !== profile?.name) payload.name = editName;
    if (editWeight !== (profile?.bodyWeight?.toString() ?? "")) {
      const val = editWeight === "" ? undefined : parseFloat(editWeight);
      if (val !== undefined && !isNaN(val) && val > 0) payload.bodyWeight = val;
      else toast.error("Weight must be valid");
    }
    if (Object.keys(payload).length > 0) {
      updateProfile.mutate(payload, { onSuccess: () => setIsEditing(false) });
    } else {
      setIsEditing(false);
    }
  };

  // Skeleton for better Cumulative Layout Shift (CLS)
  if (isLoading) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="h-9 w-40 rounded-lg bg-muted animate-pulse mb-2" />
          <div className="h-5 w-56 rounded-lg bg-muted animate-pulse" />
        </div>
        <div className="h-32 rounded-xl border border-border bg-card mb-8" />
        <div className="space-y-4">
          <div className="h-24 rounded-xl border border-border bg-card" />
          <div className="h-24 rounded-xl border border-border bg-card" />
          <div className="h-24 rounded-xl border border-border bg-card" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 text-center text-destructive">
        Failed to load profile
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-2">{profile.email}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 mb-8 shadow-sm">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Body Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={editWeight}
                onChange={(e) => setEditWeight(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={saveChanges}
                disabled={updateProfile.isPending}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
              >
                {updateProfile.isPending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-4">
            <div className="cursor-pointer group flex-1" onClick={startEditing}>
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                {profile.name}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2 text-muted-foreground">
                <span className="text-sm">
                  Weight:{" "}
                  {profile.bodyWeight != null
                    ? `${profile.bodyWeight} kg`
                    : "Not set"}
                </span>
                {profile.bodyWeight == null && (
                  <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg w-fit">
                    Set weight for accurate bodyweight exercise tracking
                  </span>
                )}
              </div>
              <span className="inline-block mt-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                Click to edit
              </span>
            </div>
            <button
              onClick={startEditing}
              className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Personal Records</h2>
          {records && records.length > 0 && (
            <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {records.length} {records.length <= 1 ? "exercise" : "exercises"}
            </span>
          )}
        </div>

        {records && records.length > 0 ? (
          <ul className="space-y-4">
            {records.map((record) => (
              <li
                key={`${record.exerciseId}-${record.maxWeight}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate">
                      {record.exerciseTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted transition-colors text-sm">
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6.5 6.5h11M6.5 17.5h11M4 9h2v6H4zM18 9h2v6h-2zM8 4v16M16 4v16" />
                        </svg>
                        <span className="font-medium">
                          {record.maxWeight} kg
                        </span>
                        <span>× {record.maxReps} reps</span>
                      </span>
                      {record.bestWeight !== record.maxWeight ||
                      record.bestReps !== record.maxReps ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm">
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span className="font-medium">
                            {record.bestWeight} kg
                          </span>
                          <span>× {record.bestReps} reps</span>
                          <span className="opacity-70">(best 1RM)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/30 text-muted-foreground/70 text-sm">
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          Same as max weight
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 md:border-l md:border-border md:pl-6">
                    <div className="text-center md:text-right">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Est. 1RM
                      </p>
                      <p className="text-2xl font-bold text-primary mt-1">
                        {record.estimatedOneRepMax} kg
                      </p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Max Volume
                      </p>
                      <p className="text-lg font-semibold mt-1">
                        {record.maxVolume} kg
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-2xl bg-muted/20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <span className="text-3xl">🏋️</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">No records yet</h3>
            <p className="text-muted-foreground max-w-sm">
              Start adding sets to your workouts to see your personal records
              here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
