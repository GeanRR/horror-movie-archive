import { NextRequest, NextResponse } from "next/server";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";

type MoviePayload = {
 id: string;
 tmdbId: number;
 title: string;
 posterUrl: string | null;
 year: number | null;
 reviewScore: number | null;
};

type TmdbCastPerson = {
 id?: number;
 name?: string;
 gender?: number;
 known_for_department?: string;
 profile_path?: string | null;
};

type TmdbCrewPerson = {
 id?: number;
 name?: string;
 job?: string;
 department?: string;
 profile_path?: string | null;
};

type PersonAggregate = {
 id: number;
 name: string;
 department: string;
 count: number;
 profilePath: string | null;
 movies: MoviePayload[];
};

const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w342";

function aggregatePerson(
 map: Map<number, PersonAggregate>,
 person: {
 id?: number;
 name?: string;
 profile_path?: string | null;
 },
 department: string,
 movie: MoviePayload
) {
 if (!person.id || !person.name?.trim()) return;

 const current =
 map.get(person.id) ??
 {
 id: person.id,
 name: person.name,
 department,
 count: 0,
 profilePath: null,
 movies: [],
 };

 if (!current.movies.some((entry) => entry.id === movie.id)) {
 current.count += 1;
 current.movies.push(movie);
 }

 if (!current.profilePath && person.profile_path) {
 current.profilePath = person.profile_path;
 }

 map.set(person.id, current);
}

function decadeFromYear(year: number | null) {
 if (!year) return null;
 return `${Math.floor(year / 10) * 10}s`;
}

function mostCommonDecade(movies: MoviePayload[]) {
 const counts = new Map<string, number>();
 for (const movie of movies) {
 const decade = decadeFromYear(movie.year);
 if (!decade) continue;
 counts.set(decade, (counts.get(decade) ?? 0) + 1);
 }
 return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ?? null;
}

function averageScore(movies: MoviePayload[]) {
 const scores = movies
 .map((movie) => movie.reviewScore)
 .filter((score): score is number => typeof score === "number");
 if (scores.length === 0) return null;
 return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function serializePerson(person: PersonAggregate | undefined, totalMovies: number) {
 if (!person) return null;

 return {
 id: person.id,
 name: person.name,
 department: person.department,
 count: person.count,
 percentage: totalMovies > 0 ? (person.count / totalMovies) * 100 : 0,
 profileUrl: person.profilePath ? `${PROFILE_BASE_URL}${person.profilePath}` : null,
 movies: person.movies
 .slice()
 .sort((a, b) => (b.reviewScore ?? -1) - (a.reviewScore ?? -1) || a.title.localeCompare(b.title))
 .map((movie) => ({
 movieId: movie.id,
 title: movie.title,
 posterUrl: movie.posterUrl,
 })),
 frequentDecade: mostCommonDecade(person.movies),
 averagePersonalScore: averageScore(person.movies),
 };
}

function topPeople(map: Map<number, PersonAggregate>, totalMovies: number, limit: number) {
 return [...map.values()]
 .filter((person) => person.count > 0)
 .sort((a, b) => {
 const countDelta = b.count - a.count;
 if (countDelta !== 0) return countDelta;

 const scoreDelta = (averageScore(b.movies) ?? -1) - (averageScore(a.movies) ?? -1);
 if (scoreDelta !== 0) return scoreDelta;

 return a.name.localeCompare(b.name);
 })
 .slice(0, limit)
 .map((person) => serializePerson(person, totalMovies))
 .filter((person): person is NonNullable<ReturnType<typeof serializePerson>> => Boolean(person));
}

export async function POST(request: NextRequest) {
 const apiKey = getTmdbApiKey();
 if (!apiKey) {
 return NextResponse.json({ ok: false, error: "TMDB API key not configured." }, { status: 500 });
 }

 try {
 const body = (await request.json()) as { movies?: MoviePayload[] };
 const movies = (body.movies ?? [])
 .filter(
 (movie): movie is MoviePayload =>
 typeof movie.id === "string" &&
 typeof movie.tmdbId === "number" &&
 Number.isFinite(movie.tmdbId) &&
 typeof movie.title === "string"
 );

 const actorMap = new Map<number, PersonAggregate>();
 const actressMap = new Map<number, PersonAggregate>();
 const directorMap = new Map<number, PersonAggregate>();
 const writerMap = new Map<number, PersonAggregate>();
 const cinematographerMap = new Map<number, PersonAggregate>();

 const creditResults = await Promise.allSettled(
 movies.map(async (movie) => {
 const response = await fetch(
 `${TMDB_API_BASE}/movie/${movie.tmdbId}/credits?api_key=${apiKey}&language=en-US`,
 { cache: "no-store" }
 );
 if (!response.ok) return;

 const credits = (await response.json()) as {
 cast?: TmdbCastPerson[];
 crew?: TmdbCrewPerson[];
 };

 for (const person of credits.crew ?? []) {
 if (person.job === "Director") {
 aggregatePerson(directorMap, person, "Directing", movie);
 }
 if (person.job === "Writer" || person.job === "Screenplay" || person.job === "Story") {
 aggregatePerson(writerMap, person, "Writing", movie);
 }
 if (person.job === "Director of Photography" || person.job === "Cinematography") {
 aggregatePerson(cinematographerMap, person, "Camera", movie);
 }
 }

 for (const person of credits.cast ?? []) {
 if (
 person.known_for_department &&
 person.known_for_department !== "Acting"
 ) {
 continue;
 }
 if (person.gender === 2) aggregatePerson(actorMap, person, "Acting", movie);
 if (person.gender === 1) aggregatePerson(actressMap, person, "Acting", movie);
 }
 })
 );

 const totalFailures = creditResults.filter((result) => result.status === "rejected").length;
 const totalMovies = Math.max(1, movies.length);

 const topActors = topPeople(actorMap, totalMovies, 10);
 const topActresses = topPeople(actressMap, totalMovies, 10);

 return NextResponse.json({
 ok: true,
 partial: totalFailures > 0,
 people: {
 actor: topActors[0] ?? null,
 actress: topActresses[0] ?? null,
 actors: topActors,
 actresses: topActresses,
 directors: topPeople(directorMap, totalMovies, 10),
 writers: topPeople(writerMap, totalMovies, 10),
 cinematographers: topPeople(cinematographerMap, totalMovies, 3),
 },
 });
 } catch {
 return NextResponse.json({ ok: false, error: "Unable to build archive people." }, { status: 500 });
 }
}
