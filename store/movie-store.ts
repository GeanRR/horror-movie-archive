import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LibraryMovie = {
  tmdbId: number;
  displayTitle: string;
  originalTitle: string;
  titlePt: string;
  year: string;
  director: string;
  posterUrl?: string;
  reviewScore: string;
  bestOfYear: boolean;
  watchedDate: string;
};

type MovieState = {
  movies: LibraryMovie[];
  addMovie: (movie: LibraryMovie) => void;
  removeMovie: (tmdbId: number) => void;
};

export const useMovieStore = create<MovieState>()(
  persist(
    (set) => ({
      movies: [],

      addMovie: (movie) =>
        set((state) => ({
          movies: [
            movie,
            ...state.movies.filter((m) => m.tmdbId !== movie.tmdbId),
          ],
        })),

      removeMovie: (tmdbId) =>
        set((state) => ({
          movies: state.movies.filter((m) => m.tmdbId !== tmdbId),
        })),
    }),
    {
      name: "hma-movies",
    }
  )
);