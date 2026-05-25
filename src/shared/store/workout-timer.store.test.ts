import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useWorkoutTimerStore } from "./workout-timer.store";

describe("useWorkoutTimerStore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useWorkoutTimerStore.setState({
      workoutId: null,
      startedAt: null,
      isActive: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("start()", () => {
    it("sets isActive to true and stores startedAt", () => {
      const { start } = useWorkoutTimerStore.getState();

      const startTime = Date.now();
      vi.setSystemTime(startTime);

      start("test-workout-123"); 

      const state = useWorkoutTimerStore.getState();
      expect(state.isActive).toBe(true);
      expect(state.workoutId).toBe("test-workout-123");
      expect(state.startedAt).toBe(startTime);
    });
  });

  describe("finish()", () => {
    it("returns 0 when startedAt is null (branch coverage)", () => {
      const { finish } = useWorkoutTimerStore.getState();

      const elapsed = finish();

      expect(elapsed).toBe(0);
      const state = useWorkoutTimerStore.getState();
      expect(state.isActive).toBe(false);
      expect(state.startedAt).toBeNull();
    });

    it("calculates elapsed time when startedAt is set (branch coverage)", () => {
      const { start, finish } = useWorkoutTimerStore.getState();

      vi.setSystemTime(0);
      start("test-workout-123");

      vi.advanceTimersByTime(5000);

      const elapsed = finish();

      expect(elapsed).toBe(5);
    });
  });

  describe("reset()", () => {
    it("resets all state fields", () => {
      const { start, reset } = useWorkoutTimerStore.getState();

      start("test-workout-123");

      reset();

      const state = useWorkoutTimerStore.getState();
      expect(state.isActive).toBe(false);
      expect(state.startedAt).toBeNull();
      expect(state.workoutId).toBeNull();
    });
  });

  describe("getElapsed()", () => {
    it("returns 0 when startedAt is null (branch coverage)", () => {
      const { getElapsed } = useWorkoutTimerStore.getState();
      expect(getElapsed()).toBe(0);
    });

    it("calculates elapsed time when startedAt is set (branch coverage)", () => {
      const { start, getElapsed } = useWorkoutTimerStore.getState();

      vi.setSystemTime(0);
      start("test-workout-123");

      vi.advanceTimersByTime(10000);

      expect(getElapsed()).toBe(10);
    });
  });
});
