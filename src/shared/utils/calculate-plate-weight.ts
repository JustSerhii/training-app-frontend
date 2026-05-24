export function calculatePlateWeight(
  totalWeight: number | null,
  exerciseIsBodyWeight: boolean,
  userBodyWeight: number | null,
): number | null {
  if (totalWeight == null) return null;

  if (exerciseIsBodyWeight && userBodyWeight != null && userBodyWeight > 0) {
    const plateWeight = totalWeight - userBodyWeight;
    return plateWeight > 0 ? plateWeight : null;
  }

  return totalWeight;
}
