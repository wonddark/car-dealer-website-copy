const offerRanges = [
  { min: 0, max: 5, step: 1 },
  { min: 5, max: 40, step: 5 },
  { min: 40, max: 100, step: 10 },
  { min: 100, max: 1000, step: 25 },
  { min: 1000, max: 5000, step: 50 },
  { min: 5000, max: 25000, step: 100 },
  { min: 25000, max: 50000, step: 250 },
  { min: 50000, max: 100000, step: 500 },
  { min: 100000, max: 9999999, step: 1000 },
];

export function getStep(referValue: number) {
  for (const range of offerRanges) {
    if (range.min <= referValue && referValue < range.max) {
      return range.step;
    }
  }

  return 1000;
}
