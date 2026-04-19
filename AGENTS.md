# AGENTS.md — Diário Goiano Frontend

## Architecture

Next.js App Router frontend (React 18, TypeScript) for a Brazilian news portal ("Diário Goiano"). Connects to an external **Java/Spring Boot backend** via `API_URL` env var. Two distinct areas:

- **Public site** (`app/`): Server Components fetching data from `lib/api.ts`. ISR with `revalidate` (60s lists, 300s articles). Uses `generateStaticParams` to pre-render top 50 article slugs.
- **Admin panel** (`app/admin/`): Client Components (`"use client"`) with JWT auth via `lib/auth-context.tsx`. Auth context wraps only `/admin` routes in `app/admin/layout.tsx`. Toggle `MOCK_AUTH` flag in `lib/auth-context.tsx` for local dev without a backend.

All public API functions in `lib/api.ts` include **hardcoded mock fallback data** (~100 news items) with a 3-second timeout, so the frontend works standalone without the backend.

## Commands

```bash
npm run dev    # Start dev server at localhost:3000
npm run build  # Production build (requires API_URL or falls back to mocks)
npm run lint   # ESLint
```

No test framework is configured. No Docker setup.

## Key Conventions

- **Path alias**: `@/*` maps to project root (`@/lib/api`, `@/types`, `@/components/...`)
- **Two env vars**: `API_URL` (server-side, `lib/api.ts`) and `NEXT_PUBLIC_API_URL` (client-side, `lib/admin-api.ts`). Default: `http://localhost:8080`
- **Bilingual naming**: Domain types/UI labels are Portuguese (`Noticia`, `Pessoa`, `formatarDataRelativa`), code structure/file names are English (`CardNoticia`, `NewsEditor`, `auth-context`)
- **Types**: All interfaces use `readonly` properties. Defined in `types/index.ts`
- **Styling**: Hybrid of CSS variables (`globals.css :root`), Tailwind utilities, and inline `style={}` objects. Category colors via `--cat-politica`, `--cat-economia`, etc. Two font families: `--fonte-ui` (IBM Plex Sans) and `--fonte-titulo` (IBM Plex Serif)
- **No semicolons** in most TS files; consistent no-semicolon style

## Patterns to Follow

### Adding a category page
Copy the one-liner pattern from `app/politica/page.tsx`:
```tsx
import { Metadata } from "next"
import { getNoticiasPorCategoria } from "@/lib/api"
import { PaginaCategoria } from "@/components/PaginaCategoria"
export const metadata: Metadata = { title: "Política" }
export default async function Politica() {
  const noticias = await getNoticiasPorCategoria("politica")
  return <PaginaCategoria titulo="Política" descricao="..." noticias={noticias} cor="var(--cat-politica)" />
}
```

### Card variants
Use exports from `components/CardNoticia.tsx`: `CardHero` (large overlay), `CardGrid` (thumbnail + text column), `CardLista` (compact list item with optional numbered index), `CardDestaque` (horizontal with side image).

### Category badge styling
Map category names to CSS classes via `BADGE_CLASSE` in `constants/index.ts`. Add new categories there and in `globals.css` (`.badge-*` classes).

### API data access pattern
Every function in `lib/api.ts` follows: try real API → catch → return mock fallback:
```ts
export async function getX(): Promise<T> {
  const fallback = MOCK_DATA
  try {
    const res = await fetch(`${API_URL}/api/...`, { next: { revalidate: N }, signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error()
    return res.json()
  } catch { return fallback }
}
```

### Admin API calls
`lib/admin-api.ts` — all functions take `token` as first arg, use `Bearer` auth header. 401 responses throw `"UNAUTHORIZED"`.

### Rich text editor
`react-quill-new` is loaded via `next/dynamic` with `{ ssr: false }` in `components/admin/NewsEditor.tsx`.

## File Map

| Path | Purpose |
|---|---|
| `lib/api.ts` | All public data fetching + mock fallback (~1800 lines, mostly mock data) |
| `lib/admin-api.ts` | Authenticated admin CRUD (news, tags, categories, users) |
| `lib/auth-context.tsx` | JWT auth React context, `MOCK_AUTH` toggle, `useAuth()` hook |
| `lib/utils.ts` | Date formatting (`formatarDataRelativa`, `formatarDataLonga`), `generateSlug` |
| `constants/index.ts` | Nav links (`CATEGORIAS`), badge class map (`BADGE_CLASSE`), contact emails |
| `types/index.ts` | All TypeScript interfaces (`News`, `Category`, `Pessoa`, `NewsFormData`, etc.) |
| `components/PaginaCategoria.tsx` | Reusable category page layout (hero + sidebar + grid) |
| `components/CardNoticia.tsx` | All card variants for news display |
| `components/admin/AdminGuard.tsx` | Auth gate: shows `LoginForm` or `AdminShell` based on token |
| `proxy.ts` | Next.js middleware adding security headers (X-Frame-Options, CSP, etc.) |
| `app/globals.css` | All styles: CSS variables, component classes, admin panel styles, responsive |

