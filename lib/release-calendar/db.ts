import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import type { WatchlistMovie } from "@/store/movie-store";

function stringArray(value: Prisma.JsonValue): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function releaseDates(value: Prisma.JsonValue) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  return {
    theatrical: typeof record.theatrical === "string" ? record.theatrical : "",
    streaming: typeof record.streaming === "string" ? record.streaming : "",
    digital: typeof record.digital === "string" ? record.digital : "",
  };
}

function serialize(
  item: Awaited<ReturnType<typeof prisma.releaseCalendarItem.findFirst>>
): WatchlistMovie | null {
  if (!item) return null;

  return {
    id: item.id,
    tmdbId: item.tmdbId,
    imdbId: item.imdbId ?? undefined,
    displayTitle: item.displayTitle,
    originalTitle: item.originalTitle,
    titlePt: item.titlePt,
    year: item.year,
    posterUrl: item.posterUrl ?? undefined,
    director: item.director,
    country: item.country,
    distributor: item.distributor,
    runtime: item.runtime,
    releaseDate: item.releaseDate,
    synopsis: item.synopsis,
    cast: stringArray(item.cast),
    crew: stringArray(item.crew),
    genres: stringArray(item.genres),
    subgenres: stringArray(item.subgenres),
    imdbScore: item.imdbScore,
    rottenTomatoesScore: item.rottenTomatoesScore,
    releaseDates: releaseDates(item.releaseDates),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    metadataSourceSnapshot: item.metadataSourceSnapshot,
    metadataLastRefreshedAt: item.metadataLastRefreshedAt,
  };
}

function data(movie: WatchlistMovie) {
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
    cast: movie.cast as Prisma.InputJsonValue,
    crew: movie.crew as Prisma.InputJsonValue,
    genres: movie.genres as Prisma.InputJsonValue,
    subgenres: movie.subgenres as Prisma.InputJsonValue,
    imdbScore: movie.imdbScore,
    rottenTomatoesScore: movie.rottenTomatoesScore,
    releaseDates: (movie.releaseDates ?? {}) as Prisma.InputJsonValue,
    metadataSourceSnapshot: movie.metadataSourceSnapshot,
    metadataLastRefreshedAt: movie.metadataLastRefreshedAt,
  };
}

export async function getReleaseCalendarMovies() {
  const items = await prisma.releaseCalendarItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return items.map(serialize).filter((movie): movie is WatchlistMovie => movie !== null);
}

export async function addReleaseCalendarMovies(movies: WatchlistMovie[]) {
  for (const movie of movies) {
    const itemData = data(movie);
    if (movie.tmdbId !== null) {
      await prisma.releaseCalendarItem.upsert({
        where: { tmdbId: movie.tmdbId },
        create: itemData,
        update: itemData,
      });
    } else if (movie.imdbId) {
      await prisma.releaseCalendarItem.upsert({
        where: { imdbId: movie.imdbId },
        create: itemData,
        update: itemData,
      });
    }
  }

  return getReleaseCalendarMovies();
}
