const VISIBLE_COLUMNS_KEY = "hma-visible-columns";
const COLUMN_ORDER_KEY = "hma-column-order";
const COLUMN_WIDTHS_KEY = "hma-column-widths";
const VIEW_MODE_KEY = "hma-view-mode";

export const ALL_COLUMN_IDS = [
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

export type ColumnId = (typeof ALL_COLUMN_IDS)[number];

const DEFAULT_VISIBLE_COLUMNS: ColumnId[] = [
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
];

const DEFAULT_COLUMN_ORDER: ColumnId[] = [...ALL_COLUMN_IDS];

export function getVisibleColumns(): ColumnId[] {
  try {
    const stored = localStorage.getItem(VISIBLE_COLUMNS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as string[];
      const filtered = parsed.filter((id) =>
        ALL_COLUMN_IDS.includes(id as ColumnId)
      );
      if (filtered.length > 0) return filtered as ColumnId[];
    }
  } catch {}
  return [...DEFAULT_VISIBLE_COLUMNS];
}

export function setVisibleColumns(columns: ColumnId[]): void {
  try {
    localStorage.setItem(VISIBLE_COLUMNS_KEY, JSON.stringify(columns));
  } catch {}
}

export function getColumnOrder(): ColumnId[] {
  try {
    const stored = localStorage.getItem(COLUMN_ORDER_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as string[];
      const filtered = parsed.filter((id) =>
        ALL_COLUMN_IDS.includes(id as ColumnId)
      );
      if (filtered.length > 0) return filtered as ColumnId[];
    }
  } catch {}
  return [...DEFAULT_COLUMN_ORDER];
}

export function setColumnOrder(order: ColumnId[]): void {
  try {
    localStorage.setItem(COLUMN_ORDER_KEY, JSON.stringify(order));
  } catch {}
}

const DEFAULT_WIDTHS: Record<string, string> = {
  poster: "180px",
  year: "100px",
  title: "280px",
  titlePt: "240px",
  director: "200px",
  country: "160px",
  distributor: "200px",
  badge: "180px",
  stars: "120px",
  review: "130px",
  imdb: "90px",
  rotten: "110px",
};

export function getColumnWidths(): Record<string, string> {
  try {
    const stored = localStorage.getItem(COLUMN_WIDTHS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Record<string, string>;
      return { ...DEFAULT_WIDTHS, ...parsed };
    }
  } catch {}
  return { ...DEFAULT_WIDTHS };
}

export function setColumnWidth(columnId: string, width: number): void {
  try {
    const current = getColumnWidths();
    current[columnId] = `${Math.max(60, width)}px`;
    localStorage.setItem(COLUMN_WIDTHS_KEY, JSON.stringify(current));
  } catch {}
}

export function getViewMode(): string | null {
  try {
    return localStorage.getItem(VIEW_MODE_KEY);
  } catch {
    return null;
  }
}

export function setViewMode(mode: string): void {
  try {
    localStorage.setItem(VIEW_MODE_KEY, mode);
  } catch {}
}
