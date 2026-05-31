/** Review score options: 1 through 10 in 0.5 increments */
export const REVIEW_SCORE_OPTIONS = Array.from({ length: 19 }, (_, index) => {
  const value = 1 + index * 0.5;
  return {
    value: String(value),
    label: Number.isInteger(value) ? String(value) : value.toFixed(1),
  };
});
