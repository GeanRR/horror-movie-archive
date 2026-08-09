import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateBadgeId } from "@/lib/movie-engines/badge-engine";
import {
  dedupeBestOfYearCrowns,
  enforceBestOfYearCrown,
} from "@/lib/movie-engines/best-of-year-crown";
import { calculateStars } from "@/lib/movie-engines/stars-engine";
import { normalizePrimarySubgenres } from "@/lib/movie-engines/subgenre-engine";

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
  rewatchHistory: RewatchEntry[];
  bestOfYear: boolean;

  // Organization
  assignedLists: string[];

  // System
  createdAt: string;
  updatedAt: string;
  metadataSourceSnapshot: string | null;
  metadataLastRefreshedAt: string | null;
};

export type RewatchEntry = {
  id: string;
  watchedDate: string;
  recordedAt: string;
};

export type WatchlistMovie = {
  id: string;
  tmdbId: number | null;
  imdbId?: string;
  displayTitle: string;
  originalTitle: string;
  titlePt: string;
  year: string;
  posterUrl?: string;
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
  imdbScore: number | null;
  rottenTomatoesScore: number | null;
  releaseDates?: {
    theatrical?: string;
    streaming?: string;
    digital?: string;
  };
  createdAt: string;
  updatedAt: string;
  metadataSourceSnapshot: string | null;
  metadataLastRefreshedAt: string | null;
};

export type CustomMovieList = {
  id: string;
  name: string;
  movies: WatchlistMovie[];
  createdAt: string;
  updatedAt: string;
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

function normalizeRewatchHistory(value: unknown): RewatchEntry[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item, index) => {
      const record = asRecord(item);
      if (!record) return null;

      const watchedDate = toStringValue(record.watchedDate);
      if (!watchedDate.trim()) return null;

      return {
        id: toStringValue(record.id, `rewatch-${index}-${watchedDate}`),
        watchedDate,
        recordedAt: toStringValue(record.recordedAt, new Date().toISOString()),
      };
    })
    .filter((entry): entry is RewatchEntry => entry !== null);
}

function normalizeTitle(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function createEntityId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function titleCandidates(movie: Pick<LibraryMovie, "displayTitle" | "originalTitle" | "titlePt">) {
  return [movie.displayTitle, movie.originalTitle, movie.titlePt]
    .map(normalizeTitle)
    .filter(Boolean);
}

function isSameMovie(a: LibraryMovie, b: LibraryMovie): boolean {
  if (a.tmdbId === b.tmdbId) return true;

  if (a.imdbId && b.imdbId && a.imdbId === b.imdbId) {
    return true;
  }

  if (a.year && b.year && a.year === b.year) {
    const aTitles = titleCandidates(a);
    const bTitles = titleCandidates(b);
    return aTitles.some((title) => bTitles.includes(title));
  }

  return false;
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
    subgenres: normalizePrimarySubgenres(toStringArray(record.subgenres), {
      title: displayTitle,
      originalTitle,
      genres: toStringArray(record.genres),
      overview: toStringValue(record.synopsis),
    }),

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
    rewatchHistory: normalizeRewatchHistory(record.rewatchHistory),
    bestOfYear: record.bestOfYear === true,

    assignedLists: toStringArray(record.assignedLists),

    createdAt: toStringValue(record.createdAt, now),
    updatedAt: toStringValue(record.updatedAt, now),
    metadataSourceSnapshot: toNullableString(record.metadataSourceSnapshot),
    metadataLastRefreshedAt: toNullableString(record.metadataLastRefreshedAt),
  };
}

export function normalizeMovieList(value: unknown): LibraryMovie[] {
  if (!Array.isArray(value)) return [];

  return dedupeBestOfYearCrowns(
    value
      .map(normalizeLibraryMovie)
      .filter((movie): movie is LibraryMovie => movie !== null)
  );
}

function libraryMovieToWatchlistMovie(movie: LibraryMovie): WatchlistMovie {
  return {
    id: `watch-tmdb-${movie.tmdbId}`,
    tmdbId: movie.tmdbId,
    imdbId: movie.imdbId,
    displayTitle: movie.displayTitle,
    originalTitle: movie.originalTitle,
    titlePt: movie.titlePt,
    year: movie.year,
    posterUrl: movie.posterUrl,
    director: movie.director,
    country: movie.country,
    distributor: movie.distributor,
    runtime: movie.runtime,
    releaseDate: movie.releaseDate,
    synopsis: movie.synopsis,
    cast: movie.cast,
    crew: movie.crew,
    genres: movie.genres,
    subgenres: movie.subgenres,
    imdbScore: movie.imdbScore,
    rottenTomatoesScore: movie.rottenTomatoesScore,
    createdAt: movie.createdAt,
    updatedAt: movie.updatedAt,
    metadataSourceSnapshot: movie.metadataSourceSnapshot,
    metadataLastRefreshedAt: movie.metadataLastRefreshedAt,
  };
}

function normalizeWatchlistMovie(value: unknown): WatchlistMovie | null {
  const record = asRecord(value);
  if (!record) return null;

  const tmdbId = toNumberOrNull(record.tmdbId);
  const imdbId = toOptionalString(record.imdbId);
  const displayTitle = toStringValue(record.displayTitle, "Untitled");

  if (tmdbId === null && !imdbId && !displayTitle.trim()) return null;

  const now = new Date().toISOString();
  const originalTitle = toStringValue(record.originalTitle, displayTitle);

  return {
    id: toStringValue(record.id, tmdbId === null ? createEntityId("watch") : `watch-tmdb-${tmdbId}`),
    tmdbId,
    imdbId,
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
    subgenres: normalizePrimarySubgenres(toStringArray(record.subgenres), {
      title: displayTitle,
      originalTitle,
      genres: toStringArray(record.genres),
      overview: toStringValue(record.synopsis),
    }),
    imdbScore: toNumberOrNull(record.imdbScore),
    rottenTomatoesScore: toNumberOrNull(record.rottenTomatoesScore),
    releaseDates: (() => {
      const releaseDates = asRecord(record.releaseDates);
      if (!releaseDates) {
        return record.releaseDate
          ? { theatrical: toStringValue(record.releaseDate) }
          : undefined;
      }

      return {
        theatrical: toStringValue(releaseDates.theatrical),
        streaming: toStringValue(releaseDates.streaming),
        digital: toStringValue(releaseDates.digital),
      };
    })(),
    createdAt: toStringValue(record.createdAt, now),
    updatedAt: toStringValue(record.updatedAt, now),
    metadataSourceSnapshot: toNullableString(record.metadataSourceSnapshot),
    metadataLastRefreshedAt: toNullableString(record.metadataLastRefreshedAt),
  };
}

function isSameWatchlistMovie(a: WatchlistMovie, b: WatchlistMovie): boolean {
  if (a.tmdbId !== null && b.tmdbId !== null && a.tmdbId === b.tmdbId) {
    return true;
  }

  if (a.imdbId && b.imdbId && a.imdbId === b.imdbId) {
    return true;
  }

  if (a.year && b.year && a.year === b.year) {
    const aTitles = titleCandidates(a);
    const bTitles = titleCandidates(b);
    return aTitles.some((title) => bTitles.includes(title));
  }

  return false;
}

function isWatchlistMovieInLibrary(
  movie: WatchlistMovie,
  libraryMovies: LibraryMovie[]
): boolean {
  return libraryMovies.some((libraryMovie) => {
    if (movie.tmdbId !== null && libraryMovie.tmdbId === movie.tmdbId) {
      return true;
    }

    if (movie.imdbId && libraryMovie.imdbId === movie.imdbId) {
      return true;
    }

    if (movie.year && libraryMovie.year && movie.year === libraryMovie.year) {
      const watchTitles = titleCandidates(movie);
      const libraryTitles = titleCandidates(libraryMovie);
      return watchTitles.some((title) => libraryTitles.includes(title));
    }

    return false;
  });
}

function normalizeCustomMovieList(
  value: unknown,
  moviesById: Map<string, LibraryMovie>
): CustomMovieList | null {
  const record = asRecord(value);
  if (!record) return null;

  const name = toStringValue(record.name).trim();
  if (!name) return null;

  const now = new Date().toISOString();

  return {
    id: toStringValue(record.id, createEntityId("list")),
    name,
    movies: Array.isArray(record.movies)
      ? record.movies
          .map(normalizeWatchlistMovie)
          .filter((movie): movie is WatchlistMovie => movie !== null)
      : toStringArray(record.movieIds)
          .map((movieId) => moviesById.get(movieId))
          .filter((movie): movie is LibraryMovie => movie !== undefined)
          .map(libraryMovieToWatchlistMovie),
    createdAt: toStringValue(record.createdAt, now),
    updatedAt: toStringValue(record.updatedAt, now),
  };
}

export function normalizeCustomMovieLists(
  value: unknown,
  movies: LibraryMovie[]
): CustomMovieList[] {
  if (!Array.isArray(value)) return [];

  const moviesById = new Map(movies.map((movie) => [movie.id, movie]));

  return value
    .map((list) => normalizeCustomMovieList(list, moviesById))
    .filter((list): list is CustomMovieList => list !== null);
}

type MovieState = {
  movies: LibraryMovie[];
  lists: CustomMovieList[];

  addMovie: (movie: LibraryMovie) => void;

  updateMovie: (id: string, updates: Partial<LibraryMovie>) => void;

  removeMovie: (id: string) => void;

  createList: (list: { name: string; movies?: WatchlistMovie[] }) => string;

  updateList: (id: string, updates: { name?: string }) => void;

  deleteList: (id: string) => void;

  addMovieToList: (listId: string, movie: WatchlistMovie) => void;

  removeMovieFromList: (listId: string, movieId: string) => void;

  moveMovieInList: (listId: string, movieId: string, direction: "up" | "down") => void;

  replaceLists: (lists: CustomMovieList[]) => void;
};

export const useMovieStore = create<MovieState>()(
  persist(
    (set) => ({
      movies: [],
      lists: [],

      addMovie: (movie) =>
        set((state) => {
          const normalizedMovie = normalizeLibraryMovie(movie);

          if (!normalizedMovie) {
            return state;
          }

          if (state.movies.some((current) => isSameMovie(current, normalizedMovie))) {
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

      createList: (list) => {
        const now = new Date().toISOString();
        const id = createEntityId("list");

        set((state) => ({
            lists: [
              {
                id,
                name: list.name.trim(),
                movies: (list.movies ?? [])
                  .map(normalizeWatchlistMovie)
                  .filter((movie): movie is WatchlistMovie => movie !== null)
                  .filter(
                    (movie, index, normalizedMovies) =>
                      normalizedMovies.findIndex((current) =>
                        isSameWatchlistMovie(current, movie)
                      ) === index
                  )
                  .filter(
                    (movie) =>
                      !isWatchlistMovieInLibrary(movie, state.movies)
                  ),
                createdAt: now,
                updatedAt: now,
              },
              ...state.lists,
            ],
        }));

        return id;
      },

      updateList: (id, updates) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === id
              ? {
                  ...list,
                  name: updates.name?.trim() || list.name,
                  updatedAt: new Date().toISOString(),
                }
              : list
          ),
        })),

      deleteList: (id) =>
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== id),
        })),

      addMovieToList: (listId, movie) =>
        set((state) => {
          const normalizedMovie = normalizeWatchlistMovie(movie);
          if (!normalizedMovie) return state;

          const existsInLibrary = isWatchlistMovieInLibrary(
            normalizedMovie,
            state.movies
          );

          if (existsInLibrary) return state;

          return {
            lists: state.lists.map((list) =>
              list.id === listId &&
              !list.movies.some((current) =>
                isSameWatchlistMovie(current, normalizedMovie)
              )
                ? {
                    ...list,
                    movies: [normalizedMovie, ...list.movies],
                    updatedAt: new Date().toISOString(),
                  }
                : list
            ),
          };
        }),

      removeMovieFromList: (listId, movieId) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  movies: list.movies.filter((movie) => movie.id !== movieId),
                  updatedAt: new Date().toISOString(),
                }
              : list
          ),
        })),

      moveMovieInList: (listId, movieId, direction) =>
        set((state) => ({
          lists: state.lists.map((list) => {
            if (list.id !== listId) return list;

            const currentIndex = list.movies.findIndex(
              (movie) => movie.id === movieId
            );
            if (currentIndex < 0) return list;

            const nextIndex =
              direction === "up" ? currentIndex - 1 : currentIndex + 1;
            if (nextIndex < 0 || nextIndex >= list.movies.length) {
              return list;
            }

            const movies = [...list.movies];
            [movies[currentIndex], movies[nextIndex]] = [
              movies[nextIndex],
              movies[currentIndex],
            ];

            return {
              ...list,
              movies,
              updatedAt: new Date().toISOString(),
            };
          }),
        })),

      replaceLists: (lists) =>
        set(() => ({
          lists: lists.map((list) => ({
            ...list,
            movies: list.movies
              .map(normalizeWatchlistMovie)
              .filter((movie): movie is WatchlistMovie => movie !== null),
          })),
        })),
    }),
    {
      name: "hma-movies",
      merge: (persistedState, currentState) => {
        const persisted = asRecord(persistedState);

        const movies = normalizeMovieList(persisted?.movies);

        return {
          ...currentState,
          ...(persisted ?? {}),
          movies,
          lists: normalizeCustomMovieLists(persisted?.lists, movies),
        };
      },
    }
  )
);
