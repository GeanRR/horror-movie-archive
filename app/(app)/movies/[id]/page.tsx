"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { MovieDetailsModal } from "@/components/movie/movie-details-modal";
import { useMovieStore } from "@/store/movie-store";

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
  const routeId = Array.isArray(params.id) ? params.id[0] : params.id;
  const numericRouteId = Number(routeId);

  const movie = useMovieStore((state) =>
    state.movies.find(
      (m) =>
        m.id === routeId ||
        (Number.isFinite(numericRouteId) && m.tmdbId === numericRouteId)
    )
  );

  if (!movie) {
    notFound();
  }

  return <MovieDetailsModal movie={movie} onClose={() => router.back()} />;
}
