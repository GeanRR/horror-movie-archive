import { getOmdbApiKey } from "@/lib/omdb/server-env";

export type OmdbRatings = {
  imdbId?: string;
  imdbScore: number | null;
  rottenTomatoesScore: number | null;
};

export async function fetchMovieRatings(
  imdbId: string
): Promise<OmdbRatings> {
  const apiKey = getOmdbApiKey();

  if (!apiKey) {
    return {
      imdbId,
      imdbScore: null,
      rottenTomatoesScore: null,
    };
  }

  const url =
    `https://www.omdbapi.com/?apikey=${apiKey}` +
    `&i=${imdbId}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      imdbId,
      imdbScore: null,
      rottenTomatoesScore: null,
    };
  }

  const data = await response.json();

  const imdbScore =
    typeof data.imdbRating === "string" &&
    data.imdbRating !== "N/A"
      ? Number(data.imdbRating)
      : null;

  const rottenRating = Array.isArray(data.Ratings)
    ? data.Ratings.find(
        (rating: { Source?: string }) =>
          rating.Source === "Rotten Tomatoes"
      )
    : undefined;

  const rottenTomatoesScore =
    rottenRating?.Value &&
    typeof rottenRating.Value === "string"
      ? Number(rottenRating.Value.replace("%", ""))
      : null;

  return {
    imdbId,
    imdbScore,
    rottenTomatoesScore,
  };
}