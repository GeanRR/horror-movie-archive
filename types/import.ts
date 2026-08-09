export type CsvRow = {
  title: string;
  reviewScore: number | null;
  year: number | null;
};

export type ImportRowStatus =
  | "pending"
  | "searching"
  | "importing"
  | "imported"
  | "needs-review"
  | "failed"
  | "skipped-duplicate";

export type TmdbSearchMatch = {
  tmdbId: number;
  title: string;
  originalTitle?: string;
  year: string;
  posterPath: string | null;
};

export type ImportRow = {
  index: number;
  csv: CsvRow;
  status: ImportRowStatus;
  confidence: "high" | "ambiguous" | "failed";
  matches: TmdbSearchMatch[];
  selectedMatch: TmdbSearchMatch | null;
  error?: string;
  duplicateOf?: string;
};

export type ImportPhase =
  | "idle"
  | "parsing"
  | "preview"
  | "importing"
  | "review"
  | "done";

export type ImportStats = {
  total: number;
  highConfidence: number;
  needsReview: number;
  failed: number;
  imported: number;
  skipped: number;
};

export type DuplicateAction = "skip" | "replace" | "add-anyway";

export type ImportOptions = {
  duplicateAction: DuplicateAction;
};
