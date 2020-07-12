export const getPercentageForRange = (value: number, range: number) =>
  (value + range) / (range * 2);

export const constrainToRange = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
