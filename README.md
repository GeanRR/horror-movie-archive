# Horror Movie Archive

Private horror movie archive for tracking watched films, ratings, badges, watchlists, release calendars and Stremio watched-state review flow.

## Tech Stack

- Next.js 15 App Router + TypeScript
- Tailwind CSS v4
- Prisma ORM + Supabase Postgres
- Zustand for local library/UI state
- Framer Motion, Papa Parse and Playwright utilities

## Setup

```bash
npm install
copy .env.example .env.local
npm run db:generate
npm run db:push
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local` and set the values needed for your environment.

| Variable | Required | Scope | Description |
| --- | --- | --- | --- |
| `TMDB_API_KEY` | Yes | Server | Movie search and metadata enrichment. |
| `OMDB_API_KEY` | No | Server | IMDb and Rotten Tomatoes enrichment. |
| `STREMIO_AUTH_KEY` | No | Server | Private Stremio watched-state sync. Never expose in client code. |
| `STREMIO_API_BASE_URL` | No | Server | Override for Stremio API base URL. Defaults to `https://api.strem.io/api`. |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Client/server | Optional Supabase session middleware configuration. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Client/server | Optional Supabase anon key for session middleware. |
| `DATABASE_URL` | Yes for DB features | Server | Prisma pooled Postgres connection. |
| `DIRECT_URL` | Yes for Prisma push/migrate | Server | Direct Postgres connection for schema operations. |

## Main Routes

- `/library`
- `/dashboard`
- `/year-in-review`
- `/watchlist`
- `/release-calendar`
- `/settings`

## Stremio

The Stremio addon exposes Watchlists as movie catalogs only. It does not provide streams, subtitles or playback functionality.

Install the manifest URL shown in Settings. In production, this URL should use the deployed app domain:

```text
https://your-domain.example/api/stremio/manifest.json
```

Creating, renaming or deleting Watchlists may require reinstalling the addon in Stremio so the manifest catalog list refreshes.

## Useful Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:migrate` | Create/apply Prisma migration |
| `npm run db:studio` | Prisma Studio |
| `npm run visual-audit` | Capture visual audit screenshots |
