import type { ReactNode } from "react";

/**
 * Library list table column definitions — shared by shell and future data rows.
 */

export const LIBRARY_LIST_COLUMN_IDS = [
  "poster",
  "year",
  "title",
  "titlePt",
  "director",
  "country",
  "distributor",
  "badge",
  "stars",
  "review",
  "imdb",
  "rotten",
] as const;

export type LibraryListColumnId = (typeof LIBRARY_LIST_COLUMN_IDS)[number];

export type LibraryListColumnDef = {
  id: LibraryListColumnId;
  label: string;
  sortable: boolean;
  /** Tailwind min-width utility for column sizing */
  minWidth: string;
};

export const LIBRARY_LIST_COLUMNS: LibraryListColumnDef[] = [
  { id: "poster", label: "Poster", sortable: false, minWidth: "min-w-[88px]" },
  { id: "year", label: "Year", sortable: true, minWidth: "min-w-[80px]" },
  { id: "title", label: "Title", sortable: true, minWidth: "min-w-[160px]" },
  {
    id: "titlePt",
    label: "Title PT",
    sortable: true,
    minWidth: "min-w-[160px]",
  },
  {
    id: "director",
    label: "Director",
    sortable: true,
    minWidth: "min-w-[140px]",
  },
  {
    id: "country",
    label: "Country",
    sortable: true,
    minWidth: "min-w-[120px]",
  },
  {
    id: "distributor",
    label: "Distributor",
    sortable: true,
    minWidth: "min-w-[140px]",
  },
  { id: "badge", label: "Badge", sortable: false, minWidth: "min-w-[100px]" },
  { id: "stars", label: "Stars", sortable: true, minWidth: "min-w-[88px]" },
  {
    id: "review",
    label: "Review",
    sortable: false,
    minWidth: "min-w-[200px]",
  },
  { id: "imdb", label: "IMDb", sortable: true, minWidth: "min-w-[88px]" },
  { id: "rotten", label: "Rotten", sortable: true, minWidth: "min-w-[88px]" },
];

/** Future row shape — inject cell content per column when movies are wired */
export type LibraryMovieListRow = Partial<
  Record<LibraryListColumnId, ReactNode>
>;
