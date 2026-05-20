"use client";

import { useGetProfile, useGetRecords } from "../hooks";

export function ProfileClient() {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: records, isLoading: recordsLoading } = useGetRecords();

  const isLoading = profileLoading || recordsLoading;

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground animate-pulse">
        Loading your progress...
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
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <h1 className="profile-header__title">Profile</h1>
        <p className="profile-header__email">{profile.email}</p>
      </div>

      {/* Records Section */}
      <div className="profile-section">
        <div className="profile-section__header">
          <h2 className="profile-section__title">Personal Records</h2>
          {records && records?.length > 0 && (
            <span className="profile-badge">{records.length} exercises</span>
          )}
        </div>

        {records && records.length > 0 ? (
          <ul className="profile-records-list">
            {records.map((record) => (
              <li
                key={`${record.exerciseId}-${record.maxWeight}`}
                className="profile-record-card group"
              >
                {/* Hover Effects */}
                <div className="profile-record-card__accent" />
                <div className="profile-record-card__hover-overlay" />

                <div className="profile-record-card__content">
                  {/* Left: Title & Badges */}
                  <div className="profile-record-card__info">
                    <h3 className="profile-record-card__title">
                      {record.exerciseTitle}
                    </h3>

                    <div className="profile-record-card__badges">
                      {/* Max Weight Badge */}
                      <span className="profile-badge-item profile-badge-item--max">
                        <svg
                          className="profile-badge-item__icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6.5 6.5h11M6.5 17.5h11M4 9h2v6H4zM18 9h2v6h-2zM8 4v16M16 4v16" />
                        </svg>
                        <span className="profile-badge-item__value">
                          {record.maxWeight} kg
                        </span>
                        <span>× {record.maxReps} reps</span>
                      </span>

                      {/* Best for 1RM Badge */}
                      {record.bestWeight !== record.maxWeight ||
                      record.bestReps !== record.maxReps ? (
                        <span className="profile-badge-item profile-badge-item--best">
                          <svg
                            className="profile-badge-item__icon profile-badge-item__icon--best"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span className="profile-badge-item__value">
                            {record.bestWeight} kg
                          </span>
                          <span>× {record.bestReps} reps</span>
                          <span className="opacity-70">(best 1RM)</span>
                        </span>
                      ) : (
                        <span className="profile-badge-item profile-badge-item--same">
                          <svg
                            className="profile-badge-item__icon"
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

                  {/* Right: Metrics */}
                  <div className="profile-record-card__metrics">
                    <div className="profile-record-metric">
                      <p className="profile-record-metric__label">Est. 1RM</p>
                      <p className="profile-record-metric__value profile-record-metric__value--primary">
                        {record.estimatedOneRepMax} kg
                      </p>
                    </div>

                    <div className="profile-record-metric">
                      <p className="profile-record-metric__label">Max Volume</p>
                      <p className="profile-record-metric__value">
                        {record.maxVolume} kg
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="profile-empty-state">
            <div className="profile-empty-state__icon-wrapper">
              <span className="text-3xl">🏋️</span>
            </div>
            <h3 className="profile-empty-state__title">No records yet</h3>
            <p className="profile-empty-state__sub">
              Start adding sets to your workouts to see your personal records
              here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
