import type { TmdbSearchResponse } from "@/types/tmdb";
import type { TmdbSearchMatch } from "@/types/import";

function normalizeTitle(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export async function searchTmdb(
  title: string,
  year: number | null,
  signal?: AbortSignal
): Promise<{ ok: true; results: TmdbSearchMatch[] } | { ok: false; error: string }> {
  try {
    const params = new URLSearchParams({ q: title });
    const response = await fetch(`/api/tmdb/search?${params.toString()}`, { signal });
    const data = (await response.json()) as TmdbSearchResponse;

    if (!response.ok || !data.ok) {
      return { ok: false, error: data.ok === false ? data.error : "Search failed." };
    }

    const results: TmdbSearchMatch[] = data.results.map((r) => ({
      tmdbId: r.tmdbId,
      title: r.title,
      originalTitle: r.originalTitle,
      year: r.releaseYear,
      posterPath: r.posterPath,
    }));

    return { ok: true, results };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, error: "aborted" };
    }
    return { ok: false, error: "Search failed." };
  }
}

export function determineConfidence(
  results: TmdbSearchMatch[],
  year: number | null,
  csvTitle: string
): {
  confidence: "high" | "ambiguous" | "failed";
  matches: TmdbSearchMatch[];
} {
  if (results.length === 0) {
    return { confidence: "failed", matches: [] };
  }

  const normalizedCsv = normalizeTitle(csvTitle);

  const titleVariants = (result: TmdbSearchMatch) =>
    [result.title, result.originalTitle]
      .filter((value): value is string => Boolean(value?.trim()))
      .map(normalizeTitle);

  const hasExactTitle = (result: TmdbSearchMatch) =>
    titleVariants(result).includes(normalizedCsv);

  const hasCompatibleTitle = (result: TmdbSearchMatch) => {
    if (hasExactTitle(result)) return true;

    if (normalizedCsv.length < 4) return false;

    return titleVariants(result).some((title) => {
      if (title.length < 4) return false;
      return title.includes(normalizedCsv) || normalizedCsv.includes(title);
    });
  };

  const hasYear = (result: TmdbSearchMatch) => parseInt(result.year, 10) === year;

  const uniqueTopMatches = (matches: TmdbSearchMatch[]) => {
    const seen = new Set<number>();
    return matches
      .filter((match) => {
        if (seen.has(match.tmdbId)) return false;
        seen.add(match.tmdbId);
        return true;
      })
      .slice(0, 5);
  };

  const exactTitleMatches = results.filter(hasExactTitle);
  const compatibleTitleMatches = results.filter(hasCompatibleTitle);

  if (!year) {
    if (exactTitleMatches.length === 1) {
      return { confidence: "high", matches: [exactTitleMatches[0]] };
    }

    if (compatibleTitleMatches.length === 1) {
      return { confidence: "high", matches: [compatibleTitleMatches[0]] };
    }

    return {
      confidence: "ambiguous",
      matches: uniqueTopMatches(
        compatibleTitleMatches.length > 0 ? compatibleTitleMatches : results
      ),
    };
  }

  const exactTitleYearMatches = exactTitleMatches.filter(hasYear);

  if (exactTitleYearMatches.length === 1) {
    return { confidence: "high", matches: [exactTitleYearMatches[0]] };
  }

  if (exactTitleYearMatches.length > 1) {
    return {
      confidence: "ambiguous",
      matches: uniqueTopMatches(exactTitleYearMatches),
    };
  }

  const compatibleTitleYearMatches = compatibleTitleMatches.filter(hasYear);

  if (compatibleTitleYearMatches.length === 1) {
    return { confidence: "high", matches: [compatibleTitleYearMatches[0]] };
  }

  if (compatibleTitleYearMatches.length > 1) {
    return {
      confidence: "ambiguous",
      matches: uniqueTopMatches(compatibleTitleYearMatches),
    };
  }

  const sameYearMatches = results.filter(hasYear);

  return {
    confidence: "ambiguous",
    matches: uniqueTopMatches(
      sameYearMatches.length > 0
        ? sameYearMatches
        : compatibleTitleMatches.length > 0
          ? compatibleTitleMatches
          : results
    ),
  };
}
