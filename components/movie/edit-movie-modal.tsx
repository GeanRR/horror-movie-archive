"use client";

import { useState } from "react";
import { X } from "lucide-react";
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

export function EditMovieModal({ movie, onClose }: EditMovieModalProps) {
  const updateMovie = useMovieStore((state) => state.updateMovie);

  const [displayTitle, setDisplayTitle] = useState(movie.displayTitle);
  const [originalTitle, setOriginalTitle] = useState(movie.originalTitle);
  const [titlePt, setTitlePt] = useState(movie.titlePt);
  const [reviewScore, setReviewScore] = useState(
    movie.reviewScore ? String(movie.reviewScore) : ""
  );
  const [watchedDate, setWatchedDate] = useState(movie.watchedDate);
  const [bestOfYear, setBestOfYear] = useState(movie.bestOfYear);
  const [badgeOverride, setBadgeOverride] = useState(
    movie.badgeOverrideEnabled ? movie.badgeId ?? "" : ""
  );
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    setError(null);

    const parsedReviewScore = reviewScore
      ? Number(reviewScore)
      : null;

    if (reviewScore && (isNaN(parsedReviewScore!) || parsedReviewScore! < 0 || parsedReviewScore! > 10)) {
      setError("Review score must be between 0 and 10.");
      return;
    }

    const badgeOverrideEnabled = badgeOverride !== "";
    const badgeId = badgeOverrideEnabled
      ? badgeOverride
      : calculateBadgeId(parsedReviewScore);

    updateMovie(movie.id, {
      displayTitle,
      originalTitle,
      titlePt,
      reviewScore: parsedReviewScore,
      stars: calculateStars(parsedReviewScore),
      badgeId,
      badgeOverrideEnabled,
      watchedDate,
      bestOfYear,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-6 backdrop-blur-sm"
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

      <div className="relative flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-border/60 bg-card shadow-2xl">
        <header className="flex shrink-0 items-center justify-between border-b border-border/60 px-5 py-4">
          <h2 id="edit-movie-title" className="text-lg font-semibold tracking-tight">
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

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-display-title">Display Title</Label>
              <input
                id="edit-display-title"
                type="text"
                value={displayTitle}
                onChange={(e) => setDisplayTitle(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-original-title">Original Title</Label>
              <input
                id="edit-original-title"
                type="text"
                value={originalTitle}
                onChange={(e) => setOriginalTitle(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-title-pt">Portuguese Title</Label>
              <input
                id="edit-title-pt"
                type="text"
                value={titlePt}
                onChange={(e) => setTitlePt(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-review-score">Review Score</Label>
              <select
                id="edit-review-score"
                value={reviewScore}
                onChange={(e) => setReviewScore(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">No score</option>
                {REVIEW_SCORE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-badge-override">
                Badge{" "}
                <span className="font-normal text-muted-foreground">
                  (optional override)
                </span>
              </Label>
              <BadgeGridPicker
                value={badgeOverride}
                onChange={setBadgeOverride}
              />
            </div>

            <label className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={bestOfYear}
                onChange={(e) => setBestOfYear(e.target.checked)}
                className="h-4 w-4 rounded border-input accent-primary"
              />
              <span>Best of Year</span>
            </label>

            <div className="space-y-2">
              <Label htmlFor="edit-watched-date">Watched Date</Label>
              <input
                id="edit-watched-date"
                type="date"
                value={watchedDate}
                onChange={(e) => setWatchedDate(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
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
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </footer>
      </div>
    </div>
  );
}
