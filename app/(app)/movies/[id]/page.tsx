"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useMovieStore } from "@/store/movie-store";

export default function MoviePage() {
  const params = useParams();
  const movieId = Number(params.id);

  const movie = useMovieStore((state) =>
    state.movies.find((m) => m.tmdbId === movieId)
  );

  if (!movie) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-8">
      <div className="flex gap-8">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.displayTitle}
            className="w-64 rounded-lg border border-border object-cover"
          />
        ) : (
          <div className="flex h-96 w-64 items-center justify-center rounded-lg border border-border">
            No Poster
          </div>
        )}

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{movie.displayTitle}</h1>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Original Title:</strong> {movie.originalTitle}
            </p>

            <p>
              <strong>Portuguese Title:</strong> {movie.titlePt}
            </p>

            <p>
              <strong>Year:</strong> {movie.year}
            </p>

            <p>
              <strong>Director:</strong> {movie.director}
            </p>

            <p>
              <strong>Review Score:</strong> {movie.reviewScore || "-"}
            </p>

            <p>
              <strong>Best of Year:</strong>{" "}
              {movie.bestOfYear ? "Yes" : "No"}
            </p>

            <p>
              <strong>Watched Date:</strong>{" "}
              {movie.watchedDate || "-"}
            </p>

            <p>
              <strong>TMDB ID:</strong> {movie.tmdbId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}