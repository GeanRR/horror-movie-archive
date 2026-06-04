This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.env.example
.gitignore
app/(app)/dashboard/page.tsx
app/(app)/layout.tsx
app/(app)/library/page.tsx
app/(app)/lists/page.tsx
app/(app)/movies/[id]/page.tsx
app/(app)/page.tsx
app/(app)/settings/page.tsx
app/(app)/year-in-review/page.tsx
app/api/tmdb/movie/[id]/route.ts
app/api/tmdb/search/route.ts
app/globals.css
app/layout.tsx
components.json
components/add-movie/add-movie-panel-content.tsx
components/add-movie/add-movie-poster-placeholder.tsx
components/add-movie/add-movie-poster.tsx
components/add-movie/add-movie-search-field.tsx
components/add-movie/add-movie-side-panel.tsx
components/add-movie/states/confirmation-state.tsx
components/add-movie/states/duplicate-warning.tsx
components/add-movie/states/idle-state.tsx
components/add-movie/states/results-state.tsx
components/add-movie/states/searching-state.tsx
components/add-movie/states/success-state.tsx
components/add-movie/use-add-movie-flow.ts
components/layout/app-shell.tsx
components/layout/sidebar.tsx
components/layout/top-bar.tsx
components/library/.gitkeep
components/library/library-content.tsx
components/library/library-empty-state.tsx
components/library/library-grid-view.tsx
components/library/library-header.tsx
components/library/library-list-table-header.tsx
components/library/library-list-table.tsx
components/library/library-list-view.tsx
components/library/library-search.tsx
components/library/library-shell.tsx
components/library/library-view-toggle.tsx
components/lists/.gitkeep
components/movie/best-of-year-crown.tsx
components/movie/movie-badge.tsx
components/movie/movie-details-modal.tsx
components/movie/movie-stars.tsx
components/movies/.gitkeep
components/providers/app-providers.tsx
components/providers/theme-provider.tsx
components/settings/.gitkeep
components/settings/visual-theme-settings.tsx
components/ui/button.tsx
components/ui/dropdown-menu.tsx
components/ui/label.tsx
components/ui/separator.tsx
components/ui/tooltip.tsx
docs/Horror Movie Archive Prd.pdf
docs/Horror Movie Archive Ux Spec.pdf
eslint.config.mjs
hooks/.gitkeep
lib/add-movie/constants.ts
lib/add-movie/fetch-movie-details.ts
lib/add-movie/map-to-draft.ts
lib/add-movie/review-scores.ts
lib/add-movie/search-client.ts
lib/api/response.ts
lib/charts/theme.ts
lib/db/prisma.ts
lib/forms/use-zod-form.ts
lib/library/list-columns.ts
lib/motion.ts
lib/movie-engines/badge-engine.ts
lib/movie-engines/best-of-year-crown.ts
lib/movie-engines/stars-engine.ts
lib/omdb/fetch-movie-ratings.ts
lib/omdb/server-env.ts
lib/supabase/client.ts
lib/supabase/config.ts
lib/supabase/index.ts
lib/supabase/middleware.ts
lib/supabase/server.ts
lib/supabase/storage.ts
lib/tmdb/config.ts
lib/tmdb/map-movie-search.ts
lib/tmdb/poster.ts
lib/tmdb/server-env.ts
lib/utils.ts
lib/utils/csv.ts
lib/validators/base.ts
middleware.ts
next.config.ts
package.json
postcss.config.mjs
prisma/schema.prisma
public/badges/badge_1.png
public/badges/badge_10.png
public/badges/badge_11.png
public/badges/badge_12.png
public/badges/badge_2.png
public/badges/badge_3.png
public/badges/badge_4.png
public/badges/badge_5.png
public/badges/badge_6.png
public/badges/badge_7.png
public/badges/badge_8.png
public/badges/badge_9.png
README.md
repomix-output.xml
store/index.ts
store/movie-store.ts
store/theme-store.ts
tsconfig.json
types/add-movie.ts
types/index.ts
types/library.ts
types/theme.ts
types/tmdb.ts
```

# Files

## File: repomix-output.xml
````xml
This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.env.example
.gitignore
app/(app)/dashboard/page.tsx
app/(app)/layout.tsx
app/(app)/library/page.tsx
app/(app)/lists/page.tsx
app/(app)/movies/[id]/page.tsx
app/(app)/page.tsx
app/(app)/settings/page.tsx
app/(app)/year-in-review/page.tsx
app/api/tmdb/movie/[id]/route.ts
app/api/tmdb/search/route.ts
app/globals.css
app/layout.tsx
components.json
components/add-movie/add-movie-panel-content.tsx
components/add-movie/add-movie-poster-placeholder.tsx
components/add-movie/add-movie-poster.tsx
components/add-movie/add-movie-search-field.tsx
components/add-movie/add-movie-side-panel.tsx
components/add-movie/states/confirmation-state.tsx
components/add-movie/states/duplicate-warning.tsx
components/add-movie/states/idle-state.tsx
components/add-movie/states/results-state.tsx
components/add-movie/states/searching-state.tsx
components/add-movie/states/success-state.tsx
components/add-movie/use-add-movie-flow.ts
components/layout/app-shell.tsx
components/layout/sidebar.tsx
components/layout/top-bar.tsx
components/library/.gitkeep
components/library/library-content.tsx
components/library/library-empty-state.tsx
components/library/library-grid-view.tsx
components/library/library-header.tsx
components/library/library-list-table-header.tsx
components/library/library-list-table.tsx
components/library/library-list-view.tsx
components/library/library-search.tsx
components/library/library-shell.tsx
components/library/library-view-toggle.tsx
components/lists/.gitkeep
components/movie/best-of-year-crown.tsx
components/movie/movie-badge.tsx
components/movie/movie-details-modal.tsx
components/movie/movie-stars.tsx
components/movies/.gitkeep
components/providers/app-providers.tsx
components/providers/theme-provider.tsx
components/settings/.gitkeep
components/settings/visual-theme-settings.tsx
components/ui/button.tsx
components/ui/dropdown-menu.tsx
components/ui/label.tsx
components/ui/separator.tsx
components/ui/tooltip.tsx
docs/Horror Movie Archive Prd.pdf
docs/Horror Movie Archive Ux Spec.pdf
eslint.config.mjs
hooks/.gitkeep
lib/add-movie/constants.ts
lib/add-movie/fetch-movie-details.ts
lib/add-movie/map-to-draft.ts
lib/add-movie/review-scores.ts
lib/add-movie/search-client.ts
lib/api/response.ts
lib/charts/theme.ts
lib/db/prisma.ts
lib/forms/use-zod-form.ts
lib/library/list-columns.ts
lib/motion.ts
lib/movie-engines/badge-engine.ts
lib/movie-engines/best-of-year-crown.ts
lib/movie-engines/stars-engine.ts
lib/omdb/fetch-movie-ratings.ts
lib/omdb/server-env.ts
lib/supabase/client.ts
lib/supabase/config.ts
lib/supabase/index.ts
lib/supabase/middleware.ts
lib/supabase/server.ts
lib/supabase/storage.ts
lib/tmdb/config.ts
lib/tmdb/map-movie-search.ts
lib/tmdb/poster.ts
lib/tmdb/server-env.ts
lib/utils.ts
lib/utils/csv.ts
lib/validators/base.ts
middleware.ts
next.config.ts
package.json
postcss.config.mjs
prisma/schema.prisma
public/badges/badge_1.png
public/badges/badge_10.png
public/badges/badge_11.png
public/badges/badge_12.png
public/badges/badge_2.png
public/badges/badge_3.png
public/badges/badge_4.png
public/badges/badge_5.png
public/badges/badge_6.png
public/badges/badge_7.png
public/badges/badge_8.png
public/badges/badge_9.png
README.md
store/index.ts
store/movie-store.ts
store/theme-store.ts
tsconfig.json
types/add-movie.ts
types/index.ts
types/library.ts
types/theme.ts
types/tmdb.ts
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path=".gitignore">
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# prisma
/prisma/migrations/**/migration_lock.toml
</file>

<file path="app/(app)/dashboard/page.tsx">
export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
    </div>
  );
}
</file>

<file path="app/(app)/layout.tsx">
import { AppShell } from "@/components/layout/app-shell";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
</file>

<file path="app/(app)/library/page.tsx">
import { LibraryShell } from "@/components/library/library-shell";

export default function LibraryPage() {
  return <LibraryShell />;
}
</file>

<file path="app/(app)/lists/page.tsx">
export default function ListsPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Lists</h2>
    </div>
  );
}
</file>

<file path="app/(app)/page.tsx">
import { redirect } from "next/navigation";

export default function AppIndexPage() {
  redirect("/library");
}
</file>

<file path="app/(app)/settings/page.tsx">
import { VisualThemeSettings } from "@/components/settings/visual-theme-settings";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
      </div>
      <section className="max-w-md space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Appearance</h3>
        <VisualThemeSettings />
      </section>
    </div>
  );
}
</file>

<file path="app/api/tmdb/movie/[id]/route.ts">
import { NextRequest, NextResponse } from "next/server";
import { fetchMovieRatings } from "@/lib/omdb/fetch-movie-ratings";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const apiKey = getTmdbApiKey();

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "TMDB API key not configured.",
      },
      { status: 500 }
    );
  }

  try {
    const detailsUrl =
      `${TMDB_API_BASE}/movie/${id}` +
      `?api_key=${apiKey}&language=en-US`;

    const creditsUrl =
      `${TMDB_API_BASE}/movie/${id}/credits` +
      `?api_key=${apiKey}&language=en-US`;

    const externalIdsUrl =
      `${TMDB_API_BASE}/movie/${id}/external_ids` +
      `?api_key=${apiKey}`;

    const [detailsResponse, creditsResponse, externalIdsResponse] =
      await Promise.all([
        fetch(detailsUrl, { next: { revalidate: 0 } }),
        fetch(creditsUrl, { next: { revalidate: 0 } }),
        fetch(externalIdsUrl, { next: { revalidate: 0 } }),
      ]);

    if (
      !detailsResponse.ok ||
      !creditsResponse.ok ||
      !externalIdsResponse.ok
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to fetch movie details.",
        },
        { status: 500 }
      );
    }

    const details = await detailsResponse.json();
    const credits = await creditsResponse.json();
    const externalIds = await externalIdsResponse.json();

    const director =
      credits.crew?.find(
        (person: { job?: string; name?: string }) =>
          person.job === "Director"
      )?.name ?? "—";

    const imdbId =
      typeof externalIds.imdb_id === "string"
        ? externalIds.imdb_id
        : undefined;

    const ratings = imdbId
      ? await fetchMovieRatings(imdbId)
      : {
          imdbId: undefined,
          imdbScore: null,
          rottenTomatoesScore: null,
        };

    return NextResponse.json({
      ok: true,
      movie: {
        tmdbId: details.id,

        title: details.title,
        originalTitle: details.original_title,
        titlePt: details.title,

        year: details.release_date?.slice(0, 4) ?? "",
        releaseDate: details.release_date ?? "",

        runtime: details.runtime ?? null,

        director,

        country:
          details.production_countries?.[0]?.name ?? "—",

        genres:
          details.genres?.map(
            (genre: { name: string }) => genre.name
          ) ?? [],

        overview: details.overview ?? "",

        imdbId: ratings.imdbId,
        imdbScore: ratings.imdbScore,
        rottenTomatoesScore:
          ratings.rottenTomatoesScore,

        distributor:
          details.production_companies?.[0]?.name ?? "—",

        cast:
          credits.cast
            ?.slice(0, 10)
            ?.map(
              (person: { name: string }) => person.name
            ) ?? [],

        crew:
          credits.crew
            ?.slice(0, 10)
            ?.map(
              (person: { name: string }) => person.name
            ) ?? [],
      },
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to load movie details.",
      },
      { status: 500 }
    );
  }
}
</file>

<file path="app/api/tmdb/search/route.ts">
import { NextResponse, type NextRequest } from "next/server";
import { ADD_MOVIE_MIN_SEARCH_LENGTH } from "@/lib/add-movie/constants";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";
import { mapTmdbApiMovie } from "@/lib/tmdb/map-movie-search";
import type { TmdbSearchResponse } from "@/types/tmdb";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < ADD_MOVIE_MIN_SEARCH_LENGTH) {
    const body: TmdbSearchResponse = {
      ok: false,
      error: `Enter at least ${ADD_MOVIE_MIN_SEARCH_LENGTH} characters to search.`,
    };
    return NextResponse.json(body, { status: 400 });
  }

  const apiKey = getTmdbApiKey();
  if (!apiKey) {
    const body: TmdbSearchResponse = {
      ok: false,
      error: "TMDB is not configured. Add TMDB_API_KEY to .env.local.",
    };
    return NextResponse.json(body, { status: 503 });
  }

  try {
    const url = new URL(`${TMDB_API_BASE}/search/movie`);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("query", query);
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("language", "en-US");

    const tmdbResponse = await fetch(url.toString(), {
      next: { revalidate: 0 },
    });

    if (!tmdbResponse.ok) {
      const body: TmdbSearchResponse = {
        ok: false,
        error: "TMDB search failed. Please try again.",
      };
      return NextResponse.json(body, { status: tmdbResponse.status });
    }

    const payload = (await tmdbResponse.json()) as {
      results?: unknown[];
    };

    const results = (payload.results ?? [])
      .filter(
        (item): item is Record<string, unknown> =>
          typeof item === "object" && item !== null && "id" in item
      )
      .map((item) => mapTmdbApiMovie(item as Parameters<typeof mapTmdbApiMovie>[0]));

    const body: TmdbSearchResponse = { ok: true, results };
    return NextResponse.json(body);
  } catch {
    const body: TmdbSearchResponse = {
      ok: false,
      error: "Unable to search movies right now.",
    };
    return NextResponse.json(body, { status: 500 });
  }
}
</file>

<file path="app/globals.css">
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* ─── Base design tokens (shadcn) ─── */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* ─── Horror Archive (default) ─── */
:root,
[data-visual-theme="horror-archive"] {
  --radius: 0.5rem;
  --background: oklch(0.12 0.02 285);
  --foreground: oklch(0.93 0.01 285);
  --card: oklch(0.16 0.03 285);
  --card-foreground: oklch(0.93 0.01 285);
  --popover: oklch(0.14 0.025 285);
  --popover-foreground: oklch(0.93 0.01 285);
  --primary: oklch(0.55 0.22 25);
  --primary-foreground: oklch(0.98 0.01 285);
  --secondary: oklch(0.22 0.04 285);
  --secondary-foreground: oklch(0.9 0.01 285);
  --muted: oklch(0.2 0.03 285);
  --muted-foreground: oklch(0.65 0.02 285);
  --accent: oklch(0.28 0.08 25);
  --accent-foreground: oklch(0.95 0.01 285);
  --destructive: oklch(0.55 0.24 25);
  --border: oklch(0.28 0.04 285);
  --input: oklch(0.22 0.04 285);
  --ring: oklch(0.55 0.22 25);
  --sidebar: oklch(0.1 0.02 285);
  --sidebar-foreground: oklch(0.88 0.01 285);
  --sidebar-border: oklch(0.24 0.04 285);
  --sidebar-accent: oklch(0.18 0.05 25);
  --sidebar-accent-foreground: oklch(0.95 0.01 285);
  --shell-glow: oklch(0.45 0.18 25 / 0.15);
}

/* ─── VHS retro ─── */
[data-visual-theme="vhs"] {
  --radius: 0.25rem;
  --background: oklch(0.14 0.04 145);
  --foreground: oklch(0.88 0.12 95);
  --card: oklch(0.18 0.05 145);
  --card-foreground: oklch(0.9 0.1 95);
  --popover: oklch(0.16 0.045 145);
  --popover-foreground: oklch(0.9 0.1 95);
  --primary: oklch(0.72 0.18 95);
  --primary-foreground: oklch(0.15 0.05 145);
  --secondary: oklch(0.24 0.06 145);
  --secondary-foreground: oklch(0.88 0.1 95);
  --muted: oklch(0.22 0.05 145);
  --muted-foreground: oklch(0.62 0.08 95);
  --accent: oklch(0.55 0.2 330);
  --accent-foreground: oklch(0.95 0.02 95);
  --destructive: oklch(0.6 0.22 25);
  --border: oklch(0.32 0.08 145);
  --input: oklch(0.2 0.05 145);
  --ring: oklch(0.72 0.18 95);
  --sidebar: oklch(0.11 0.04 145);
  --sidebar-foreground: oklch(0.85 0.11 95);
  --sidebar-border: oklch(0.3 0.07 145);
  --sidebar-accent: oklch(0.22 0.08 95);
  --sidebar-accent-foreground: oklch(0.12 0.04 145);
  --shell-glow: oklch(0.72 0.18 95 / 0.12);
}

/* ─── Minimal ─── */
[data-visual-theme="minimal"] {
  --radius: 0.375rem;
  --background: oklch(0.11 0 0);
  --foreground: oklch(0.92 0 0);
  --card: oklch(0.14 0 0);
  --card-foreground: oklch(0.92 0 0);
  --popover: oklch(0.13 0 0);
  --popover-foreground: oklch(0.92 0 0);
  --primary: oklch(0.92 0 0);
  --primary-foreground: oklch(0.11 0 0);
  --secondary: oklch(0.18 0 0);
  --secondary-foreground: oklch(0.88 0 0);
  --muted: oklch(0.17 0 0);
  --muted-foreground: oklch(0.58 0 0);
  --accent: oklch(0.22 0 0);
  --accent-foreground: oklch(0.95 0 0);
  --destructive: oklch(0.55 0.2 25);
  --border: oklch(0.24 0 0);
  --input: oklch(0.18 0 0);
  --ring: oklch(0.75 0 0);
  --sidebar: oklch(0.09 0 0);
  --sidebar-foreground: oklch(0.85 0 0);
  --sidebar-border: oklch(0.2 0 0);
  --sidebar-accent: oklch(0.16 0 0);
  --sidebar-accent-foreground: oklch(0.95 0 0);
  --shell-glow: oklch(0.5 0 0 / 0.08);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  html {
    color-scheme: dark;
  }
}

@layer utilities {
  .shell-surface {
    background: linear-gradient(
      180deg,
      var(--shell-glow) 0%,
      transparent 40%
    );
  }

  .library-list-scroll {
    scrollbar-gutter: stable;
  }

  .library-list-thead {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .library-list-th {
    @apply border-b border-border/70 bg-card/95 px-3 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-md;
    vertical-align: middle;
  }

  .library-list-th--sortable {
    @apply cursor-default select-none transition-colors hover:text-foreground/90;
  }

  .library-list-td {
    @apply border-b border-border/30 px-3 py-4 text-center text-sm leading-relaxed text-foreground/90;
    vertical-align: middle;
    white-space: normal;
    word-break: break-word;
  }

  .library-list-row:hover .library-list-td {
    @apply bg-accent/10;
  }

  .library-list-empty-row .library-list-td {
    @apply border-b-0;
  }

  .add-movie-panel {
    box-shadow: -8px 0 32px oklch(0 0 0 / 0.35);
  }

  .library-empty-glow {
    background: radial-gradient(
      ellipse at center,
      var(--shell-glow) 0%,
      transparent 70%
    );
  }

  .vhs-scanlines::after {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      oklch(0 0 0 / 0.03) 2px,
      oklch(0 0 0 / 0.03) 4px
    );
  }
}
</file>

<file path="app/layout.tsx">
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Horror Movie Archive",
  description: "Private premium horror movie archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      data-visual-theme="horror-archive"
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
</file>

<file path="components.json">
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
</file>

<file path="components/add-movie/add-movie-poster-placeholder.tsx">
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";

type AddMoviePosterPlaceholderProps = {
  className?: string;
};

export function AddMoviePosterPlaceholder({
  className,
}: AddMoviePosterPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-muted/20",
        className
      )}
      aria-hidden
    >
      <Film className="h-8 w-8 text-muted-foreground/35" />
    </div>
  );
}
</file>

<file path="components/add-movie/add-movie-poster.tsx">
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
</file>

<file path="components/add-movie/add-movie-search-field.tsx">
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
        className="add-movie-search-input h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
      />
    </div>
  );
}
</file>

<file path="components/add-movie/states/duplicate-warning.tsx">
"use client";

import type { DuplicateMovieMatch } from "@/components/add-movie/use-add-movie-flow";
import type { LibraryMovie } from "@/store/movie-store";
import { Button } from "@/components/ui/button";

type DuplicateWarningProps = {
  duplicateMatch: DuplicateMovieMatch | null;
  bestOfYearReplacement: LibraryMovie | null;
  onOpenExistingDuplicate: () => void;
  onAddAnyway: () => void;
  onConfirmBestOfYearReplacement: () => void;
};

export function DuplicateWarning({
  duplicateMatch,
  bestOfYearReplacement,
  onOpenExistingDuplicate,
  onAddAnyway,
  onConfirmBestOfYearReplacement,
}: DuplicateWarningProps) {
  if (duplicateMatch) {
    return (
      <div className="rounded-md border border-amber-400/40 bg-amber-400/10 p-3 text-sm">
        <p className="font-medium text-amber-100">Possible duplicate found</p>
        <p className="mt-1 text-amber-100/80">
          This matches {duplicateMatch.movie.displayTitle} by{" "}
          {duplicateMatch.reason}.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={onOpenExistingDuplicate}
          >
            Open Existing Movie
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onAddAnyway}
          >
            Add Anyway
          </Button>
        </div>
      </div>
    );
  }

  if (bestOfYearReplacement) {
    return (
      <div className="rounded-md border border-amber-400/40 bg-amber-400/10 p-3 text-sm">
        <p className="font-medium text-amber-100">
          Replace Best of Year winner?
        </p>
        <p className="mt-1 text-amber-100/80">
          {bestOfYearReplacement.displayTitle} is already marked Best of Year
          for this watched year.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={onConfirmBestOfYearReplacement}
          >
            Replace Winner
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
</file>

<file path="components/add-movie/states/idle-state.tsx">
"use client";

import { ADD_MOVIE_MIN_SEARCH_LENGTH } from "@/lib/add-movie/constants";

type IdleStateProps = {
  queryTooShort: boolean;
};

export function IdleState({ queryTooShort }: IdleStateProps) {
  return (
    <div className="add-movie-results flex min-h-[240px] flex-1 flex-col rounded-md border border-border/50 bg-card/30">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        {queryTooShort ? (
          <p className="text-sm text-muted-foreground">
            Type at least {ADD_MOVIE_MIN_SEARCH_LENGTH} characters to search.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Start typing to search for a movie.
          </p>
        )}
      </div>
    </div>
  );
}
</file>

<file path="components/add-movie/states/results-state.tsx">
"use client";

import type { AddMovieSearchResult } from "@/types/add-movie";
import { AddMoviePoster } from "@/components/add-movie/add-movie-poster";
import { getTmdbPosterUrl } from "@/lib/tmdb/poster";

type ResultsStateProps = {
  results: AddMovieSearchResult[];
  searchError: string | null;
  onSelect: (result: AddMovieSearchResult) => void;
};

export function ResultsState({
  results,
  searchError,
  onSelect,
}: ResultsStateProps) {
  if (searchError) {
    return (
      <div className="add-movie-results flex min-h-[240px] flex-1 flex-col rounded-md border border-border/50 bg-card/30">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-sm font-medium text-foreground">Search unavailable</p>
          <p className="mt-2 text-sm text-muted-foreground">{searchError}</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="add-movie-results flex min-h-[240px] flex-1 flex-col rounded-md border border-border/50 bg-card/30">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">No movies found.</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Try a different title or check the spelling.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-movie-results flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-border/50 bg-card/30">
      <ul
        className="flex max-h-[min(52vh,480px)] flex-col gap-1 overflow-y-auto p-2"
        role="list"
      >
        {results.map((result) => (
          <li key={result.tmdbId} role="listitem">
            <button
              type="button"
              onClick={() => onSelect(result)}
              className="flex w-full items-center gap-3 rounded-md border border-transparent px-3 py-3 text-left transition-colors hover:border-border/60 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <AddMoviePoster
                posterUrl={getTmdbPosterUrl(result.posterPath, "thumb")}
                title={result.title}
                className="h-16 w-11"
                sizes="88px"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-foreground">
                  {result.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {result.releaseYear || "—"}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
</file>

<file path="components/add-movie/states/searching-state.tsx">
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
</file>

<file path="components/add-movie/states/success-state.tsx">
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
</file>

<file path="components/layout/app-shell.tsx">
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/motion";
import { useThemeStore } from "@/store/theme-store";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const visualTheme = useThemeStore((s) => s.visualTheme);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex h-screen w-full overflow-hidden bg-background",
        visualTheme === "vhs" && "vhs-scanlines"
      )}
    >
      <div className="shell-surface pointer-events-none absolute inset-0" />
      <Sidebar />
      <motion.div
        className="relative flex min-w-0 flex-1 flex-col"
        variants={staggerContainer}
      >
        <TopBar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </motion.div>
    </motion.div>
  );
}
</file>

<file path="components/layout/top-bar.tsx">
"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

export function TopBar() {
  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex h-14 shrink-0 items-center border-b border-border bg-card/40 px-6 backdrop-blur-sm"
    >
      <motion.div variants={fadeIn}>
        <p className="text-xs text-muted-foreground">Archive workspace</p>
        <p className="text-sm font-medium">Horror Movie Archive</p>
      </motion.div>
    </motion.header>
  );
}
</file>

<file path="components/library/.gitkeep">

</file>

<file path="components/library/library-view-toggle.tsx">
"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LibraryViewMode } from "@/types/library";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type LibraryViewToggleProps = {
  viewMode: LibraryViewMode;
  onViewModeChange: (mode: LibraryViewMode) => void;
};

export function LibraryViewToggle({
  viewMode,
  onViewModeChange,
}: LibraryViewToggleProps) {
  return (
    <div
      className="inline-flex items-center rounded-md border border-border bg-card/50 p-0.5"
      role="group"
      aria-label="View mode"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            aria-pressed={viewMode === "list"}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors",
              viewMode === "list"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="h-4 w-4" aria-hidden />
            <span className="sr-only">List view</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>List view</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            aria-pressed={viewMode === "grid"}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors",
              viewMode === "grid"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" aria-hidden />
            <span className="sr-only">Grid view</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>Grid view</TooltipContent>
      </Tooltip>
    </div>
  );
}
</file>

<file path="components/lists/.gitkeep">

</file>

<file path="components/movie/best-of-year-crown.tsx">
"use client";

import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

type BestOfYearCrownProps = {
  active: boolean;
  className?: string;
  showLabel?: boolean;
};

export function BestOfYearCrown({
  active,
  className,
  showLabel = false,
}: BestOfYearCrownProps) {
  if (!active) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-md border border-amber-400/40 bg-amber-400/10 px-1.5 py-1 text-amber-200",
        className
      )}
      title="Best of Year"
      aria-label="Best of Year"
    >
      <Crown className="h-3.5 w-3.5" aria-hidden />
      {showLabel && <span className="text-xs font-medium">Best of Year</span>}
    </span>
  );
}
</file>

<file path="components/movie/movie-details-modal.tsx">
"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Edit,
  Image as ImageIcon,
  ListPlus,
  RefreshCcw,
  Trash2,
  X,
} from "lucide-react";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  formatReviewScore,
  isMasterpieceScore,
} from "@/lib/movie-engines/stars-engine";
import { cn } from "@/lib/utils";
import type { LibraryMovie } from "@/store/movie-store";

type MovieDetailsModalProps = {
  movie: LibraryMovie;
  onClose: () => void;
};

function formatRuntime(runtime: number | null): string {
  return runtime ? `${runtime} min` : "-";
}

function formatDate(value: string): string {
  return value || "-";
}

function MetadataItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-foreground">{value}</dd>
    </div>
  );
}

function ExpandableNames({
  title,
  names,
}: {
  title: string;
  names: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = names.length > 6;
  const visibleNames = expanded ? names : names.slice(0, 6);

  return (
    <section className="rounded-lg border border-border/50 bg-background/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-foreground">
          {title}
        </h3>
        {hasOverflow && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? "Collapse" : "Expand"}
          </Button>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {names.length === 0 ? "-" : visibleNames.join(", ")}
        {!expanded && hasOverflow ? "..." : ""}
      </p>
    </section>
  );
}

export function MovieDetailsModal({ movie, onClose }: MovieDetailsModalProps) {
  const isMasterpiece = isMasterpieceScore(movie.reviewScore);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-details-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close movie details"
        onClick={onClose}
      />

      <article
        className={cn(
          "relative flex h-[min(92dvh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-lg border bg-card shadow-2xl",
          isMasterpiece
            ? "border-amber-300/50 shadow-amber-500/10"
            : "border-border/60"
        )}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border/60 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Movie Details</p>
            <h1
              id="movie-details-title"
              className={cn(
                "truncate text-lg font-semibold tracking-tight",
                isMasterpiece && "text-amber-100"
              )}
            >
              {movie.displayTitle}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <Button type="button" variant="outline" size="sm" disabled>
              <Edit className="h-4 w-4" aria-hidden />
              Edit
            </Button>
            <Button type="button" variant="outline" size="sm" disabled>
              <RefreshCcw className="h-4 w-4" aria-hidden />
              Refresh Metadata
            </Button>
            <Button type="button" variant="destructive" size="sm" disabled>
              <Trash2 className="h-4 w-4" aria-hidden />
              Delete
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close movie details"
              onClick={onClose}
            >
              <X className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
            <aside className="space-y-4">
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.displayTitle}
                  className={cn(
                    "aspect-[2/3] w-full rounded-lg border object-cover",
                    isMasterpiece
                      ? "border-amber-300/50"
                      : "border-border/70"
                  )}
                />
              ) : (
                <div className="flex aspect-[2/3] w-full items-center justify-center rounded-lg border border-border/70 text-sm text-muted-foreground">
                  No Poster
                </div>
              )}

              <Button type="button" variant="outline" className="w-full" disabled>
                <ImageIcon className="h-4 w-4" aria-hidden />
                Change Poster
              </Button>
            </aside>

            <section className="min-w-0 space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <BestOfYearCrown active={movie.bestOfYear} showLabel />
                  <MovieBadge badgeId={movie.badgeId} />
                  <MovieStars stars={movie.stars} showValue size="md" />
                </div>

                <div>
                  <h2
                    className={cn(
                      "text-4xl font-semibold tracking-tight",
                      isMasterpiece && "text-amber-100"
                    )}
                  >
                    {movie.displayTitle}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {movie.originalTitle}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {movie.titlePt}
                  </p>
                </div>

                {isMasterpiece && (
                  <div className="rounded-lg border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
                    10/10 masterpiece
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  <MetadataItem label="Year" value={movie.year || "-"} />
                  <MetadataItem
                    label="Review"
                    value={formatReviewScore(movie.reviewScore)}
                  />
                  <MetadataItem
                    label="Stars"
                    value={<MovieStars stars={movie.stars} showValue />}
                  />
                  <MetadataItem
                    label="IMDb"
                    value={movie.imdbScore !== null ? movie.imdbScore : "-"}
                  />
                  <MetadataItem
                    label="Rotten"
                    value={
                      movie.rottenTomatoesScore !== null
                        ? `${movie.rottenTomatoesScore}%`
                        : "-"
                    }
                  />
                </div>
              </div>

              <Separator className="bg-border/60" />

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <MetadataItem label="Director" value={movie.director} />
                <MetadataItem label="Country" value={movie.country} />
                <MetadataItem label="Distributor" value={movie.distributor} />
                <MetadataItem
                  label="Runtime"
                  value={formatRuntime(movie.runtime)}
                />
                <MetadataItem
                  label="Release Date"
                  value={formatDate(movie.releaseDate)}
                />
                <MetadataItem
                  label="Watched Date"
                  value={formatDate(movie.watchedDate)}
                />
                <MetadataItem
                  label="Genres"
                  value={movie.genres.length ? movie.genres.join(", ") : "-"}
                />
              </div>

              <section className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Synopsis
                </h3>
                <p className="text-sm leading-7 text-foreground/90">
                  {movie.synopsis || "-"}
                </p>
              </section>

              <div className="grid gap-4 md:grid-cols-2">
                <ExpandableNames title="Cast" names={movie.cast} />
                <ExpandableNames title="Crew" names={movie.crew} />
              </div>

              <Separator className="bg-border/60" />

              <section className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Actions
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" disabled>
                    <ImageIcon className="h-4 w-4" aria-hidden />
                    Change Poster
                  </Button>
                  <Button type="button" variant="outline" disabled>
                    <ListPlus className="h-4 w-4" aria-hidden />
                    Manage Lists
                  </Button>
                </div>
              </section>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
</file>

<file path="components/movie/movie-stars.tsx">
"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatStars } from "@/lib/movie-engines/stars-engine";

type MovieStarsProps = {
  stars: number | null | undefined;
  className?: string;
  showValue?: boolean;
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
} as const;

export function MovieStars({
  stars,
  className,
  showValue = false,
  size = "sm",
}: MovieStarsProps) {
  const value =
    typeof stars === "number" && Number.isFinite(stars)
      ? Math.max(0, Math.min(5, stars))
      : 0;

  if (value <= 0) {
    return (
      <span
        className={cn("text-muted-foreground", className)}
        aria-label="No stars"
      >
        -
      </span>
    );
  }

  const label = formatStars(value);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-0.5 text-primary",
        className
      )}
      aria-label={`${label} stars`}
      title={`${label} stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const position = index + 1;
        const iconClassName = sizeClasses[size];

        if (position <= value) {
          return (
            <Star
              key={position}
              className={iconClassName}
              fill="currentColor"
              aria-hidden
            />
          );
        }

        return (
          <Star
            key={position}
            className={cn(iconClassName, "text-muted-foreground/35")}
            aria-hidden
          />
        );
      })}
      {showValue && (
        <span className="ml-1.5 text-xs font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </span>
  );
}
</file>

<file path="components/movies/.gitkeep">

</file>

<file path="components/providers/app-providers.tsx">
"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
</file>

<file path="components/providers/theme-provider.tsx">
"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useThemeStore } from "@/store/theme-store";

function VisualThemeSync() {
  const visualTheme = useThemeStore((s) => s.visualTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-visual-theme", visualTheme);
  }, [visualTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <VisualThemeSync />
      {children}
    </NextThemesProvider>
  );
}
</file>

<file path="components/settings/.gitkeep">

</file>

<file path="components/settings/visual-theme-settings.tsx">
"use client";

import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/theme-store";
import {
  VISUAL_THEMES,
  VISUAL_THEME_LABELS,
  type VisualTheme,
} from "@/types/theme";

export function VisualThemeSettings() {
  const visualTheme = useThemeStore((s) => s.visualTheme);
  const setVisualTheme = useThemeStore((s) => s.setVisualTheme);

  return (
    <div className="space-y-2">
      <Label>Visual theme</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {VISUAL_THEME_LABELS[visualTheme]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={visualTheme}
            onValueChange={(v) => setVisualTheme(v as VisualTheme)}
          >
            {VISUAL_THEMES.map((theme) => (
              <DropdownMenuRadioItem key={theme} value={theme}>
                {VISUAL_THEME_LABELS[theme]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
</file>

<file path="components/ui/button.tsx">
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-primary-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
</file>

<file path="components/ui/dropdown-menu.tsx">
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
    {...props}
  />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
</file>

<file path="components/ui/label.tsx">
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
</file>

<file path="components/ui/separator.tsx">
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
</file>

<file path="components/ui/tooltip.tsx">
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
</file>

<file path="eslint.config.mjs">
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
</file>

<file path="hooks/.gitkeep">

</file>

<file path="lib/add-movie/constants.ts">
/** Shown until OMDb / TMDB credits enrichment is implemented */
export const ADD_MOVIE_UNENRICHED_PLACEHOLDER = "—";

export const ADD_MOVIE_MIN_SEARCH_LENGTH = 2;
export const ADD_MOVIE_SEARCH_DEBOUNCE_MS = 400;
</file>

<file path="lib/add-movie/fetch-movie-details.ts">
export type MovieDetailsResponse = {
  ok: boolean;
  movie?: {
    tmdbId: number;

    title: string;
    originalTitle: string;
    titlePt: string;
    year: string;
    releaseDate: string;

    runtime: number | null;
    director: string;
    country: string;

    genres: string[];

    overview: string;

    imdbId?: string;
    imdbScore?: number | null;
    rottenTomatoesScore?: number | null;

    distributor?: string;

    cast?: string[];
    crew?: string[];
  };
  error?: string;
};

export async function fetchMovieDetails(tmdbId: number) {
  const response = await fetch(`/api/tmdb/movie/${tmdbId}`);

  const data = (await response.json()) as MovieDetailsResponse;

  if (!response.ok || !data.ok || !data.movie) {
    throw new Error(data.error ?? "Failed to load movie details.");
  }

  return data.movie;
}
</file>

<file path="lib/add-movie/review-scores.ts">
/** Review score options: 1 through 10 in 0.5 increments */
export const REVIEW_SCORE_OPTIONS = Array.from({ length: 19 }, (_, index) => {
  const value = 1 + index * 0.5;
  return {
    value: String(value),
    label: Number.isInteger(value) ? String(value) : value.toFixed(1),
  };
});
</file>

<file path="lib/add-movie/search-client.ts">
import type { TmdbSearchResponse } from "@/types/tmdb";
import type { AddMovieSearchResult } from "@/types/add-movie";

export type SearchMoviesResult =
  | { ok: true; results: AddMovieSearchResult[] }
  | { ok: false; error: string };

export async function searchMovies(
  query: string,
  signal?: AbortSignal
): Promise<SearchMoviesResult> {
  try {
    const params = new URLSearchParams({ q: query });
    const response = await fetch(`/api/tmdb/search?${params.toString()}`, {
      signal,
    });

    const data = (await response.json()) as TmdbSearchResponse;

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        error: data.ok === false ? data.error : "Search failed.",
      };
    }

    return { ok: true, results: data.results };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, error: "aborted" };
    }
    return {
      ok: false,
      error: "Unable to reach the movie search service. Try again.",
    };
  }
}
</file>

<file path="lib/api/response.ts">
export type ApiSuccess<T> = { ok: true; data: T };
export type ApiError = { ok: false; error: string; code?: string };
export type ApiResult<T> = ApiSuccess<T> | ApiError;

export function apiSuccess<T>(data: T): ApiSuccess<T> {
  return { ok: true, data };
}

export function apiError(error: string, code?: string): ApiError {
  return { ok: false, error, code };
}
</file>

<file path="lib/charts/theme.ts">
/** Recharts color tokens aligned with CSS variables */
export const chartColors = {
  primary: "var(--primary)",
  secondary: "var(--secondary)",
  accent: "var(--accent)",
  muted: "var(--muted-foreground)",
  border: "var(--border)",
} as const;

export const defaultChartMargin = { top: 8, right: 8, bottom: 0, left: 0 };
</file>

<file path="lib/db/prisma.ts">
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

/**
 * Prisma client — only instantiated when imported.
 * DATABASE_URL is required at runtime when the client is used, not at app boot.
 */
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}
</file>

<file path="lib/forms/use-zod-form.ts">
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

export function useZodForm<T extends FieldValues>(
  schema: z.ZodType<T>,
  options?: Omit<UseFormProps<T>, "resolver"> & {
    defaultValues?: DefaultValues<T>;
  }
): UseFormReturn<T> {
  return useForm<T>({
    ...options,
    // @hookform/resolvers typings target a different Zod major than this project
    resolver: zodResolver(schema as never),
  });
}
</file>

<file path="lib/motion.ts">
import type { Transition, Variants } from "framer-motion";

export const motionTransition: Transition = {
  duration: 0.25,
  ease: [0.25, 0.1, 0.25, 1],
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: motionTransition },
};

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: motionTransition },
};

export const slideInFromRight: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: motionTransition },
};

export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: motionTransition },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};
</file>

<file path="lib/movie-engines/best-of-year-crown.ts">
export type CrownableMovie = {
  id: string;
  watchedDate: string;
  bestOfYear: boolean;
  reviewScore?: number | null;
  createdAt?: string;
};

export function getWatchedYear(
  watchedDate: string | null | undefined
): string {
  const match = String(watchedDate ?? "").match(/^(\d{4})-\d{2}-\d{2}/);
  return match?.[1] ?? "";
}

export function findBestOfYearWinnerForWatchedYear<T extends CrownableMovie>(
  movies: T[],
  watchedDate: string | null | undefined,
  ignoredMovieId?: string
): T | null {
  const watchedYear = getWatchedYear(watchedDate);

  if (!watchedYear) return null;

  return (
    movies.find(
      (movie) =>
        movie.id !== ignoredMovieId &&
        movie.bestOfYear &&
        getWatchedYear(movie.watchedDate) === watchedYear
    ) ?? null
  );
}

export function enforceBestOfYearCrown<T extends CrownableMovie>(
  movies: T[],
  crownedMovie: T
): T[] {
  const watchedYear = getWatchedYear(crownedMovie.watchedDate);

  if (!crownedMovie.bestOfYear || !watchedYear) {
    return movies.map((movie) =>
      movie.id === crownedMovie.id && movie.bestOfYear
        ? ({ ...movie, bestOfYear: false } as T)
        : movie
    );
  }

  return movies.map((movie) => {
    const isSameMovie = movie.id === crownedMovie.id;
    const isSameWatchedYear = getWatchedYear(movie.watchedDate) === watchedYear;

    if (!isSameMovie && isSameWatchedYear && movie.bestOfYear) {
      return { ...movie, bestOfYear: false } as T;
    }

    return movie;
  });
}

export function dedupeBestOfYearCrowns<T extends CrownableMovie>(
  movies: T[]
): T[] {
  const crownedYears = new Set<string>();

  return movies.map((movie) => {
    const watchedYear = getWatchedYear(movie.watchedDate);

    if (!movie.bestOfYear || !watchedYear) {
      return movie.bestOfYear
        ? ({ ...movie, bestOfYear: false } as T)
        : movie;
    }

    if (crownedYears.has(watchedYear)) {
      return { ...movie, bestOfYear: false } as T;
    }

    crownedYears.add(watchedYear);
    return movie;
  });
}

export function getBestOfYearWinners<T extends CrownableMovie>(
  movies: T[]
): T[] {
  return movies
    .filter((movie) => movie.bestOfYear && getWatchedYear(movie.watchedDate))
    .sort((a, b) => {
      const yearDiff =
        Number(getWatchedYear(b.watchedDate)) -
        Number(getWatchedYear(a.watchedDate));

      if (yearDiff !== 0) return yearDiff;

      const scoreDiff = (b.reviewScore ?? 0) - (a.reviewScore ?? 0);

      if (scoreDiff !== 0) return scoreDiff;

      return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
    });
}
</file>

<file path="lib/movie-engines/stars-engine.ts">
export const MIN_REVIEW_SCORE = 1;
export const MAX_REVIEW_SCORE = 10;
export const MAX_STARS = 5;

export function calculateStars(
  reviewScore: number | null | undefined
): number {
  if (
    typeof reviewScore !== "number" ||
    !Number.isFinite(reviewScore) ||
    reviewScore <= 0
  ) {
    return 0;
  }

  if (reviewScore >= 9) return 5;
  if (reviewScore >= 7) return 4;
  if (reviewScore >= 5) return 3;
  if (reviewScore >= 2.5) return 2;
  return 1;
}

export function isMasterpieceScore(
  reviewScore: number | null | undefined
): boolean {
  return reviewScore === MAX_REVIEW_SCORE;
}

export function formatStars(stars: number | null | undefined): string {
  if (typeof stars !== "number" || !Number.isFinite(stars) || stars <= 0) {
    return "-";
  }

  return `${stars}/${MAX_STARS}`;
}

export function formatReviewScore(
  reviewScore: number | null | undefined
): string {
  if (
    typeof reviewScore !== "number" ||
    !Number.isFinite(reviewScore) ||
    reviewScore <= 0
  ) {
    return "-";
  }

  return `${Number.isInteger(reviewScore)
    ? reviewScore
    : reviewScore.toFixed(1)}/${MAX_REVIEW_SCORE}`;
}
</file>

<file path="lib/omdb/fetch-movie-ratings.ts">
import { getOmdbApiKey } from "@/lib/omdb/server-env";

export type OmdbRatings = {
  imdbId?: string;
  imdbScore: number | null;
  rottenTomatoesScore: number | null;
};

export async function fetchMovieRatings(
  imdbId: string
): Promise<OmdbRatings> {
  const apiKey = getOmdbApiKey();

  if (!apiKey) {
    return {
      imdbId,
      imdbScore: null,
      rottenTomatoesScore: null,
    };
  }

  const url =
    `https://www.omdbapi.com/?apikey=${apiKey}` +
    `&i=${imdbId}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      imdbId,
      imdbScore: null,
      rottenTomatoesScore: null,
    };
  }

  const data = await response.json();

  const imdbScore =
    typeof data.imdbRating === "string" &&
    data.imdbRating !== "N/A"
      ? Number(data.imdbRating)
      : null;

  const rottenRating = Array.isArray(data.Ratings)
    ? data.Ratings.find(
        (rating: { Source?: string }) =>
          rating.Source === "Rotten Tomatoes"
      )
    : undefined;

  const rottenTomatoesScore =
    rottenRating?.Value &&
    typeof rottenRating.Value === "string"
      ? Number(rottenRating.Value.replace("%", ""))
      : null;

  return {
    imdbId,
    imdbScore,
    rottenTomatoesScore,
  };
}
</file>

<file path="lib/omdb/server-env.ts">
import "server-only";

export function getOmdbApiKey(): string | undefined {
  const key = process.env.OMDB_API_KEY;

  if (typeof key !== "string") {
    return undefined;
  }

  const trimmed = key.trim();

  return trimmed.length > 0 ? trimmed : undefined;
}
</file>

<file path="lib/supabase/client.ts">
import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/config";

/** Browser Supabase client — requires env configuration (see lib/supabase/config.ts). */
export function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createBrowserClient(url, anonKey);
}
</file>

<file path="lib/supabase/config.ts">
/**
 * Supabase is optional until NEXT_PUBLIC_SUPABASE_URL and
 * NEXT_PUBLIC_SUPABASE_ANON_KEY are set in the environment.
 */

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return Boolean(url && anonKey);
}

export function getSupabaseEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
    );
  }

  return { url, anonKey };
}
</file>

<file path="lib/supabase/index.ts">
export { isSupabaseConfigured, getSupabaseEnv } from "@/lib/supabase/config";
export { createClient as createBrowserSupabaseClient } from "@/lib/supabase/client";
export { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
export { updateSession } from "@/lib/supabase/middleware";
export { ARCHIVE_STORAGE_BUCKET, getStorage } from "@/lib/supabase/storage";
</file>

<file path="lib/supabase/middleware.ts">
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/config";

export async function updateSession(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.next({ request });
  }

  const { url, anonKey } = getSupabaseEnv();
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: Parameters<typeof supabaseResponse.cookies.set>[2];
        }[]
      ) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  await supabase.auth.getUser();

  return supabaseResponse;
}
</file>

<file path="lib/supabase/server.ts">
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "@/lib/supabase/config";

/** Server Supabase client — requires env configuration (see lib/supabase/config.ts). */
export async function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: Parameters<typeof cookieStore.set>[2];
        }[]
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — ignore when middleware handles refresh.
        }
      },
    },
  });
}
</file>

<file path="lib/supabase/storage.ts">
import type { SupabaseClient } from "@supabase/supabase-js";

/** Storage bucket name — configure in Supabase when adding media assets */
export const ARCHIVE_STORAGE_BUCKET = "archive-media";

export function getStorage(client: SupabaseClient) {
  return client.storage.from(ARCHIVE_STORAGE_BUCKET);
}
</file>

<file path="lib/tmdb/config.ts">
export const TMDB_API_BASE = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const TMDB_POSTER_SIZES = {
  thumb: "w92",
  card: "w185",
  detail: "w342",
} as const;
</file>

<file path="lib/tmdb/map-movie-search.ts">
import type { TmdbMovieSearchItem } from "@/types/tmdb";

type TmdbApiMovie = {
  id: number;
  title?: string;
  original_title?: string;
  release_date?: string;
  poster_path?: string | null;
  overview?: string;
  original_language?: string;
};

export function mapTmdbApiMovie(movie: TmdbApiMovie): TmdbMovieSearchItem {
  const releaseYear = movie.release_date?.slice(0, 4) ?? "";

  return {
    tmdbId: movie.id,
    title: movie.title?.trim() || movie.original_title?.trim() || "Untitled",
    originalTitle: movie.original_title?.trim() || movie.title?.trim() || "",
    releaseYear,
    posterPath: movie.poster_path ?? null,
    overview: movie.overview?.trim() ?? "",
    originalLanguage: movie.original_language?.trim() ?? "",
  };
}
</file>

<file path="lib/tmdb/poster.ts">
import { TMDB_IMAGE_BASE, TMDB_POSTER_SIZES } from "@/lib/tmdb/config";

export function getTmdbPosterUrl(
  posterPath: string | null | undefined,
  size: keyof typeof TMDB_POSTER_SIZES = "thumb"
): string | undefined {
  if (!posterPath) return undefined;
  const path = posterPath.startsWith("/") ? posterPath : `/${posterPath}`;
  return `${TMDB_IMAGE_BASE}/${TMDB_POSTER_SIZES[size]}${path}`;
}
</file>

<file path="lib/tmdb/server-env.ts">
import "server-only";

/**
 * TMDB API key — server-only.
 * Loaded from .env.local as TMDB_API_KEY (restart dev server after changes).
 */
export function getTmdbApiKey(): string | undefined {
  const key = process.env.TMDB_API_KEY;
  if (typeof key !== "string") return undefined;
  const trimmed = key.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
</file>

<file path="lib/utils.ts">
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
</file>

<file path="lib/utils/csv.ts">
import Papa from "papaparse";

export type CsvParseResult<T> = Papa.ParseResult<T>;

/**
 * Foundation wrapper for Papa Parse — use when importing/exporting archive data.
 */
export function parseCsv<T = Record<string, string>>(
  input: string,
  options?: Papa.ParseConfig
): CsvParseResult<T> {
  return Papa.parse<T>(input, {
    header: true,
    skipEmptyLines: true,
    ...options,
  });
}

export function stringifyCsv<T extends Record<string, unknown>>(
  data: T[],
  options?: Papa.UnparseConfig
): string {
  return Papa.unparse(data, options);
}
</file>

<file path="lib/validators/base.ts">
import { z } from "zod";

/** Shared Zod primitives for forms and API validation */
export const idSchema = z.string().cuid();
export const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
</file>

<file path="middleware.ts">
import { type NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.next({ request });
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
</file>

<file path="next.config.ts">
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
</file>

<file path="package.json">
{
  "name": "horror-movie-archive",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.0.1",
    "@prisma/client": "^6.8.2",
    "@radix-ui/react-dropdown-menu": "^2.1.14",
    "@radix-ui/react-label": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.6",
    "@radix-ui/react-slot": "^1.2.2",
    "@radix-ui/react-tooltip": "^1.2.6",
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.49.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.12.1",
    "lucide-react": "^0.511.0",
    "next": "^15.3.2",
    "next-themes": "^0.4.6",
    "papaparse": "^5.5.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-hook-form": "^7.56.4",
    "recharts": "^2.15.3",
    "server-only": "^0.0.1",
    "tailwind-merge": "^3.3.0",
    "zod": "^3.25.28",
    "zustand": "^5.0.5"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.3.1",
    "@tailwindcss/postcss": "^4.1.7",
    "@types/node": "^22.15.21",
    "@types/papaparse": "^5.3.16",
    "@types/react": "^19.1.4",
    "@types/react-dom": "^19.1.5",
    "eslint": "^9.27.0",
    "eslint-config-next": "^15.3.2",
    "prisma": "^6.8.2",
    "tailwindcss": "^4.1.7",
    "tw-animate-css": "^1.3.0",
    "typescript": "^5.8.3"
  }
}
</file>

<file path="postcss.config.mjs">
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
</file>

<file path="prisma/schema.prisma">
// Horror Movie Archive — Prisma schema
// Add models when implementing features. Requires DATABASE_URL and DIRECT_URL.

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
</file>

<file path="README.md">
# Horror Movie Archive

Private, desktop-first horror movie archive — **foundation only** (no feature logic yet).

## Tech stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui (New York)
- Prisma ORM → Supabase Postgres
- Supabase Auth + Storage (client scaffolding)
- Zustand, React Hook Form, Zod
- Framer Motion, Recharts, Papa Parse

## Prerequisites

- Node.js 20+
- npm (or pnpm/yarn)
- Supabase project (optional until you wire database + auth)

The app **runs without Supabase or database configuration**. An empty `.env.local` is enough for local UI development. Set Supabase variables when you are ready to connect auth, storage, and Postgres.

## Setup commands

```bash
# 1. Go to project
cd C:\Users\Gean\horror-movie-archive

# 2. Install dependencies
npm install

# 3. Copy environment template
copy .env.example .env.local

# 4. Start dev server (works with an empty .env.local)
npm run dev

# 5. When connecting Supabase / Postgres, fill in .env.local (see below)
# 6. npm run db:generate && npm run db:push
```

### Optional: add more shadcn components later

```bash
npx shadcn@latest add input card dialog
```

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | App URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (server-only; do not expose) |
| `DATABASE_URL` | Prisma pooled connection (Supabase → Settings → Database) |
| `DIRECT_URL` | Direct connection for migrations (`?pgbouncer=true` on pool URL) |

**Supabase Prisma URLs:** use the Transaction pooler for `DATABASE_URL` and Session/direct for `DIRECT_URL`. See [Prisma + Supabase docs](https://supabase.com/docs/guides/database/prisma).

## Run instructions

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:push` | Sync schema to DB (dev) |
| `npm run db:migrate` | Create migration (prod workflow) |
| `npm run db:studio` | Prisma Studio |

## Folder architecture

```
app/                    # Next.js routes
  (app)/                # /library (default), /dashboard, /year-in-review, /lists, /settings
components/
  ui/                   # shadcn primitives
  layout/               # AppShell, Sidebar, TopBar
  providers/            # Theme + app providers
  settings/             # Visual theme settings
  library|lists/        # Feature UI (empty states until implemented)
lib/
  supabase/             # Browser, server, middleware clients
  db/                   # Prisma singleton
  validators/           # Zod schemas
  forms/                # useZodForm helper
  api/                  # API response helpers
  charts/               # Recharts tokens
  utils/                # csv (Papa Parse)
prisma/                 # schema.prisma
store/                  # Zustand (visual theme)
types/                  # Shared TS types
```

## Visual themes

Three visual themes (dark-only), managed from **Settings**:

- **Horror Archive** — default blood-accent archive look
- **VHS** — retro green/magenta with scanline overlay
- **Minimal** — neutral monochrome

Stored in Zustand (`hma-visual-theme`) and applied via `data-visual-theme` on `<html>`.

## What is intentionally not built

- Movie CRUD, lists, imports, or auth flows
- Fake seed data or business rules
- Mobile-first layouts or social features
</file>

<file path="store/theme-store.ts">
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VisualTheme } from "@/types/theme";
import { VISUAL_THEMES } from "@/types/theme";

type ThemeState = {
  visualTheme: VisualTheme;
  setVisualTheme: (theme: VisualTheme) => void;
};

function isVisualTheme(value: string): value is VisualTheme {
  return VISUAL_THEMES.includes(value as VisualTheme);
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      visualTheme: "horror-archive",
      setVisualTheme: (visualTheme) => set({ visualTheme }),
    }),
    {
      name: "hma-visual-theme",
      partialize: (state) => ({ visualTheme: state.visualTheme }),
      onRehydrateStorage: () => (state) => {
        if (state && !isVisualTheme(state.visualTheme)) {
          state.visualTheme = "horror-archive";
        }
      },
    }
  )
);
</file>

<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
</file>

<file path="types/index.ts">
export type { VisualTheme } from "./theme";
export { VISUAL_THEMES, VISUAL_THEME_LABELS } from "./theme";
export type { LibraryViewMode } from "./library";
export { LIBRARY_VIEW_MODES } from "./library";
export type {
  AddMovieFormValues,
  AddMovieMovieDraft,
  AddMoviePanelState,
  AddMovieSearchResult,
} from "./add-movie";
export { ADD_MOVIE_PANEL_STATES } from "./add-movie";
</file>

<file path="types/theme.ts">
export const VISUAL_THEMES = [
  "horror-archive",
  "vhs",
  "minimal",
] as const;

export type VisualTheme = (typeof VISUAL_THEMES)[number];

export const VISUAL_THEME_LABELS: Record<VisualTheme, string> = {
  "horror-archive": "Horror Archive",
  vhs: "VHS",
  minimal: "Minimal",
};
</file>

<file path="types/tmdb.ts">
/** TMDB movie search item — returned by /api/tmdb/search */
export type TmdbMovieSearchItem = {
  tmdbId: number;
  title: string;
  originalTitle: string;
  releaseYear: string;
  posterPath: string | null;
  overview: string;
  originalLanguage: string;
};

export type TmdbSearchSuccessResponse = {
  ok: true;
  results: TmdbMovieSearchItem[];
};

export type TmdbSearchErrorResponse = {
  ok: false;
  error: string;
};

export type TmdbSearchResponse =
  | TmdbSearchSuccessResponse
  | TmdbSearchErrorResponse;
</file>

<file path=".env.example">
# App (optional for local dev)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# TMDB (required for Add Movie search)
TMDB_API_KEY=

# OMDb (optional - enriches IMDb and Rotten Tomatoes ratings)
OMDB_API_KEY=

# Supabase (optional — app boots without these)
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=

# Database (optional — required only when using Prisma against Postgres)
# DATABASE_URL=
# DIRECT_URL=
</file>

<file path="app/(app)/year-in-review/page.tsx">
"use client";

import { useMemo } from "react";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { getBestOfYearWinners } from "@/lib/movie-engines/best-of-year-crown";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";
import { useMovieStore } from "@/store/movie-store";

export default function YearInReviewPage() {
  const movies = useMovieStore((state) => state.movies);
  const winners = useMemo(() => getBestOfYearWinners(movies), [movies]);

  return (
    <div className="flex flex-col gap-6">
      <header className="border-b border-border/60 pb-5">
        <h2 className="text-2xl font-semibold tracking-tight">
          Year in Review
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Best-of-year crowns across the archive.
        </p>
      </header>

      {winners.length === 0 ? (
        <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6 text-center">
          <p className="text-sm text-muted-foreground">
            No best-of-year crowns yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {winners.map((movie) => (
            <article
              key={movie.tmdbId}
              className="flex gap-4 rounded-lg border border-border/50 bg-card/20 p-4"
            >
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.displayTitle}
                  className="h-28 w-20 shrink-0 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-28 w-20 shrink-0 items-center justify-center rounded-md border border-border/50 text-xs text-muted-foreground">
                  No Poster
                </div>
              )}

              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <BestOfYearCrown active={movie.bestOfYear} showLabel />
                  <span className="text-sm font-medium text-muted-foreground">
                    {movie.year}
                  </span>
                </div>

                <div>
                  <h3 className="truncate text-lg font-semibold tracking-tight">
                    {movie.displayTitle}
                  </h3>
                  <p className="truncate text-sm text-muted-foreground">
                    {movie.director}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <MovieStars stars={movie.stars} showValue />
                  <MovieBadge badgeId={movie.badgeId} />
                  <span className="text-xs text-muted-foreground">
                    Review {formatReviewScore(movie.reviewScore)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
</file>

<file path="components/add-movie/add-movie-panel-content.tsx">
"use client";

import { AddMovieSearchField } from "@/components/add-movie/add-movie-search-field";
import { ConfirmationState } from "@/components/add-movie/states/confirmation-state";
import { IdleState } from "@/components/add-movie/states/idle-state";
import { ResultsState } from "@/components/add-movie/states/results-state";
import { SearchingState } from "@/components/add-movie/states/searching-state";
import { SuccessState } from "@/components/add-movie/states/success-state";
import type {
  DuplicateMovieMatch,
  SaveMovieOptions,
} from "@/components/add-movie/use-add-movie-flow";
import type { LibraryMovie } from "@/store/movie-store";
import type {
  AddMovieFormValues,
  AddMovieMovieDraft,
  AddMoviePanelState,
  AddMovieSearchResult,
} from "@/types/add-movie";

export type AddMoviePanelContentProps = {
  panelState: AddMoviePanelState;
  query: string;
  onQueryChange: (value: string) => void;
  showSearchField: boolean;
  queryTooShort: boolean;
  results: AddMovieSearchResult[];
  searchError: string | null;
  selectedMovie: AddMovieMovieDraft | null;
  formValues: AddMovieFormValues;
  duplicateMatch: DuplicateMovieMatch | null;
  bestOfYearReplacement: LibraryMovie | null;
  saveError: string | null;
  onFormChange: (patch: Partial<AddMovieFormValues>) => void;
  onSelectResult: (result: AddMovieSearchResult) => void;
  onBack: () => void;
  onSave: (options?: SaveMovieOptions) => void;
  onAddAnother: () => void;
  onViewMovie: () => void;
  onOpenExistingDuplicate: () => void;
};

export function AddMoviePanelContent({
  panelState,
  query,
  onQueryChange,
  showSearchField,
  queryTooShort,
  results,
  searchError,
  selectedMovie,
  formValues,
  duplicateMatch,
  bestOfYearReplacement,
  saveError,
  onFormChange,
  onSelectResult,
  onBack,
  onSave,
  onAddAnother,
  onViewMovie,
  onOpenExistingDuplicate,
}: AddMoviePanelContentProps) {
  if (panelState === "success" && selectedMovie) {
    return (
      <SuccessState
        movieTitle={selectedMovie.displayTitle}
        onAddAnother={onAddAnother}
        onViewMovie={onViewMovie}
      />
    );
  }

  if (panelState === "confirmation" && selectedMovie) {
    return (
      <ConfirmationState
        movie={selectedMovie}
        formValues={formValues}
        duplicateMatch={duplicateMatch}
        bestOfYearReplacement={bestOfYearReplacement}
        saveError={saveError}
        onFormChange={onFormChange}
        onBack={onBack}
        onSave={onSave}
        onOpenExistingDuplicate={onOpenExistingDuplicate}
      />
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      {showSearchField && (
        <AddMovieSearchField query={query} onQueryChange={onQueryChange} />
      )}

      {panelState === "idle" && <IdleState queryTooShort={queryTooShort} />}
      {panelState === "searching" && <SearchingState />}
      {panelState === "results" && (
        <ResultsState
          results={results}
          searchError={searchError}
          onSelect={onSelectResult}
        />
      )}
    </div>
  );
}
</file>

<file path="components/add-movie/states/confirmation-state.tsx">
"use client";

import { REVIEW_SCORE_OPTIONS } from "@/lib/add-movie/review-scores";
import type {
  DuplicateMovieMatch,
  SaveMovieOptions,
} from "@/components/add-movie/use-add-movie-flow";
import type { AddMovieFormValues, AddMovieMovieDraft } from "@/types/add-movie";
import type { LibraryMovie } from "@/store/movie-store";
import { AddMoviePoster } from "@/components/add-movie/add-movie-poster";
import { DuplicateWarning } from "@/components/add-movie/states/duplicate-warning";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type ConfirmationStateProps = {
  movie: AddMovieMovieDraft;
  formValues: AddMovieFormValues;
  duplicateMatch: DuplicateMovieMatch | null;
  bestOfYearReplacement: LibraryMovie | null;
  saveError: string | null;
  onFormChange: (patch: Partial<AddMovieFormValues>) => void;
  onBack: () => void;
  onSave: (options?: SaveMovieOptions) => void;
  onOpenExistingDuplicate: () => void;
};

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="leading-relaxed text-foreground">{value}</span>
    </div>
  );
}

export function ConfirmationState({
  movie,
  formValues,
  duplicateMatch,
  bestOfYearReplacement,
  saveError,
  onFormChange,
  onBack,
  onSave,
  onOpenExistingDuplicate,
}: ConfirmationStateProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="flex gap-4">
        <AddMoviePoster
          posterUrl={movie.posterUrl}
          title={movie.displayTitle}
          className="h-28 w-20"
          sizes="160px"
        />
        <div className="min-w-0 flex-1 space-y-2">
          <h3 className="text-base font-semibold leading-tight tracking-tight">
            {movie.displayTitle}
          </h3>
          <div className="space-y-1.5">
            <MetadataRow label="Original" value={movie.originalTitle} />
            <MetadataRow label="Title PT" value={movie.titlePt} />
            <MetadataRow label="Year" value={movie.year} />
            <MetadataRow label="Director" value={movie.director} />
            <MetadataRow
              label="Runtime"
              value={movie.runtime ? `${movie.runtime} min` : "-"}
            />
          </div>
        </div>
      </div>

      <Separator className="bg-border/60" />

      <section className="space-y-4">
        <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Personal Data
        </h4>

        <div className="space-y-2">
          <Label htmlFor="add-movie-review-score">Review score</Label>
          <select
            id="add-movie-review-score"
            value={formValues.reviewScore}
            onChange={(e) => onFormChange({ reviewScore: e.target.value })}
            className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select score…</option>
            {REVIEW_SCORE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={formValues.bestOfYear}
            onChange={(e) => onFormChange({ bestOfYear: e.target.checked })}
            className="h-4 w-4 rounded border-input accent-primary"
          />
          <span>Best of Year</span>
        </label>

        {saveError && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {saveError}
          </p>
        )}

        <DuplicateWarning
          duplicateMatch={duplicateMatch}
          bestOfYearReplacement={bestOfYearReplacement}
          onOpenExistingDuplicate={onOpenExistingDuplicate}
          onAddAnyway={() => onSave({ allowDuplicate: true })}
          onConfirmBestOfYearReplacement={() =>
            onSave({
              allowDuplicate: true,
              confirmBestOfYearReplacement: true,
            })
          }
        />

        <div className="space-y-2">
          <Label htmlFor="add-movie-watched-date">
            Watched Date{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <input
            id="add-movie-watched-date"
            type="date"
            value={formValues.watchedDate}
            onChange={(e) => onFormChange({ watchedDate: e.target.value })}
            className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </section>

      <div className="mt-auto flex gap-2 border-t border-border/60 pt-5">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button type="button" className="flex-1" onClick={() => onSave()}>
          Save Movie
        </Button>
      </div>
    </div>
  );
}
</file>

<file path="components/layout/sidebar.tsx">
"use client";

import { motion } from "framer-motion";
import {
  CalendarRange,
  LayoutDashboard,
  Library,
  List,
  Settings,
  Skull,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeIn, slideInFromLeft } from "@/lib/motion";
import { useMovieStore } from "@/store/movie-store";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/library", label: "Library", icon: Library },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/year-in-review", label: "Year in Review", icon: CalendarRange },
  { href: "/lists", label: "Lists", icon: List },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const movieCount = useMovieStore((state) => state.movies.length);

  return (
    <motion.aside
      variants={slideInFromLeft}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex h-full w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
      )}
    >
      <div className="flex items-center gap-2 px-4 py-5">
        <Skull className="h-5 w-5 text-primary" aria-hidden />
        <motion.div variants={fadeIn}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Private Archive
          </p>
          <h1 className="text-sm font-semibold leading-tight">Horror Movie</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {movieCount} {movieCount === 1 ? "Movie" : "Movies"}
          </p>
        </motion.div>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex flex-1 flex-col gap-0.5 p-2" aria-label="Main">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
            {label}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}
</file>

<file path="components/library/library-content.tsx">
"use client";

import { LibraryGridView } from "@/components/library/library-grid-view";
import { LibraryListView } from "@/components/library/library-list-view";
import type { LibraryMovie } from "@/store/movie-store";
import type {
  LibrarySortKey,
  LibrarySortState,
  LibraryViewMode,
} from "@/types/library";

type LibraryContentProps = {
  viewMode: LibraryViewMode;
  movies: LibraryMovie[];
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
};

export function LibraryContent({
  viewMode,
  movies,
  onAddMovie,
  onOpenMovie,
  sort,
  onSortChange,
}: LibraryContentProps) {
  if (viewMode === "grid") {
    return (
      <LibraryGridView
        movies={movies}
        onAddMovie={onAddMovie}
        onOpenMovie={onOpenMovie}
      />
    );
  }

  return (
    <LibraryListView
      movies={movies}
      onAddMovie={onAddMovie}
      onOpenMovie={onOpenMovie}
      sort={sort}
      onSortChange={onSortChange}
    />
  );
}
</file>

<file path="components/library/library-empty-state.tsx">
"use client";

import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LibraryEmptyStateProps = {
  onAddFirstMovie: () => void;
  variant?: "embedded" | "standalone";
  className?: string;
};

export function LibraryEmptyState({
  onAddFirstMovie,
  variant = "standalone",
  className,
}: LibraryEmptyStateProps) {
  const isEmbedded = variant === "embedded";

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex flex-col items-center justify-center text-center",
        isEmbedded ? "min-h-[min(52vh,520px)] px-6 py-16" : "min-h-[480px]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div
          className={cn(
            "library-empty-glow rounded-full",
            isEmbedded
              ? "h-[min(360px,80%)] w-[min(480px,90%)]"
              : "h-[min(420px,70%)] w-[min(520px,90%)]"
          )}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-md">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border/80 bg-card/60 shadow-inner">
          <Film className="h-6 w-6 text-primary/80" aria-hidden />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Add your first movie
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Add your first movie to begin building your archive.
        </p>
        <Button
          type="button"
          size="lg"
          className="mt-8 min-w-[180px]"
          onClick={onAddFirstMovie}
        >
          Add Movie
        </Button>
      </div>
    </motion.div>
  );
}
</file>

<file path="components/library/library-grid-view.tsx">
"use client";

import { Film } from "lucide-react";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { isMasterpieceScore } from "@/lib/movie-engines/stars-engine";
import { cn } from "@/lib/utils";
import type { LibraryMovie } from "@/store/movie-store";

type LibraryGridViewProps = {
  movies: LibraryMovie[];
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
};

export function LibraryGridView({
  movies,
  onAddMovie,
  onOpenMovie,
}: LibraryGridViewProps) {
  if (movies.length === 0) {
    return (
      <div className="flex min-h-[420px] flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6">
        <Film
          className="mb-4 h-8 w-8 text-muted-foreground/40"
          aria-hidden
        />
        <p className="text-sm font-medium text-muted-foreground">
          Add your first movie
        </p>
        <button
          type="button"
          onClick={onAddMovie}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Add Movie
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-5 pb-2">
      {movies.map((movie) => {
        const isMasterpiece = isMasterpieceScore(movie.reviewScore);

        return (
          <button
            key={movie.id}
            type="button"
            onClick={() => onOpenMovie(movie.id)}
            className={cn(
              "group relative flex min-w-0 flex-col rounded-lg border bg-card/20 p-2 text-left transition-all duration-200",
              "hover:-translate-y-1 hover:bg-card/50 hover:shadow-xl",
              isMasterpiece
                ? "border-amber-300/50 shadow-amber-500/10 hover:shadow-amber-500/20"
                : "border-border/50 hover:border-primary/40 hover:shadow-primary/10"
            )}
          >
            <div className="overflow-hidden rounded-md border border-border/50 bg-background/50">
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.displayTitle}
                  className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]"
                />
              ) : (
                <div className="flex aspect-[2/3] w-full items-center justify-center text-muted-foreground">
                  <Film className="h-8 w-8 opacity-50" aria-hidden />
                </div>
              )}
            </div>

            <div className="min-w-0 space-y-2 px-1 pb-1 pt-3">
              <h3
                className={cn(
                  "line-clamp-2 text-sm font-semibold leading-snug text-foreground",
                  isMasterpiece && "text-amber-100"
                )}
              >
                {movie.displayTitle}
              </h3>

              <div className="flex min-h-7 flex-wrap items-center gap-1.5">
                <span className="text-xs text-muted-foreground">
                  {movie.year}
                </span>
                <BestOfYearCrown active={movie.bestOfYear} />
              </div>

              <div className="flex items-center justify-between gap-2">
                <MovieStars stars={movie.stars} />
                <span className="text-xs text-muted-foreground">
                  IMDb {movie.imdbScore !== null ? movie.imdbScore : "-"}
                </span>
              </div>

              <MovieBadge badgeId={movie.badgeId} className="max-w-full" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
</file>

<file path="components/library/library-header.tsx">
"use client";

import { Plus, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LibrarySearch } from "@/components/library/library-search";
import { LibraryViewToggle } from "@/components/library/library-view-toggle";
import type {
  LibraryFilterOptions,
  LibraryFilters,
  LibrarySortDirection,
  LibrarySortKey,
  LibrarySortState,
  LibraryViewMode,
} from "@/types/library";

type LibraryHeaderProps = {
  viewMode: LibraryViewMode;
  onViewModeChange: (mode: LibraryViewMode) => void;
  movieCount: number;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  isSearchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey, direction?: LibrarySortDirection) => void;
  isFilterPanelOpen: boolean;
  activeFilterCount: number;
  filters: LibraryFilters;
  filterOptions: LibraryFilterOptions;
  onFilterPanelOpenChange: (open: boolean) => void;
  onFilterChange: <K extends keyof LibraryFilters>(
    key: K,
    value: LibraryFilters[K]
  ) => void;
  onClearFilters: () => void;
  onAddMovie: () => void;
};

const sortLabels: Record<LibrarySortKey, string> = {
  title: "Title",
  year: "Year",
  imdb: "IMDb",
  rotten: "Rotten Tomatoes",
  review: "Personal Review",
  watchedDate: "Watched Date",
};

export function LibraryHeader({
  viewMode,
  onViewModeChange,
  movieCount,
  searchQuery,
  onSearchQueryChange,
  isSearchOpen,
  onSearchOpenChange,
  sort,
  onSortChange,
  isFilterPanelOpen,
  activeFilterCount,
  filters,
  filterOptions,
  onFilterPanelOpenChange,
  onFilterChange,
  onClearFilters,
  onAddMovie,
}: LibraryHeaderProps) {
  return (
    <header className="sticky top-0 z-20 shrink-0 border-b border-border/60 bg-background/95 pb-5 backdrop-blur">
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Horror Movie List
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {movieCount} {movieCount === 1 ? "Movie" : "Movies"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <LibrarySearch
            isOpen={isSearchOpen}
            onOpenChange={onSearchOpenChange}
            value={searchQuery}
            onValueChange={onSearchQueryChange}
          />
          <LibraryViewToggle
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                Sort: {sortLabels[sort.key]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuRadioGroup
                value={`${sort.key}:${sort.direction}`}
                onValueChange={(value) => {
                  const [key, direction] = value.split(":") as [
                    LibrarySortKey,
                    LibrarySortDirection,
                  ];
                  onSortChange(key, direction);
                }}
              >
                {(
                  [
                    "title",
                    "year",
                    "imdb",
                    "rotten",
                    "review",
                    "watchedDate",
                  ] as LibrarySortKey[]
                ).flatMap((key) => [
                  <DropdownMenuRadioItem
                    key={`${key}:asc`}
                    value={`${key}:asc`}
                  >
                    {sortLabels[key]} ascending
                  </DropdownMenuRadioItem>,
                  <DropdownMenuRadioItem
                    key={`${key}:desc`}
                    value={`${key}:desc`}
                  >
                    {sortLabels[key]} descending
                  </DropdownMenuRadioItem>,
                ])}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                onClick={() => onFilterPanelOpenChange(!isFilterPanelOpen)}
                aria-label="Filters"
                aria-expanded={isFilterPanelOpen}
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden />
                {activeFilterCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-semibold text-black">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Filters</TooltipContent>
          </Tooltip>
          <Button type="button" onClick={onAddMovie} className="gap-2">
            <Plus className="h-4 w-4" aria-hidden />
            Add Movie
          </Button>
        </div>
      </div>

      {isFilterPanelOpen && (
        <div className="mt-4 rounded-lg border border-border/60 bg-card/40 p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Genre</span>
              <select
                value={filters.genre}
                onChange={(event) =>
                  onFilterChange("genre", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All genres</option>
                {filterOptions.genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Country</span>
              <select
                value={filters.country}
                onChange={(event) =>
                  onFilterChange("country", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All countries</option>
                {filterOptions.countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Distributor</span>
              <select
                value={filters.distributor}
                onChange={(event) =>
                  onFilterChange("distributor", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All distributors</option>
                {filterOptions.distributors.map((distributor) => (
                  <option key={distributor} value={distributor}>
                    {distributor}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Badge</span>
              <select
                value={filters.badgeId}
                onChange={(event) =>
                  onFilterChange("badgeId", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All badges</option>
                {filterOptions.badges.map((badgeId) => (
                  <option key={badgeId} value={badgeId}>
                    {badgeId}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Stars</span>
              <select
                value={filters.stars}
                onChange={(event) =>
                  onFilterChange("stars", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All stars</option>
                {filterOptions.stars.map((stars) => (
                  <option key={stars} value={stars}>
                    {stars} {stars === "1" ? "Star" : "Stars"}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end gap-2">
              <label className="flex h-9 flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={filters.bestOfYear}
                  onChange={(event) =>
                    onFilterChange("bestOfYear", event.target.checked)
                  }
                  className="h-4 w-4 accent-amber-400"
                />
                Best Of Year
              </label>
              {activeFilterCount > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={onClearFilters}
                  aria-label="Clear filters"
                >
                  <X className="h-4 w-4" aria-hidden />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
</file>

<file path="components/library/library-list-table-header.tsx">
"use client";

import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LIBRARY_LIST_COLUMNS } from "@/lib/library/list-columns";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListTableHeaderProps = {
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
};

export function LibraryListTableHeader({
  sort,
  onSortChange,
}: LibraryListTableHeaderProps) {
  return (
    <thead className="library-list-thead">
      <tr>
        {LIBRARY_LIST_COLUMNS.map((column) => (
          <th
            key={column.id}
            scope="col"
            aria-sort={
              column.sortKey && sort.key === column.sortKey
                ? sort.direction === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            className={cn(
              "library-list-th",
              column.minWidth,
              column.sortable && "library-list-th--sortable"
            )}
          >
            <button
              type="button"
              disabled={!column.sortable || !column.sortKey}
              onClick={() => column.sortKey && onSortChange(column.sortKey)}
              className={cn(
                "inline-flex items-center justify-center gap-1.5",
                column.sortable &&
                  "cursor-pointer rounded-sm transition-colors hover:text-foreground",
                !column.sortable && "cursor-default"
              )}
            >
              <span>{column.label}</span>
              {column.sortable && (
                <ArrowUpDown
                  className={cn(
                    "h-3 w-3 shrink-0",
                    column.sortKey && sort.key === column.sortKey
                      ? "opacity-90"
                      : "opacity-40"
                  )}
                  aria-hidden
                />
              )}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
}
</file>

<file path="components/library/library-search.tsx">
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
              value={value}
              onChange={(event) => onValueChange(event.target.value)}
              placeholder="Search archive..."
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
</file>

<file path="components/library/library-shell.tsx">
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AddMovieSidePanel } from "@/components/add-movie/add-movie-side-panel";
import { LibraryHeader } from "@/components/library/library-header";
import { LibraryContent } from "@/components/library/library-content";
import { MovieDetailsModal } from "@/components/movie/movie-details-modal";
import { Button } from "@/components/ui/button";
import { useMovieStore } from "@/store/movie-store";
import type { LibraryMovie } from "@/store/movie-store";
import {
  DEFAULT_LIBRARY_FILTERS,
  DEFAULT_LIBRARY_SORT,
  LIBRARY_PAGE_SIZE,
  LIBRARY_SORT_KEYS,
  type LibraryFilterOptions,
  type LibraryFilters,
  type LibrarySortDirection,
  type LibrarySortKey,
  type LibrarySortState,
  type LibraryViewMode,
} from "@/types/library";

const LIBRARY_SORT_STORAGE_KEY = "hma-library-sort";

function normalizeSearchValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function movieMatchesSearch(movie: LibraryMovie, query: string): boolean {
  const normalizedQuery = normalizeSearchValue(query);
  if (!normalizedQuery) return true;

  const searchableValues = [
    movie.displayTitle,
    movie.originalTitle,
    movie.titlePt,
    movie.director,
    movie.distributor,
    ...movie.cast,
    ...movie.genres,
  ];

  return searchableValues.some((value) =>
    normalizeSearchValue(value).includes(normalizedQuery)
  );
}

function movieMatchesFilters(
  movie: LibraryMovie,
  filters: LibraryFilters
): boolean {
  if (filters.genre && !movie.genres.includes(filters.genre)) return false;
  if (filters.country && movie.country !== filters.country) return false;
  if (filters.distributor && movie.distributor !== filters.distributor) {
    return false;
  }
  if (filters.badgeId && movie.badgeId !== filters.badgeId) return false;
  if (filters.stars && String(movie.stars) !== filters.stars) return false;
  if (filters.bestOfYear && !movie.bestOfYear) return false;

  return true;
}

function compareStrings(a: string, b: string): number {
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

function compareNumbers(a: number | null, b: number | null): number {
  const left = a ?? Number.NEGATIVE_INFINITY;
  const right = b ?? Number.NEGATIVE_INFINITY;
  return left - right;
}

function compareBySortKey(
  a: LibraryMovie,
  b: LibraryMovie,
  key: LibrarySortKey
): number {
  switch (key) {
    case "title":
      return compareStrings(a.displayTitle, b.displayTitle);
    case "year":
      return compareStrings(a.year, b.year);
    case "imdb":
      return compareNumbers(a.imdbScore, b.imdbScore);
    case "rotten":
      return compareNumbers(a.rottenTomatoesScore, b.rottenTomatoesScore);
    case "review":
      return compareNumbers(a.reviewScore, b.reviewScore);
    case "watchedDate":
      return compareStrings(a.watchedDate, b.watchedDate);
  }
}

function isMissingSortValue(movie: LibraryMovie, key: LibrarySortKey): boolean {
  switch (key) {
    case "title":
      return !movie.displayTitle;
    case "year":
      return !movie.year;
    case "imdb":
      return movie.imdbScore === null;
    case "rotten":
      return movie.rottenTomatoesScore === null;
    case "review":
      return movie.reviewScore === null;
    case "watchedDate":
      return !movie.watchedDate;
  }
}

function isLibrarySortState(value: unknown): value is LibrarySortState {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<LibrarySortState>;
  return (
    typeof candidate.key === "string" &&
    LIBRARY_SORT_KEYS.includes(candidate.key as LibrarySortKey) &&
    (candidate.direction === "asc" || candidate.direction === "desc")
  );
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)))
    .sort((a, b) => compareStrings(a, b));
}

function getActiveFilterCount(filters: LibraryFilters): number {
  return [
    filters.genre,
    filters.country,
    filters.distributor,
    filters.badgeId,
    filters.stars,
    filters.bestOfYear,
  ].filter(Boolean).length;
}

export function LibraryShell() {
  const movies = useMovieStore((state) => state.movies);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<LibraryViewMode>("list");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<LibraryFilters>(
    DEFAULT_LIBRARY_FILTERS
  );
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] =
    useState<LibrarySortState>(DEFAULT_LIBRARY_SORT);
  const [savedScrollTop, setSavedScrollTop] = useState(0);

  useEffect(() => {
    const rawSort = window.localStorage.getItem(LIBRARY_SORT_STORAGE_KEY);
    if (!rawSort) return;

    try {
      const parsed = JSON.parse(rawSort) as unknown;
      if (isLibrarySortState(parsed)) {
        setSort(parsed);
      }
    } catch {
      window.localStorage.removeItem(LIBRARY_SORT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      LIBRARY_SORT_STORAGE_KEY,
      JSON.stringify(sort)
    );
  }, [sort]);

  const handleAddMovie = useCallback(() => {
    setIsAddMovieOpen(true);
  }, []);

  const handleFilterChange = useCallback(
    <K extends keyof LibraryFilters,>(key: K, value: LibraryFilters[K]) => {
      setFilters((current) => ({ ...current, [key]: value }));
      setCurrentPage(1);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_LIBRARY_FILTERS);
    setCurrentPage(1);
  }, []);

  const handleSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback(
    (key: LibrarySortKey, direction?: LibrarySortDirection) => {
      setSort((current) => {
        const nextDirection =
          direction ??
          (current.key === key && current.direction === "asc"
            ? "desc"
            : "asc");

        return { key, direction: nextDirection };
      });
      setCurrentPage(1);
    },
    []
  );

  const filterOptions = useMemo<LibraryFilterOptions>(
    () => ({
      genres: uniqueSorted(movies.flatMap((movie) => movie.genres)),
      countries: uniqueSorted(movies.map((movie) => movie.country)),
      distributors: uniqueSorted(movies.map((movie) => movie.distributor)),
      badges: uniqueSorted(
        movies
          .map((movie) => movie.badgeId ?? "")
          .filter((badgeId) => /^badge\d+$/.test(badgeId))
      ),
      stars: uniqueSorted(
        movies
          .map((movie) => (movie.stars > 0 ? String(movie.stars) : ""))
          .filter(Boolean)
      ).sort((a, b) => Number(b) - Number(a)),
    }),
    [movies]
  );

  const activeFilterCount = getActiveFilterCount(filters);

  const filteredMovies = useMemo(
    () =>
      movies.filter(
        (movie) =>
          movieMatchesSearch(movie, searchQuery) &&
          movieMatchesFilters(movie, filters)
      ),
    [filters, movies, searchQuery]
  );

  const sortedMovies = useMemo(() => {
    return [...filteredMovies].sort((a, b) => {
      const aMissing = isMissingSortValue(a, sort.key);
      const bMissing = isMissingSortValue(b, sort.key);

      if (aMissing !== bMissing) {
        return aMissing ? 1 : -1;
      }

      const sortResult = compareBySortKey(a, b, sort.key);
      const directedResult =
        sort.direction === "asc" ? sortResult : -sortResult;

      if (directedResult !== 0) return directedResult;

      return compareStrings(a.displayTitle, b.displayTitle);
    });
  }, [filteredMovies, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedMovies.length / LIBRARY_PAGE_SIZE)
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * LIBRARY_PAGE_SIZE;
  const paginatedMovies = sortedMovies.slice(
    startIndex,
    startIndex + LIBRARY_PAGE_SIZE
  );

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage]);

  const selectedMovie = selectedMovieId
    ? movies.find((movie) => movie.id === selectedMovieId) ?? null
    : null;

  const handleOpenMovie = useCallback((id: string) => {
    setSavedScrollTop(scrollRef.current?.scrollTop ?? 0);
    setSelectedMovieId(id);
  }, []);

  const handleCloseMovie = useCallback(() => {
    setSelectedMovieId(null);
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = savedScrollTop;
      }
    });
  }, [savedScrollTop]);

  return (
    <>
      <div className="flex min-h-[calc(100dvh-7.5rem)] flex-col">
        <LibraryHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          movieCount={movies.length}
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          isSearchOpen={isSearchOpen}
          onSearchOpenChange={setIsSearchOpen}
          sort={sort}
          onSortChange={handleSortChange}
          isFilterPanelOpen={isFilterPanelOpen}
          activeFilterCount={activeFilterCount}
          filters={filters}
          filterOptions={filterOptions}
          onFilterPanelOpenChange={setIsFilterPanelOpen}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onAddMovie={handleAddMovie}
        />

        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col overflow-auto pt-6"
        >
          {movies.length > 0 && sortedMovies.length === 0 ? (
            <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6 text-center">
              <p className="text-sm text-muted-foreground">
                No movies match this search or filter.
              </p>
            </div>
          ) : (
            <LibraryContent
              viewMode={viewMode}
              movies={paginatedMovies}
              onAddMovie={handleAddMovie}
              onOpenMovie={handleOpenMovie}
              sort={sort}
              onSortChange={handleSortChange}
            />
          )}

          {sortedMovies.length > LIBRARY_PAGE_SIZE && (
            <div className="mt-4 flex shrink-0 items-center justify-between border-t border-border/60 pt-4">
              <p className="text-sm text-muted-foreground">
                Page {safeCurrentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safeCurrentPage <= 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddMovieSidePanel
        open={isAddMovieOpen}
        onOpenChange={setIsAddMovieOpen}
      />

      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleCloseMovie}
        />
      )}
    </>
  );
}
</file>

<file path="components/movie/movie-badge.tsx">
"use client";

import { cn } from "@/lib/utils";
import { getBadgeDefinition } from "@/lib/movie-engines/badge-engine";

type MovieBadgeProps = {
  badgeId: string | null | undefined;
  className?: string;
};

export function MovieBadge({ badgeId, className }: MovieBadgeProps) {
  const badge = getBadgeDefinition(badgeId);

  if (!badge) {
    return (
      <span
        className={cn("text-muted-foreground", className)}
        aria-label="No badge"
      >
        -
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center justify-center",
        className
      )}
      title={badge.id}
      aria-label={badge.id}
    >
      <img
        src={badge.assetPath}
        alt={badge.id}
        className="h-9 max-w-[5.5rem] object-contain"
      />
    </span>
  );
}
</file>

<file path="lib/add-movie/map-to-draft.ts">
import { ADD_MOVIE_UNENRICHED_PLACEHOLDER } from "@/lib/add-movie/constants";
import { getTmdbPosterUrl } from "@/lib/tmdb/poster";
import type {
  AddMovieMovieDraft,
  AddMovieSearchResult,
} from "@/types/add-movie";

/** Build confirmation draft from a TMDB search hit */
export function mapSearchResultToDraft(
  result: AddMovieSearchResult
): AddMovieMovieDraft {
  return {
    tmdbId: result.tmdbId,

    displayTitle: result.title,
    originalTitle: result.originalTitle || result.title,
    titlePt: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    year: result.releaseYear || ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    releaseDate: "",

    posterPath: result.posterPath,
    posterUrl: getTmdbPosterUrl(result.posterPath, "detail"),

    director: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    country: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    distributor: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    runtime: null,

    synopsis: result.overview ?? "",

    cast: [],
    crew: [],
    genres: [],

    imdbId: undefined,
    imdbScore: null,
    rottenTomatoesScore: null,

    overview: result.overview,
    originalLanguage: result.originalLanguage,
  };
}
</file>

<file path="lib/library/list-columns.ts">
import type { ReactNode } from "react";
import type { LibrarySortKey } from "@/types/library";

/**
 * Library list table column definitions — shared by shell and future data rows.
 */

export const LIBRARY_LIST_COLUMN_IDS = [
  "poster",
  "year",
  "title",
  "titlePt",
  "director",
  "country",
  "distributor",
  "badge",
  "stars",
  "review",
  "imdb",
  "rotten",
] as const;

export type LibraryListColumnId = (typeof LIBRARY_LIST_COLUMN_IDS)[number];

export type LibraryListColumnDef = {
  id: LibraryListColumnId;
  label: string;
  sortable: boolean;
  sortKey?: LibrarySortKey;
  /** Tailwind min-width utility for column sizing */
  minWidth: string;
};

export const LIBRARY_LIST_COLUMNS: LibraryListColumnDef[] = [
  { id: "poster", label: "Poster", sortable: false, minWidth: "min-w-[88px]" },
  {
    id: "year",
    label: "Year",
    sortable: true,
    sortKey: "year",
    minWidth: "min-w-[80px]",
  },
  {
    id: "title",
    label: "Title",
    sortable: true,
    sortKey: "title",
    minWidth: "min-w-[160px]",
  },
  {
    id: "titlePt",
    label: "Title PT",
    sortable: false,
    minWidth: "min-w-[160px]",
  },
  {
    id: "director",
    label: "Director",
    sortable: false,
    minWidth: "min-w-[140px]",
  },
  {
    id: "country",
    label: "Country",
    sortable: false,
    minWidth: "min-w-[120px]",
  },
  {
    id: "distributor",
    label: "Distributor",
    sortable: false,
    minWidth: "min-w-[140px]",
  },
  { id: "badge", label: "Badge", sortable: false, minWidth: "min-w-[100px]" },
  { id: "stars", label: "Stars", sortable: false, minWidth: "min-w-[88px]" },
  {
    id: "review",
    label: "Personal Review",
    sortable: true,
    sortKey: "review",
    minWidth: "min-w-[200px]",
  },
  {
    id: "imdb",
    label: "IMDb",
    sortable: true,
    sortKey: "imdb",
    minWidth: "min-w-[88px]",
  },
  {
    id: "rotten",
    label: "Rotten Tomatoes",
    sortable: true,
    sortKey: "rotten",
    minWidth: "min-w-[88px]",
  },
];

/** Future row shape — inject cell content per column when movies are wired */
export type LibraryMovieListRow = Partial<
  Record<LibraryListColumnId, ReactNode>
>;
</file>

<file path="lib/movie-engines/badge-engine.ts">
export const AUTO_BADGE_IDS = [
  "badge1",
  "badge2",
  "badge3",
  "badge4",
  "badge5",
  "badge6",
  "badge7",
  "badge8",
  "badge9",
] as const;

export const MANUAL_BADGE_IDS = ["badge10", "badge11", "badge12"] as const;

export const MOVIE_BADGES = [
  {
    id: "badge1",
    label: "badge1",
    description: "10 review score",
    assetPath: "/badges/badge_1.png",
    minReviewScore: 10,
    automatic: true,
    tone: "gold",
  },
  {
    id: "badge2",
    label: "badge2",
    description: "9 to 9.5 review score",
    assetPath: "/badges/badge_2.png",
    minReviewScore: 9,
    automatic: true,
    tone: "crimson",
  },
  {
    id: "badge3",
    label: "badge3",
    description: "8 to 8.5 review score",
    assetPath: "/badges/badge_3.png",
    minReviewScore: 8,
    automatic: true,
    tone: "red",
  },
  {
    id: "badge4",
    label: "badge4",
    description: "7 to 7.5 review score",
    assetPath: "/badges/badge_4.png",
    minReviewScore: 7,
    automatic: true,
    tone: "amber",
  },
  {
    id: "badge5",
    label: "badge5",
    description: "6 to 6.5 review score",
    assetPath: "/badges/badge_5.png",
    minReviewScore: 6,
    automatic: true,
    tone: "orange",
  },
  {
    id: "badge6",
    label: "badge6",
    description: "5 to 5.5 review score",
    assetPath: "/badges/badge_6.png",
    minReviewScore: 5,
    automatic: true,
    tone: "slate",
  },
  {
    id: "badge7",
    label: "badge7",
    description: "4 to 4.5 review score",
    assetPath: "/badges/badge_7.png",
    minReviewScore: 4,
    automatic: true,
    tone: "violet",
  },
  {
    id: "badge8",
    label: "badge8",
    description: "1.5 to 3.5 review score",
    assetPath: "/badges/badge_8.png",
    minReviewScore: 1.5,
    automatic: true,
    tone: "muted",
  },
  {
    id: "badge9",
    label: "badge9",
    description: "1 review score",
    assetPath: "/badges/badge_9.png",
    minReviewScore: 1,
    automatic: true,
    tone: "muted",
  },
  {
    id: "badge10",
    label: "badge10",
    description: "Manual-only badge",
    assetPath: "/badges/badge_10.png",
    minReviewScore: null,
    automatic: false,
    tone: "manual",
  },
  {
    id: "badge11",
    label: "badge11",
    description: "Manual-only badge",
    assetPath: "/badges/badge_11.png",
    minReviewScore: null,
    automatic: false,
    tone: "manual",
  },
  {
    id: "badge12",
    label: "badge12",
    description: "Manual-only badge",
    assetPath: "/badges/badge_12.png",
    minReviewScore: null,
    automatic: false,
    tone: "manual",
  },
] as const;

export type MovieBadgeDefinition = (typeof MOVIE_BADGES)[number];
export type MovieBadgeId = MovieBadgeDefinition["id"];

export function getBadgeForReviewScore(
  reviewScore: number | null | undefined
): MovieBadgeDefinition | null {
  if (
    typeof reviewScore !== "number" ||
    !Number.isFinite(reviewScore) ||
    reviewScore <= 0
  ) {
    return null;
  }

  if (reviewScore >= 10) return getBadgeDefinition("badge1");
  if (reviewScore >= 9) return getBadgeDefinition("badge2");
  if (reviewScore >= 8) return getBadgeDefinition("badge3");
  if (reviewScore >= 7) return getBadgeDefinition("badge4");
  if (reviewScore >= 6) return getBadgeDefinition("badge5");
  if (reviewScore >= 5) return getBadgeDefinition("badge6");
  if (reviewScore >= 4) return getBadgeDefinition("badge7");
  if (reviewScore >= 1.5) return getBadgeDefinition("badge8");
  return getBadgeDefinition("badge9");
}

export function getBadgeDefinition(
  badgeId: string | null | undefined
): MovieBadgeDefinition | null {
  if (!badgeId) return null;

  return MOVIE_BADGES.find((badge) => badge.id === badgeId) ?? null;
}

export function calculateBadgeId(
  reviewScore: number | null | undefined,
  options?: {
    overrideEnabled?: boolean;
    currentBadgeId?: string | null;
  }
): string | null {
  if (options?.overrideEnabled) {
    return options.currentBadgeId ?? null;
  }

  return getBadgeForReviewScore(reviewScore)?.id ?? null;
}
</file>

<file path="store/index.ts">
export { useThemeStore } from "./theme-store";
export { useMovieStore } from "./movie-store";
</file>

<file path="store/movie-store.ts">
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateBadgeId } from "@/lib/movie-engines/badge-engine";
import {
  dedupeBestOfYearCrowns,
  enforceBestOfYearCrown,
} from "@/lib/movie-engines/best-of-year-crown";
import { calculateStars } from "@/lib/movie-engines/stars-engine";

export type LibraryMovie = {
  // Identity
  id: string;
  tmdbId: number;
  imdbId?: string;

  displayTitle: string;
  originalTitle: string;
  titlePt: string;
  year: string;

  // Visual
  posterUrl?: string;

  // Metadata
  director: string;
  country: string;
  distributor: string;
  runtime: number | null;
  releaseDate: string;
  synopsis: string;

  cast: string[];
  crew: string[];
  genres: string[];
  subgenres: string[];

  // External Ratings
  imdbScore: number | null;
  rottenTomatoesScore: number | null;

  // Personal Ratings
  reviewScore: number | null;
  stars: number;
  badgeId: string | null;
  badgeOverrideEnabled: boolean;

  // Personal Tracking
  watchedDate: string;
  bestOfYear: boolean;

  // Organization
  assignedLists: string[];

  // System
  createdAt: string;
  updatedAt: string;
  metadataSourceSnapshot: string | null;
  metadataLastRefreshedAt: string | null;
};

type MovieRecord = Record<string, unknown>;

function asRecord(value: unknown): MovieRecord | null {
  return typeof value === "object" && value !== null
    ? (value as MovieRecord)
    : null;
}

function toStringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}

function toNullableString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : null;
}

function toNumberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is string =>
      typeof item === "string" && item.trim().length > 0
  );
}

function normalizeLibraryMovie(value: unknown): LibraryMovie | null {
  const record = asRecord(value);
  if (!record) return null;

  const tmdbId = toNumberOrNull(record.tmdbId);
  if (tmdbId === null) return null;

  const now = new Date().toISOString();
  const reviewScore = toNumberOrNull(record.reviewScore);
  const badgeOverrideEnabled = record.badgeOverrideEnabled === true;
  const currentBadgeId =
    typeof record.badgeId === "string" && record.badgeId.trim().length > 0
      ? record.badgeId
      : null;

  const displayTitle = toStringValue(record.displayTitle, "Untitled");
  const originalTitle = toStringValue(record.originalTitle, displayTitle);

  return {
    id: toStringValue(record.id, `tmdb-${tmdbId}`),
    tmdbId,
    imdbId: toOptionalString(record.imdbId),

    displayTitle,
    originalTitle,
    titlePt: toStringValue(record.titlePt, displayTitle),
    year: toStringValue(record.year),

    posterUrl: toOptionalString(record.posterUrl),

    director: toStringValue(record.director, "-"),
    country: toStringValue(record.country, "-"),
    distributor: toStringValue(record.distributor, "-"),
    runtime: toNumberOrNull(record.runtime),
    releaseDate: toStringValue(record.releaseDate),
    synopsis: toStringValue(record.synopsis),

    cast: toStringArray(record.cast),
    crew: toStringArray(record.crew),
    genres: toStringArray(record.genres),
    subgenres: toStringArray(record.subgenres),

    imdbScore: toNumberOrNull(record.imdbScore),
    rottenTomatoesScore: toNumberOrNull(record.rottenTomatoesScore),

    reviewScore,
    stars: calculateStars(reviewScore),
    badgeId: calculateBadgeId(reviewScore, {
      overrideEnabled: badgeOverrideEnabled,
      currentBadgeId,
    }),
    badgeOverrideEnabled,

    watchedDate: toStringValue(record.watchedDate),
    bestOfYear: record.bestOfYear === true,

    assignedLists: toStringArray(record.assignedLists),

    createdAt: toStringValue(record.createdAt, now),
    updatedAt: toStringValue(record.updatedAt, now),
    metadataSourceSnapshot: toNullableString(record.metadataSourceSnapshot),
    metadataLastRefreshedAt: toNullableString(record.metadataLastRefreshedAt),
  };
}

function normalizeMovieList(value: unknown): LibraryMovie[] {
  if (!Array.isArray(value)) return [];

  return dedupeBestOfYearCrowns(
    value
      .map(normalizeLibraryMovie)
      .filter((movie): movie is LibraryMovie => movie !== null)
  );
}

type MovieState = {
  movies: LibraryMovie[];

  addMovie: (movie: LibraryMovie) => void;

  updateMovie: (id: string, updates: Partial<LibraryMovie>) => void;

  removeMovie: (id: string) => void;
};

export const useMovieStore = create<MovieState>()(
  persist(
    (set) => ({
      movies: [],

      addMovie: (movie) =>
        set((state) => {
          const normalizedMovie = normalizeLibraryMovie(movie);

          if (!normalizedMovie) {
            return state;
          }

          const movies = [
            normalizedMovie,
            ...state.movies.filter(
              (m) => m.id !== normalizedMovie.id
            ),
          ];

          return {
            movies: dedupeBestOfYearCrowns(
              enforceBestOfYearCrown(movies, normalizedMovie)
            ),
          };
        }),

      updateMovie: (id, updates) =>
        set((state) => {
          let updatedMovie: LibraryMovie | null = null;

          const movies = state.movies.map((movie) => {
            if (movie.id !== id) return movie;

            updatedMovie = normalizeLibraryMovie({
              ...movie,
              ...updates,
              updatedAt: new Date().toISOString(),
            });

            return updatedMovie ?? movie;
          });

          if (!updatedMovie) {
            return { movies };
          }

          return {
            movies: dedupeBestOfYearCrowns(
              enforceBestOfYearCrown(movies, updatedMovie)
            ),
          };
        }),

      removeMovie: (id) =>
        set((state) => ({
          movies: state.movies.filter(
            (movie) => movie.id !== id
          ),
        })),
    }),
    {
      name: "hma-movies",
      merge: (persistedState, currentState) => {
        const persisted = asRecord(persistedState);

        return {
          ...currentState,
          ...(persisted ?? {}),
          movies: normalizeMovieList(persisted?.movies),
        };
      },
    }
  )
);
</file>

<file path="types/add-movie.ts">
export const ADD_MOVIE_PANEL_STATES = [
  "idle",
  "searching",
  "results",
  "confirmation",
  "success",
] as const;

export type AddMoviePanelState = (typeof ADD_MOVIE_PANEL_STATES)[number];

/** TMDB search hit */
export type AddMovieSearchResult = {
  tmdbId: number;
  title: string;
  originalTitle: string;
  releaseYear: string;
  posterPath: string | null;
  overview: string;
  originalLanguage: string;
};

/** Confirmation draft */
export type AddMovieMovieDraft = {
  tmdbId: number;

  displayTitle: string;
  originalTitle: string;
  titlePt: string;
  year: string;
  releaseDate: string;

  posterPath: string | null;
  posterUrl?: string;

  director: string;
  country: string;
  distributor: string;
  runtime: number | null;

  synopsis: string;

  cast: string[];
  crew: string[];
  genres: string[];

  imdbId?: string;
  imdbScore: number | null;
  rottenTomatoesScore: number | null;

  overview?: string;
  originalLanguage?: string;
};

export type AddMovieFormValues = {
  reviewScore: string;
  bestOfYear: boolean;
  watchedDate: string;
};
</file>

<file path="types/library.ts">
export const LIBRARY_VIEW_MODES = ["list", "grid"] as const;

export type LibraryViewMode = (typeof LIBRARY_VIEW_MODES)[number];

export const LIBRARY_SORT_KEYS = [
  "title",
  "year",
  "imdb",
  "rotten",
  "review",
  "watchedDate",
] as const;

export type LibrarySortKey = (typeof LIBRARY_SORT_KEYS)[number];
export type LibrarySortDirection = "asc" | "desc";

export type LibrarySortState = {
  key: LibrarySortKey;
  direction: LibrarySortDirection;
};

export const DEFAULT_LIBRARY_SORT: LibrarySortState = {
  key: "title",
  direction: "asc",
};

export const LIBRARY_PAGE_SIZE = 100;

export type LibraryFilters = {
  genre: string;
  country: string;
  distributor: string;
  badgeId: string;
  stars: string;
  bestOfYear: boolean;
};

export type LibraryFilterOptions = {
  genres: string[];
  countries: string[];
  distributors: string[];
  badges: string[];
  stars: string[];
};

export const DEFAULT_LIBRARY_FILTERS: LibraryFilters = {
  genre: "",
  country: "",
  distributor: "",
  badgeId: "",
  stars: "",
  bestOfYear: false,
};
</file>

<file path="app/(app)/movies/[id]/page.tsx">
"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { MovieDetailsModal } from "@/components/movie/movie-details-modal";
import { useMovieStore } from "@/store/movie-store";

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
  const routeId = Array.isArray(params.id) ? params.id[0] : params.id;
  const numericRouteId = Number(routeId);

  const movie = useMovieStore((state) =>
    state.movies.find(
      (m) =>
        m.id === routeId ||
        (Number.isFinite(numericRouteId) && m.tmdbId === numericRouteId)
    )
  );

  if (!movie) {
    notFound();
  }

  return <MovieDetailsModal movie={movie} onClose={() => router.back()} />;
}
</file>

<file path="components/add-movie/add-movie-side-panel.tsx">
"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { overlayFade, slideInFromRight } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AddMoviePanelContent } from "@/components/add-movie/add-movie-panel-content";
import { useAddMovieFlow } from "@/components/add-movie/use-add-movie-flow";

export type AddMovieSidePanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddMovieSidePanel({
  open,
  onOpenChange,
}: AddMovieSidePanelProps) {
  const [mounted, setMounted] = useState(false);
  const flow = useAddMovieFlow(open);
  const router = useRouter();

  const close = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleViewMovie = useCallback(() => {
    if (!flow.savedMovieId) return;

    close();
    router.push(`/movies/${flow.savedMovieId}`);
  }, [flow.savedMovieId, router, close]);

  const handleOpenExistingDuplicate = useCallback(() => {
    if (!flow.duplicateMatch) return;

    close();
    router.push(`/movies/${flow.duplicateMatch.movie.id}`);
  }, [flow.duplicateMatch, router, close]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (flow.showSearchField) {
      requestAnimationFrame(() => {
        document.getElementById("add-movie-search")?.focus();
      });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close, flow.showSearchField]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="add-movie-portal fixed inset-0 z-50 flex justify-end">
          <motion.button
            type="button"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="hidden"
            aria-label="Close add movie panel"
            className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"
            onClick={close}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-movie-panel-title"
            variants={slideInFromRight}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              "add-movie-panel relative flex h-full w-full max-w-md flex-col",
              "border-l border-border/60 bg-card shadow-2xl"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex shrink-0 items-center justify-between border-b border-border/60 px-6 py-5">
              <h2
                id="add-movie-panel-title"
                className="text-lg font-semibold tracking-tight"
              >
                Add Movie
              </h2>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={close}
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden />
              </Button>
            </header>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6">
              <AddMoviePanelContent
                panelState={flow.panelState}
                query={flow.query}
                onQueryChange={flow.handleQueryChange}
                showSearchField={flow.showSearchField}
                queryTooShort={flow.queryTooShort}
                results={flow.results}
                searchError={flow.searchError}
                selectedMovie={flow.selectedMovie}
                formValues={flow.formValues}
                duplicateMatch={flow.duplicateMatch}
                bestOfYearReplacement={flow.bestOfYearReplacement}
                saveError={flow.saveError}
                onFormChange={flow.updateFormValues}
                onSelectResult={flow.handleSelectResult}
                onBack={flow.handleBackFromConfirmation}
                onSave={flow.handleSaveMovie}
                onAddAnother={flow.handleAddAnother}
                onViewMovie={handleViewMovie}
                onOpenExistingDuplicate={handleOpenExistingDuplicate}
              />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
</file>

<file path="components/add-movie/use-add-movie-flow.ts">
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ADD_MOVIE_MIN_SEARCH_LENGTH,
  ADD_MOVIE_SEARCH_DEBOUNCE_MS,
} from "@/lib/add-movie/constants";
import { fetchMovieDetails } from "@/lib/add-movie/fetch-movie-details";
import { mapSearchResultToDraft } from "@/lib/add-movie/map-to-draft";
import { searchMovies } from "@/lib/add-movie/search-client";
import { calculateBadgeId } from "@/lib/movie-engines/badge-engine";
import { findBestOfYearWinnerForWatchedYear } from "@/lib/movie-engines/best-of-year-crown";
import { calculateStars } from "@/lib/movie-engines/stars-engine";
import { useMovieStore } from "@/store";
import type { LibraryMovie } from "@/store/movie-store";
import type {
  AddMovieFormValues,
  AddMovieMovieDraft,
  AddMoviePanelState,
  AddMovieSearchResult,
} from "@/types/add-movie";

export type DuplicateMovieMatch = {
  reason: "TMDB ID" | "IMDb ID" | "title and year";
  movie: LibraryMovie;
};

export type SaveMovieOptions = {
  allowDuplicate?: boolean;
  confirmBestOfYearReplacement?: boolean;
};

const initialFormValues: AddMovieFormValues = {
  reviewScore: "",
  bestOfYear: false,
  watchedDate: "",
};

function createMovieId(tmdbId: number): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${tmdbId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeTitle(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleCandidates(movie: {
  displayTitle: string;
  originalTitle: string;
  titlePt: string;
}) {
  return [movie.displayTitle, movie.originalTitle, movie.titlePt]
    .map(normalizeTitle)
    .filter(Boolean);
}

function findDuplicateMovie(
  selectedMovie: AddMovieMovieDraft,
  movies: LibraryMovie[]
): DuplicateMovieMatch | null {
  const tmdbMatch = movies.find(
    (movie) => movie.tmdbId === selectedMovie.tmdbId
  );
  if (tmdbMatch) return { reason: "TMDB ID", movie: tmdbMatch };

  if (selectedMovie.imdbId) {
    const imdbMatch = movies.find(
      (movie) => movie.imdbId && movie.imdbId === selectedMovie.imdbId
    );
    if (imdbMatch) return { reason: "IMDb ID", movie: imdbMatch };
  }

  const selectedTitles = titleCandidates(selectedMovie);
  const titleYearMatch = movies.find((movie) => {
    if (movie.year !== selectedMovie.year) return false;

    const existingTitles = titleCandidates(movie);
    return selectedTitles.some((title) => existingTitles.includes(title));
  });

  return titleYearMatch
    ? { reason: "title and year", movie: titleYearMatch }
    : null;
}

export function useAddMovieFlow(open: boolean) {
  const addMovie = useMovieStore((state) => state.addMovie);
  const movies = useMovieStore((state) => state.movies);

  const [panelState, setPanelState] = useState<AddMoviePanelState>("idle");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AddMovieSearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] =
    useState<AddMovieMovieDraft | null>(null);
  const [duplicateMatch, setDuplicateMatch] =
    useState<DuplicateMovieMatch | null>(null);
  const [bestOfYearReplacement, setBestOfYearReplacement] =
    useState<LibraryMovie | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedMovieId, setSavedMovieId] = useState<string | null>(null);

  const [formValues, setFormValues] =
    useState<AddMovieFormValues>(initialFormValues);

  const resetFlow = useCallback(() => {
    setPanelState("idle");
    setQuery("");
    setResults([]);
    setSearchError(null);
    setSelectedMovie(null);
    setDuplicateMatch(null);
    setBestOfYearReplacement(null);
    setSaveError(null);
    setSavedMovieId(null);
    setFormValues(initialFormValues);
  }, []);

  useEffect(() => {
    if (!open) {
      resetFlow();
    }
  }, [open, resetFlow]);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setPanelState("idle");
      setResults([]);
      setSearchError(null);
      return;
    }

    if (trimmed.length < ADD_MOVIE_MIN_SEARCH_LENGTH) {
      setPanelState("idle");
      setResults([]);
      setSearchError(null);
      return;
    }

    setPanelState("searching");
    setResults([]);
    setSearchError(null);

    const abortController = new AbortController();

    const debounceTimer = setTimeout(async () => {
      const outcome = await searchMovies(trimmed, abortController.signal);

      if (abortController.signal.aborted) return;

      if (!outcome.ok) {
        if (outcome.error === "aborted") return;

        setSearchError(outcome.error);
        setResults([]);
        setPanelState("results");
        return;
      }

      setResults(outcome.results);
      setSearchError(null);
      setPanelState("results");
    }, ADD_MOVIE_SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(debounceTimer);
      abortController.abort();
    };
  }, [query]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleSelectResult = useCallback(
    async (result: AddMovieSearchResult) => {
      setPanelState("searching");
      setDuplicateMatch(null);
      setBestOfYearReplacement(null);
      setSaveError(null);

      const draft = mapSearchResultToDraft(result);

      try {
        const details = await fetchMovieDetails(result.tmdbId);

        draft.director = details.director;
        draft.titlePt = details.titlePt;
        draft.releaseDate = details.releaseDate;

        draft.country = details.country;
        draft.runtime = details.runtime;
        draft.genres = details.genres;

        draft.synopsis = details.overview;

        draft.distributor = details.distributor ?? "-";

        draft.cast = details.cast ?? [];
        draft.crew = details.crew ?? [];

        draft.imdbId = details.imdbId;
        draft.imdbScore = details.imdbScore ?? null;
        draft.rottenTomatoesScore =
          details.rottenTomatoesScore ?? null;
      } catch (error) {
        console.error("Failed to load movie details", error);
      }

      setSelectedMovie(draft);
      setFormValues(initialFormValues);
      setPanelState("confirmation");
    },
    []
  );

  const handleBackFromConfirmation = useCallback(() => {
    setPanelState("results");
    setFormValues(initialFormValues);
    setDuplicateMatch(null);
    setBestOfYearReplacement(null);
    setSaveError(null);
  }, []);

  const handleSaveMovie = useCallback(
    (options: SaveMovieOptions = {}) => {
      if (!selectedMovie) return;

      setSaveError(null);

      if (formValues.bestOfYear && !formValues.watchedDate) {
        setSaveError("Best of Year requires a watched date.");
        return;
      }

      const duplicate = findDuplicateMovie(selectedMovie, movies);
      if (duplicate && !options.allowDuplicate) {
        setDuplicateMatch(duplicate);
        return;
      }
      if (options.allowDuplicate) {
        setDuplicateMatch(null);
      }

      if (formValues.bestOfYear) {
        const replacement = findBestOfYearWinnerForWatchedYear(
          movies,
          formValues.watchedDate
        );

        if (replacement && !options.confirmBestOfYearReplacement) {
          setBestOfYearReplacement(replacement);
          return;
        }
      }

      const reviewScore = formValues.reviewScore
        ? Number(formValues.reviewScore)
        : null;
      const stars = calculateStars(reviewScore);
      const badgeId = calculateBadgeId(reviewScore);
      const now = new Date().toISOString();
      const movieId = createMovieId(selectedMovie.tmdbId);

      addMovie({
        id: movieId,
        tmdbId: selectedMovie.tmdbId,
        imdbId: selectedMovie.imdbId,

        displayTitle: selectedMovie.displayTitle,
        originalTitle: selectedMovie.originalTitle,
        titlePt: selectedMovie.titlePt,
        year: selectedMovie.year,

        posterUrl: selectedMovie.posterUrl,

        director: selectedMovie.director,
        country: selectedMovie.country,
        distributor: selectedMovie.distributor,
        runtime: selectedMovie.runtime,
        releaseDate: selectedMovie.releaseDate,
        synopsis: selectedMovie.synopsis,

        cast: selectedMovie.cast,
        crew: selectedMovie.crew,
        genres: selectedMovie.genres,
        subgenres: [],

        imdbScore: selectedMovie.imdbScore,
        rottenTomatoesScore: selectedMovie.rottenTomatoesScore,

        reviewScore,
        stars,
        badgeId,
        badgeOverrideEnabled: false,

        watchedDate: formValues.watchedDate,
        bestOfYear: formValues.bestOfYear,

        assignedLists: [],

        createdAt: now,
        updatedAt: now,
        metadataSourceSnapshot: JSON.stringify({
          tmdbId: selectedMovie.tmdbId,
          imdbId: selectedMovie.imdbId ?? null,
          sources: [
            "TMDB",
            selectedMovie.imdbId ? "OMDb" : null,
          ].filter(Boolean),
        }),
        metadataLastRefreshedAt: now,
      });

      setDuplicateMatch(null);
      setBestOfYearReplacement(null);
      setSavedMovieId(movieId);
      setPanelState("success");
    },
    [selectedMovie, formValues, movies, addMovie]
  );

  const handleAddAnother = useCallback(() => {
    resetFlow();
  }, [resetFlow]);

  const updateFormValues = useCallback(
    (patch: Partial<AddMovieFormValues>) => {
      setFormValues((prev) => ({ ...prev, ...patch }));
      setSaveError(null);

      if ("bestOfYear" in patch || "watchedDate" in patch) {
        setBestOfYearReplacement(null);
      }
    },
    []
  );

  const trimmedQuery = query.trim();

  const queryTooShort =
    trimmedQuery.length > 0 &&
    trimmedQuery.length < ADD_MOVIE_MIN_SEARCH_LENGTH;

  const showSearchField =
    panelState === "idle" ||
    panelState === "searching" ||
    panelState === "results";

  return {
    panelState,
    query,
    results,
    searchError,
    queryTooShort,
    selectedMovie,
    formValues,
    duplicateMatch,
    bestOfYearReplacement,
    saveError,
    savedMovieId,
    showSearchField,
    handleQueryChange,
    handleSelectResult,
    handleBackFromConfirmation,
    handleSaveMovie,
    handleAddAnother,
    updateFormValues,
    resetFlow,
  };
}
</file>

<file path="components/library/library-list-table.tsx">
import { cn } from "@/lib/utils";
import { LIBRARY_LIST_COLUMNS } from "@/lib/library/list-columns";
import type { LibraryMovieListRow } from "@/lib/library/list-columns";
import { LibraryListTableHeader } from "@/components/library/library-list-table-header";
import { LibraryEmptyState } from "@/components/library/library-empty-state";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListTableProps = {
  rows?: Array<LibraryMovieListRow & { id?: string; tmdbId?: number }>;
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
  className?: string;
};

export function LibraryListTable({
  rows = [],
  onAddMovie,
  onOpenMovie,
  sort,
  onSortChange,
  className,
}: LibraryListTableProps) {
  const isEmpty = rows.length === 0;
  const columnCount = LIBRARY_LIST_COLUMNS.length;

  return (
    <div
      className={cn(
        "library-list-table flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border/50 bg-card/20",
        className
      )}
    >
      <div className="library-list-scroll min-h-0 flex-1 overflow-auto">
        <table className="library-list-table__table w-full min-w-[1280px] border-collapse">
          <LibraryListTableHeader sort={sort} onSortChange={onSortChange} />
          <tbody>
            {isEmpty ? (
              <tr className="library-list-empty-row">
                <td colSpan={columnCount} className="p-0 align-top">
                  <LibraryEmptyState
                    variant="embedded"
                    onAddFirstMovie={onAddMovie}
                  />
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr
                  key={index}
                  className="library-list-row cursor-pointer hover:bg-accent/30 transition-colors"
                  onClick={() => {
                    const movieId = row.id ?? String(row.tmdbId ?? "");

                    if (movieId) {
                      onOpenMovie(movieId);
                    }
                  }}
                >
                  {LIBRARY_LIST_COLUMNS.map((column) => (
                    <td
                      key={column.id}
                      className={cn("library-list-td", column.minWidth)}
                    >
                      {row[column.id] ?? null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
</file>

<file path="components/library/library-list-view.tsx">
"use client";

import { useMemo } from "react";
import { LibraryListTable } from "@/components/library/library-list-table";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";
import type { LibraryMovie } from "@/store/movie-store";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListViewProps = {
  movies: LibraryMovie[];
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
};

export function LibraryListView({
  movies,
  onAddMovie,
  onOpenMovie,
  sort,
  onSortChange,
}: LibraryListViewProps) {
  const rows = useMemo(
    () =>
      movies.map((movie) => ({
        id: movie.id,
        tmdbId: movie.tmdbId,

        poster: movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.displayTitle}
            className="h-16 w-12 rounded object-cover"
          />
        ) : null,

        year: (
          <span className="inline-flex items-center justify-center gap-1.5">
            <span>{movie.year}</span>
            <BestOfYearCrown active={movie.bestOfYear} />
          </span>
        ),

        title: movie.displayTitle,
        titlePt: movie.titlePt,
        director: movie.director,
        country: movie.country,
        distributor: movie.distributor,
        badge: <MovieBadge badgeId={movie.badgeId} />,
        stars: <MovieStars stars={movie.stars} />,
        review: formatReviewScore(movie.reviewScore),
        imdb: movie.imdbScore !== null ? movie.imdbScore : "-",
        rotten:
          movie.rottenTomatoesScore !== null
            ? `${movie.rottenTomatoesScore}%`
            : "-",
      })),
    [movies]
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <LibraryListTable
        rows={rows}
        onAddMovie={onAddMovie}
        onOpenMovie={onOpenMovie}
        sort={sort}
        onSortChange={onSortChange}
      />
    </div>
  );
}
</file>

</files>
````

## File: .gitignore
````
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# prisma
/prisma/migrations/**/migration_lock.toml
````

## File: app/(app)/dashboard/page.tsx
````typescript
export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
    </div>
  );
}
````

## File: app/(app)/layout.tsx
````typescript
import { AppShell } from "@/components/layout/app-shell";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
````

## File: app/(app)/library/page.tsx
````typescript
import { LibraryShell } from "@/components/library/library-shell";

export default function LibraryPage() {
  return <LibraryShell />;
}
````

## File: app/(app)/lists/page.tsx
````typescript
export default function ListsPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Lists</h2>
    </div>
  );
}
````

## File: app/(app)/page.tsx
````typescript
import { redirect } from "next/navigation";

export default function AppIndexPage() {
  redirect("/library");
}
````

## File: app/(app)/settings/page.tsx
````typescript
import { VisualThemeSettings } from "@/components/settings/visual-theme-settings";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
      </div>
      <section className="max-w-md space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Appearance</h3>
        <VisualThemeSettings />
      </section>
    </div>
  );
}
````

## File: app/api/tmdb/movie/[id]/route.ts
````typescript
import { NextRequest, NextResponse } from "next/server";
import { fetchMovieRatings } from "@/lib/omdb/fetch-movie-ratings";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const apiKey = getTmdbApiKey();

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "TMDB API key not configured.",
      },
      { status: 500 }
    );
  }

  try {
    const detailsUrl =
      `${TMDB_API_BASE}/movie/${id}` +
      `?api_key=${apiKey}&language=en-US`;

    const creditsUrl =
      `${TMDB_API_BASE}/movie/${id}/credits` +
      `?api_key=${apiKey}&language=en-US`;

    const externalIdsUrl =
      `${TMDB_API_BASE}/movie/${id}/external_ids` +
      `?api_key=${apiKey}`;

    const [detailsResponse, creditsResponse, externalIdsResponse] =
      await Promise.all([
        fetch(detailsUrl, { next: { revalidate: 0 } }),
        fetch(creditsUrl, { next: { revalidate: 0 } }),
        fetch(externalIdsUrl, { next: { revalidate: 0 } }),
      ]);

    if (
      !detailsResponse.ok ||
      !creditsResponse.ok ||
      !externalIdsResponse.ok
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to fetch movie details.",
        },
        { status: 500 }
      );
    }

    const details = await detailsResponse.json();
    const credits = await creditsResponse.json();
    const externalIds = await externalIdsResponse.json();

    const director =
      credits.crew?.find(
        (person: { job?: string; name?: string }) =>
          person.job === "Director"
      )?.name ?? "—";

    const imdbId =
      typeof externalIds.imdb_id === "string"
        ? externalIds.imdb_id
        : undefined;

    const ratings = imdbId
      ? await fetchMovieRatings(imdbId)
      : {
          imdbId: undefined,
          imdbScore: null,
          rottenTomatoesScore: null,
        };

    return NextResponse.json({
      ok: true,
      movie: {
        tmdbId: details.id,

        title: details.title,
        originalTitle: details.original_title,
        titlePt: details.title,

        year: details.release_date?.slice(0, 4) ?? "",
        releaseDate: details.release_date ?? "",

        runtime: details.runtime ?? null,

        director,

        country:
          details.production_countries?.[0]?.name ?? "—",

        genres:
          details.genres?.map(
            (genre: { name: string }) => genre.name
          ) ?? [],

        overview: details.overview ?? "",

        imdbId: ratings.imdbId,
        imdbScore: ratings.imdbScore,
        rottenTomatoesScore:
          ratings.rottenTomatoesScore,

        distributor:
          details.production_companies?.[0]?.name ?? "—",

        cast:
          credits.cast
            ?.slice(0, 10)
            ?.map(
              (person: { name: string }) => person.name
            ) ?? [],

        crew:
          credits.crew
            ?.slice(0, 10)
            ?.map(
              (person: { name: string }) => person.name
            ) ?? [],
      },
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to load movie details.",
      },
      { status: 500 }
    );
  }
}
````

## File: app/api/tmdb/search/route.ts
````typescript
import { NextResponse, type NextRequest } from "next/server";
import { ADD_MOVIE_MIN_SEARCH_LENGTH } from "@/lib/add-movie/constants";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";
import { mapTmdbApiMovie } from "@/lib/tmdb/map-movie-search";
import type { TmdbSearchResponse } from "@/types/tmdb";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < ADD_MOVIE_MIN_SEARCH_LENGTH) {
    const body: TmdbSearchResponse = {
      ok: false,
      error: `Enter at least ${ADD_MOVIE_MIN_SEARCH_LENGTH} characters to search.`,
    };
    return NextResponse.json(body, { status: 400 });
  }

  const apiKey = getTmdbApiKey();
  if (!apiKey) {
    const body: TmdbSearchResponse = {
      ok: false,
      error: "TMDB is not configured. Add TMDB_API_KEY to .env.local.",
    };
    return NextResponse.json(body, { status: 503 });
  }

  try {
    const url = new URL(`${TMDB_API_BASE}/search/movie`);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("query", query);
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("language", "en-US");

    const tmdbResponse = await fetch(url.toString(), {
      next: { revalidate: 0 },
    });

    if (!tmdbResponse.ok) {
      const body: TmdbSearchResponse = {
        ok: false,
        error: "TMDB search failed. Please try again.",
      };
      return NextResponse.json(body, { status: tmdbResponse.status });
    }

    const payload = (await tmdbResponse.json()) as {
      results?: unknown[];
    };

    const results = (payload.results ?? [])
      .filter(
        (item): item is Record<string, unknown> =>
          typeof item === "object" && item !== null && "id" in item
      )
      .map((item) => mapTmdbApiMovie(item as Parameters<typeof mapTmdbApiMovie>[0]));

    const body: TmdbSearchResponse = { ok: true, results };
    return NextResponse.json(body);
  } catch {
    const body: TmdbSearchResponse = {
      ok: false,
      error: "Unable to search movies right now.",
    };
    return NextResponse.json(body, { status: 500 });
  }
}
````

## File: app/globals.css
````css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* ─── Base design tokens (shadcn) ─── */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* ─── Horror Archive (default) ─── */
:root,
[data-visual-theme="horror-archive"] {
  --radius: 0.5rem;
  --background: oklch(0.12 0.02 285);
  --foreground: oklch(0.93 0.01 285);
  --card: oklch(0.16 0.03 285);
  --card-foreground: oklch(0.93 0.01 285);
  --popover: oklch(0.14 0.025 285);
  --popover-foreground: oklch(0.93 0.01 285);
  --primary: oklch(0.55 0.22 25);
  --primary-foreground: oklch(0.98 0.01 285);
  --secondary: oklch(0.22 0.04 285);
  --secondary-foreground: oklch(0.9 0.01 285);
  --muted: oklch(0.2 0.03 285);
  --muted-foreground: oklch(0.65 0.02 285);
  --accent: oklch(0.28 0.08 25);
  --accent-foreground: oklch(0.95 0.01 285);
  --destructive: oklch(0.55 0.24 25);
  --border: oklch(0.28 0.04 285);
  --input: oklch(0.22 0.04 285);
  --ring: oklch(0.55 0.22 25);
  --sidebar: oklch(0.1 0.02 285);
  --sidebar-foreground: oklch(0.88 0.01 285);
  --sidebar-border: oklch(0.24 0.04 285);
  --sidebar-accent: oklch(0.18 0.05 25);
  --sidebar-accent-foreground: oklch(0.95 0.01 285);
  --shell-glow: oklch(0.45 0.18 25 / 0.15);
}

/* ─── VHS retro ─── */
[data-visual-theme="vhs"] {
  --radius: 0.25rem;
  --background: oklch(0.14 0.04 145);
  --foreground: oklch(0.88 0.12 95);
  --card: oklch(0.18 0.05 145);
  --card-foreground: oklch(0.9 0.1 95);
  --popover: oklch(0.16 0.045 145);
  --popover-foreground: oklch(0.9 0.1 95);
  --primary: oklch(0.72 0.18 95);
  --primary-foreground: oklch(0.15 0.05 145);
  --secondary: oklch(0.24 0.06 145);
  --secondary-foreground: oklch(0.88 0.1 95);
  --muted: oklch(0.22 0.05 145);
  --muted-foreground: oklch(0.62 0.08 95);
  --accent: oklch(0.55 0.2 330);
  --accent-foreground: oklch(0.95 0.02 95);
  --destructive: oklch(0.6 0.22 25);
  --border: oklch(0.32 0.08 145);
  --input: oklch(0.2 0.05 145);
  --ring: oklch(0.72 0.18 95);
  --sidebar: oklch(0.11 0.04 145);
  --sidebar-foreground: oklch(0.85 0.11 95);
  --sidebar-border: oklch(0.3 0.07 145);
  --sidebar-accent: oklch(0.22 0.08 95);
  --sidebar-accent-foreground: oklch(0.12 0.04 145);
  --shell-glow: oklch(0.72 0.18 95 / 0.12);
}

/* ─── Minimal ─── */
[data-visual-theme="minimal"] {
  --radius: 0.375rem;
  --background: oklch(0.11 0 0);
  --foreground: oklch(0.92 0 0);
  --card: oklch(0.14 0 0);
  --card-foreground: oklch(0.92 0 0);
  --popover: oklch(0.13 0 0);
  --popover-foreground: oklch(0.92 0 0);
  --primary: oklch(0.92 0 0);
  --primary-foreground: oklch(0.11 0 0);
  --secondary: oklch(0.18 0 0);
  --secondary-foreground: oklch(0.88 0 0);
  --muted: oklch(0.17 0 0);
  --muted-foreground: oklch(0.58 0 0);
  --accent: oklch(0.22 0 0);
  --accent-foreground: oklch(0.95 0 0);
  --destructive: oklch(0.55 0.2 25);
  --border: oklch(0.24 0 0);
  --input: oklch(0.18 0 0);
  --ring: oklch(0.75 0 0);
  --sidebar: oklch(0.09 0 0);
  --sidebar-foreground: oklch(0.85 0 0);
  --sidebar-border: oklch(0.2 0 0);
  --sidebar-accent: oklch(0.16 0 0);
  --sidebar-accent-foreground: oklch(0.95 0 0);
  --shell-glow: oklch(0.5 0 0 / 0.08);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  html {
    color-scheme: dark;
  }
}

@layer utilities {
  .shell-surface {
    background: linear-gradient(
      180deg,
      var(--shell-glow) 0%,
      transparent 40%
    );
  }

  .library-list-scroll {
    scrollbar-gutter: stable;
  }

  .library-list-thead {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .library-list-th {
    @apply border-b border-border/70 bg-card/95 px-3 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-md;
    vertical-align: middle;
  }

  .library-list-th--sortable {
    @apply cursor-default select-none transition-colors hover:text-foreground/90;
  }

  .library-list-td {
    @apply border-b border-border/30 px-3 py-4 text-center text-sm leading-relaxed text-foreground/90;
    vertical-align: middle;
    white-space: normal;
    word-break: break-word;
  }

  .library-list-row:hover .library-list-td {
    @apply bg-accent/10;
  }

  .library-list-empty-row .library-list-td {
    @apply border-b-0;
  }

  .add-movie-panel {
    box-shadow: -8px 0 32px oklch(0 0 0 / 0.35);
  }

  .library-empty-glow {
    background: radial-gradient(
      ellipse at center,
      var(--shell-glow) 0%,
      transparent 70%
    );
  }

  .vhs-scanlines::after {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      oklch(0 0 0 / 0.03) 2px,
      oklch(0 0 0 / 0.03) 4px
    );
  }
}
````

## File: app/layout.tsx
````typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Horror Movie Archive",
  description: "Private premium horror movie archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      data-visual-theme="horror-archive"
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
````

## File: components.json
````json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
````

## File: components/add-movie/add-movie-poster-placeholder.tsx
````typescript
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";

type AddMoviePosterPlaceholderProps = {
  className?: string;
};

export function AddMoviePosterPlaceholder({
  className,
}: AddMoviePosterPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-muted/20",
        className
      )}
      aria-hidden
    >
      <Film className="h-8 w-8 text-muted-foreground/35" />
    </div>
  );
}
````

## File: components/add-movie/add-movie-poster.tsx
````typescript
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
````

## File: components/add-movie/add-movie-search-field.tsx
````typescript
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
        className="add-movie-search-input h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
      />
    </div>
  );
}
````

## File: components/add-movie/states/duplicate-warning.tsx
````typescript
"use client";

import type { DuplicateMovieMatch } from "@/components/add-movie/use-add-movie-flow";
import type { LibraryMovie } from "@/store/movie-store";
import { Button } from "@/components/ui/button";

type DuplicateWarningProps = {
  duplicateMatch: DuplicateMovieMatch | null;
  bestOfYearReplacement: LibraryMovie | null;
  onOpenExistingDuplicate: () => void;
  onAddAnyway: () => void;
  onConfirmBestOfYearReplacement: () => void;
};

export function DuplicateWarning({
  duplicateMatch,
  bestOfYearReplacement,
  onOpenExistingDuplicate,
  onAddAnyway,
  onConfirmBestOfYearReplacement,
}: DuplicateWarningProps) {
  if (duplicateMatch) {
    return (
      <div className="rounded-md border border-amber-400/40 bg-amber-400/10 p-3 text-sm">
        <p className="font-medium text-amber-100">Possible duplicate found</p>
        <p className="mt-1 text-amber-100/80">
          This matches {duplicateMatch.movie.displayTitle} by{" "}
          {duplicateMatch.reason}.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={onOpenExistingDuplicate}
          >
            Open Existing Movie
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onAddAnyway}
          >
            Add Anyway
          </Button>
        </div>
      </div>
    );
  }

  if (bestOfYearReplacement) {
    return (
      <div className="rounded-md border border-amber-400/40 bg-amber-400/10 p-3 text-sm">
        <p className="font-medium text-amber-100">
          Replace Best of Year winner?
        </p>
        <p className="mt-1 text-amber-100/80">
          {bestOfYearReplacement.displayTitle} is already marked Best of Year
          for this watched year.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={onConfirmBestOfYearReplacement}
          >
            Replace Winner
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
````

## File: components/add-movie/states/idle-state.tsx
````typescript
"use client";

import { ADD_MOVIE_MIN_SEARCH_LENGTH } from "@/lib/add-movie/constants";

type IdleStateProps = {
  queryTooShort: boolean;
};

export function IdleState({ queryTooShort }: IdleStateProps) {
  return (
    <div className="add-movie-results flex min-h-[240px] flex-1 flex-col rounded-md border border-border/50 bg-card/30">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        {queryTooShort ? (
          <p className="text-sm text-muted-foreground">
            Type at least {ADD_MOVIE_MIN_SEARCH_LENGTH} characters to search.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Start typing to search for a movie.
          </p>
        )}
      </div>
    </div>
  );
}
````

## File: components/add-movie/states/results-state.tsx
````typescript
"use client";

import type { AddMovieSearchResult } from "@/types/add-movie";
import { AddMoviePoster } from "@/components/add-movie/add-movie-poster";
import { getTmdbPosterUrl } from "@/lib/tmdb/poster";

type ResultsStateProps = {
  results: AddMovieSearchResult[];
  searchError: string | null;
  onSelect: (result: AddMovieSearchResult) => void;
};

export function ResultsState({
  results,
  searchError,
  onSelect,
}: ResultsStateProps) {
  if (searchError) {
    return (
      <div className="add-movie-results flex min-h-[240px] flex-1 flex-col rounded-md border border-border/50 bg-card/30">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-sm font-medium text-foreground">Search unavailable</p>
          <p className="mt-2 text-sm text-muted-foreground">{searchError}</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="add-movie-results flex min-h-[240px] flex-1 flex-col rounded-md border border-border/50 bg-card/30">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">No movies found.</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Try a different title or check the spelling.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-movie-results flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-border/50 bg-card/30">
      <ul
        className="flex max-h-[min(52vh,480px)] flex-col gap-1 overflow-y-auto p-2"
        role="list"
      >
        {results.map((result) => (
          <li key={result.tmdbId} role="listitem">
            <button
              type="button"
              onClick={() => onSelect(result)}
              className="flex w-full items-center gap-3 rounded-md border border-transparent px-3 py-3 text-left transition-colors hover:border-border/60 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <AddMoviePoster
                posterUrl={getTmdbPosterUrl(result.posterPath, "thumb")}
                title={result.title}
                className="h-16 w-11"
                sizes="88px"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-foreground">
                  {result.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {result.releaseYear || "—"}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
````

## File: components/add-movie/states/searching-state.tsx
````typescript
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
````

## File: components/add-movie/states/success-state.tsx
````typescript
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
````

## File: components/layout/app-shell.tsx
````typescript
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/motion";
import { useThemeStore } from "@/store/theme-store";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const visualTheme = useThemeStore((s) => s.visualTheme);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex h-screen w-full overflow-hidden bg-background",
        visualTheme === "vhs" && "vhs-scanlines"
      )}
    >
      <div className="shell-surface pointer-events-none absolute inset-0" />
      <Sidebar />
      <motion.div
        className="relative flex min-w-0 flex-1 flex-col"
        variants={staggerContainer}
      >
        <TopBar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </motion.div>
    </motion.div>
  );
}
````

## File: components/layout/top-bar.tsx
````typescript
"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

export function TopBar() {
  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex h-14 shrink-0 items-center border-b border-border bg-card/40 px-6 backdrop-blur-sm"
    >
      <motion.div variants={fadeIn}>
        <p className="text-xs text-muted-foreground">Archive workspace</p>
        <p className="text-sm font-medium">Horror Movie Archive</p>
      </motion.div>
    </motion.header>
  );
}
````

## File: components/library/.gitkeep
````

````

## File: components/library/library-view-toggle.tsx
````typescript
"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LibraryViewMode } from "@/types/library";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type LibraryViewToggleProps = {
  viewMode: LibraryViewMode;
  onViewModeChange: (mode: LibraryViewMode) => void;
};

export function LibraryViewToggle({
  viewMode,
  onViewModeChange,
}: LibraryViewToggleProps) {
  return (
    <div
      className="inline-flex items-center rounded-md border border-border bg-card/50 p-0.5"
      role="group"
      aria-label="View mode"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            aria-pressed={viewMode === "list"}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors",
              viewMode === "list"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="h-4 w-4" aria-hidden />
            <span className="sr-only">List view</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>List view</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            aria-pressed={viewMode === "grid"}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors",
              viewMode === "grid"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" aria-hidden />
            <span className="sr-only">Grid view</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>Grid view</TooltipContent>
      </Tooltip>
    </div>
  );
}
````

## File: components/lists/.gitkeep
````

````

## File: components/movie/best-of-year-crown.tsx
````typescript
"use client";

import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

type BestOfYearCrownProps = {
  active: boolean;
  className?: string;
  showLabel?: boolean;
};

export function BestOfYearCrown({
  active,
  className,
  showLabel = false,
}: BestOfYearCrownProps) {
  if (!active) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-md border border-amber-400/40 bg-amber-400/10 px-1.5 py-1 text-amber-200",
        className
      )}
      title="Best of Year"
      aria-label="Best of Year"
    >
      <Crown className="h-3.5 w-3.5" aria-hidden />
      {showLabel && <span className="text-xs font-medium">Best of Year</span>}
    </span>
  );
}
````

## File: components/movie/movie-details-modal.tsx
````typescript
"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Edit,
  Image as ImageIcon,
  ListPlus,
  RefreshCcw,
  Trash2,
  X,
} from "lucide-react";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  formatReviewScore,
  isMasterpieceScore,
} from "@/lib/movie-engines/stars-engine";
import { cn } from "@/lib/utils";
import type { LibraryMovie } from "@/store/movie-store";

type MovieDetailsModalProps = {
  movie: LibraryMovie;
  onClose: () => void;
};

function formatRuntime(runtime: number | null): string {
  return runtime ? `${runtime} min` : "-";
}

function formatDate(value: string): string {
  return value || "-";
}

function MetadataItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-foreground">{value}</dd>
    </div>
  );
}

function ExpandableNames({
  title,
  names,
}: {
  title: string;
  names: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = names.length > 6;
  const visibleNames = expanded ? names : names.slice(0, 6);

  return (
    <section className="rounded-lg border border-border/50 bg-background/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-foreground">
          {title}
        </h3>
        {hasOverflow && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? "Collapse" : "Expand"}
          </Button>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {names.length === 0 ? "-" : visibleNames.join(", ")}
        {!expanded && hasOverflow ? "..." : ""}
      </p>
    </section>
  );
}

export function MovieDetailsModal({ movie, onClose }: MovieDetailsModalProps) {
  const isMasterpiece = isMasterpieceScore(movie.reviewScore);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-details-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close movie details"
        onClick={onClose}
      />

      <article
        className={cn(
          "relative flex h-[min(92dvh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-lg border bg-card shadow-2xl",
          isMasterpiece
            ? "border-amber-300/50 shadow-amber-500/10"
            : "border-border/60"
        )}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border/60 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Movie Details</p>
            <h1
              id="movie-details-title"
              className={cn(
                "truncate text-lg font-semibold tracking-tight",
                isMasterpiece && "text-amber-100"
              )}
            >
              {movie.displayTitle}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <Button type="button" variant="outline" size="sm" disabled>
              <Edit className="h-4 w-4" aria-hidden />
              Edit
            </Button>
            <Button type="button" variant="outline" size="sm" disabled>
              <RefreshCcw className="h-4 w-4" aria-hidden />
              Refresh Metadata
            </Button>
            <Button type="button" variant="destructive" size="sm" disabled>
              <Trash2 className="h-4 w-4" aria-hidden />
              Delete
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close movie details"
              onClick={onClose}
            >
              <X className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
            <aside className="space-y-4">
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.displayTitle}
                  className={cn(
                    "aspect-[2/3] w-full rounded-lg border object-cover",
                    isMasterpiece
                      ? "border-amber-300/50"
                      : "border-border/70"
                  )}
                />
              ) : (
                <div className="flex aspect-[2/3] w-full items-center justify-center rounded-lg border border-border/70 text-sm text-muted-foreground">
                  No Poster
                </div>
              )}

              <Button type="button" variant="outline" className="w-full" disabled>
                <ImageIcon className="h-4 w-4" aria-hidden />
                Change Poster
              </Button>
            </aside>

            <section className="min-w-0 space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <BestOfYearCrown active={movie.bestOfYear} showLabel />
                  <MovieBadge badgeId={movie.badgeId} />
                  <MovieStars stars={movie.stars} showValue size="md" />
                </div>

                <div>
                  <h2
                    className={cn(
                      "text-4xl font-semibold tracking-tight",
                      isMasterpiece && "text-amber-100"
                    )}
                  >
                    {movie.displayTitle}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {movie.originalTitle}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {movie.titlePt}
                  </p>
                </div>

                {isMasterpiece && (
                  <div className="rounded-lg border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
                    10/10 masterpiece
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  <MetadataItem label="Year" value={movie.year || "-"} />
                  <MetadataItem
                    label="Review"
                    value={formatReviewScore(movie.reviewScore)}
                  />
                  <MetadataItem
                    label="Stars"
                    value={<MovieStars stars={movie.stars} showValue />}
                  />
                  <MetadataItem
                    label="IMDb"
                    value={movie.imdbScore !== null ? movie.imdbScore : "-"}
                  />
                  <MetadataItem
                    label="Rotten"
                    value={
                      movie.rottenTomatoesScore !== null
                        ? `${movie.rottenTomatoesScore}%`
                        : "-"
                    }
                  />
                </div>
              </div>

              <Separator className="bg-border/60" />

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <MetadataItem label="Director" value={movie.director} />
                <MetadataItem label="Country" value={movie.country} />
                <MetadataItem label="Distributor" value={movie.distributor} />
                <MetadataItem
                  label="Runtime"
                  value={formatRuntime(movie.runtime)}
                />
                <MetadataItem
                  label="Release Date"
                  value={formatDate(movie.releaseDate)}
                />
                <MetadataItem
                  label="Watched Date"
                  value={formatDate(movie.watchedDate)}
                />
                <MetadataItem
                  label="Genres"
                  value={movie.genres.length ? movie.genres.join(", ") : "-"}
                />
              </div>

              <section className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Synopsis
                </h3>
                <p className="text-sm leading-7 text-foreground/90">
                  {movie.synopsis || "-"}
                </p>
              </section>

              <div className="grid gap-4 md:grid-cols-2">
                <ExpandableNames title="Cast" names={movie.cast} />
                <ExpandableNames title="Crew" names={movie.crew} />
              </div>

              <Separator className="bg-border/60" />

              <section className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Actions
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" disabled>
                    <ImageIcon className="h-4 w-4" aria-hidden />
                    Change Poster
                  </Button>
                  <Button type="button" variant="outline" disabled>
                    <ListPlus className="h-4 w-4" aria-hidden />
                    Manage Lists
                  </Button>
                </div>
              </section>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
````

## File: components/movie/movie-stars.tsx
````typescript
"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatStars } from "@/lib/movie-engines/stars-engine";

type MovieStarsProps = {
  stars: number | null | undefined;
  className?: string;
  showValue?: boolean;
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
} as const;

export function MovieStars({
  stars,
  className,
  showValue = false,
  size = "sm",
}: MovieStarsProps) {
  const value =
    typeof stars === "number" && Number.isFinite(stars)
      ? Math.max(0, Math.min(5, stars))
      : 0;

  if (value <= 0) {
    return (
      <span
        className={cn("text-muted-foreground", className)}
        aria-label="No stars"
      >
        -
      </span>
    );
  }

  const label = formatStars(value);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-0.5 text-primary",
        className
      )}
      aria-label={`${label} stars`}
      title={`${label} stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const position = index + 1;
        const iconClassName = sizeClasses[size];

        if (position <= value) {
          return (
            <Star
              key={position}
              className={iconClassName}
              fill="currentColor"
              aria-hidden
            />
          );
        }

        return (
          <Star
            key={position}
            className={cn(iconClassName, "text-muted-foreground/35")}
            aria-hidden
          />
        );
      })}
      {showValue && (
        <span className="ml-1.5 text-xs font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </span>
  );
}
````

## File: components/movies/.gitkeep
````

````

## File: components/providers/app-providers.tsx
````typescript
"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
````

## File: components/providers/theme-provider.tsx
````typescript
"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useThemeStore } from "@/store/theme-store";

function VisualThemeSync() {
  const visualTheme = useThemeStore((s) => s.visualTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-visual-theme", visualTheme);
  }, [visualTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <VisualThemeSync />
      {children}
    </NextThemesProvider>
  );
}
````

## File: components/settings/.gitkeep
````

````

## File: components/settings/visual-theme-settings.tsx
````typescript
"use client";

import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/theme-store";
import {
  VISUAL_THEMES,
  VISUAL_THEME_LABELS,
  type VisualTheme,
} from "@/types/theme";

export function VisualThemeSettings() {
  const visualTheme = useThemeStore((s) => s.visualTheme);
  const setVisualTheme = useThemeStore((s) => s.setVisualTheme);

  return (
    <div className="space-y-2">
      <Label>Visual theme</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {VISUAL_THEME_LABELS[visualTheme]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={visualTheme}
            onValueChange={(v) => setVisualTheme(v as VisualTheme)}
          >
            {VISUAL_THEMES.map((theme) => (
              <DropdownMenuRadioItem key={theme} value={theme}>
                {VISUAL_THEME_LABELS[theme]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
````

## File: components/ui/button.tsx
````typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-primary-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
````

## File: components/ui/dropdown-menu.tsx
````typescript
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
    {...props}
  />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
````

## File: components/ui/label.tsx
````typescript
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
````

## File: components/ui/separator.tsx
````typescript
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
````

## File: components/ui/tooltip.tsx
````typescript
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
````

## File: eslint.config.mjs
````javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
````

## File: hooks/.gitkeep
````

````

## File: lib/add-movie/constants.ts
````typescript
/** Shown until OMDb / TMDB credits enrichment is implemented */
export const ADD_MOVIE_UNENRICHED_PLACEHOLDER = "—";

export const ADD_MOVIE_MIN_SEARCH_LENGTH = 2;
export const ADD_MOVIE_SEARCH_DEBOUNCE_MS = 400;
````

## File: lib/add-movie/fetch-movie-details.ts
````typescript
export type MovieDetailsResponse = {
  ok: boolean;
  movie?: {
    tmdbId: number;

    title: string;
    originalTitle: string;
    titlePt: string;
    year: string;
    releaseDate: string;

    runtime: number | null;
    director: string;
    country: string;

    genres: string[];

    overview: string;

    imdbId?: string;
    imdbScore?: number | null;
    rottenTomatoesScore?: number | null;

    distributor?: string;

    cast?: string[];
    crew?: string[];
  };
  error?: string;
};

export async function fetchMovieDetails(tmdbId: number) {
  const response = await fetch(`/api/tmdb/movie/${tmdbId}`);

  const data = (await response.json()) as MovieDetailsResponse;

  if (!response.ok || !data.ok || !data.movie) {
    throw new Error(data.error ?? "Failed to load movie details.");
  }

  return data.movie;
}
````

## File: lib/add-movie/review-scores.ts
````typescript
/** Review score options: 1 through 10 in 0.5 increments */
export const REVIEW_SCORE_OPTIONS = Array.from({ length: 19 }, (_, index) => {
  const value = 1 + index * 0.5;
  return {
    value: String(value),
    label: Number.isInteger(value) ? String(value) : value.toFixed(1),
  };
});
````

## File: lib/add-movie/search-client.ts
````typescript
import type { TmdbSearchResponse } from "@/types/tmdb";
import type { AddMovieSearchResult } from "@/types/add-movie";

export type SearchMoviesResult =
  | { ok: true; results: AddMovieSearchResult[] }
  | { ok: false; error: string };

export async function searchMovies(
  query: string,
  signal?: AbortSignal
): Promise<SearchMoviesResult> {
  try {
    const params = new URLSearchParams({ q: query });
    const response = await fetch(`/api/tmdb/search?${params.toString()}`, {
      signal,
    });

    const data = (await response.json()) as TmdbSearchResponse;

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        error: data.ok === false ? data.error : "Search failed.",
      };
    }

    return { ok: true, results: data.results };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, error: "aborted" };
    }
    return {
      ok: false,
      error: "Unable to reach the movie search service. Try again.",
    };
  }
}
````

## File: lib/api/response.ts
````typescript
export type ApiSuccess<T> = { ok: true; data: T };
export type ApiError = { ok: false; error: string; code?: string };
export type ApiResult<T> = ApiSuccess<T> | ApiError;

export function apiSuccess<T>(data: T): ApiSuccess<T> {
  return { ok: true, data };
}

export function apiError(error: string, code?: string): ApiError {
  return { ok: false, error, code };
}
````

## File: lib/charts/theme.ts
````typescript
/** Recharts color tokens aligned with CSS variables */
export const chartColors = {
  primary: "var(--primary)",
  secondary: "var(--secondary)",
  accent: "var(--accent)",
  muted: "var(--muted-foreground)",
  border: "var(--border)",
} as const;

export const defaultChartMargin = { top: 8, right: 8, bottom: 0, left: 0 };
````

## File: lib/db/prisma.ts
````typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

/**
 * Prisma client — only instantiated when imported.
 * DATABASE_URL is required at runtime when the client is used, not at app boot.
 */
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}
````

## File: lib/forms/use-zod-form.ts
````typescript
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

export function useZodForm<T extends FieldValues>(
  schema: z.ZodType<T>,
  options?: Omit<UseFormProps<T>, "resolver"> & {
    defaultValues?: DefaultValues<T>;
  }
): UseFormReturn<T> {
  return useForm<T>({
    ...options,
    // @hookform/resolvers typings target a different Zod major than this project
    resolver: zodResolver(schema as never),
  });
}
````

## File: lib/motion.ts
````typescript
import type { Transition, Variants } from "framer-motion";

export const motionTransition: Transition = {
  duration: 0.25,
  ease: [0.25, 0.1, 0.25, 1],
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: motionTransition },
};

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: motionTransition },
};

export const slideInFromRight: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: motionTransition },
};

export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: motionTransition },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};
````

## File: lib/movie-engines/best-of-year-crown.ts
````typescript
export type CrownableMovie = {
  id: string;
  watchedDate: string;
  bestOfYear: boolean;
  reviewScore?: number | null;
  createdAt?: string;
};

export function getWatchedYear(
  watchedDate: string | null | undefined
): string {
  const match = String(watchedDate ?? "").match(/^(\d{4})-\d{2}-\d{2}/);
  return match?.[1] ?? "";
}

export function findBestOfYearWinnerForWatchedYear<T extends CrownableMovie>(
  movies: T[],
  watchedDate: string | null | undefined,
  ignoredMovieId?: string
): T | null {
  const watchedYear = getWatchedYear(watchedDate);

  if (!watchedYear) return null;

  return (
    movies.find(
      (movie) =>
        movie.id !== ignoredMovieId &&
        movie.bestOfYear &&
        getWatchedYear(movie.watchedDate) === watchedYear
    ) ?? null
  );
}

export function enforceBestOfYearCrown<T extends CrownableMovie>(
  movies: T[],
  crownedMovie: T
): T[] {
  const watchedYear = getWatchedYear(crownedMovie.watchedDate);

  if (!crownedMovie.bestOfYear || !watchedYear) {
    return movies.map((movie) =>
      movie.id === crownedMovie.id && movie.bestOfYear
        ? ({ ...movie, bestOfYear: false } as T)
        : movie
    );
  }

  return movies.map((movie) => {
    const isSameMovie = movie.id === crownedMovie.id;
    const isSameWatchedYear = getWatchedYear(movie.watchedDate) === watchedYear;

    if (!isSameMovie && isSameWatchedYear && movie.bestOfYear) {
      return { ...movie, bestOfYear: false } as T;
    }

    return movie;
  });
}

export function dedupeBestOfYearCrowns<T extends CrownableMovie>(
  movies: T[]
): T[] {
  const crownedYears = new Set<string>();

  return movies.map((movie) => {
    const watchedYear = getWatchedYear(movie.watchedDate);

    if (!movie.bestOfYear || !watchedYear) {
      return movie.bestOfYear
        ? ({ ...movie, bestOfYear: false } as T)
        : movie;
    }

    if (crownedYears.has(watchedYear)) {
      return { ...movie, bestOfYear: false } as T;
    }

    crownedYears.add(watchedYear);
    return movie;
  });
}

export function getBestOfYearWinners<T extends CrownableMovie>(
  movies: T[]
): T[] {
  return movies
    .filter((movie) => movie.bestOfYear && getWatchedYear(movie.watchedDate))
    .sort((a, b) => {
      const yearDiff =
        Number(getWatchedYear(b.watchedDate)) -
        Number(getWatchedYear(a.watchedDate));

      if (yearDiff !== 0) return yearDiff;

      const scoreDiff = (b.reviewScore ?? 0) - (a.reviewScore ?? 0);

      if (scoreDiff !== 0) return scoreDiff;

      return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
    });
}
````

## File: lib/movie-engines/stars-engine.ts
````typescript
export const MIN_REVIEW_SCORE = 1;
export const MAX_REVIEW_SCORE = 10;
export const MAX_STARS = 5;

export function calculateStars(
  reviewScore: number | null | undefined
): number {
  if (
    typeof reviewScore !== "number" ||
    !Number.isFinite(reviewScore) ||
    reviewScore <= 0
  ) {
    return 0;
  }

  if (reviewScore >= 9) return 5;
  if (reviewScore >= 7) return 4;
  if (reviewScore >= 5) return 3;
  if (reviewScore >= 2.5) return 2;
  return 1;
}

export function isMasterpieceScore(
  reviewScore: number | null | undefined
): boolean {
  return reviewScore === MAX_REVIEW_SCORE;
}

export function formatStars(stars: number | null | undefined): string {
  if (typeof stars !== "number" || !Number.isFinite(stars) || stars <= 0) {
    return "-";
  }

  return `${stars}/${MAX_STARS}`;
}

export function formatReviewScore(
  reviewScore: number | null | undefined
): string {
  if (
    typeof reviewScore !== "number" ||
    !Number.isFinite(reviewScore) ||
    reviewScore <= 0
  ) {
    return "-";
  }

  return `${Number.isInteger(reviewScore)
    ? reviewScore
    : reviewScore.toFixed(1)}/${MAX_REVIEW_SCORE}`;
}
````

## File: lib/omdb/fetch-movie-ratings.ts
````typescript
import { getOmdbApiKey } from "@/lib/omdb/server-env";

export type OmdbRatings = {
  imdbId?: string;
  imdbScore: number | null;
  rottenTomatoesScore: number | null;
};

export async function fetchMovieRatings(
  imdbId: string
): Promise<OmdbRatings> {
  const apiKey = getOmdbApiKey();

  if (!apiKey) {
    return {
      imdbId,
      imdbScore: null,
      rottenTomatoesScore: null,
    };
  }

  const url =
    `https://www.omdbapi.com/?apikey=${apiKey}` +
    `&i=${imdbId}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      imdbId,
      imdbScore: null,
      rottenTomatoesScore: null,
    };
  }

  const data = await response.json();

  const imdbScore =
    typeof data.imdbRating === "string" &&
    data.imdbRating !== "N/A"
      ? Number(data.imdbRating)
      : null;

  const rottenRating = Array.isArray(data.Ratings)
    ? data.Ratings.find(
        (rating: { Source?: string }) =>
          rating.Source === "Rotten Tomatoes"
      )
    : undefined;

  const rottenTomatoesScore =
    rottenRating?.Value &&
    typeof rottenRating.Value === "string"
      ? Number(rottenRating.Value.replace("%", ""))
      : null;

  return {
    imdbId,
    imdbScore,
    rottenTomatoesScore,
  };
}
````

## File: lib/omdb/server-env.ts
````typescript
import "server-only";

export function getOmdbApiKey(): string | undefined {
  const key = process.env.OMDB_API_KEY;

  if (typeof key !== "string") {
    return undefined;
  }

  const trimmed = key.trim();

  return trimmed.length > 0 ? trimmed : undefined;
}
````

## File: lib/supabase/client.ts
````typescript
import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/config";

/** Browser Supabase client — requires env configuration (see lib/supabase/config.ts). */
export function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createBrowserClient(url, anonKey);
}
````

## File: lib/supabase/config.ts
````typescript
/**
 * Supabase is optional until NEXT_PUBLIC_SUPABASE_URL and
 * NEXT_PUBLIC_SUPABASE_ANON_KEY are set in the environment.
 */

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return Boolean(url && anonKey);
}

export function getSupabaseEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
    );
  }

  return { url, anonKey };
}
````

## File: lib/supabase/index.ts
````typescript
export { isSupabaseConfigured, getSupabaseEnv } from "@/lib/supabase/config";
export { createClient as createBrowserSupabaseClient } from "@/lib/supabase/client";
export { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
export { updateSession } from "@/lib/supabase/middleware";
export { ARCHIVE_STORAGE_BUCKET, getStorage } from "@/lib/supabase/storage";
````

## File: lib/supabase/middleware.ts
````typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/config";

export async function updateSession(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.next({ request });
  }

  const { url, anonKey } = getSupabaseEnv();
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: Parameters<typeof supabaseResponse.cookies.set>[2];
        }[]
      ) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  await supabase.auth.getUser();

  return supabaseResponse;
}
````

## File: lib/supabase/server.ts
````typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "@/lib/supabase/config";

/** Server Supabase client — requires env configuration (see lib/supabase/config.ts). */
export async function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: Parameters<typeof cookieStore.set>[2];
        }[]
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — ignore when middleware handles refresh.
        }
      },
    },
  });
}
````

## File: lib/supabase/storage.ts
````typescript
import type { SupabaseClient } from "@supabase/supabase-js";

/** Storage bucket name — configure in Supabase when adding media assets */
export const ARCHIVE_STORAGE_BUCKET = "archive-media";

export function getStorage(client: SupabaseClient) {
  return client.storage.from(ARCHIVE_STORAGE_BUCKET);
}
````

## File: lib/tmdb/config.ts
````typescript
export const TMDB_API_BASE = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const TMDB_POSTER_SIZES = {
  thumb: "w92",
  card: "w185",
  detail: "w342",
} as const;
````

## File: lib/tmdb/map-movie-search.ts
````typescript
import type { TmdbMovieSearchItem } from "@/types/tmdb";

type TmdbApiMovie = {
  id: number;
  title?: string;
  original_title?: string;
  release_date?: string;
  poster_path?: string | null;
  overview?: string;
  original_language?: string;
};

export function mapTmdbApiMovie(movie: TmdbApiMovie): TmdbMovieSearchItem {
  const releaseYear = movie.release_date?.slice(0, 4) ?? "";

  return {
    tmdbId: movie.id,
    title: movie.title?.trim() || movie.original_title?.trim() || "Untitled",
    originalTitle: movie.original_title?.trim() || movie.title?.trim() || "",
    releaseYear,
    posterPath: movie.poster_path ?? null,
    overview: movie.overview?.trim() ?? "",
    originalLanguage: movie.original_language?.trim() ?? "",
  };
}
````

## File: lib/tmdb/poster.ts
````typescript
import { TMDB_IMAGE_BASE, TMDB_POSTER_SIZES } from "@/lib/tmdb/config";

export function getTmdbPosterUrl(
  posterPath: string | null | undefined,
  size: keyof typeof TMDB_POSTER_SIZES = "thumb"
): string | undefined {
  if (!posterPath) return undefined;
  const path = posterPath.startsWith("/") ? posterPath : `/${posterPath}`;
  return `${TMDB_IMAGE_BASE}/${TMDB_POSTER_SIZES[size]}${path}`;
}
````

## File: lib/tmdb/server-env.ts
````typescript
import "server-only";

/**
 * TMDB API key — server-only.
 * Loaded from .env.local as TMDB_API_KEY (restart dev server after changes).
 */
export function getTmdbApiKey(): string | undefined {
  const key = process.env.TMDB_API_KEY;
  if (typeof key !== "string") return undefined;
  const trimmed = key.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
````

## File: lib/utils.ts
````typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
````

## File: lib/utils/csv.ts
````typescript
import Papa from "papaparse";

export type CsvParseResult<T> = Papa.ParseResult<T>;

/**
 * Foundation wrapper for Papa Parse — use when importing/exporting archive data.
 */
export function parseCsv<T = Record<string, string>>(
  input: string,
  options?: Papa.ParseConfig
): CsvParseResult<T> {
  return Papa.parse<T>(input, {
    header: true,
    skipEmptyLines: true,
    ...options,
  });
}

export function stringifyCsv<T extends Record<string, unknown>>(
  data: T[],
  options?: Papa.UnparseConfig
): string {
  return Papa.unparse(data, options);
}
````

## File: lib/validators/base.ts
````typescript
import { z } from "zod";

/** Shared Zod primitives for forms and API validation */
export const idSchema = z.string().cuid();
export const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
````

## File: middleware.ts
````typescript
import { type NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.next({ request });
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
````

## File: next.config.ts
````typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
````

## File: package.json
````json
{
  "name": "horror-movie-archive",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.0.1",
    "@prisma/client": "^6.8.2",
    "@radix-ui/react-dropdown-menu": "^2.1.14",
    "@radix-ui/react-label": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.6",
    "@radix-ui/react-slot": "^1.2.2",
    "@radix-ui/react-tooltip": "^1.2.6",
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.49.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.12.1",
    "lucide-react": "^0.511.0",
    "next": "^15.3.2",
    "next-themes": "^0.4.6",
    "papaparse": "^5.5.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-hook-form": "^7.56.4",
    "recharts": "^2.15.3",
    "server-only": "^0.0.1",
    "tailwind-merge": "^3.3.0",
    "zod": "^3.25.28",
    "zustand": "^5.0.5"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.3.1",
    "@tailwindcss/postcss": "^4.1.7",
    "@types/node": "^22.15.21",
    "@types/papaparse": "^5.3.16",
    "@types/react": "^19.1.4",
    "@types/react-dom": "^19.1.5",
    "eslint": "^9.27.0",
    "eslint-config-next": "^15.3.2",
    "prisma": "^6.8.2",
    "tailwindcss": "^4.1.7",
    "tw-animate-css": "^1.3.0",
    "typescript": "^5.8.3"
  }
}
````

## File: postcss.config.mjs
````javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
````

## File: prisma/schema.prisma
````prisma
// Horror Movie Archive — Prisma schema
// Add models when implementing features. Requires DATABASE_URL and DIRECT_URL.

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
````

## File: README.md
````markdown
# Horror Movie Archive

Private, desktop-first horror movie archive — **foundation only** (no feature logic yet).

## Tech stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui (New York)
- Prisma ORM → Supabase Postgres
- Supabase Auth + Storage (client scaffolding)
- Zustand, React Hook Form, Zod
- Framer Motion, Recharts, Papa Parse

## Prerequisites

- Node.js 20+
- npm (or pnpm/yarn)
- Supabase project (optional until you wire database + auth)

The app **runs without Supabase or database configuration**. An empty `.env.local` is enough for local UI development. Set Supabase variables when you are ready to connect auth, storage, and Postgres.

## Setup commands

```bash
# 1. Go to project
cd C:\Users\Gean\horror-movie-archive

# 2. Install dependencies
npm install

# 3. Copy environment template
copy .env.example .env.local

# 4. Start dev server (works with an empty .env.local)
npm run dev

# 5. When connecting Supabase / Postgres, fill in .env.local (see below)
# 6. npm run db:generate && npm run db:push
```

### Optional: add more shadcn components later

```bash
npx shadcn@latest add input card dialog
```

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | App URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (server-only; do not expose) |
| `DATABASE_URL` | Prisma pooled connection (Supabase → Settings → Database) |
| `DIRECT_URL` | Direct connection for migrations (`?pgbouncer=true` on pool URL) |

**Supabase Prisma URLs:** use the Transaction pooler for `DATABASE_URL` and Session/direct for `DIRECT_URL`. See [Prisma + Supabase docs](https://supabase.com/docs/guides/database/prisma).

## Run instructions

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:push` | Sync schema to DB (dev) |
| `npm run db:migrate` | Create migration (prod workflow) |
| `npm run db:studio` | Prisma Studio |

## Folder architecture

```
app/                    # Next.js routes
  (app)/                # /library (default), /dashboard, /year-in-review, /lists, /settings
components/
  ui/                   # shadcn primitives
  layout/               # AppShell, Sidebar, TopBar
  providers/            # Theme + app providers
  settings/             # Visual theme settings
  library|lists/        # Feature UI (empty states until implemented)
lib/
  supabase/             # Browser, server, middleware clients
  db/                   # Prisma singleton
  validators/           # Zod schemas
  forms/                # useZodForm helper
  api/                  # API response helpers
  charts/               # Recharts tokens
  utils/                # csv (Papa Parse)
prisma/                 # schema.prisma
store/                  # Zustand (visual theme)
types/                  # Shared TS types
```

## Visual themes

Three visual themes (dark-only), managed from **Settings**:

- **Horror Archive** — default blood-accent archive look
- **VHS** — retro green/magenta with scanline overlay
- **Minimal** — neutral monochrome

Stored in Zustand (`hma-visual-theme`) and applied via `data-visual-theme` on `<html>`.

## What is intentionally not built

- Movie CRUD, lists, imports, or auth flows
- Fake seed data or business rules
- Mobile-first layouts or social features
````

## File: store/theme-store.ts
````typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VisualTheme } from "@/types/theme";
import { VISUAL_THEMES } from "@/types/theme";

type ThemeState = {
  visualTheme: VisualTheme;
  setVisualTheme: (theme: VisualTheme) => void;
};

function isVisualTheme(value: string): value is VisualTheme {
  return VISUAL_THEMES.includes(value as VisualTheme);
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      visualTheme: "horror-archive",
      setVisualTheme: (visualTheme) => set({ visualTheme }),
    }),
    {
      name: "hma-visual-theme",
      partialize: (state) => ({ visualTheme: state.visualTheme }),
      onRehydrateStorage: () => (state) => {
        if (state && !isVisualTheme(state.visualTheme)) {
          state.visualTheme = "horror-archive";
        }
      },
    }
  )
);
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
````

## File: types/index.ts
````typescript
export type { VisualTheme } from "./theme";
export { VISUAL_THEMES, VISUAL_THEME_LABELS } from "./theme";
export type { LibraryViewMode } from "./library";
export { LIBRARY_VIEW_MODES } from "./library";
export type {
  AddMovieFormValues,
  AddMovieMovieDraft,
  AddMoviePanelState,
  AddMovieSearchResult,
} from "./add-movie";
export { ADD_MOVIE_PANEL_STATES } from "./add-movie";
````

## File: types/theme.ts
````typescript
export const VISUAL_THEMES = [
  "horror-archive",
  "vhs",
  "minimal",
] as const;

export type VisualTheme = (typeof VISUAL_THEMES)[number];

export const VISUAL_THEME_LABELS: Record<VisualTheme, string> = {
  "horror-archive": "Horror Archive",
  vhs: "VHS",
  minimal: "Minimal",
};
````

## File: types/tmdb.ts
````typescript
/** TMDB movie search item — returned by /api/tmdb/search */
export type TmdbMovieSearchItem = {
  tmdbId: number;
  title: string;
  originalTitle: string;
  releaseYear: string;
  posterPath: string | null;
  overview: string;
  originalLanguage: string;
};

export type TmdbSearchSuccessResponse = {
  ok: true;
  results: TmdbMovieSearchItem[];
};

export type TmdbSearchErrorResponse = {
  ok: false;
  error: string;
};

export type TmdbSearchResponse =
  | TmdbSearchSuccessResponse
  | TmdbSearchErrorResponse;
````

## File: .env.example
````
# App (optional for local dev)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# TMDB (required for Add Movie search)
TMDB_API_KEY=

# OMDb (optional - enriches IMDb and Rotten Tomatoes ratings)
OMDB_API_KEY=

# Supabase (optional — app boots without these)
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=

# Database (optional — required only when using Prisma against Postgres)
# DATABASE_URL=
# DIRECT_URL=
````

## File: app/(app)/year-in-review/page.tsx
````typescript
"use client";

import { useMemo } from "react";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { getBestOfYearWinners } from "@/lib/movie-engines/best-of-year-crown";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";
import { useMovieStore } from "@/store/movie-store";

export default function YearInReviewPage() {
  const movies = useMovieStore((state) => state.movies);
  const winners = useMemo(() => getBestOfYearWinners(movies), [movies]);

  return (
    <div className="flex flex-col gap-6">
      <header className="border-b border-border/60 pb-5">
        <h2 className="text-2xl font-semibold tracking-tight">
          Year in Review
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Best-of-year crowns across the archive.
        </p>
      </header>

      {winners.length === 0 ? (
        <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6 text-center">
          <p className="text-sm text-muted-foreground">
            No best-of-year crowns yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {winners.map((movie) => (
            <article
              key={movie.tmdbId}
              className="flex gap-4 rounded-lg border border-border/50 bg-card/20 p-4"
            >
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.displayTitle}
                  className="h-28 w-20 shrink-0 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-28 w-20 shrink-0 items-center justify-center rounded-md border border-border/50 text-xs text-muted-foreground">
                  No Poster
                </div>
              )}

              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <BestOfYearCrown active={movie.bestOfYear} showLabel />
                  <span className="text-sm font-medium text-muted-foreground">
                    {movie.year}
                  </span>
                </div>

                <div>
                  <h3 className="truncate text-lg font-semibold tracking-tight">
                    {movie.displayTitle}
                  </h3>
                  <p className="truncate text-sm text-muted-foreground">
                    {movie.director}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <MovieStars stars={movie.stars} showValue />
                  <MovieBadge badgeId={movie.badgeId} />
                  <span className="text-xs text-muted-foreground">
                    Review {formatReviewScore(movie.reviewScore)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
````

## File: components/add-movie/add-movie-panel-content.tsx
````typescript
"use client";

import { AddMovieSearchField } from "@/components/add-movie/add-movie-search-field";
import { ConfirmationState } from "@/components/add-movie/states/confirmation-state";
import { IdleState } from "@/components/add-movie/states/idle-state";
import { ResultsState } from "@/components/add-movie/states/results-state";
import { SearchingState } from "@/components/add-movie/states/searching-state";
import { SuccessState } from "@/components/add-movie/states/success-state";
import type {
  DuplicateMovieMatch,
  SaveMovieOptions,
} from "@/components/add-movie/use-add-movie-flow";
import type { LibraryMovie } from "@/store/movie-store";
import type {
  AddMovieFormValues,
  AddMovieMovieDraft,
  AddMoviePanelState,
  AddMovieSearchResult,
} from "@/types/add-movie";

export type AddMoviePanelContentProps = {
  panelState: AddMoviePanelState;
  query: string;
  onQueryChange: (value: string) => void;
  showSearchField: boolean;
  queryTooShort: boolean;
  results: AddMovieSearchResult[];
  searchError: string | null;
  selectedMovie: AddMovieMovieDraft | null;
  formValues: AddMovieFormValues;
  duplicateMatch: DuplicateMovieMatch | null;
  bestOfYearReplacement: LibraryMovie | null;
  saveError: string | null;
  onFormChange: (patch: Partial<AddMovieFormValues>) => void;
  onSelectResult: (result: AddMovieSearchResult) => void;
  onBack: () => void;
  onSave: (options?: SaveMovieOptions) => void;
  onAddAnother: () => void;
  onViewMovie: () => void;
  onOpenExistingDuplicate: () => void;
};

export function AddMoviePanelContent({
  panelState,
  query,
  onQueryChange,
  showSearchField,
  queryTooShort,
  results,
  searchError,
  selectedMovie,
  formValues,
  duplicateMatch,
  bestOfYearReplacement,
  saveError,
  onFormChange,
  onSelectResult,
  onBack,
  onSave,
  onAddAnother,
  onViewMovie,
  onOpenExistingDuplicate,
}: AddMoviePanelContentProps) {
  if (panelState === "success" && selectedMovie) {
    return (
      <SuccessState
        movieTitle={selectedMovie.displayTitle}
        onAddAnother={onAddAnother}
        onViewMovie={onViewMovie}
      />
    );
  }

  if (panelState === "confirmation" && selectedMovie) {
    return (
      <ConfirmationState
        movie={selectedMovie}
        formValues={formValues}
        duplicateMatch={duplicateMatch}
        bestOfYearReplacement={bestOfYearReplacement}
        saveError={saveError}
        onFormChange={onFormChange}
        onBack={onBack}
        onSave={onSave}
        onOpenExistingDuplicate={onOpenExistingDuplicate}
      />
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      {showSearchField && (
        <AddMovieSearchField query={query} onQueryChange={onQueryChange} />
      )}

      {panelState === "idle" && <IdleState queryTooShort={queryTooShort} />}
      {panelState === "searching" && <SearchingState />}
      {panelState === "results" && (
        <ResultsState
          results={results}
          searchError={searchError}
          onSelect={onSelectResult}
        />
      )}
    </div>
  );
}
````

## File: components/add-movie/states/confirmation-state.tsx
````typescript
"use client";

import { REVIEW_SCORE_OPTIONS } from "@/lib/add-movie/review-scores";
import type {
  DuplicateMovieMatch,
  SaveMovieOptions,
} from "@/components/add-movie/use-add-movie-flow";
import type { AddMovieFormValues, AddMovieMovieDraft } from "@/types/add-movie";
import type { LibraryMovie } from "@/store/movie-store";
import { AddMoviePoster } from "@/components/add-movie/add-movie-poster";
import { DuplicateWarning } from "@/components/add-movie/states/duplicate-warning";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type ConfirmationStateProps = {
  movie: AddMovieMovieDraft;
  formValues: AddMovieFormValues;
  duplicateMatch: DuplicateMovieMatch | null;
  bestOfYearReplacement: LibraryMovie | null;
  saveError: string | null;
  onFormChange: (patch: Partial<AddMovieFormValues>) => void;
  onBack: () => void;
  onSave: (options?: SaveMovieOptions) => void;
  onOpenExistingDuplicate: () => void;
};

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="leading-relaxed text-foreground">{value}</span>
    </div>
  );
}

export function ConfirmationState({
  movie,
  formValues,
  duplicateMatch,
  bestOfYearReplacement,
  saveError,
  onFormChange,
  onBack,
  onSave,
  onOpenExistingDuplicate,
}: ConfirmationStateProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="flex gap-4">
        <AddMoviePoster
          posterUrl={movie.posterUrl}
          title={movie.displayTitle}
          className="h-28 w-20"
          sizes="160px"
        />
        <div className="min-w-0 flex-1 space-y-2">
          <h3 className="text-base font-semibold leading-tight tracking-tight">
            {movie.displayTitle}
          </h3>
          <div className="space-y-1.5">
            <MetadataRow label="Original" value={movie.originalTitle} />
            <MetadataRow label="Title PT" value={movie.titlePt} />
            <MetadataRow label="Year" value={movie.year} />
            <MetadataRow label="Director" value={movie.director} />
            <MetadataRow
              label="Runtime"
              value={movie.runtime ? `${movie.runtime} min` : "-"}
            />
          </div>
        </div>
      </div>

      <Separator className="bg-border/60" />

      <section className="space-y-4">
        <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Personal Data
        </h4>

        <div className="space-y-2">
          <Label htmlFor="add-movie-review-score">Review score</Label>
          <select
            id="add-movie-review-score"
            value={formValues.reviewScore}
            onChange={(e) => onFormChange({ reviewScore: e.target.value })}
            className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select score…</option>
            {REVIEW_SCORE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={formValues.bestOfYear}
            onChange={(e) => onFormChange({ bestOfYear: e.target.checked })}
            className="h-4 w-4 rounded border-input accent-primary"
          />
          <span>Best of Year</span>
        </label>

        {saveError && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {saveError}
          </p>
        )}

        <DuplicateWarning
          duplicateMatch={duplicateMatch}
          bestOfYearReplacement={bestOfYearReplacement}
          onOpenExistingDuplicate={onOpenExistingDuplicate}
          onAddAnyway={() => onSave({ allowDuplicate: true })}
          onConfirmBestOfYearReplacement={() =>
            onSave({
              allowDuplicate: true,
              confirmBestOfYearReplacement: true,
            })
          }
        />

        <div className="space-y-2">
          <Label htmlFor="add-movie-watched-date">
            Watched Date{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <input
            id="add-movie-watched-date"
            type="date"
            value={formValues.watchedDate}
            onChange={(e) => onFormChange({ watchedDate: e.target.value })}
            className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </section>

      <div className="mt-auto flex gap-2 border-t border-border/60 pt-5">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button type="button" className="flex-1" onClick={() => onSave()}>
          Save Movie
        </Button>
      </div>
    </div>
  );
}
````

## File: components/layout/sidebar.tsx
````typescript
"use client";

import { motion } from "framer-motion";
import {
  CalendarRange,
  LayoutDashboard,
  Library,
  List,
  Settings,
  Skull,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeIn, slideInFromLeft } from "@/lib/motion";
import { useMovieStore } from "@/store/movie-store";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/library", label: "Library", icon: Library },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/year-in-review", label: "Year in Review", icon: CalendarRange },
  { href: "/lists", label: "Lists", icon: List },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const movieCount = useMovieStore((state) => state.movies.length);

  return (
    <motion.aside
      variants={slideInFromLeft}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex h-full w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
      )}
    >
      <div className="flex items-center gap-2 px-4 py-5">
        <Skull className="h-5 w-5 text-primary" aria-hidden />
        <motion.div variants={fadeIn}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Private Archive
          </p>
          <h1 className="text-sm font-semibold leading-tight">Horror Movie</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {movieCount} {movieCount === 1 ? "Movie" : "Movies"}
          </p>
        </motion.div>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex flex-1 flex-col gap-0.5 p-2" aria-label="Main">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
            {label}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}
````

## File: components/library/library-content.tsx
````typescript
"use client";

import { LibraryGridView } from "@/components/library/library-grid-view";
import { LibraryListView } from "@/components/library/library-list-view";
import type { LibraryMovie } from "@/store/movie-store";
import type {
  LibrarySortKey,
  LibrarySortState,
  LibraryViewMode,
} from "@/types/library";

type LibraryContentProps = {
  viewMode: LibraryViewMode;
  movies: LibraryMovie[];
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
};

export function LibraryContent({
  viewMode,
  movies,
  onAddMovie,
  onOpenMovie,
  sort,
  onSortChange,
}: LibraryContentProps) {
  if (viewMode === "grid") {
    return (
      <LibraryGridView
        movies={movies}
        onAddMovie={onAddMovie}
        onOpenMovie={onOpenMovie}
      />
    );
  }

  return (
    <LibraryListView
      movies={movies}
      onAddMovie={onAddMovie}
      onOpenMovie={onOpenMovie}
      sort={sort}
      onSortChange={onSortChange}
    />
  );
}
````

## File: components/library/library-empty-state.tsx
````typescript
"use client";

import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LibraryEmptyStateProps = {
  onAddFirstMovie: () => void;
  variant?: "embedded" | "standalone";
  className?: string;
};

export function LibraryEmptyState({
  onAddFirstMovie,
  variant = "standalone",
  className,
}: LibraryEmptyStateProps) {
  const isEmbedded = variant === "embedded";

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex flex-col items-center justify-center text-center",
        isEmbedded ? "min-h-[min(52vh,520px)] px-6 py-16" : "min-h-[480px]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div
          className={cn(
            "library-empty-glow rounded-full",
            isEmbedded
              ? "h-[min(360px,80%)] w-[min(480px,90%)]"
              : "h-[min(420px,70%)] w-[min(520px,90%)]"
          )}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-md">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border/80 bg-card/60 shadow-inner">
          <Film className="h-6 w-6 text-primary/80" aria-hidden />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Add your first movie
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Add your first movie to begin building your archive.
        </p>
        <Button
          type="button"
          size="lg"
          className="mt-8 min-w-[180px]"
          onClick={onAddFirstMovie}
        >
          Add Movie
        </Button>
      </div>
    </motion.div>
  );
}
````

## File: components/library/library-grid-view.tsx
````typescript
"use client";

import { Film } from "lucide-react";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { isMasterpieceScore } from "@/lib/movie-engines/stars-engine";
import { cn } from "@/lib/utils";
import type { LibraryMovie } from "@/store/movie-store";

type LibraryGridViewProps = {
  movies: LibraryMovie[];
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
};

export function LibraryGridView({
  movies,
  onAddMovie,
  onOpenMovie,
}: LibraryGridViewProps) {
  if (movies.length === 0) {
    return (
      <div className="flex min-h-[420px] flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6">
        <Film
          className="mb-4 h-8 w-8 text-muted-foreground/40"
          aria-hidden
        />
        <p className="text-sm font-medium text-muted-foreground">
          Add your first movie
        </p>
        <button
          type="button"
          onClick={onAddMovie}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Add Movie
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-5 pb-2">
      {movies.map((movie) => {
        const isMasterpiece = isMasterpieceScore(movie.reviewScore);

        return (
          <button
            key={movie.id}
            type="button"
            onClick={() => onOpenMovie(movie.id)}
            className={cn(
              "group relative flex min-w-0 flex-col rounded-lg border bg-card/20 p-2 text-left transition-all duration-200",
              "hover:-translate-y-1 hover:bg-card/50 hover:shadow-xl",
              isMasterpiece
                ? "border-amber-300/50 shadow-amber-500/10 hover:shadow-amber-500/20"
                : "border-border/50 hover:border-primary/40 hover:shadow-primary/10"
            )}
          >
            <div className="overflow-hidden rounded-md border border-border/50 bg-background/50">
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.displayTitle}
                  className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]"
                />
              ) : (
                <div className="flex aspect-[2/3] w-full items-center justify-center text-muted-foreground">
                  <Film className="h-8 w-8 opacity-50" aria-hidden />
                </div>
              )}
            </div>

            <div className="min-w-0 space-y-2 px-1 pb-1 pt-3">
              <h3
                className={cn(
                  "line-clamp-2 text-sm font-semibold leading-snug text-foreground",
                  isMasterpiece && "text-amber-100"
                )}
              >
                {movie.displayTitle}
              </h3>

              <div className="flex min-h-7 flex-wrap items-center gap-1.5">
                <span className="text-xs text-muted-foreground">
                  {movie.year}
                </span>
                <BestOfYearCrown active={movie.bestOfYear} />
              </div>

              <div className="flex items-center justify-between gap-2">
                <MovieStars stars={movie.stars} />
                <span className="text-xs text-muted-foreground">
                  IMDb {movie.imdbScore !== null ? movie.imdbScore : "-"}
                </span>
              </div>

              <MovieBadge badgeId={movie.badgeId} className="max-w-full" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
````

## File: components/library/library-header.tsx
````typescript
"use client";

import { Plus, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LibrarySearch } from "@/components/library/library-search";
import { LibraryViewToggle } from "@/components/library/library-view-toggle";
import type {
  LibraryFilterOptions,
  LibraryFilters,
  LibrarySortDirection,
  LibrarySortKey,
  LibrarySortState,
  LibraryViewMode,
} from "@/types/library";

type LibraryHeaderProps = {
  viewMode: LibraryViewMode;
  onViewModeChange: (mode: LibraryViewMode) => void;
  movieCount: number;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  isSearchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey, direction?: LibrarySortDirection) => void;
  isFilterPanelOpen: boolean;
  activeFilterCount: number;
  filters: LibraryFilters;
  filterOptions: LibraryFilterOptions;
  onFilterPanelOpenChange: (open: boolean) => void;
  onFilterChange: <K extends keyof LibraryFilters>(
    key: K,
    value: LibraryFilters[K]
  ) => void;
  onClearFilters: () => void;
  onAddMovie: () => void;
};

const sortLabels: Record<LibrarySortKey, string> = {
  title: "Title",
  year: "Year",
  imdb: "IMDb",
  rotten: "Rotten Tomatoes",
  review: "Personal Review",
  watchedDate: "Watched Date",
};

export function LibraryHeader({
  viewMode,
  onViewModeChange,
  movieCount,
  searchQuery,
  onSearchQueryChange,
  isSearchOpen,
  onSearchOpenChange,
  sort,
  onSortChange,
  isFilterPanelOpen,
  activeFilterCount,
  filters,
  filterOptions,
  onFilterPanelOpenChange,
  onFilterChange,
  onClearFilters,
  onAddMovie,
}: LibraryHeaderProps) {
  return (
    <header className="sticky top-0 z-20 shrink-0 border-b border-border/60 bg-background/95 pb-5 backdrop-blur">
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Horror Movie List
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {movieCount} {movieCount === 1 ? "Movie" : "Movies"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <LibrarySearch
            isOpen={isSearchOpen}
            onOpenChange={onSearchOpenChange}
            value={searchQuery}
            onValueChange={onSearchQueryChange}
          />
          <LibraryViewToggle
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                Sort: {sortLabels[sort.key]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuRadioGroup
                value={`${sort.key}:${sort.direction}`}
                onValueChange={(value) => {
                  const [key, direction] = value.split(":") as [
                    LibrarySortKey,
                    LibrarySortDirection,
                  ];
                  onSortChange(key, direction);
                }}
              >
                {(
                  [
                    "title",
                    "year",
                    "imdb",
                    "rotten",
                    "review",
                    "watchedDate",
                  ] as LibrarySortKey[]
                ).flatMap((key) => [
                  <DropdownMenuRadioItem
                    key={`${key}:asc`}
                    value={`${key}:asc`}
                  >
                    {sortLabels[key]} ascending
                  </DropdownMenuRadioItem>,
                  <DropdownMenuRadioItem
                    key={`${key}:desc`}
                    value={`${key}:desc`}
                  >
                    {sortLabels[key]} descending
                  </DropdownMenuRadioItem>,
                ])}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                onClick={() => onFilterPanelOpenChange(!isFilterPanelOpen)}
                aria-label="Filters"
                aria-expanded={isFilterPanelOpen}
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden />
                {activeFilterCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-semibold text-black">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Filters</TooltipContent>
          </Tooltip>
          <Button type="button" onClick={onAddMovie} className="gap-2">
            <Plus className="h-4 w-4" aria-hidden />
            Add Movie
          </Button>
        </div>
      </div>

      {isFilterPanelOpen && (
        <div className="mt-4 rounded-lg border border-border/60 bg-card/40 p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Genre</span>
              <select
                value={filters.genre}
                onChange={(event) =>
                  onFilterChange("genre", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All genres</option>
                {filterOptions.genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Country</span>
              <select
                value={filters.country}
                onChange={(event) =>
                  onFilterChange("country", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All countries</option>
                {filterOptions.countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Distributor</span>
              <select
                value={filters.distributor}
                onChange={(event) =>
                  onFilterChange("distributor", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All distributors</option>
                {filterOptions.distributors.map((distributor) => (
                  <option key={distributor} value={distributor}>
                    {distributor}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Badge</span>
              <select
                value={filters.badgeId}
                onChange={(event) =>
                  onFilterChange("badgeId", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All badges</option>
                {filterOptions.badges.map((badgeId) => (
                  <option key={badgeId} value={badgeId}>
                    {badgeId}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Stars</span>
              <select
                value={filters.stars}
                onChange={(event) =>
                  onFilterChange("stars", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All stars</option>
                {filterOptions.stars.map((stars) => (
                  <option key={stars} value={stars}>
                    {stars} {stars === "1" ? "Star" : "Stars"}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end gap-2">
              <label className="flex h-9 flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={filters.bestOfYear}
                  onChange={(event) =>
                    onFilterChange("bestOfYear", event.target.checked)
                  }
                  className="h-4 w-4 accent-amber-400"
                />
                Best Of Year
              </label>
              {activeFilterCount > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={onClearFilters}
                  aria-label="Clear filters"
                >
                  <X className="h-4 w-4" aria-hidden />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
````

## File: components/library/library-list-table-header.tsx
````typescript
"use client";

import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LIBRARY_LIST_COLUMNS } from "@/lib/library/list-columns";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListTableHeaderProps = {
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
};

export function LibraryListTableHeader({
  sort,
  onSortChange,
}: LibraryListTableHeaderProps) {
  return (
    <thead className="library-list-thead">
      <tr>
        {LIBRARY_LIST_COLUMNS.map((column) => (
          <th
            key={column.id}
            scope="col"
            aria-sort={
              column.sortKey && sort.key === column.sortKey
                ? sort.direction === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            className={cn(
              "library-list-th",
              column.minWidth,
              column.sortable && "library-list-th--sortable"
            )}
          >
            <button
              type="button"
              disabled={!column.sortable || !column.sortKey}
              onClick={() => column.sortKey && onSortChange(column.sortKey)}
              className={cn(
                "inline-flex items-center justify-center gap-1.5",
                column.sortable &&
                  "cursor-pointer rounded-sm transition-colors hover:text-foreground",
                !column.sortable && "cursor-default"
              )}
            >
              <span>{column.label}</span>
              {column.sortable && (
                <ArrowUpDown
                  className={cn(
                    "h-3 w-3 shrink-0",
                    column.sortKey && sort.key === column.sortKey
                      ? "opacity-90"
                      : "opacity-40"
                  )}
                  aria-hidden
                />
              )}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
}
````

## File: components/library/library-search.tsx
````typescript
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
              value={value}
              onChange={(event) => onValueChange(event.target.value)}
              placeholder="Search archive..."
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
````

## File: components/library/library-shell.tsx
````typescript
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AddMovieSidePanel } from "@/components/add-movie/add-movie-side-panel";
import { LibraryHeader } from "@/components/library/library-header";
import { LibraryContent } from "@/components/library/library-content";
import { MovieDetailsModal } from "@/components/movie/movie-details-modal";
import { Button } from "@/components/ui/button";
import { useMovieStore } from "@/store/movie-store";
import type { LibraryMovie } from "@/store/movie-store";
import {
  DEFAULT_LIBRARY_FILTERS,
  DEFAULT_LIBRARY_SORT,
  LIBRARY_PAGE_SIZE,
  LIBRARY_SORT_KEYS,
  type LibraryFilterOptions,
  type LibraryFilters,
  type LibrarySortDirection,
  type LibrarySortKey,
  type LibrarySortState,
  type LibraryViewMode,
} from "@/types/library";

const LIBRARY_SORT_STORAGE_KEY = "hma-library-sort";

function normalizeSearchValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function movieMatchesSearch(movie: LibraryMovie, query: string): boolean {
  const normalizedQuery = normalizeSearchValue(query);
  if (!normalizedQuery) return true;

  const searchableValues = [
    movie.displayTitle,
    movie.originalTitle,
    movie.titlePt,
    movie.director,
    movie.distributor,
    ...movie.cast,
    ...movie.genres,
  ];

  return searchableValues.some((value) =>
    normalizeSearchValue(value).includes(normalizedQuery)
  );
}

function movieMatchesFilters(
  movie: LibraryMovie,
  filters: LibraryFilters
): boolean {
  if (filters.genre && !movie.genres.includes(filters.genre)) return false;
  if (filters.country && movie.country !== filters.country) return false;
  if (filters.distributor && movie.distributor !== filters.distributor) {
    return false;
  }
  if (filters.badgeId && movie.badgeId !== filters.badgeId) return false;
  if (filters.stars && String(movie.stars) !== filters.stars) return false;
  if (filters.bestOfYear && !movie.bestOfYear) return false;

  return true;
}

function compareStrings(a: string, b: string): number {
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

function compareNumbers(a: number | null, b: number | null): number {
  const left = a ?? Number.NEGATIVE_INFINITY;
  const right = b ?? Number.NEGATIVE_INFINITY;
  return left - right;
}

function compareBySortKey(
  a: LibraryMovie,
  b: LibraryMovie,
  key: LibrarySortKey
): number {
  switch (key) {
    case "title":
      return compareStrings(a.displayTitle, b.displayTitle);
    case "year":
      return compareStrings(a.year, b.year);
    case "imdb":
      return compareNumbers(a.imdbScore, b.imdbScore);
    case "rotten":
      return compareNumbers(a.rottenTomatoesScore, b.rottenTomatoesScore);
    case "review":
      return compareNumbers(a.reviewScore, b.reviewScore);
    case "watchedDate":
      return compareStrings(a.watchedDate, b.watchedDate);
  }
}

function isMissingSortValue(movie: LibraryMovie, key: LibrarySortKey): boolean {
  switch (key) {
    case "title":
      return !movie.displayTitle;
    case "year":
      return !movie.year;
    case "imdb":
      return movie.imdbScore === null;
    case "rotten":
      return movie.rottenTomatoesScore === null;
    case "review":
      return movie.reviewScore === null;
    case "watchedDate":
      return !movie.watchedDate;
  }
}

function isLibrarySortState(value: unknown): value is LibrarySortState {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<LibrarySortState>;
  return (
    typeof candidate.key === "string" &&
    LIBRARY_SORT_KEYS.includes(candidate.key as LibrarySortKey) &&
    (candidate.direction === "asc" || candidate.direction === "desc")
  );
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)))
    .sort((a, b) => compareStrings(a, b));
}

function getActiveFilterCount(filters: LibraryFilters): number {
  return [
    filters.genre,
    filters.country,
    filters.distributor,
    filters.badgeId,
    filters.stars,
    filters.bestOfYear,
  ].filter(Boolean).length;
}

export function LibraryShell() {
  const movies = useMovieStore((state) => state.movies);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<LibraryViewMode>("list");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<LibraryFilters>(
    DEFAULT_LIBRARY_FILTERS
  );
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] =
    useState<LibrarySortState>(DEFAULT_LIBRARY_SORT);
  const [savedScrollTop, setSavedScrollTop] = useState(0);

  useEffect(() => {
    const rawSort = window.localStorage.getItem(LIBRARY_SORT_STORAGE_KEY);
    if (!rawSort) return;

    try {
      const parsed = JSON.parse(rawSort) as unknown;
      if (isLibrarySortState(parsed)) {
        setSort(parsed);
      }
    } catch {
      window.localStorage.removeItem(LIBRARY_SORT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      LIBRARY_SORT_STORAGE_KEY,
      JSON.stringify(sort)
    );
  }, [sort]);

  const handleAddMovie = useCallback(() => {
    setIsAddMovieOpen(true);
  }, []);

  const handleFilterChange = useCallback(
    <K extends keyof LibraryFilters,>(key: K, value: LibraryFilters[K]) => {
      setFilters((current) => ({ ...current, [key]: value }));
      setCurrentPage(1);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_LIBRARY_FILTERS);
    setCurrentPage(1);
  }, []);

  const handleSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback(
    (key: LibrarySortKey, direction?: LibrarySortDirection) => {
      setSort((current) => {
        const nextDirection =
          direction ??
          (current.key === key && current.direction === "asc"
            ? "desc"
            : "asc");

        return { key, direction: nextDirection };
      });
      setCurrentPage(1);
    },
    []
  );

  const filterOptions = useMemo<LibraryFilterOptions>(
    () => ({
      genres: uniqueSorted(movies.flatMap((movie) => movie.genres)),
      countries: uniqueSorted(movies.map((movie) => movie.country)),
      distributors: uniqueSorted(movies.map((movie) => movie.distributor)),
      badges: uniqueSorted(
        movies
          .map((movie) => movie.badgeId ?? "")
          .filter((badgeId) => /^badge\d+$/.test(badgeId))
      ),
      stars: uniqueSorted(
        movies
          .map((movie) => (movie.stars > 0 ? String(movie.stars) : ""))
          .filter(Boolean)
      ).sort((a, b) => Number(b) - Number(a)),
    }),
    [movies]
  );

  const activeFilterCount = getActiveFilterCount(filters);

  const filteredMovies = useMemo(
    () =>
      movies.filter(
        (movie) =>
          movieMatchesSearch(movie, searchQuery) &&
          movieMatchesFilters(movie, filters)
      ),
    [filters, movies, searchQuery]
  );

  const sortedMovies = useMemo(() => {
    return [...filteredMovies].sort((a, b) => {
      const aMissing = isMissingSortValue(a, sort.key);
      const bMissing = isMissingSortValue(b, sort.key);

      if (aMissing !== bMissing) {
        return aMissing ? 1 : -1;
      }

      const sortResult = compareBySortKey(a, b, sort.key);
      const directedResult =
        sort.direction === "asc" ? sortResult : -sortResult;

      if (directedResult !== 0) return directedResult;

      return compareStrings(a.displayTitle, b.displayTitle);
    });
  }, [filteredMovies, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedMovies.length / LIBRARY_PAGE_SIZE)
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * LIBRARY_PAGE_SIZE;
  const paginatedMovies = sortedMovies.slice(
    startIndex,
    startIndex + LIBRARY_PAGE_SIZE
  );

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage]);

  const selectedMovie = selectedMovieId
    ? movies.find((movie) => movie.id === selectedMovieId) ?? null
    : null;

  const handleOpenMovie = useCallback((id: string) => {
    setSavedScrollTop(scrollRef.current?.scrollTop ?? 0);
    setSelectedMovieId(id);
  }, []);

  const handleCloseMovie = useCallback(() => {
    setSelectedMovieId(null);
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = savedScrollTop;
      }
    });
  }, [savedScrollTop]);

  return (
    <>
      <div className="flex min-h-[calc(100dvh-7.5rem)] flex-col">
        <LibraryHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          movieCount={movies.length}
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          isSearchOpen={isSearchOpen}
          onSearchOpenChange={setIsSearchOpen}
          sort={sort}
          onSortChange={handleSortChange}
          isFilterPanelOpen={isFilterPanelOpen}
          activeFilterCount={activeFilterCount}
          filters={filters}
          filterOptions={filterOptions}
          onFilterPanelOpenChange={setIsFilterPanelOpen}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onAddMovie={handleAddMovie}
        />

        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col overflow-auto pt-6"
        >
          {movies.length > 0 && sortedMovies.length === 0 ? (
            <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6 text-center">
              <p className="text-sm text-muted-foreground">
                No movies match this search or filter.
              </p>
            </div>
          ) : (
            <LibraryContent
              viewMode={viewMode}
              movies={paginatedMovies}
              onAddMovie={handleAddMovie}
              onOpenMovie={handleOpenMovie}
              sort={sort}
              onSortChange={handleSortChange}
            />
          )}

          {sortedMovies.length > LIBRARY_PAGE_SIZE && (
            <div className="mt-4 flex shrink-0 items-center justify-between border-t border-border/60 pt-4">
              <p className="text-sm text-muted-foreground">
                Page {safeCurrentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safeCurrentPage <= 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddMovieSidePanel
        open={isAddMovieOpen}
        onOpenChange={setIsAddMovieOpen}
      />

      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleCloseMovie}
        />
      )}
    </>
  );
}
````

## File: components/movie/movie-badge.tsx
````typescript
"use client";

import { cn } from "@/lib/utils";
import { getBadgeDefinition } from "@/lib/movie-engines/badge-engine";

type MovieBadgeProps = {
  badgeId: string | null | undefined;
  className?: string;
};

export function MovieBadge({ badgeId, className }: MovieBadgeProps) {
  const badge = getBadgeDefinition(badgeId);

  if (!badge) {
    return (
      <span
        className={cn("text-muted-foreground", className)}
        aria-label="No badge"
      >
        -
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center justify-center",
        className
      )}
      title={badge.id}
      aria-label={badge.id}
    >
      <img
        src={badge.assetPath}
        alt={badge.id}
        className="h-9 max-w-[5.5rem] object-contain"
      />
    </span>
  );
}
````

## File: lib/add-movie/map-to-draft.ts
````typescript
import { ADD_MOVIE_UNENRICHED_PLACEHOLDER } from "@/lib/add-movie/constants";
import { getTmdbPosterUrl } from "@/lib/tmdb/poster";
import type {
  AddMovieMovieDraft,
  AddMovieSearchResult,
} from "@/types/add-movie";

/** Build confirmation draft from a TMDB search hit */
export function mapSearchResultToDraft(
  result: AddMovieSearchResult
): AddMovieMovieDraft {
  return {
    tmdbId: result.tmdbId,

    displayTitle: result.title,
    originalTitle: result.originalTitle || result.title,
    titlePt: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    year: result.releaseYear || ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    releaseDate: "",

    posterPath: result.posterPath,
    posterUrl: getTmdbPosterUrl(result.posterPath, "detail"),

    director: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    country: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    distributor: ADD_MOVIE_UNENRICHED_PLACEHOLDER,
    runtime: null,

    synopsis: result.overview ?? "",

    cast: [],
    crew: [],
    genres: [],

    imdbId: undefined,
    imdbScore: null,
    rottenTomatoesScore: null,

    overview: result.overview,
    originalLanguage: result.originalLanguage,
  };
}
````

## File: lib/library/list-columns.ts
````typescript
import type { ReactNode } from "react";
import type { LibrarySortKey } from "@/types/library";

/**
 * Library list table column definitions — shared by shell and future data rows.
 */

export const LIBRARY_LIST_COLUMN_IDS = [
  "poster",
  "year",
  "title",
  "titlePt",
  "director",
  "country",
  "distributor",
  "badge",
  "stars",
  "review",
  "imdb",
  "rotten",
] as const;

export type LibraryListColumnId = (typeof LIBRARY_LIST_COLUMN_IDS)[number];

export type LibraryListColumnDef = {
  id: LibraryListColumnId;
  label: string;
  sortable: boolean;
  sortKey?: LibrarySortKey;
  /** Tailwind min-width utility for column sizing */
  minWidth: string;
};

export const LIBRARY_LIST_COLUMNS: LibraryListColumnDef[] = [
  { id: "poster", label: "Poster", sortable: false, minWidth: "min-w-[88px]" },
  {
    id: "year",
    label: "Year",
    sortable: true,
    sortKey: "year",
    minWidth: "min-w-[80px]",
  },
  {
    id: "title",
    label: "Title",
    sortable: true,
    sortKey: "title",
    minWidth: "min-w-[160px]",
  },
  {
    id: "titlePt",
    label: "Title PT",
    sortable: false,
    minWidth: "min-w-[160px]",
  },
  {
    id: "director",
    label: "Director",
    sortable: false,
    minWidth: "min-w-[140px]",
  },
  {
    id: "country",
    label: "Country",
    sortable: false,
    minWidth: "min-w-[120px]",
  },
  {
    id: "distributor",
    label: "Distributor",
    sortable: false,
    minWidth: "min-w-[140px]",
  },
  { id: "badge", label: "Badge", sortable: false, minWidth: "min-w-[100px]" },
  { id: "stars", label: "Stars", sortable: false, minWidth: "min-w-[88px]" },
  {
    id: "review",
    label: "Personal Review",
    sortable: true,
    sortKey: "review",
    minWidth: "min-w-[200px]",
  },
  {
    id: "imdb",
    label: "IMDb",
    sortable: true,
    sortKey: "imdb",
    minWidth: "min-w-[88px]",
  },
  {
    id: "rotten",
    label: "Rotten Tomatoes",
    sortable: true,
    sortKey: "rotten",
    minWidth: "min-w-[88px]",
  },
];

/** Future row shape — inject cell content per column when movies are wired */
export type LibraryMovieListRow = Partial<
  Record<LibraryListColumnId, ReactNode>
>;
````

## File: lib/movie-engines/badge-engine.ts
````typescript
export const AUTO_BADGE_IDS = [
  "badge1",
  "badge2",
  "badge3",
  "badge4",
  "badge5",
  "badge6",
  "badge7",
  "badge8",
  "badge9",
] as const;

export const MANUAL_BADGE_IDS = ["badge10", "badge11", "badge12"] as const;

export const MOVIE_BADGES = [
  {
    id: "badge1",
    label: "badge1",
    description: "10 review score",
    assetPath: "/badges/badge_1.png",
    minReviewScore: 10,
    automatic: true,
    tone: "gold",
  },
  {
    id: "badge2",
    label: "badge2",
    description: "9 to 9.5 review score",
    assetPath: "/badges/badge_2.png",
    minReviewScore: 9,
    automatic: true,
    tone: "crimson",
  },
  {
    id: "badge3",
    label: "badge3",
    description: "8 to 8.5 review score",
    assetPath: "/badges/badge_3.png",
    minReviewScore: 8,
    automatic: true,
    tone: "red",
  },
  {
    id: "badge4",
    label: "badge4",
    description: "7 to 7.5 review score",
    assetPath: "/badges/badge_4.png",
    minReviewScore: 7,
    automatic: true,
    tone: "amber",
  },
  {
    id: "badge5",
    label: "badge5",
    description: "6 to 6.5 review score",
    assetPath: "/badges/badge_5.png",
    minReviewScore: 6,
    automatic: true,
    tone: "orange",
  },
  {
    id: "badge6",
    label: "badge6",
    description: "5 to 5.5 review score",
    assetPath: "/badges/badge_6.png",
    minReviewScore: 5,
    automatic: true,
    tone: "slate",
  },
  {
    id: "badge7",
    label: "badge7",
    description: "4 to 4.5 review score",
    assetPath: "/badges/badge_7.png",
    minReviewScore: 4,
    automatic: true,
    tone: "violet",
  },
  {
    id: "badge8",
    label: "badge8",
    description: "1.5 to 3.5 review score",
    assetPath: "/badges/badge_8.png",
    minReviewScore: 1.5,
    automatic: true,
    tone: "muted",
  },
  {
    id: "badge9",
    label: "badge9",
    description: "1 review score",
    assetPath: "/badges/badge_9.png",
    minReviewScore: 1,
    automatic: true,
    tone: "muted",
  },
  {
    id: "badge10",
    label: "badge10",
    description: "Manual-only badge",
    assetPath: "/badges/badge_10.png",
    minReviewScore: null,
    automatic: false,
    tone: "manual",
  },
  {
    id: "badge11",
    label: "badge11",
    description: "Manual-only badge",
    assetPath: "/badges/badge_11.png",
    minReviewScore: null,
    automatic: false,
    tone: "manual",
  },
  {
    id: "badge12",
    label: "badge12",
    description: "Manual-only badge",
    assetPath: "/badges/badge_12.png",
    minReviewScore: null,
    automatic: false,
    tone: "manual",
  },
] as const;

export type MovieBadgeDefinition = (typeof MOVIE_BADGES)[number];
export type MovieBadgeId = MovieBadgeDefinition["id"];

export function getBadgeForReviewScore(
  reviewScore: number | null | undefined
): MovieBadgeDefinition | null {
  if (
    typeof reviewScore !== "number" ||
    !Number.isFinite(reviewScore) ||
    reviewScore <= 0
  ) {
    return null;
  }

  if (reviewScore >= 10) return getBadgeDefinition("badge1");
  if (reviewScore >= 9) return getBadgeDefinition("badge2");
  if (reviewScore >= 8) return getBadgeDefinition("badge3");
  if (reviewScore >= 7) return getBadgeDefinition("badge4");
  if (reviewScore >= 6) return getBadgeDefinition("badge5");
  if (reviewScore >= 5) return getBadgeDefinition("badge6");
  if (reviewScore >= 4) return getBadgeDefinition("badge7");
  if (reviewScore >= 1.5) return getBadgeDefinition("badge8");
  return getBadgeDefinition("badge9");
}

export function getBadgeDefinition(
  badgeId: string | null | undefined
): MovieBadgeDefinition | null {
  if (!badgeId) return null;

  return MOVIE_BADGES.find((badge) => badge.id === badgeId) ?? null;
}

export function calculateBadgeId(
  reviewScore: number | null | undefined,
  options?: {
    overrideEnabled?: boolean;
    currentBadgeId?: string | null;
  }
): string | null {
  if (options?.overrideEnabled) {
    return options.currentBadgeId ?? null;
  }

  return getBadgeForReviewScore(reviewScore)?.id ?? null;
}
````

## File: store/index.ts
````typescript
export { useThemeStore } from "./theme-store";
export { useMovieStore } from "./movie-store";
````

## File: store/movie-store.ts
````typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateBadgeId } from "@/lib/movie-engines/badge-engine";
import {
  dedupeBestOfYearCrowns,
  enforceBestOfYearCrown,
} from "@/lib/movie-engines/best-of-year-crown";
import { calculateStars } from "@/lib/movie-engines/stars-engine";

export type LibraryMovie = {
  // Identity
  id: string;
  tmdbId: number;
  imdbId?: string;

  displayTitle: string;
  originalTitle: string;
  titlePt: string;
  year: string;

  // Visual
  posterUrl?: string;

  // Metadata
  director: string;
  country: string;
  distributor: string;
  runtime: number | null;
  releaseDate: string;
  synopsis: string;

  cast: string[];
  crew: string[];
  genres: string[];
  subgenres: string[];

  // External Ratings
  imdbScore: number | null;
  rottenTomatoesScore: number | null;

  // Personal Ratings
  reviewScore: number | null;
  stars: number;
  badgeId: string | null;
  badgeOverrideEnabled: boolean;

  // Personal Tracking
  watchedDate: string;
  bestOfYear: boolean;

  // Organization
  assignedLists: string[];

  // System
  createdAt: string;
  updatedAt: string;
  metadataSourceSnapshot: string | null;
  metadataLastRefreshedAt: string | null;
};

type MovieRecord = Record<string, unknown>;

function asRecord(value: unknown): MovieRecord | null {
  return typeof value === "object" && value !== null
    ? (value as MovieRecord)
    : null;
}

function toStringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}

function toNullableString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : null;
}

function toNumberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is string =>
      typeof item === "string" && item.trim().length > 0
  );
}

function normalizeLibraryMovie(value: unknown): LibraryMovie | null {
  const record = asRecord(value);
  if (!record) return null;

  const tmdbId = toNumberOrNull(record.tmdbId);
  if (tmdbId === null) return null;

  const now = new Date().toISOString();
  const reviewScore = toNumberOrNull(record.reviewScore);
  const badgeOverrideEnabled = record.badgeOverrideEnabled === true;
  const currentBadgeId =
    typeof record.badgeId === "string" && record.badgeId.trim().length > 0
      ? record.badgeId
      : null;

  const displayTitle = toStringValue(record.displayTitle, "Untitled");
  const originalTitle = toStringValue(record.originalTitle, displayTitle);

  return {
    id: toStringValue(record.id, `tmdb-${tmdbId}`),
    tmdbId,
    imdbId: toOptionalString(record.imdbId),

    displayTitle,
    originalTitle,
    titlePt: toStringValue(record.titlePt, displayTitle),
    year: toStringValue(record.year),

    posterUrl: toOptionalString(record.posterUrl),

    director: toStringValue(record.director, "-"),
    country: toStringValue(record.country, "-"),
    distributor: toStringValue(record.distributor, "-"),
    runtime: toNumberOrNull(record.runtime),
    releaseDate: toStringValue(record.releaseDate),
    synopsis: toStringValue(record.synopsis),

    cast: toStringArray(record.cast),
    crew: toStringArray(record.crew),
    genres: toStringArray(record.genres),
    subgenres: toStringArray(record.subgenres),

    imdbScore: toNumberOrNull(record.imdbScore),
    rottenTomatoesScore: toNumberOrNull(record.rottenTomatoesScore),

    reviewScore,
    stars: calculateStars(reviewScore),
    badgeId: calculateBadgeId(reviewScore, {
      overrideEnabled: badgeOverrideEnabled,
      currentBadgeId,
    }),
    badgeOverrideEnabled,

    watchedDate: toStringValue(record.watchedDate),
    bestOfYear: record.bestOfYear === true,

    assignedLists: toStringArray(record.assignedLists),

    createdAt: toStringValue(record.createdAt, now),
    updatedAt: toStringValue(record.updatedAt, now),
    metadataSourceSnapshot: toNullableString(record.metadataSourceSnapshot),
    metadataLastRefreshedAt: toNullableString(record.metadataLastRefreshedAt),
  };
}

function normalizeMovieList(value: unknown): LibraryMovie[] {
  if (!Array.isArray(value)) return [];

  return dedupeBestOfYearCrowns(
    value
      .map(normalizeLibraryMovie)
      .filter((movie): movie is LibraryMovie => movie !== null)
  );
}

type MovieState = {
  movies: LibraryMovie[];

  addMovie: (movie: LibraryMovie) => void;

  updateMovie: (id: string, updates: Partial<LibraryMovie>) => void;

  removeMovie: (id: string) => void;
};

export const useMovieStore = create<MovieState>()(
  persist(
    (set) => ({
      movies: [],

      addMovie: (movie) =>
        set((state) => {
          const normalizedMovie = normalizeLibraryMovie(movie);

          if (!normalizedMovie) {
            return state;
          }

          const movies = [
            normalizedMovie,
            ...state.movies.filter(
              (m) => m.id !== normalizedMovie.id
            ),
          ];

          return {
            movies: dedupeBestOfYearCrowns(
              enforceBestOfYearCrown(movies, normalizedMovie)
            ),
          };
        }),

      updateMovie: (id, updates) =>
        set((state) => {
          let updatedMovie: LibraryMovie | null = null;

          const movies = state.movies.map((movie) => {
            if (movie.id !== id) return movie;

            updatedMovie = normalizeLibraryMovie({
              ...movie,
              ...updates,
              updatedAt: new Date().toISOString(),
            });

            return updatedMovie ?? movie;
          });

          if (!updatedMovie) {
            return { movies };
          }

          return {
            movies: dedupeBestOfYearCrowns(
              enforceBestOfYearCrown(movies, updatedMovie)
            ),
          };
        }),

      removeMovie: (id) =>
        set((state) => ({
          movies: state.movies.filter(
            (movie) => movie.id !== id
          ),
        })),
    }),
    {
      name: "hma-movies",
      merge: (persistedState, currentState) => {
        const persisted = asRecord(persistedState);

        return {
          ...currentState,
          ...(persisted ?? {}),
          movies: normalizeMovieList(persisted?.movies),
        };
      },
    }
  )
);
````

## File: types/add-movie.ts
````typescript
export const ADD_MOVIE_PANEL_STATES = [
  "idle",
  "searching",
  "results",
  "confirmation",
  "success",
] as const;

export type AddMoviePanelState = (typeof ADD_MOVIE_PANEL_STATES)[number];

/** TMDB search hit */
export type AddMovieSearchResult = {
  tmdbId: number;
  title: string;
  originalTitle: string;
  releaseYear: string;
  posterPath: string | null;
  overview: string;
  originalLanguage: string;
};

/** Confirmation draft */
export type AddMovieMovieDraft = {
  tmdbId: number;

  displayTitle: string;
  originalTitle: string;
  titlePt: string;
  year: string;
  releaseDate: string;

  posterPath: string | null;
  posterUrl?: string;

  director: string;
  country: string;
  distributor: string;
  runtime: number | null;

  synopsis: string;

  cast: string[];
  crew: string[];
  genres: string[];

  imdbId?: string;
  imdbScore: number | null;
  rottenTomatoesScore: number | null;

  overview?: string;
  originalLanguage?: string;
};

export type AddMovieFormValues = {
  reviewScore: string;
  bestOfYear: boolean;
  watchedDate: string;
};
````

## File: types/library.ts
````typescript
export const LIBRARY_VIEW_MODES = ["list", "grid"] as const;

export type LibraryViewMode = (typeof LIBRARY_VIEW_MODES)[number];

export const LIBRARY_SORT_KEYS = [
  "title",
  "year",
  "imdb",
  "rotten",
  "review",
  "watchedDate",
] as const;

export type LibrarySortKey = (typeof LIBRARY_SORT_KEYS)[number];
export type LibrarySortDirection = "asc" | "desc";

export type LibrarySortState = {
  key: LibrarySortKey;
  direction: LibrarySortDirection;
};

export const DEFAULT_LIBRARY_SORT: LibrarySortState = {
  key: "title",
  direction: "asc",
};

export const LIBRARY_PAGE_SIZE = 100;

export type LibraryFilters = {
  genre: string;
  country: string;
  distributor: string;
  badgeId: string;
  stars: string;
  bestOfYear: boolean;
};

export type LibraryFilterOptions = {
  genres: string[];
  countries: string[];
  distributors: string[];
  badges: string[];
  stars: string[];
};

export const DEFAULT_LIBRARY_FILTERS: LibraryFilters = {
  genre: "",
  country: "",
  distributor: "",
  badgeId: "",
  stars: "",
  bestOfYear: false,
};
````

## File: app/(app)/movies/[id]/page.tsx
````typescript
"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { MovieDetailsModal } from "@/components/movie/movie-details-modal";
import { useMovieStore } from "@/store/movie-store";

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
  const routeId = Array.isArray(params.id) ? params.id[0] : params.id;
  const numericRouteId = Number(routeId);

  const movie = useMovieStore((state) =>
    state.movies.find(
      (m) =>
        m.id === routeId ||
        (Number.isFinite(numericRouteId) && m.tmdbId === numericRouteId)
    )
  );

  if (!movie) {
    notFound();
  }

  return <MovieDetailsModal movie={movie} onClose={() => router.back()} />;
}
````

## File: components/add-movie/add-movie-side-panel.tsx
````typescript
"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { overlayFade, slideInFromRight } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AddMoviePanelContent } from "@/components/add-movie/add-movie-panel-content";
import { useAddMovieFlow } from "@/components/add-movie/use-add-movie-flow";

export type AddMovieSidePanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddMovieSidePanel({
  open,
  onOpenChange,
}: AddMovieSidePanelProps) {
  const [mounted, setMounted] = useState(false);
  const flow = useAddMovieFlow(open);
  const router = useRouter();

  const close = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleViewMovie = useCallback(() => {
    if (!flow.savedMovieId) return;

    close();
    router.push(`/movies/${flow.savedMovieId}`);
  }, [flow.savedMovieId, router, close]);

  const handleOpenExistingDuplicate = useCallback(() => {
    if (!flow.duplicateMatch) return;

    close();
    router.push(`/movies/${flow.duplicateMatch.movie.id}`);
  }, [flow.duplicateMatch, router, close]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (flow.showSearchField) {
      requestAnimationFrame(() => {
        document.getElementById("add-movie-search")?.focus();
      });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close, flow.showSearchField]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="add-movie-portal fixed inset-0 z-50 flex justify-end">
          <motion.button
            type="button"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="hidden"
            aria-label="Close add movie panel"
            className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"
            onClick={close}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-movie-panel-title"
            variants={slideInFromRight}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              "add-movie-panel relative flex h-full w-full max-w-md flex-col",
              "border-l border-border/60 bg-card shadow-2xl"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex shrink-0 items-center justify-between border-b border-border/60 px-6 py-5">
              <h2
                id="add-movie-panel-title"
                className="text-lg font-semibold tracking-tight"
              >
                Add Movie
              </h2>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={close}
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden />
              </Button>
            </header>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6">
              <AddMoviePanelContent
                panelState={flow.panelState}
                query={flow.query}
                onQueryChange={flow.handleQueryChange}
                showSearchField={flow.showSearchField}
                queryTooShort={flow.queryTooShort}
                results={flow.results}
                searchError={flow.searchError}
                selectedMovie={flow.selectedMovie}
                formValues={flow.formValues}
                duplicateMatch={flow.duplicateMatch}
                bestOfYearReplacement={flow.bestOfYearReplacement}
                saveError={flow.saveError}
                onFormChange={flow.updateFormValues}
                onSelectResult={flow.handleSelectResult}
                onBack={flow.handleBackFromConfirmation}
                onSave={flow.handleSaveMovie}
                onAddAnother={flow.handleAddAnother}
                onViewMovie={handleViewMovie}
                onOpenExistingDuplicate={handleOpenExistingDuplicate}
              />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
````

## File: components/add-movie/use-add-movie-flow.ts
````typescript
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ADD_MOVIE_MIN_SEARCH_LENGTH,
  ADD_MOVIE_SEARCH_DEBOUNCE_MS,
} from "@/lib/add-movie/constants";
import { fetchMovieDetails } from "@/lib/add-movie/fetch-movie-details";
import { mapSearchResultToDraft } from "@/lib/add-movie/map-to-draft";
import { searchMovies } from "@/lib/add-movie/search-client";
import { calculateBadgeId } from "@/lib/movie-engines/badge-engine";
import { findBestOfYearWinnerForWatchedYear } from "@/lib/movie-engines/best-of-year-crown";
import { calculateStars } from "@/lib/movie-engines/stars-engine";
import { useMovieStore } from "@/store";
import type { LibraryMovie } from "@/store/movie-store";
import type {
  AddMovieFormValues,
  AddMovieMovieDraft,
  AddMoviePanelState,
  AddMovieSearchResult,
} from "@/types/add-movie";

export type DuplicateMovieMatch = {
  reason: "TMDB ID" | "IMDb ID" | "title and year";
  movie: LibraryMovie;
};

export type SaveMovieOptions = {
  allowDuplicate?: boolean;
  confirmBestOfYearReplacement?: boolean;
};

const initialFormValues: AddMovieFormValues = {
  reviewScore: "",
  bestOfYear: false,
  watchedDate: "",
};

function createMovieId(tmdbId: number): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${tmdbId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeTitle(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleCandidates(movie: {
  displayTitle: string;
  originalTitle: string;
  titlePt: string;
}) {
  return [movie.displayTitle, movie.originalTitle, movie.titlePt]
    .map(normalizeTitle)
    .filter(Boolean);
}

function findDuplicateMovie(
  selectedMovie: AddMovieMovieDraft,
  movies: LibraryMovie[]
): DuplicateMovieMatch | null {
  const tmdbMatch = movies.find(
    (movie) => movie.tmdbId === selectedMovie.tmdbId
  );
  if (tmdbMatch) return { reason: "TMDB ID", movie: tmdbMatch };

  if (selectedMovie.imdbId) {
    const imdbMatch = movies.find(
      (movie) => movie.imdbId && movie.imdbId === selectedMovie.imdbId
    );
    if (imdbMatch) return { reason: "IMDb ID", movie: imdbMatch };
  }

  const selectedTitles = titleCandidates(selectedMovie);
  const titleYearMatch = movies.find((movie) => {
    if (movie.year !== selectedMovie.year) return false;

    const existingTitles = titleCandidates(movie);
    return selectedTitles.some((title) => existingTitles.includes(title));
  });

  return titleYearMatch
    ? { reason: "title and year", movie: titleYearMatch }
    : null;
}

export function useAddMovieFlow(open: boolean) {
  const addMovie = useMovieStore((state) => state.addMovie);
  const movies = useMovieStore((state) => state.movies);

  const [panelState, setPanelState] = useState<AddMoviePanelState>("idle");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AddMovieSearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] =
    useState<AddMovieMovieDraft | null>(null);
  const [duplicateMatch, setDuplicateMatch] =
    useState<DuplicateMovieMatch | null>(null);
  const [bestOfYearReplacement, setBestOfYearReplacement] =
    useState<LibraryMovie | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedMovieId, setSavedMovieId] = useState<string | null>(null);

  const [formValues, setFormValues] =
    useState<AddMovieFormValues>(initialFormValues);

  const resetFlow = useCallback(() => {
    setPanelState("idle");
    setQuery("");
    setResults([]);
    setSearchError(null);
    setSelectedMovie(null);
    setDuplicateMatch(null);
    setBestOfYearReplacement(null);
    setSaveError(null);
    setSavedMovieId(null);
    setFormValues(initialFormValues);
  }, []);

  useEffect(() => {
    if (!open) {
      resetFlow();
    }
  }, [open, resetFlow]);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setPanelState("idle");
      setResults([]);
      setSearchError(null);
      return;
    }

    if (trimmed.length < ADD_MOVIE_MIN_SEARCH_LENGTH) {
      setPanelState("idle");
      setResults([]);
      setSearchError(null);
      return;
    }

    setPanelState("searching");
    setResults([]);
    setSearchError(null);

    const abortController = new AbortController();

    const debounceTimer = setTimeout(async () => {
      const outcome = await searchMovies(trimmed, abortController.signal);

      if (abortController.signal.aborted) return;

      if (!outcome.ok) {
        if (outcome.error === "aborted") return;

        setSearchError(outcome.error);
        setResults([]);
        setPanelState("results");
        return;
      }

      setResults(outcome.results);
      setSearchError(null);
      setPanelState("results");
    }, ADD_MOVIE_SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(debounceTimer);
      abortController.abort();
    };
  }, [query]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleSelectResult = useCallback(
    async (result: AddMovieSearchResult) => {
      setPanelState("searching");
      setDuplicateMatch(null);
      setBestOfYearReplacement(null);
      setSaveError(null);

      const draft = mapSearchResultToDraft(result);

      try {
        const details = await fetchMovieDetails(result.tmdbId);

        draft.director = details.director;
        draft.titlePt = details.titlePt;
        draft.releaseDate = details.releaseDate;

        draft.country = details.country;
        draft.runtime = details.runtime;
        draft.genres = details.genres;

        draft.synopsis = details.overview;

        draft.distributor = details.distributor ?? "-";

        draft.cast = details.cast ?? [];
        draft.crew = details.crew ?? [];

        draft.imdbId = details.imdbId;
        draft.imdbScore = details.imdbScore ?? null;
        draft.rottenTomatoesScore =
          details.rottenTomatoesScore ?? null;
      } catch (error) {
        console.error("Failed to load movie details", error);
      }

      setSelectedMovie(draft);
      setFormValues(initialFormValues);
      setPanelState("confirmation");
    },
    []
  );

  const handleBackFromConfirmation = useCallback(() => {
    setPanelState("results");
    setFormValues(initialFormValues);
    setDuplicateMatch(null);
    setBestOfYearReplacement(null);
    setSaveError(null);
  }, []);

  const handleSaveMovie = useCallback(
    (options: SaveMovieOptions = {}) => {
      if (!selectedMovie) return;

      setSaveError(null);

      if (formValues.bestOfYear && !formValues.watchedDate) {
        setSaveError("Best of Year requires a watched date.");
        return;
      }

      const duplicate = findDuplicateMovie(selectedMovie, movies);
      if (duplicate && !options.allowDuplicate) {
        setDuplicateMatch(duplicate);
        return;
      }
      if (options.allowDuplicate) {
        setDuplicateMatch(null);
      }

      if (formValues.bestOfYear) {
        const replacement = findBestOfYearWinnerForWatchedYear(
          movies,
          formValues.watchedDate
        );

        if (replacement && !options.confirmBestOfYearReplacement) {
          setBestOfYearReplacement(replacement);
          return;
        }
      }

      const reviewScore = formValues.reviewScore
        ? Number(formValues.reviewScore)
        : null;
      const stars = calculateStars(reviewScore);
      const badgeId = calculateBadgeId(reviewScore);
      const now = new Date().toISOString();
      const movieId = createMovieId(selectedMovie.tmdbId);

      addMovie({
        id: movieId,
        tmdbId: selectedMovie.tmdbId,
        imdbId: selectedMovie.imdbId,

        displayTitle: selectedMovie.displayTitle,
        originalTitle: selectedMovie.originalTitle,
        titlePt: selectedMovie.titlePt,
        year: selectedMovie.year,

        posterUrl: selectedMovie.posterUrl,

        director: selectedMovie.director,
        country: selectedMovie.country,
        distributor: selectedMovie.distributor,
        runtime: selectedMovie.runtime,
        releaseDate: selectedMovie.releaseDate,
        synopsis: selectedMovie.synopsis,

        cast: selectedMovie.cast,
        crew: selectedMovie.crew,
        genres: selectedMovie.genres,
        subgenres: [],

        imdbScore: selectedMovie.imdbScore,
        rottenTomatoesScore: selectedMovie.rottenTomatoesScore,

        reviewScore,
        stars,
        badgeId,
        badgeOverrideEnabled: false,

        watchedDate: formValues.watchedDate,
        bestOfYear: formValues.bestOfYear,

        assignedLists: [],

        createdAt: now,
        updatedAt: now,
        metadataSourceSnapshot: JSON.stringify({
          tmdbId: selectedMovie.tmdbId,
          imdbId: selectedMovie.imdbId ?? null,
          sources: [
            "TMDB",
            selectedMovie.imdbId ? "OMDb" : null,
          ].filter(Boolean),
        }),
        metadataLastRefreshedAt: now,
      });

      setDuplicateMatch(null);
      setBestOfYearReplacement(null);
      setSavedMovieId(movieId);
      setPanelState("success");
    },
    [selectedMovie, formValues, movies, addMovie]
  );

  const handleAddAnother = useCallback(() => {
    resetFlow();
  }, [resetFlow]);

  const updateFormValues = useCallback(
    (patch: Partial<AddMovieFormValues>) => {
      setFormValues((prev) => ({ ...prev, ...patch }));
      setSaveError(null);

      if ("bestOfYear" in patch || "watchedDate" in patch) {
        setBestOfYearReplacement(null);
      }
    },
    []
  );

  const trimmedQuery = query.trim();

  const queryTooShort =
    trimmedQuery.length > 0 &&
    trimmedQuery.length < ADD_MOVIE_MIN_SEARCH_LENGTH;

  const showSearchField =
    panelState === "idle" ||
    panelState === "searching" ||
    panelState === "results";

  return {
    panelState,
    query,
    results,
    searchError,
    queryTooShort,
    selectedMovie,
    formValues,
    duplicateMatch,
    bestOfYearReplacement,
    saveError,
    savedMovieId,
    showSearchField,
    handleQueryChange,
    handleSelectResult,
    handleBackFromConfirmation,
    handleSaveMovie,
    handleAddAnother,
    updateFormValues,
    resetFlow,
  };
}
````

## File: components/library/library-list-table.tsx
````typescript
import { cn } from "@/lib/utils";
import { LIBRARY_LIST_COLUMNS } from "@/lib/library/list-columns";
import type { LibraryMovieListRow } from "@/lib/library/list-columns";
import { LibraryListTableHeader } from "@/components/library/library-list-table-header";
import { LibraryEmptyState } from "@/components/library/library-empty-state";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListTableProps = {
  rows?: Array<LibraryMovieListRow & { id?: string; tmdbId?: number }>;
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
  className?: string;
};

export function LibraryListTable({
  rows = [],
  onAddMovie,
  onOpenMovie,
  sort,
  onSortChange,
  className,
}: LibraryListTableProps) {
  const isEmpty = rows.length === 0;
  const columnCount = LIBRARY_LIST_COLUMNS.length;

  return (
    <div
      className={cn(
        "library-list-table flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border/50 bg-card/20",
        className
      )}
    >
      <div className="library-list-scroll min-h-0 flex-1 overflow-auto">
        <table className="library-list-table__table w-full min-w-[1280px] border-collapse">
          <LibraryListTableHeader sort={sort} onSortChange={onSortChange} />
          <tbody>
            {isEmpty ? (
              <tr className="library-list-empty-row">
                <td colSpan={columnCount} className="p-0 align-top">
                  <LibraryEmptyState
                    variant="embedded"
                    onAddFirstMovie={onAddMovie}
                  />
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr
                  key={index}
                  className="library-list-row cursor-pointer hover:bg-accent/30 transition-colors"
                  onClick={() => {
                    const movieId = row.id ?? String(row.tmdbId ?? "");

                    if (movieId) {
                      onOpenMovie(movieId);
                    }
                  }}
                >
                  {LIBRARY_LIST_COLUMNS.map((column) => (
                    <td
                      key={column.id}
                      className={cn("library-list-td", column.minWidth)}
                    >
                      {row[column.id] ?? null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
````

## File: components/library/library-list-view.tsx
````typescript
"use client";

import { useMemo } from "react";
import { LibraryListTable } from "@/components/library/library-list-table";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";
import type { LibraryMovie } from "@/store/movie-store";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListViewProps = {
  movies: LibraryMovie[];
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
};

export function LibraryListView({
  movies,
  onAddMovie,
  onOpenMovie,
  sort,
  onSortChange,
}: LibraryListViewProps) {
  const rows = useMemo(
    () =>
      movies.map((movie) => ({
        id: movie.id,
        tmdbId: movie.tmdbId,

        poster: movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.displayTitle}
            className="h-16 w-12 rounded object-cover"
          />
        ) : null,

        year: (
          <span className="inline-flex items-center justify-center gap-1.5">
            <span>{movie.year}</span>
            <BestOfYearCrown active={movie.bestOfYear} />
          </span>
        ),

        title: movie.displayTitle,
        titlePt: movie.titlePt,
        director: movie.director,
        country: movie.country,
        distributor: movie.distributor,
        badge: <MovieBadge badgeId={movie.badgeId} />,
        stars: <MovieStars stars={movie.stars} />,
        review: formatReviewScore(movie.reviewScore),
        imdb: movie.imdbScore !== null ? movie.imdbScore : "-",
        rotten:
          movie.rottenTomatoesScore !== null
            ? `${movie.rottenTomatoesScore}%`
            : "-",
      })),
    [movies]
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <LibraryListTable
        rows={rows}
        onAddMovie={onAddMovie}
        onOpenMovie={onOpenMovie}
        sort={sort}
        onSortChange={onSortChange}
      />
    </div>
  );
}
````
