"use client";

import { useEffect } from "react";
import { useMovieStore } from "@/store";

export function DatabaseBootstrap() {
  const loadMovies = useMovieStore((state) => state.loadMovies);

  useEffect(() => {
    void loadMovies();
  }, [loadMovies]);

  return null;
}
