import "server-only";

import { prisma } from "@/lib/db/prisma";

export type ExistingMovieIdentity = {
  imdbId?: string | null;
  tmdbId?: number | null;
};

export type AwaitingReviewMovieInput = {
  imdbId: string;
  tmdbId?: number | null;
  displayTitle: string;
  year?: string | null;
  posterUrl?: string | null;
  watchedAt?: Date | null;
  source: string;
};

export type AwaitingReviewResult =
  | {
      action: "queued";
      itemId: string;
    }
  | {
      action: "alreadyQueued";
      itemId: string;
    }
  | {
      action: "alreadyInLibrary";
    };

function isSameLibraryMovie(
  movie: AwaitingReviewMovieInput,
  existingMovies: ExistingMovieIdentity[]
) {
  return existingMovies.some((existing) => {
    if (movie.imdbId && existing.imdbId === movie.imdbId) return true;
    if (
      movie.tmdbId !== null &&
      movie.tmdbId !== undefined &&
      existing.tmdbId === movie.tmdbId
    ) {
      return true;
    }

    return false;
  });
}

export async function enqueueWatchedMovieForReview(
  movie: AwaitingReviewMovieInput,
  existingMovies: ExistingMovieIdentity[]
): Promise<AwaitingReviewResult> {
  if (isSameLibraryMovie(movie, existingMovies)) {
    return { action: "alreadyInLibrary" };
  }

  const existing = await prisma.awaitingReviewItem.findUnique({
    where: { imdbId: movie.imdbId },
  });

  if (existing) {
    if (existing.status === "PENDING" && !existing.watchedAt && movie.watchedAt) {
      await prisma.awaitingReviewItem.update({
        where: { id: existing.id },
        data: {
          watchedAt: movie.watchedAt,
          source: movie.source,
        },
      });
    }

    if (existing.status !== "PENDING") {
      await prisma.awaitingReviewItem.update({
        where: { id: existing.id },
        data: {
          status: "PENDING",
          resolvedAt: null,
          watchedAt: movie.watchedAt ?? existing.watchedAt,
          source: movie.source,
        },
      });
    }

    return { action: "alreadyQueued", itemId: existing.id };
  }

  const item = await prisma.awaitingReviewItem.create({
    data: {
      imdbId: movie.imdbId,
      tmdbId: movie.tmdbId ?? null,
      displayTitle: movie.displayTitle,
      year: movie.year ?? null,
      posterUrl: movie.posterUrl ?? null,
      watchedAt: movie.watchedAt ?? null,
      source: movie.source,
    },
  });

  return { action: "queued", itemId: item.id };
}

export async function getAwaitingReviewQueue() {
  const items = await prisma.awaitingReviewItem.findMany({
    where: { status: "PENDING" },
    orderBy: [{ watchedAt: "desc" }, { createdAt: "desc" }],
  });

  return items.map((item) => ({
    id: item.id,
    imdbId: item.imdbId,
    tmdbId: item.tmdbId,
    displayTitle: item.displayTitle,
    year: item.year,
    posterUrl: item.posterUrl,
    watchedAt: item.watchedAt?.toISOString() ?? null,
    source: item.source,
    createdAt: item.createdAt.toISOString(),
  }));
}

export async function markAwaitingReviewItemAdded(id: string) {
  await prisma.awaitingReviewItem.update({
    where: { id },
    data: {
      status: "ADDED",
      resolvedAt: new Date(),
    },
  });
}

export async function ignoreAwaitingReviewItem(id: string) {
  await prisma.awaitingReviewItem.update({
    where: { id },
    data: {
      status: "IGNORED",
      resolvedAt: new Date(),
    },
  });
}
