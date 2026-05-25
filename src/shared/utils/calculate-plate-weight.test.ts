import { describe, it, expect } from "vitest";
import { calculatePlateWeight } from "./calculate-plate-weight";

describe("calculatePlateWeight", () => {
  it("returns null when totalWeight is null", () => {
    expect(calculatePlateWeight(null, false, 75)).toBeNull();
  });

  it("returns totalWeight for non-bodyweight exercises", () => {
    expect(calculatePlateWeight(100, false, 75)).toBe(100);
  });

  it("subtracts bodyWeight for bodyweight exercises when plateWeight > 0", () => {
    expect(calculatePlateWeight(85, true, 75)).toBe(10);
  });

  it("returns null when plateWeight would be <= 0", () => {
    expect(calculatePlateWeight(70, true, 75)).toBeNull();
  });

  it("handles zero bodyWeight gracefully", () => {
    expect(calculatePlateWeight(85, true, 0)).toBe(85);
  });
});
