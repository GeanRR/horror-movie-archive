"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Edit3,
  Film,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { VhsPoster } from "@/components/movie/vhs-poster";
import { Button } from "@/components/ui/button";
import { fetchMovieDetails } from "@/lib/add-movie/fetch-movie-details";
import {
  useMovieStore,
  type CustomMovieList,
  type LibraryMovie,
  type WatchlistMovie,
} from "@/store/movie-store";
import type {
  PersistedWatchlist,
  WatchlistItemInput,
  WatchlistInput,
} from "@/lib/watchlist/types";
import type {
  WatchlistSearchResponse,
  WatchlistSearchResult,
} from "@/lib/watchlist/search-types";

const WATCHLIST_DB_MIGRATION_FLAG = "hma-watchlists-db-migrated-v1";

type ListModalState =
  | { mode: "create"; list?: undefined }
  | { mode: "edit"; list: CustomMovieList }
  | null;

function formatMissing(value: string | null | undefined) {
  return value && value.trim() ? value : "—";
}

function createWatchlistMovieId(result: WatchlistSearchResult) {
  return result.tmdbId === null
    ? result.id
    : `watch-tmdb-${result.tmdbId}`;
}

function toCustomLists(lists: PersistedWatchlist[]): CustomMovieList[] {
  return lists as CustomMovieList[];
}

function toWatchlistItemInput(movie: WatchlistMovie): WatchlistItemInput {
  return {
    tmdbId: movie.tmdbId,
    imdbId: movie.imdbId ?? null,
    displayTitle: movie.displayTitle,
    year: movie.year,
    posterUrl: movie.posterUrl ?? null,
  };
}

function readLegacyWatchlists(): WatchlistInput[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem("hma-movies");
    if (!raw) return [];

    const payload = JSON.parse(raw) as {
      state?: {
        lists?: Array<{
          id?: string;
          name?: string;
          movies?: WatchlistMovie[];
          createdAt?: string;
          updatedAt?: string;
        }>;
      };
    };

    return (payload.state?.lists ?? [])
      .filter((list) => typeof list.name === "string" && list.name.trim())
      .map((list) => ({
        id: list.id,
        name: list.name ?? "",
        createdAt: list.createdAt,
        updatedAt: list.updatedAt,
        movies: (list.movies ?? []).map(toWatchlistItemInput),
      }));
  } catch {
    return [];
  }
}

async function requestWatchlists(): Promise<CustomMovieList[]> {
  const response = await fetch("/api/watchlists", { cache: "no-store" });
  const data = (await response.json()) as
    | { ok: true; lists: PersistedWatchlist[] }
    | { ok: false; error: string };

  if (!response.ok || !data.ok) {
    throw new Error(data.ok === false ? data.error : "Failed to load lists.");
  }

  return toCustomLists(data.lists);
}

async function requestWatchlistMigration(): Promise<CustomMovieList[]> {
  const response = await fetch("/api/watchlists/migrate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lists: readLegacyWatchlists() }),
  });
  const data = (await response.json()) as
    | { ok: true; lists: PersistedWatchlist[] }
    | { ok: false; error: string };

  if (!response.ok || !data.ok) {
    throw new Error(data.ok === false ? data.error : "Failed to migrate lists.");
  }

  window.localStorage.setItem(WATCHLIST_DB_MIGRATION_FLAG, "true");
  return toCustomLists(data.lists);
}

async function buildWatchlistMovie(
  result: WatchlistSearchResult
): Promise<WatchlistMovie> {
  const now = new Date().toISOString();

  if (result.tmdbId !== null) {
    try {
    const details = await fetchMovieDetails(result.tmdbId);

    return {
      id: createWatchlistMovieId(result),
      tmdbId: details.tmdbId,
      imdbId: details.imdbId,
      displayTitle: details.title,
      originalTitle: details.originalTitle || details.title,
      titlePt: details.titlePt || details.title,
      year: details.year,
      posterUrl: result.posterUrl,
      director: details.director,
      country: details.country,
      distributor: details.distributor ?? "",
      runtime: details.runtime,
      releaseDate: details.releaseDate,
      synopsis: details.overview,
      cast: details.cast ?? [],
      crew: details.crew ?? [],
      genres: details.genres,
      subgenres: details.subgenres,
      imdbScore: details.imdbScore ?? null,
      rottenTomatoesScore: details.rottenTomatoesScore ?? null,
      releaseDates: details.releaseDates ?? {
        theatrical: details.releaseDate,
      },
      createdAt: now,
      updatedAt: now,
      metadataSourceSnapshot: "watchlist-search",
      metadataLastRefreshedAt: now,
    };
    } catch {
      // Save the search snapshot instead of blocking the watchlist.
    }
  }

    return {
      id: createWatchlistMovieId(result),
      tmdbId: result.tmdbId,
      imdbId: result.imdbId,
      displayTitle: result.title,
      originalTitle: result.originalTitle,
      titlePt: result.title,
      year: result.releaseYear,
      posterUrl: result.posterUrl,
      director: "",
      country: "",
      distributor: "",
      runtime: null,
      releaseDate: "",
      synopsis: result.overview,
      cast: [],
      crew: [],
      genres: [],
      subgenres: [],
      imdbScore: null,
      rottenTomatoesScore: null,
      createdAt: now,
      updatedAt: now,
      metadataSourceSnapshot: "watchlist-search-fallback",
      metadataLastRefreshedAt: null,
    };
}

function isResultInLibrary(result: WatchlistSearchResult, movies: LibraryMovie[]) {
  return movies.some((movie) => {
    if (result.tmdbId !== null && movie.tmdbId === result.tmdbId) return true;
    if (result.imdbId && movie.imdbId === result.imdbId) return true;
    if (result.releaseYear && movie.year === result.releaseYear) {
      return [movie.displayTitle, movie.originalTitle, movie.titlePt]
        .map((value) => value.trim().toLowerCase())
        .includes(result.title.trim().toLowerCase());
    }
    return false;
  });
}

function isResultInList(result: WatchlistSearchResult, list: CustomMovieList) {
  return list.movies.some((movie) => {
    if (result.tmdbId !== null && movie.tmdbId === result.tmdbId) return true;
    if (result.imdbId && movie.imdbId === result.imdbId) return true;
    return movie.id === result.id;
  });
}

function ListPosterPreview({ movies }: { movies: WatchlistMovie[] }) {
  const previewMovies = movies
    .filter((movie): movie is WatchlistMovie & { posterUrl: string } =>
      Boolean(movie.posterUrl)
    )
    .slice(0, 8);

  if (previewMovies.length === 0) {
    return (
      <div className="grid h-[154px] w-full place-items-center rounded-[12px] bg-[#111] text-[#6f6c7a]">
        <Film className="h-8 w-8" aria-hidden />
      </div>
    );
  }

  return (
    <div className="relative h-[154px] w-full overflow-hidden rounded-[12px]">
      {previewMovies.map((movie, index) => (
        <span
          key={movie.id}
          className="absolute top-0 block h-[154px] w-[104px]"
          style={{ left: `${index * 54}px`, zIndex: index + 1 }}
        >
          <VhsPoster
            src={movie.posterUrl}
            alt=""
            className="h-full w-full rounded-[8px] shadow-2xl"
            imageClassName="object-cover"
          />
        </span>
      ))}
    </div>
  );
}

function ListFormModal({
  state,
  onClose,
  onSave,
}: {
  state: ListModalState;
  onClose: () => void;
  onSave: (state: Exclude<ListModalState, null>, name: string) => Promise<void>;
}) {
  const [name, setName] = useState(state?.mode === "edit" ? state.list.name : "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(state?.mode === "edit" ? state.list.name : "");
    setError("");
  }, [state]);

  if (!state) return null;

  const title = state.mode === "create" ? "Create List" : "Edit List";

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    if (!trimmedName || isSaving) return;

    setIsSaving(true);
    setError("");
    try {
      await onSave(state, trimmedName);
    } catch {
      setError("Unable to save list.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="motion-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="watchlist-form-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close list form"
        onClick={onClose}
      />
      <section className="motion-modal-card relative w-full max-w-xl overflow-hidden rounded-[24px] bg-black shadow-2xl">
        <header className="flex items-center justify-between border-b border-[#e9e3d4]/10 px-6 py-5">
          <h2
            id="watchlist-form-title"
            className="archive-anton text-3xl uppercase leading-none text-[#e9e3d4]"
          >
            {title}
          </h2>
          <Button type="button" variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </header>

        <div className="p-6">
          <label className="block space-y-2">
            <span className="font-sans text-sm font-medium text-[#e9e3d4]">
              List name
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="archive-input"
              placeholder="Japanese Horror"
            />
          </label>
          {error && (
            <p className="mt-3 font-sans text-sm text-[#e9e3d4]">
              {error}
            </p>
          )}
        </div>

        <footer className="flex justify-end gap-3 border-t border-[#e9e3d4]/10 px-6 py-5">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={!name.trim() || isSaving}>
            {isSaving
              ? "Saving..."
              : state.mode === "create"
                ? "Create List"
                : "Save List"}
          </Button>
        </footer>
      </section>
    </div>
  );
}

function AddMoviesModal({
  list,
  libraryMovies,
  onClose,
  onAddMovie,
}: {
  list: CustomMovieList;
  libraryMovies: LibraryMovie[];
  onClose: () => void;
  onAddMovie: (listId: string, movie: WatchlistMovie) => Promise<void>;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WatchlistSearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "searching" | "error">("idle");
  const [error, setError] = useState("");
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      setResults([]);
      setStatus("idle");
      setError("");
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setStatus("searching");
      setError("");

      try {
        const params = new URLSearchParams({ q: trimmedQuery });
        const response = await fetch(`/api/watchlist/search?${params}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as WatchlistSearchResponse;

        if (!response.ok || !data.ok) {
          setStatus("error");
          setError(data.ok === false ? data.error : "Search failed.");
          return;
        }

        setResults(data.results.slice(0, 30));
        setStatus("idle");
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setStatus("error");
        setError("Unable to search movies right now.");
      }
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const handleAdd = async (result: WatchlistSearchResult) => {
    if (isResultInLibrary(result, libraryMovies) || isResultInList(result, list)) {
      return;
    }

    setAddingId(result.id);
    const movie = await buildWatchlistMovie(result);
    await onAddMovie(list.id, movie);
    setAddingId(null);
  };

  return (
    <div
      className="motion-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-list-movies-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close add movies"
        onClick={onClose}
      />
      <section className="motion-modal-card relative flex max-h-[86vh] w-full max-w-4xl flex-col overflow-hidden rounded-[24px] bg-black shadow-2xl">
        <header className="flex items-center justify-between border-b border-[#e9e3d4]/10 px-6 py-5">
          <div>
            <p className="font-sans text-sm font-medium text-[#E0B63E]">
              Add Movies
            </p>
            <h2
              id="add-list-movies-title"
              className="archive-anton mt-1 text-4xl uppercase leading-none text-[#e9e3d4]"
            >
              {list.name}
            </h2>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </header>

        <div className="border-b border-[#e9e3d4]/10 p-5">
          <div className="flex items-center gap-3 rounded-full bg-[#0d0d0d] px-4">
            <Search className="h-4 w-4 text-[#6f6c7a]" aria-hidden />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-12 flex-1 bg-transparent font-sans text-sm text-[#e9e3d4] outline-none placeholder:text-[#6f6c7a]"
              placeholder="Search any movie..."
            />
          </div>
        </div>

        <div className="archive-scrollbar min-h-0 flex-1 overflow-y-auto p-5">
          {status === "error" && (
            <div className="mb-4 rounded-[14px] bg-[#12070a] p-4 font-sans text-sm text-[#e9e3d4]">
              {error}
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {results.map((result) => {
                const inLibrary = isResultInLibrary(result, libraryMovies);
                const inList = isResultInList(result, list);
                const isAdding = addingId === result.id;
                const isDisabled = inLibrary || inList || isAdding;

                return (
                  <article
                    key={result.id}
                    className="grid grid-cols-[58px_1fr_auto] items-center gap-4 rounded-[14px] bg-[#0b0b0b] p-3"
                  >
                    {result.posterUrl ? (
                      <VhsPoster
                        src={result.posterUrl}
                        alt=""
                        className="h-[82px] w-[58px] rounded-[5px]"
                        imageClassName="object-cover"
                      />
                    ) : (
                      <div className="grid h-[82px] w-[58px] place-items-center rounded-[5px] bg-[#111] text-[#6f6c7a]">
                        <Film className="h-5 w-5" aria-hidden />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="archive-anton text-2xl uppercase leading-none text-[#e9e3d4]">
                        {result.title}
                      </h3>
                      <p className="mt-2 font-sans text-sm text-[#6f6c7a]">
                        {formatMissing(result.releaseYear)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      disabled={isDisabled}
                      onClick={() => handleAdd(result)}
                    >
                      {inLibrary
                        ? "In Library"
                        : inList
                          ? "Added"
                          : isAdding
                            ? "Adding..."
                            : "Add"}
                    </Button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="grid min-h-[260px] place-items-center rounded-[18px] bg-[#0b0b0b] text-center">
              <p className="font-sans text-sm text-[#6f6c7a]">
                {status === "searching"
                  ? "Searching..."
                  : "Search for movies that are not already in your Library."}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function WatchlistMovieCard({
  movie,
  index,
  total,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  movie: WatchlistMovie;
  index: number;
  total: number;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <article className="grid min-h-[210px] grid-cols-[112px_1fr] gap-5 rounded-[18px] bg-black p-4">
      {movie.posterUrl ? (
        <VhsPoster
          src={movie.posterUrl}
          alt={movie.displayTitle}
          className="aspect-[2/3] w-full rounded-[8px]"
          imageClassName="object-cover"
        />
      ) : (
        <div className="grid aspect-[2/3] w-full place-items-center rounded-[8px] bg-[#111] text-[#6f6c7a]">
          <Film className="h-6 w-6" aria-hidden />
        </div>
      )}

      <div className="flex min-w-0 flex-col">
        <h3 className="archive-anton text-3xl uppercase leading-none text-[#e9e3d4]">
          {movie.displayTitle}
        </h3>
        {movie.titlePt && movie.titlePt !== movie.displayTitle && (
          <p className="mt-2 font-sans text-sm text-[#e9e3d4]/75">
            {movie.titlePt}
          </p>
        )}
        <p className="mt-4 font-sans text-sm text-[#6f6c7a]">
          {formatMissing(movie.year)}
          {movie.director ? ` • ${movie.director}` : ""}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={index === 0}
              onClick={onMoveUp}
              aria-label={`Move ${movie.displayTitle} up`}
            >
              <ChevronUp className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={index === total - 1}
              onClick={onMoveDown}
              aria-label={`Move ${movie.displayTitle} down`}
            >
              <ChevronDown className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={onRemove}
            aria-label={`Remove ${movie.displayTitle} from list`}
          >
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function WatchlistPage() {
  const libraryMovies = useMovieStore((store) => store.movies);
  const replaceLists = useMovieStore((store) => store.replaceLists);
  const [lists, setLists] = useState<CustomMovieList[]>([]);
  const [isLoadingLists, setIsLoadingLists] = useState(true);
  const [listError, setListError] = useState("");
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [listModal, setListModal] = useState<ListModalState>(null);
  const [isAddMoviesOpen, setIsAddMoviesOpen] = useState(false);

  const syncLists = useCallback(
    (nextLists: CustomMovieList[]) => {
      setLists(nextLists);
      replaceLists(nextLists);
    },
    [replaceLists]
  );

  const upsertList = useCallback((list: CustomMovieList) => {
    const nextLists = lists.some((current) => current.id === list.id)
      ? lists.map((current) => (current.id === list.id ? list : current))
      : [list, ...lists];
    syncLists(nextLists);
  }, [lists, syncLists]);

  useEffect(() => {
    let cancelled = false;

    async function loadLists() {
      setIsLoadingLists(true);
      setListError("");

      try {
        const migrated =
          window.localStorage.getItem(WATCHLIST_DB_MIGRATION_FLAG) === "true";
        const nextLists = migrated
          ? await requestWatchlists()
          : await requestWatchlistMigration();

        if (cancelled) return;
        syncLists(nextLists);
      } catch {
        if (!cancelled) {
          setListError("Unable to load watchlists from the database.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingLists(false);
        }
      }
    }

    loadLists();

    return () => {
      cancelled = true;
    };
  }, [syncLists]);

  const selectedList = selectedListId
    ? lists.find((list) => list.id === selectedListId) ?? null
    : null;

  const handleSaveList = async (
    state: Exclude<ListModalState, null>,
    name: string
  ) => {
    const response = await fetch(
      state.mode === "create"
        ? "/api/watchlists"
        : `/api/watchlists/${state.list.id}`,
      {
        method: state.mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }
    );
    const data = (await response.json()) as
      | { ok: true; list: PersistedWatchlist }
      | { ok: false; error: string };

    if (!response.ok || !data.ok) {
      throw new Error(data.ok === false ? data.error : "Failed to save list.");
    }

    upsertList(data.list as CustomMovieList);
    setListModal(null);
  };

  const handleDeleteList = async (list: CustomMovieList) => {
    if (!window.confirm(`Delete "${list.name}"? Movies will stay untouched.`)) {
      return;
    }

    const response = await fetch(`/api/watchlists/${list.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setListError("Unable to delete watchlist.");
      return;
    }

    syncLists(lists.filter((current) => current.id !== list.id));
    if (selectedListId === list.id) {
      setSelectedListId(null);
    }
  };

  const handleAddMovieToList = async (
    listId: string,
    movie: WatchlistMovie
  ) => {
    const response = await fetch(`/api/watchlists/${listId}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie: toWatchlistItemInput(movie) }),
    });
    const data = (await response.json()) as
      | { ok: true; list: PersistedWatchlist }
      | { ok: false; error: string };

    if (!response.ok || !data.ok) {
      throw new Error(data.ok === false ? data.error : "Failed to add movie.");
    }

    upsertList(data.list as CustomMovieList);
  };

  const handleRemoveMovieFromList = async (listId: string, movieId: string) => {
    const response = await fetch(`/api/watchlists/${listId}/movies/${movieId}`, {
      method: "DELETE",
    });
    const data = (await response.json()) as
      | { ok: true; list: PersistedWatchlist }
      | { ok: false; error: string };

    if (!response.ok || !data.ok) {
      setListError("Unable to remove movie from watchlist.");
      return;
    }

    upsertList(data.list as CustomMovieList);
  };

  const handleMoveMovieInList = async (
    listId: string,
    movieId: string,
    direction: "up" | "down"
  ) => {
    const response = await fetch(`/api/watchlists/${listId}/movies/reorder`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId, direction }),
    });
    const data = (await response.json()) as
      | { ok: true; list: PersistedWatchlist }
      | { ok: false; error: string };

    if (!response.ok || !data.ok) {
      setListError("Unable to reorder watchlist.");
      return;
    }

    upsertList(data.list as CustomMovieList);
  };

  return (
    <div className="flex w-full flex-col gap-8 pb-12 text-[#e9e3d4]">
      {!selectedList ? (
        <>
          <header className="shrink-0 bg-[#0b0b0b]">
            <div
              className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-[24px] bg-cover bg-center px-6"
              style={{ backgroundImage: "url('/images/lists.png')" }}
            >
              <div className="absolute inset-0 bg-black/60" aria-hidden />
              <h1 className="relative z-10 archive-display-title text-center text-[4.75rem] md:text-[7rem] xl:text-[7.45rem]">
                My Lists
              </h1>
              <div className="absolute bottom-9 right-9 z-10 flex items-center gap-2 rounded-full bg-black/20 p-2 backdrop-blur-md">
                <Button
                  type="button"
                  className="rounded-full"
                  onClick={() => setListModal({ mode: "create" })}
                >
                <Plus className="h-4 w-4" aria-hidden />
                Create List
                </Button>
              </div>
            </div>
          </header>

          {listError && (
            <section className="mx-auto w-full max-w-[1440px] rounded-[18px] bg-black px-6 py-4 font-sans text-sm text-[#e9e3d4] md:px-8">
              {listError}
            </section>
          )}

          {isLoadingLists ? (
            <section className="mx-auto grid min-h-[260px] w-full max-w-[1440px] place-items-center rounded-[24px] bg-black px-6 text-center md:px-8">
              <p className="font-sans text-sm text-[#6f6c7a]">
                Loading lists...
              </p>
            </section>
          ) : lists.length > 0 ? (
            <section className="mx-auto grid w-full max-w-[1440px] gap-6 px-4 md:px-8 lg:grid-cols-2">
              {lists.map((list) => (
                <button
                  key={list.id}
                  type="button"
                  onClick={() => setSelectedListId(list.id)}
                  className="group rounded-[24px] bg-black p-6 text-left transition-transform duration-200 hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B63E]"
                >
                  <h2 className="archive-anton text-5xl uppercase leading-none text-[#e9e3d4]">
                    {list.name}
                  </h2>
                  <p className="mt-3 font-sans text-sm font-bold text-[#6f6c7a]">
                    {list.movies.length}{" "}
                    {list.movies.length === 1 ? "movie" : "movies"}
                  </p>
                  <div className="mt-7">
                    <ListPosterPreview movies={list.movies} />
                  </div>
                </button>
              ))}
            </section>
          ) : (
            <section className="mx-auto grid min-h-[420px] w-full max-w-[1440px] place-items-center rounded-[24px] bg-black px-6 text-center md:px-8">
              <div>
                <Film className="mx-auto h-10 w-10 text-[#6f6c7a]" aria-hidden />
                <h2 className="archive-anton mt-5 text-4xl uppercase leading-none text-[#e9e3d4]">
                  No lists yet
                </h2>
                <p className="mt-3 font-sans text-sm text-[#6f6c7a]">
                  Create a list for the movies you want to watch next.
                </p>
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          <header className="mx-auto flex w-full max-w-[1440px] flex-wrap items-end justify-between gap-4 px-4 md:px-8">
            <div className="min-w-0">
              <Button
                type="button"
                variant="ghost"
                className="mb-5 px-0"
                onClick={() => setSelectedListId(null)}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                My Lists
              </Button>
              <p className="font-sans text-sm font-medium text-[#E0B63E]">
                {selectedList.movies.length}{" "}
                {selectedList.movies.length === 1 ? "movie" : "movies"}
              </p>
              <h1 className="archive-anton mt-3 text-6xl uppercase leading-none text-[#e9e3d4]">
                {selectedList.name}
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={() => setIsAddMoviesOpen(true)}>
                <Plus className="h-4 w-4" aria-hidden />
                Add Movies
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setListModal({ mode: "edit", list: selectedList })}
              >
                <Edit3 className="h-4 w-4" aria-hidden />
                Edit List
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleDeleteList(selectedList)}
              >
                <Trash2 className="h-4 w-4" aria-hidden />
                Delete List
              </Button>
            </div>
          </header>

          {selectedList.movies.length > 0 ? (
            <section className="mx-auto grid w-full max-w-[1440px] gap-4 px-4 md:px-8 lg:grid-cols-3">
              {selectedList.movies.map((movie, index) => (
                <WatchlistMovieCard
                  key={movie.id}
                  movie={movie}
                  index={index}
                  total={selectedList.movies.length}
                  onRemove={() =>
                    handleRemoveMovieFromList(selectedList.id, movie.id)
                  }
                  onMoveUp={() =>
                    handleMoveMovieInList(selectedList.id, movie.id, "up")
                  }
                  onMoveDown={() =>
                    handleMoveMovieInList(selectedList.id, movie.id, "down")
                  }
                />
              ))}
            </section>
          ) : (
            <section className="mx-auto grid min-h-[380px] w-full max-w-[1440px] place-items-center rounded-[24px] bg-black px-6 text-center md:px-8">
              <div>
                <Film className="mx-auto h-10 w-10 text-[#6f6c7a]" aria-hidden />
                <h2 className="archive-anton mt-5 text-4xl uppercase leading-none text-[#e9e3d4]">
                  This list is empty
                </h2>
                <p className="mt-3 font-sans text-sm text-[#6f6c7a]">
                  Search for any movie and add it here before watching.
                </p>
              </div>
            </section>
          )}
        </>
      )}

      <ListFormModal
        state={listModal}
        onClose={() => setListModal(null)}
        onSave={handleSaveList}
      />

      {selectedList && isAddMoviesOpen && (
        <AddMoviesModal
          list={selectedList}
          libraryMovies={libraryMovies}
          onClose={() => setIsAddMoviesOpen(false)}
          onAddMovie={handleAddMovieToList}
        />
      )}
    </div>
  );
}
