"use client";

import { LibraryListTable } from "@/components/library/library-list-table";

type LibraryListViewProps = {
  onAddMovie: () => void;
};

/** Primary Library experience — archive list table shell */
export function LibraryListView({ onAddMovie }: LibraryListViewProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <LibraryListTable rows={[]} onAddMovie={onAddMovie} />
    </div>
  );
}
