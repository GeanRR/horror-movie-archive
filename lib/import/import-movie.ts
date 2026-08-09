import { fetchMovieDetails } from "@/lib/add-movie/fetch-movie-details";
import { getTmdbPosterUrl } from "@/lib/tmdb/poster";
import { calculateBadgeId } from "@/lib/movie-engines/badge-engine";
import { calculateStars } from "@/lib/movie-engines/stars-engine";
import { normalizePrimarySubgenres } from "@/lib/movie-engines/subgenre-engine";
import { useMovieStore } from "@/store/movie-store";
import type { LibraryMovie } from "@/store/movie-store";
import type { CsvRow } from "@/types/import";

export type ImportedMovie = {
  id: string;
  tmdbId: number;
  title: string;
};

export type ImportSingleMovieResult =
  | { ok: true; movie: ImportedMovie; skipped?: false }
  | { ok: true; skipped: true; reason: string }
  | { ok: false; error: string };

function createMovieId(tmdbId: number): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${tmdbId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeTitle(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleCandidates(
  displayTitle: string,
  originalTitle: string
): string[] {
  return [displayTitle, originalTitle].map(normalizeTitle).filter(Boolean);
}

export function findDuplicate(
  tmdbId: number,
  title: string,
  year: string,
  existingMovies: LibraryMovie[]
): LibraryMovie | null {
  const tmdbMatch = existingMovies.find((m) => m.tmdbId === tmdbId);
  if (tmdbMatch) return tmdbMatch;

  const candidates = titleCandidates(title, title);
  const titleYearMatch = existingMovies.find((m) => {
    if (m.year !== year) return false;
    const existingTitles = titleCandidates(m.displayTitle, m.originalTitle);
    return candidates.some((t) => existingTitles.includes(t));
  });

  return titleYearMatch ?? null;
}

export async function importSingleMovie(
  csvRow: CsvRow,
  tmdbId: number,
  options?: { allowDuplicate?: boolean; posterPath?: string | null }
): Promise<ImportSingleMovieResult> {
  const { movies } = useMovieStore.getState();
  const addMovie = useMovieStore.getState().addMovie;

  try {
    const details = await fetchMovieDetails(tmdbId);

    const now = new Date().toISOString();
    const reviewScore = csvRow.reviewScore;
    const stars = calculateStars(reviewScore);
    const badgeId = calculateBadgeId(reviewScore);

    const movieId = createMovieId(tmdbId);

    const duplicate = findDuplicate(
      tmdbId,
      details.title,
      details.year,
      movies
    );
    if (duplicate) {
      return { ok: true, skipped: true, reason: `Duplicate of "${duplicate.displayTitle}"` };
    }

    const movie: LibraryMovie = {
      id: movieId,
      tmdbId,
      imdbId: details.imdbId,

      displayTitle: details.title,
      originalTitle: details.originalTitle,
      titlePt: details.titlePt,
      year: details.year,

      posterUrl: getTmdbPosterUrl(options?.posterPath ?? null, "detail"),

      director: details.director,
      country: details.country,
      distributor: details.distributor ?? "-",
      runtime: details.runtime,
      releaseDate: details.releaseDate,
      synopsis: details.overview,

      cast: details.cast ?? [],
      crew: details.crew ?? [],
      genres: details.genres ?? [],
      subgenres: normalizePrimarySubgenres(details.subgenres, {
        title: details.title,
        originalTitle: details.originalTitle,
        genres: details.genres ?? [],
        overview: details.overview,
      }),

      imdbScore: details.imdbScore ?? null,
      rottenTomatoesScore: details.rottenTomatoesScore ?? null,

      reviewScore,
      stars,
      badgeId,
      badgeOverrideEnabled: false,

      watchedDate: "",
      rewatchHistory: [],
      bestOfYear: false,

      assignedLists: [],

      createdAt: now,
      updatedAt: now,
      metadataSourceSnapshot: JSON.stringify({
        tmdbId,
        imdbId: details.imdbId ?? null,
        sources: ["CSV Import", "TMDB", details.imdbId ? "OMDb" : null].filter(Boolean),
      }),
      metadataLastRefreshedAt: now,
    };

    addMovie(movie);

    return { ok: true, movie: { id: movieId, tmdbId, title: details.title } };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, error: message };
  }
}
