import { TMDB_IMAGE_BASE, TMDB_POSTER_SIZES } from "@/lib/tmdb/config";

export function getTmdbPosterUrl(
  posterPath: string | null | undefined,
  size: keyof typeof TMDB_POSTER_SIZES = "thumb"
): string | undefined {
  if (!posterPath) return undefined;
  const path = posterPath.startsWith("/") ? posterPath : `/${posterPath}`;
  return `${TMDB_IMAGE_BASE}/${TMDB_POSTER_SIZES[size]}${path}`;
}
