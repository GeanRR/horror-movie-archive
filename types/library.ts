export const LIBRARY_VIEW_MODES = ["list", "grid"] as const;

export type LibraryViewMode = (typeof LIBRARY_VIEW_MODES)[number];
