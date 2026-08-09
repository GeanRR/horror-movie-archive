"use client";

import { cn } from "@/lib/utils";

type VhsPosterProps = {
 src: string;
 alt: string;
 className?: string;
 imageClassName?: string;
 layerClassName?: string;
};

export function VhsPoster({
 src,
 alt,
 className,
 imageClassName,
 layerClassName,
}: VhsPosterProps) {
 return (
 <span
 className={cn(
 "vhs-poster relative block shrink-0 overflow-hidden",
 className
 )}
 >
 <img
 src="/overlay/vhs.png"
 alt=""
 aria-hidden
 className={cn(
 "vhs-poster-overlay pointer-events-none absolute inset-0 h-full w-full object-cover",
 layerClassName,
 imageClassName
 )}
 />
 <img
 src={src}
 alt={alt}
 className={cn(
 "vhs-poster-image pointer-events-none absolute inset-0 h-full w-full object-cover",
 layerClassName,
 imageClassName
 )}
 />
 </span>
 );
}
