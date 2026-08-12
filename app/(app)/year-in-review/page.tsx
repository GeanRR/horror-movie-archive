"use client";

import { useEffect, useMemo, useState } from "react";
import { Film, X } from "lucide-react";
import { MovieStars } from "@/components/movie/movie-stars";
import { VhsPoster } from "@/components/movie/vhs-poster";
import { abbreviateCountry, normalizeCountries } from "@/lib/constants/country-abbreviations";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";
import { useMovieStore } from "@/store/movie-store";
import type { LibraryMovie } from "@/store/movie-store";

const MONTHS = [
 "January",
 "February",
 "March",
 "April",
 "May",
 "June",
 "July",
 "August",
 "September",
 "October",
 "November",
 "December",
] as const;

type WatchedMovie = {
 movie: LibraryMovie;
 date: Date;
 month: number;
};

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

type MonthlyModal = {
 month: string;
 count: number;
 movies: WatchedMovie[];
} | null;

type PersonMoviesModal = {
 label: string;
 person: PersonEntry;
} | null;

type SubgenreGroup = {
 name: string;
 count: number;
 percentage: number;
 averagePersonalScore: number | null;
 movies: LibraryMovie[];
 coverMovies: LibraryMovie[];
};

type SubgenreModal = SubgenreGroup | null;

function parseWatchedDate(value: string) {
 if (!value.trim()) return null;
 const date = new Date(`${value.slice(0, 10)}T00:00:00`);
 return Number.isNaN(date.getTime()) ? null : date;
}

function displayValue(value: string | null | undefined) {
 const trimmed = value?.trim();
 return trimmed && trimmed !== "-" && trimmed !== "—"
 ? trimmed
 : null;
}
function releaseYear(movie: LibraryMovie) {
 const parsed = Number(movie.year);
 return Number.isFinite(parsed) ? parsed : null;
}

function compactCountry(value: string | null | undefined) {
 return abbreviateCountry(value);
}

function compactDecade(value: number | null | undefined) {
 return typeof value === "number" ? `${String(value).slice(2)}s` : "-";
}

function formatMonthDay(date: Date) {
 return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
 date.getDate()
 ).padStart(2, "0")}`;
}

function formatHours(minutes: number) {
 const hours = minutes / 60;
 if (hours <= 0) return "0";
 return Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
}

function formatDaysFromMinutes(minutes: number) {
 if (minutes <= 0) return "0 days";
 const days = Math.max(1, Math.round(minutes / (60 * 24)));
 return pluralize(days, "day");
}

function pluralize(count: number, singular: string, plural = `${singular}s`) {
 return `${count} ${count === 1 ? singular : plural}`;
}

function firstDistributor(value: string | null | undefined) {
 const distributor = displayValue(value);
 if (!distributor) return null;

 return distributor
 .split(",")[0]
 .replace(/\s*\([^)]*\)/g, "")
 .trim();
}

function topCount<T extends string | number>(values: T[]) {
 const counts = new Map<T, number>();

 for (const value of values) {
 counts.set(value, (counts.get(value) ?? 0) + 1);
 }

 return [...counts.entries()].sort((a, b) => {
 if (b[1] !== a[1]) return b[1] - a[1];
 return String(a[0]).localeCompare(String(b[0]));
 })[0]?.[0];
}

function topMovieGroupEntry(
 entries: WatchedMovie[],
 labelsForEntry: (entry: WatchedMovie) => string[]
) {
 const groups = new Map<string, LibraryMovie[]>();

 for (const entry of entries) {
 for (const label of new Set(labelsForEntry(entry).filter(Boolean))) {
 const current = groups.get(label) ?? [];
 current.push(entry.movie);
 groups.set(label, current);
 }
 }

 const [label, movies] =
 [...groups.entries()].sort((a, b) => {
 const countDelta = b[1].length - a[1].length;
 if (countDelta !== 0) return countDelta;
 const scoreDelta =
 (averagePersonalScore(b[1]) ?? -1) - (averagePersonalScore(a[1]) ?? -1);
 if (scoreDelta !== 0) return scoreDelta;
 return a[0].localeCompare(b[0]);
 })[0] ?? [];

 return label && movies ? { label, count: movies.length } : null;
}

function sortByWatchedDate(a: WatchedMovie, b: WatchedMovie) {
 const dateDelta = a.date.getTime() - b.date.getTime();
 if (dateDelta !== 0) return dateDelta;
 return a.movie.displayTitle.localeCompare(b.movie.displayTitle);
}

function compareBestMovie(a: WatchedMovie, b: WatchedMovie) {
 if (a.movie.bestOfYear !== b.movie.bestOfYear) {
 return a.movie.bestOfYear ? -1 : 1;
 }

 const scoreDelta = (b.movie.reviewScore ?? -1) - (a.movie.reviewScore ?? -1);
 if (scoreDelta !== 0) return scoreDelta;

 const starsDelta = (b.movie.stars ?? 0) - (a.movie.stars ?? 0);
 if (starsDelta !== 0) return starsDelta;

 return a.movie.displayTitle.localeCompare(b.movie.displayTitle);
}

function compareMovieScore(a: LibraryMovie, b: LibraryMovie) {
 const scoreDelta = (b.reviewScore ?? -1) - (a.reviewScore ?? -1);
 if (scoreDelta !== 0) return scoreDelta;

 const starsDelta = (b.stars ?? 0) - (a.stars ?? 0);
 if (starsDelta !== 0) return starsDelta;

 return a.displayTitle.localeCompare(b.displayTitle);
}

function compareMovieLowestScore(a: LibraryMovie, b: LibraryMovie) {
 const scoreDelta = (a.reviewScore ?? 999) - (b.reviewScore ?? 999);
 if (scoreDelta !== 0) return scoreDelta;

 const starsDelta = (a.stars ?? 999) - (b.stars ?? 999);
 if (starsDelta !== 0) return starsDelta;

 return a.displayTitle.localeCompare(b.displayTitle);
}

function formatWatchedDay(date: Date) {
 return `${MONTHS[date.getMonth()].slice(0, 3).toUpperCase()} ${date.getDate()}`;
}

function StatCard({
 label,
 value,
 detail,
}: {
 label: string;
 value: string;
 detail: string;
}) {
 return (
 <article className="flex min-h-[126px] flex-col items-center justify-center rounded-[22px] bg-black px-6 py-6 text-center">
 <p className="font-sans text-xs font-bold uppercase text-[#6f6c7a]">
 {label}
 </p>
 <p className="archive-anton mt-3 text-[2rem] uppercase leading-none text-[#e9e3d4]">
 {value}
 </p>
 <p className="archive-anton mt-3 text-xl leading-none text-[#e9e3d4]">
 {detail}
 </p>
 </article>
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
 <div
 className={`${className} grid place-items-center bg-[#111] text-[#6f6c7a]`}
 >
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
 {Math.round(lead.percentage)}% •{" "}
 {formatReviewScore(lead.averagePersonalScore)} avg
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
 <PersonPhoto person={person} className="h-9 w-9 rounded-full" />
 <div className="min-w-0">
 <p className="archive-anton text-xl leading-none text-[#e9e3d4]">
 <span className="text-[#8b0f49]">
 {String(index + 2).padStart(2, "0")}.
 </span>{" "}
 {person.name}
 </p>
 <p className="mt-1 font-sans text-xs font-bold uppercase text-[#6f6c7a]">
 <span className="text-[#e0b63e]">{person.count}</span>{" "}
 {person.count === 1 ? "movie" : "movies"} /{" "}
 {Math.round(person.percentage)}% •{" "}
 {formatReviewScore(person.averagePersonalScore)} avg
 </p>
 </div>
 </button>
 ))}
 </div>
 )}
 </article>
 );
}

function MonthlyPosterStrip({ movies }: { movies: LibraryMovie[] }) {
 if (movies.length === 0) {
 return (
 <div className="grid h-[150px] w-full max-w-[210px] place-items-center rounded-[10px] bg-[#111] text-[#6f6c7a]">
 <Film className="h-8 w-8" />
 </div>
 );
 }

 return (
 <div className="relative mb-7 h-[150px] w-full max-w-[210px]">
 {movies.slice(0, 5).map((movie, index) =>
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
 <Film className="h-5 w-5" />
 </div>
 )
 )}
 </div>
 );
}

function averagePersonalScore(movies: LibraryMovie[]) {
 const scores = movies
 .map((movie) => movie.reviewScore)
 .filter((score): score is number => typeof score === "number");

 if (scores.length === 0) return null;

 return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function compareGroupsByCountScoreName<
 T extends { count: number; averagePersonalScore: number | null; name: string },
>(a: T, b: T) {
 if (b.count !== a.count) return b.count - a.count;
 const scoreDelta =
 (b.averagePersonalScore ?? -1) - (a.averagePersonalScore ?? -1);
 if (scoreDelta !== 0) return scoreDelta;
 return a.name.localeCompare(b.name);
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

function MonthlyMovieCard({ entry }: { entry: WatchedMovie }) {
 const { movie, date } = entry;

 return (
 <article className="grid min-w-0 grid-cols-[72px_1fr] gap-4 rounded-[14px] bg-[#e9e3d4]/[0.03] p-3">
 {movie.posterUrl ? (
 <VhsPoster
 src={movie.posterUrl}
 alt={movie.displayTitle}
 className="h-[104px] w-[72px] rounded-[6px]"
 imageClassName="object-cover"
 />
 ) : (
 <div className="grid h-[104px] w-[72px] place-items-center rounded-[6px] bg-[#111] text-[#6f6c7a]">
 <Film className="h-6 w-6" />
 </div>
 )}

 <div className="min-w-0 self-center">
 <p className="font-sans text-xs font-black uppercase text-[#E0B63E]">
 {formatMonthDay(date)}
 </p>
 <h3 className="archive-anton mt-2 text-2xl uppercase leading-none text-[#e9e3d4]">
 {movie.displayTitle}
 </h3>
 <p className="mt-2 font-sans text-xs font-black uppercase text-[#6f6c7a]">
 <span className="font-black">{movie.year}</span>
 <span className="mx-2 font-black">•</span>
 <span className="font-normal">
 {displayValue(movie.director) ?? "-"}
 </span>
 </p>
 <div className="mt-3 flex items-center gap-2">
 <span className="font-sans text-sm font-black text-[#e9e3d4]">
 {formatReviewScore(movie.reviewScore)}
 </span>
 <MovieStars stars={movie.stars} size="sm" />
 </div>
 </div>
 </article>
 );
}

function YearModalMovieCard({ movie }: { movie: LibraryMovie }) {
 return (
 <article className="grid min-w-0 grid-cols-[72px_1fr] gap-4 rounded-[14px] bg-[#e9e3d4]/[0.03] p-3">
 {movie.posterUrl ? (
 <VhsPoster
 src={movie.posterUrl}
 alt={movie.displayTitle}
 className="h-[104px] w-[72px] rounded-[6px]"
 imageClassName="object-cover"
 />
 ) : (
 <div className="grid h-[104px] w-[72px] place-items-center rounded-[6px] bg-[#111] text-[#6f6c7a]">
 <Film className="h-6 w-6" />
 </div>
 )}

 <div className="min-w-0 self-center">
 <h3 className="font-sans text-sm font-semibold text-[#e9e3d4]">
 {movie.displayTitle}
 </h3>
 <p className="mt-1 font-sans text-sm text-[#6f6c7a]">
 {releaseYear(movie) ?? "—"}
 </p>
 <span className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm font-black leading-none text-[#e9e3d4]">
 <img
 src="/images/gean.png"
 alt=""
 aria-hidden
 className="h-6 w-6 rounded-full object-cover grayscale"
 />
 {formatReviewScore(movie.reviewScore)}
 </span>
 </div>
 </article>
 );
}

function ScoreShowcaseMovie({
 movie,
 index,
}: {
 movie: LibraryMovie;
 index: number;
}) {
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
 <h3 className="archive-anton text-[18px] uppercase leading-none text-[#e9e3d4]">
 <span className="text-[#8b0f49]">
 {String(index + 1).padStart(2, "0")}.
 </span>{" "}
 {movie.displayTitle}
 </h3>
 <p className="mt-3 font-sans text-[14px] leading-[1.05] text-[#e9e3d4]">
 <span className="font-black">{movie.year}</span>
 <span className="mx-2 font-black">•</span>
 <span className="font-normal">
 {displayValue(movie.director) ?? "-"}
 </span>
 </p>
 <div className="mt-3 flex items-center gap-2">
 <span className="inline-flex items-center gap-1.5 font-sans text-lg font-black leading-none text-[#e9e3d4]">
 <img
 src="/images/gean.png"
 alt=""
 aria-hidden
 className="h-6 w-6 rounded-full object-cover grayscale"
 />
 {formatReviewScore(movie.reviewScore)}
 </span>
 <MovieStars stars={movie.stars} size="sm" />
 </div>
 </div>
 </article>
 );
}

function ScoreShowcaseBlock({
 eyebrow,
 title,
 movies,
 accent,
 badgePath,
}: {
 eyebrow: string;
 title: string;
 movies: LibraryMovie[];
 accent: string;
 badgePath: string;
}) {
 return (
 <article
 className="relative overflow-hidden rounded-[24px] border bg-black px-8 py-9"
 style={{
 borderColor: accent,
 backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.9) 46%, rgba(0,0,0,0.64) 76%, rgba(0,0,0,0.88) 100%), url('${badgePath}')`,
 backgroundPosition: "right -96px top -72px",
 backgroundRepeat: "no-repeat",
 backgroundSize: "520px 520px",
 }}
 >
 <p className="relative z-10 font-sans text-sm font-bold uppercase text-[#E0B63E]">
 {eyebrow}
 </p>
 <h2
 className="relative z-10 archive-anton mt-7 text-5xl uppercase leading-none md:text-6xl"
 style={{ color: accent }}
 >
 {title}
 </h2>

 {movies.length > 0 ? (
 <div className="relative z-10 mt-12 grid gap-x-8 gap-y-8 md:grid-cols-2">
 {movies.map((movie, index) => (
 <ScoreShowcaseMovie key={movie.id} movie={movie} index={index} />
 ))}
 </div>
 ) : (
 <div className="relative z-10 mt-12 grid min-h-[220px] place-items-center rounded-[18px] bg-black/70 text-center">
 <div>
 <Film className="mx-auto h-10 w-10 text-[#6f6c7a]" />
 <p className="archive-anton mt-5 text-3xl uppercase leading-none text-[#e9e3d4]">
 No movies yet
 </p>
 </div>
 </div>
 )}
 </article>
 );
}

export default function YearInReviewPage() {
 const movies = useMovieStore((state) => state.movies);
 const currentYear = new Date().getFullYear();
 const [people, setPeople] = useState<PeopleResponse["people"] | null>(null);
 const [selectedMonth, setSelectedMonth] = useState<MonthlyModal>(null);
 const [selectedSubgenre, setSelectedSubgenre] =
 useState<SubgenreModal>(null);
 const [selectedPersonMovies, setSelectedPersonMovies] =
 useState<PersonMoviesModal>(null);

 const moviesById = useMemo(
 () => new Map(movies.map((movie) => [movie.id, movie])),
 [movies]
 );

 const watchedMovies = useMemo<WatchedMovie[]>(
 () =>
 movies
 .map((movie) => {
 const date = parseWatchedDate(movie.watchedDate);
 return date
 ? {
 movie,
 date,
 month: date.getMonth(),
 }
 : null;
 })
 .filter((entry): entry is WatchedMovie => Boolean(entry)),
 [movies]
 );

 const years = useMemo(() => {
 const values = watchedMovies.map((entry) => entry.date.getFullYear());
 return [...new Set([currentYear, ...values])].sort((a, b) => b - a);
 }, [currentYear, watchedMovies]);

 const [selectedYear, setSelectedYear] = useState(currentYear);

 const yearEntries = useMemo(
 () =>
 watchedMovies.filter(
 (entry) => entry.date.getFullYear() === selectedYear
 ),
 [selectedYear, watchedMovies]
 );

 const mostActiveMonth = useMemo(() => {
 const monthCounts = MONTHS.map((month, index) => ({
 month,
 count: yearEntries.filter((entry) => entry.month === index).length,
 })).filter((entry) => entry.count > 0);

 return monthCounts.sort((a, b) => b.count - a.count)[0]?.month ?? "-";
 }, [yearEntries]);

 const topDecade = useMemo(() => {
 const decades = yearEntries
 .map(({ movie }) => releaseYear(movie))
 .filter((year): year is number => typeof year === "number")
 .map((year) => Math.floor(year / 10) * 10);

 return topCount(decades);
 }, [yearEntries]);

 const topCountry = useMemo(() => {
 const countries = yearEntries
 .flatMap(({ movie }) => normalizeCountries(movie.country));

 return topCount(countries);
 }, [yearEntries]);

 const yearHeroStats = [
 ["Total movies", String(yearEntries.length)],
 ["Most watched month", mostActiveMonth.slice(0, 3).toUpperCase()],
 ["Most watched decade", compactDecade(topDecade)],
 ["Most watched country", compactCountry(topCountry)],
 ] as const;

 const bestMovieEntry = useMemo(
 () => [...yearEntries].sort(compareBestMovie)[0] ?? null,
 [yearEntries]
 );

 const yearStats = useMemo(() => {
 const entriesByDate = [...yearEntries].sort(sortByWatchedDate);
 const totalRuntime = yearEntries.reduce(
 (sum, { movie }) => sum + (movie.runtime ?? 0),
 0
 );
 const watchedDays = new Set(
 yearEntries.map(({ date }) => date.toISOString().slice(0, 10))
 ).size;
 const newReleases = yearEntries.filter(
 ({ movie }) => releaseYear(movie) === selectedYear
 ).length;
 const oldest = [...yearEntries]
 .filter(({ movie }) => releaseYear(movie) !== null)
 .sort((a, b) => {
 const yearDelta = releaseYear(a.movie)! - releaseYear(b.movie)!;
 if (yearDelta !== 0) return yearDelta;
 return a.movie.displayTitle.localeCompare(b.movie.displayTitle);
 })[0];
 const topDirector = topMovieGroupEntry(yearEntries, ({ movie }) => {
 const director = displayValue(movie.director);
 return director ? [director] : [];
 });
 const topDistributor = topMovieGroupEntry(yearEntries, ({ movie }) => {
 const distributor = firstDistributor(movie.distributor);
 return distributor ? [distributor] : [];
 });

 return [
 {
 label: "Hours watched",
 value: formatHours(totalRuntime),
 detail: formatDaysFromMinutes(totalRuntime),
 },
 {
 label: "Days watching horror",
 value: String(watchedDays),
 detail: pluralize(yearEntries.length, "movie"),
 },
 {
 label: "First movie of the year",
 value: entriesByDate[0]?.movie.displayTitle ?? "-",
 detail: entriesByDate[0] ? formatMonthDay(entriesByDate[0].date) : "-",
 },
 {
 label: "Last movie of the year",
 value: entriesByDate.at(-1)?.movie.displayTitle ?? "-",
 detail: entriesByDate.at(-1)
 ? formatMonthDay(entriesByDate.at(-1)!.date)
 : "-",
 },
 {
 label: "New releases watched",
 value: String(newReleases),
 detail: "Movies",
 },
 {
 label: "Oldest movie watched",
 value: oldest ? String(releaseYear(oldest.movie)) : "-",
 detail: oldest?.movie.displayTitle ?? "-",
 },
 {
 label: "Most watched director",
 value: topDirector?.label ?? "-",
 detail: topDirector ? pluralize(topDirector.count, "movie") : "-",
 },
 {
 label: "Most watched distributor",
 value: topDistributor?.label ?? "-",
 detail: topDistributor ? pluralize(topDistributor.count, "movie") : "-",
 },
 ];
 }, [selectedYear, yearEntries]);

 const monthlyFavorites = useMemo(
 () =>
 MONTHS.map((month, index) => {
 const monthMovies = yearEntries
 .filter((entry) => entry.month === index)
 .map(({ movie }) => movie);

 return {
 month,
 count: monthMovies.length,
 movies: [...yearEntries]
 .filter((entry) => entry.month === index)
 .sort(sortByWatchedDate),
 percentage:
 yearEntries.length > 0
 ? Math.round((monthMovies.length / yearEntries.length) * 100)
 : 0,
 coverMovies: [...monthMovies].sort(compareMovieScore).slice(0, 5),
 };
 }),
 [yearEntries]
 );

 const subgenres = useMemo<SubgenreGroup[]>(() => {
 const groups = new Map<string, LibraryMovie[]>();

 for (const { movie } of yearEntries) {
 const subgenre = displayValue(movie.subgenres[0]);
 if (!subgenre) continue;

 const current = groups.get(subgenre) ?? [];
 current.push(movie);
 groups.set(subgenre, current);
 }

 return [...groups.entries()]
 .map(([name, subgenreMovies]) => ({
 name,
 count: subgenreMovies.length,
 percentage: yearEntries.length
 ? Math.round((subgenreMovies.length / yearEntries.length) * 100)
 : 0,
 averagePersonalScore: averagePersonalScore(subgenreMovies),
 movies: [...subgenreMovies].sort(compareMovieScore),
 coverMovies: [...subgenreMovies].sort(compareMovieScore).slice(0, 5),
 }))
 .sort(compareGroupsByCountScoreName)
 .slice(0, 10);
 }, [yearEntries]);

 const highestRatedMovies = useMemo(
 () =>
 yearEntries
 .map(({ movie }) => movie)
 .filter((movie) => movie.reviewScore !== null)
 .sort(compareMovieScore)
 .slice(0, 10),
 [yearEntries]
 );

 const lowestRatedMovies = useMemo(
 () =>
 yearEntries
 .map(({ movie }) => movie)
 .filter((movie) => movie.reviewScore !== null)
 .sort(compareMovieLowestScore)
 .slice(0, 10),
 [yearEntries]
 );

 useEffect(() => {
 if (yearEntries.length === 0) {
 setPeople(null);
 return;
 }

 const controller = new AbortController();

 fetch("/api/tmdb/archive-people", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 movies: yearEntries.map(({ movie }) => ({
 id: movie.id,
 tmdbId: movie.tmdbId,
 title: movie.displayTitle,
 posterUrl: movie.posterUrl ?? null,
 year: releaseYear(movie),
 reviewScore: movie.reviewScore,
 genres: movie.genres,
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
 }, [yearEntries]);

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

 return (
 <div className="pb-16 text-foreground">
 <section
 className="archive-hero-card relative overflow-hidden"
 style={{ backgroundImage: "url('/images/yearbg.png')" }}
 >
 <div className="relative z-10 flex min-h-[inherit] flex-col items-center justify-center px-6 py-16 text-center md:px-10">
 <div className="absolute right-6 top-6 z-20">
 <select
 className="archive-select !h-10 !w-auto min-w-24 bg-black/65 text-xs backdrop-blur"
 value={selectedYear}
 onChange={(event) => setSelectedYear(Number(event.target.value))}
 aria-label="Select year"
 >
 {years.map((year) => (
 <option key={year} value={year}>
 {year}
 </option>
 ))}
 </select>
 </div>

 <p className="archive-hero-kicker text-xs md:text-sm">
 Year in Review
 </p>
 <h1 className="archive-display-title mt-8 max-w-4xl text-[4.75rem] leading-[0.86] md:text-[7rem] xl:text-[7.45rem]">
 Your {selectedYear}
 <br />
 in Horror
 </h1>

 <div className="archive-hero-stats mt-12 grid w-full max-w-[1040px] grid-cols-1 overflow-hidden md:grid-cols-4">
 {yearHeroStats.map(([label, value]) => (
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

 <main className="mx-auto mt-12 flex w-full max-w-[1440px] flex-col gap-12 px-4 md:px-8">
 <section className="relative overflow-hidden rounded-[24px] border border-[#E0B63E]/80 bg-black px-8 py-8 md:px-10">
 <img
 src="/images/skull.png"
 alt=""
 aria-hidden
 className="pointer-events-none absolute bottom-[-126px] right-[-8px] h-[565px] w-auto max-w-none rotate-[14deg] opacity-100"
 />
 <div className="pointer-events-none absolute inset-y-0 left-0 w-[58%] bg-[linear-gradient(90deg,#000_0%,#000_74%,rgba(0,0,0,0)_100%)]" />

 {bestMovieEntry ? (
 <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
 {bestMovieEntry.movie.posterUrl ? (
 <VhsPoster
 src={bestMovieEntry.movie.posterUrl}
 alt={bestMovieEntry.movie.displayTitle}
 className="h-[270px] w-[182px] rounded-[10px]"
 imageClassName="object-cover"
 />
 ) : (
 <div className="flex h-[270px] w-[182px] shrink-0 items-center justify-center rounded-[10px] border border-[#E0B63E]/25 bg-[#050505] font-sans text-xs font-bold uppercase text-[#e9e3d4]/55">
 No poster
 </div>
 )}

 <div className="max-w-xl">
 <p className="font-sans text-sm font-bold uppercase text-[#E0B63E]">
 Best of {selectedYear}
 </p>
 <h2 className="masterpiece-text archive-anton mt-5 text-5xl uppercase leading-none md:text-6xl">
 {bestMovieEntry.movie.displayTitle}
 </h2>
 <p className="mt-4 font-sans text-[14px] text-[#e9e3d4]">
 <span className="font-black">
 {bestMovieEntry.movie.year}
 </span>
 <span className="mx-2 font-black">•</span>
 <span className="font-normal">
 {displayValue(bestMovieEntry.movie.director) ?? "-"}
 </span>
 </p>
 <div className="mt-5 flex flex-wrap items-center gap-2">
 <span className="inline-flex items-center gap-1.5 font-sans text-sm font-black text-[#e9e3d4]">
 <img
 src="/images/gean.png"
 alt=""
 aria-hidden
 className="h-5 w-5 rounded-full object-cover grayscale"
 />
 {formatReviewScore(bestMovieEntry.movie.reviewScore)}
 </span>
 <MovieStars stars={bestMovieEntry.movie.stars} size="sm" />
 </div>
 <p className="mt-6 font-sans text-sm font-black uppercase text-[#e9e3d4]">
 Watched {formatWatchedDay(bestMovieEntry.date)}
 </p>
 </div>
 </div>
 ) : (
 <div className="relative z-10 flex min-h-[270px] items-center">
 <div>
 <p className="font-sans text-sm font-bold uppercase text-[#E0B63E]">
 Best of {selectedYear}
 </p>
 <h2 className="masterpiece-text archive-anton mt-5 text-5xl uppercase leading-none md:text-6xl">
 No winner yet
 </h2>
 </div>
 </div>
 )}
 </section>

 <section className="py-10">
 <div className="mb-16 text-center">
 <p className="font-sans text-sm font-bold uppercase text-[#E0B63E]">
 Your year by the numbers
 </p>
 <h2 className="archive-anton mt-6 text-5xl uppercase leading-none text-[#e9e3d4] md:text-6xl">
 The shape of the archive this year
 </h2>
 </div>

 <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
 {yearStats.map((stat) => (
 <StatCard
 key={stat.label}
 label={stat.label}
 value={stat.value}
 detail={stat.detail}
 />
 ))}
 </div>
 </section>

 {subgenres.length > 0 && (
 <section className="overflow-hidden rounded-[24px] bg-black">
 <div className="flex min-h-[232px] flex-col justify-center bg-black px-8 py-8">
 <p className="font-sans text-sm font-bold uppercase text-[#E0B63E]">
 Horror Subgenres
 </p>
 <h2 className="archive-anton mt-7 max-w-[780px] text-5xl uppercase leading-[0.95] text-[#e9e3d4] md:text-6xl">
 The year reveals
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
 <h3 className="archive-anton text-3xl leading-none text-[#e9e3d4]">
 <span className="text-[#8b0f49]">
 {String(index + 1).padStart(2, "0")}.
 </span>{" "}
 {subgenre.name}
 </h3>
 <p className="mt-3 font-sans text-sm font-bold uppercase text-[#6f6c7a]">
 {subgenre.count} {subgenre.count === 1 ? "movie" : "movies"} /{" "}
 {subgenre.percentage}% •{" "}
 {formatReviewScore(subgenre.averagePersonalScore)} avg
 </p>
 </div>

 <CompactMovieStrip movies={subgenre.coverMovies} />
 </button>
 ))}
 </div>
 </div>
 </section>
 )}

 {peopleSections.length > 0 && (
 <section className="py-10">
 <div className="mb-10 text-center">
 <p className="font-sans text-sm font-bold uppercase text-[#E0B63E]">
 Most watched people
 </p>
 <h2 className="archive-anton mt-5 text-5xl uppercase leading-none text-[#e9e3d4] md:text-6xl">
 Familiar faces keep returning
 </h2>
 </div>

 <div className="grid gap-8 lg:grid-cols-2">
 {peopleSections.map((section) => (
 <PeopleCard
 key={section.label}
 label={section.label}
 people={section.people}
 onOpenPerson={(person) =>
 setSelectedPersonMovies({ label: section.label, person })
 }
 />
 ))}
 </div>
 </section>
 )}

 <section className="py-10">
 <div className="mb-14 text-center">
 <p className="font-sans text-sm font-bold uppercase text-[#E0B63E]">
 Monthly favorites
 </p>
 <h2 className="archive-anton mt-5 text-5xl uppercase leading-none text-[#e9e3d4] md:text-6xl">
 Twelve chapters, twelve possible obsessions
 </h2>
 </div>

 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
 {monthlyFavorites.map((month) => (
 <button
 key={month.month}
 type="button"
 onClick={() =>
 setSelectedMonth({
 month: month.month,
 count: month.count,
 movies: month.movies,
 })
 }
 className="flex min-h-[300px] flex-col items-center justify-end rounded-[20px] bg-black px-7 pb-7 pt-8 text-center transition-transform duration-200 hover:scale-[1.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610C33]"
 aria-label={`Open ${month.month} movies`}
 >
 <MonthlyPosterStrip movies={month.coverMovies} />
 <h3 className="archive-anton text-5xl leading-none text-[#e9e3d4]">
 {month.month}
 </h3>
 <p className="mt-3 font-sans text-xs font-bold uppercase text-[#6f6c7a]">
 {month.count} {month.count === 1 ? "movie" : "movies"} /{" "}
 {month.percentage}%
 </p>
 </button>
 ))}
 </div>
 </section>

 <section className="grid gap-8 py-10 lg:grid-cols-2">
 <ScoreShowcaseBlock
 eyebrow="The masterpieces"
 title="Perfect scores in gold"
 movies={highestRatedMovies}
 accent="#E0B63E"
 badgePath="/badges/badge_1.png"
 />
 <ScoreShowcaseBlock
 eyebrow="You survived these"
 title="Lowest lows"
 movies={lowestRatedMovies}
 accent="#b8b8b8"
 badgePath="/badges/badge_9.png"
 />
 </section>
 </main>

 {selectedSubgenre && (
 <div
 className="motion-modal-overlay fixed inset-0 z-50 grid place-items-center bg-black/80 px-4 py-8 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="year-subgenre-modal-title"
 onClick={() => setSelectedSubgenre(null)}
 >
 <section
 className="motion-modal-card relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[24px] bg-[#050505] shadow-2xl"
 onClick={(event) => event.stopPropagation()}
 >
 <div className="flex items-start justify-between gap-6 border-b border-[#e9e3d4]/10 px-6 py-5 md:px-8">
 <div>
 <p className="font-sans text-sm font-bold uppercase text-[#E0B63E]">
 Horror Subgenres
 </p>
 <h2
 id="year-subgenre-modal-title"
 className="archive-anton mt-2 text-4xl uppercase leading-none text-[#e9e3d4]"
 >
 {selectedSubgenre.name}
 </h2>
 <p className="mt-2 font-sans text-xs font-bold uppercase text-[#6f6c7a]">
 {selectedSubgenre.count}{" "}
 {selectedSubgenre.count === 1 ? "movie" : "movies"}
 </p>
 </div>
 <button
 type="button"
 onClick={() => setSelectedSubgenre(null)}
 className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#e9e3d4]/10 text-[#e9e3d4] transition-colors hover:bg-[#e9e3d4]/10"
 aria-label="Close modal"
 >
 <X className="h-5 w-5" />
 </button>
 </div>

 <div className="archive-scrollbar max-h-[calc(86vh-118px)] overflow-y-auto p-6 md:p-8">
 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
 {selectedSubgenre.movies.map((movie) => (
 <YearModalMovieCard key={movie.id} movie={movie} />
 ))}
 </div>
 </div>
 </section>
 </div>
 )}

 {selectedMonth && (
 <div
 className="motion-modal-overlay fixed inset-0 z-50 grid place-items-center bg-black/80 px-4 py-8 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="year-month-modal-title"
 onClick={() => setSelectedMonth(null)}
 >
 <section
 className="motion-modal-card relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[24px] bg-[#050505] shadow-2xl"
 onClick={(event) => event.stopPropagation()}
 >
 <div className="flex items-start justify-between gap-6 border-b border-[#e9e3d4]/10 px-6 py-5 md:px-8">
 <div>
 <p className="font-sans text-sm font-bold uppercase text-[#E0B63E]">
 Monthly favorites
 </p>
 <h2
 id="year-month-modal-title"
 className="archive-anton mt-2 text-4xl uppercase leading-none text-[#e9e3d4]"
 >
 {selectedMonth.month}
 </h2>
 <p className="mt-2 font-sans text-xs font-bold uppercase text-[#6f6c7a]">
 {selectedMonth.count}{" "}
 {selectedMonth.count === 1 ? "movie" : "movies"}
 </p>
 </div>
 <button
 type="button"
 onClick={() => setSelectedMonth(null)}
 className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#e9e3d4]/10 text-[#e9e3d4] transition-colors hover:bg-[#e9e3d4]/10"
 aria-label="Close modal"
 >
 <X className="h-5 w-5" />
 </button>
 </div>

 <div className="archive-scrollbar max-h-[calc(86vh-118px)] overflow-y-auto p-6 md:p-8">
 {selectedMonth.movies.length > 0 ? (
 <div className="grid gap-4 md:grid-cols-2">
 {selectedMonth.movies.map((entry) => (
 <MonthlyMovieCard key={entry.movie.id} entry={entry} />
 ))}
 </div>
 ) : (
 <div className="grid min-h-[240px] place-items-center rounded-[18px] bg-black text-center">
 <div>
 <Film className="mx-auto h-10 w-10 text-[#6f6c7a]" />
 <p className="archive-anton mt-5 text-3xl uppercase leading-none text-[#e9e3d4]">
 No movies this month
 </p>
 </div>
 </div>
 )}
 </div>
 </section>
 </div>
 )}

 {selectedPersonMovies && (
 <div
 className="motion-modal-overlay fixed inset-0 z-50 grid place-items-center bg-black/80 px-4 py-8 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="year-person-modal-title"
 onClick={() => setSelectedPersonMovies(null)}
 >
 <section
 className="motion-modal-card relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[24px] bg-[#050505] shadow-2xl"
 onClick={(event) => event.stopPropagation()}
 >
 <div className="flex items-start justify-between gap-6 border-b border-[#e9e3d4]/10 px-6 py-5 md:px-8">
 <div>
 <p className="font-sans text-sm font-bold uppercase text-[#E0B63E]">
 {selectedPersonMovies.label}
 </p>
 <h2
 id="year-person-modal-title"
 className="archive-anton mt-2 text-4xl uppercase leading-none text-[#e9e3d4]"
 >
 {selectedPersonMovies.person.name}
 </h2>
 <p className="mt-2 font-sans text-xs font-bold uppercase text-[#6f6c7a]">
 <span className="text-[#E0B63E]">
 {selectedPersonMovies.person.count}
 </span>{" "}
 {selectedPersonMovies.person.count === 1
 ? "movie"
 : "movies"}
 </p>
 </div>
 <button
 type="button"
 onClick={() => setSelectedPersonMovies(null)}
 className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#e9e3d4]/10 text-[#e9e3d4] transition-colors hover:bg-[#e9e3d4]/10"
 aria-label="Close modal"
 >
 <X className="h-5 w-5" />
 </button>
 </div>

 <div className="archive-scrollbar max-h-[calc(86vh-118px)] overflow-y-auto p-6 md:p-8">
 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
 {selectedPersonMovies.person.movies
 .map((personMovie) => moviesById.get(personMovie.movieId))
 .filter((movie): movie is LibraryMovie => Boolean(movie))
 .map((movie) => (
 <YearModalMovieCard key={movie.id} movie={movie} />
 ))}
 </div>
 </div>
 </section>
 </div>
 )}
 </div>
 );
}


