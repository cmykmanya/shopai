# Copilot instructions for ShopAI (concise)

- Project snapshot: Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui; primary UI in `src/components/` and pages in `src/app/`.
- Data & auth: Frontend uses Firebase (see `src/lib/firebase.ts`) for products, orders, users and storage. Prisma (SQLite) exists for server-side/local DB workflows (`prisma/schema.prisma`, `src/lib/db.ts`) — both are in-repo and used in different contexts.

Quick tasks and commands
- Install dependencies: `bun install` (also works with `npm install`).
- Dev server: `bun run dev` (alias for `next dev -p 3000`).
- Build: `bun run build` (runs `next build` and prepares `.next/standalone`).
- Start (production): `bun start` (runs `NODE_ENV=production bun .next/standalone/server.js`). Note: start script uses Unix-style env syntax; on Windows prefer PowerShell: `$env:NODE_ENV='production'; bun .next/standalone/server.js` or adapt with `cross-env` if needed.
- Prisma: `bun run db:generate`, `bun run db:migrate`, `bun run db:push`.

Key integration & patterns to follow
- Firebase helpers: Prefer `dbFunctions` / `authFunctions` from `src/lib/firebase.ts` for product/order/user flows. Example server route:

```ts
// src/app/api/products/route.ts
import { NextResponse } from 'next/server'
import { dbFunctions } from '@/lib/firebase'
export async function GET() {
  return NextResponse.json(await dbFunctions.products.getAll())
}
```

- Prisma (server-side): Use `src/lib/db.ts` (it guards a global PrismaClient in dev). Example:

```ts
import { db } from '@/lib/db'
export async function GET() {
  return NextResponse.json(await db.user.findMany())
}
```

- App Router & API routes: Put route handlers under `src/app/api/*` and return `NextResponse` (see `src/app/api/route.ts`). Prefer server components or route handlers for server-side work.
- UI & forms: Uses shadcn/ui components in `src/components/ui` and `react-hook-form + zod` for validation. Follow the existing component structure and naming.
- Storage/images: Use `src/lib/firebase.ts` storage helpers; images use timestamped filenames (see `uploadProductImage`).

Deployment & env
- Vercel recommended (DEPLOYMENT.md). Set env vars in Vercel: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_FIREBASE_*`, etc.
- For Firebase: add `NEXT_PUBLIC_FIREBASE_*` vars in `.env.local` (see FIREBASE_DEPLOYMENT.md). Do not commit `.env.local`.

Testing & infra notes
- No central test runner configured. Some skills use Playwright (see `skills/*`). If adding tests, prefer Playwright for E2E and vitest/jest for units.
- `mini-services/` is available for lightweight services; `skills/` contains domain-specific scripts and examples.

Key files & quick references
- `README.md` (root) — project overview and quick commands
- `DEPLOYMENT.md` & `FIREBASE_DEPLOYMENT.md` — Vercel + Firebase deploy steps and env var guidance
- `package.json` — scripts: `dev`, `build`, `start`, and Prisma scripts
- `src/lib/firebase.ts` — canonical Firebase helpers (dbFunctions, authFunctions, storageFunctions)
- `src/lib/db.ts` & `prisma/schema.prisma` — Prisma client + schema for server-side DB work
- `src/components/` & `src/components/ui/` — shadcn component patterns
- `src/app/api/` — API route handlers (use `NextResponse`)

What to avoid / watch-outs
- Don’t hardcode API keys in code; prefer `.env.local` and platform env settings.
- The `start` script uses a UNIX env pattern which may need adjustment on Windows.
- Firebase + Prisma co-existence: prefer Firebase for frontend, and Prisma for server-focused or migration examples — be explicit if adding new DB responsibilities.

If anything here is unclear or you'd like more examples (e.g., common PR templates, preferred lint/format flows, or how to add a new API route), tell me which area to expand and I'll iterate. ✅