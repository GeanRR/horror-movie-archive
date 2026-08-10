"use client";

import type { LibraryMovie } from "@/store/movie-store";
import { VhsPoster } from "@/components/movie/vhs-poster";

type DashboardMasterpiecesProps = {
 movies: LibraryMovie[];
};

export function DashboardMasterpieces({ movies }: DashboardMasterpiecesProps) {
 return (
 <section className="rounded-md border border-[#610C33]/30 bg-black p-4">
 <h3 className="text-[11px] font-semibold uppercase text-zinc-400">
 10/10 Masterpieces
 </h3>

 {movies.length === 0 ? (
 <div className="mt-3 flex h-20 items-center justify-center">
 <p className="text-sm text-zinc-500">No 10/10 entries yet.</p>
 </div>
 ) : (
 <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(11rem,12.5rem))] gap-2.5">
 {movies.map((movie) => (
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
 <h4 className="text-sm font-medium text-zinc-100">
 {movie.displayTitle}
 </h4>
 <p className="text-[11px] text-zinc-500">
 {movie.director && movie.director !== "-" ? movie.director : "—"}
 </p>
 <div className="mt-1 flex items-center gap-2">
 <span className="text-[11px] text-zinc-500">{movie.year || "—"}</span>
 <span className="text-[11px] font-semibold text-[#E0B63E]">
 10/10
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
