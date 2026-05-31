"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import {
  Edit,
  Image as ImageIcon,
  ListPlus,
  RefreshCcw,
  Trash2,
  X,
} from "lucide-react";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  formatReviewScore,
  isMasterpieceScore,
} from "@/lib/movie-engines/stars-engine";
import { cn } from "@/lib/utils";
import { useMovieStore } from "@/store/movie-store";

function formatRuntime(runtime: number | null): string {
  return runtime ? `${runtime} min` : "-";
}

function formatDate(value: string): string {
  if (!value) return "-";

  return value;
}

function MetadataItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-foreground">{value}</dd>
    </div>
  );
}

function ExpandableNames({
  title,
  names,
}: {
  title: string;
  names: string[];
}) {
  const visibleNames = names.slice(0, 6);
  const hiddenNames = names.slice(6);

  return (
    <details className="rounded-lg border border-border/50 bg-background/30 p-4">
      <summary className="cursor-pointer text-sm font-medium text-foreground">
        {title}
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {names.length === 0
          ? "-"
          : [...visibleNames, ...hiddenNames].join(", ")}
      </p>
    </details>
  );
}

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
  const routeId = Array.isArray(params.id) ? params.id[0] : params.id;
  const numericRouteId = Number(routeId);

  const movie = useMovieStore((state) =>
    state.movies.find(
      (m) =>
        m.id === routeId ||
        (Number.isFinite(numericRouteId) && m.tmdbId === numericRouteId)
    )
  );

  if (!movie) {
    notFound();
  }

  const isMasterpiece = isMasterpieceScore(movie.reviewScore);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-details-title"
    >
      <div className="absolute inset-0" onClick={() => router.back()} />

      <article
        className={cn(
          "relative flex h-[min(92dvh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-lg border bg-card shadow-2xl",
          isMasterpiece
            ? "border-amber-300/50 shadow-amber-500/10"
            : "border-border/60"
        )}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-border/60 px-5 py-4">
          <div>
            <p className="text-xs text-muted-foreground">Movie Details</p>
            <h1
              id="movie-details-title"
              className={cn(
                "text-lg font-semibold tracking-tight",
                isMasterpiece && "text-amber-100"
              )}
            >
              {movie.displayTitle}
            </h1>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close movie details"
            onClick={() => router.back()}
          >
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
            <aside className="space-y-4">
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.displayTitle}
                  className={cn(
                    "aspect-[2/3] w-full rounded-lg border object-cover",
                    isMasterpiece
                      ? "border-amber-300/50"
                      : "border-border/70"
                  )}
                />
              ) : (
                <div className="flex aspect-[2/3] w-full items-center justify-center rounded-lg border border-border/70 text-sm text-muted-foreground">
                  No Poster
                </div>
              )}

              <Button type="button" variant="outline" className="w-full" disabled>
                <ImageIcon className="h-4 w-4" aria-hidden />
                Change Poster
              </Button>
            </aside>

            <section className="min-w-0 space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <BestOfYearCrown active={movie.bestOfYear} showLabel />
                  <MovieBadge badgeId={movie.badgeId} />
                  <MovieStars stars={movie.stars} showValue size="md" />
                </div>

                <div>
                  <h2
                    className={cn(
                      "text-4xl font-semibold tracking-tight",
                      isMasterpiece && "text-amber-100"
                    )}
                  >
                    {movie.displayTitle}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {movie.originalTitle}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {movie.titlePt}
                  </p>
                </div>

                {isMasterpiece && (
                  <div className="rounded-lg border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
                    10/10 masterpiece
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  <MetadataItem label="Year" value={movie.year || "-"} />
                  <MetadataItem
                    label="Review"
                    value={formatReviewScore(movie.reviewScore)}
                  />
                  <MetadataItem
                    label="Stars"
                    value={<MovieStars stars={movie.stars} showValue />}
                  />
                  <MetadataItem
                    label="IMDb"
                    value={movie.imdbScore !== null ? movie.imdbScore : "-"}
                  />
                  <MetadataItem
                    label="Rotten"
                    value={
                      movie.rottenTomatoesScore !== null
                        ? `${movie.rottenTomatoesScore}%`
                        : "-"
                    }
                  />
                </div>
              </div>

              <Separator className="bg-border/60" />

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <MetadataItem label="Director" value={movie.director} />
                <MetadataItem label="Country" value={movie.country} />
                <MetadataItem label="Distributor" value={movie.distributor} />
                <MetadataItem
                  label="Runtime"
                  value={formatRuntime(movie.runtime)}
                />
                <MetadataItem
                  label="Release Date"
                  value={formatDate(movie.releaseDate)}
                />
                <MetadataItem
                  label="Watched Date"
                  value={formatDate(movie.watchedDate)}
                />
                <MetadataItem
                  label="Genres"
                  value={movie.genres.length ? movie.genres.join(", ") : "-"}
                />
                <MetadataItem
                  label="Subgenres"
                  value={
                    movie.subgenres.length ? movie.subgenres.join(", ") : "-"
                  }
                />
                <MetadataItem
                  label="Lists"
                  value={
                    movie.assignedLists.length
                      ? movie.assignedLists.join(", ")
                      : "-"
                  }
                />
              </div>

              <section className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Synopsis
                </h3>
                <p className="text-sm leading-7 text-foreground/90">
                  {movie.synopsis || "-"}
                </p>
              </section>

              <div className="grid gap-4 md:grid-cols-2">
                <ExpandableNames title="Cast" names={movie.cast} />
                <ExpandableNames title="Crew" names={movie.crew} />
              </div>

              <Separator className="bg-border/60" />

              <section className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Actions
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" disabled>
                    <Edit className="h-4 w-4" aria-hidden />
                    Edit Movie
                  </Button>
                  <Button type="button" variant="outline" disabled>
                    <RefreshCcw className="h-4 w-4" aria-hidden />
                    Refresh Metadata
                  </Button>
                  <Button type="button" variant="outline" disabled>
                    <ImageIcon className="h-4 w-4" aria-hidden />
                    Change Poster
                  </Button>
                  <Button type="button" variant="outline" disabled>
                    <ListPlus className="h-4 w-4" aria-hidden />
                    Manage Lists
                  </Button>
                  <Button type="button" variant="destructive" disabled>
                    <Trash2 className="h-4 w-4" aria-hidden />
                    Delete Movie
                  </Button>
                </div>
              </section>

              <section className="grid gap-4 text-xs text-muted-foreground md:grid-cols-3">
                <MetadataItem label="TMDB ID" value={movie.tmdbId} />
                <MetadataItem label="IMDb ID" value={movie.imdbId ?? "-"} />
                <MetadataItem
                  label="Metadata Refreshed"
                  value={movie.metadataLastRefreshedAt ?? "-"}
                />
              </section>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
