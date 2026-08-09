"use client";

import { useEffect, useMemo, useState } from "react";
import { Film, X } from "lucide-react";
import { VhsPoster } from "@/components/movie/vhs-poster";
import { MovieStars } from "@/components/movie/movie-stars";
import { useMovieStore, type LibraryMovie } from "@/store/movie-store";

type CountEntry = {
 name: string;
 count: number;
};

type RuntimeMovie = LibraryMovie & {
 runtime: number;
};

type DecadeGroup = {
 label: string;
 count: number;
 percentage: number;
 movies: LibraryMovie[];
 coverMovies: LibraryMovie[];
};

type CountryGroup = {
 name: string;
 count: number;
 percentage: number;
 averagePersonalScore: number | null;
 movies: LibraryMovie[];
 coverMovies: LibraryMovie[];
};

type DistributorGroup = CountryGroup;
type SubgenreGroup = CountryGroup;

type PersonMovie = {
 movieId: string;
 title: string;
 posterUrl: string | null;
};

type PersonEntry = {
 id: number;
 name: string;
 count: number;
 percentage: number;
 averagePersonalScore: number | null;
 profileUrl: string | null;
 movies: PersonMovie[];
};

type PeopleResponse = {
 ok: boolean;
 people?: {
 directors?: PersonEntry[];
 writers?: PersonEntry[];
 actors?: PersonEntry[];
 actresses?: PersonEntry[];
 };
};

const MISSING_VALUES = new Set(["", "-", "—", "n/a", "unknown", "null"]);

type MovieCollectionModal = {
 eyebrow: string;
 title: string;
 movies: LibraryMovie[];
} | null;

type PersonMoviesModal = {
 eyebrow: string;
 label: string;
 person: PersonEntry;
} | null;

function cleanText(value: string | null | undefined) {
 const trimmed = value?.trim() ?? "";
 return MISSING_VALUES.has(trimmed.toLowerCase()) ? null : trimmed;
}

function releaseYear(movie: LibraryMovie) {
 const match = movie.year.match(/\d{4}/);
 return match ? Number(match[0]) : null;
}

function decadeFromYear(year: number) {
 return `${Math.floor(year / 10) * 10}s`;
}

function normalizeCountry(value: string) {
 const key = value.trim().toLowerCase();
 if (["usa", "us", "united states", "united states of america"].includes(key)) {
 return "United States";
 }
 if (["uk", "united kingdom", "great britain"].includes(key)) {
 return "United Kingdom";
 }
 return value.trim();
}

function firstDistributor(value: string | null | undefined) {
 const distributor = cleanText(value);
 if (!distributor) return null;

 return distributor
 .split(",")[0]
 .replace(/\s*\([^)]*\)\s*/g, "")
 .trim();
}

function countBy(
 movies: LibraryMovie[],
 labelsForMovie: (movie: LibraryMovie) => (string | null | undefined)[]
) {
 const counts = new Map<string, CountEntry>();

 for (const movie of movies) {
 const labels = new Set(
 labelsForMovie(movie)
 .map(cleanText)
 .filter((label): label is string => Boolean(label))
 );

 for (const label of labels) {
 const current = counts.get(label) ?? { name: label, count: 0 };
 current.count += 1;
 counts.set(label, current);
 }
 }

 return [...counts.values()].sort((a, b) => {
 if (b.count !== a.count) return b.count - a.count;
 return a.name.localeCompare(b.name);
 });
}

function mostCommonNumber(values: number[]) {
 const counts = new Map<number, number>();
 for (const value of values) {
 counts.set(value, (counts.get(value) ?? 0) + 1);
 }
 return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0] ?? null;
}

function formatTotalRuntime(minutes: number) {
 if (minutes <= 0) return "0h 0m";
 const hours = Math.floor(minutes / 60);
 const remainingMinutes = minutes % 60;
 return `${hours}h ${remainingMinutes}m`;
}

function formatRuntime(minutes: number | null | undefined) {
 if (!minutes || minutes <= 0) return "—";
 return `${minutes} min`;
}

function formatDaysFromMinutes(minutes: number) {
 if (minutes <= 0) return "0 DAYS";
 const days = Math.max(1, Math.round(minutes / (60 * 24)));
 return `${days} ${days === 1 ? "DAY" : "DAYS"}`;
}

function formatScore(value: number | null | undefined) {
 if (typeof value !== "number") return "—";
 return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function averagePersonalScore(movies: LibraryMovie[]) {
 const scores = movies
 .map((movie) => movie.reviewScore)
 .filter((score): score is number => typeof score === "number");

 if (scores.length === 0) return null;

 return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function formatWatchDate(value: string | null | undefined) {
 const watchedDate = cleanText(value);
 if (!watchedDate) return "—";

 const [year, month, day] = watchedDate.slice(0, 10).split("-");
 return year && month && day ? `${day}/${month}/${year}` : watchedDate;
}

function dateWeight(value: string | null | undefined) {
 const date = cleanText(value);
 if (!date) return 0;

 const time = new Date(`${date.slice(0, 10)}T00:00:00`).getTime();
 return Number.isFinite(time) ? time : 0;
}

function scoreWeight(movie: LibraryMovie) {
 return typeof movie.reviewScore === "number" ? movie.reviewScore : -1;
}

function sortMoviesByScore(movies: LibraryMovie[]) {
 return [...movies].sort((a, b) => {
 const scoreDelta = scoreWeight(b) - scoreWeight(a);
 if (scoreDelta !== 0) return scoreDelta;

 const yearDelta = (releaseYear(a) ?? 9999) - (releaseYear(b) ?? 9999);
 if (yearDelta !== 0) return yearDelta;

 return a.displayTitle.localeCompare(b.displayTitle);
 });
}

function sortMoviesByLowestScore(movies: LibraryMovie[]) {
 return [...movies].sort((a, b) => {
 const scoreDelta = scoreWeight(a) - scoreWeight(b);
 if (scoreDelta !== 0) return scoreDelta;

 const yearDelta = (releaseYear(a) ?? 9999) - (releaseYear(b) ?? 9999);
 if (yearDelta !== 0) return yearDelta;

 return a.displayTitle.localeCompare(b.displayTitle);
 });
}

function compactCountry(value: string | null | undefined) {
 if (!value) return "—";
 return value === "United States" ? "USA" : value;
}

function compactDecadeLabel(value: string | null | undefined) {
 const match = value?.match(/(\d{2})s$/i);
 return match ? `${match[1]}s` : value ?? "—";
}

function EmptyDashboard() {
 return (
 <div className="grid min-h-[70vh] place-items-center rounded-[2rem] bg-[#050505] p-8 text-center">
 <div>
 <Film className="mx-auto h-12 w-12 text-muted-foreground" />
 <h1 className="mt-6 text-5xl font-black uppercase">
 Your Horror Archive
 </h1>
 <p className="mt-3 text-sm text-muted-foreground">
 Add movies to reveal the all-time shape of the collection.
 </p>
 </div>
 </div>
 );
}

function PersonPosterStrip({ movies }: { movies: PersonMovie[] }) {
 return (
 <div className="relative h-[116px] w-[232px] overflow-hidden rounded-lg">
 {movies.slice(0, 5).map((movie, index) =>
 movie.posterUrl ? (
 <span
 key={movie.movieId}
 className="absolute bottom-0 block h-[116px] w-[78px]"
 style={{
 left: `${index * 36}px`,
 zIndex: index + 1,
 }}
 >
 <VhsPoster
 src={movie.posterUrl}
 alt=""
 className="h-full w-full rounded-[6px] border border-black/70 shadow-2xl"
 imageClassName="object-cover"
 />
 </span>
 ) : (
 <div
 key={movie.movieId}
 className="absolute bottom-0 grid h-[116px] w-[78px] place-items-center rounded-[6px] border border-black/70 bg-[#111] text-[#6f6c7a] shadow-2xl"
 style={{
 left: `${index * 36}px`,
 zIndex: index + 1,
 }}
 >
 <Film className="h-5 w-5" />
 </div>
 )
 )}
 </div>
 );
}

function CompactMovieStrip({ movies }: { movies: LibraryMovie[] }) {
 return (
 <div className="relative h-[58px] overflow-hidden rounded-[4px]">
 {movies.map((movie, posterIndex) =>
 movie.posterUrl ? (
 <span
 key={movie.id}
 className="absolute top-0 block h-[58px] w-10"
 style={{
 left: `${posterIndex * 24}px`,
 zIndex: posterIndex + 1,
 }}
 >
 <VhsPoster
 src={movie.posterUrl}
 alt=""
 className="h-full w-full rounded-[4px] shadow-lg"
 imageClassName="object-cover"
 />
 </span>
 ) : (
 <div
 key={movie.id}
 className="absolute top-0 grid h-[58px] w-10 place-items-center rounded-[4px] bg-[#111] text-[#6f6c7a]"
 style={{
 left: `${posterIndex * 24}px`,
 zIndex: posterIndex + 1,
 }}
 >
 <Film className="h-4 w-4" />
 </div>
 )
 )}
 </div>
 );
}

function PersonPhoto({
 person,
 className,
}: {
 person: PersonEntry;
 className: string;
}) {
 if (person.profileUrl) {
 return (
 <img
 src={person.profileUrl}
 alt=""
 className={`${className} object-cover`}
 />
 );
 }

 return (
 <div className={`${className} grid place-items-center bg-[#111] text-[#6f6c7a]`}>
 <Film className="h-8 w-8" />
 </div>
 );
}

function PeopleCard({
 label,
 people,
 onOpenPerson,
}: {
 label: string;
 people: PersonEntry[];
 onOpenPerson: (person: PersonEntry) => void;
}) {
 if (people.length === 0) return null;

 const [lead, ...rest] = people.slice(0, 10);

 return (
 <article className="rounded-[20px] bg-black p-6">
 <button
 type="button"
 onClick={() => onOpenPerson(lead)}
 className="grid w-full items-end gap-6 text-left transition-transform duration-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610C33] md:grid-cols-[220px_1fr]"
 >
 <PersonPhoto
 person={lead}
 className="h-[292px] w-full self-end rounded-[10px]"
 />

 <div className="flex min-h-[292px] min-w-0 flex-col">
 <p className="font-sans text-xs font-bold uppercase text-[#6f6c7a]">
 {label}
 </p>
 <h3 className="archive-anton mt-3 text-4xl leading-[0.92] text-[#e9e3d4]">
 <span className="text-[#8b0f49]">01.</span> {lead.name}
 </h3>

 <p className="archive-anton mt-8 text-[4rem] leading-none text-[#e0b63e]">
 {lead.count}
 <span className="ml-3 align-middle font-sans text-sm font-bold uppercase text-[#6f6c7a]">
 {lead.count === 1 ? "movie" : "movies"} /{" "}
 {Math.round(lead.percentage)}% • {formatScore(lead.averagePersonalScore)} avg
 </span>
 </p>

 <div className="mt-auto pt-5">
 <PersonPosterStrip movies={lead.movies} />
 </div>
 </div>
 </button>

 {rest.length > 0 && (
 <div className="mt-7 grid gap-x-8 gap-y-4 border-t border-[#e9e3d4]/10 pt-6 md:grid-cols-2">
 {rest.map((person, index) => (
 <button
 type="button"
 key={person.id}
 onClick={() => onOpenPerson(person)}
 className="grid min-w-0 grid-cols-[36px_1fr] items-center gap-3 rounded-[10px] py-1 text-left transition-transform duration-200 hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610C33]"
 >
 <PersonPhoto
 person={person}
 className="h-9 w-9 rounded-full"
 />
 <div className="min-w-0">
 <p className="archive-anton truncate text-xl leading-none text-[#e9e3d4]">
 <span className="text-[#8b0f49]">
 {String(index + 2).padStart(2, "0")}.
 </span>{" "}
 {person.name}
 </p>
 <p className="mt-1 font-sans text-xs font-bold uppercase text-[#6f6c7a]">
 <span className="text-[#e0b63e]">{person.count}</span>{" "}
 {person.count === 1 ? "movie" : "movies"} /{" "}
 {Math.round(person.percentage)}% • {formatScore(person.averagePersonalScore)} avg
 </p>
 </div>
 </button>
 ))}
 </div>
 )}
 </article>
 );
}

function MasterpieceMovieCard({ movie }: { movie: LibraryMovie }) {
 const year = releaseYear(movie);

 return (
 <article className="min-w-0">
 {movie.posterUrl ? (
 <VhsPoster
 src={movie.posterUrl}
 alt={movie.displayTitle}
 className="h-[178px] w-[124px] rounded-[8px] shadow-2xl"
 imageClassName="object-cover"
 />
 ) : (
 <div className="grid h-[178px] w-[124px] place-items-center rounded-[8px] bg-[#111] text-[#6f6c7a] shadow-2xl">
 <Film className="h-8 w-8" />
 </div>
 )}

 <h3 className="masterpiece-text archive-anton mt-4 max-w-[124px] text-[18px] uppercase leading-none">
 {movie.displayTitle}
 </h3>
 <p className="mt-3 max-w-[124px] font-sans text-sm font-black uppercase leading-[1.05] text-[#e9e3d4]">
 {year ?? "—"}
 </p>
 </article>
 );
}

function AnnualWinnerMovieCard({ movie }: { movie: LibraryMovie }) {
 const year = releaseYear(movie);
 const director = cleanText(movie.director);

 return (
 <article className="min-w-0">
 {movie.posterUrl ? (
 <VhsPoster
 src={movie.posterUrl}
 alt={movie.displayTitle}
 className="h-[178px] w-[124px] rounded-[8px] shadow-2xl"
 imageClassName="object-cover"
 />
 ) : (
 <div className="grid h-[178px] w-[124px] place-items-center rounded-[8px] bg-[#111] text-[#6f6c7a] shadow-2xl">
 <Film className="h-8 w-8" />
 </div>
 )}

 <h3 className="masterpiece-text archive-anton mt-5 max-w-[124px] text-[18px] uppercase leading-none">
 {movie.displayTitle}
 </h3>
 <p className="mt-3 max-w-[124px] font-sans text-[14px] leading-[1.05] text-[#e9e3d4]">
 <span className="font-black">{year ?? "—"}</span>
 <span className="mx-2 font-black">•</span>
 <span className="font-normal">{director ?? "—"}</span>
 </p>
 <span className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm font-black leading-none text-[#e9e3d4]">
 <img
 src="/images/gean.png"
 alt=""
 aria-hidden
 className="h-5 w-5 rounded-full object-cover grayscale"
 />
 {formatScore(movie.reviewScore)}
 </span>
 </article>
 );
}

type BadgeShowcaseTone = "nasty" | "trash" | "guilty" | "worst";

const BADGE_SHOWCASE_STYLES: Record<
 BadgeShowcaseTone,
 { accent: string; badgePath: string; textClassName: string }
> = {
 nasty: {
 accent: "#4ce600",
 badgePath: "/badges/badge_12.png",
 textClassName: "library-tone-green-animated",
 },
 trash: {
 accent: "#8a1df4",
 badgePath: "/badges/badge_11.png",
 textClassName: "library-tone-purple-animated",
 },
 guilty: {
 accent: "#f01855",
 badgePath: "/badges/badge_10.png",
 textClassName: "library-tone-pink-animated",
 },
 worst: {
 accent: "#b8b8b8",
 badgePath: "/badges/badge_9.png",
 textClassName: "library-tone-gray-animated",
 },
};

function BadgeShowcaseMovie({
 movie,
 index,
 textClassName,
}: {
 movie: LibraryMovie;
 index: number;
 textClassName: string;
}) {
 const year = releaseYear(movie);
 const director = cleanText(movie.director);

 return (
 <article className="grid min-w-0 grid-cols-[76px_1fr] items-center gap-5">
 {movie.posterUrl ? (
 <VhsPoster
 src={movie.posterUrl}
 alt={movie.displayTitle}
 className="h-[104px] w-[72px] rounded-[6px] shadow-2xl"
 imageClassName="object-cover"
 />
 ) : (
 <div className="grid h-[104px] w-[72px] place-items-center rounded-[6px] bg-[#111] text-[#6f6c7a] shadow-2xl">
 <Film className="h-6 w-6" />
 </div>
 )}

 <div className="min-w-0">
 <h3 className={`archive-anton text-[18px] uppercase leading-none ${textClassName}`}>
 <span className="text-[#8b0f49]">
 {String(index + 1).padStart(2, "0")}.
 </span>{" "}
 {movie.displayTitle}
 </h3>
 <p className="mt-3 font-sans text-[14px] leading-[1.05] text-[#e9e3d4]">
 <span className="font-black">{year ?? "—"}</span><span className="mx-2 font-black">•</span><span className="font-normal">{director ?? "—"}</span>
 </p>
 <div className="mt-3 flex items-center gap-2">
 <span className="inline-flex items-center gap-1.5 font-sans text-lg font-black leading-none text-[#e9e3d4]">
 <img
 src="/images/gean.png"
 alt=""
 aria-hidden
 className="h-6 w-6 rounded-full object-cover grayscale"
 />
 {formatScore(movie.reviewScore)}
 </span>
 <MovieStars stars={movie.stars} size="sm" />
 </div>
 </div>
 </article>
 );
}

function BadgeShowcaseBlock({
 eyebrow,
 title,
 movies,
 tone,
}: {
 eyebrow: string;
 title: string;
 movies: LibraryMovie[];
 tone: BadgeShowcaseTone;
}) {
 const { accent, badgePath, textClassName } = BADGE_SHOWCASE_STYLES[tone];

 return (
 <article
 className="relative overflow-hidden rounded-[24px] border bg-black px-8 py-9"
 style={{
 borderColor: accent,
 backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.9) 46%, rgba(0,0,0,0.64) 76%, rgba(0,0,0,0.88) 100%), url('${badgePath}')`,
 backgroundRepeat: "no-repeat",
 backgroundPosition: "right -112px top -80px",
 backgroundSize: "520px 520px",
 }}
 >
 <p className="font-sans text-sm font-bold uppercase text-[#e0b63e]">
 {eyebrow}
 </p>
 <h2
 className={`archive-anton mt-7 text-5xl uppercase leading-none md:text-6xl ${textClassName}`}
 >
 {title}
 </h2>

 <div className="mt-14 grid gap-x-9 gap-y-10 md:grid-cols-2">
 {movies.map((movie, index) => (
 <BadgeShowcaseMovie
 key={movie.id}
 movie={movie}
 index={index}
 textClassName={textClassName}
 />
 ))}
 </div>
 </article>
 );
}

function DashboardModalMovieCard({ movie }: { movie: LibraryMovie }) {
 return (
 <article className="grid grid-cols-[72px_1fr] items-center gap-4 rounded-2xl bg-black p-3">
 {movie.posterUrl ? (
 <VhsPoster
 src={movie.posterUrl}
 alt=""
 className="h-28 w-[72px] rounded-[6px]"
 imageClassName="object-cover"
 />
 ) : (
 <div className="grid h-28 w-[72px] place-items-center rounded-[6px] bg-[#111] text-[#6f6c7a]">
 <Film className="h-6 w-6" />
 </div>
 )}
 <div className="min-w-0">
 <h3 className="truncate font-sans text-sm font-semibold text-[#e9e3d4]">
 {movie.displayTitle}
 </h3>
 <p className="mt-1 text-sm text-[#6f6c7a]">
 {releaseYear(movie) ?? "—"}
 </p>
 <span className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm font-black leading-none text-[#e9e3d4]">
 <img
 src="/images/gean.png"
 alt=""
 aria-hidden
 className="h-6 w-6 rounded-full object-cover grayscale"
 />
 {formatScore(movie.reviewScore)}
 </span>
 </div>
 </article>
 );
}

export default function DashboardPage() {
 const movies = useMovieStore((state) => state.movies);
 const [selectedDecade, setSelectedDecade] = useState<DecadeGroup | null>(null);
 const [selectedCountry, setSelectedCountry] = useState<CountryGroup | null>(null);
 const [selectedDistributor, setSelectedDistributor] =
 useState<DistributorGroup | null>(null);
 const [selectedSubgenre, setSelectedSubgenre] =
 useState<SubgenreGroup | null>(null);
 const [selectedCollection, setSelectedCollection] =
 useState<MovieCollectionModal>(null);
 const [selectedPersonMovies, setSelectedPersonMovies] =
 useState<PersonMoviesModal>(null);
 const [people, setPeople] = useState<PeopleResponse["people"] | null>(null);

 const moviesById = useMemo(
 () => new Map(movies.map((movie) => [movie.id, movie])),
 [movies]
 );

 const heroStats = useMemo(() => {
 const releaseYears = movies
 .map(releaseYear)
 .filter((year): year is number => typeof year === "number");
 const decadeCounts = countBy(movies, (movie) => {
 const year = releaseYear(movie);
 return [year ? decadeFromYear(year) : null];
 });
 const countryCounts = countBy(movies, (movie) => {
 const country = cleanText(movie.country);
 return [country ? normalizeCountry(country) : null];
 });
 const mostWatchedYear = mostCommonNumber(releaseYears);

 return [
 ["Total movies", String(movies.length)],
 ["Most watched year", mostWatchedYear ? String(mostWatchedYear[0]) : "—"],
 ["Most watched decade", compactDecadeLabel(decadeCounts[0]?.name)],
 ["Most watched country", compactCountry(countryCounts[0]?.name)],
 ];
 }, [movies]);

 const archiveStats = useMemo(() => {
 const totalRuntime = movies.reduce(
 (sum, movie) => sum + (movie.runtime ?? 0),
 0
 );
 const distributorCounts = countBy(movies, (movie) => [
 firstDistributor(movie.distributor),
 ]);
 const yearMovies = movies
 .map((movie) => ({ movie, year: releaseYear(movie) }))
 .filter(
 (entry): entry is { movie: LibraryMovie; year: number } =>
 typeof entry.year === "number"
 );
 const runtimeMovies = movies.filter(
 (movie): movie is RuntimeMovie =>
 typeof movie.runtime === "number" && movie.runtime > 0
 );
 const divisiveMovie =
 movies
 .filter(
 (movie) =>
 typeof movie.reviewScore === "number" &&
 typeof movie.imdbScore === "number"
 )
 .map((movie) => ({
 movie,
 difference: Math.abs((movie.reviewScore ?? 0) - (movie.imdbScore ?? 0)),
 }))
 .sort((a, b) => {
 if (b.difference !== a.difference) return b.difference - a.difference;
 return a.movie.displayTitle.localeCompare(b.movie.displayTitle);
 })[0]?.movie ?? null;
 const latestWatch =
 [...movies]
 .filter((movie) => dateWeight(movie.watchedDate) > 0)
 .sort((a, b) => {
 const dateDelta = dateWeight(b.watchedDate) - dateWeight(a.watchedDate);
 if (dateDelta !== 0) return dateDelta;
 return a.displayTitle.localeCompare(b.displayTitle);
 })[0] ?? null;
 const oldestRelease =
 [...yearMovies].sort((a, b) => {
 if (a.year !== b.year) return a.year - b.year;
 return a.movie.displayTitle.localeCompare(b.movie.displayTitle);
 })[0] ?? null;
 const newestRelease =
 [...yearMovies].sort((a, b) => {
 if (b.year !== a.year) return b.year - a.year;
 return a.movie.displayTitle.localeCompare(b.movie.displayTitle);
 })[0] ?? null;
 const longestMovie =
 [...runtimeMovies].sort((a, b) => {
 if (b.runtime !== a.runtime) return b.runtime - a.runtime;
 return a.displayTitle.localeCompare(b.displayTitle);
 })[0] ?? null;
 const shortestMovie =
 [...runtimeMovies].sort((a, b) => {
 if (a.runtime !== b.runtime) return a.runtime - b.runtime;
 return a.displayTitle.localeCompare(b.displayTitle);
 })[0] ?? null;

 return [
 {
 label: "Total runtime",
 value: formatTotalRuntime(totalRuntime),
 detail: formatDaysFromMinutes(totalRuntime),
 },
 {
 label: "Most viewed distributor",
 value: distributorCounts[0]?.name ?? "—",
 detail: distributorCounts[0]
 ? `${distributorCounts[0].count} ${
 distributorCounts[0].count === 1 ? "MOVIE" : "MOVIES"
 }`
 : "—",
 },
 {
 label: "Oldest release",
 value: oldestRelease ? String(oldestRelease.year) : "—",
 detail: oldestRelease?.movie.displayTitle ?? "—",
 },
 {
 label: "Newest release",
 value: newestRelease ? String(newestRelease.year) : "—",
 detail: newestRelease?.movie.displayTitle ?? "—",
 },
 {
 label: "Longest movie",
 value: formatRuntime(longestMovie?.runtime),
 detail: longestMovie?.displayTitle ?? "—",
 },
 {
 label: "Shortest movie",
 value: formatRuntime(shortestMovie?.runtime),
 detail: shortestMovie?.displayTitle ?? "—",
 },
 {
 label: "Most divisive movie",
 value: divisiveMovie
 ? `${formatScore(divisiveMovie.reviewScore)} vs ${formatScore(
 divisiveMovie.imdbScore
 )} (IMDB)`
 : "—",
 detail: divisiveMovie?.displayTitle ?? "—",
 },
 {
 label: "Latest watch",
 value: formatWatchDate(latestWatch?.watchedDate),
 detail: latestWatch?.displayTitle ?? "—",
 },
 ];
 }, [movies]);

 const decades = useMemo<DecadeGroup[]>(() => {
 const groups = new Map<string, LibraryMovie[]>();

 for (const movie of movies) {
 const year = releaseYear(movie);
 if (!year) continue;

 const decade = decadeFromYear(year);
 const current = groups.get(decade) ?? [];
 current.push(movie);
 groups.set(decade, current);
 }

 return [...groups.entries()]
 .map(([label, decadeMovies]) => ({
 label,
 count: decadeMovies.length,
 percentage: movies.length
 ? Math.round((decadeMovies.length / movies.length) * 100)
 : 0,
 movies: [...decadeMovies].sort((a, b) => {
 const yearDelta = (releaseYear(a) ?? 9999) - (releaseYear(b) ?? 9999);
 if (yearDelta !== 0) return yearDelta;
 return a.displayTitle.localeCompare(b.displayTitle);
 }),
 coverMovies: sortMoviesByScore(decadeMovies).slice(0, 5),
 }))
 .sort(
 (a, b) =>
 Number.parseInt(a.label, 10) - Number.parseInt(b.label, 10)
 );
 }, [movies]);

 const countries = useMemo<CountryGroup[]>(() => {
 const groups = new Map<string, LibraryMovie[]>();

 for (const movie of movies) {
 const country = cleanText(movie.country);
 if (!country) continue;

 const normalized = normalizeCountry(country);
 const current = groups.get(normalized) ?? [];
 current.push(movie);
 groups.set(normalized, current);
 }

 return [...groups.entries()]
 .map(([name, countryMovies]) => ({
 name,
 count: countryMovies.length,
 percentage: movies.length
 ? Math.round((countryMovies.length / movies.length) * 100)
 : 0,
 averagePersonalScore: averagePersonalScore(countryMovies),
 movies: sortMoviesByScore(countryMovies),
 coverMovies: sortMoviesByScore(countryMovies).slice(0, 10),
 }))
 .sort((a, b) => {
 if (b.count !== a.count) return b.count - a.count;
 return a.name.localeCompare(b.name);
 })
 .slice(0, 10);
 }, [movies]);

 const subgenres = useMemo<SubgenreGroup[]>(() => {
 const groups = new Map<string, LibraryMovie[]>();

 for (const movie of movies) {
 const subgenre = cleanText(movie.subgenres[0]);
 if (!subgenre) continue;

 const current = groups.get(subgenre) ?? [];
 current.push(movie);
 groups.set(subgenre, current);
 }

 return [...groups.entries()]
 .map(([name, subgenreMovies]) => ({
 name,
 count: subgenreMovies.length,
 percentage: movies.length
 ? Math.round((subgenreMovies.length / movies.length) * 100)
 : 0,
 averagePersonalScore: averagePersonalScore(subgenreMovies),
 movies: sortMoviesByScore(subgenreMovies),
 coverMovies: sortMoviesByScore(subgenreMovies).slice(0, 10),
 }))
 .sort((a, b) => {
 if (b.count !== a.count) return b.count - a.count;
 return a.name.localeCompare(b.name);
 })
 .slice(0, 10);
 }, [movies]);

 const distributors = useMemo<DistributorGroup[]>(() => {
 const groups = new Map<string, LibraryMovie[]>();

 for (const movie of movies) {
 const distributor = firstDistributor(movie.distributor);
 if (!distributor) continue;

 const current = groups.get(distributor) ?? [];
 current.push(movie);
 groups.set(distributor, current);
 }

 return [...groups.entries()]
 .map(([name, distributorMovies]) => ({
 name,
 count: distributorMovies.length,
 percentage: movies.length
 ? Math.round((distributorMovies.length / movies.length) * 100)
 : 0,
 averagePersonalScore: averagePersonalScore(distributorMovies),
 movies: sortMoviesByScore(distributorMovies),
 coverMovies: sortMoviesByScore(distributorMovies).slice(0, 10),
 }))
 .sort((a, b) => {
 if (b.count !== a.count) return b.count - a.count;
 return a.name.localeCompare(b.name);
 })
 .slice(0, 10);
 }, [movies]);

 const allMasterpieceMovies = useMemo(
 () =>
 sortMoviesByScore(
 movies.filter(
 (movie) => movie.badgeId === "badge1" || movie.badgeId === "badge_1"
 )
 ),
 [movies]
 );

 const masterpieceMovies = useMemo(
 () => allMasterpieceMovies.slice(0, 16),
 [allMasterpieceMovies]
 );

 const annualWinnerMovies = useMemo(
 () =>
 [...movies]
 .filter((movie) => movie.bestOfYear)
 .sort((a, b) => {
 const yearDelta = (releaseYear(b) ?? 0) - (releaseYear(a) ?? 0);
 if (yearDelta !== 0) return yearDelta;

 const scoreDelta = scoreWeight(b) - scoreWeight(a);
 if (scoreDelta !== 0) return scoreDelta;

 return a.displayTitle.localeCompare(b.displayTitle);
 }),
 [movies]
 );

 const nastyMovies = useMemo(
 () =>
 sortMoviesByScore(
 movies.filter(
 (movie) => movie.badgeId === "badge12" || movie.badgeId === "badge_12"
 )
 ).slice(0, 10),
 [movies]
 );

 const trashMovies = useMemo(
 () =>
 sortMoviesByScore(
 movies.filter(
 (movie) => movie.badgeId === "badge11" || movie.badgeId === "badge_11"
 )
 ).slice(0, 10),
 [movies]
 );

 const guiltyPleasureMovies = useMemo(
 () =>
 sortMoviesByScore(
 movies.filter(
 (movie) => movie.badgeId === "badge10" || movie.badgeId === "badge_10"
 )
 ).slice(0, 10),
 [movies]
 );

 const worstMovies = useMemo(
 () =>
 sortMoviesByLowestScore(
 movies.filter(
 (movie) => movie.badgeId === "badge9" || movie.badgeId === "badge_9"
 )
 ).slice(0, 10),
 [movies]
 );

 useEffect(() => {
 if (movies.length === 0) {
 setPeople(null);
 return;
 }

 const controller = new AbortController();

 fetch("/api/tmdb/archive-people", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 movies: movies.map((movie) => ({
 id: movie.id,
 tmdbId: movie.tmdbId,
 title: movie.displayTitle,
 posterUrl: movie.posterUrl ?? null,
 year: releaseYear(movie),
 reviewScore: movie.reviewScore,
 })),
 }),
 signal: controller.signal,
 })
 .then((response) => response.json() as Promise<PeopleResponse>)
 .then((data) => {
 if (!controller.signal.aborted && data.ok) {
 setPeople(data.people ?? null);
 }
 })
 .catch(() => {
 if (!controller.signal.aborted) {
 setPeople(null);
 }
 });

 return () => controller.abort();
 }, [movies]);

 const peopleSections = [
 {
 label: "Most watched director",
 people: people?.directors ?? [],
 },
 {
 label: "Most watched writer",
 people: people?.writers ?? [],
 },
 {
 label: "Most watched actor",
 people: people?.actors ?? [],
 },
 {
 label: "Most watched actress",
 people: people?.actresses ?? [],
 },
 ].filter((section) => section.people.length > 0);

 if (movies.length === 0) {
 return <EmptyDashboard />;
 }

 return (
 <div className="pb-16 text-foreground">
 <section
 className="archive-hero-card relative overflow-hidden"
 style={{ backgroundImage: "url('/images/archivebg.png')" }}
 >
 <div className="relative z-10 flex min-h-[inherit] flex-col items-center justify-center px-6 py-16 text-center md:px-10">
 <p className="archive-hero-kicker text-xs md:text-sm">
 Complete Archive
 </p>
 <h1 className="archive-display-title mt-8 max-w-4xl text-[4.75rem] md:text-[7rem] xl:text-[7.45rem]">
 Your Horror
 <br />
 Collection
 </h1>

 <div className="archive-hero-stats mt-12 grid w-full max-w-[1040px] grid-cols-1 overflow-hidden md:grid-cols-4">
 {heroStats.map(([label, value]) => (
 <div
 key={label}
 className="archive-hero-stat flex min-h-[116px] flex-col items-center justify-center px-6 py-5"
 >
 <p className="archive-hero-stat-label">{label}</p>
 <p className="archive-hero-stat-value mt-5 text-4xl md:text-[2.1rem]">
 {value}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 <section className="bg-[#0b0b0b] px-8 py-20">
 <div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-2 xl:grid-cols-4">
 {archiveStats.map((stat) => (
 <article
 key={stat.label}
 className="flex min-h-[126px] flex-col items-center justify-center rounded-[22px] bg-black px-6 py-6 text-center"
 >
 <p className="font-sans text-xs font-bold uppercase text-[#6f6c7a]">
 {stat.label}
 </p>
 <p className="archive-anton mt-3 text-[2rem] uppercase leading-none text-[#e9e3d4]">
 {stat.value}
 </p>
 <p className="archive-anton mt-3 text-xl leading-none text-[#e9e3d4]">
 {stat.detail}
 </p>
 </article>
 ))}
 </div>
 </section>

 {decades.length > 0 && (
 <section className="bg-[#0b0b0b] px-8 pb-20 pt-8">
 <div className="mx-auto max-w-[1440px]">
 <div className="mb-14 text-center">
 <p className="font-sans text-sm font-bold uppercase text-[#e0b63e]">
 Across the Decades
 </p>
 <h2 className="archive-anton mt-6 text-5xl uppercase leading-none text-[#e9e3d4] md:text-6xl">
 The archive stretches through time
 </h2>
 </div>

 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
 {decades.map((decade) => (
 <button
 key={decade.label}
 type="button"
 onClick={() => setSelectedDecade(decade)}
 className="group flex min-h-[328px] flex-col items-center justify-end rounded-[24px] bg-black px-7 pb-7 pt-8 text-center transition-transform duration-200 hover:scale-[1.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610C33]"
 aria-label={`Open ${decade.label} movies`}
 >
 <div className="relative mb-7 h-[150px] w-full max-w-[210px]">
 {decade.coverMovies.length > 0 ? (
 decade.coverMovies.map((movie, index) =>
 movie.posterUrl ? (
 <span
 key={movie.id}
 className="absolute bottom-0 block h-[150px] w-[100px]"
 style={{
 left: `${index * 26}px`,
 zIndex: index + 1,
 }}
 >
 <VhsPoster
 src={movie.posterUrl}
 alt=""
 className="h-full w-full rounded-[8px] border border-black/70 shadow-2xl"
 imageClassName="object-cover"
 />
 </span>
 ) : (
 <div
 key={movie.id}
 className="absolute bottom-0 grid h-[150px] w-[100px] place-items-center rounded-[8px] border border-black/70 bg-[#111] text-[#6f6c7a] shadow-2xl"
 style={{
 left: `${index * 26}px`,
 zIndex: index + 1,
 }}
 >
 <Film className="h-7 w-7" />
 </div>
 )
 )
 ) : (
 <div className="mx-auto grid h-[150px] w-[100px] place-items-center rounded-[8px] bg-[#111] text-[#6f6c7a]">
 <Film className="h-7 w-7" />
 </div>
 )}
 </div>

 <h3 className="archive-anton text-6xl leading-none text-[#e9e3d4]">
 {decade.label}
 </h3>
 <p className="mt-3 font-sans text-sm font-bold uppercase text-[#6f6c7a]">
 {decade.count} {decade.count === 1 ? "movie" : "movies"} /{" "}
 {decade.percentage}%
 </p>
 </button>
 ))}
 </div>
 </div>
 </section>
 )}

 {selectedDecade && (
 <div
 className="motion-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="dashboard-decade-title"
 >
 <button
 type="button"
 className="absolute inset-0"
 aria-label="Close decade movies"
 onClick={() => setSelectedDecade(null)}
 />
 <section className="motion-modal-card relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[24px] bg-[#050505] shadow-2xl">
 <header className="flex items-center justify-between gap-4 border-b border-[#610C33]/35 px-6 py-5">
 <div>
 <p className="font-sans text-xs font-bold uppercase text-[#e0b63e]">
 Across the Decades
 </p>
 <h2
 id="dashboard-decade-title"
 className="archive-anton mt-1 text-4xl leading-none text-[#e9e3d4]"
 >
 {selectedDecade.label}
 </h2>
 </div>
 <button
 type="button"
 onClick={() => setSelectedDecade(null)}
 className="grid h-10 w-10 place-items-center rounded-full border border-[#e9e3d4]/10 text-[#e9e3d4] transition-colors hover:border-[#610C33]"
 aria-label="Close decade movies"
 >
 <X className="h-5 w-5" />
 </button>
 </header>

 <div className="archive-scrollbar max-h-[calc(86vh-96px)] overflow-y-auto p-6">
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {selectedDecade.movies.map((movie) => (
 <DashboardModalMovieCard key={movie.id} movie={movie} />
 ))}
 </div>
 </div>
 </section>
 </div>
 )}

 {countries.length > 0 && (
 <section className="bg-[#0b0b0b] px-8 pb-20 pt-8">
 <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-black">
 <div className="flex min-h-[232px] flex-col justify-center bg-black px-8 py-8">
 <p className="font-sans text-sm font-bold uppercase text-[#e0b63e]">
 Around the World
 </p>
 <h2 className="archive-anton mt-7 max-w-[720px] text-5xl uppercase leading-[0.95] text-[#e9e3d4] md:text-6xl">
 {countries[0].name} leaves
 <br />
 the deepest mark
 </h2>
 </div>

 <div className="p-7 md:p-8">
 <div className="grid gap-4 lg:grid-cols-2">
 {countries.map((country, index) => (
 <button
 key={country.name}
 type="button"
 onClick={() => setSelectedCountry(country)}
 className="group grid min-h-[114px] grid-cols-[minmax(0,1fr)_minmax(180px,270px)] items-center gap-5 rounded-[14px] bg-[#0b0b0b] px-7 py-5 text-left transition-transform duration-200 hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610C33]"
 aria-label={`Open ${country.name} movies`}
 >
 <div className="min-w-0">
 <h3 className="archive-anton truncate text-3xl uppercase leading-none text-[#e9e3d4]">
 <span className="text-[#8b0f49]">
 {String(index + 1).padStart(2, "0")}.
 </span>{" "}
 {country.name}
 </h3>
 <p className="mt-3 font-sans text-sm font-bold uppercase text-[#6f6c7a]">
 {country.count} {country.count === 1 ? "movie" : "movies"} /{" "}
 {country.percentage}% • {formatScore(country.averagePersonalScore)} avg
 </p>
 </div>

 <CompactMovieStrip movies={country.coverMovies} />
 </button>
 ))}
 </div>
 </div>
 </div>
 </section>
 )}

 {selectedCountry && (
 <div
 className="motion-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="dashboard-country-title"
 >
 <button
 type="button"
 className="absolute inset-0"
 aria-label="Close country movies"
 onClick={() => setSelectedCountry(null)}
 />
 <section className="motion-modal-card relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[24px] bg-[#050505] shadow-2xl">
 <header className="flex items-center justify-between gap-4 border-b border-[#610C33]/35 px-6 py-5">
 <div>
 <p className="font-sans text-xs font-bold uppercase text-[#e0b63e]">
 Around the World
 </p>
 <h2
 id="dashboard-country-title"
 className="archive-anton mt-1 text-4xl uppercase leading-none text-[#e9e3d4]"
 >
 {selectedCountry.name}
 </h2>
 </div>
 <button
 type="button"
 onClick={() => setSelectedCountry(null)}
 className="grid h-10 w-10 place-items-center rounded-full border border-[#e9e3d4]/10 text-[#e9e3d4] transition-colors hover:border-[#610C33]"
 aria-label="Close country movies"
 >
 <X className="h-5 w-5" />
 </button>
 </header>

 <div className="archive-scrollbar max-h-[calc(86vh-96px)] overflow-y-auto p-6">
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {selectedCountry.movies.map((movie) => (
 <DashboardModalMovieCard key={movie.id} movie={movie} />
 ))}
 </div>
 </div>
 </section>
 </div>
 )}

 {subgenres.length > 0 && (
 <section className="bg-[#0b0b0b] px-8 pb-20 pt-8">
 <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-black">
 <div className="flex min-h-[232px] flex-col justify-center bg-black px-8 py-8">
 <p className="font-sans text-sm font-bold uppercase text-[#e0b63e]">
 Horror Subgenres
 </p>
 <h2 className="archive-anton mt-7 max-w-[780px] text-5xl uppercase leading-[0.95] text-[#e9e3d4] md:text-6xl">
 The archive reveals
 <br />
 identities
 </h2>
 </div>

 <div className="p-7 md:p-8">
 <div className="grid gap-4 lg:grid-cols-2">
 {subgenres.map((subgenre, index) => (
 <button
 key={subgenre.name}
 type="button"
 onClick={() => setSelectedSubgenre(subgenre)}
 className="group grid min-h-[114px] grid-cols-[minmax(0,1fr)_minmax(180px,270px)] items-center gap-5 rounded-[14px] bg-[#0b0b0b] px-7 py-5 text-left transition-transform duration-200 hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610C33]"
 aria-label={`Open ${subgenre.name} movies`}
 >
 <div className="min-w-0">
 <h3 className="archive-anton truncate text-3xl leading-none text-[#e9e3d4]">
 <span className="text-[#8b0f49]">
 {String(index + 1).padStart(2, "0")}.
 </span>{" "}
 {subgenre.name}
 </h3>
 <p className="mt-3 font-sans text-sm font-bold uppercase text-[#6f6c7a]">
 {subgenre.count} {subgenre.count === 1 ? "movie" : "movies"} /{" "}
 {subgenre.percentage}% • {formatScore(subgenre.averagePersonalScore)} avg
 </p>
 </div>

 <CompactMovieStrip movies={subgenre.coverMovies} />
 </button>
 ))}
 </div>
 </div>
 </div>
 </section>
 )}

 {selectedSubgenre && (
 <div
 className="motion-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="dashboard-subgenre-title"
 >
 <button
 type="button"
 className="absolute inset-0"
 aria-label="Close subgenre movies"
 onClick={() => setSelectedSubgenre(null)}
 />
 <section className="motion-modal-card relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[24px] bg-[#050505] shadow-2xl">
 <header className="flex items-center justify-between gap-4 border-b border-[#610C33]/35 px-6 py-5">
 <div>
 <p className="font-sans text-xs font-bold uppercase text-[#e0b63e]">
 Horror Subgenres
 </p>
 <h2
 id="dashboard-subgenre-title"
 className="archive-anton mt-1 text-4xl leading-none text-[#e9e3d4]"
 >
 {selectedSubgenre.name}
 </h2>
 </div>
 <button
 type="button"
 onClick={() => setSelectedSubgenre(null)}
 className="grid h-10 w-10 place-items-center rounded-full border border-[#e9e3d4]/10 text-[#e9e3d4] transition-colors hover:border-[#610C33]"
 aria-label="Close subgenre movies"
 >
 <X className="h-5 w-5" />
 </button>
 </header>

 <div className="archive-scrollbar max-h-[calc(86vh-96px)] overflow-y-auto p-6">
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {selectedSubgenre.movies.map((movie) => (
 <DashboardModalMovieCard key={movie.id} movie={movie} />
 ))}
 </div>
 </div>
 </section>
 </div>
 )}

 {distributors.length > 0 && (
 <section className="bg-[#0b0b0b] px-8 pb-20 pt-8">
 <div className="mx-auto overflow-hidden rounded-[24px] bg-black" style={{ maxWidth: "1440px" }}>
 <div className="flex min-h-[232px] flex-col justify-center bg-black px-8 py-8">
 <p className="font-sans text-sm font-bold uppercase text-[#e0b63e]">
 Distributors and Studios
 </p>
 <h2 className="archive-anton mt-7 max-w-[780px] text-5xl uppercase leading-[0.95] text-[#e9e3d4] md:text-6xl">
 The labels stamped
 <br />
 across the collection
 </h2>
 </div>

 <div className="p-7 md:p-8">
 <div className="grid gap-4 lg:grid-cols-2">
 {distributors.map((distributor, index) => (
 <button
 key={distributor.name}
 type="button"
 onClick={() => setSelectedDistributor(distributor)}
 className="group grid min-h-[114px] grid-cols-[minmax(0,1fr)_minmax(180px,270px)] items-center gap-5 rounded-[14px] bg-[#0b0b0b] px-7 py-5 text-left transition-transform duration-200 hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610C33]"
 aria-label={`Open ${distributor.name} movies`}
 >
 <div className="min-w-0">
 <h3 className="archive-anton truncate text-3xl leading-none text-[#e9e3d4]">
 <span className="text-[#8b0f49]">
 {String(index + 1).padStart(2, "0")}.
 </span>{" "}
 {distributor.name}
 </h3>
 <p className="mt-3 font-sans text-sm font-bold uppercase text-[#6f6c7a]">
 {distributor.count}{" "}
 {distributor.count === 1 ? "movie" : "movies"} /{" "}
 {distributor.percentage}% • {formatScore(distributor.averagePersonalScore)} avg
 </p>
 </div>

 <CompactMovieStrip movies={distributor.coverMovies} />
 </button>
 ))}
 </div>
 </div>
 </div>
 </section>
 )}

 {selectedDistributor && (
 <div
 className="motion-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="dashboard-distributor-title"
 >
 <button
 type="button"
 className="absolute inset-0"
 aria-label="Close distributor movies"
 onClick={() => setSelectedDistributor(null)}
 />
 <section className="motion-modal-card relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[24px] bg-[#050505] shadow-2xl">
 <header className="flex items-center justify-between gap-4 border-b border-[#610C33]/35 px-6 py-5">
 <div>
 <p className="font-sans text-xs font-bold uppercase text-[#e0b63e]">
 Distributors and Studios
 </p>
 <h2
 id="dashboard-distributor-title"
 className="archive-anton mt-1 text-4xl leading-none text-[#e9e3d4]"
 >
 {selectedDistributor.name}
 </h2>
 </div>
 <button
 type="button"
 onClick={() => setSelectedDistributor(null)}
 className="grid h-10 w-10 place-items-center rounded-full border border-[#e9e3d4]/10 text-[#e9e3d4] transition-colors hover:border-[#610C33]"
 aria-label="Close distributor movies"
 >
 <X className="h-5 w-5" />
 </button>
 </header>

 <div className="archive-scrollbar max-h-[calc(86vh-96px)] overflow-y-auto p-6">
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {selectedDistributor.movies.map((movie) => (
 <DashboardModalMovieCard key={movie.id} movie={movie} />
 ))}
 </div>
 </div>
 </section>
 </div>
 )}

 {selectedCollection && (
 <div
 className="motion-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="dashboard-collection-title"
 >
 <button
 type="button"
 className="absolute inset-0"
 aria-label="Close collection movies"
 onClick={() => setSelectedCollection(null)}
 />
 <section className="motion-modal-card relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[24px] bg-[#050505] shadow-2xl">
 <header className="flex items-center justify-between gap-4 border-b border-[#610C33]/35 px-6 py-5">
 <div>
 <p className="font-sans text-xs font-bold uppercase text-[#e0b63e]">
 {selectedCollection.eyebrow}
 </p>
 <h2
 id="dashboard-collection-title"
 className="archive-anton mt-1 text-4xl uppercase leading-none text-[#e9e3d4]"
 >
 {selectedCollection.title}
 </h2>
 </div>
 <button
 type="button"
 onClick={() => setSelectedCollection(null)}
 className="grid h-10 w-10 place-items-center rounded-full border border-[#e9e3d4]/10 text-[#e9e3d4] transition-colors hover:border-[#610C33]"
 aria-label="Close collection movies"
 >
 <X className="h-5 w-5" />
 </button>
 </header>

 <div className="archive-scrollbar max-h-[calc(86vh-96px)] overflow-y-auto p-6">
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {selectedCollection.movies.map((movie) => (
 <DashboardModalMovieCard key={movie.id} movie={movie} />
 ))}
 </div>
 </div>
 </section>
 </div>
 )}

 {selectedPersonMovies && (
 <div
 className="motion-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="dashboard-person-movies-title"
 >
 <button
 type="button"
 className="absolute inset-0"
 aria-label="Close person movies"
 onClick={() => setSelectedPersonMovies(null)}
 />
 <section className="motion-modal-card relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[24px] bg-[#050505] shadow-2xl">
 <header className="flex items-center justify-between gap-4 border-b border-[#610C33]/35 px-6 py-5">
 <div>
 <p className="font-sans text-xs font-bold uppercase text-[#e0b63e]">
 {selectedPersonMovies.label}
 </p>
 <h2
 id="dashboard-person-movies-title"
 className="archive-anton mt-1 text-4xl uppercase leading-none text-[#e9e3d4]"
 >
 {selectedPersonMovies.person.name}
 </h2>
 <p className="mt-2 font-sans text-sm font-bold uppercase text-[#6f6c7a]">
 <span className="text-[#e0b63e]">
 {selectedPersonMovies.person.count}
 </span>{" "}
 {selectedPersonMovies.person.count === 1 ? "movie" : "movies"}
 </p>
 </div>
 <button
 type="button"
 onClick={() => setSelectedPersonMovies(null)}
 className="grid h-10 w-10 place-items-center rounded-full border border-[#e9e3d4]/10 text-[#e9e3d4] transition-colors hover:border-[#610C33]"
 aria-label="Close person movies"
 >
 <X className="h-5 w-5" />
 </button>
 </header>

 <div className="archive-scrollbar max-h-[calc(86vh-96px)] overflow-y-auto p-6">
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {selectedPersonMovies.person.movies
 .map((movie) => moviesById.get(movie.movieId))
 .filter((movie): movie is LibraryMovie => Boolean(movie))
 .map((movie) => (
 <DashboardModalMovieCard key={movie.id} movie={movie} />
 ))}
 </div>
 </div>
 </section>
 </div>
 )}

 {peopleSections.length > 0 && (
 <section className="bg-[#0b0b0b] px-8 pb-20 pt-8">
 <div className="mx-auto max-w-[1440px]">
 <div className="mb-10 text-center">
 <p className="font-sans text-sm font-bold uppercase text-[#e0b63e]">
 Most Watched People
 </p>
 <h2 className="archive-anton mt-5 text-5xl uppercase leading-none text-[#e9e3d4] md:text-6xl">
 Familiar faces keep returning
 </h2>
 </div>

 <div className="grid gap-6 xl:grid-cols-2">
 {peopleSections.map((section) => (
 <PeopleCard
 key={section.label}
 label={section.label}
 people={section.people}
 onOpenPerson={(person) =>
 setSelectedPersonMovies({
 eyebrow: "Most Watched People",
 label: section.label,
 person,
 })
 }
 />
 ))}
 </div>
 </div>
 </section>
 )}

 {(masterpieceMovies.length > 0 ||
 annualWinnerMovies.length > 0 ||
 nastyMovies.length > 0 ||
 trashMovies.length > 0 ||
 guiltyPleasureMovies.length > 0 ||
 worstMovies.length > 0) && (
 <section className="bg-[#0b0b0b] px-8 pb-20 pt-8">
 <div className="mx-auto grid max-w-[1440px] gap-8">
 {masterpieceMovies.length > 0 && (
 <div
 className="cursor-pointer overflow-hidden rounded-[24px] border border-[#c8a84e]/70 bg-black px-9 py-9 transition-transform duration-200 hover:scale-[1.015] md:px-10 md:py-10"
 onClick={() =>
 setSelectedCollection({
 eyebrow: "The Masterpieces",
 title: "Perfect scores in gold",
 movies: allMasterpieceMovies,
 })
 }
 style={{
 backgroundImage:
 "linear-gradient(90deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.92) 45%, rgba(0,0,0,0.74) 68%, rgba(0,0,0,0.9) 100%), url('/badges/badge_1.png')",
 backgroundRepeat: "no-repeat",
 backgroundPosition: "right -54px top -96px",
 backgroundSize: "680px 680px",
 }}
 >
 <p className="masterpiece-text font-sans text-sm font-bold uppercase">
 The Masterpieces
 </p>
 <h2 className="masterpiece-text archive-anton mt-7 max-w-4xl text-5xl uppercase leading-none md:text-6xl">
 Perfect scores in gold
 </h2>

 <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
 {masterpieceMovies.map((movie) => (
 <MasterpieceMovieCard key={movie.id} movie={movie} />
 ))}
 </div>
 </div>
 )}

 {annualWinnerMovies.length > 0 && (
 <div
 className="relative cursor-pointer overflow-hidden rounded-[24px] border border-[#c8a84e]/70 bg-black px-7 py-7 transition-transform duration-200 hover:scale-[1.015] md:px-8 md:py-8"
 onClick={() =>
 setSelectedCollection({
 eyebrow: "Best of Year",
 title: "Annual Winners",
 movies: annualWinnerMovies,
 })
 }
 >
 <img
 src="/images/skull.png"
 alt=""
 aria-hidden
 className="pointer-events-none absolute -right-16 -top-28 h-[640px] w-auto max-w-none opacity-70"
 />
 <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/88 to-black/60" />
 <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/18 via-black/20 to-black/78" />

 <div className="relative z-10">
 <p className="font-sans text-xs font-bold uppercase text-[#e0b63e]">
 Best of Year
 </p>
 <h2 className="masterpiece-text archive-anton mt-6 text-5xl uppercase leading-none md:text-6xl">
 Annual Winners
 </h2>

 <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
 {annualWinnerMovies.map((movie) => (
 <AnnualWinnerMovieCard key={movie.id} movie={movie} />
 ))}
 </div>
 </div>
 </div>
 )}

 {(nastyMovies.length > 0 || trashMovies.length > 0) && (
 <div className="grid gap-8 xl:grid-cols-2">
 {nastyMovies.length > 0 && (
 <BadgeShowcaseBlock
 eyebrow="Video Nasty Revival"
 title="Nastiest Nasties"
 movies={nastyMovies}
 tone="nasty"
 />
 )}

 {trashMovies.length > 0 && (
 <BadgeShowcaseBlock
 eyebrow="Cine Trash Revival"
 title="Trashiest Trashes"
 movies={trashMovies}
 tone="trash"
 />
 )}
 </div>
 )}

 {(guiltyPleasureMovies.length > 0 || worstMovies.length > 0) && (
 <div className="grid gap-8 xl:grid-cols-2">
 {guiltyPleasureMovies.length > 0 && (
 <BadgeShowcaseBlock
 eyebrow="Shame-free Favorites"
 title="Guiltiest Pleasures"
 movies={guiltyPleasureMovies}
 tone="guilty"
 />
 )}

 {worstMovies.length > 0 && (
 <BadgeShowcaseBlock
 eyebrow="The Worst"
 title="Baddest Baddies"
 movies={worstMovies}
 tone="worst"
 />
 )}
 </div>
 )}
 </div>
 </section>
 )}
 </div>
 );
}


