import { renderHook, act } from "@testing-library/react";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { useDebounce } from "./use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("updates to the new value after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "first", delay: 300 } },
    );

    act(() => {
      rerender({ value: "second", delay: 300 });
    });

    expect(result.current).toBe("first");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("second");
  });

  it("resets the timer when value changes before delay completes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "A", delay: 500 } },
    );

    act(() => {
      rerender({ value: "B", delay: 500 });
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    act(() => {
      rerender({ value: "C", delay: 500 });
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe("A");

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe("C");
  });

  it("clears the timeout on unmount", () => {
    const { unmount, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "test", delay: 500 } },
    );

    act(() => {
      rerender({ value: "updated", delay: 500 });
    });

    expect(() => unmount()).not.toThrow();

    act(() => {
      vi.advanceTimersByTime(600);
    });

  });
});
