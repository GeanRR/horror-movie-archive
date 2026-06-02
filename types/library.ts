export const LIBRARY_VIEW_MODES = ["list", "grid"] as const;

export type LibraryViewMode = (typeof LIBRARY_VIEW_MODES)[number];

export const LIBRARY_SORT_KEYS = [
  "title",
  "year",
  "imdb",
  "rotten",
  "review",
  "watchedDate",
] as const;

export type LibrarySortKey = (typeof LIBRARY_SORT_KEYS)[number];
export type LibrarySortDirection = "asc" | "desc";

export type LibrarySortState = {
  key: LibrarySortKey;
  direction: LibrarySortDirection;
};

export const DEFAULT_LIBRARY_SORT: LibrarySortState = {
  key: "title",
  direction: "asc",
};

export const LIBRARY_PAGE_SIZE = 100;

export type LibraryFilters = {
  genre: string;
  country: string;
  distributor: string;
  badgeId: string;
  stars: string;
  bestOfYear: boolean;
};

export type LibraryFilterOptions = {
  genres: string[];
  countries: string[];
  distributors: string[];
  badges: string[];
  stars: string[];
};

export const DEFAULT_LIBRARY_FILTERS: LibraryFilters = {
  genre: "",
  country: "",
  distributor: "",
  badgeId: "",
  stars: "",
  bestOfYear: false,
};
