"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LibraryTxtExportModal } from "@/components/settings/library-txt-export-modal";
import { downloadCsv } from "@/lib/export/export-csv";
import { downloadBackup, parseBackupFile } from "@/lib/export/export-backup";
import { restoreBackup, replaceAllConfirmation } from "@/lib/export/import-backup";
import { Download, Upload, AlertTriangle, CheckCircle2, XCircle, Loader2 } from "lucide-react";

export function BackupRestoreSection() {
 const [importState, setImportState] = useState<"idle" | "importing" | "done" | "error">("idle");
 const [importMessage, setImportMessage] = useState("");
 const [isTxtExportOpen, setIsTxtExportOpen] = useState(false);
 const fileInputRef = useRef<HTMLInputElement>(null);

 const handleExportBackup = () => {
 const date = new Date().toISOString().slice(0, 10);
 downloadBackup(`retromax-backup-${date}.json`);
 };

 const handleExportCsv = () => {
 const date = new Date().toISOString().slice(0, 10);
 downloadCsv(`retromax-export-${date}.csv`);
 };

 const handleMergeRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;

 setImportState("importing");
 setImportMessage("");

 const result = await parseBackupFile(file);
 if (!result.ok) {
 setImportState("error");
 setImportMessage(result.error);
 return;
 }

 const resultRestore = restoreBackup(result.backup, "merge");
 setImportState("done");
 setImportMessage(`${resultRestore.moviesRestored} movies added.`);
 };

 const handleReplaceRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;

 if (!replaceAllConfirmation()) {
 setImportState("idle");
 if (fileInputRef.current) fileInputRef.current.value = "";
 return;
 }

 setImportState("importing");
 setImportMessage("");

 const result = await parseBackupFile(file);
 if (!result.ok) {
 setImportState("error");
 setImportMessage(result.error);
 return;
 }

 const resultRestore = restoreBackup(result.backup, "replace");
 setImportState("done");
 setImportMessage(`${resultRestore.moviesRestored} movies restored.`);
 };

 return (
 <div className="space-y-4">
 <div className="space-y-2">
 <Label>Export CSV</Label>
 <p className="text-xs text-muted-foreground">
 Export your movie collection to a CSV spreadsheet.
 </p>
 <Button variant="outline" size="sm" onClick={handleExportCsv}>
 <Download className="mr-1 h-3 w-3" />
 Export CSV
 </Button>
 </div>

 <Separator className="bg-border/40" />

 <div className="space-y-2">
 <Label>Export TXT</Label>
 <p className="text-xs text-muted-foreground">
 Export selected movie fields to a plain text file.
 </p>
 <Button variant="outline" size="sm" onClick={() => setIsTxtExportOpen(true)}>
 <Download className="mr-1 h-3 w-3" />
 Export TXT
 </Button>
 </div>

 <Separator className="bg-border/40" />

 <div className="space-y-2">
 <Label>Export Full Backup</Label>
 <p className="text-xs text-muted-foreground">
 Download a complete JSON backup of your archive.
 </p>
 <Button variant="outline" size="sm" onClick={handleExportBackup}>
 <Download className="mr-1 h-3 w-3" />
 Export Full Backup
 </Button>
 </div>

 <Separator className="bg-border/40" />

 <div className="space-y-2">
 <Label>Import Backup</Label>
 <p className="text-xs text-muted-foreground">
 Restore from a Retromax backup file (JSON).
 </p>
 <div className="flex flex-wrap gap-2">
 <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
 <Upload className="h-3 w-3" />
 Merge With Existing
 <input
 type="file"
 accept=".json"
 className="hidden"
 onChange={handleMergeRestore}
 />
 </label>
 <label className="flex cursor-pointer items-center gap-2 rounded-md border border-destructive/40 px-3 py-1.5 text-xs text-destructive transition-colors hover:border-destructive hover:text-destructive">
 <AlertTriangle className="h-3 w-3" />
 Replace All Data
 <input
 ref={fileInputRef}
 type="file"
 accept=".json"
 className="hidden"
 onChange={handleReplaceRestore}
 />
 </label>
 </div>
 {importState === "importing" && (
 <div className="flex items-center gap-2 text-sm text-muted-foreground">
 <Loader2 className="h-4 w-4 animate-spin" />
 Restoring backup...
 </div>
 )}
 {importState === "done" && (
 <div className="flex items-center gap-2 text-sm text-green-400">
 <CheckCircle2 className="h-4 w-4" />
 {importMessage}
 </div>
 )}
 {importState === "error" && (
 <div className="flex items-center gap-2 text-sm text-destructive">
 <XCircle className="h-4 w-4" />
 {importMessage}
 </div>
 )}
 </div>

 {isTxtExportOpen && (
 <LibraryTxtExportModal onClose={() => setIsTxtExportOpen(false)} />
 )}
 </div>
 );
}
