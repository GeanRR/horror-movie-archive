"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { overlayFade, slideInFromRight } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AddMoviePanelContent } from "@/components/add-movie/add-movie-panel-content";
import { useAddMovieFlow } from "@/components/add-movie/use-add-movie-flow";

export type AddMovieSidePanelProps = {
 open: boolean;
 onOpenChange: (open: boolean) => void;
};

export function AddMovieSidePanel({
 open,
 onOpenChange,
}: AddMovieSidePanelProps) {
 const [mounted, setMounted] = useState(false);
 const flow = useAddMovieFlow(open);
 const router = useRouter();

 const close = useCallback(() => {
 onOpenChange(false);
 }, [onOpenChange]);

 const handleViewMovie = useCallback(() => {
 if (!flow.savedMovieId) return;

 close();
 router.push(`/movies/${flow.savedMovieId}`);
 }, [flow.savedMovieId, router, close]);

 const handleOpenExistingDuplicate = useCallback(() => {
 if (!flow.duplicateMatch) return;

 close();
 router.push(`/movies/${flow.duplicateMatch.movie.id}`);
 }, [flow.duplicateMatch, router, close]);

 useEffect(() => {
 setMounted(true);
 }, []);

 useEffect(() => {
 if (!open) return;

 const handleKeyDown = (event: KeyboardEvent) => {
 if (event.key === "Escape") {
 close();
 }
 };

 document.addEventListener("keydown", handleKeyDown);
 const previousOverflow = document.body.style.overflow;
 document.body.style.overflow = "hidden";

 if (flow.showSearchField) {
 requestAnimationFrame(() => {
 document.getElementById("add-movie-search")?.focus();
 });
 }

 return () => {
 document.removeEventListener("keydown", handleKeyDown);
 document.body.style.overflow = previousOverflow;
 };
 }, [open, close, flow.showSearchField]);

 if (!mounted) {
 return null;
 }

 return createPortal(
 <AnimatePresence>
 {open && (
 <div className="add-movie-portal fixed inset-0 z-50 flex justify-end">
 <motion.button
 type="button"
 variants={overlayFade}
 initial="hidden"
 animate="visible"
 exit="hidden"
 aria-label="Close add movie panel"
 className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"
 onClick={close}
 />

 <motion.aside
 role="dialog"
 aria-modal="true"
 aria-labelledby="add-movie-panel-title"
 variants={slideInFromRight}
 initial="hidden"
 animate="visible"
 exit="hidden"
 className={cn(
 "add-movie-panel relative flex h-full w-full max-w-xl flex-col",
 "border-l border-[#e9e3d4]/10 bg-black shadow-2xl"
 )}
 onClick={(e) => e.stopPropagation()}
 >
 <header className="flex shrink-0 items-center justify-between border-b border-[#e9e3d4]/5 px-9 py-6">
 <h2
 id="add-movie-panel-title"
 className="archive-anton text-3xl uppercase leading-none text-[#e9e3d4]"
 >
 Add Movie
 </h2>

 <Button
 type="button"
 variant="ghost"
 size="icon"
 className="h-9 w-9 rounded-full text-[#e9e3d4] hover:bg-[#e9e3d4]/10 hover:text-[#e9e3d4]"
 onClick={close}
 aria-label="Close"
 >
 <X className="h-5 w-5" aria-hidden />
 </Button>
 </header>

 <div className="archive-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto bg-black px-9 py-8">
 <AddMoviePanelContent
 panelState={flow.panelState}
 query={flow.query}
 onQueryChange={flow.handleQueryChange}
 showSearchField={flow.showSearchField}
 queryTooShort={flow.queryTooShort}
 results={flow.results}
 searchError={flow.searchError}
 selectedMovie={flow.selectedMovie}
 formValues={flow.formValues}
 duplicateMatch={flow.duplicateMatch}
 bestOfYearReplacement={flow.bestOfYearReplacement}
 saveError={flow.saveError}
 onFormChange={flow.updateFormValues}
 onSelectResult={flow.handleSelectResult}
 onBack={flow.handleBackFromConfirmation}
 onSave={flow.handleSaveMovie}
 onAddAnother={flow.handleAddAnother}
 onViewMovie={handleViewMovie}
 onOpenExistingDuplicate={handleOpenExistingDuplicate}
 />
 </div>
 </motion.aside>
 </div>
 )}
 </AnimatePresence>,
 document.body
 );
}
