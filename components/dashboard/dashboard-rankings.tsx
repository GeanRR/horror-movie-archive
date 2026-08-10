"use client";

import type { ReactNode } from "react";
import type { LibraryMovie } from "@/store/movie-store";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { VhsPoster } from "@/components/movie/vhs-poster";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";

type RankedEntry = {
 name: string;
 count: number;
};

type MovieEntry = {
 movie: LibraryMovie;
 value: number;
};

type DashboardRankingsProps = {
 topDirectors: RankedEntry[];
 topDistributors: RankedEntry[];
 highestRated: MovieEntry[];
 lowestRated: MovieEntry[];
};

function EmptyBlock() {
 return (
 <div className="flex h-28 items-center justify-center">
 <p className="text-sm text-zinc-500">No data</p>
 </div>
 );
}

function DashboardPanel({
 title,
 children,
}: {
 title: string;
 children: ReactNode;
}) {
 return (
 <div className="rounded-md border border-[#610C33]/30 bg-black p-4">
 <h3 className="text-[11px] font-semibold uppercase text-zinc-400">
 {title}
 </h3>
 <div className="mt-3">{children}</div>
 </div>
 );
}

function RankedList({
 title,
 entries,
}: {
 title: string;
 entries: RankedEntry[];
}) {
 const max = Math.max(...entries.map((entry) => entry.count), 1);
 const hasSpread = new Set(entries.map((entry) => entry.count)).size > 1;

 return (
 <DashboardPanel title={title}>
 {entries.length === 0 ? (
 <EmptyBlock />
 ) : (
 <ol className="space-y-2">
 {entries.map((entry, index) => (
 <li
 key={entry.name}
 className="grid grid-cols-[1.5rem_minmax(0,1fr)_2rem] gap-x-2 gap-y-1"
 >
 <span className="pt-0.5 text-right text-xs text-zinc-600">
 {index + 1}
 </span>
 <span className="text-sm font-medium text-zinc-100">
 {entry.name}
 </span>
 <span className="text-right text-xs text-zinc-500">{entry.count}</span>
 {hasSpread && (
 <div className="col-start-2 col-end-4 h-1.5 overflow-hidden rounded-full bg-zinc-900">
 <div
 className="h-full rounded-full bg-[#981638]"
 style={{ width: `${Math.max((entry.count / max) * 100, 6)}%` }}
 />
 </div>
 )}
 </li>
 ))}
 </ol>
 )}
 </DashboardPanel>
 );
}

function MovieRankedList({
 title,
 entries,
 tone,
}: {
 title: string;
 entries: MovieEntry[];
 tone: "high" | "low";
}) {
 return (
 <DashboardPanel title={title}>
 {entries.length === 0 ? (
 <EmptyBlock />
 ) : (
 <ol className="space-y-2">
 {entries.map((entry, index) => {
 const movie = entry.movie;

 return (
 <li
 key={movie.id}
 className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto_auto_3rem] items-center gap-1.5"
 >
 <span className="text-right text-xs text-zinc-600">{index + 1}</span>
 <div className="flex min-w-0 items-center gap-2">
 {movie.posterUrl ? (
 <VhsPoster
 src={movie.posterUrl}
 alt={movie.displayTitle}
 className="h-[52px] w-[34px] rounded-sm"
 />
 ) : (
 <div className="flex h-[52px] w-[34px] shrink-0 items-center justify-center rounded-sm bg-zinc-950 text-[9px] text-zinc-600">
 —
 </div>
 )}
 <div className="min-w-0">
 <p className="text-sm font-medium text-zinc-100">
 {movie.displayTitle}
 </p>
 <p className="text-[11px] text-zinc-500">
 {movie.director && movie.director !== "-" ? movie.director : "—"}
 </p>
 </div>
 </div>
 <MovieStars stars={movie.stars} />
 <MovieBadge
 badgeId={movie.badgeId}
 className="[&_img]:h-8 [&_img]:max-w-9"
 />
 <span
 className={
 tone === "high"
 ? "text-right text-xs font-semibold text-[#E0B63E]"
 : "text-right text-xs font-semibold text-zinc-300"
 }
 >
 {formatReviewScore(entry.value)}/10
 </span>
 </li>
 );
 })}
 </ol>
 )}
 </DashboardPanel>
 );
}

export function DashboardRankings(props: DashboardRankingsProps) {
 return (
 <>
 <section className="flex flex-col gap-4">
 <h2 className="text-lg font-semibold text-[#e9e3d4]">
 Rankings
 </h2>
 <div className="grid gap-3 lg:grid-cols-2">
 <RankedList title="Top Directors" entries={props.topDirectors} />
 <RankedList title="Top Distributors" entries={props.topDistributors} />
 </div>
 </section>

 <section className="flex flex-col gap-4">
 <h2 className="text-lg font-semibold text-[#e9e3d4]">
 Rating Highlights
 </h2>
 <div className="grid items-start gap-3 xl:grid-cols-2">
 <MovieRankedList
 title="Highest Rated"
 entries={props.highestRated}
 tone="high"
 />
 <MovieRankedList
 title="Lowest Rated"
 entries={props.lowestRated}
 tone="low"
 />
 </div>
 </section>
 </>
 );
}
