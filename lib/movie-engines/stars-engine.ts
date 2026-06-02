export const MIN_REVIEW_SCORE = 1;
export const MAX_REVIEW_SCORE = 10;
export const MAX_STARS = 5;

export function calculateStars(
  reviewScore: number | null | undefined
): number {
  if (
    typeof reviewScore !== "number" ||
    !Number.isFinite(reviewScore) ||
    reviewScore <= 0
  ) {
    return 0;
  }

  if (reviewScore >= 9) return 5;
  if (reviewScore >= 7) return 4;
  if (reviewScore >= 5) return 3;
  if (reviewScore >= 2.5) return 2;
  return 1;
}

export function isMasterpieceScore(
  reviewScore: number | null | undefined
): boolean {
  return reviewScore === MAX_REVIEW_SCORE;
}

export function formatStars(stars: number | null | undefined): string {
  if (typeof stars !== "number" || !Number.isFinite(stars) || stars <= 0) {
    return "-";
  }

  return `${stars}/${MAX_STARS}`;
}

export function formatReviewScore(
  reviewScore: number | null | undefined
): string {
  if (
    typeof reviewScore !== "number" ||
    !Number.isFinite(reviewScore) ||
    reviewScore <= 0
  ) {
    return "-";
  }

  return `${Number.isInteger(reviewScore)
    ? reviewScore
    : reviewScore.toFixed(1)}`;
}
