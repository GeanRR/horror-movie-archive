"use client";

import { useEffect } from "react";
import { useMovieStore } from "@/store";

const STARTUP_SYNC_KEY = "hma-stremio-watched-startup-sync-v1";

export function StremioStartupSync() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STARTUP_SYNC_KEY) === "done") return;

    const syncTimer = window.setTimeout(() => {
      if (window.sessionStorage.getItem(STARTUP_SYNC_KEY) === "done") return;

      window.sessionStorage.setItem(STARTUP_SYNC_KEY, "done");
      const movies = useMovieStore.getState().movies;

      fetch("/api/stremio/watched-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          existingMovies: movies.map((movie) => ({
            imdbId: movie.imdbId ?? null,
            tmdbId: movie.tmdbId,
          })),
        }),
      })
        .then(() => {
          window.dispatchEvent(new Event("hma-awaiting-review-updated"));
        })
        .catch(() => {
        // Startup sync is best-effort and must never block the app.
        });
    }, 750);

    return () => window.clearTimeout(syncTimer);
  }, []);

  return null;
}
