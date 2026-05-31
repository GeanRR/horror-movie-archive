"use client";

import Image from "next/image";
import { AddMoviePosterPlaceholder } from "@/components/add-movie/add-movie-poster-placeholder";
import { cn } from "@/lib/utils";

type AddMoviePosterProps = {
  posterUrl?: string;
  title: string;
  className?: string;
  sizes?: string;
};

export function AddMoviePoster({
  posterUrl,
  title,
  className,
  sizes = "88px",
}: AddMoviePosterProps) {
  if (!posterUrl) {
    return <AddMoviePosterPlaceholder className={className} />;
  }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-md border border-border/60 bg-muted/20",
        className
      )}
    >
      <Image
        src={posterUrl}
        alt=""
        fill
        sizes={sizes}
        className="object-cover"
      />
      <span className="sr-only">{title} poster</span>
    </div>
  );
}
