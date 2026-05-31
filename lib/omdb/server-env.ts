import "server-only";

export function getOmdbApiKey(): string | undefined {
  const key = process.env.OMDB_API_KEY;

  if (typeof key !== "string") {
    return undefined;
  }

  const trimmed = key.trim();

  return trimmed.length > 0 ? trimmed : undefined;
}