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
    if (!flow.selectedMovie) return;

    close();
    router.push(`/movies/${flow.selectedMovie.tmdbId}`);
  }, [flow.selectedMovie, router, close]);

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
              "add-movie-panel relative flex h-full w-full max-w-md flex-col",
              "border-l border-border/60 bg-card shadow-2xl"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex shrink-0 items-center justify-between border-b border-border/60 px-6 py-5">
              <h2
                id="add-movie-panel-title"
                className="text-lg font-semibold tracking-tight"
              >
                Add Movie
              </h2>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={close}
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden />
              </Button>
            </header>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6">
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
                onFormChange={flow.updateFormValues}
                onSelectResult={flow.handleSelectResult}
                onBack={flow.handleBackFromConfirmation}
                onSave={flow.handleSaveMovie}
                onAddAnother={flow.handleAddAnother}
                onViewMovie={handleViewMovie}
              />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}