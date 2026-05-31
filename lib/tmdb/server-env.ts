import "server-only";

/**
 * TMDB API key — server-only.
 * Loaded from .env.local as TMDB_API_KEY (restart dev server after changes).
 */
export function getTmdbApiKey(): string | undefined {
  const key = process.env.TMDB_API_KEY;
  if (typeof key !== "string") return undefined;
  const trimmed = key.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
