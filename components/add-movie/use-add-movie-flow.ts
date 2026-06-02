"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ADD_MOVIE_MIN_SEARCH_LENGTH,
  ADD_MOVIE_SEARCH_DEBOUNCE_MS,
} from "@/lib/add-movie/constants";
import { fetchMovieDetails } from "@/lib/add-movie/fetch-movie-details";
import { mapSearchResultToDraft } from "@/lib/add-movie/map-to-draft";
import { searchMovies } from "@/lib/add-movie/search-client";
import { calculateBadgeId } from "@/lib/movie-engines/badge-engine";
import { findBestOfYearWinnerForReleaseYear } from "@/lib/movie-engines/best-of-year-crown";
import { calculateStars } from "@/lib/movie-engines/stars-engine";
import { useMovieStore } from "@/store";
import type { LibraryMovie } from "@/store/movie-store";
import type {
  AddMovieFormValues,
  AddMovieMovieDraft,
  AddMoviePanelState,
  AddMovieSearchResult,
} from "@/types/add-movie";

export type DuplicateMovieMatch = {
  reason: "TMDB ID" | "IMDb ID" | "title and year";
  movie: LibraryMovie;
};

export type SaveMovieOptions = {
  allowDuplicate?: boolean;
  confirmBestOfYearReplacement?: boolean;
};

const initialFormValues: AddMovieFormValues = {
  reviewScore: "",
  bestOfYear: false,
  watchedDate: "",
  badgeOverride: "",
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
  const tmdbMatch = movies.find(
    (movie) => movie.tmdbId === selectedMovie.tmdbId
  );
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

export function useAddMovieFlow(open: boolean) {
  const addMovie = useMovieStore((state) => state.addMovie);
  const movies = useMovieStore((state) => state.movies);

  const [panelState, setPanelState] = useState<AddMoviePanelState>("idle");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AddMovieSearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] =
    useState<AddMovieMovieDraft | null>(null);
  const [duplicateMatch, setDuplicateMatch] =
    useState<DuplicateMovieMatch | null>(null);
  const [bestOfYearReplacement, setBestOfYearReplacement] =
    useState<LibraryMovie | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedMovieId, setSavedMovieId] = useState<string | null>(null);

  const [formValues, setFormValues] =
    useState<AddMovieFormValues>(initialFormValues);

  const resetFlow = useCallback(() => {
    setPanelState("idle");
    setQuery("");
    setResults([]);
    setSearchError(null);
    setSelectedMovie(null);
    setDuplicateMatch(null);
    setBestOfYearReplacement(null);
    setSaveError(null);
    setSavedMovieId(null);
    setFormValues(initialFormValues);
  }, []);

  useEffect(() => {
    if (!open) {
      resetFlow();
    }
  }, [open, resetFlow]);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setPanelState("idle");
      setResults([]);
      setSearchError(null);
      return;
    }

    if (trimmed.length < ADD_MOVIE_MIN_SEARCH_LENGTH) {
      setPanelState("idle");
      setResults([]);
      setSearchError(null);
      return;
    }

    setPanelState("searching");
    setResults([]);
    setSearchError(null);

    const abortController = new AbortController();

    const debounceTimer = setTimeout(async () => {
      const outcome = await searchMovies(trimmed, abortController.signal);

      if (abortController.signal.aborted) return;

      if (!outcome.ok) {
        if (outcome.error === "aborted") return;

        setSearchError(outcome.error);
        setResults([]);
        setPanelState("results");
        return;
      }

      setResults(outcome.results);
      setSearchError(null);
      setPanelState("results");
    }, ADD_MOVIE_SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(debounceTimer);
      abortController.abort();
    };
  }, [query]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleSelectResult = useCallback(
    async (result: AddMovieSearchResult) => {
      setPanelState("searching");
      setDuplicateMatch(null);
      setBestOfYearReplacement(null);
      setSaveError(null);

      const draft = mapSearchResultToDraft(result);

      try {
        const details = await fetchMovieDetails(result.tmdbId);

        draft.director = details.director;
        draft.titlePt = details.titlePt;
        draft.releaseDate = details.releaseDate;

        draft.country = details.country;
        draft.runtime = details.runtime;
        draft.genres = details.genres;

        draft.synopsis = details.overview;

        draft.distributor = details.distributor ?? "-";

        draft.cast = details.cast ?? [];
        draft.crew = details.crew ?? [];

        draft.imdbId = details.imdbId;
        draft.imdbScore = details.imdbScore ?? null;
        draft.rottenTomatoesScore =
          details.rottenTomatoesScore ?? null;
      } catch (error) {
        console.error("Failed to load movie details", error);
      }

      setSelectedMovie(draft);
      setFormValues(initialFormValues);
      setPanelState("confirmation");
    },
    []
  );

  const handleBackFromConfirmation = useCallback(() => {
    setPanelState("results");
    setFormValues(initialFormValues);
    setDuplicateMatch(null);
    setBestOfYearReplacement(null);
    setSaveError(null);
  }, []);

  const handleSaveMovie = useCallback(
    (options: SaveMovieOptions = {}) => {
      if (!selectedMovie) return;

      setSaveError(null);

      const duplicate = findDuplicateMovie(selectedMovie, movies);
      if (duplicate && !options.allowDuplicate) {
        setDuplicateMatch(duplicate);
        return;
      }
      if (options.allowDuplicate) {
        setDuplicateMatch(null);
      }

      if (formValues.bestOfYear) {
        const replacement = findBestOfYearWinnerForReleaseYear(
          movies,
          selectedMovie.year
        );

        if (replacement && !options.confirmBestOfYearReplacement) {
          setBestOfYearReplacement(replacement);
          return;
        }
      }

      const reviewScore = formValues.reviewScore
        ? Number(formValues.reviewScore)
        : null;
      const stars = calculateStars(reviewScore);
      const badgeOverrideEnabled = formValues.badgeOverride !== "";
      const badgeId = badgeOverrideEnabled
        ? formValues.badgeOverride
        : calculateBadgeId(reviewScore);
      const now = new Date().toISOString();
      const movieId = createMovieId(selectedMovie.tmdbId);

      addMovie({
        id: movieId,
        tmdbId: selectedMovie.tmdbId,
        imdbId: selectedMovie.imdbId,

        displayTitle: selectedMovie.displayTitle,
        originalTitle: selectedMovie.originalTitle,
        titlePt: selectedMovie.titlePt,
        year: selectedMovie.year,

        posterUrl: selectedMovie.posterUrl,

        director: selectedMovie.director,
        country: selectedMovie.country,
        distributor: selectedMovie.distributor,
        runtime: selectedMovie.runtime,
        releaseDate: selectedMovie.releaseDate,
        synopsis: selectedMovie.synopsis,

        cast: selectedMovie.cast,
        crew: selectedMovie.crew,
        genres: selectedMovie.genres,
        subgenres: [],

        imdbScore: selectedMovie.imdbScore,
        rottenTomatoesScore: selectedMovie.rottenTomatoesScore,

        reviewScore,
        stars,
        badgeId,
        badgeOverrideEnabled,

        watchedDate: formValues.watchedDate,
        bestOfYear: formValues.bestOfYear,

        assignedLists: [],

        createdAt: now,
        updatedAt: now,
        metadataSourceSnapshot: JSON.stringify({
          tmdbId: selectedMovie.tmdbId,
          imdbId: selectedMovie.imdbId ?? null,
          sources: [
            "TMDB",
            selectedMovie.imdbId ? "OMDb" : null,
          ].filter(Boolean),
        }),
        metadataLastRefreshedAt: now,
      });

      setDuplicateMatch(null);
      setBestOfYearReplacement(null);
      setSavedMovieId(movieId);
      setPanelState("success");
    },
    [selectedMovie, formValues, movies, addMovie]
  );

  const handleAddAnother = useCallback(() => {
    resetFlow();
  }, [resetFlow]);

  const updateFormValues = useCallback(
    (patch: Partial<AddMovieFormValues>) => {
      setFormValues((prev) => ({ ...prev, ...patch }));
      setSaveError(null);

      if ("bestOfYear" in patch || "watchedDate" in patch) {
        setBestOfYearReplacement(null);
      }
    },
    []
  );

  const trimmedQuery = query.trim();

  const queryTooShort =
    trimmedQuery.length > 0 &&
    trimmedQuery.length < ADD_MOVIE_MIN_SEARCH_LENGTH;

  const showSearchField =
    panelState === "idle" ||
    panelState === "searching" ||
    panelState === "results";

  return {
    panelState,
    query,
    results,
    searchError,
    queryTooShort,
    selectedMovie,
    formValues,
    duplicateMatch,
    bestOfYearReplacement,
    saveError,
    savedMovieId,
    showSearchField,
    handleQueryChange,
    handleSelectResult,
    handleBackFromConfirmation,
    handleSaveMovie,
    handleAddAnother,
    updateFormValues,
    resetFlow,
  };
}
