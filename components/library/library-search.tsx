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
 value: string;
 onValueChange: (value: string) => void;
};

export function LibrarySearch({
 isOpen,
 onOpenChange,
 value,
 onValueChange,
}: LibrarySearchProps) {
 const inputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
 if (isOpen) {
 inputRef.current?.focus();
 }
 }, [isOpen]);

 return (
 <div className="flex h-11 items-center justify-end gap-2">
 <AnimatePresence initial={false}>
 {isOpen && (
 <motion.div
 initial={{ width: 0, opacity: 0 }}
 animate={{ width: 280, opacity: 1 }}
 exit={{ width: 0, opacity: 0 }}
 transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
 className="h-11 overflow-hidden"
 >
 <input
 ref={inputRef}
 type="search"
 value={value}
 onChange={(event) => onValueChange(event.target.value)}
 placeholder="Search archive..."
 aria-label="Search movies"
 className={cn(
 "h-11 w-[280px] rounded-full border border-transparent bg-black/20 px-4 text-sm leading-none text-[#e9e3d4] backdrop-blur-md",
 "placeholder:text-[#e9e3d4]/55 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0"
 )}
 />
 </motion.div>
 )}
 </AnimatePresence>
 <Tooltip>
 <TooltipTrigger asChild>
 <Button
 type="button"
 variant="ghost"
 size="icon"
 className="h-11 w-11 shrink-0 rounded-full text-[#e9e3d4] hover:bg-black/20 hover:text-[#e9e3d4]"
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
