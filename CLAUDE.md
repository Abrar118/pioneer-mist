# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pioneer-Mist is a memorial tribute blog platform for MIST (Military Institute of Science and Technology) students, built with Next.js 16 App Router (Turbopack) and static MDX content via Velite. The site is deployed on Vercel at `pioneers.mist.ac.bd`.

## Commands

- **Dev server**: `npm run dev`
- **Build**: `npm run build` (Velite content generation runs automatically via programmatic build in `next.config.mjs`)
- **Lint**: `npm run lint` (ESLint 9 flat config)
- **Production server**: `npm start`

There is no test framework configured.

## Architecture

### Content Pipeline

Blog posts are MDX files in `content/blog/`. Velite processes them at build time (configured in `velite.config.ts`) and outputs JavaScript to `.velite/`, which is imported via the `#site/content` alias. Posts have frontmatter fields: slug, title, description, date, published, tags, body. Only posts with `published: true` appear on the site.

MDX rendering uses rehype plugins for syntax highlighting (github-dark theme), heading slugs, and autolink headings.

### Key Import Alias

- `@/*` — project root
- `#site/content` — Velite-generated content from `.velite/` (defined in tsconfig paths)

### Routing

- `/` — Homepage with hero, image slideshow, tribute spotlights, latest posts
- `/blog/[...slug]` — Dynamic MDX blog posts (statically generated, async params)
- `/tags/[tag]` — Posts filtered by tag (async params)
- `/about` — About page
- `/api/og` — Edge runtime OG image generation

### Component Patterns

- UI primitives are shadcn/ui components in `components/ui/` (Radix-based)
- `cn()` from `lib/utils.ts` merges Tailwind classes (clsx + tailwind-merge)
- Theme switching via `next-themes` with CSS variables (HSL color system in `globals.css`)
- Post utilities in `lib/utils.ts`: `sortPosts()`, `getAllTags()`, `sortTagsByCount()`, `getPostsByTagSlug()`

### Styling

Tailwind CSS 4 with CSS-first configuration (no `tailwind.config.ts` — theme lives in `@theme` block in `globals.css`). Primary color is emerald, accent is saffron gold. Dark mode uses `@custom-variant dark` with class strategy. Custom effects include radial glows (`.bg-radial-glow`, `.bg-accent-glow`). MDX-specific styles in `styles/mdx.css` use `@reference "tailwindcss"` for `@apply` access.

### Static Assets

Images are in `public/`. Velite-processed content assets output to `public/static/`. The OG image generator uses `assets/fonts/Inter-Bold.ttf`.

### Site Config

Global site metadata (name, URL, links) lives in `config/site.ts` as `SiteConfig`.
