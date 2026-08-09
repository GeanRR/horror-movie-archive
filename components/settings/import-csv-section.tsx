"use client";

import { useState, useRef } from "react";
import { useCsvImport } from "@/lib/import/use-csv-import";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Loader2, AlertCircle, CheckCircle2, XCircle, ChevronRight, RotateCcw, SkipForward } from "lucide-react";
import type { TmdbSearchMatch } from "@/types/import";

export function ImportCsvSection() {
 const [isOpen, setIsOpen] = useState(false);
 const fileInputRef = useRef<HTMLInputElement>(null);

 if (!isOpen) {
 return (
 <div className="space-y-2">
 <Label>Import CSV</Label>
 <p className="text-xs text-muted-foreground">
 Import movies from a CSV spreadsheet.
 </p>
 <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
 Import CSV
 </Button>
 </div>
 );
 }

 return (
 <div className="space-y-3 rounded-lg border border-border/50 bg-card/30 p-4">
 <div className="flex items-center justify-between">
 <Label>Import CSV</Label>
 <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
 Close
 </Button>
 </div>
 <ImportFlow
 onClose={() => setIsOpen(false)}
 fileInputRef={fileInputRef}
 />
 </div>
 );
}

function ImportFlow({
 onClose,
 fileInputRef,
}: {
 onClose: () => void;
 fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
 const {
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
 } = useCsvImport();

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (file) handleFile(file);
 };

 if (phase === "idle") {
 return (
 <div className="space-y-3">
 <p className="text-xs text-muted-foreground">
 Upload a CSV file with columns: title, review_score, year, watched_date.
 </p>
 <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border/60 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
 <Search className="h-4 w-4" />
 Choose CSV file
 <input
 ref={fileInputRef}
 type="file"
 accept=".csv"
 className="hidden"
 onChange={handleFileChange}
 />
 </label>
 <div className="flex items-center gap-2">
 <Label className="archive-input-label">Duplicates:</Label>
 <select
 value={duplicateAction}
 onChange={(e) => setDuplicateAction(e.target.value as "skip" | "replace" | "add-anyway")}
 className="archive-select !h-9 !w-auto min-w-36 text-xs"
 >
 <option value="skip">Skip</option>
 <option value="replace">Replace Existing</option>
 <option value="add-anyway">Add Anyway</option>
 </select>
 </div>
 </div>
 );
 }

 if (phase === "parsing") {
 return (
 <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
 <Loader2 className="h-4 w-4 animate-spin" />
 Parsing CSV...
 </div>
 );
 }

 if (phase === "preview") {
 return (
 <div className="space-y-3">
 <p className="text-xs text-muted-foreground">
 File: <span className="font-medium text-foreground">{csvFileName}</span>
 </p>
 <div className="grid grid-cols-2 gap-2 text-sm">
 <div className="rounded-md bg-card/40 px-3 py-2">
 <span className="text-muted-foreground">Total rows</span>
 <p className="text-lg font-semibold">{stats.total}</p>
 </div>
 <div className="rounded-md bg-card/40 px-3 py-2">
 <span className="text-muted-foreground">High confidence</span>
 <p className="text-lg font-semibold text-green-400">{stats.highConfidence}</p>
 </div>
 <div className="rounded-md bg-card/40 px-3 py-2">
 <span className="text-muted-foreground">Requires review</span>
 <p className="text-lg font-semibold text-amber-400">{stats.needsReview}</p>
 </div>
 <div className="rounded-md bg-card/40 px-3 py-2">
 <span className="text-muted-foreground">Failed</span>
 <p className="text-lg font-semibold text-red-400">{stats.failed}</p>
 </div>
 </div>
 <div className="flex gap-2">
 <Button size="sm" onClick={startImport}>
 Start Import
 </Button>
 <Button variant="outline" size="sm" onClick={onClose}>
 Cancel
 </Button>
 </div>
 </div>
 );
 }

 if (phase === "importing") {
 return (
 <div className="space-y-3">
 <div className="flex items-center gap-2 text-sm">
 <Loader2 className="h-4 w-4 animate-spin" />
 Importing {importProgress.current} / {importProgress.total}
 </div>
 <div className="h-2 w-full overflow-hidden rounded-full bg-card/40">
 <div
 className="h-full rounded-full bg-primary transition-all duration-300"
 style={{
 width: `${importProgress.total > 0 ? (importProgress.current / importProgress.total) * 100 : 0}%`,
 }}
 />
 </div>
 <div className="flex gap-3 text-xs text-muted-foreground">
 <span className="text-green-400">{stats.imported} imported</span>
 <span className="text-amber-400">{stats.needsReview} review</span>
 <span className="text-red-400">{stats.failed} failed</span>
 </div>
 </div>
 );
 }

 if (phase === "review") {
 const reviewRows = rows.filter(
 (r) => r.status === "pending" && r.confidence === "ambiguous"
 );

 return (
 <div className="space-y-3">
 <div className="flex items-center gap-2">
 <AlertCircle className="h-4 w-4 text-amber-400" />
 <span className="text-sm font-medium">{reviewRows.length} movies require review</span>
 </div>
 <p className="text-xs text-muted-foreground">
 Select the correct match for each ambiguous title.
 </p>
 <div className="archive-scrollbar max-h-64 space-y-2 overflow-y-auto">
 {reviewRows.map((row) => (
 <ReviewRow
 key={row.index}
 row={row}
 onSelect={(tmdbId) => retryRow(row.index, tmdbId)}
 onSkip={() => skipReviewRow(row.index)}
 />
 ))}
 </div>
 <div className="flex items-center justify-between text-xs text-muted-foreground">
 <span>{stats.imported} imported &middot; {stats.skipped} skipped &middot; {stats.failed} failed</span>
 </div>
 <Button size="sm" onClick={() => retryFailed()}>
 <RotateCcw className="mr-1 h-3 w-3" />
 Retry Failed
 </Button>
 </div>
 );
 }

 return (
 <div className="space-y-3">
 <div className="flex items-center gap-2">
 <CheckCircle2 className="h-5 w-5 text-green-400" />
 <span className="text-sm font-medium">Import complete</span>
 </div>
 <div className="grid grid-cols-2 gap-2 text-sm">
 <div className="rounded-md bg-card/40 px-3 py-2">
 <span className="text-muted-foreground">Imported</span>
 <p className="text-lg font-semibold text-green-400">{stats.imported}</p>
 </div>
 <div className="rounded-md bg-card/40 px-3 py-2">
 <span className="text-muted-foreground">Skipped</span>
 <p className="text-lg font-semibold text-amber-400">{stats.skipped}</p>
 </div>
 </div>
 {rows.filter((r) => r.status === "failed").length > 0 && (
 <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2">
 <div className="flex items-center gap-2 text-sm text-destructive">
 <XCircle className="h-4 w-4" />
 <span>{rows.filter((r) => r.status === "failed").length} failed imports</span>
 </div>
 <Button variant="outline" size="sm" className="mt-2" onClick={retryFailed}>
 <RotateCcw className="mr-1 h-3 w-3" />
 Retry Failed Imports
 </Button>
 </div>
 )}
 <div className="flex gap-2">
 <Button variant="outline" size="sm" onClick={reset}>
 Import Another File
 </Button>
 <Button variant="ghost" size="sm" onClick={onClose}>
 Close
 </Button>
 </div>
 </div>
 );
}

function ReviewRow({
 row,
 onSelect,
 onSkip,
}: {
 row: { index: number; csv: { title: string; year: number | null }; matches: TmdbSearchMatch[] };
 onSelect: (tmdbId: number) => void;
 onSkip: () => void;
}) {
 const [selected, setSelected] = useState<number | null>(null);

 return (
 <div className="rounded-md border border-border/40 bg-card/20 px-3 py-2">
 <div className="mb-1 flex items-center justify-between">
 <span className="text-sm font-medium">
 {row.csv.title}
 {row.csv.year ? <span className="ml-1 text-xs text-muted-foreground">({row.csv.year})</span> : null}
 </span>
 <button
 type="button"
 onClick={onSkip}
 className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
 title="Skip this movie"
 >
 <SkipForward className="h-3 w-3" />
 Skip
 </button>
 </div>
 <div className="space-y-1">
 {row.matches.map((match) => (
 <label
 key={match.tmdbId}
 className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs transition-colors hover:bg-accent/20"
 >
 <input
 type="radio"
 name={`match-${row.index}`}
 checked={selected === match.tmdbId}
 onChange={() => setSelected(match.tmdbId)}
 className="accent-primary"
 />
 <span>{match.title}</span>
 <span className="text-muted-foreground">({match.year})</span>
 {parseInt(match.year, 10) === row.csv.year && (
 <span className="rounded bg-green-500/20 px-1 text-[10px] text-green-400">year match</span>
 )}
 </label>
 ))}
 </div>
 {selected !== null && (
 <Button
 size="sm"
 className="mt-2 h-7 text-xs"
 onClick={() => onSelect(selected)}
 >
 <ChevronRight className="mr-1 h-3 w-3" />
 Import
 </Button>
 )}
 </div>
 );
}
