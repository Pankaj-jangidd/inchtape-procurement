# InchTape Procurement — Milestone 0

Foundation scaffold: React+Vite+TS+Tailwind frontend, Express+TS backend,
Prisma schema, connected to Supabase Postgres. This is the "does everything
boot and talk to each other" milestone — no real features yet.

## What's in here

```
apps/web    → frontend (React, Vite, TypeScript, Tailwind v4)
apps/api    → backend (Express, TypeScript, Prisma)
```

The frontend currently shows a **preview shell**: Login screen (Supervisor /
Procurement toggle + Admin link) and a sample Supervisor Dashboard, with a
button in the top-right to flip between them. This is just to sanity-check
the design system — real routing and auth land in Milestone 1.

## Setup (first time)

### 1. Install dependencies

Run from the repo root — this installs both apps via npm workspaces:

```bash
npm install
```

### 2. Create your Supabase project

1. Go to supabase.com → New Project
2. Save your database password somewhere safe
3. Once it's ready: Project Settings → Database → Connection String → copy
   the **Connection pooling** URI

### 3. Set up environment variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Open `apps/api/.env` and paste your Supabase connection string into
`DATABASE_URL`.

### 4. Generate the Prisma client and push the schema to Supabase

```bash
npm run prisma:generate
npm run prisma:migrate
```

The second command will ask for a migration name — call it `init`. This
creates all the tables (User, Site, Request, etc.) in your Supabase database.

### 5. Run both apps

In two terminals:

```bash
npm run dev:api    # http://localhost:4000
npm run dev:web    # http://localhost:5173
```

### 6. Confirm it's all wired up

Visit `http://localhost:4000/api/v1/health/db` in your browser. You should
see:

```json
{ "status": "ok", "database": "connected" }
```

If you see an error instead, double check `DATABASE_URL` in `apps/api/.env`.

Then visit `http://localhost:5173` — you should see the Login screen.

## What's NOT done yet (by design)

- No real authentication (login form doesn't actually log in yet)
- No real data — dashboard shows hardcoded sample requests
- No routing between pages yet
- No file uploads, notifications, or Supabase Storage integration
- PWA icons are placeholders — needs real 192x192 and 512x512 PNGs from the
  logo before this can be "installed" on a phone

All of this is intentional — see `inchtape-procurement-plan.md` for the
full milestone roadmap. Next up is **Milestone 1: Auth & Login UI**.

## Notes on the design system

Colors and fonts live in `apps/web/src/index.css` as CSS variables (Tailwind
v4 `@theme` block) — change the yellow there
(`--color-accent` / `--color-accent-strong`) once you have the exact brand
hex code, and it updates everywhere in the app automatically.
