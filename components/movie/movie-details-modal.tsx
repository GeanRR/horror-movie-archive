"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
 Edit3,
 Image as ImageIcon,
 Plus,
 RefreshCcw,
 Trash2,
 X,
} from "lucide-react";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { VhsPoster } from "@/components/movie/vhs-poster";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatMissingValue as formatSharedMissingValue } from "@/components/ui/missing-value";
import { EditMovieModal } from "@/components/movie/edit-movie-modal";
import { ChangePosterModal } from "@/components/movie/change-poster-modal";
import { abbreviateCountry } from "@/lib/constants/country-abbreviations";
import { fetchMovieDetails } from "@/lib/add-movie/fetch-movie-details";
import { getBadgeDefinition } from "@/lib/movie-engines/badge-engine";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";
import { cn } from "@/lib/utils";
import { useMovieStore } from "@/store/movie-store";
import type { LibraryMovie } from "@/store/movie-store";

type MovieDetailsModalProps = {
 movie: LibraryMovie;
 onClose: () => void;
};

const MISSING_VALUE = "—";

type DistributorReplacement = {
 current: string;
 suggested: string;
};

function formatMissingValue(value: string | null | undefined): string {
 return formatSharedMissingValue(value);
}

function isMissingValue(value: string | null | undefined) {
 return formatMissingValue(value) === MISSING_VALUE;
}

function formatRuntime(runtime: number | null): string {
 return runtime ? `${runtime} min` : MISSING_VALUE;
}

function formatDate(value: string): string {
 return formatMissingValue(value);
}

function createRewatchId(): string {
 if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
 return crypto.randomUUID();
 }

 return `rewatch-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function MetadataItem({
 label,
 value,
}: {
 label: string;
 value: ReactNode;
}) {
 return (
 <div className="space-y-1">
 <dt className="text-sm font-medium uppercase text-muted-foreground">
 {label}
 </dt>
 <dd className="text-sm leading-relaxed text-foreground">{value}</dd>
 </div>
 );
}

export function MovieDetailsModal({ movie, onClose }: MovieDetailsModalProps) {
 const removeMovie = useMovieStore((state) => state.removeMovie);
 const updateMovie = useMovieStore((state) => state.updateMovie);
 const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);
 const [showEditModal, setShowEditModal] = useState(false);
 const [showChangePoster, setShowChangePoster] = useState(false);
 const [rewatchDate, setRewatchDate] = useState("");
 const [isRefreshing, setIsRefreshing] = useState(false);
 const [refreshMessage, setRefreshMessage] = useState<string | null>(null);
 const [pendingDistributorReplacement, setPendingDistributorReplacement] =
 useState<DistributorReplacement | null>(null);

 const showPortugueseTitle = !isMissingValue(movie.titlePt);
 const showOriginalTitle = !isMissingValue(movie.originalTitle);
 const hasBadge = Boolean(getBadgeDefinition(movie.badgeId));
 const primarySubgenre = movie.subgenres[0] ?? "";

 useEffect(() => {
 const handleKeyDown = (event: KeyboardEvent) => {
 if (event.key === "Escape") {
 if (showEditModal || showChangePoster) return;
 onClose();
 }
 };

 const previousOverflow = document.body.style.overflow;
 document.body.style.overflow = "hidden";
 document.addEventListener("keydown", handleKeyDown);

 return () => {
 document.body.style.overflow = previousOverflow;
 document.removeEventListener("keydown", handleKeyDown);
 };
 }, [onClose, showEditModal, showChangePoster]);

 const handleDeleteMovie = () => {
 removeMovie(movie.id);
 onClose();
 };

 const handleRefreshMetadata = useCallback(async () => {
 if (!movie.tmdbId) return;

 setIsRefreshing(true);
 setRefreshMessage(null);
 setPendingDistributorReplacement(null);

 try {
 const details = await fetchMovieDetails(movie.tmdbId);
 const currentDistributor = movie.distributor;
 const suggestedDistributor = details.distributor ?? "";
 const currentMatchesProductionCompany =
 !isMissingValue(currentDistributor) &&
 details.productionCompanies?.some(
 (company) =>
 company.trim().toLowerCase() ===
 currentDistributor.trim().toLowerCase()
 );
 const shouldFillMissingDistributor =
 isMissingValue(currentDistributor) &&
 !isMissingValue(suggestedDistributor);

 updateMovie(movie.id, {
 posterUrl: movie.posterUrl,
 titlePt: details.titlePt,
 director: details.director,
 country: details.country,
 distributor: shouldFillMissingDistributor
 ? suggestedDistributor
 : currentDistributor,
 runtime: details.runtime,
 releaseDate: details.releaseDate,
 synopsis: details.overview,
 genres: details.genres,
 subgenres: details.subgenres,
 cast: details.cast ?? [],
 crew: details.crew ?? [],
 imdbId: details.imdbId,
 imdbScore: details.imdbScore ?? null,
 rottenTomatoesScore: details.rottenTomatoesScore ?? null,
 });

 if (
 currentMatchesProductionCompany &&
 !isMissingValue(suggestedDistributor) &&
 suggestedDistributor.trim().toLowerCase() !==
 currentDistributor.trim().toLowerCase()
 ) {
 setPendingDistributorReplacement({
 current: currentDistributor,
 suggested: suggestedDistributor,
 });
 setRefreshMessage(
 "Metadata refreshed. Distributor looks like a production company; confirm before replacing it."
 );
 } else if (
 currentMatchesProductionCompany &&
 isMissingValue(suggestedDistributor)
 ) {
 setRefreshMessage(
 "Metadata refreshed. Current distributor matches a production company, but no reliable distributor was found."
 );
 } else {
 setRefreshMessage("Metadata refreshed successfully.");
 }
 } catch (error) {
 setRefreshMessage(
 error instanceof Error ? error.message : "Failed to refresh metadata."
 );
 } finally {
 setIsRefreshing(false);
 }
 }, [movie, updateMovie]);

 const handleConfirmDistributorReplacement = () => {
 if (!pendingDistributorReplacement) return;

 updateMovie(movie.id, {
 distributor: pendingDistributorReplacement.suggested,
 });
 setRefreshMessage("Distributor updated.");
 setPendingDistributorReplacement(null);
 };

 const handleAddRewatch = () => {
 const watchedDate = rewatchDate.trim();
 if (!watchedDate) return;

 updateMovie(movie.id, {
 rewatchHistory: [
 ...movie.rewatchHistory,
 {
 id: createRewatchId(),
 watchedDate,
 recordedAt: new Date().toISOString(),
 },
 ],
 });
 setRewatchDate("");
 };

 const sortedRewatches = [...movie.rewatchHistory].sort((a, b) =>
 b.watchedDate.localeCompare(a.watchedDate)
 );

 return (
 <>
 <div
 className="motion-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-6 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="movie-details-title"
 >
 <button
 type="button"
 className="absolute inset-0"
 aria-label="Close movie details"
 onClick={onClose}
 />

 <article className="motion-modal-card relative flex h-[min(92dvh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-[24px] bg-black shadow-2xl">
 <span id="movie-details-title" className="sr-only">
 Movie Details
 </span>
 <Button
 type="button"
 variant="ghost"
 size="icon"
 className="absolute right-7 top-7 z-20 h-10 w-10 rounded-full text-[#e9e3d4] hover:bg-[#e9e3d4]/10 hover:text-[#e9e3d4]"
 aria-label="Close movie details"
 onClick={onClose}
 >
 <X className="h-6 w-6" aria-hidden />
 </Button>

 <div className="archive-scrollbar min-h-0 flex-1 overflow-y-auto px-10 py-12 md:px-14">
 {refreshMessage && (
 <div
 className={cn(
 "mb-4 rounded-md border px-4 py-3 text-sm",
 refreshMessage.includes("successfully")
 ? "border-green-400/40 bg-green-400/10 text-green-100"
 : "border-destructive/40 bg-destructive/10 text-destructive"
 )}
 >
 {refreshMessage}
 <button
 type="button"
 className="ml-2 font-medium underline"
 onClick={() => setRefreshMessage(null)}
 >
 Dismiss
 </button>
 </div>
 )}

 {pendingDistributorReplacement && (
 <div className="mb-4 rounded-md border border-amber-400/40 bg-background/50 px-4 py-3 text-sm">
 <p className="font-medium text-foreground">
 Distributor needs confirmation.
 </p>
 <p className="mt-2 text-muted-foreground">
 Current:{" "}
 <span className="text-foreground">
 {pendingDistributorReplacement.current}
 </span>
 </p>
 <p className="text-muted-foreground">
 Found:{" "}
 <span className="text-foreground">
 {pendingDistributorReplacement.suggested}
 </span>
 </p>
 <div className="mt-3 flex gap-2">
 <Button
 type="button"
 size="sm"
 onClick={handleConfirmDistributorReplacement}
 >
 Replace Distributor
 </Button>
 <Button
 type="button"
 variant="outline"
 size="sm"
 onClick={() => setPendingDistributorReplacement(null)}
 >
 Keep Current
 </Button>
 </div>
 </div>
 )}

 <div className="grid gap-14 lg:grid-cols-[21.5rem_1fr]">
 <aside className="space-y-4">
 {movie.posterUrl ? (
 <VhsPoster
 src={movie.posterUrl}
 alt={movie.displayTitle}
 className="aspect-[2/3] w-full rounded-[18px] border border-[#e9e3d4]/10"
 />
 ) : (
 <div className="flex aspect-[2/3] w-full items-center justify-center rounded-[18px] border border-[#e9e3d4]/10 text-sm text-muted-foreground">
 No Poster
 </div>
 )}

 <Button
 type="button"
 variant="outline"
 className="h-10 w-full rounded-full border-0 bg-[#0d0d0d] font-sans text-sm font-black text-[#e9e3d4] hover:bg-[#161616] hover:text-[#e9e3d4]"
 onClick={() => setShowChangePoster(true)}
 >
 <ImageIcon className="h-4 w-4" aria-hidden />
 Change Poster
 </Button>
 </aside>

 <section className="flex min-w-0 flex-col space-y-8 pr-3 md:pr-5">
 <div className="space-y-7">
 <div>
 <h2 className="archive-anton text-6xl uppercase leading-none text-[#e9e3d4] md:text-7xl">
 {formatMissingValue(movie.displayTitle)}
 </h2>
 {showPortugueseTitle && (
 <p className="archive-anton mt-3 text-3xl uppercase leading-none text-[#e9e3d4]">
 {formatMissingValue(movie.titlePt)}
 </p>
 )}
 </div>

 <div className="flex flex-wrap items-center gap-6 font-sans text-2xl font-black leading-none text-[#e9e3d4]">
 {hasBadge && (
 <MovieBadge
 badgeId={movie.badgeId}
 className="[&_img]:h-16 [&_img]:max-w-20"
 />
 )}
 {movie.stars > 0 && <MovieStars stars={movie.stars} size="md" />}
 <span className="inline-flex items-center gap-2">
 <img
 src="/images/gean.png"
 alt=""
 aria-hidden
 className="h-8 w-8 rounded-full object-cover grayscale"
 />
 {movie.reviewScore !== null
 ? formatReviewScore(movie.reviewScore)
 : MISSING_VALUE}
 </span>
 <span className="inline-flex items-center gap-2">
 <img
 src="/images/imdb.png"
 alt=""
 aria-hidden
 className="h-7 w-auto object-contain"
 />
 {movie.imdbScore !== null
 ? formatReviewScore(movie.imdbScore)
 : MISSING_VALUE}
 </span>
 <span className="inline-flex items-center gap-2">
 <img
 src="/images/rotten.png"
 alt=""
 aria-hidden
 className="h-8 w-8 object-contain"
 />
 {movie.rottenTomatoesScore !== null
 ? formatReviewScore(movie.rottenTomatoesScore / 10)
 : MISSING_VALUE}
 </span>
 </div>
 </div>

 <Separator className="bg-[#e9e3d4]/10" />

 <div className="grid gap-x-16 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
 {showOriginalTitle && (
 <MetadataItem
 label="Original Title"
 value={formatMissingValue(movie.originalTitle)}
 />
 )}
 <MetadataItem
 label="Year"
 value={formatMissingValue(movie.year)}
 />
 <MetadataItem
 label="Director"
 value={formatMissingValue(movie.director)}
 />
 <MetadataItem
 label="Country"
 value={formatMissingValue(abbreviateCountry(movie.country))}
 />
 <MetadataItem
 label="Distributor"
 value={formatMissingValue(movie.distributor)}
 />
 <MetadataItem
 label="Subgenre"
 value={formatMissingValue(primarySubgenre)}
 />
 <MetadataItem label="Runtime" value={formatRuntime(movie.runtime)} />
 <MetadataItem
 label="Release Date"
 value={formatDate(movie.releaseDate)}
 />
 <MetadataItem
 label="Watched Date"
 value={formatDate(movie.watchedDate)}
 />
 </div>

 <section className="space-y-3">
 <h3 className="text-sm font-medium uppercase text-muted-foreground">
 Synopsis
 </h3>
 <p className="text-sm leading-7 text-foreground/90">
 {formatMissingValue(movie.synopsis)}
 </p>
 </section>

 <section className="space-y-3">
 <h3 className="text-sm font-medium uppercase text-muted-foreground">
 Cast
 </h3>
 <p className="text-sm leading-7 text-foreground/90">
 {movie.cast.length ? movie.cast.join(", ") : MISSING_VALUE}
 </p>
 </section>

 <section className="space-y-3">
 <div className="flex flex-wrap items-center justify-between gap-3">
 <h3 className="text-sm font-medium uppercase text-muted-foreground">
 Rewatch History
 </h3>
 <div className="flex items-center gap-2">
 <input
 type="date"
 value={rewatchDate}
 onChange={(event) => setRewatchDate(event.target.value)}
 className="archive-input h-9 w-40 [color-scheme:dark]"
 aria-label="Rewatch date"
 />
 <Button
 type="button"
 variant="outline"
 size="sm"
 onClick={handleAddRewatch}
 disabled={!rewatchDate.trim()}
 >
 <Plus className="h-4 w-4" aria-hidden />
 Add
 </Button>
 </div>
 </div>
 <div className="rounded-[14px] bg-[#e9e3d4]/[0.03] px-4 py-3 font-sans text-sm text-[#e9e3d4]/80">
 {sortedRewatches.length > 0 ? (
 <div className="flex flex-wrap gap-2">
 {sortedRewatches.map((entry) => (
 <span
 key={entry.id}
 className="rounded-full bg-black px-3 py-1 text-[#e9e3d4]"
 >
 {formatDate(entry.watchedDate)}
 </span>
 ))}
 </div>
 ) : (
 <p className="text-muted-foreground">No rewatches recorded.</p>
 )}
 </div>
 </section>

 <div className="mt-auto flex flex-wrap justify-end gap-3 pt-6">
 <Button
 type="button"
 variant="outline"
 onClick={() => setShowEditModal(true)}
 >
 <Edit3 className="h-4 w-4" aria-hidden />
 Edit
 </Button>
 <Button
 type="button"
 variant="outline"
 onClick={handleRefreshMetadata}
 disabled={isRefreshing}
 >
 <RefreshCcw className="h-4 w-4" aria-hidden />
 {isRefreshing ? "Refreshing..." : "Refresh metadata"}
 </Button>
 {!isDeleteConfirming ? (
 <Button
 type="button"
 variant="destructive"
 onClick={() => setIsDeleteConfirming(true)}
 >
 <Trash2 className="h-4 w-4" aria-hidden />
 Delete
 </Button>
 ) : (
 <>
 <Button
 type="button"
 variant="destructive"
 onClick={handleDeleteMovie}
 >
 <Trash2 className="h-4 w-4" aria-hidden />
 Confirm
 </Button>
 <Button
 type="button"
 variant="outline"
 onClick={() => setIsDeleteConfirming(false)}
 >
 <X className="h-4 w-4" aria-hidden />
 Cancel
 </Button>
 </>
 )}
 </div>
 </section>
 </div>
 </div>
 </article>
 </div>

 {showEditModal && (
 <EditMovieModal
 movie={movie}
 onClose={() => setShowEditModal(false)}
 />
 )}

 {showChangePoster && (
 <ChangePosterModal
 movie={movie}
 onClose={() => setShowChangePoster(false)}
 />
 )}

 </>
 );
}
