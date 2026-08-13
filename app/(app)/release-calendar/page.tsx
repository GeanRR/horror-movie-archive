"use client";

import { useEffect, useMemo, useState } from "react";
import { Film, X } from "lucide-react";
import { MovieDetailsModal } from "@/components/movie/movie-details-modal";
import { VhsPoster } from "@/components/movie/vhs-poster";
import { useMovieStore } from "@/store/movie-store";
import type { LibraryMovie, WatchlistMovie } from "@/store/movie-store";

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

type ReleaseEntry = {
  id: string;
  movie: WatchlistMovie;
  date: Date | null;
  month: number | "tba";
  releaseDate: string;
  releaseType: string;
  isPast: boolean;
};

type ReleaseMonthModal = {
  title: string;
  count: number;
  releases: ReleaseEntry[];
} | null;

function parseReleaseDate(value: string | null | undefined) {
  if (!value?.trim()) return null;

  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatMonthDay(date: Date) {
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function releaseYear(movie: WatchlistMovie) {
  const match = movie.year.match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

function watchlistMovieKey(movie: WatchlistMovie) {
  if (movie.tmdbId !== null) return `tmdb-${movie.tmdbId}`;
  if (movie.imdbId) return `imdb-${movie.imdbId}`;
  return `${movie.displayTitle.toLowerCase()}-${movie.year}`;
}

function releaseTypeDates(movie: WatchlistMovie) {
  return [
    {
      type: "Theatrical" as const,
      date: movie.releaseDates?.theatrical || movie.releaseDate,
    },
    {
      type: "Streaming" as const,
      date: movie.releaseDates?.streaming,
    },
    {
      type: "Digital / VOD" as const,
      date: movie.releaseDates?.digital,
    },
  ];
}

function toLibraryMovie(movie: WatchlistMovie): LibraryMovie {
  return {
    ...movie,
    tmdbId: movie.tmdbId ?? 0,
    director: movie.director || "—",
    country: movie.country || "—",
    distributor: movie.distributor || "—",
    reviewScore: null,
    stars: 0,
    badgeId: null,
    badgeOverrideEnabled: false,
    watchedDate: "",
    rewatchHistory: [],
    bestOfYear: false,
    assignedLists: [],
  };
}

function MonthlyPosterStrip({ releases }: { releases: ReleaseEntry[] }) {
  const movies = releases
    .map((release) => release.movie)
    .filter((movie): movie is WatchlistMovie & { posterUrl: string } =>
      Boolean(movie.posterUrl)
    )
    .slice(0, 5);

  if (movies.length === 0) {
    return (
      <div className="grid h-[150px] w-full max-w-[210px] place-items-center rounded-[10px] bg-[#111] text-[#6f6c7a]">
        <Film className="h-8 w-8" aria-hidden />
      </div>
    );
  }

  return (
    <div className="relative mb-7 h-[150px] w-full max-w-[210px]">
      {movies.map((movie, index) => (
        <span
          key={`${movie.id}-${index}`}
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
      ))}
    </div>
  );
}

function ReleaseMovieCard({
  release,
  onOpen,
}: {
  release: ReleaseEntry;
  onOpen: () => void;
}) {
  const { movie } = release;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`grid min-w-0 grid-cols-[72px_1fr] gap-4 rounded-[14px] bg-[#e9e3d4]/[0.03] p-3 text-left transition-colors hover:bg-[#e9e3d4]/[0.06] ${
        release.isPast ? "opacity-55" : ""
      }`}
    >
      {movie.posterUrl ? (
        <VhsPoster
          src={movie.posterUrl}
          alt={movie.displayTitle}
          className="h-[104px] w-[72px] rounded-[6px]"
          imageClassName="object-cover"
        />
      ) : (
        <div className="grid h-[104px] w-[72px] place-items-center rounded-[6px] bg-[#111] text-[#6f6c7a]">
          <Film className="h-6 w-6" aria-hidden />
        </div>
      )}

      <div className="min-w-0 self-center">
        <p className="font-sans text-xs font-black uppercase text-[#E0B63E]">
          {release.releaseDate}
        </p>
        <h3 className="archive-anton mt-2 text-2xl uppercase leading-none text-[#e9e3d4]">
          {movie.displayTitle}
        </h3>
        <p className="mt-2 font-sans text-xs font-bold text-[#6f6c7a]">
          {release.releaseType}
        </p>
      </div>
    </button>
  );
}

export default function ReleaseCalendarPage() {
  const lists = useMovieStore((store) => store.lists);
  const listsHydrated = useMovieStore((store) => store.listsHydrated);
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const today = new Date();
  const todayStartTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime();
  const [selectedMonth, setSelectedMonth] = useState<ReleaseMonthModal>(null);
  const [selectedMovie, setSelectedMovie] = useState<LibraryMovie | null>(null);
  const [calendarMovies, setCalendarMovies] = useState<WatchlistMovie[]>([]);

  useEffect(() => {
    fetch("/api/release-calendar", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { ok?: boolean; movies?: WatchlistMovie[] }) => {
        if (data.ok && Array.isArray(data.movies)) {
          setCalendarMovies(data.movies);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!listsHydrated) return;

    const incomingMovies = lists.flatMap((list) => list.movies);

    if (incomingMovies.length === 0) {
      fetch("/api/release-calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movies: [] }),
      })
        .then((response) => response.json())
        .then((data: { ok?: boolean; movies?: WatchlistMovie[] }) => {
          if (data.ok && Array.isArray(data.movies)) {
            setCalendarMovies(data.movies);
          }
        })
        .catch(() => {});
      return;
    }

    setCalendarMovies((current) => {
      const moviesByKey = new Map<string, WatchlistMovie>();
      for (const movie of current) {
        moviesByKey.set(watchlistMovieKey(movie), movie);
      }
      for (const movie of incomingMovies) {
        moviesByKey.set(watchlistMovieKey(movie), movie);
      }

      const nextMovies = Array.from(moviesByKey.values());
      fetch("/api/release-calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movies: incomingMovies }),
      })
        .then((response) => response.json())
        .then((data: { ok?: boolean; movies?: WatchlistMovie[] }) => {
          if (data.ok && Array.isArray(data.movies)) {
            setCalendarMovies(data.movies);
          }
        })
        .catch(() => {});
      return nextMovies;
    });
  }, [lists, listsHydrated]);

  const releases = useMemo<ReleaseEntry[]>(() => {
    const moviesByKey = new Map<string, WatchlistMovie>();

    calendarMovies.forEach((movie) => {
      moviesByKey.set(watchlistMovieKey(movie), movie);
    });

    return Array.from(moviesByKey.values())
      .flatMap((movie): ReleaseEntry[] => {
        const movieYear = releaseYear(movie);

        const exactReleases: ReleaseEntry[] = releaseTypeDates(movie)
          .map(({ type, date }): ReleaseEntry | null => {
            const parsedDate = parseReleaseDate(date);
            if (!parsedDate || parsedDate.getFullYear() !== currentYear) {
              return null;
            }

            if (
              type !== "Theatrical" &&
              (movieYear === null || movieYear < currentYear - 1)
            ) {
              return null;
            }

            return {
              id: `${watchlistMovieKey(movie)}-${type}`,
              movie,
              date: parsedDate,
              month: parsedDate.getMonth(),
              releaseDate: formatMonthDay(parsedDate),
              releaseType: type,
              isPast: parsedDate.getTime() < todayStartTime,
            };
          })
          .filter((release): release is ReleaseEntry => release !== null);

        if (exactReleases.length > 0) return exactReleases;

        if (movieYear !== currentYear && movieYear !== null) {
          return [];
        }

        return [
          {
            id: `${watchlistMovieKey(movie)}-tba`,
            movie,
            date: null,
            month: "tba" as const,
            releaseDate: "TBA",
            releaseType: "Theatrical",
            isPast: false,
          },
        ];
      })
      .sort((a, b) => {
        if (!a.date && !b.date) {
          return a.movie.displayTitle.localeCompare(b.movie.displayTitle);
        }

        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date.getTime() - b.date.getTime();
      });
  }, [calendarMovies, currentYear, todayStartTime]);

  const monthlyReleases = useMemo(
    () =>
      MONTHS.map((month, index) => {
        const monthReleases = releases.filter(
          (release) => release.month === index
        );

        return {
          month,
          count: monthReleases.length,
          releases: monthReleases,
        };
      }),
    [releases]
  );

  const tbaReleases = releases.filter((release) => release.month === "tba");

  const nextYearReleases = useMemo<ReleaseEntry[]>(() => {
    const moviesByKey = new Map<string, WatchlistMovie>();

    calendarMovies.forEach((movie) => {
      if (releaseYear(movie) === nextYear) {
        moviesByKey.set(watchlistMovieKey(movie), movie);
      }
    });

    return Array.from(moviesByKey.values())
      .sort((a, b) => a.displayTitle.localeCompare(b.displayTitle))
      .map((movie) => ({
        id: `${watchlistMovieKey(movie)}-${nextYear}-tba`,
        movie,
        date: null,
        month: "tba" as const,
        releaseDate: "TBA",
        releaseType: String(nextYear),
        isPast: false,
      }));
  }, [calendarMovies, nextYear]);

  return (
    <div className="flex w-full flex-col gap-12 pb-12 text-[#e9e3d4]">
      <header className="shrink-0 bg-[#0b0b0b]">
        <div
          className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-[24px] bg-cover bg-center px-6"
          style={{ backgroundImage: "url('/images/calendar.png')" }}
        >
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <h1 className="relative z-10 archive-display-title text-center text-[4.75rem] md:text-[7rem] xl:text-[7.45rem]">
            Calendar {currentYear}
          </h1>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {monthlyReleases.map((month) => (
            <button
              key={month.month}
              type="button"
              onClick={() =>
                setSelectedMonth({
                  title: month.month,
                  count: month.count,
                  releases: month.releases,
                })
              }
              className="flex min-h-[300px] flex-col items-center justify-end rounded-[20px] bg-black px-7 pb-7 pt-8 text-center transition-transform duration-200 hover:scale-[1.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610C33]"
              aria-label={`Open ${month.month} releases`}
            >
              <MonthlyPosterStrip releases={month.releases} />
              <h2 className="archive-anton text-5xl leading-none text-[#e9e3d4]">
                {month.month}
              </h2>
              <p className="mt-3 font-sans text-xs font-bold uppercase text-[#6f6c7a]">
                {month.count} {month.count === 1 ? "release" : "releases"}
              </p>
            </button>
          ))}

          <button
            type="button"
            onClick={() =>
              setSelectedMonth({
                title: "TBA",
                count: tbaReleases.length,
                releases: tbaReleases,
              })
            }
            className="flex min-h-[300px] flex-col items-center justify-end rounded-[20px] bg-black px-7 pb-7 pt-8 text-center transition-transform duration-200 hover:scale-[1.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610C33]"
            aria-label="Open TBA releases"
          >
            <MonthlyPosterStrip releases={tbaReleases} />
            <h2 className="archive-anton text-5xl leading-none text-[#e9e3d4]">
              TBA
            </h2>
            <p className="mt-3 font-sans text-xs font-bold uppercase text-[#6f6c7a]">
              {tbaReleases.length}{" "}
              {tbaReleases.length === 1 ? "release" : "releases"}
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              setSelectedMonth({
                title: String(nextYear),
                count: nextYearReleases.length,
                releases: nextYearReleases,
              })
            }
            className="flex min-h-[300px] flex-col items-center justify-end rounded-[20px] bg-black px-7 pb-7 pt-8 text-center transition-transform duration-200 hover:scale-[1.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610C33]"
            aria-label={`Open ${nextYear} TBA releases`}
          >
            <MonthlyPosterStrip releases={nextYearReleases} />
            <h2 className="archive-anton text-5xl leading-none text-[#e9e3d4]">
              {nextYear}
            </h2>
            <p className="mt-3 font-sans text-xs font-bold uppercase text-[#6f6c7a]">
              {nextYearReleases.length}{" "}
              {nextYearReleases.length === 1 ? "film" : "films"}
            </p>
          </button>
        </div>
      </section>

      {selectedMonth && (
        <div
          className="motion-modal-overlay fixed inset-0 z-50 grid place-items-center bg-black/80 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="release-month-modal-title"
          onClick={() => setSelectedMonth(null)}
        >
          <section
            className="motion-modal-card relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[24px] bg-[#050505] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 border-b border-[#e9e3d4]/10 px-6 py-5 md:px-8">
              <div>
                <p className="font-sans text-sm font-bold uppercase text-[#E0B63E]">
                  Release Calendar
                </p>
                <h2
                  id="release-month-modal-title"
                  className="archive-anton mt-2 text-4xl uppercase leading-none text-[#e9e3d4]"
                >
                  {selectedMonth.title}
                </h2>
                <p className="mt-2 font-sans text-xs font-bold uppercase text-[#6f6c7a]">
                  {selectedMonth.count}{" "}
                  {selectedMonth.count === 1 ? "release" : "releases"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMonth(null)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#e9e3d4]/10 text-[#e9e3d4] transition-colors hover:bg-[#e9e3d4]/10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="archive-scrollbar max-h-[calc(86vh-118px)] overflow-y-auto p-6 md:p-8">
              {selectedMonth.releases.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {selectedMonth.releases.map((release) => (
                    <ReleaseMovieCard
                      key={release.id}
                      release={release}
                      onOpen={() => setSelectedMovie(toLibraryMovie(release.movie))}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid min-h-[240px] place-items-center rounded-[18px] bg-black text-center">
                  <div>
                    <Film className="mx-auto h-10 w-10 text-[#6f6c7a]" />
                    <p className="archive-anton mt-5 text-3xl uppercase leading-none text-[#e9e3d4]">
                      No releases this month
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
