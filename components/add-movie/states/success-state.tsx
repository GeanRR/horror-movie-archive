"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type SuccessStateProps = {
  movieTitle: string;
  onAddAnother: () => void;
  onViewMovie: () => void;
};

export function SuccessState({
  movieTitle,
  onAddAnother,
  onViewMovie,
}: SuccessStateProps) {
  return (
    <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
        <Check className="h-7 w-7 text-primary" aria-hidden />
      </div>
      <p className="text-lg font-semibold tracking-tight text-foreground">
        Saved: {movieTitle}
      </p>
      <div className="mt-8 flex w-full max-w-xs flex-col gap-2">
        <Button type="button" onClick={onAddAnother}>
          Add Another
        </Button>
        <Button type="button" variant="outline" onClick={onViewMovie}>
          View Movie
        </Button>
      </div>
    </div>
  );
}
