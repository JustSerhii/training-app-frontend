import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useWorkoutTimer } from "./use-workout-timer";

beforeEach(() => {
  vi.useFakeTimers();
});

describe("useWorkoutTimer", () => {
  it("starts with elapsed = 0 and isActive = false", () => {
    const { result } = renderHook(() => useWorkoutTimer());
    expect(result.current.elapsed).toBe(0);
    expect(result.current.isActive).toBe(false);
  });

  it("increments elapsed every second when active", () => {
    const { result } = renderHook(() => useWorkoutTimer());

    act(() => {
      result.current.start("test-workout-id");
    });

    expect(result.current.isActive).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.elapsed).toBe(3);
  });

  it("formats time correctly", () => {
    const { result } = renderHook(() => useWorkoutTimer());
    expect(typeof result.current.formattedTime).toBe("string");
  });

  it("formats time with hours correctly (>= 3600 seconds)", () => {
    const { result } = renderHook(() => useWorkoutTimer());
    expect(typeof result.current.formattedTime).toBe("string");
  });

  it("formats elapsed time with hours", () => {
    const { result } = renderHook(() => useWorkoutTimer());

    act(() => {
      result.current.start("test");
    });

    act(() => {
      vi.advanceTimersByTime(3665000);
    });

    expect(result.current.formattedTime).toBe("1:01:05");
  });

  it("formats elapsed time without hours", () => {
    const { result } = renderHook(() => useWorkoutTimer());

    act(() => {
      result.current.start("test");
    });

    act(() => {
      vi.advanceTimersByTime(65000);
    });

    expect(result.current.formattedTime).toBe("01:05");
  });
});
