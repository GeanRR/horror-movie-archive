"use client";

import { useState, type ReactNode } from "react";
import { Save, X } from "lucide-react";
import { calculateBadgeId } from "@/lib/movie-engines/badge-engine";
import { calculateStars } from "@/lib/movie-engines/stars-engine";
import { REVIEW_SCORE_OPTIONS } from "@/lib/add-movie/review-scores";
import { BadgeGridPicker } from "@/components/movie/badge-grid-picker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMovieStore } from "@/store/movie-store";
import type { LibraryMovie } from "@/store/movie-store";

type EditMovieModalProps = {
 movie: LibraryMovie;
 onClose: () => void;
};

const MISSING_VALUE = "—";

function isMissingValue(value: string | null | undefined) {
 const normalized = value?.trim();
 return !normalized || normalized === "-" || normalized === MISSING_VALUE;
}

function getEditableValue(value: string | null | undefined) {
 return isMissingValue(value) ? "" : value ?? "";
}

function getSaveValue(value: string, originalValue: string) {
 if (value.trim()) return value.trim();
 return isMissingValue(originalValue) ? originalValue : "";
}

function Field({
 label,
 htmlFor,
 children,
}: {
 label: string;
 htmlFor: string;
 children: ReactNode;
}) {
 return (
 <div className="space-y-2">
 <Label
 htmlFor={htmlFor}
 className="archive-input-label"
 >
 {label}
 </Label>
 {children}
 </div>
 );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
 return (
 <section className="space-y-4">
 <h3 className="archive-anton text-sm uppercase leading-none text-[#e9e3d4]">
 {title}
 </h3>
 {children}
 </section>
 );
}

const inputClassName =
 "archive-input disabled:opacity-60";

export function EditMovieModal({ movie, onClose }: EditMovieModalProps) {
 const updateMovie = useMovieStore((state) => state.updateMovie);

 const [displayTitle, setDisplayTitle] = useState(
 getEditableValue(movie.displayTitle)
 );
 const [originalTitle, setOriginalTitle] = useState(
 getEditableValue(movie.originalTitle)
 );
 const [titlePt, setTitlePt] = useState(getEditableValue(movie.titlePt));
 const [year, setYear] = useState(getEditableValue(movie.year));
 const [director, setDirector] = useState(getEditableValue(movie.director));
 const [country, setCountry] = useState(getEditableValue(movie.country));
 const [distributor, setDistributor] = useState(
 getEditableValue(movie.distributor)
 );
 const [reviewScore, setReviewScore] = useState(
 movie.reviewScore !== null ? String(movie.reviewScore) : ""
 );
 const [watchedDate, setWatchedDate] = useState(
 getEditableValue(movie.watchedDate)
 );
 const [bestOfYear, setBestOfYear] = useState(movie.bestOfYear);
 const [badgeOverride, setBadgeOverride] = useState(
 movie.badgeOverrideEnabled ? movie.badgeId ?? "" : ""
 );
 const [error, setError] = useState<string | null>(null);

 const handleSave = () => {
 setError(null);

 const parsedReviewScore = reviewScore ? Number(reviewScore) : null;
 if (
 reviewScore &&
 (Number.isNaN(parsedReviewScore) ||
 parsedReviewScore! < 0 ||
 parsedReviewScore! > 10)
 ) {
 setError("Review score must be between 0 and 10.");
 return;
 }

 const badgeOverrideEnabled = badgeOverride !== "";
 const badgeId = badgeOverrideEnabled
 ? badgeOverride
 : calculateBadgeId(parsedReviewScore);

 updateMovie(movie.id, {
 displayTitle: getSaveValue(displayTitle, movie.displayTitle),
 originalTitle: getSaveValue(originalTitle, movie.originalTitle),
 titlePt: getSaveValue(titlePt, movie.titlePt),
 year: getSaveValue(year, movie.year),
 director: getSaveValue(director, movie.director),
 country: getSaveValue(country, movie.country),
 distributor: getSaveValue(distributor, movie.distributor),
 reviewScore: parsedReviewScore,
 stars: calculateStars(parsedReviewScore),
 badgeId,
 badgeOverrideEnabled,
 watchedDate: getSaveValue(watchedDate, movie.watchedDate),
 bestOfYear,
 });

 onClose();
 };

 return (
 <div
 className="motion-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-6 backdrop-blur-sm"
 role="dialog"
 aria-modal="true"
 aria-labelledby="edit-movie-title"
 >
 <button
 type="button"
 className="absolute inset-0"
 aria-label="Close edit movie"
 onClick={onClose}
 />

 <div className="motion-modal-card relative flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-[24px] border border-[#e9e3d4]/10 bg-black shadow-2xl">
 <header className="flex shrink-0 items-center justify-between border-b border-[#e9e3d4]/10 px-6 py-5">
 <h2
 id="edit-movie-title"
 className="archive-anton text-3xl uppercase leading-none text-[#e9e3d4]"
 >
 Edit Movie
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

 <div className="archive-scrollbar min-h-0 flex-1 overflow-y-auto p-6">
 <div className="space-y-8">
 <Section title="Titles">
 <div className="grid gap-4 md:grid-cols-2">
 <Field label="Display Title" htmlFor="edit-display-title">
 <input
 id="edit-display-title"
 type="text"
 value={displayTitle}
 placeholder={MISSING_VALUE}
 onChange={(event) => setDisplayTitle(event.target.value)}
 className={inputClassName}
 />
 </Field>
 <Field label="Original Title" htmlFor="edit-original-title">
 <input
 id="edit-original-title"
 type="text"
 value={originalTitle}
 placeholder={MISSING_VALUE}
 onChange={(event) => setOriginalTitle(event.target.value)}
 className={inputClassName}
 />
 </Field>
 <Field label="Portuguese Title" htmlFor="edit-title-pt">
 <input
 id="edit-title-pt"
 type="text"
 value={titlePt}
 placeholder={MISSING_VALUE}
 onChange={(event) => setTitlePt(event.target.value)}
 className={inputClassName}
 />
 </Field>
 <Field label="Release Year" htmlFor="edit-year">
 <input
 id="edit-year"
 type="text"
 value={year}
 placeholder={MISSING_VALUE}
 onChange={(event) => setYear(event.target.value)}
 className={inputClassName}
 />
 </Field>
 </div>
 </Section>

 <Section title="Movie Information">
 <div className="grid gap-4 md:grid-cols-3">
 <Field label="Director" htmlFor="edit-director">
 <input
 id="edit-director"
 type="text"
 value={director}
 placeholder={MISSING_VALUE}
 onChange={(event) => setDirector(event.target.value)}
 className={inputClassName}
 />
 </Field>
 <Field label="Country" htmlFor="edit-country">
 <input
 id="edit-country"
 type="text"
 value={country}
 placeholder={MISSING_VALUE}
 onChange={(event) => setCountry(event.target.value)}
 className={inputClassName}
 />
 </Field>
 <Field label="Distributor" htmlFor="edit-distributor">
 <input
 id="edit-distributor"
 type="text"
 value={distributor}
 placeholder={MISSING_VALUE}
 onChange={(event) => setDistributor(event.target.value)}
 className={inputClassName}
 />
 </Field>
 </div>
 </Section>

 <Section title="Personal Rating">
 <div
 className="grid grid-cols-5 gap-3 sm:grid-cols-10"
 role="radiogroup"
 aria-label="Review score"
 >
 {REVIEW_SCORE_OPTIONS.map((option) => (
 <button
 key={option.value}
 type="button"
 role="radio"
 aria-checked={reviewScore === option.value}
 onClick={() => setReviewScore(option.value)}
 className={
 reviewScore === option.value
 ? "grid h-10 w-10 place-items-center rounded-full bg-[#E0B63E] font-sans text-sm font-black text-black transition-transform duration-200 hover:scale-105"
 : "grid h-10 w-10 place-items-center rounded-full bg-[#1a1a1a] font-sans text-sm font-black text-[#a5a1ad] transition-colors duration-200 hover:bg-[#252525] hover:text-[#e9e3d4]"
 }
 >
 {option.label.replace(".", ",")}
 </button>
 ))}
 </div>
 </Section>

 <Section title="Badge">
 <BadgeGridPicker
 value={badgeOverride}
 onChange={setBadgeOverride}
 showAutomatic
 showDescription={false}
 className="grid-cols-6 gap-x-2 gap-y-3"
 buttonClassName="h-16 w-16 rounded-full border-2 border-transparent bg-transparent p-0 hover:bg-transparent"
 selectedButtonClassName="border-[#E0B63E] bg-transparent shadow-[0_0_0_1px_rgba(224,182,62,0.45)]"
 imageClassName="h-16"
 />
 </Section>

 <Section title="Tracking">
 <div className="grid gap-4 md:grid-cols-2">
 <Field label="Watched Date" htmlFor="edit-watched-date">
 <input
 id="edit-watched-date"
 type="date"
 value={watchedDate}
 onChange={(event) => setWatchedDate(event.target.value)}
 className={inputClassName}
 />
 </Field>
 <label className="mt-auto inline-flex h-11 cursor-pointer items-center gap-3 rounded-full bg-[#0b0b0b] px-4 font-sans text-sm font-bold text-[#e9e3d4]">
 <input
 type="checkbox"
 checked={bestOfYear}
 onChange={(event) => setBestOfYear(event.target.checked)}
 className="h-4 w-4 accent-[#E0B63E]"
 />
 Best of Year
 </label>
 </div>
 </Section>

 {error && (
 <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
 {error}
 </p>
 )}
 </div>
 </div>

 <footer className="flex shrink-0 justify-end gap-3 border-t border-[#e9e3d4]/10 px-6 py-5">
 <Button type="button" variant="secondary" onClick={onClose}>
 <X className="h-4 w-4" aria-hidden />
 Cancel
 </Button>
 <Button type="button" onClick={handleSave}>
 <Save className="h-4 w-4" aria-hidden />
 Save Changes
 </Button>
 </footer>
 </div>
 </div>
 );
}
