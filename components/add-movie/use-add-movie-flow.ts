"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ADD_MOVIE_MIN_SEARCH_LENGTH,
  ADD_MOVIE_SEARCH_DEBOUNCE_MS,
} from "@/lib/add-movie/constants";
import { mapSearchResultToDraft } from "@/lib/add-movie/map-to-draft";
import { searchMovies } from "@/lib/add-movie/search-client";
import type {
  AddMovieFormValues,
  AddMovieMovieDraft,
  AddMoviePanelState,
  AddMovieSearchResult,
} from "@/types/add-movie";

const initialFormValues: AddMovieFormValues = {
  reviewScore: "",
  bestOfYear: false,
  watchedDate: "",
};

export function useAddMovieFlow(open: boolean) {
  const [panelState, setPanelState] = useState<AddMoviePanelState>("idle");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AddMovieSearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<AddMovieMovieDraft | null>(
    null
  );
  const [formValues, setFormValues] =
    useState<AddMovieFormValues>(initialFormValues);

  const resetFlow = useCallback(() => {
    setPanelState("idle");
    setQuery("");
    setResults([]);
    setSearchError(null);
    setSelectedMovie(null);
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

  const handleSelectResult = useCallback((result: AddMovieSearchResult) => {
    setSelectedMovie(mapSearchResultToDraft(result));
    setFormValues(initialFormValues);
    setPanelState("confirmation");
  }, []);

  const handleBackFromConfirmation = useCallback(() => {
    setPanelState("results");
    setFormValues(initialFormValues);
  }, []);

  const handleSaveMovie = useCallback(() => {
    setPanelState("success");
  }, []);

  const handleAddAnother = useCallback(() => {
    resetFlow();
  }, [resetFlow]);

  const updateFormValues = useCallback(
    (patch: Partial<AddMovieFormValues>) => {
      setFormValues((prev) => ({ ...prev, ...patch }));
    },
    []
  );

  const trimmedQuery = query.trim();
  const queryTooShort =
    trimmedQuery.length > 0 && trimmedQuery.length < ADD_MOVIE_MIN_SEARCH_LENGTH;

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
