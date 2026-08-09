"use client";

import { useState, useCallback, useRef } from "react";
import { parseCsvFile } from "@/lib/import/parse-csv";
import { searchTmdb, determineConfidence } from "@/lib/import/search-tmdb";
import { importSingleMovie, findDuplicate } from "@/lib/import/import-movie";
import { useMovieStore } from "@/store/movie-store";
import type { ImportRow, ImportPhase, ImportStats, DuplicateAction, TmdbSearchMatch } from "@/types/import";

const BATCH_SIZE = 5;

export function useCsvImport() {
  const movies = useMovieStore((s) => s.movies);

  const [phase, setPhase] = useState<ImportPhase>("idle");
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [stats, setStats] = useState<ImportStats>({ total: 0, highConfidence: 0, needsReview: 0, failed: 0, imported: 0, skipped: 0 });
  const [importProgress, setImportProgress] = useState({ current: 0, total: 0 });
  const [duplicateAction, setDuplicateAction] = useState<DuplicateAction>("skip");
  const [csvFileName, setCsvFileName] = useState("");
  const abortRef = useRef(false);

  const reset = useCallback(() => {
    abortRef.current = true;
    setPhase("idle");
    setRows([]);
    setStats({ total: 0, highConfidence: 0, needsReview: 0, failed: 0, imported: 0, skipped: 0 });
    setImportProgress({ current: 0, total: 0 });
    setDuplicateAction("skip");
    setCsvFileName("");
  }, []);

  const handleFile = useCallback(async (file: File) => {
    abortRef.current = false;
    setCsvFileName(file.name);
    setPhase("parsing");

    const result = await parseCsvFile(file);
    if (!result.ok) {
      setPhase("idle");
      return;
    }

    const csvRows = result.rows;
    const importRows: ImportRow[] = [];
    const newStats: ImportStats = { total: csvRows.length, highConfidence: 0, needsReview: 0, failed: 0, imported: 0, skipped: 0 };

    for (let i = 0; i < csvRows.length; i++) {
      const csv = csvRows[i];
      const searchResult = await searchTmdb(csv.title, csv.year);
      let confidence: "high" | "ambiguous" | "failed" = "failed";
      let matches: TmdbSearchMatch[] = [];

      if (searchResult.ok) {
        const result = determineConfidence(searchResult.results, csv.year, csv.title);
        confidence = result.confidence;
        matches = result.matches;
      }

      if (confidence === "high") newStats.highConfidence++;
      else if (confidence === "ambiguous") newStats.needsReview++;
      else newStats.failed++;

      importRows.push({
        index: i,
        csv,
        status: "pending",
        confidence,
        matches,
        selectedMatch: confidence === "high" ? matches[0] ?? null : null,
      });
    }

    setRows(importRows);
    setStats(newStats);
    setPhase("preview");
  }, []);

  const startImport = useCallback(async () => {
    if (phase !== "preview") return;

    abortRef.current = false;
    setPhase("importing");
    setImportProgress({ current: 0, total: rows.length });

    const updatedRows = [...rows];
    const newStats = { ...stats, imported: 0, skipped: 0 };

    const toImport = updatedRows.filter(
      (r) => r.confidence === "high" && r.selectedMatch
    );
    const totalToImport = toImport.length + updatedRows.filter((r) => r.confidence === "ambiguous").length;
    let completed = 0;

    for (let i = 0; i < toImport.length; i += BATCH_SIZE) {
      if (abortRef.current) break;

      const batch = toImport.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batch.map(async (row) => {
          const match = row.selectedMatch!;
          const isDuplicate = findDuplicate(
            match.tmdbId,
            match.title,
            match.year,
            movies
          );

          if (isDuplicate && duplicateAction === "skip") {
            const idx = updatedRows.findIndex((r) => r.index === row.index);
            if (idx !== -1) {
              updatedRows[idx] = { ...updatedRows[idx], status: "skipped-duplicate", duplicateOf: isDuplicate.displayTitle };
            }
            return "skipped" as const;
          }

          const result = await importSingleMovie(row.csv, match.tmdbId, {
            allowDuplicate: duplicateAction === "add-anyway" || duplicateAction === "replace",
            posterPath: match.posterPath,
          });

          const idx = updatedRows.findIndex((r) => r.index === row.index);
          if (idx !== -1) {
            if (result.ok) {
              if (result.skipped) {
                updatedRows[idx] = { ...updatedRows[idx], status: "skipped-duplicate", duplicateOf: result.reason };
              } else {
                updatedRows[idx] = { ...updatedRows[idx], status: "imported" };
              }
            } else {
              updatedRows[idx] = { ...updatedRows[idx], status: "failed", error: result.error };
            }
          }

          return result.ok && !result.skipped ? "imported" : "skipped";
        })
      );

      for (const r of batchResults) {
        if (r === "imported") newStats.imported++;
        else newStats.skipped++;
      }

      completed += batch.length;
      setImportProgress({ current: completed, total: totalToImport });
      setRows([...updatedRows]);
      setStats({ ...newStats });
    }

    const needsReview = updatedRows.filter((r) => r.confidence === "ambiguous" && r.status === "pending");
    if (needsReview.length > 0) {
      setPhase("review");
    } else {
      setPhase("done");
    }

    setRows(updatedRows);
    setStats({ ...newStats, needsReview: updatedRows.filter((r) => r.status === "pending" && r.confidence === "ambiguous").length });
  }, [phase, rows, stats, duplicateAction, movies]);

  const retryRow = useCallback(async (rowIndex: number, tmdbId: number) => {
    const idx = rows.findIndex((r) => r.index === rowIndex);
    if (idx === -1) return;

    const row = rows[idx];
    const match = row.matches.find((m) => m.tmdbId === tmdbId);
    const result = await importSingleMovie(row.csv, tmdbId, {
      allowDuplicate: duplicateAction === "add-anyway",
      posterPath: match?.posterPath,
    });

    const updatedRows = [...rows];
    const newStats = { ...stats };

    if (result.ok) {
      if (result.skipped) {
        updatedRows[idx] = { ...updatedRows[idx], status: "skipped-duplicate", duplicateOf: result.reason, selectedMatch: { tmdbId, title: "", year: "", posterPath: null } };
        newStats.skipped++;
      } else {
        updatedRows[idx] = { ...updatedRows[idx], status: "imported", selectedMatch: { tmdbId, title: result.movie.title, year: "", posterPath: null } };
        newStats.imported++;
        newStats.needsReview = Math.max(0, newStats.needsReview - 1);
      }
    } else {
      updatedRows[idx] = { ...updatedRows[idx], status: "failed", error: result.error, selectedMatch: { tmdbId, title: "", year: "", posterPath: null } };
      newStats.failed++;
    }

    setRows(updatedRows);
    setStats(newStats);

    const remainingPending = updatedRows.filter((r) => r.status === "pending" && r.confidence === "ambiguous");
    if (remainingPending.length === 0) {
      setPhase("done");
    }
  }, [rows, stats, duplicateAction]);

  const skipReviewRow = useCallback((rowIndex: number) => {
    const idx = rows.findIndex((r) => r.index === rowIndex);
    if (idx === -1) return;

    const updatedRows = [...rows];
    updatedRows[idx] = { ...updatedRows[idx], status: "failed", error: "Skipped in review" };

    const newStats = { ...stats, failed: stats.failed + 1, needsReview: Math.max(0, stats.needsReview - 1) };
    setRows(updatedRows);
    setStats(newStats);

    const remainingPending = updatedRows.filter((r) => r.status === "pending" && r.confidence === "ambiguous");
    if (remainingPending.length === 0) {
      setPhase("done");
    }
  }, [rows, stats]);

  const retryFailed = useCallback(async () => {
    const failedRows = rows.filter((r) => r.status === "failed");
    if (failedRows.length === 0) return;

    const updatedRows = [...rows];
    const newStats = { ...stats };

    for (const row of failedRows) {
      if (abortRef.current) break;

      const searchResult = await searchTmdb(row.csv.title, row.csv.year);
      if (!searchResult.ok) continue;

      const { confidence, matches } = determineConfidence(searchResult.results, row.csv.year, row.csv.title);

      if (confidence === "high" && matches[0]) {
        const result = await importSingleMovie(row.csv, matches[0].tmdbId, {
          allowDuplicate: duplicateAction === "add-anyway",
          posterPath: matches[0].posterPath,
        });

        const idx = updatedRows.findIndex((r) => r.index === row.index);
        if (idx !== -1) {
          if (result.ok) {
            if (result.skipped) {
              updatedRows[idx] = { ...updatedRows[idx], status: "skipped-duplicate", duplicateOf: result.reason, error: undefined };
              newStats.skipped++;
            } else {
              updatedRows[idx] = { ...updatedRows[idx], status: "imported", error: undefined };
              newStats.imported++;
            }
            newStats.failed = Math.max(0, newStats.failed - 1);
          } else {
            updatedRows[idx] = { ...updatedRows[idx], error: result.error };
          }
        }
      } else if (confidence === "ambiguous") {
        const idx = updatedRows.findIndex((r) => r.index === row.index);
        if (idx !== -1) {
          updatedRows[idx] = { ...updatedRows[idx], status: "pending", confidence: "ambiguous", matches, selectedMatch: null, error: undefined };
          newStats.needsReview++;
          newStats.failed = Math.max(0, newStats.failed - 1);
        }
      }
    }

    setRows(updatedRows);
    setStats(newStats);

    const pendingReview = updatedRows.filter((r) => r.status === "pending" && r.confidence === "ambiguous");
    if (pendingReview.length > 0) {
      setPhase("review");
    } else {
      const stillFailed = updatedRows.filter((r) => r.status === "failed");
      if (stillFailed.length === 0) {
        setPhase("done");
      }
    }
  }, [rows, stats, duplicateAction]);

  return {
    phase,
    rows,
    stats,
    importProgress,
    duplicateAction,
    csvFileName,
    setDuplicateAction,
    handleFile,
    startImport,
    retryRow,
    skipReviewRow,
    retryFailed,
    reset,
  };
}
