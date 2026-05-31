"use client";

import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LIBRARY_LIST_COLUMNS } from "@/lib/library/list-columns";

export function LibraryListTableHeader() {
  return (
    <thead className="library-list-thead">
      <tr>
        {LIBRARY_LIST_COLUMNS.map((column) => (
          <th
            key={column.id}
            scope="col"
            className={cn(
              "library-list-th",
              column.minWidth,
              column.sortable && "library-list-th--sortable"
            )}
          >
            <span className="inline-flex items-center justify-center gap-1.5">
              <span>{column.label}</span>
              {column.sortable && (
                <ArrowUpDown
                  className="h-3 w-3 shrink-0 opacity-40"
                  aria-hidden
                />
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
}
