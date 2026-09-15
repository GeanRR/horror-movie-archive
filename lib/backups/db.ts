import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

const MAX_BACKUP_SNAPSHOTS = 30;

export type BackupSnapshotSummary = {
  id: string;
  reason: string;
  createdAt: string;
};

async function pruneOldBackups() {
  const oldBackups = await prisma.backupSnapshot.findMany({
    orderBy: { createdAt: "desc" },
    skip: MAX_BACKUP_SNAPSHOTS,
    select: { id: true },
  });

  if (oldBackups.length === 0) return;

  await prisma.backupSnapshot.deleteMany({
    where: {
      id: {
        in: oldBackups.map((backup) => backup.id),
      },
    },
  });
}

export async function createBackupSnapshot(reason: string) {
  const [
    movies,
    watchlists,
    watchlistItems,
    awaitingReviewItems,
    releaseCalendarItems,
    tmdbMovieCreditsCache,
    stremioWatchedSyncStates,
    stremioWatchedStates,
    stremioWatchedEvents,
  ] = await Promise.all([
    prisma.movie.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.watchlist.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.watchlistItem.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.awaitingReviewItem.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.releaseCalendarItem.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.tmdbMovieCreditsCache.findMany({ orderBy: { tmdbId: "asc" } }),
    prisma.stremioWatchedSyncState.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.stremioWatchedState.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.stremioWatchedEvent.findMany({ orderBy: { detectedAt: "asc" } }),
  ]);

  const payload = JSON.parse(
    JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      tables: {
        movies,
        watchlists,
        watchlistItems,
        awaitingReviewItems,
        releaseCalendarItems,
        tmdbMovieCreditsCache,
        stremioWatchedSyncStates,
        stremioWatchedStates,
        stremioWatchedEvents,
      },
    })
  ) as Prisma.InputJsonValue;

  const snapshot = await prisma.backupSnapshot.create({
    data: {
      reason,
      payload,
    },
    select: {
      id: true,
      reason: true,
      createdAt: true,
    },
  });

  await pruneOldBackups();

  return {
    id: snapshot.id,
    reason: snapshot.reason,
    createdAt: snapshot.createdAt.toISOString(),
  };
}

export async function listBackupSnapshots(): Promise<BackupSnapshotSummary[]> {
  const snapshots = await prisma.backupSnapshot.findMany({
    orderBy: { createdAt: "desc" },
    take: MAX_BACKUP_SNAPSHOTS,
    select: {
      id: true,
      reason: true,
      createdAt: true,
    },
  });

  return snapshots.map((snapshot) => ({
    id: snapshot.id,
    reason: snapshot.reason,
    createdAt: snapshot.createdAt.toISOString(),
  }));
}
