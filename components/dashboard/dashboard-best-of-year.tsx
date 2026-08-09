"use client";

import type { LibraryMovie } from "@/store/movie-store";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { VhsPoster } from "@/components/movie/vhs-poster";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";

type DashboardBestOfYearProps = {
 movies: LibraryMovie[];
};

function movieYear(movie: LibraryMovie) {
 return movie.watchedDate?.slice(0, 4) || movie.year || "—";
}

export function DashboardBestOfYear({ movies }: DashboardBestOfYearProps) {
 return (
 <section className="rounded-md border border-[#610C33]/30 bg-black p-4">
 <h3 className="text-[11px] font-semibold uppercase text-zinc-400">
 Best Of Year
 </h3>

 {movies.length === 0 ? (
 <div className="mt-3 flex h-20 items-center justify-center">
 <p className="text-sm text-zinc-500">No best-of-year crowns yet.</p>
 </div>
 ) : (
 <div className="mt-3 grid gap-3 md:grid-cols-2">
 {movies.map((movie, index) => (
 <article key={movie.id} className="grid grid-cols-[3rem_1fr] gap-3">
 {movie.posterUrl ? (
 <VhsPoster
 src={movie.posterUrl}
 alt={movie.displayTitle}
 className="h-16 w-11 rounded-sm"
 />
 ) : (
 <div className="flex h-16 w-11 items-center justify-center rounded-sm bg-zinc-950 text-[9px] text-zinc-600">
 —
 </div>
 )}
 <div className="min-w-0">
 <div className="flex items-center gap-1.5">
 <h4 className="min-w-0 truncate text-sm font-medium text-zinc-100">
 {movie.displayTitle}
 </h4>
 {index === 0 && (
 <BestOfYearCrown active className="[&_img]:h-3.5 [&_img]:w-3.5" />
 )}
 </div>
 <p className="truncate text-[11px] text-zinc-500">
 {movie.director && movie.director !== "-" ? movie.director : "—"}
 </p>
 <div className="mt-1 flex items-center gap-2">
 <span className="text-[11px] text-zinc-500">{movieYear(movie)}</span>
 <span
 className={
 movie.reviewScore === 10
 ? "text-[11px] font-semibold text-[#E0B63E]"
 : "text-[11px] text-zinc-300"
 }
 >
 {formatReviewScore(movie.reviewScore)}/10
 </span>
 </div>
 </div>
 </article>
 ))}
 </div>
 )}
 </section>
 );
}
