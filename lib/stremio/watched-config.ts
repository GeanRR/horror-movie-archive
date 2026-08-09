import "server-only";

export const STREMIO_WATCHED_SYNC_STATE_ID = "default";
export const STREMIO_API_BASE_URL =
  process.env.STREMIO_API_BASE_URL?.trim() || "https://api.strem.io/api";

export function getStremioAuthKey() {
  const authKey = process.env.STREMIO_AUTH_KEY?.trim();
  return authKey || null;
}
