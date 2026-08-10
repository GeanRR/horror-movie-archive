import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { calculateBadgeId } from "@/lib/movie-engines/badge-engine";
import { calculateStars } from "@/lib/movie-engines/stars-engine";
import type { LibraryMovie, RewatchEntry } from "@/store/movie-store";

function stringArray(value: Prisma.JsonValue): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function rewatchHistory(value: Prisma.JsonValue): RewatchEntry[] {
  return Array.isArray(value)
    ? value.filter(
        (item): item is RewatchEntry =>
          typeof item === "object" &&
          item !== null &&
          "id" in item &&
          "watchedDate" in item &&
          "recordedAt" in item
      )
    : [];
}

function jsonArray(value: string[]) {
  return value as Prisma.InputJsonValue;
}

function jsonRewatch(value: RewatchEntry[]) {
  return value as unknown as Prisma.InputJsonValue;
}

function serializeMovie(
  movie: Awaited<ReturnType<typeof prisma.movie.findFirst>>
): LibraryMovie | null {
  if (!movie) return null;

  return {
    id: movie.id,
    tmdbId: movie.tmdbId,
    imdbId: movie.imdbId ?? undefined,
    displayTitle: movie.displayTitle,
    originalTitle: movie.originalTitle,
    titlePt: movie.titlePt,
    year: movie.year,
    posterUrl: movie.posterUrl ?? undefined,
    director: movie.director,
    country: movie.country,
    distributor: movie.distributor,
    runtime: movie.runtime,
    releaseDate: movie.releaseDate,
    synopsis: movie.synopsis,
    cast: stringArray(movie.cast),
    crew: stringArray(movie.crew),
    genres: stringArray(movie.genres),
    subgenres: stringArray(movie.subgenres),
    imdbScore: movie.imdbScore,
    rottenTomatoesScore: movie.rottenTomatoesScore,
    reviewScore: movie.reviewScore,
    stars: movie.stars,
    badgeId: movie.badgeId,
    badgeOverrideEnabled: movie.badgeOverrideEnabled,
    watchedDate: movie.watchedDate,
    rewatchHistory: rewatchHistory(movie.rewatchHistory),
    bestOfYear: movie.bestOfYear,
    assignedLists: stringArray(movie.assignedLists),
    createdAt: movie.createdAt.toISOString(),
    updatedAt: movie.updatedAt.toISOString(),
    metadataSourceSnapshot: movie.metadataSourceSnapshot,
    metadataLastRefreshedAt: movie.metadataLastRefreshedAt,
  };
}

function movieData(movie: LibraryMovie) {
  const reviewScore = movie.reviewScore ?? null;
  const stars = calculateStars(reviewScore);
  const badgeId = calculateBadgeId(reviewScore, {
    overrideEnabled: movie.badgeOverrideEnabled,
    currentBadgeId: movie.badgeId,
  });

  return {
    tmdbId: movie.tmdbId,
    imdbId: movie.imdbId ?? null,
    displayTitle: movie.displayTitle,
    originalTitle: movie.originalTitle,
    titlePt: movie.titlePt,
    year: movie.year,
    posterUrl: movie.posterUrl ?? null,
    director: movie.director,
    country: movie.country,
    distributor: movie.distributor,
    runtime: movie.runtime,
    releaseDate: movie.releaseDate,
    synopsis: movie.synopsis,
    cast: jsonArray(movie.cast),
    crew: jsonArray(movie.crew),
    genres: jsonArray(movie.genres),
    subgenres: jsonArray(movie.subgenres),
    imdbScore: movie.imdbScore,
    rottenTomatoesScore: movie.rottenTomatoesScore,
    reviewScore,
    stars,
    badgeId,
    badgeOverrideEnabled: movie.badgeOverrideEnabled,
    watchedDate: movie.watchedDate,
    rewatchHistory: jsonRewatch(movie.rewatchHistory),
    bestOfYear: movie.bestOfYear,
    assignedLists: jsonArray(movie.assignedLists),
    metadataSourceSnapshot: movie.metadataSourceSnapshot,
    metadataLastRefreshedAt: movie.metadataLastRefreshedAt,
  };
}

export async function getMovies() {
  const movies = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });

  return movies.map(serializeMovie).filter((movie): movie is LibraryMovie => movie !== null);
}

export async function getMovieIdentities() {
  return prisma.movie.findMany({
    select: {
      imdbId: true,
      tmdbId: true,
    },
  });
}

export async function upsertMovie(movie: LibraryMovie) {
  const data = movieData(movie);
  const saved = await prisma.movie.upsert({
    where: { tmdbId: movie.tmdbId },
    create: {
      id: movie.id,
      ...data,
      createdAt: new Date(movie.createdAt),
      updatedAt: new Date(movie.updatedAt),
    },
    update: data,
  });

  return serializeMovie(saved);
}

export async function updateMovie(id: string, updates: Partial<LibraryMovie>) {
  const current = await prisma.movie.findUnique({ where: { id } });
  if (!current) throw new Error("Movie not found.");

  const serialized = serializeMovie(current);
  if (!serialized) throw new Error("Movie not found.");

  const next = {
    ...serialized,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  const saved = await prisma.movie.update({
    where: { id },
    data: movieData(next),
  });

  return serializeMovie(saved);
}

export async function deleteMovie(id: string) {
  await prisma.movie.delete({ where: { id } });
}
