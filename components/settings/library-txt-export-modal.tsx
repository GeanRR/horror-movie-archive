"use client";

import { useMemo, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMovieStore, type LibraryMovie } from "@/store/movie-store";

type ExportField = {
  id: string;
  label: string;
  getValue: (movie: LibraryMovie) => string;
};

type LibraryTxtExportModalProps = {
  onClose: () => void;
};

const EXPORT_FIELDS: ExportField[] = [
  { id: "year", label: "Year", getValue: (movie) => movie.year },
  {
    id: "displayTitle",
    label: "Title",
    getValue: (movie) => movie.displayTitle,
  },
  {
    id: "originalTitle",
    label: "Original title",
    getValue: (movie) => movie.originalTitle,
  },
  { id: "titlePt", label: "Title PT", getValue: (movie) => movie.titlePt },
  { id: "director", label: "Director", getValue: (movie) => movie.director },
  { id: "country", label: "Country", getValue: (movie) => movie.country },
  {
    id: "distributor",
    label: "Distributor",
    getValue: (movie) => movie.distributor,
  },
  {
    id: "subgenre",
    label: "Subgenre",
    getValue: (movie) => movie.subgenres[0] ?? "",
  },
  {
    id: "runtime",
    label: "Runtime",
    getValue: (movie) => (movie.runtime ? `${movie.runtime} min` : ""),
  },
  {
    id: "reviewScore",
    label: "Personal score",
    getValue: (movie) =>
      typeof movie.reviewScore === "number" ? String(movie.reviewScore) : "",
  },
  {
    id: "watchedDate",
    label: "Watched date",
    getValue: (movie) => movie.watchedDate,
  },
  { id: "imdbId", label: "IMDb ID", getValue: (movie) => movie.imdbId ?? "" },
  { id: "tmdbId", label: "TMDB ID", getValue: (movie) => String(movie.tmdbId) },
];

const DEFAULT_FIELD_IDS = ["year", "originalTitle", "distributor"];

function cleanExportValue(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function buildExportText(movies: LibraryMovie[], fields: ExportField[]) {
  const sortedMovies = [...movies].sort(
    (a, b) =>
      a.year.localeCompare(b.year, undefined, { numeric: true }) ||
      a.originalTitle.localeCompare(b.originalTitle, undefined, {
        sensitivity: "base",
      })
  );

  return sortedMovies
    .map((movie) =>
      fields
        .map((field) => cleanExportValue(field.getValue(movie)))
        .join(", ")
    )
    .join("\n");
}

function downloadTextFile(text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "horror-movie-library.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export function LibraryTxtExportModal({ onClose }: LibraryTxtExportModalProps) {
  const movies = useMovieStore((state) => state.movies);
  const [selectedFieldIds, setSelectedFieldIds] =
    useState<string[]>(DEFAULT_FIELD_IDS);

  const selectedFields = useMemo(
    () =>
      EXPORT_FIELDS.filter((field) => selectedFieldIds.includes(field.id)),
    [selectedFieldIds]
  );

  const previewText = useMemo(
    () => buildExportText(movies.slice(0, 3), selectedFields),
    [movies, selectedFields]
  );

  const handleToggleField = (fieldId: string) => {
    setSelectedFieldIds((current) =>
      current.includes(fieldId)
        ? current.filter((id) => id !== fieldId)
        : [...current, fieldId]
    );
  };

  const handleExport = () => {
    if (selectedFields.length === 0) return;
    downloadTextFile(buildExportText(movies, selectedFields));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[24px] bg-black p-8 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 font-sans text-sm text-[#e0b63e]">
              Export Library
            </p>
            <h2 className="archive-display-title text-5xl text-[#e9e3d4]">
              TXT Export
            </h2>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#e9e3d4] transition-colors hover:bg-[#111]"
            onClick={onClose}
            aria-label="Close export modal"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {EXPORT_FIELDS.map((field) => (
            <label
              key={field.id}
              className="flex cursor-pointer items-center gap-3 rounded-full bg-[#080808] px-4 py-3 font-sans text-sm text-[#e9e3d4] transition-colors hover:bg-[#111]"
            >
              <input
                type="checkbox"
                checked={selectedFieldIds.includes(field.id)}
                onChange={() => handleToggleField(field.id)}
                className="h-4 w-4 accent-[#e0b63e]"
              />
              {field.label}
            </label>
          ))}
        </div>

        <div className="mt-6 rounded-[14px] bg-[#080808] p-4">
          <p className="mb-3 font-sans text-sm text-[#6f6c7a]">
            Preview
          </p>
          <pre className="archive-scrollbar max-h-36 overflow-auto whitespace-pre-wrap font-sans text-sm leading-6 text-[#e9e3d4]">
            {previewText || "Select at least one field to preview the export."}
          </pre>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleExport}
            disabled={selectedFields.length === 0 || movies.length === 0}
            className="gap-2"
          >
            <Download className="h-4 w-4" aria-hidden />
            Export TXT
          </Button>
        </div>
      </div>
    </div>
  );
}
