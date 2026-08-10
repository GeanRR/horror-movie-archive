import type { TmdbMovieSearchItem } from "@/types/tmdb";

type TmdbApiMovie = {
  id: number;
  media_type?: "movie";
  title?: string;
  original_title?: string;
  release_date?: string;
  poster_path?: string | null;
  overview?: string;
  original_language?: string;
};

export function mapTmdbApiMovie(movie: TmdbApiMovie): TmdbMovieSearchItem {
  const releaseYear = movie.release_date?.slice(0, 4) ?? "";

  return {
    tmdbId: movie.id,
    mediaType: "movie",
    title: movie.title?.trim() || movie.original_title?.trim() || "Untitled",
    originalTitle: movie.original_title?.trim() || movie.title?.trim() || "",
    releaseYear,
    posterPath: movie.poster_path ?? null,
    overview: movie.overview?.trim() ?? "",
    originalLanguage: movie.original_language?.trim() ?? "",
  };
}
