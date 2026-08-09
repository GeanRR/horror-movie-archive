"use client";

import { Check, Film, Plus } from "lucide-react";
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
 <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#E0B63E]/40 bg-[#E0B63E]/10">
 <Check className="h-7 w-7 text-[#E0B63E]" aria-hidden />
 </div>
 <p className="font-sans text-lg font-bold text-[#e9e3d4]">
 Saved: {movieTitle}
 </p>
 <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
 <Button
 type="button"
 onClick={onAddAnother}
 >
 <Plus className="h-4 w-4" aria-hidden />
 Add Another
 </Button>
 <Button
 type="button"
 variant="outline"
 onClick={onViewMovie}
 >
 <Film className="h-4 w-4" aria-hidden />
 View Movie
 </Button>
 </div>
 </div>
 );
}
