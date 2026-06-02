"use client";

import type { DuplicateMovieMatch } from "@/components/add-movie/use-add-movie-flow";
import type { LibraryMovie } from "@/store/movie-store";
import { Button } from "@/components/ui/button";

type DuplicateWarningProps = {
  duplicateMatch: DuplicateMovieMatch | null;
  bestOfYearReplacement: LibraryMovie | null;
  onOpenExistingDuplicate: () => void;
  onAddAnyway: () => void;
  onConfirmBestOfYearReplacement: () => void;
};

export function DuplicateWarning({
  duplicateMatch,
  bestOfYearReplacement,
  onOpenExistingDuplicate,
  onAddAnyway,
  onConfirmBestOfYearReplacement,
}: DuplicateWarningProps) {
  if (duplicateMatch) {
    return (
      <div className="rounded-md border border-amber-400/40 bg-amber-400/10 p-3 text-sm">
        <p className="font-medium text-amber-100">Possible duplicate found</p>
        <p className="mt-1 text-amber-100/80">
          This matches {duplicateMatch.movie.displayTitle} by{" "}
          {duplicateMatch.reason}.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={onOpenExistingDuplicate}
          >
            Open Existing Movie
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onAddAnyway}
          >
            Add Anyway
          </Button>
        </div>
      </div>
    );
  }

  if (bestOfYearReplacement) {
    return (
      <div className="rounded-md border border-amber-400/40 bg-amber-400/10 p-3 text-sm">
        <p className="font-medium text-amber-100">
          Replace Best of Year winner?
        </p>
        <p className="mt-1 text-amber-100/80">
          {bestOfYearReplacement.displayTitle} is already marked Best of Year
          for this release year.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={onConfirmBestOfYearReplacement}
          >
            Replace Winner
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
