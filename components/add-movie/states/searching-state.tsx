"use client";

export function SearchingState() {
  return (
    <div
      className="add-movie-results flex min-h-[240px] flex-1 flex-col gap-3 rounded-md border border-border/50 bg-card/30 p-4"
      aria-busy="true"
      aria-label="Searching"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center gap-3 rounded-md border border-border/30 bg-background/40 p-3"
        >
          <div className="h-16 w-11 shrink-0 rounded-md bg-muted/50" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-3.5 w-3/5 rounded bg-muted/50" />
            <div className="h-3 w-1/5 rounded bg-muted/40" />
          </div>
        </div>
      ))}
    </div>
  );
}
