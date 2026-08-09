"use client";

type DashboardHeroProps = {
 totalMovies: number;
 avgPersonalScore: number | null;
 avgImdbScore: number | null;
 avgRottenScore: number | null;
 totalCountries: number;
};

function formatScore(value: number | null, suffix: string): string {
 if (value === null) return "—";
 return `${value.toFixed(1)} ${suffix}`;
}

const metrics = [
 {
 key: "totalMovies",
 label: "Total Movies",
 },
 {
 key: "avgPersonalScore",
 label: "Average Personal Score",
 },
 {
 key: "avgImdbScore",
 label: "Average IMDb Score",
 },
 {
 key: "avgRottenScore",
 label: "Average Rotten Tomatoes Score",
 },
 {
 key: "totalCountries",
 label: "Countries Represented",
 },
] as const;

export function DashboardHero(props: DashboardHeroProps) {
 const values = {
 totalMovies: props.totalMovies.toLocaleString(),
 avgPersonalScore: formatScore(props.avgPersonalScore, "/10"),
 avgImdbScore: formatScore(props.avgImdbScore, "/10"),
 avgRottenScore:
 props.avgRottenScore !== null ? `${Math.round(props.avgRottenScore)}%` : "—",
 totalCountries: props.totalCountries.toLocaleString(),
 };

 return (
 <section className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
 {metrics.map((metric) => (
 <div
 key={metric.key}
 className="min-h-20 rounded-md border border-[#610C33]/45 bg-black px-4 py-3"
 >
 <p className="text-[10px] font-semibold uppercase text-zinc-400">
 {metric.label}
 </p>
 <p className="mt-2 text-2xl font-semibold text-[#e9e3d4]">
 {values[metric.key]}
 </p>
 </div>
 ))}
 </section>
 );
}
