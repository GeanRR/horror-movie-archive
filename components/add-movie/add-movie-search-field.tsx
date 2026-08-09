"use client";

type AddMovieSearchFieldProps = {
 query: string;
 onQueryChange: (value: string) => void;
 disabled?: boolean;
};

export function AddMovieSearchField({
 query,
 onQueryChange,
 disabled = false,
}: AddMovieSearchFieldProps) {
 return (
 <div className="space-y-2">
 <label htmlFor="add-movie-search" className="sr-only">
 Search by title
 </label>
 <input
 id="add-movie-search"
 type="search"
 value={query}
 onChange={(e) => onQueryChange(e.target.value)}
 placeholder="Search by title..."
 autoComplete="off"
 disabled={disabled}
 className="add-movie-search-input archive-input disabled:opacity-60"
 />
 </div>
 );
}
