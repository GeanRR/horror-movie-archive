import { ADD_MOVIE_UNENRICHED_PLACEHOLDER } from "@/lib/add-movie/constants";
import { getTmdbPosterUrl } from "@/lib/tmdb/poster";
import type {
  AddMovieMovieDraft,
  AddMovieSearchResult,
} from "@/types/add-movie";

/** Build confirmation draft from a TMDB search hit */
export function mapSearchResultToDraft(
  result: AddMovieSearchResult
): AddMovieMovieDraft {
  return {
    tmdbId: result.tmdbId,

    displayTitle: result.title,
    originalTitle: result.originalTitle || result.title,
    titlePt: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    year: result.releaseYear || ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    releaseDate: "",

    posterPath: result.posterPath,
    posterUrl: getTmdbPosterUrl(result.posterPath, "detail"),

    director: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    country: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    distributor: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    runtime: null,

    synopsis: result.overview ?? "",

    cast: [],
    crew: [],
    genres: [],

    imdbId: undefined,
    imdbScore: null,
    rottenTomatoesScore: null,

    overview: result.overview,
    originalLanguage: result.originalLanguage,
  };
}
