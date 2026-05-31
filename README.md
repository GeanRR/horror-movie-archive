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
