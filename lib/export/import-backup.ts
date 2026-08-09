import { useMovieStore } from "@/store/movie-store";
import { normalizeCustomMovieLists, normalizeMovieList } from "@/store/movie-store";
import type { FullBackup } from "@/lib/export/export-backup";

export type RestoreResult = {
  moviesRestored: number;
};

export function restoreBackup(
  backup: FullBackup,
  mode: "merge" | "replace"
): RestoreResult {
  if (mode === "replace") {
    const store = useMovieStore.getState();
    store.movies.forEach((m) => store.removeMovie(m.id));

    const restoredMovies = normalizeMovieList(backup.movies);
    for (const movie of restoredMovies) {
      store.addMovie(movie);
    }
    store.replaceLists(normalizeCustomMovieLists(backup.lists, restoredMovies));

    return { moviesRestored: restoredMovies.length };
  }

  const existingMovies = useMovieStore.getState().movies;
  const existingIds = new Set(existingMovies.map((m) => m.tmdbId));
  const store = useMovieStore.getState();

  const incoming = normalizeMovieList(backup.movies);
  let count = 0;

  for (const movie of incoming) {
    if (!existingIds.has(movie.tmdbId)) {
      store.addMovie(movie);
      count++;
    }
  }

  const mergedMovies = useMovieStore.getState().movies;
  const incomingLists = normalizeCustomMovieLists(backup.lists, mergedMovies);
  const existingListIds = new Set(store.lists.map((list) => list.id));
  store.replaceLists([
    ...store.lists,
    ...incomingLists.filter((list) => !existingListIds.has(list.id)),
  ]);

  return { moviesRestored: count };
}

export function replaceAllConfirmation(): boolean {
  return window.confirm(
    "This will permanently replace your current archive.\n\n" +
    "All existing movies, ratings, watched dates, lists, and settings will be deleted and replaced with the backup.\n\n" +
    "This action cannot be undone. Are you sure?"
  );
}
