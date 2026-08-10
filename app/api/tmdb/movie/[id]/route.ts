import { NextRequest, NextResponse } from "next/server";
import { formatCountry } from "@/lib/constants/country-abbreviations";
import {
  fetchDistributorFallback,
  fetchWikipediaMovieSubgenreSignals,
} from "@/lib/metadata/distributor-fallback";
import { getPrimarySubgenre } from "@/lib/movie-engines/subgenre-engine";
import { fetchMovieRatings } from "@/lib/omdb/fetch-movie-ratings";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";

type TmdbReleaseDate = {
  release_date?: string;
  type?: number;
};

type TmdbReleaseCountry = {
  iso_3166_1?: string;
  release_dates?: TmdbReleaseDate[];
};

type TmdbReleaseDatesResponse = {
  results?: TmdbReleaseCountry[];
};

type TmdbProductionCountry = {
  iso_3166_1?: string;
  name?: string;
};

type SupportedMediaType = "movie" | "tv";

const UNSUPPORTED_IMDB_ID_ERROR =
  "Couldn't find a supported title for this IMDb ID.";

function normalizeTmdbDate(value: string | undefined) {
  return typeof value === "string" ? value.slice(0, 10) : "";
}

function getProductionCountry(
  originCountry: unknown,
  productionCountries: TmdbProductionCountry[] | undefined
) {
  const countries = Array.isArray(productionCountries)
    ? productionCountries
    : [];
  const originCodes = Array.isArray(originCountry)
    ? originCountry.filter(
        (code): code is string =>
          typeof code === "string" && code.trim().length > 0
      )
    : [];

  const originNames = originCodes
    .map((code) => {
      const match = countries.find((country) => country.iso_3166_1 === code);
      return match?.name?.trim() || code;
    })
    .filter(Boolean);

  if (originNames.length > 0) {
    return originNames.join(", ");
  }

  const productionNames = countries
    .map((country) => country.name?.trim())
    .filter((name): name is string => Boolean(name));

  return productionNames.length > 0 ? productionNames.join(", ") : "—";
}

function findReleaseDate(
  countries: TmdbReleaseCountry[],
  releaseTypes: number[]
) {
  const orderedCountries = [
    ...countries.filter((country) => country.iso_3166_1 === "US"),
    ...countries.filter((country) => country.iso_3166_1 !== "US"),
  ];

  for (const country of orderedCountries) {
    const matches = (country.release_dates ?? [])
      .filter((date) => releaseTypes.includes(date.type ?? 0))
      .map((date) => normalizeTmdbDate(date.release_date))
      .filter(Boolean)
      .sort();

    if (matches[0]) return matches[0];
  }

  return "";
}

function getMovieReleaseDates(
  payload: TmdbReleaseDatesResponse,
  fallbackTheatrical: string
) {
  const countries = Array.isArray(payload.results) ? payload.results : [];

  return {
    theatrical:
      findReleaseDate(countries, [3, 2]) || normalizeTmdbDate(fallbackTheatrical),
    streaming: findReleaseDate(countries, [6]),
    digital: findReleaseDate(countries, [4]),
  };
}

function getSupportedMediaType(value: string | null): SupportedMediaType {
  return value === "tv" ? "tv" : "movie";
}

function isSupportedArchiveTvTitle(details: {
  type?: string;
  status?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
}) {
  if (details.type === "Miniseries" || details.type === "TV Movie") {
    return true;
  }

  const seasons = Number(details.number_of_seasons ?? 0);
  const episodes = Number(details.number_of_episodes ?? 0);
  const status = typeof details.status === "string" ? details.status : "";

  return seasons === 1 && episodes > 0 && episodes <= 8 && status === "Ended";
}

function getDetailsTitle(
  details: {
    title?: string;
    original_title?: string;
    name?: string;
    original_name?: string;
  },
  mediaType: SupportedMediaType
) {
  const title = mediaType === "tv" ? details.name : details.title;
  const originalTitle =
    mediaType === "tv" ? details.original_name : details.original_title;

  return title?.trim() || originalTitle?.trim() || "Untitled";
}

function getDetailsOriginalTitle(
  details: {
    title?: string;
    original_title?: string;
    name?: string;
    original_name?: string;
  },
  mediaType: SupportedMediaType
) {
  const title = mediaType === "tv" ? details.name : details.title;
  const originalTitle =
    mediaType === "tv" ? details.original_name : details.original_title;

  return originalTitle?.trim() || title?.trim() || "";
}

function getDetailsReleaseDate(
  details: {
    release_date?: string;
    first_air_date?: string;
  },
  mediaType: SupportedMediaType
) {
  return mediaType === "tv"
    ? details.first_air_date ?? ""
    : details.release_date ?? "";
}

function getDetailsRuntime(details: {
  runtime?: number | null;
  episode_run_time?: number[];
}) {
  if (typeof details.runtime === "number") return details.runtime;

  const episodeRunTimes = Array.isArray(details.episode_run_time)
    ? details.episode_run_time
    : [];
  const runtime = episodeRunTimes.find((value) => typeof value === "number");

  return runtime ?? null;
}

function getDirector(
  credits: {
    crew?: { job?: string; name?: string }[];
  },
  details: {
    created_by?: { name?: string }[];
  }
) {
  const director = credits.crew?.find(
    (person) => person.job === "Director" && person.name
  )?.name;

  if (director) return director;

  const creators =
    details.created_by
      ?.map((person) => person.name?.trim())
      ?.filter((name): name is string => Boolean(name)) ?? [];

  return creators.length > 0 ? creators.join(", ") : "—";
}

function getKeywordNames(payload: {
  keywords?: { name?: string }[];
  results?: { name?: string }[];
}) {
  const keywords = Array.isArray(payload.keywords)
    ? payload.keywords
    : payload.results;

  return (
    keywords
      ?.map((keyword) => keyword.name)
      ?.filter((name): name is string => Boolean(name?.trim())) ?? []
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mediaType = getSupportedMediaType(
    request.nextUrl.searchParams.get("mediaType")
  );

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
    const tmdbPath = mediaType === "tv" ? "tv" : "movie";
    const detailsUrl =
      `${TMDB_API_BASE}/${tmdbPath}/${id}` +
      `?api_key=${apiKey}&language=en-US`;

    const creditsUrl =
      `${TMDB_API_BASE}/${tmdbPath}/${id}/credits` +
      `?api_key=${apiKey}&language=en-US`;

    const externalIdsUrl =
      `${TMDB_API_BASE}/${tmdbPath}/${id}/external_ids` + `?api_key=${apiKey}`;

    const translationsUrl =
      `${TMDB_API_BASE}/${tmdbPath}/${id}/translations` +
      `?api_key=${apiKey}`;

    const keywordsUrl =
      `${TMDB_API_BASE}/${tmdbPath}/${id}/keywords` + `?api_key=${apiKey}`;

    const releaseDatesUrl =
      `${TMDB_API_BASE}/movie/${id}/release_dates` + `?api_key=${apiKey}`;

    const [
      detailsResponse,
      creditsResponse,
      externalIdsResponse,
      translationsResponse,
      keywordsResponse,
      releaseDatesResponse,
    ] = await Promise.all([
      fetch(detailsUrl, { next: { revalidate: 0 } }),
      fetch(creditsUrl, { next: { revalidate: 0 } }),
      fetch(externalIdsUrl, { next: { revalidate: 0 } }),
      fetch(translationsUrl, { next: { revalidate: 0 } }),
      fetch(keywordsUrl, { next: { revalidate: 0 } }),
      mediaType === "movie"
        ? fetch(releaseDatesUrl, { next: { revalidate: 0 } })
        : Promise.resolve(new Response(JSON.stringify({ results: [] }))),
    ]);

    if (!detailsResponse.ok || !creditsResponse.ok || !externalIdsResponse.ok) {
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

    if (mediaType === "tv" && !isSupportedArchiveTvTitle(details)) {
      return NextResponse.json(
        {
          ok: false,
          error: UNSUPPORTED_IMDB_ID_ERROR,
        },
        { status: 400 }
      );
    }

    const title = getDetailsTitle(details, mediaType);
    const originalTitle = getDetailsOriginalTitle(details, mediaType);
    const releaseDate = getDetailsReleaseDate(details, mediaType);
    const year = releaseDate.slice(0, 4);
    const runtime = getDetailsRuntime(details);

    const keywordsData = keywordsResponse.ok
      ? await keywordsResponse.json()
      : { keywords: [], results: [] };
    const releaseDatesData = releaseDatesResponse.ok
      ? await releaseDatesResponse.json()
      : { results: [] };

    let titlePt = title;
    try {
      const translations = await translationsResponse.json();
      const ptBrTranslation = translations.translations?.find(
        (t: { iso_639_1: string; iso_3166_1: string }) =>
          t.iso_639_1 === "pt" && t.iso_3166_1 === "BR"
      );
      const translatedTitle =
        mediaType === "tv"
          ? ptBrTranslation?.data?.name
          : ptBrTranslation?.data?.title;
      if (translatedTitle) {
        titlePt = translatedTitle;
      }
    } catch {} // fallback to default title

    const director = getDirector(credits, details);

    const imdbId =
      typeof externalIds.imdb_id === "string" ? externalIds.imdb_id : undefined;

    const ratings = imdbId
      ? await fetchMovieRatings(imdbId)
      : {
          imdbId: undefined,
          imdbScore: null,
          rottenTomatoesScore: null,
        };

    const productionCompanies =
      details.production_companies
        ?.map((company: { name?: string }) => company.name)
        ?.filter((name: string | undefined): name is string =>
          Boolean(name?.trim())
        ) ?? [];

    const productionCountry = formatCountry(
      getProductionCountry(details.origin_country, details.production_countries)
    );

    const distributor = await fetchDistributorFallback({
      imdbId,
      tmdbId: details.id,
      title,
      year,
      originCountry: productionCountry,
    });

    const wikipediaSubgenreSignals = await fetchWikipediaMovieSubgenreSignals({
      imdbId,
      tmdbId: details.id,
      title,
      year,
    });

    const genres =
      details.genres?.map((genre: { name: string }) => genre.name) ?? [];
    const keywords = getKeywordNames(keywordsData);
    const collections =
      typeof details.belongs_to_collection?.name === "string"
        ? [details.belongs_to_collection.name]
        : [];
    const primarySubgenre = getPrimarySubgenre({
      title,
      originalTitle,
      genres,
      keywords: [...keywords, ...wikipediaSubgenreSignals],
      collections,
      overview: details.overview ?? "",
    });
    const releaseDates = getMovieReleaseDates(releaseDatesData, releaseDate);

    return NextResponse.json({
      ok: true,
      movie: {
        tmdbId: details.id,

        title,
        originalTitle,
        titlePt,

        year,
        releaseDate,
        releaseDates,

        runtime,

        director,

        country: productionCountry,

        genres,
        subgenres: primarySubgenre ? [primarySubgenre] : [],
        keywords,
        collections,

        overview: details.overview ?? "",

        imdbId: ratings.imdbId,
        imdbScore: ratings.imdbScore,
        rottenTomatoesScore: ratings.rottenTomatoesScore,

        distributor: distributor ?? "",
        productionCompanies,

        cast:
          credits.cast
            ?.slice(0, 10)
            ?.map((person: { name: string }) => person.name) ?? [],

        crew:
          credits.crew
            ?.slice(0, 10)
            ?.map((person: { name: string }) => person.name) ?? [],
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
