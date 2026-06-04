const STORAGE_KEY = "hma-column-widths";
const MIN_COLUMN_WIDTH = 60;

export const DEFAULT_COLUMN_WIDTHS: Record<string, string> = {
  poster: "180px",
  year: "100px",
  title: "240px",
  titlePt: "200px",
  director: "170px",
  country: "140px",
  distributor: "170px",
  badge: "180px",
  stars: "100px",
  review: "200px",
  imdb: "80px",
  rotten: "104px",
};

export function getColumnWidths(): Record<string, string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Record<string, string>;
      return { ...DEFAULT_COLUMN_WIDTHS, ...parsed };
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return { ...DEFAULT_COLUMN_WIDTHS };
}

export function setColumnWidth(columnId: string, width: number): void {
  try {
    const current = getColumnWidths();
    current[columnId] = `${Math.max(MIN_COLUMN_WIDTH, width)}px`;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {}
}
