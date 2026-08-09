"use client";

import { Film } from "lucide-react";
import { MovieStars } from "@/components/movie/movie-stars";
import { VhsPoster } from "@/components/movie/vhs-poster";
import { formatMissingValue } from "@/components/ui/missing-value";
import { getBadgeDefinition } from "@/lib/movie-engines/badge-engine";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";
import { abbreviateCountry } from "@/lib/constants/country-abbreviations";
import { cn } from "@/lib/utils";
import type { LibraryMovie } from "@/store/movie-store";

type LibraryGridViewProps = {
 movies: LibraryMovie[];
 onAddMovie: () => void;
 onOpenMovie: (id: string) => void;
};

function getLibraryToneClass(movie: LibraryMovie) {
 const hasPerfectScore = typeof movie.reviewScore === "number" && movie.reviewScore >= 10;

 switch (movie.badgeId) {
 case "badge10":
 case "badge_10":
 return hasPerfectScore ? "library-tone-pink-animated" : "library-tone-pink";
 case "badge11":
 case "badge_11":
 return hasPerfectScore ? "library-tone-purple-animated" : "library-tone-purple";
 case "badge12":
 case "badge_12":
 return hasPerfectScore ? "library-tone-green-animated" : "library-tone-green";
 case "badge13":
 case "badge_13":
 return hasPerfectScore ? "library-tone-hidden-animated" : "library-tone-hidden";
 case "badge9":
 case "badge_9":
 return "library-tone-gray";
 case "badge1":
 case "badge_1":
 return "masterpiece-text";
 default:
 return "library-tone-offwhite";
 }
}

export function LibraryGridView({
 movies,
 onAddMovie,
 onOpenMovie,
}: LibraryGridViewProps) {
 if (movies.length === 0) {
 return (
 <div className="flex min-h-[420px] flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6">
 <Film
 className="mb-4 h-8 w-8 text-muted-foreground/40"
 aria-hidden
 />
 <p className="text-sm font-medium text-muted-foreground">
 Add your first movie
 </p>
 <button
 type="button"
 onClick={onAddMovie}
 className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
 >
 Add Movie
 </button>
 </div>
 );
 }

 return (
 <div className="grid grid-cols-[repeat(auto-fill,minmax(410px,1fr))] gap-5 pb-2">
 {movies.map((movie) => {
 const badge = getBadgeDefinition(movie.badgeId);
 const toneClassName = getLibraryToneClass(movie);

 return (
 <button
 key={movie.id}
 type="button"
 onClick={() => onOpenMovie(movie.id)}
 className="group relative grid min-h-[244px] min-w-0 grid-cols-[148px_1fr] overflow-hidden rounded-[24px] bg-black p-6 text-left transition-transform duration-200 hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610C33]"
 >
 {badge && (
 <img
 src={badge.assetPath}
 alt=""
 aria-hidden
 className="pointer-events-none absolute -right-10 -top-12 h-[270px] w-[270px] max-w-none object-contain opacity-70"
 />
 )}
 <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#000_0%,rgba(0,0,0,0.98)_43%,rgba(0,0,0,0.58)_68%,rgba(0,0,0,0.9)_100%)]" />

 <div className="relative z-10 self-center">
 {movie.posterUrl ? (
 <VhsPoster
 src={movie.posterUrl}
 alt={movie.displayTitle}
 className="h-[196px] w-[132px] rounded-[10px] shadow-2xl"
 layerClassName="transition-transform duration-300 group-hover:scale-[1.025]"
 />
 ) : (
 <div className="flex h-[196px] w-[132px] items-center justify-center rounded-[10px] bg-[#111] text-muted-foreground">
 <Film className="h-8 w-8 opacity-50" aria-hidden />
 </div>
 )}
 </div>

 <div className="relative z-10 min-w-0 self-center">
 <h3 className={cn("archive-anton truncate text-[24px] uppercase leading-none", toneClassName)}>
 {movie.displayTitle}
 </h3>
 <p className={cn("mt-3 truncate archive-anton text-[16px] uppercase leading-none", toneClassName)}>
 {formatMissingValue(movie.titlePt || movie.originalTitle)}
 </p>
 <p className={cn("mt-5 font-sans text-[14px] font-normal", toneClassName)}>
 {movie.year} • {abbreviateCountry(movie.country)}
 </p>
 <p className={cn("mt-1 font-sans text-[14px] font-normal", toneClassName)}>
 {movie.director}
 </p>

 <div className="mt-5">
 <MovieStars stars={movie.stars} size="md" />
 </div>

 <div className={cn("mt-1 flex flex-wrap items-center gap-4 font-sans text-[14px] font-black leading-none", toneClassName)}>
 <span className="inline-flex items-center gap-1.5">
 <img
 src="/images/gean.png"
 alt=""
 aria-hidden
 className="h-6 w-6 rounded-full object-cover grayscale"
 />
 {formatReviewScore(movie.reviewScore)}
 </span>
 <span className="inline-flex items-center gap-1.5">
 <img
 src="/images/rotten.png"
 alt=""
 aria-hidden
 className="h-6 w-6 object-contain"
 />
 {movie.rottenTomatoesScore !== null
 ? formatReviewScore(movie.rottenTomatoesScore / 10)
 : formatMissingValue(null)}
 </span>
 <span className="inline-flex items-center gap-1.5">
 <img
 src="/images/imdb.png"
 alt=""
 aria-hidden
 className="h-6 w-auto object-contain"
 />
 {movie.imdbScore !== null
 ? formatReviewScore(movie.imdbScore)
 : formatMissingValue(null)}
 </span>
 </div>
 </div>
 </button>
 );
 })}
 </div>
 );
}

