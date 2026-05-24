# Next.js 16 + Tailwind 4 Migration & Admin Cleanup

## Overview

Migrate pioneer-mist from Next.js 14 (React 18, Tailwind 3) to Next.js 16 (React 19, Tailwind 4). Remove the non-functional admin panel. Update all dependencies to latest versions.

## Workstreams

Three workstreams executed in a single pass:

1. Admin panel removal
2. Next.js 14 to 16 upgrade (includes React 18 to 19)
3. Tailwind CSS 3 to 4 migration

## 1. Admin Panel Removal

### Delete

- `app/admin/` directory (layout.tsx, page.tsx, blogs/, users/, pioneers/, memories/, _components/)

### Remove packages

- `recharts` (only in package.json, zero imports in source)
- `axios` (only in package.json, zero imports in source)

### Clean references

- Remove any navigation links pointing to `/admin` routes in `site-header.tsx`, `main-nav.tsx`, or `mobile-nav.tsx`

## 2. Next.js 14 to 16 Upgrade

### 2.1 Async params (breaking)

`params` and `searchParams` are now Promises in Next.js 16. Synchronous access is fully removed.

**Files requiring changes:**

- `app/blog/[...slug]/page.tsx`
  - `PostPage({ params })` must `await params` before accessing `.slug`
  - `generateMetadata({ params })` must `await params`
  - `getPostFromParams(params)` signature changes to accept the awaited result
- `app/tags/[tag]/page.tsx`
  - `TagPage({ params })` must `await params` before accessing `.tag`
  - `generateMetadata({ params })` must `await params`
- `app/api/og/route.tsx`
  - Check if it reads params/searchParams and update accordingly

**Type pattern (Next.js 16):**

```tsx
export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params
}
```

### 2.2 Velite integration (breaking - Turbopack default)

Turbopack is the default bundler in Next.js 16. The current `VeliteWebpackPlugin` in `next.config.mjs` will not work with Turbopack.

**Replace** the webpack plugin approach with Velite's programmatic build:

```js
// next.config.mjs
import { build } from "velite";

const isDev = process.env.NODE_ENV === "development";
const isBuild = process.argv.indexOf("build") !== -1;

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */
export default {};
```

Remove the `VeliteWebpackPlugin` class and webpack config entirely.

### 2.3 Linting (breaking - `next lint` removed)

`next lint` no longer exists in Next.js 16. Update `package.json`:

```json
"lint": "eslint ."
```

Install ESLint and the Next.js plugin directly, or use the codemod:

```bash
npx @next/codemod@canary next-lint-to-eslint-cli .
```

### 2.4 No middleware

No `middleware.ts` exists in the project, so the `middleware` to `proxy` rename does not apply.

### 2.5 React 19.2

React 18 to 19 upgrade. For this static blog:

- No class components to worry about
- `ref` as a prop is now supported natively (no `forwardRef` needed) but existing `forwardRef` usage in shadcn components still works
- Verify Radix UI, Framer Motion, and other UI deps are React 19 compatible

## 3. Tailwind CSS 3 to 4 Migration

### 3.1 Architectural change

Tailwind 4 moves configuration from JavaScript to CSS. The `tailwind.config.ts` file is replaced by `@theme` directives in CSS.

### 3.2 Package changes

**Remove:**
- `tailwindcss` (v3)
- `tailwindcss-animate`
- `autoprefixer` (if present)

**Add/Update:**
- `tailwindcss` (v4)
- `@tailwindcss/postcss`

**Keep (update to v4-compatible):**
- `@tailwindcss/typography`

### 3.3 PostCSS config

Update `postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Remove `tailwindcss` and `autoprefixer` PostCSS plugins.

### 3.4 CSS directives

In `app/globals.css`, replace:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

With:

```css
@import "tailwindcss";
```

### 3.5 Theme migration

Move all theme values from `tailwind.config.ts` into `@theme` block in `globals.css`:

- CSS variable color definitions (already in CSS, just need `@theme` wrapping)
- Custom `container` settings
- `fontFamily` extension
- `borderRadius` values
- `keyframes` and `animation` for accordion
- Dark mode: Tailwind 4 uses `@variant dark` or continues with class strategy via `@custom-variant`

### 3.6 Class renames

Run the official upgrade tool to auto-fix renamed utilities:

```bash
npx @tailwindcss/upgrade
```

Known renames that may appear in this codebase:
- `shadow-sm` to `shadow-xs`, `shadow` to `shadow-sm`
- `ring` default width changes (3px to 1px)
- `bg-gradient-to-*` to `bg-linear-to-*`
- `flex-shrink-0` to `shrink-0`
- Border color default changes from `gray-200` to `currentColor`

### 3.7 Delete tailwind.config.ts

After migrating all config to CSS, delete `tailwind.config.ts`.

### 3.8 shadcn/ui compatibility

Update `components.json` for Tailwind 4:
- Remove `tailwind.config` reference (no longer exists)
- shadcn/ui v4 supports Tailwind 4 natively

Regenerate or update shadcn components if needed:

```bash
npx shadcn@latest init
```

## 4. Dependency Updates

All packages to their latest versions:

| Package | From | To |
|---|---|---|
| `next` | 14.2.35 | 16.x (latest) |
| `react` / `react-dom` | 18.x | 19.x (latest) |
| `@types/react` / `@types/react-dom` | 18.x | 19.x |
| `@radix-ui/*` (11 packages) | various | latest (React 19 compat) |
| `framer-motion` | 11.3.31 | latest |
| `lucide-react` | 0.436.0 | latest |
| `next-themes` | 0.3.0 | latest |
| `sonner` | 1.5.0 | latest |
| `class-variance-authority` | 0.7.0 | latest |
| `clsx` | 2.1.1 | latest |
| `tailwind-merge` | 2.5.2 | latest |
| `github-slugger` | 2.0.0 | latest |
| `rehype-*` (4 packages) | various | latest |
| `velite` | 0.3.1 | latest |
| `typescript` | 5.x | latest 5.x |
| `@types/node` | 20.x | latest |

**Remove:**
- `recharts`
- `axios`
- `tailwindcss-animate`

## 5. Risk Areas

| Risk | Mitigation |
|---|---|
| Velite watch mode with Turbopack | Test `npm run dev` with file changes after migration. Fall back to `next dev --webpack` if broken. |
| shadcn/ui + Tailwind 4 | shadcn/ui supports Tailwind 4. Regenerate components if styling breaks. |
| Framer Motion + React 19 | Recent Framer Motion versions support React 19. Verify animations work. |
| rehype-pretty-code + newer deps | Test code block syntax highlighting after upgrade. |

## 6. Verification

After migration, verify:

1. `npm run dev` starts without errors
2. Homepage loads with hero, slideshow, tribute cards
3. Blog listing page shows all published posts
4. Individual blog post pages render MDX correctly (including code blocks)
5. Tag pages filter correctly
6. Dark/light mode toggle works
7. Mobile navigation works
8. OG image generation works (`/api/og`)
9. `npm run build` succeeds
10. No `/admin` routes accessible
