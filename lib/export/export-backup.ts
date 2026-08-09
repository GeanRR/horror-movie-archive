import { useMovieStore } from "@/store/movie-store";

export type FullBackup = {
  version: 1;
  exportedAt: string;
  movies: unknown[];
  lists?: unknown[];
};

export function createBackup(): FullBackup {
  const { movies, lists } = useMovieStore.getState();

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    lists: lists.map((list) => ({
      id: list.id,
      name: list.name,
      movies: list.movies,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    })),
    movies: movies.map((m) => ({
      id: m.id,
      tmdbId: m.tmdbId,
      imdbId: m.imdbId,
      displayTitle: m.displayTitle,
      originalTitle: m.originalTitle,
      titlePt: m.titlePt,
      year: m.year,
      posterUrl: m.posterUrl,
      director: m.director,
      country: m.country,
      distributor: m.distributor,
      runtime: m.runtime,
      releaseDate: m.releaseDate,
      synopsis: m.synopsis,
      cast: m.cast,
      crew: m.crew,
      genres: m.genres,
      subgenres: m.subgenres,
      imdbScore: m.imdbScore,
      rottenTomatoesScore: m.rottenTomatoesScore,
      reviewScore: m.reviewScore,
      stars: m.stars,
      badgeId: m.badgeId,
      badgeOverrideEnabled: m.badgeOverrideEnabled,
      watchedDate: m.watchedDate,
      rewatchHistory: m.rewatchHistory,
      bestOfYear: m.bestOfYear,
      assignedLists: m.assignedLists,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
      metadataSourceSnapshot: m.metadataSourceSnapshot,
      metadataLastRefreshedAt: m.metadataLastRefreshedAt,
    })),
  };
}

export function downloadBackup(filename: string = "retromax-backup.json") {
  const backup = createBackup();
  const json = JSON.stringify(backup, null, 2);
  const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function parseBackupFile(file: File): Promise<{ ok: true; backup: FullBackup } | { ok: false; error: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const data = JSON.parse(text);

        if (!data || typeof data !== "object") {
          resolve({ ok: false, error: "Invalid backup file format." });
          return;
        }

        if (data.version !== 1) {
          resolve({ ok: false, error: "Unsupported backup version." });
          return;
        }

        if (!Array.isArray(data.movies)) {
          resolve({ ok: false, error: "Backup file missing movies array." });
          return;
        }

        resolve({ ok: true, backup: data as FullBackup });
      } catch {
        resolve({ ok: false, error: "Failed to parse backup file." });
      }
    };
    reader.onerror = () => {
      resolve({ ok: false, error: "Failed to read backup file." });
    };
    reader.readAsText(file);
  });
}
