"use client";

import type { LibraryMovie } from "@/store/movie-store";

type DashboardFunStatsProps = {
 longestMovie: LibraryMovie | null;
 shortestMovie: LibraryMovie | null;
 oldestMovie: LibraryMovie | null;
 newestMovie: LibraryMovie | null;
 avgRuntime: number | null;
};

function FactCard({
 label,
 title,
 value,
}: {
 label: string;
 title: string;
 value?: string;
}) {
 return (
 <div className="min-h-24 rounded-md border border-[#610C33]/25 bg-black p-4">
 <p className="text-[10px] font-semibold uppercase text-zinc-400">
 {label}
 </p>
 <p className="mt-2 text-sm font-medium text-zinc-100">{title}</p>
 {value && <p className="mt-1 text-xs text-zinc-400">{value}</p>}
 </div>
 );
}

export function DashboardFunStats(props: DashboardFunStatsProps) {
 const facts = [
 {
 label: "Longest Movie",
 title: props.longestMovie?.displayTitle ?? "—",
 value: props.longestMovie?.runtime ? `${props.longestMovie.runtime} min` : undefined,
 },
 {
 label: "Shortest Movie",
 title: props.shortestMovie?.displayTitle ?? "—",
 value: props.shortestMovie?.runtime ? `${props.shortestMovie.runtime} min` : undefined,
 },
 {
 label: "Oldest Movie",
 title: props.oldestMovie?.displayTitle ?? "—",
 value: props.oldestMovie?.year || undefined,
 },
 {
 label: "Newest Movie",
 title: props.newestMovie?.displayTitle ?? "—",
 value: props.newestMovie?.year || undefined,
 },
 {
 label: "Average Runtime",
 title: props.avgRuntime !== null ? `${Math.round(props.avgRuntime)} min` : "—",
 },
 ];

 return (
 <section className="flex flex-col gap-4">
 <h2 className="text-lg font-semibold text-[#e9e3d4]">
 Archive Facts
 </h2>
 <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
 {facts.map((fact) => (
 <FactCard
 key={fact.label}
 label={fact.label}
 title={fact.title}
 value={fact.value}
 />
 ))}
 </div>
 </section>
 );
}
