"use client";

import { useGetProfile, useGetRecords } from "../hooks";

export function ProfileClient() {
  const { data: profile, isLoading: profileLoading } = useGetProfile();

  const { data: records, isLoading: recordsLoading } = useGetRecords();

  const isLoading = profileLoading || recordsLoading;

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading profile...
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
    <div className="profile-page p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Profile</h1>
      <p className="text-muted-foreground mb-8">{profile.email}</p>

      <h2 className="text-xl font-semibold mb-4">Personal Records</h2>

      {records && records.length > 0 ? (
        <ul className="space-y-3">
          {records.map((record) => (
            <li
              key={record.exerciseTitle}
              className="flex justify-between items-center p-4 rounded-xl border border-border bg-card"
            >
              <div>
                <p className="font-medium text-foreground">
                  {record.exerciseTitle}
                </p>
                <p className="text-sm text-muted-foreground">
                  Max: {record.maxWeight} kg × {record.maxReps} reps
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">
                  ~{record.estimatedOneRepMax} kg (1RM)
                </p>
                <p className="text-xs text-muted-foreground">
                  Volume: {record.maxVolume} kg
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground italic">
          No records yet. Start training to see your progress!
        </p>
      )}
    </div>
  );
}
