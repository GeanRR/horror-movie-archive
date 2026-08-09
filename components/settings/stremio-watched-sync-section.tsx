"use client";

import { useEffect, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMovieStore } from "@/store";

type SyncResult = {
  ok: boolean;
  error?: string;
  scanned?: number;
  trackedMovies?: number;
  newlyWatched?: unknown[];
  workflowSummary?: {
    queuedMovies: number;
    alreadyQueuedMovies: number;
    alreadyInLibraryMovies: number;
    removedWatchlistItems: number;
  };
};

type SyncState = {
  ok: boolean;
  state?: {
    configured: boolean;
    lastSyncedAt: string | null;
    lastSyncError: string | null;
  };
};

function formatDateTime(value?: string | null) {
  if (!value) return "Never";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function StremioWatchedSyncSection() {
  const libraryMovies = useMovieStore((state) => state.movies);
  const [syncState, setSyncState] = useState<SyncState | null>(null);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [manifestUrl, setManifestUrl] = useState(
    "/api/stremio/manifest.json"
  );
  const [copied, setCopied] = useState(false);

  async function loadState() {
    try {
      const response = await fetch("/api/stremio/watched-sync", {
        cache: "no-store",
      });
      setSyncState((await response.json()) as SyncState);
    } catch {
      setSyncState({
        ok: false,
        state: {
          configured: false,
          lastSyncedAt: null,
          lastSyncError: "Unable to load Stremio sync state.",
        },
      });
    }
  }

  useEffect(() => {
    loadState();
    setManifestUrl(`${window.location.origin}/api/stremio/manifest.json`);
  }, []);

  async function runSync() {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/stremio/watched-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          existingMovies: libraryMovies.map((movie) => ({
            imdbId: movie.imdbId ?? null,
            tmdbId: movie.tmdbId,
          })),
        }),
      });
      setResult((await response.json()) as SyncResult);
      await loadState();
    } catch {
      setResult({
        ok: false,
        error: "Unable to sync Stremio watched state.",
      });
    } finally {
      setLoading(false);
    }
  }

  const state = syncState?.state;
  const queuedCount = result?.workflowSummary?.queuedMovies ?? 0;
  const removedCount = result?.workflowSummary?.removedWatchlistItems ?? 0;

  async function copyManifestUrl() {
    try {
      await navigator.clipboard.writeText(manifestUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-[20px] border border-[#e9e3d4]/10 bg-black p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="archive-anton text-2xl uppercase leading-none text-[#e9e3d4]">
            Stremio Watched Sync
          </h4>
          <p className="mt-2 max-w-xl font-sans text-sm text-[#6f6c7a]">
            Sync watched movies from Stremio into Awaiting Review.
          </p>
          <p className="mt-2 font-sans text-sm text-[#8b8795]">
            Status: {state?.configured ? "configured" : "missing auth key"} -
            Last sync: {formatDateTime(state?.lastSyncedAt)}
          </p>
          {state?.lastSyncError && (
            <p className="mt-1 font-sans text-sm text-[#d4b850]">
              {state.lastSyncError}
            </p>
          )}
          {result && (
            <p className="mt-2 font-sans text-sm text-[#8b8795]">
              Scanned {result.scanned ?? 0} watchlist movies. Queued{" "}
              {queuedCount}. Removed {removedCount} watchlist item
              {removedCount === 1 ? "" : "s"}.
            </p>
          )}
          {result?.error && (
            <p className="mt-1 font-sans text-sm text-[#d4b850]">
              {result.error}
            </p>
          )}
          <div className="mt-4 flex max-w-2xl flex-col gap-2">
            <span className="font-sans text-sm text-[#8b8795]">
              Addon manifest URL
            </span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <code className="min-w-0 flex-1 rounded-full bg-[#080808] px-4 py-3 font-sans text-sm text-[#e9e3d4]">
                {manifestUrl}
              </code>
              <Button type="button" onClick={copyManifestUrl}>
                {copied ? (
                  <Check aria-hidden />
                ) : (
                  <Copy aria-hidden />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <p className="font-sans text-sm text-[#6f6c7a]">
              Creating, renaming or deleting Watchlists may require
              reinstalling the addon in Stremio.
            </p>
          </div>
        </div>

        <Button type="button" onClick={runSync} disabled={loading}>
          <RefreshCw className={loading ? "animate-spin" : ""} aria-hidden />
          {loading ? "Syncing" : "Sync Now"}
        </Button>
      </div>
    </div>
  );
}
