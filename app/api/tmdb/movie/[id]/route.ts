import { NextRequest, NextResponse } from "next/server";
import { fetchMovieRatings } from "@/lib/omdb/fetch-movie-ratings";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const apiKey = getTmdbApiKey();

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "TMDB API key not configured.",
      },
      { status: 500 }
    );
  }

  try {
    const detailsUrl =
      `${TMDB_API_BASE}/movie/${id}` +
      `?api_key=${apiKey}&language=en-US`;

    const creditsUrl =
      `${TMDB_API_BASE}/movie/${id}/credits` +
      `?api_key=${apiKey}&language=en-US`;

    const externalIdsUrl =
      `${TMDB_API_BASE}/movie/${id}/external_ids` +
      `?api_key=${apiKey}`;

    const [detailsResponse, creditsResponse, externalIdsResponse] =
      await Promise.all([
        fetch(detailsUrl, { next: { revalidate: 0 } }),
        fetch(creditsUrl, { next: { revalidate: 0 } }),
        fetch(externalIdsUrl, { next: { revalidate: 0 } }),
      ]);

    if (
      !detailsResponse.ok ||
      !creditsResponse.ok ||
      !externalIdsResponse.ok
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to fetch movie details.",
        },
        { status: 500 }
      );
    }

    const details = await detailsResponse.json();
    const credits = await creditsResponse.json();
    const externalIds = await externalIdsResponse.json();

    const director =
      credits.crew?.find(
        (person: { job?: string; name?: string }) =>
          person.job === "Director"
      )?.name ?? "—";

    const imdbId =
      typeof externalIds.imdb_id === "string"
        ? externalIds.imdb_id
        : undefined;

    const ratings = imdbId
      ? await fetchMovieRatings(imdbId)
      : {
          imdbId: undefined,
          imdbScore: null,
          rottenTomatoesScore: null,
        };

    return NextResponse.json({
      ok: true,
      movie: {
        tmdbId: details.id,

        title: details.title,
        originalTitle: details.original_title,
        titlePt: details.title,

        year: details.release_date?.slice(0, 4) ?? "",
        releaseDate: details.release_date ?? "",

        runtime: details.runtime ?? null,

        director,

        country:
          details.production_countries?.[0]?.name ?? "—",

        genres:
          details.genres?.map(
            (genre: { name: string }) => genre.name
          ) ?? [],

        overview: details.overview ?? "",

        imdbId: ratings.imdbId,
        imdbScore: ratings.imdbScore,
        rottenTomatoesScore:
          ratings.rottenTomatoesScore,

        distributor:
          details.production_companies?.[0]?.name ?? "—",

        cast:
          credits.cast
            ?.slice(0, 10)
            ?.map(
              (person: { name: string }) => person.name
            ) ?? [],

        crew:
          credits.crew
            ?.slice(0, 10)
            ?.map(
              (person: { name: string }) => person.name
            ) ?? [],
      },
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to load movie details.",
      },
      { status: 500 }
    );
  }
}
