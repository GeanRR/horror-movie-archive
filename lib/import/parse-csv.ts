import Papa from "papaparse";
import type { CsvRow } from "@/types/import";

export type ParseCsvResult = {
  ok: true;
  rows: CsvRow[];
} | {
  ok: false;
  error: string;
};

export function parseCsvFile(file: File): Promise<ParseCsvResult> {
  return new Promise((resolve) => {
    Papa.parse<string[]>(file, {
      complete(results) {
        if (results.errors.length > 0) {
          resolve({ ok: false, error: results.errors[0].message });
          return;
        }

        const rows: CsvRow[] = [];
        let headerSkipped = false;

        for (const raw of results.data) {
          if (!Array.isArray(raw) || raw.length < 3) continue;

          if (!headerSkipped) {
            const first = raw[0]?.toString().toLowerCase().trim() ?? "";
            if (first === "title") {
              headerSkipped = true;
              continue;
            }
          }

          const title = (raw[0] ?? "").toString().trim();
          const reviewScoreRaw = (raw[1] ?? "").toString().trim();
          const yearRaw = (raw[2] ?? "").toString().trim();

          if (!title) continue;

          const reviewScore = reviewScoreRaw
            ? parseFloat(reviewScoreRaw)
            : null;
          const year = yearRaw ? parseInt(yearRaw, 10) : null;

          rows.push({ title, reviewScore: isValidScore(reviewScore) ? reviewScore : null, year: isValidYear(year) ? year : null });
        }

        if (rows.length === 0) {
          resolve({ ok: false, error: "No valid rows found in CSV." });
          return;
        }

        resolve({ ok: true, rows });
      },
      error(error) {
        resolve({ ok: false, error: error.message });
      },
    });
  });
}

function isValidScore(value: number | null): value is number {
  return value !== null && !isNaN(value) && value >= 1 && value <= 10;
}

function isValidYear(value: number | null): value is number {
  return value !== null && !isNaN(value) && value >= 1888 && value <= 2100;
}
