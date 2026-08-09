"use client";

import { useMemo } from "react";
import { LibraryListTable } from "@/components/library/library-list-table";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { VhsPoster } from "@/components/movie/vhs-poster";
import { MissingValue } from "@/components/ui/missing-value";
import { abbreviateCountry } from "@/lib/constants/country-abbreviations";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";
import { cn } from "@/lib/utils";
import type { LibraryMovie } from "@/store/movie-store";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListViewProps = {
 movies: LibraryMovie[];
 onAddMovie: () => void;
 onOpenMovie: (id: string) => void;
 sort: LibrarySortState;
 onSortChange: (key: LibrarySortKey) => void;
};

function formatListDistributor(value: string) {
 return value
 .split(",")
 .map((part) => part.trim())
 .find(Boolean)
 ?.replace(/\s*\([^)]*\)\s*$/g, "")
 .trim();
}

function getLibraryToneClass(movie: LibraryMovie) {
 const hasPerfectScore = typeof movie.reviewScore === "number" && movie.reviewScore >= 10;

 switch (movie.badgeId) {
 case "badge10":
 case "badge_10":
 return hasPerfectScore ? "library-tone-pink-animated" : "library-tone-pink";
 case "badge11":
 case "badge_11":
 return hasPerfectScore
 ? "library-tone-purple-animated"
 : "library-tone-purple";
 case "badge12":
 case "badge_12":
 return hasPerfectScore
 ? "library-tone-green-animated"
 : "library-tone-green";
 case "badge9":
 case "badge_9":
 return "library-tone-gray";
 case "badge13":
 case "badge_13":
 return hasPerfectScore
 ? "library-tone-hidden-animated"
 : "library-tone-hidden";
 case "badge1":
 case "badge_1":
 return "masterpiece-text";
 default:
 return "library-tone-offwhite";
 }
}

export function LibraryListView({
 movies,
 onAddMovie,
 onOpenMovie,
 sort,
 onSortChange,
}: LibraryListViewProps) {
 const rows = useMemo(
 () =>
 movies.map((movie) => {
 const toneClassName = getLibraryToneClass(movie);
 const titleClassName = cn("font-bold", toneClassName);
 const missingValue = <MissingValue />;
 const distributor =
 movie.distributor && movie.distributor !== "-" && movie.distributor !== "—"
 ? formatListDistributor(movie.distributor)
 : null;

 return {
 id: movie.id,
 tmdbId: movie.tmdbId,

 poster: movie.posterUrl ? (
 <div className="flex w-full items-center justify-center">
 <button
 type="button"
 aria-label={`Open details for ${movie.displayTitle}`}
 className="library-list-poster-button relative z-0 block w-full max-w-[117px] cursor-pointer rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
 onClick={() => onOpenMovie(movie.id)}
 >
 <VhsPoster
 src={movie.posterUrl}
 alt={movie.displayTitle}
 className="library-list-poster-visual aspect-[2/3] w-full rounded-[2px]"
 imageClassName="object-contain"
 />
 </button>
 </div>
 ) : null,

 year: (
 <span className="inline-flex flex-col items-center gap-1 leading-tight">
 {movie.bestOfYear && (
 <img
 src="/images/skull.png"
 alt="Best of Year"
 className="h-5 w-auto object-contain"
 style={{ filter: 'drop-shadow(0 0 4px rgba(232, 185, 62, 0.6))' }}
 />
 )}
 <span className={toneClassName}>
 {movie.year}
 </span>
 </span>
 ),

 title: <span className={titleClassName}>{movie.displayTitle}</span>,
 titlePt: movie.titlePt ? <span className={titleClassName}>{movie.titlePt}</span> : missingValue,
 director: <span className={toneClassName}>{movie.director}</span>,
 country: (
 <span className={toneClassName}>
 {abbreviateCountry(movie.country)}
 </span>
 ),
 distributor: distributor ? (
 <span className={toneClassName}>{distributor}</span>
 ) : (
 missingValue
 ),
 badge: (
 <div className="flex w-full items-center justify-center">
 <MovieBadge
 badgeId={movie.badgeId}
 className="library-list-badge"
 />
 </div>
 ),
 stars: <MovieStars stars={movie.stars} size="md" />,
 review: (
 <span
 className={cn("font-bold", toneClassName)}
 >
 {formatReviewScore(movie.reviewScore)}
 </span>
 ),
 imdb: (
 <span
 className={cn("font-bold", toneClassName)}
 >
 {movie.imdbScore !== null ? movie.imdbScore : missingValue}
 </span>
 ),
 rotten: (
 <span
 className={cn("font-bold", toneClassName)}
 >
 {movie.rottenTomatoesScore !== null
 ? `${movie.rottenTomatoesScore}%`
 : missingValue}
 </span>
 ),
 };
 }),
 [movies, onOpenMovie]
 );

 return (
 <LibraryListTable
 rows={rows}
 onAddMovie={onAddMovie}
 sort={sort}
 onSortChange={onSortChange}
 />
 );
}
