import type { ReactNode } from "react";
import type { LibrarySortKey } from "@/types/library";

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
  sortKey?: LibrarySortKey;
  /** Tailwind min-width utility for column sizing */
  minWidth: string;
};

export const LIBRARY_LIST_COLUMNS: LibraryListColumnDef[] = [
  { id: "poster", label: "Poster", sortable: false, minWidth: "min-w-[180px]" },
  {
    id: "year",
    label: "Year",
    sortable: true,
    sortKey: "year",
    minWidth: "min-w-[100px]",
  },
  {
    id: "title",
    label: "Title",
    sortable: true,
    sortKey: "title",
    minWidth: "min-w-[200px]",
  },
  {
    id: "titlePt",
    label: "Title PT",
    sortable: true,
    sortKey: "titlePt",
    minWidth: "min-w-[200px]",
  },
  {
    id: "director",
    label: "Director",
    sortable: true,
    sortKey: "director",
    minWidth: "min-w-[180px]",
  },
  {
    id: "country",
    label: "Country",
    sortable: true,
    sortKey: "country",
    minWidth: "min-w-[140px]",
  },
  {
    id: "distributor",
    label: "Distributor",
    sortable: true,
    sortKey: "distributor",
    minWidth: "min-w-[180px]",
  },
  { id: "badge", label: "Badge", sortable: false, minWidth: "min-w-[180px]" },
  {
    id: "stars",
    label: "Stars",
    sortable: true,
    sortKey: "stars",
    minWidth: "min-w-[110px]",
  },
  {
    id: "review",
    label: "Personal Review",
    sortable: true,
    sortKey: "review",
    minWidth: "min-w-[120px]",
  },
  {
    id: "imdb",
    label: "IMDb",
    sortable: true,
    sortKey: "imdb",
    minWidth: "min-w-[90px]",
  },
  {
    id: "rotten",
    label: "Rotten Tomatoes",
    sortable: true,
    sortKey: "rotten",
    minWidth: "min-w-[100px]",
  },
];

/** Future row shape — inject cell content per column when movies are wired */
export type LibraryMovieListRow = Partial<
  Record<LibraryListColumnId, ReactNode>
>;
