"use client";

import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LibraryEmptyStateProps = {
  onAddFirstMovie: () => void;
  variant?: "embedded" | "standalone";
  className?: string;
};

export function LibraryEmptyState({
  onAddFirstMovie,
  variant = "standalone",
  className,
}: LibraryEmptyStateProps) {
  const isEmbedded = variant === "embedded";

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex flex-col items-center justify-center text-center",
        isEmbedded ? "min-h-[min(52vh,520px)] px-6 py-16" : "min-h-[480px]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div
          className={cn(
            "library-empty-glow rounded-full",
            isEmbedded
              ? "h-[min(360px,80%)] w-[min(480px,90%)]"
              : "h-[min(420px,70%)] w-[min(520px,90%)]"
          )}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-md">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border/80 bg-card/60 shadow-inner">
          <Film className="h-6 w-6 text-primary/80" aria-hidden />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Add your first movie
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Add your first movie to begin building your archive.
        </p>
        <Button
          type="button"
          size="lg"
          className="mt-8 min-w-[180px]"
          onClick={onAddFirstMovie}
        >
          Add Movie
        </Button>
      </div>
    </motion.div>
  );
}
