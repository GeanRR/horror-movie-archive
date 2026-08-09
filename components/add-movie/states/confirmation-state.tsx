"use client";

import { REVIEW_SCORE_OPTIONS } from "@/lib/add-movie/review-scores";
import type {
 DuplicateMovieMatch,
 SaveMovieOptions,
} from "@/components/add-movie/use-add-movie-flow";
import type { AddMovieFormValues, AddMovieMovieDraft } from "@/types/add-movie";
import type { LibraryMovie } from "@/store/movie-store";
import { AddMoviePoster } from "@/components/add-movie/add-movie-poster";
import { BadgeGridPicker } from "@/components/movie/badge-grid-picker";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { DuplicateWarning } from "@/components/add-movie/states/duplicate-warning";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";

type ConfirmationStateProps = {
 movie: AddMovieMovieDraft;
 formValues: AddMovieFormValues;
 duplicateMatch: DuplicateMovieMatch | null;
 bestOfYearReplacement: LibraryMovie | null;
 saveError: string | null;
 onFormChange: (patch: Partial<AddMovieFormValues>) => void;
 onBack: () => void;
 onSave: (options?: SaveMovieOptions) => void;
 onOpenExistingDuplicate: () => void;
 backLabel?: string;
 saveLabel?: string;
};

function MetadataRow({ label, value }: { label: string; value: string }) {
 const displayValue = value.trim() && value !== "-" ? value : "—";

 return (
 <div className="grid grid-cols-[4.5rem_1fr] gap-4 font-sans text-sm">
 <span className="text-[#6f6c7a]">{label}</span>
 <span className="leading-relaxed text-[#e9e3d4]">{displayValue}</span>
 </div>
 );
}

export function ConfirmationState({
 movie,
 formValues,
 duplicateMatch,
 bestOfYearReplacement,
 saveError,
 onFormChange,
 onBack,
 onSave,
 onOpenExistingDuplicate,
 backLabel = "Back",
 saveLabel = "Save Movie",
}: ConfirmationStateProps) {
 return (
 <div className="flex min-h-0 flex-1 flex-col gap-8 bg-black text-[#e9e3d4]">
 <div className="grid w-full max-w-[390px] grid-cols-[132px_1fr] items-center gap-6 pt-2">
 <AddMoviePoster
 posterUrl={movie.posterUrl}
 title={movie.displayTitle}
 className="h-[190px] w-[132px] rounded-[8px] border-[#e9e3d4]/10"
 sizes="180px"
 />

 <div className="min-w-0 space-y-3">
 <h3 className="archive-anton text-2xl uppercase leading-none text-[#e9e3d4]">
 {movie.displayTitle}
 </h3>
 <div className="space-y-1">
 <MetadataRow label="Title PT" value={movie.titlePt} />
 <MetadataRow label="Year" value={movie.year} />
 <MetadataRow label="Director" value={movie.director} />
 <MetadataRow
 label="Runtime"
 value={movie.runtime ? `${movie.runtime} min` : "—"}
 />
 </div>
 </div>
 </div>

 <section className="space-y-8">
 <div className="space-y-4">
 <h4 className="archive-anton text-sm uppercase leading-none text-[#e9e3d4]">
 Personal Rating
 </h4>

 <div
 className="grid grid-cols-9 gap-3"
 role="radiogroup"
 aria-label="Review score"
 >
 {REVIEW_SCORE_OPTIONS.map((option) => (
 <button
 key={option.value}
 type="button"
 role="radio"
 aria-checked={formValues.reviewScore === option.value}
 onClick={() => onFormChange({ reviewScore: option.value })}
 className={
 formValues.reviewScore === option.value
 ? "grid h-10 w-10 place-items-center rounded-full bg-[#E0B63E] font-sans text-sm font-black text-black transition-transform duration-200 hover:scale-105"
 : "grid h-10 w-10 place-items-center rounded-full bg-[#1a1a1a] font-sans text-sm font-black text-[#a5a1ad] transition-colors duration-200 hover:bg-[#252525] hover:text-[#e9e3d4]"
 }
 >
 {option.label.replace(".", ",")}
 </button>
 ))}
 </div>
 </div>

 <div className="space-y-4">
 <Label
 htmlFor="add-movie-badge-override"
 className="archive-input-label"
 >
 Badge{" "}
 <span className="font-sans text-xs font-normal normal-case text-[#6f6c7a]">
 (optional)
 </span>
 </Label>
 <BadgeGridPicker
 value={formValues.badgeOverride}
 onChange={(value) => onFormChange({ badgeOverride: value })}
 showAutomatic={false}
 showDescription={false}
 className="grid-cols-6 gap-x-2 gap-y-3"
 buttonClassName="aspect-square rounded-full border-2 border-transparent bg-transparent p-0 hover:bg-transparent"
 selectedButtonClassName="border-[#E0B63E] bg-transparent shadow-[0_0_0_1px_rgba(224,182,62,0.45)]"
 imageClassName="h-14"
 />
 </div>

 <label className="inline-flex cursor-pointer items-center gap-3 font-sans text-sm font-bold text-[#e9e3d4]">
 <input
 type="checkbox"
 checked={formValues.bestOfYear}
 onChange={(event) =>
 onFormChange({ bestOfYear: event.target.checked })
 }
 className="h-3.5 w-3.5 rounded border-[#E0B63E] bg-transparent accent-[#E0B63E]"
 />
 <BestOfYearCrown active className="h-5 w-5 text-[#E0B63E]" />
 <span>Best of the Year</span>
 </label>

 {saveError && (
 <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
 {saveError}
 </p>
 )}

 <DuplicateWarning
 duplicateMatch={duplicateMatch}
 bestOfYearReplacement={bestOfYearReplacement}
 onOpenExistingDuplicate={onOpenExistingDuplicate}
 onConfirmBestOfYearReplacement={() =>
 onSave({
 confirmBestOfYearReplacement: true,
 })
 }
 />

 <div className="space-y-2">
 <Label
 htmlFor="add-movie-watched-date"
 className="font-sans text-sm font-bold text-[#e9e3d4]"
 >
 Watched Date{" "}
 <span className="font-normal text-[#6f6c7a]">(optional)</span>
 </Label>
 <input
 id="add-movie-watched-date"
 type="date"
 value={formValues.watchedDate}
 onChange={(event) =>
 onFormChange({ watchedDate: event.target.value })
 }
 className="archive-input [color-scheme:dark]"
 />
 </div>
 </section>

 <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
 <Button
 type="button"
 variant="outline"
 onClick={onBack}
 >
 <ArrowLeft className="h-4 w-4" aria-hidden />
 {backLabel}
 </Button>
 <Button
 type="button"
 onClick={() => onSave()}
 >
 <Save className="h-4 w-4" aria-hidden />
 {saveLabel}
 </Button>
 </div>
 </div>
 );
}
