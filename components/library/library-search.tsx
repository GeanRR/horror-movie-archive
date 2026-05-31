"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type LibrarySearchProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LibrarySearch({ isOpen, onOpenChange }: LibrarySearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="flex items-center gap-1">
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <input
              ref={inputRef}
              type="search"
              placeholder="Search archive…"
              aria-label="Search movies"
              className={cn(
                "h-9 w-[280px] rounded-md border border-input bg-background/80 px-3 text-sm",
                "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant={isOpen ? "secondary" : "ghost"}
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={() => onOpenChange(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close search" : "Open search"}
          >
            {isOpen ? (
              <X className="h-4 w-4" aria-hidden />
            ) : (
              <Search className="h-4 w-4" aria-hidden />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{isOpen ? "Close search" : "Search"}</TooltipContent>
      </Tooltip>
    </div>
  );
}
