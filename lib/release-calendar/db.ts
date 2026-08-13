import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";
import type { WatchlistMovie } from "@/store/movie-store";

type ReleaseDateMap = {
  theatrical?: string;
  streaming?: string;
  digital?: string;
};

type TmdbReleaseDate = {
  release_date?: string;
  type?: number;
};

type TmdbReleaseCountry = {
  iso_3166_1?: string;
  release_dates?: TmdbReleaseDate[];
};

type TmdbReleaseDatesResponse = {
  results?: TmdbReleaseCountry[];
};

function stringArray(value: Prisma.JsonValue): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function normalizeTmdbDate(value: string | undefined) {
  return typeof value === "string" ? value.slice(0, 10) : "";
}

function releaseDates(value: Prisma.JsonValue): ReleaseDateMap | undefined {
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

function findReleaseDate(
  countries: TmdbReleaseCountry[],
  releaseTypes: number[]
) {
  const orderedCountries = [
    ...countries.filter((country) => country.iso_3166_1 === "US"),
    ...countries.filter((country) => country.iso_3166_1 !== "US"),
  ];

  for (const country of orderedCountries) {
    const matches = (country.release_dates ?? [])
      .filter((date) => releaseTypes.includes(date.type ?? 0))
      .map((date) => normalizeTmdbDate(date.release_date))
      .filter(Boolean)
      .sort();

    if (matches[0]) return matches[0];
  }

  return "";
}

function getMovieReleaseDates(
  payload: TmdbReleaseDatesResponse,
  fallbackTheatrical: string
): ReleaseDateMap {
  const countries = Array.isArray(payload.results) ? payload.results : [];

  return {
    theatrical:
      findReleaseDate(countries, [3, 2]) || normalizeTmdbDate(fallbackTheatrical),
    streaming: findReleaseDate(countries, [6]),
    digital: findReleaseDate(countries, [4]),
  };
}

function hasReleaseInfo(movie: WatchlistMovie) {
  return Boolean(
    movie.releaseDate?.trim() ||
      movie.releaseDates?.theatrical?.trim() ||
      movie.releaseDates?.streaming?.trim() ||
      movie.releaseDates?.digital?.trim()
  );
}

function movieKey(movie: {
  tmdbId: number | null;
  imdbId?: string | null;
  displayTitle: string;
  year: string;
}) {
  if (movie.tmdbId !== null && Number.isFinite(movie.tmdbId)) {
    return `tmdb:${movie.tmdbId}`;
  }

  if (movie.imdbId?.trim()) {
    return `imdb:${movie.imdbId.trim()}`;
  }

  return `title:${movie.displayTitle.trim().toLowerCase()}|${movie.year.trim()}`;
}

async function fetchTmdbReleaseInfo(tmdbId: number) {
  const apiKey = getTmdbApiKey();
  if (!apiKey) return null;

  const [detailsResponse, releaseDatesResponse] = await Promise.all([
    fetch(`${TMDB_API_BASE}/movie/${tmdbId}?api_key=${apiKey}&language=en-US`, {
      cache: "no-store",
    }),
    fetch(`${TMDB_API_BASE}/movie/${tmdbId}/release_dates?api_key=${apiKey}`, {
      cache: "no-store",
    }),
  ]);

  if (!detailsResponse.ok) return null;

  const details = (await detailsResponse.json()) as { release_date?: string };
  const releaseDatesPayload = releaseDatesResponse.ok
    ? ((await releaseDatesResponse.json()) as TmdbReleaseDatesResponse)
    : { results: [] };
  const releaseDate = normalizeTmdbDate(details.release_date);

  return {
    releaseDate,
    releaseDates: getMovieReleaseDates(releaseDatesPayload, releaseDate),
  };
}

async function withReleaseInfo(movie: WatchlistMovie): Promise<WatchlistMovie> {
  if (hasReleaseInfo(movie) || movie.tmdbId === null) return movie;

  const releaseInfo = await fetchTmdbReleaseInfo(movie.tmdbId).catch(() => null);
  if (!releaseInfo) return movie;

  return {
    ...movie,
    releaseDate: releaseInfo.releaseDate,
    releaseDates: releaseInfo.releaseDates,
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

function data(
  movie: WatchlistMovie,
  existing?: Awaited<ReturnType<typeof prisma.releaseCalendarItem.findFirst>>
) {
  const existingReleaseDates = existing ? releaseDates(existing.releaseDates) : undefined;
  const nextReleaseDates = {
    theatrical:
      movie.releaseDates?.theatrical ||
      movie.releaseDate ||
      existingReleaseDates?.theatrical ||
      existing?.releaseDate ||
      "",
    streaming:
      movie.releaseDates?.streaming || existingReleaseDates?.streaming || "",
    digital:
      movie.releaseDates?.digital || existingReleaseDates?.digital || "",
  };

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
    releaseDate: movie.releaseDate || nextReleaseDates.theatrical,
    synopsis: movie.synopsis,
    cast: movie.cast as Prisma.InputJsonValue,
    crew: movie.crew as Prisma.InputJsonValue,
    genres: movie.genres as Prisma.InputJsonValue,
    subgenres: movie.subgenres as Prisma.InputJsonValue,
    imdbScore: movie.imdbScore,
    rottenTomatoesScore: movie.rottenTomatoesScore,
    releaseDates: nextReleaseDates as Prisma.InputJsonValue,
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
  const libraryMovies = await prisma.movie.findMany({
    select: {
      tmdbId: true,
      imdbId: true,
      displayTitle: true,
      year: true,
    },
  });
  const allowedKeys = new Set<string>([
    ...movies.map(movieKey),
    ...libraryMovies.map(movieKey),
  ]);

  const currentItems = await prisma.releaseCalendarItem.findMany({
    select: {
      id: true,
      tmdbId: true,
      imdbId: true,
      displayTitle: true,
      year: true,
    },
  });
  const obsoleteItemIds = currentItems
    .filter((item) => !allowedKeys.has(movieKey(item)))
    .map((item) => item.id);

  if (obsoleteItemIds.length > 0) {
    await prisma.releaseCalendarItem.deleteMany({
      where: { id: { in: obsoleteItemIds } },
    });
  }

  for (const movie of movies) {
    const movieWithReleaseInfo = await withReleaseInfo(movie);
    if (movie.tmdbId !== null) {
      const existing = await prisma.releaseCalendarItem.findUnique({
        where: { tmdbId: movie.tmdbId },
      });
      const itemData = data(movieWithReleaseInfo, existing);
      await prisma.releaseCalendarItem.upsert({
        where: { tmdbId: movie.tmdbId },
        create: itemData,
        update: itemData,
      });
    } else if (movie.imdbId) {
      const existing = await prisma.releaseCalendarItem.findUnique({
        where: { imdbId: movie.imdbId },
      });
      const itemData = data(movieWithReleaseInfo, existing);
      await prisma.releaseCalendarItem.upsert({
        where: { imdbId: movie.imdbId },
        create: itemData,
        update: itemData,
      });
    }
  }

  return getReleaseCalendarMovies();
}
