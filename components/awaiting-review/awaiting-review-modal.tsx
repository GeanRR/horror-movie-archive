"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ConfirmationState } from "@/components/add-movie/states/confirmation-state";
import type {
  DuplicateMovieMatch,
  SaveMovieOptions,
} from "@/components/add-movie/use-add-movie-flow";
import { Button } from "@/components/ui/button";
import { fetchMovieDetails } from "@/lib/add-movie/fetch-movie-details";
import { mapSearchResultToDraft } from "@/lib/add-movie/map-to-draft";
import { searchMovies } from "@/lib/add-movie/search-client";
import { calculateBadgeId } from "@/lib/movie-engines/badge-engine";
import { findBestOfYearWinnerForReleaseYear } from "@/lib/movie-engines/best-of-year-crown";
import { calculateStars } from "@/lib/movie-engines/stars-engine";
import { normalizePrimarySubgenres } from "@/lib/movie-engines/subgenre-engine";
import { overlayFade, slideInFromRight } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useMovieStore, type LibraryMovie } from "@/store/movie-store";
import type { AddMovieFormValues, AddMovieMovieDraft } from "@/types/add-movie";

export type AwaitingReviewItem = {
  id: string;
  imdbId: string;
  tmdbId: number | null;
  displayTitle: string;
  year: string | null;
  posterUrl: string | null;
  watchedAt: string | null;
  source: string;
  createdAt: string;
};

type AwaitingReviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: AwaitingReviewItem[];
  onQueueChange: (items: AwaitingReviewItem[]) => void;
};

function createMovieId(tmdbId: number): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${tmdbId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeTitle(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleCandidates(movie: {
  displayTitle: string;
  originalTitle: string;
  titlePt: string;
}) {
  return [movie.displayTitle, movie.originalTitle, movie.titlePt]
    .map(normalizeTitle)
    .filter(Boolean);
}

function findDuplicateMovie(
  selectedMovie: AddMovieMovieDraft,
  movies: LibraryMovie[]
): DuplicateMovieMatch | null {
  const tmdbMatch = movies.find((movie) => movie.tmdbId === selectedMovie.tmdbId);
  if (tmdbMatch) return { reason: "TMDB ID", movie: tmdbMatch };

  if (selectedMovie.imdbId) {
    const imdbMatch = movies.find(
      (movie) => movie.imdbId && movie.imdbId === selectedMovie.imdbId
    );
    if (imdbMatch) return { reason: "IMDb ID", movie: imdbMatch };
  }

  const selectedTitles = titleCandidates(selectedMovie);
  const titleYearMatch = movies.find((movie) => {
    if (movie.year !== selectedMovie.year) return false;
    const existingTitles = titleCandidates(movie);
    return selectedTitles.some((title) => existingTitles.includes(title));
  });

  return titleYearMatch
    ? { reason: "title and year", movie: titleYearMatch }
    : null;
}

function watchedDateInputValue(value: string | null) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? new Date().toISOString().slice(0, 10)
    : date.toISOString().slice(0, 10);
}

async function buildDraftFromQueueItem(item: AwaitingReviewItem) {
  if (item.tmdbId) {
    const details = await fetchMovieDetails(item.tmdbId);
    return {
      tmdbId: details.tmdbId,
      displayTitle: details.title,
      originalTitle: details.originalTitle || details.title,
      titlePt: details.titlePt,
      year: details.year || item.year || "",
      releaseDate: details.releaseDate,
      posterPath: null,
      posterUrl: item.posterUrl ?? undefined,
      director: details.director,
      country: details.country,
      distributor: details.distributor ?? "-",
      runtime: details.runtime,
      synopsis: details.overview,
      cast: details.cast ?? [],
      crew: details.crew ?? [],
      genres: details.genres,
      subgenres: details.subgenres,
      imdbId: details.imdbId ?? item.imdbId,
      imdbScore: details.imdbScore ?? null,
      rottenTomatoesScore: details.rottenTomatoesScore ?? null,
      overview: details.overview,
    } satisfies AddMovieMovieDraft;
  }

  const query = [item.displayTitle, item.year].filter(Boolean).join(" ");
  const outcome = await searchMovies(query);
  if (!outcome.ok) {
    throw new Error(outcome.error);
  }

  const match =
    outcome.results.find(
      (result) =>
        result.releaseYear === item.year &&
        normalizeTitle(result.title) === normalizeTitle(item.displayTitle)
    ) ??
    outcome.results.find((result) => result.releaseYear === item.year) ??
    outcome.results[0];

  if (!match) {
    throw new Error("Unable to match this watched movie to TMDB.");
  }

  const draft = mapSearchResultToDraft(match);
  const details = await fetchMovieDetails(match.tmdbId);

  return {
    ...draft,
    director: details.director,
    titlePt: details.titlePt,
    releaseDate: details.releaseDate,
    country: details.country,
    runtime: details.runtime,
    genres: details.genres,
    subgenres: details.subgenres,
    synopsis: details.overview,
    distributor: details.distributor ?? "-",
    cast: details.cast ?? [],
    crew: details.crew ?? [],
    imdbId: details.imdbId ?? item.imdbId,
    imdbScore: details.imdbScore ?? null,
    rottenTomatoesScore: details.rottenTomatoesScore ?? null,
  };
}

export function AwaitingReviewModal({
  open,
  onOpenChange,
  items,
  onQueueChange,
}: AwaitingReviewModalProps) {
  const addMovie = useMovieStore((state) => state.addMovie);
  const movies = useMovieStore((state) => state.movies);
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [draft, setDraft] = useState<AddMovieMovieDraft | null>(null);
  const [formValues, setFormValues] = useState<AddMovieFormValues>({
    reviewScore: "",
    bestOfYear: false,
    watchedDate: "",
    badgeOverride: "",
  });
  const [duplicateMatch, setDuplicateMatch] = useState<DuplicateMovieMatch | null>(
    null
  );
  const [bestOfYearReplacement, setBestOfYearReplacement] =
    useState<LibraryMovie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const currentItem = items[currentIndex] ?? null;

  const remainingLabel = useMemo(() => {
    if (items.length === 0) return "No pending movies";
    return `${currentIndex + 1} of ${items.length}`;
  }, [currentIndex, items.length]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const removeCurrentFromQueue = useCallback(
    (id: string) => {
      const nextItems = items.filter((item) => item.id !== id);
      onQueueChange(nextItems);
      setCurrentIndex((index) => Math.min(index, Math.max(nextItems.length - 1, 0)));
    },
    [items, onQueueChange]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [close, open]);

  useEffect(() => {
    if (!open || !currentItem) return;

    let active = true;
    setLoading(true);
    setError(null);
    setDraft(null);
    setDuplicateMatch(null);
    setBestOfYearReplacement(null);
    setFormValues({
      reviewScore: "",
      bestOfYear: false,
      watchedDate: watchedDateInputValue(currentItem.watchedAt),
      badgeOverride: "",
    });

    buildDraftFromQueueItem(currentItem)
      .then((nextDraft) => {
        if (active) setDraft(nextDraft);
      })
      .catch((caught) => {
        if (active) {
          setError(
            caught instanceof Error
              ? caught.message
              : "Unable to prepare this movie for review."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [currentItem, open]);

  async function markCurrentAsAdded() {
    if (!currentItem) return;
    await fetch(`/api/awaiting-review/${currentItem.id}/added`, {
      method: "POST",
    });
    removeCurrentFromQueue(currentItem.id);
  }

  async function ignoreCurrent() {
    if (!currentItem) return;
    setSaving(true);
    setError(null);
    try {
      await fetch(`/api/awaiting-review/${currentItem.id}/ignore`, {
        method: "POST",
      });
      removeCurrentFromQueue(currentItem.id);
    } catch {
      setError("Unable to ignore this movie.");
    } finally {
      setSaving(false);
    }
  }

  async function saveMovie(options: SaveMovieOptions = {}) {
    if (!draft || !currentItem || saving) return;

    setError(null);
    const duplicate = findDuplicateMovie(draft, movies);
    if (duplicate) {
      setDuplicateMatch(duplicate);
      return;
    }

    if (formValues.bestOfYear) {
      const replacement = findBestOfYearWinnerForReleaseYear(movies, draft.year);
      if (replacement && !options.confirmBestOfYearReplacement) {
        setBestOfYearReplacement(replacement);
        return;
      }
    }

    if (!formValues.reviewScore) {
      setError("Choose a personal rating before adding this movie.");
      return;
    }

    setSaving(true);
    try {
      const reviewScore = Number(formValues.reviewScore);
      const stars = calculateStars(reviewScore);
      const badgeOverrideEnabled = formValues.badgeOverride !== "";
      const badgeId = badgeOverrideEnabled
        ? formValues.badgeOverride
        : calculateBadgeId(reviewScore);
      const now = new Date().toISOString();
      const movieId = createMovieId(draft.tmdbId);

      addMovie({
        id: movieId,
        tmdbId: draft.tmdbId,
        imdbId: draft.imdbId,
        displayTitle: draft.displayTitle,
        originalTitle: draft.originalTitle,
        titlePt: draft.titlePt,
        year: draft.year,
        posterUrl: draft.posterUrl,
        director: draft.director,
        country: draft.country,
        distributor: draft.distributor,
        runtime: draft.runtime,
        releaseDate: draft.releaseDate,
        synopsis: draft.synopsis,
        cast: draft.cast,
        crew: draft.crew,
        genres: draft.genres,
        subgenres: normalizePrimarySubgenres(draft.subgenres, {
          title: draft.displayTitle,
          originalTitle: draft.originalTitle,
          genres: draft.genres,
          overview: draft.synopsis,
        }),
        imdbScore: draft.imdbScore,
        rottenTomatoesScore: draft.rottenTomatoesScore,
        reviewScore,
        stars,
        badgeId,
        badgeOverrideEnabled,
        watchedDate: formValues.watchedDate,
        rewatchHistory: [],
        bestOfYear: formValues.bestOfYear,
        assignedLists: [],
        createdAt: now,
        updatedAt: now,
        metadataSourceSnapshot: JSON.stringify({
          tmdbId: draft.tmdbId,
          imdbId: draft.imdbId ?? null,
          sources: ["Stremio watched sync", "TMDB", draft.imdbId ? "OMDb" : null].filter(
            Boolean
          ),
        }),
        metadataLastRefreshedAt: now,
      });

      await markCurrentAsAdded();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save movie.");
    } finally {
      setSaving(false);
    }
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.button
            type="button"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="hidden"
            aria-label="Close awaiting review"
            className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"
            onClick={close}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="awaiting-review-title"
            variants={slideInFromRight}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              "relative flex h-full w-full max-w-2xl flex-col",
              "border-l border-[#e9e3d4]/10 bg-black shadow-2xl"
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex shrink-0 items-center justify-between border-b border-[#e9e3d4]/5 px-9 py-6">
              <div>
                <p className="font-sans text-sm text-[#6f6c7a]">
                  {remainingLabel}
                </p>
                <h2
                  id="awaiting-review-title"
                  className="archive-anton text-3xl uppercase leading-none text-[#e9e3d4]"
                >
                  Awaiting Review
                </h2>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-[#e9e3d4] hover:bg-[#e9e3d4]/10 hover:text-[#e9e3d4]"
                onClick={close}
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden />
              </Button>
            </header>

            <div className="archive-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto bg-black px-9 py-8">
              {items.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-center font-sans text-sm text-[#8b8795]">
                  No movies are waiting for review.
                </div>
              ) : loading ? (
                <div className="flex flex-1 items-center justify-center text-center font-sans text-sm text-[#8b8795]">
                  Preparing movie...
                </div>
              ) : draft ? (
                <div className="space-y-4">
                  <ConfirmationState
                    movie={draft}
                    formValues={formValues}
                    duplicateMatch={duplicateMatch}
                    bestOfYearReplacement={bestOfYearReplacement}
                    saveError={error}
                    onFormChange={(patch) => {
                      setFormValues((current) => ({ ...current, ...patch }));
                      setError(null);
                      if ("bestOfYear" in patch || "watchedDate" in patch) {
                        setBestOfYearReplacement(null);
                      }
                    }}
                    onBack={close}
                    onSave={saveMovie}
                    onOpenExistingDuplicate={() => undefined}
                    backLabel="Close"
                    saveLabel="Add to Library"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={ignoreCurrent}
                    disabled={saving}
                  >
                    Ignore
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 text-center font-sans text-sm text-[#8b8795]">
                  <p>{error ?? "Unable to prepare this movie."}</p>
                  <Button type="button" variant="outline" onClick={ignoreCurrent}>
                    Ignore
                  </Button>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
