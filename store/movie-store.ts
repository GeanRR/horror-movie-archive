import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateBadgeId } from "@/lib/movie-engines/badge-engine";
import {
  dedupeBestOfYearCrowns,
  enforceBestOfYearCrown,
} from "@/lib/movie-engines/best-of-year-crown";
import { calculateStars } from "@/lib/movie-engines/stars-engine";

export type LibraryMovie = {
  // Identity
  id: string;
  tmdbId: number;
  imdbId?: string;

  displayTitle: string;
  originalTitle: string;
  titlePt: string;
  year: string;

  // Visual
  posterUrl?: string;

  // Metadata
  director: string;
  country: string;
  distributor: string;
  runtime: number | null;
  releaseDate: string;
  synopsis: string;

  cast: string[];
  crew: string[];
  genres: string[];
  subgenres: string[];

  // External Ratings
  imdbScore: number | null;
  rottenTomatoesScore: number | null;

  // Personal Ratings
  reviewScore: number | null;
  stars: number;
  badgeId: string | null;
  badgeOverrideEnabled: boolean;

  // Personal Tracking
  watchedDate: string;
  bestOfYear: boolean;

  // Organization
  assignedLists: string[];

  // System
  createdAt: string;
  updatedAt: string;
  metadataSourceSnapshot: string | null;
  metadataLastRefreshedAt: string | null;
};

type MovieRecord = Record<string, unknown>;

function asRecord(value: unknown): MovieRecord | null {
  return typeof value === "object" && value !== null
    ? (value as MovieRecord)
    : null;
}

function toStringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}

function toNullableString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : null;
}

function toNumberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is string =>
      typeof item === "string" && item.trim().length > 0
  );
}

function normalizeLibraryMovie(value: unknown): LibraryMovie | null {
  const record = asRecord(value);
  if (!record) return null;

  const tmdbId = toNumberOrNull(record.tmdbId);
  if (tmdbId === null) return null;

  const now = new Date().toISOString();
  const reviewScore = toNumberOrNull(record.reviewScore);
  const badgeOverrideEnabled = record.badgeOverrideEnabled === true;
  const currentBadgeId =
    typeof record.badgeId === "string" && record.badgeId.trim().length > 0
      ? record.badgeId
      : null;

  const displayTitle = toStringValue(record.displayTitle, "Untitled");
  const originalTitle = toStringValue(record.originalTitle, displayTitle);

  return {
    id: toStringValue(record.id, `tmdb-${tmdbId}`),
    tmdbId,
    imdbId: toOptionalString(record.imdbId),

    displayTitle,
    originalTitle,
    titlePt: toStringValue(record.titlePt, displayTitle),
    year: toStringValue(record.year),

    posterUrl: toOptionalString(record.posterUrl),

    director: toStringValue(record.director, "-"),
    country: toStringValue(record.country, "-"),
    distributor: toStringValue(record.distributor, "-"),
    runtime: toNumberOrNull(record.runtime),
    releaseDate: toStringValue(record.releaseDate),
    synopsis: toStringValue(record.synopsis),

    cast: toStringArray(record.cast),
    crew: toStringArray(record.crew),
    genres: toStringArray(record.genres),
    subgenres: toStringArray(record.subgenres),

    imdbScore: toNumberOrNull(record.imdbScore),
    rottenTomatoesScore: toNumberOrNull(record.rottenTomatoesScore),

    reviewScore,
    stars: calculateStars(reviewScore),
    badgeId: calculateBadgeId(reviewScore, {
      overrideEnabled: badgeOverrideEnabled,
      currentBadgeId,
    }),
    badgeOverrideEnabled,

    watchedDate: toStringValue(record.watchedDate),
    bestOfYear: record.bestOfYear === true,

    assignedLists: toStringArray(record.assignedLists),

    createdAt: toStringValue(record.createdAt, now),
    updatedAt: toStringValue(record.updatedAt, now),
    metadataSourceSnapshot: toNullableString(record.metadataSourceSnapshot),
    metadataLastRefreshedAt: toNullableString(record.metadataLastRefreshedAt),
  };
}

function normalizeMovieList(value: unknown): LibraryMovie[] {
  if (!Array.isArray(value)) return [];

  return dedupeBestOfYearCrowns(
    value
      .map(normalizeLibraryMovie)
      .filter((movie): movie is LibraryMovie => movie !== null)
  );
}

type MovieState = {
  movies: LibraryMovie[];

  addMovie: (movie: LibraryMovie) => void;

  updateMovie: (id: string, updates: Partial<LibraryMovie>) => void;

  removeMovie: (id: string) => void;
};

export const useMovieStore = create<MovieState>()(
  persist(
    (set) => ({
      movies: [],

      addMovie: (movie) =>
        set((state) => {
          const normalizedMovie = normalizeLibraryMovie(movie);

          if (!normalizedMovie) {
            return state;
          }

          const movies = [
            normalizedMovie,
            ...state.movies.filter(
              (m) => m.id !== normalizedMovie.id
            ),
          ];

          return {
            movies: dedupeBestOfYearCrowns(
              enforceBestOfYearCrown(movies, normalizedMovie)
            ),
          };
        }),

      updateMovie: (id, updates) =>
        set((state) => {
          let updatedMovie: LibraryMovie | null = null;

          const movies = state.movies.map((movie) => {
            if (movie.id !== id) return movie;

            updatedMovie = normalizeLibraryMovie({
              ...movie,
              ...updates,
              updatedAt: new Date().toISOString(),
            });

            return updatedMovie ?? movie;
          });

          if (!updatedMovie) {
            return { movies };
          }

          return {
            movies: dedupeBestOfYearCrowns(
              enforceBestOfYearCrown(movies, updatedMovie)
            ),
          };
        }),

      removeMovie: (id) =>
        set((state) => ({
          movies: state.movies.filter(
            (movie) => movie.id !== id
          ),
        })),
    }),
    {
      name: "hma-movies",
      merge: (persistedState, currentState) => {
        const persisted = asRecord(persistedState);

        return {
          ...currentState,
          ...(persisted ?? {}),
          movies: normalizeMovieList(persisted?.movies),
        };
      },
    }
  )
);
