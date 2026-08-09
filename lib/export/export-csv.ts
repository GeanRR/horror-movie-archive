import { useMovieStore } from "@/store/movie-store";

export function exportCsv(): string {
  const movies = useMovieStore.getState().movies;

  const header = "title,review_score,badge_id,year,watched_date";
  const rows = movies.map((m) => {
    const title = escapeCsvField(m.displayTitle);
    const reviewScore = m.reviewScore ?? "";
    const year = m.year;
    const watchedDate = m.watchedDate || "";
    const badgeId = m.badgeId ?? "";
    return `${title},${reviewScore},${badgeId},${year},${watchedDate}`;
  });

  return [header, ...rows].join("\n");
}

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function downloadCsv(filename: string = "retromax-export.csv") {
  const csv = exportCsv();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
