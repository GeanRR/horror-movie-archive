import { prisma } from "@/lib/db/prisma";
import type {
  PersistedWatchlist,
  PersistedWatchlistMovie,
  WatchlistItemInput,
} from "@/lib/watchlist/types";

type DbWatchlist = {
  id: string;
  name: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
  items: Array<{
    id: string;
    tmdbId: number | null;
    imdbId: string | null;
    displayTitle: string;
    year: string;
    posterUrl: string | null;
    position: number;
    createdAt: Date;
  }>;
};

function movieIdentity(movie: WatchlistItemInput) {
  if (movie.tmdbId !== null && Number.isFinite(movie.tmdbId)) {
    return `tmdb:${movie.tmdbId}`;
  }

  if (movie.imdbId?.trim()) {
    return `imdb:${movie.imdbId.trim()}`;
  }

  return `title:${movie.displayTitle.trim().toLowerCase()}|${movie.year.trim()}`;
}

function sanitizeMovieInput(movie: WatchlistItemInput): WatchlistItemInput | null {
  const displayTitle = movie.displayTitle.trim();
  if (!displayTitle) return null;

  return {
    tmdbId:
      typeof movie.tmdbId === "number" &&
      Number.isFinite(movie.tmdbId) &&
      movie.tmdbId > 0
        ? movie.tmdbId
        : null,
    imdbId: movie.imdbId?.trim() || null,
    displayTitle,
    year: movie.year.trim(),
    posterUrl: movie.posterUrl?.trim() || null,
  };
}

function watchlistMovieFromItem(item: DbWatchlist["items"][number]): PersistedWatchlistMovie {
  return {
    id: item.id,
    tmdbId: item.tmdbId,
    imdbId: item.imdbId ?? undefined,
    displayTitle: item.displayTitle,
    originalTitle: item.displayTitle,
    titlePt: item.displayTitle,
    year: item.year,
    posterUrl: item.posterUrl ?? undefined,
    director: "",
    country: "",
    distributor: "",
    runtime: null,
    releaseDate: "",
    synopsis: "",
    cast: [],
    crew: [],
    genres: [],
    subgenres: [],
    imdbScore: null,
    rottenTomatoesScore: null,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.createdAt.toISOString(),
    metadataSourceSnapshot: "watchlist-db",
    metadataLastRefreshedAt: null,
  };
}

function serializeWatchlist(list: DbWatchlist): PersistedWatchlist {
  return {
    id: list.id,
    name: list.name,
    position: list.position,
    movies: [...list.items]
      .sort((a, b) => a.position - b.position)
      .map(watchlistMovieFromItem),
    createdAt: list.createdAt.toISOString(),
    updatedAt: list.updatedAt.toISOString(),
  };
}

export async function getWatchlists(): Promise<PersistedWatchlist[]> {
  const lists = await prisma.watchlist.findMany({
    orderBy: [{ position: "asc" }, { createdAt: "desc" }],
    include: {
      items: {
        orderBy: { position: "asc" },
      },
    },
  });

  return lists.map(serializeWatchlist);
}

export async function createWatchlist(name: string) {
  const minPosition = await prisma.watchlist
    .aggregate({ _min: { position: true } })
    .then((result) => result._min.position ?? 0);
  const list = await prisma.watchlist.create({
    data: { name: name.trim(), position: minPosition - 1 },
    include: { items: true },
  });

  return serializeWatchlist(list);
}

export async function updateWatchlist(id: string, name: string) {
  const list = await prisma.watchlist.update({
    where: { id },
    data: { name: name.trim() },
    include: {
      items: {
        orderBy: { position: "asc" },
      },
    },
  });

  return serializeWatchlist(list);
}

export async function deleteWatchlist(id: string) {
  await prisma.watchlist.delete({ where: { id } });
}

export async function reorderWatchlist(
  id: string,
  direction: "up" | "down"
) {
  const lists = await prisma.watchlist.findMany({
    orderBy: [{ position: "asc" }, { createdAt: "desc" }],
  });

  const currentIndex = lists.findIndex((list) => list.id === id);
  const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= lists.length) {
    return getWatchlists();
  }

  const current = lists[currentIndex];
  const next = lists[nextIndex];

  await prisma.$transaction([
    prisma.watchlist.update({
      where: { id: current.id },
      data: { position: next.position },
    }),
    prisma.watchlist.update({
      where: { id: next.id },
      data: { position: current.position },
    }),
  ]);

  return getWatchlists();
}

export async function addMovieToWatchlist(
  watchlistId: string,
  movie: WatchlistItemInput
) {
  const sanitizedMovie = sanitizeMovieInput(movie);
  if (!sanitizedMovie) {
    throw new Error("Movie title is required.");
  }

  const currentItems = await prisma.watchlistItem.findMany({
    where: { watchlistId },
    select: {
      tmdbId: true,
      imdbId: true,
      displayTitle: true,
      year: true,
      position: true,
    },
  });

  const nextIdentity = movieIdentity(sanitizedMovie);
  const alreadyExists = currentItems.some((item) =>
    movieIdentity({
      tmdbId: item.tmdbId,
      imdbId: item.imdbId,
      displayTitle: item.displayTitle,
      year: item.year,
      posterUrl: null,
    }) === nextIdentity
  );

  if (!alreadyExists) {
    const minPosition = currentItems.reduce(
      (min, item) => Math.min(min, item.position),
      0
    );

    await prisma.watchlistItem.create({
      data: {
        watchlistId,
        tmdbId: sanitizedMovie.tmdbId,
        imdbId: sanitizedMovie.imdbId,
        displayTitle: sanitizedMovie.displayTitle,
        year: sanitizedMovie.year,
        posterUrl: sanitizedMovie.posterUrl,
        position: minPosition - 1,
      },
    });
  }

  return getWatchlistOrThrow(watchlistId);
}

export async function removeMovieFromWatchlist(
  watchlistId: string,
  itemId: string
) {
  await prisma.watchlistItem.deleteMany({
    where: {
      id: itemId,
      watchlistId,
    },
  });

  return getWatchlistOrThrow(watchlistId);
}

export async function reorderWatchlistMovie(
  watchlistId: string,
  itemId: string,
  direction: "up" | "down"
) {
  const items = await prisma.watchlistItem.findMany({
    where: { watchlistId },
    orderBy: { position: "asc" },
  });

  const currentIndex = items.findIndex((item) => item.id === itemId);
  const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= items.length) {
    return getWatchlistOrThrow(watchlistId);
  }

  const current = items[currentIndex];
  const next = items[nextIndex];

  await prisma.$transaction([
    prisma.watchlistItem.update({
      where: { id: current.id },
      data: { position: next.position },
    }),
    prisma.watchlistItem.update({
      where: { id: next.id },
      data: { position: current.position },
    }),
  ]);

  return getWatchlistOrThrow(watchlistId);
}

async function getWatchlistOrThrow(id: string) {
  const list = await prisma.watchlist.findUnique({
    where: { id },
    include: {
      items: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!list) {
    throw new Error("Watchlist not found.");
  }

  return serializeWatchlist(list);
}
