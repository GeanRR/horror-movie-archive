import "server-only";

import { Prisma } from "@prisma/client";
import {
  enqueueWatchedMovieForReview,
  type ExistingMovieIdentity,
} from "@/lib/awaiting-review/db";
import { isDatabaseConfigured, prisma } from "@/lib/db/prisma";
import {
  getStremioAuthKey,
  STREMIO_API_BASE_URL,
  STREMIO_WATCHED_SYNC_STATE_ID,
} from "@/lib/stremio/watched-config";

type JsonRecord = Record<string, unknown>;

type Snapshot = {
  lastWatched: string | null;
  timesWatched: number | null;
  timeWatched: number | null;
  timeOffset: number | null;
  overallTimeWatched: number | null;
  flaggedWatched: boolean | null;
  duration: number | null;
  watched: boolean | null;
  isCompleted: boolean;
};

type NormalizedStremioMovieState = {
  imdbId: string;
  type: "movie";
  name: string | null;
  lastWatched: Date | null;
  timesWatched: number | null;
  timeWatched: number | null;
  timeOffset: number | null;
  overallTimeWatched: number | null;
  flaggedWatched: boolean | null;
  duration: number | null;
  watched: boolean | null;
  isCompleted: boolean;
  completionSource: string | null;
};

type WatchlistScopeItem = {
  imdbId: string;
  tmdbId: number | null;
  displayTitle: string;
  year: string;
  posterUrl: string | null;
};

function isValidImdbId(value: unknown): value is string {
  return typeof value === "string" && /^tt\d{7,}$/.test(value);
}

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

function asNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function asBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  if (value === 1 || value === "1" || value === "true") return true;
  if (value === 0 || value === "0" || value === "false") return false;
  return null;
}

function asDate(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function deepFindValue(
  value: unknown,
  keys: string[],
  depth = 0,
  seen = new Set<unknown>()
): unknown {
  if (depth > 8 || value === null || value === undefined) return null;
  if (typeof value !== "object") return null;
  if (seen.has(value)) return null;
  seen.add(value);

  const record = asRecord(value);
  if (record) {
    for (const key of keys) {
      if (record[key] !== undefined && record[key] !== null) return record[key];
    }
    for (const nested of Object.values(record)) {
      const result = deepFindValue(nested, keys, depth + 1, seen);
      if (result !== null && result !== undefined) return result;
    }
  }

  if (Array.isArray(value)) {
    for (const nested of value) {
      const result = deepFindValue(nested, keys, depth + 1, seen);
      if (result !== null && result !== undefined) return result;
    }
  }

  return null;
}

function findImdbId(value: unknown, depth = 0): string | null {
  if (depth > 8 || value === null || value === undefined) return null;
  if (typeof value === "string") {
    const match = value.match(/tt\d{7,}/);
    return match?.[0] ?? null;
  }
  if (typeof value !== "object") return null;

  const record = asRecord(value);
  if (record) {
    const direct = record.imdbId ?? record.imdb_id ?? record.id ?? record._id;
    if (isValidImdbId(direct)) return direct;
    if (typeof direct === "string") {
      const match = direct.match(/tt\d{7,}/);
      if (match) return match[0];
    }
    for (const nested of Object.values(record)) {
      const result = findImdbId(nested, depth + 1);
      if (result) return result;
    }
  }

  if (Array.isArray(value)) {
    for (const nested of value) {
      const result = findImdbId(nested, depth + 1);
      if (result) return result;
    }
  }

  return null;
}

function findRecordType(record: JsonRecord) {
  const direct = deepFindValue(record, ["type"]);
  if (direct === "movie") return "movie";

  const serializedIds = [record.id, record._id]
    .filter((value): value is string => typeof value === "string")
    .join(" ");
  if (serializedIds.includes("movie:tt") || serializedIds.includes("movie/tt")) {
    return "movie";
  }

  return null;
}

function findName(record: JsonRecord) {
  const candidate = deepFindValue(record, ["name", "title"]);
  return typeof candidate === "string" && candidate.trim()
    ? candidate.trim()
    : null;
}

function findWatchedField(record: JsonRecord, key: string) {
  return deepFindValue(record, [key]);
}

function getCompletion(
  state: Pick<
    NormalizedStremioMovieState,
    | "watched"
    | "flaggedWatched"
    | "timesWatched"
    | "lastWatched"
    | "overallTimeWatched"
    | "duration"
  >
) {
  if (state.watched === true) {
    return { isCompleted: true, completionSource: "watched" };
  }
  if (state.flaggedWatched === true) {
    return { isCompleted: true, completionSource: "flaggedWatched" };
  }
  if ((state.timesWatched ?? 0) > 0) {
    return { isCompleted: true, completionSource: "timesWatched" };
  }

  const duration = state.duration ?? 0;
  const watchedTime = state.overallTimeWatched ?? 0;
  if (duration > 0 && watchedTime >= duration * 0.9 && state.lastWatched) {
    return { isCompleted: true, completionSource: "overallTimeWatched>=90%" };
  }

  return { isCompleted: false, completionSource: null };
}

function normalizeLibraryItem(record: JsonRecord): NormalizedStremioMovieState | null {
  if (findRecordType(record) !== "movie") return null;

  const imdbId = findImdbId(record);
  if (!imdbId) return null;

  const base = {
    imdbId,
    type: "movie" as const,
    name: findName(record),
    lastWatched: asDate(findWatchedField(record, "lastWatched")),
    timesWatched: asNumber(findWatchedField(record, "timesWatched")),
    timeWatched: asNumber(findWatchedField(record, "timeWatched")),
    timeOffset: asNumber(findWatchedField(record, "timeOffset")),
    overallTimeWatched: asNumber(findWatchedField(record, "overallTimeWatched")),
    flaggedWatched: asBoolean(findWatchedField(record, "flaggedWatched")),
    duration: asNumber(findWatchedField(record, "duration")),
    watched: asBoolean(findWatchedField(record, "watched")),
  };
  const completion = getCompletion(base);

  return {
    ...base,
    ...completion,
  };
}

function extractLibraryItems(payload: unknown) {
  const root = asRecord(payload);
  const candidates = [
    root?.result,
    root?.items,
    root?.data,
    root?.result && asRecord(root.result)?.items,
    root?.result && asRecord(root.result)?.data,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate
        .map(asRecord)
        .filter((item): item is JsonRecord => item !== null);
    }
    const record = asRecord(candidate);
    if (record) {
      return Object.values(record)
        .map(asRecord)
        .filter((item): item is JsonRecord => item !== null);
    }
  }

  return [];
}

async function postDatastoreGet(authKey: string, body: JsonRecord) {
  const endpoint = `${STREMIO_API_BASE_URL.replace(/\/$/, "")}/datastoreGet`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authKey, collection: "libraryItem", ...body }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Stremio datastoreGet failed with ${response.status}.`);
  }

  return (await response.json()) as unknown;
}

async function fetchStremioLibraryItems(authKey: string) {
  const payload = await postDatastoreGet(authKey, { all: true });
  return extractLibraryItems(payload);
}

async function getWatchlistScope() {
  const items = await prisma.watchlistItem.findMany({
    where: {
      imdbId: {
        not: null,
      },
    },
    select: {
      imdbId: true,
      tmdbId: true,
      displayTitle: true,
      year: true,
      posterUrl: true,
    },
    orderBy: { position: "asc" },
  });

  const moviesByImdbId = new Map<string, WatchlistScopeItem>();

  for (const item of items) {
    if (!isValidImdbId(item.imdbId)) continue;
    if (moviesByImdbId.has(item.imdbId)) continue;

    moviesByImdbId.set(item.imdbId, {
      imdbId: item.imdbId,
      tmdbId: item.tmdbId,
      displayTitle: item.displayTitle,
      year: item.year,
      posterUrl: item.posterUrl,
    });
  }

  return {
    imdbIds: new Set(moviesByImdbId.keys()),
    moviesByImdbId,
  };
}

function snapshotFromStored(
  previous: Awaited<ReturnType<typeof prisma.stremioWatchedState.findUnique>>
): Snapshot | null {
  if (!previous) return null;
  return {
    lastWatched: previous.lastWatched?.toISOString() ?? null,
    timesWatched: previous.timesWatched,
    timeWatched: previous.timeWatched,
    timeOffset: previous.timeOffset,
    overallTimeWatched: previous.overallTimeWatched,
    flaggedWatched: previous.flaggedWatched,
    duration: previous.duration,
    watched: previous.watched,
    isCompleted: previous.isCompleted,
  };
}

function snapshotFromCurrent(current: NormalizedStremioMovieState): Snapshot {
  return {
    lastWatched: current.lastWatched?.toISOString() ?? null,
    timesWatched: current.timesWatched,
    timeWatched: current.timeWatched,
    timeOffset: current.timeOffset,
    overallTimeWatched: current.overallTimeWatched,
    flaggedWatched: current.flaggedWatched,
    duration: current.duration,
    watched: current.watched,
    isCompleted: current.isCompleted,
  };
}

function classifyTransition(
  previous: Snapshot | null,
  current: Snapshot,
  hasCompletedInitialSync: boolean,
  completionSource: string | null
) {
  if (!hasCompletedInitialSync) {
    return {
      isNewlyWatched: false,
      reason: "Baseline sync only. Current state stored for future comparison.",
    };
  }

  if (!previous) {
    return current.isCompleted
      ? {
          isNewlyWatched: true,
          reason: `New completed movie observed via ${completionSource ?? "unknown"}.`,
        }
      : {
          isNewlyWatched: false,
          reason: "New movie is not completed.",
        };
  }

  if (current.watched === true && previous.watched !== true) {
    return { isNewlyWatched: true, reason: "watched changed to true." };
  }

  if (current.flaggedWatched === true && previous.flaggedWatched !== true) {
    return { isNewlyWatched: true, reason: "flaggedWatched changed to true." };
  }

  const previousTimes = previous.timesWatched ?? 0;
  const currentTimes = current.timesWatched ?? 0;
  if (currentTimes > previousTimes) {
    return {
      isNewlyWatched: true,
      reason: `timesWatched increased from ${previousTimes} to ${currentTimes}.`,
    };
  }

  if (
    current.isCompleted &&
    !previous.isCompleted &&
    current.lastWatched !== previous.lastWatched
  ) {
    return {
      isNewlyWatched: true,
      reason: `Completed transition with lastWatched change via ${
        completionSource ?? "unknown"
      }.`,
    };
  }

  if (!current.isCompleted) {
    return {
      isNewlyWatched: false,
      reason:
        "Observed playback state changed, but no reliable completion signal was present.",
    };
  }

  return {
    isNewlyWatched: false,
    reason: "Movie is completed, but no new completion transition was detected.",
  };
}

async function getSyncState() {
  return prisma.stremioWatchedSyncState.upsert({
    where: { id: STREMIO_WATCHED_SYNC_STATE_ID },
    create: { id: STREMIO_WATCHED_SYNC_STATE_ID },
    update: {},
  });
}

async function runInChunks<T>(
  items: T[],
  size: number,
  callback: (item: T) => Promise<unknown>
) {
  for (let index = 0; index < items.length; index += size) {
    await Promise.all(items.slice(index, index + size).map(callback));
  }
}

export async function runStremioWatchedSync(
  existingMovies: ExistingMovieIdentity[] = []
) {
  if (!isDatabaseConfigured()) {
    return {
      ok: false,
      error: "Database is not configured.",
      scanned: 0,
      trackedMovies: 0,
      newlyWatched: [],
      workflowSummary: {
        queuedMovies: 0,
        alreadyQueuedMovies: 0,
        alreadyInLibraryMovies: 0,
        removedWatchlistItems: 0,
      },
    };
  }

  const authKey = getStremioAuthKey();
  if (!authKey) {
    return {
      ok: false,
      error: "STREMIO_AUTH_KEY is not configured.",
      scanned: 0,
      trackedMovies: 0,
      newlyWatched: [],
      workflowSummary: {
        queuedMovies: 0,
        alreadyQueuedMovies: 0,
        alreadyInLibraryMovies: 0,
        removedWatchlistItems: 0,
      },
    };
  }

  const syncState = await getSyncState();

  try {
    const watchlistScope = await getWatchlistScope();
    const watchlistImdbIds = watchlistScope.imdbIds;
    const watchlistIdList = [...watchlistImdbIds];
    const existingStateCount =
      watchlistIdList.length > 0
        ? await prisma.stremioWatchedState.count({
            where: {
              imdbId: {
                in: watchlistIdList,
              },
            },
          })
        : 0;
    const isBaselineSync =
      !syncState.hasCompletedInitialSync || existingStateCount === 0;
    const rawItems = await fetchStremioLibraryItems(authKey);
    const movies = rawItems
      .map(normalizeLibraryItem)
      .filter(
        (item): item is NormalizedStremioMovieState =>
          item !== null && watchlistImdbIds.has(item.imdbId)
      );
    const previousStates = await prisma.stremioWatchedState.findMany({
      where: {
        imdbId: {
          in: watchlistIdList,
        },
      },
    });
    const previousByImdbId = new Map(
      previousStates.map((state) => [state.imdbId, state])
    );

    const newlyWatched = [];
    const workflowSummary = {
      queuedMovies: 0,
      alreadyQueuedMovies: 0,
      alreadyInLibraryMovies: 0,
      removedWatchlistItems: 0,
    };
    const stateWrites = [];
    const eventWrites: Prisma.StremioWatchedEventCreateManyInput[] = [];

    for (const movie of movies) {
      const previous = previousByImdbId.get(movie.imdbId) ?? null;
      const previousSnapshot = snapshotFromStored(previous);
      const currentSnapshot = snapshotFromCurrent(movie);
      const classification = classifyTransition(
        previousSnapshot,
        currentSnapshot,
        !isBaselineSync,
        movie.completionSource
      );

      const stateData = {
        type: movie.type,
        name: movie.name,
        lastWatched: movie.lastWatched,
        timesWatched: movie.timesWatched,
        timeWatched: movie.timeWatched,
        timeOffset: movie.timeOffset,
        overallTimeWatched: movie.overallTimeWatched,
        flaggedWatched: movie.flaggedWatched,
        duration: movie.duration,
        watched: movie.watched,
        isCompleted: movie.isCompleted,
      };
      stateWrites.push({
        imdbId: movie.imdbId,
        data: stateData,
      });

      if (classification.isNewlyWatched) {
        eventWrites.push({
          imdbId: movie.imdbId,
          name: movie.name,
          lastWatched: movie.lastWatched,
          timesWatched: movie.timesWatched,
          completionSource: movie.completionSource ?? "unknown",
          previous: previousSnapshot
            ? (previousSnapshot as Prisma.InputJsonValue)
            : Prisma.JsonNull,
          current: currentSnapshot as Prisma.InputJsonValue,
        });
        newlyWatched.push({
          id: movie.imdbId,
          imdbId: movie.imdbId,
          name: movie.name,
          lastWatched: movie.lastWatched?.toISOString() ?? null,
          timesWatched: movie.timesWatched,
        });
      }
    }

    for (const movie of newlyWatched) {
      const watchlistMovie = watchlistScope.moviesByImdbId.get(movie.imdbId);
      if (!watchlistMovie) continue;

      const queueResult = await enqueueWatchedMovieForReview(
        {
          imdbId: movie.imdbId,
          tmdbId: watchlistMovie.tmdbId,
          displayTitle: watchlistMovie.displayTitle || movie.name || movie.imdbId,
          year: watchlistMovie.year,
          posterUrl: watchlistMovie.posterUrl,
          watchedAt: movie.lastWatched ? new Date(movie.lastWatched) : new Date(),
          source: "Stremio watched sync",
        },
        existingMovies
      );

      const deleteResult = await prisma.watchlistItem.deleteMany({
        where: { imdbId: movie.imdbId },
      });

      if (queueResult.action === "queued") workflowSummary.queuedMovies += 1;
      if (queueResult.action === "alreadyQueued") {
        workflowSummary.alreadyQueuedMovies += 1;
      }
      if (queueResult.action === "alreadyInLibrary") {
        workflowSummary.alreadyInLibraryMovies += 1;
      }
      workflowSummary.removedWatchlistItems += deleteResult.count;
    }

    await runInChunks(stateWrites, 25, ({ imdbId, data }) =>
      prisma.stremioWatchedState.upsert({
        where: { imdbId },
        create: {
          imdbId,
          ...data,
        },
        update: data,
      })
    );

    if (eventWrites.length > 0) {
      await prisma.stremioWatchedEvent.createMany({
        data: eventWrites,
      });
    }

    await prisma.stremioWatchedSyncState.update({
      where: { id: STREMIO_WATCHED_SYNC_STATE_ID },
      data: {
        hasCompletedInitialSync: true,
        lastSyncedAt: new Date(),
        lastSyncError: null,
      },
    });

    return {
      ok: true,
      scanned: watchlistImdbIds.size,
      trackedMovies: movies.length,
      baseline: isBaselineSync,
      newlyWatched,
      workflowSummary,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Stremio watched sync failed.";

    await prisma.stremioWatchedSyncState.update({
      where: { id: STREMIO_WATCHED_SYNC_STATE_ID },
      data: {
        lastSyncedAt: new Date(),
        lastSyncError: message,
      },
    });

    return {
      ok: false,
      error: message,
      scanned: 0,
      trackedMovies: 0,
      newlyWatched: [],
      workflowSummary: {
        queuedMovies: 0,
        alreadyQueuedMovies: 0,
        alreadyInLibraryMovies: 0,
        removedWatchlistItems: 0,
      },
    };
  }
}

export async function getStremioWatchedSyncState() {
  if (!isDatabaseConfigured()) {
    return {
      ok: true,
      state: {
        configured: false,
        lastSyncedAt: null,
        lastSyncError: "Database is not configured.",
      },
    };
  }

  const state = await getSyncState();

  return {
    ok: true,
    state: {
      configured: Boolean(getStremioAuthKey()),
      lastSyncedAt: state.lastSyncedAt?.toISOString() ?? null,
      lastSyncError: state.lastSyncError,
    },
  };
}
