"use client";

import { REVIEW_SCORE_OPTIONS } from "@/lib/add-movie/review-scores";
import type { AddMovieFormValues, AddMovieMovieDraft } from "@/types/add-movie";
import { AddMoviePoster } from "@/components/add-movie/add-movie-poster";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type ConfirmationStateProps = {
  movie: AddMovieMovieDraft;
  formValues: AddMovieFormValues;
  onFormChange: (patch: Partial<AddMovieFormValues>) => void;
  onBack: () => void;
  onSave: () => void;
};

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="leading-relaxed text-foreground">{value}</span>
    </div>
  );
}

export function ConfirmationState({
  movie,
  formValues,
  onFormChange,
  onBack,
  onSave,
}: ConfirmationStateProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="flex gap-4">
        <AddMoviePoster
          posterUrl={movie.posterUrl}
          title={movie.displayTitle}
          className="h-28 w-20"
          sizes="160px"
        />
        <div className="min-w-0 flex-1 space-y-2">
          <h3 className="text-base font-semibold leading-tight tracking-tight">
            {movie.displayTitle}
          </h3>
          <div className="space-y-1.5">
            <MetadataRow label="Original" value={movie.originalTitle} />
            <MetadataRow label="Title PT" value={movie.titlePt} />
            <MetadataRow label="Year" value={movie.year} />
            <MetadataRow label="Director" value={movie.director} />
          </div>
        </div>
      </div>

      <Separator className="bg-border/60" />

      <section className="space-y-4">
        <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Personal Data
        </h4>

        <div className="space-y-2">
          <Label htmlFor="add-movie-review-score">Review score</Label>
          <select
            id="add-movie-review-score"
            value={formValues.reviewScore}
            onChange={(e) => onFormChange({ reviewScore: e.target.value })}
            className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select score…</option>
            {REVIEW_SCORE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={formValues.bestOfYear}
            onChange={(e) => onFormChange({ bestOfYear: e.target.checked })}
            className="h-4 w-4 rounded border-input accent-primary"
          />
          <span>Best of Year</span>
        </label>

        <div className="space-y-2">
          <Label htmlFor="add-movie-watched-date">
            Watched Date{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <input
            id="add-movie-watched-date"
            type="date"
            value={formValues.watchedDate}
            onChange={(e) => onFormChange({ watchedDate: e.target.value })}
            className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </section>

      <div className="mt-auto flex gap-2 border-t border-border/60 pt-5">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button type="button" className="flex-1" onClick={onSave}>
          Save Movie
        </Button>
      </div>
    </div>
  );
}
