import { NextRequest, NextResponse } from "next/server";
import { formatCountry } from "@/lib/constants/country-abbreviations";
import { fetchDistributorFallback } from "@/lib/metadata/distributor-fallback";
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
 const match = countries.find(
 (country) => country.iso_3166_1 === code
 );
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

 const translationsUrl =
 `${TMDB_API_BASE}/movie/${id}/translations` +
 `?api_key=${apiKey}`;

 const keywordsUrl =
 `${TMDB_API_BASE}/movie/${id}/keywords` +
 `?api_key=${apiKey}`;

 const releaseDatesUrl =
 `${TMDB_API_BASE}/movie/${id}/release_dates` +
 `?api_key=${apiKey}`;

 const [
 detailsResponse,
 creditsResponse,
 externalIdsResponse,
 translationsResponse,
 keywordsResponse,
 releaseDatesResponse,
 ] =
 await Promise.all([
 fetch(detailsUrl, { next: { revalidate: 0 } }),
 fetch(creditsUrl, { next: { revalidate: 0 } }),
 fetch(externalIdsUrl, { next: { revalidate: 0 } }),
 fetch(translationsUrl, { next: { revalidate: 0 } }),
 fetch(keywordsUrl, { next: { revalidate: 0 } }),
 fetch(releaseDatesUrl, { next: { revalidate: 0 } }),
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
 const keywordsData = keywordsResponse.ok
 ? await keywordsResponse.json()
 : { keywords: [] };
 const releaseDatesData = releaseDatesResponse.ok
 ? await releaseDatesResponse.json()
 : { results: [] };

 let titlePt = details.title;
 try {
 const translations = await translationsResponse.json();
 const ptBrTranslation = translations.translations?.find(
 (t: { iso_639_1: string; iso_3166_1: string }) =>
 t.iso_639_1 === "pt" && t.iso_3166_1 === "BR"
 );
 if (ptBrTranslation?.data?.title) {
 titlePt = ptBrTranslation.data.title;
 }
 } catch {} // fallback to default title

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

 const productionCompanies =
 details.production_companies
 ?.map((company: { name?: string }) => company.name)
 ?.filter((name: string | undefined): name is string =>
 Boolean(name?.trim())
 ) ?? [];

 const productionCountry = formatCountry(getProductionCountry(
 details.origin_country,
 details.production_countries
 ));

 const distributor = await fetchDistributorFallback({
 imdbId,
 tmdbId: details.id,
 title: details.title,
 year: details.release_date?.slice(0, 4) ?? "",
 originCountry: productionCountry,
 });

 const genres =
 details.genres?.map(
 (genre: { name: string }) => genre.name
 ) ?? [];
 const keywords =
 keywordsData.keywords
 ?.map((keyword: { name?: string }) => keyword.name)
 ?.filter((name: string | undefined): name is string =>
 Boolean(name?.trim())
 ) ?? [];
 const collections =
 typeof details.belongs_to_collection?.name === "string"
 ? [details.belongs_to_collection.name]
 : [];
 const primarySubgenre = getPrimarySubgenre({
 title: details.title,
 originalTitle: details.original_title,
 genres,
 keywords,
 collections,
 overview: details.overview ?? "",
 });
 const releaseDates = getMovieReleaseDates(
 releaseDatesData,
 details.release_date ?? ""
 );

 return NextResponse.json({
 ok: true,
 movie: {
 tmdbId: details.id,

 title: details.title,
 originalTitle: details.original_title,
 titlePt,

 year: details.release_date?.slice(0, 4) ?? "",
 releaseDate: details.release_date ?? "",
 releaseDates,

 runtime: details.runtime ?? null,

 director,

 country: productionCountry,

 genres,
 subgenres: primarySubgenre ? [primarySubgenre] : [],
 keywords,
 collections,

 overview: details.overview ?? "",

 imdbId: ratings.imdbId,
 imdbScore: ratings.imdbScore,
 rottenTomatoesScore:
 ratings.rottenTomatoesScore,

 distributor: distributor ?? "",
 productionCompanies,

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
