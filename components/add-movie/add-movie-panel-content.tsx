"use client";

import { AddMovieSearchField } from "@/components/add-movie/add-movie-search-field";
import { ConfirmationState } from "@/components/add-movie/states/confirmation-state";
import { IdleState } from "@/components/add-movie/states/idle-state";
import { ResultsState } from "@/components/add-movie/states/results-state";
import { SearchingState } from "@/components/add-movie/states/searching-state";
import { SuccessState } from "@/components/add-movie/states/success-state";
import type {
  AddMovieFormValues,
  AddMovieMovieDraft,
  AddMoviePanelState,
  AddMovieSearchResult,
} from "@/types/add-movie";

export type AddMoviePanelContentProps = {
  panelState: AddMoviePanelState;
  query: string;
  onQueryChange: (value: string) => void;
  showSearchField: boolean;
  queryTooShort: boolean;
  results: AddMovieSearchResult[];
  searchError: string | null;
  selectedMovie: AddMovieMovieDraft | null;
  formValues: AddMovieFormValues;
  onFormChange: (patch: Partial<AddMovieFormValues>) => void;
  onSelectResult: (result: AddMovieSearchResult) => void;
  onBack: () => void;
  onSave: () => void;
  onAddAnother: () => void;
  onViewMovie: () => void;
};

export function AddMoviePanelContent({
  panelState,
  query,
  onQueryChange,
  showSearchField,
  queryTooShort,
  results,
  searchError,
  selectedMovie,
  formValues,
  onFormChange,
  onSelectResult,
  onBack,
  onSave,
  onAddAnother,
  onViewMovie,
}: AddMoviePanelContentProps) {
  if (panelState === "success" && selectedMovie) {
    return (
      <SuccessState
        movieTitle={selectedMovie.displayTitle}
        onAddAnother={onAddAnother}
        onViewMovie={onViewMovie}
      />
    );
  }

  if (panelState === "confirmation" && selectedMovie) {
    return (
      <ConfirmationState
        movie={selectedMovie}
        formValues={formValues}
        onFormChange={onFormChange}
        onBack={onBack}
        onSave={onSave}
      />
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      {showSearchField && (
        <AddMovieSearchField query={query} onQueryChange={onQueryChange} />
      )}

      {panelState === "idle" && <IdleState queryTooShort={queryTooShort} />}
      {panelState === "searching" && <SearchingState />}
      {panelState === "results" && (
        <ResultsState
          results={results}
          searchError={searchError}
          onSelect={onSelectResult}
        />
      )}
    </div>
  );
}
