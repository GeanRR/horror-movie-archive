"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Image as ImageIcon, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fetchMoviePosters } from "@/lib/tmdb/fetch-movie-posters";
import { cn } from "@/lib/utils";
import { useMovieStore } from "@/store/movie-store";
import type { LibraryMovie } from "@/store/movie-store";
import type {
 MoviePosterOption,
 MoviePostersData,
} from "@/lib/tmdb/fetch-movie-posters";

type ChangePosterModalProps = {
 movie: LibraryMovie;
 onClose: () => void;
};

export function ChangePosterModal({ movie, onClose }: ChangePosterModalProps) {
 const updateMovie = useMovieStore((state) => state.updateMovie);
 const [urlInput, setUrlInput] = useState("");
 const [error, setError] = useState<string | null>(null);
 const [previewUrl, setPreviewUrl] = useState<string | null>(null);
 const [availablePosterData, setAvailablePosterData] =
 useState<MoviePostersData>({
 originalLanguage: null,
 posters: [],
 });
 const [isLoadingPosters, setIsLoadingPosters] = useState(false);
 const [posterLoadError, setPosterLoadError] = useState<string | null>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);
 const [isUploading, setIsUploading] = useState(false);

 useEffect(() => {
 let ignore = false;

 setIsLoadingPosters(true);
 setPosterLoadError(null);
 setAvailablePosterData({
 originalLanguage: null,
 posters: [],
 });

 fetchMoviePosters(movie.tmdbId)
 .then((posterData) => {
 if (ignore) return;
 setAvailablePosterData(posterData);
 })
 .catch((error) => {
 if (ignore) return;
 setPosterLoadError(
 error instanceof Error
 ? error.message
 : "Unable to load available posters."
 );
 })
 .finally(() => {
 if (!ignore) {
 setIsLoadingPosters(false);
 }
 });

 return () => {
 ignore = true;
 };
 }, [movie.tmdbId]);

 const posterOptions = useMemo(() => {
 const options = new Map<string, MoviePosterOption>();
 const currentPosterPath = getPosterPathFromUrl(movie.posterUrl);
 const originalLanguage = availablePosterData.originalLanguage;
 const isOriginalLanguageEnglish = originalLanguage === "en";

 if (movie.posterUrl) {
 options.set(currentPosterPath ?? movie.posterUrl, {
 path: currentPosterPath ?? "current",
 url: movie.posterUrl,
 width: null,
 height: null,
 language: null,
 voteAverage: Number.POSITIVE_INFINITY,
 voteCount: Number.POSITIVE_INFINITY,
 });
 }

 const sortedPosters = availablePosterData.posters
 .filter((poster) => {
 if (poster.path === currentPosterPath) return true;
 return (
 poster.language === "en" ||
 poster.language === null ||
 (!isOriginalLanguageEnglish && poster.language === originalLanguage)
 );
 })
 .sort((posterA, posterB) => {
 const groupDiff =
 getPosterLanguageGroup(posterA.language, originalLanguage) -
 getPosterLanguageGroup(posterB.language, originalLanguage);

 if (groupDiff !== 0) return groupDiff;

 const voteAverageDiff = posterB.voteAverage - posterA.voteAverage;
 if (voteAverageDiff !== 0) return voteAverageDiff;

 return posterB.voteCount - posterA.voteCount;
 })

 sortedPosters.forEach((poster) => {
 if (!options.has(poster.path)) {
 options.set(poster.path, poster);
 }
 });

 const limitedOptions = Array.from(options.values()).slice(0, 12);
 const bestOriginalLanguagePoster = sortedPosters.find(
 (poster) =>
 originalLanguage !== "en" && poster.language === originalLanguage
 );

 if (
 bestOriginalLanguagePoster &&
 !limitedOptions.some(
 (poster) => poster.path === bestOriginalLanguagePoster.path
 )
 ) {
 const replaceIndex = [...limitedOptions]
 .reverse()
 .findIndex(
 (poster) =>
 poster.path !== (currentPosterPath ?? "current") &&
 poster.language !== null
 );

 if (replaceIndex !== -1) {
 limitedOptions[
 limitedOptions.length - 1 - replaceIndex
 ] = bestOriginalLanguagePoster;
 }
 }

 return limitedOptions.sort((posterA, posterB) => {
 if (posterA.path === (currentPosterPath ?? "current")) return -1;
 if (posterB.path === (currentPosterPath ?? "current")) return 1;

 const groupDiff =
 getPosterLanguageGroup(posterA.language, originalLanguage) -
 getPosterLanguageGroup(posterB.language, originalLanguage);

 if (groupDiff !== 0) return groupDiff;

 const voteAverageDiff = posterB.voteAverage - posterA.voteAverage;
 if (voteAverageDiff !== 0) return voteAverageDiff;

 return posterB.voteCount - posterA.voteCount;
 });
 }, [availablePosterData, movie.posterUrl]);

 function getPosterPathFromUrl(url: string | undefined) {
 if (!url) return null;

 try {
 const pathname = new URL(url).pathname;
 const filename = pathname.split("/").filter(Boolean).at(-1);
 return filename ? `/${filename}` : null;
 } catch {
 const filename = url.split("/").filter(Boolean).at(-1);
 return filename ? `/${filename}` : null;
 }
 }

 function getPosterLanguageGroup(
 language: string | null,
 originalLanguage: string | null
 ) {
 if (language === "en") return 1;
 if (originalLanguage !== "en" && language === originalLanguage) return 2;
 if (language === null) return originalLanguage === "en" ? 2 : 3;

 return 4;
 }

 const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;

 if (!file.type.startsWith("image/")) {
 setError("Please select an image file.");
 return;
 }

 setIsUploading(true);
 setError(null);

 const reader = new FileReader();
 reader.onload = (event) => {
 const dataUrl = event.target?.result as string;
 setPreviewUrl(dataUrl);
 setUrlInput("");
 setIsUploading(false);
 };
 reader.onerror = () => {
 setError("Failed to read file.");
 setIsUploading(false);
 };
 reader.readAsDataURL(file);
 };

 const handleUrlSubmit = () => {
 const trimmed = urlInput.trim();
 if (!trimmed) {
 setError("Please enter a URL or upload an image.");
 return;
 }

 if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
 setError("Please enter a valid URL (http:// or https://).");
 return;
 }

 setPreviewUrl(trimmed);
 setUrlInput(trimmed);
 setError(null);
 };

 const handlePosterSelect = (posterUrl: string) => {
 setPreviewUrl(posterUrl);
 setUrlInput("");
 setError(null);
 if (fileInputRef.current) {
 fileInputRef.current.value = "";
 }
 };

 const handleSave = () => {
 if (!previewUrl) {
 setError("Please select an image or enter a URL first.");
 return;
 }

 updateMovie(movie.id, {
 posterUrl: previewUrl,
 });

 onClose();
 };

 const handleClear = () => {
 setPreviewUrl(null);
 setUrlInput("");
 setError(null);
 if (fileInputRef.current) {
 fileInputRef.current.value = "";
 }
 };

 const currentPoster = previewUrl ?? movie.posterUrl;
 const currentPosterPath = getPosterPathFromUrl(movie.posterUrl);

 return (
 <div
 className="motion-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-6 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="change-poster-title"
 >
 <button
 type="button"
 className="absolute inset-0"
 aria-label="Close change poster"
 onClick={onClose}
 />

 <div className="motion-modal-card relative flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-border/60 bg-card shadow-2xl">
 <header className="flex shrink-0 items-center justify-between border-b border-border/60 px-5 py-4">
 <h2 id="change-poster-title" className="text-lg font-semibold">
 Change Poster
 </h2>
 <Button
 type="button"
 variant="ghost"
 size="icon"
 aria-label="Close"
 onClick={onClose}
 >
 <X className="h-4 w-4" aria-hidden />
 </Button>
 </header>

 <div className="archive-scrollbar min-h-0 flex-1 overflow-y-auto p-5">
 <div className="space-y-6">
 {currentPoster ? (
 <div className="relative mx-auto w-48">
 <img
 src={currentPoster}
 alt={movie.displayTitle}
 className="aspect-[2/3] w-full rounded-lg border border-border/70 object-cover"
 />
 <button
 type="button"
 onClick={handleClear}
 className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs hover:bg-destructive/90"
 aria-label="Clear poster"
 >
 <X className="h-3 w-3" />
 </button>
 </div>
 ) : (
 <div className="mx-auto flex aspect-[2/3] w-48 items-center justify-center rounded-lg border border-dashed border-border/50 text-sm text-muted-foreground">
 No poster
 </div>
 )}

 <section className="space-y-3">
 <div>
 <h3 className="text-sm font-medium text-foreground">
 Available Posters
 </h3>
 {posterLoadError && (
 <p className="mt-1 text-xs text-muted-foreground">
 Available posters could not be loaded right now.
 </p>
 )}
 </div>

 {isLoadingPosters ? (
 <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
 {Array.from({ length: 6 }).map((_, index) => (
 <div
 key={index}
 className="mx-auto h-24 w-16 animate-pulse rounded-md border border-border/40 bg-muted/30"
 aria-hidden
 />
 ))}
 </div>
 ) : (
 <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
 {posterOptions.map((poster) => {
 const isCurrent =
 poster.url === movie.posterUrl ||
 poster.path === currentPosterPath;
 const isSelected = currentPoster === poster.url;
 const isNewSelection =
 previewUrl === poster.url && poster.url !== movie.posterUrl;

 return (
 <button
 type="button"
 key={poster.url}
 onClick={() => handlePosterSelect(poster.url)}
 className={cn(
 "group relative mx-auto flex h-[104px] w-full items-center justify-center rounded-md border bg-background/60 p-1 transition duration-200 hover:-translate-y-0.5 hover:border-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
 isSelected
 ? "border-foreground"
 : "border-border/60"
 )}
 aria-label={`Select poster for ${movie.displayTitle}`}
 aria-pressed={isSelected}
 >
 <img
 src={poster.url}
 alt={`${movie.displayTitle} poster option`}
 className="h-24 w-auto max-w-full rounded-sm object-contain"
 />
 <span className="pointer-events-none absolute left-2 top-2 flex flex-wrap gap-1">
 {isCurrent && (
 <span className="rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground">
 Current
 </span>
 )}
 {isNewSelection && (
 <span className="inline-flex items-center gap-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
 <Check className="h-3 w-3" aria-hidden />
 Selected
 </span>
 )}
 </span>
 </button>
 );
 })}
 </div>
 )}
 </section>

 <div className="space-y-2">
 <Label htmlFor="poster-url-input" className="archive-input-label">Poster URL</Label>
 <div className="flex gap-2">
 <input
 id="poster-url-input"
 type="url"
 placeholder="https://example.com/poster.jpg"
 value={urlInput}
 onChange={(e) => setUrlInput(e.target.value)}
 className="archive-input flex-1 disabled:opacity-60"
 />
 <Button
 type="button"
 variant="secondary"
 size="sm"
 onClick={handleUrlSubmit}
 >
 <ImageIcon className="h-4 w-4" aria-hidden />
 Preview
 </Button>
 </div>
 </div>

 <div className="space-y-2">
 <Label className="archive-input-label">Upload Image</Label>
 <div>
 <input
 ref={fileInputRef}
 type="file"
 accept="image/*"
 onChange={handleFileSelect}
 className="hidden"
 id="poster-file-input"
 />
 <label
 htmlFor="poster-file-input"
 className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#e9e3d4]/10 bg-[#0d0d0d] px-5 font-sans text-sm font-black text-[#e9e3d4] transition-colors hover:bg-[#161616]"
 >
 <Upload className="h-4 w-4" aria-hidden />
 {isUploading ? "Uploading..." : "Choose Image File"}
 </label>
 </div>
 </div>

 {error && (
 <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
 {error}
 </p>
 )}
 </div>
 </div>

 <footer className="flex shrink-0 justify-end gap-2 border-t border-border/60 px-5 py-4">
 <Button type="button" variant="outline" onClick={onClose}>
 <X className="h-4 w-4" aria-hidden />
 Cancel
 </Button>
 <Button type="button" onClick={handleSave}>
 <Check className="h-4 w-4" aria-hidden />
 Save Poster
 </Button>
 </footer>
 </div>
 </div>
 );
}
