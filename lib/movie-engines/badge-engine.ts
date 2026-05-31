export const AUTO_BADGE_IDS = [
  "badge1",
  "badge2",
  "badge3",
  "badge4",
  "badge5",
  "badge6",
  "badge7",
  "badge8",
  "badge9",
] as const;

export const MANUAL_BADGE_IDS = ["badge10", "badge11", "badge12"] as const;

export const MOVIE_BADGES = [
  {
    id: "badge1",
    label: "badge1",
    description: "10 review score",
    minReviewScore: 10,
    automatic: true,
    tone: "gold",
  },
  {
    id: "badge2",
    label: "badge2",
    description: "9 to 9.5 review score",
    minReviewScore: 9,
    automatic: true,
    tone: "crimson",
  },
  {
    id: "badge3",
    label: "badge3",
    description: "8 to 8.5 review score",
    minReviewScore: 8,
    automatic: true,
    tone: "red",
  },
  {
    id: "badge4",
    label: "badge4",
    description: "7 to 7.5 review score",
    minReviewScore: 7,
    automatic: true,
    tone: "amber",
  },
  {
    id: "badge5",
    label: "badge5",
    description: "6 to 6.5 review score",
    minReviewScore: 6,
    automatic: true,
    tone: "orange",
  },
  {
    id: "badge6",
    label: "badge6",
    description: "5 to 5.5 review score",
    minReviewScore: 5,
    automatic: true,
    tone: "slate",
  },
  {
    id: "badge7",
    label: "badge7",
    description: "4 to 4.5 review score",
    minReviewScore: 4,
    automatic: true,
    tone: "violet",
  },
  {
    id: "badge8",
    label: "badge8",
    description: "1.5 to 3.5 review score",
    minReviewScore: 1.5,
    automatic: true,
    tone: "muted",
  },
  {
    id: "badge9",
    label: "badge9",
    description: "1 review score",
    minReviewScore: 1,
    automatic: true,
    tone: "muted",
  },
  {
    id: "badge10",
    label: "badge10",
    description: "Manual-only badge",
    minReviewScore: null,
    automatic: false,
    tone: "manual",
  },
  {
    id: "badge11",
    label: "badge11",
    description: "Manual-only badge",
    minReviewScore: null,
    automatic: false,
    tone: "manual",
  },
  {
    id: "badge12",
    label: "badge12",
    description: "Manual-only badge",
    minReviewScore: null,
    automatic: false,
    tone: "manual",
  },
] as const;

export type MovieBadgeDefinition = (typeof MOVIE_BADGES)[number];
export type MovieBadgeId = MovieBadgeDefinition["id"];

export function getBadgeForReviewScore(
  reviewScore: number | null | undefined
): MovieBadgeDefinition | null {
  if (
    typeof reviewScore !== "number" ||
    !Number.isFinite(reviewScore) ||
    reviewScore <= 0
  ) {
    return null;
  }

  if (reviewScore >= 10) return getBadgeDefinition("badge1");
  if (reviewScore >= 9) return getBadgeDefinition("badge2");
  if (reviewScore >= 8) return getBadgeDefinition("badge3");
  if (reviewScore >= 7) return getBadgeDefinition("badge4");
  if (reviewScore >= 6) return getBadgeDefinition("badge5");
  if (reviewScore >= 5) return getBadgeDefinition("badge6");
  if (reviewScore >= 4) return getBadgeDefinition("badge7");
  if (reviewScore >= 1.5) return getBadgeDefinition("badge8");
  return getBadgeDefinition("badge9");
}

export function getBadgeDefinition(
  badgeId: string | null | undefined
): MovieBadgeDefinition | null {
  if (!badgeId) return null;

  return MOVIE_BADGES.find((badge) => badge.id === badgeId) ?? null;
}

export function calculateBadgeId(
  reviewScore: number | null | undefined,
  options?: {
    overrideEnabled?: boolean;
    currentBadgeId?: string | null;
  }
): string | null {
  if (options?.overrideEnabled) {
    return options.currentBadgeId ?? null;
  }

  return getBadgeForReviewScore(reviewScore)?.id ?? null;
}
