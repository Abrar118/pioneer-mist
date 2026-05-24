# Next.js 16 + Tailwind 4 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate pioneer-mist from Next.js 14 / React 18 / Tailwind 3 to Next.js 16 / React 19 / Tailwind 4, and remove the admin panel.

**Architecture:** Static MDX blog powered by Velite. No database, no auth. The Velite content pipeline stays intact but its Next.js integration switches from a webpack plugin to a programmatic top-level build call (required for Turbopack compatibility). Tailwind config moves from JavaScript to CSS-first `@theme` directives.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Velite, shadcn/ui, Framer Motion, Radix UI

---

## File Map

### Files to delete
- `app/admin/` (entire directory — 9 files)

### Files to modify
- `package.json` — dependency versions, scripts, remove recharts/axios/tailwindcss-animate
- `next.config.mjs` — replace VeliteWebpackPlugin with programmatic build
- `postcss.config.mjs` — switch to `@tailwindcss/postcss`
- `app/globals.css` — Tailwind 4 import + `@theme` config
- `tailwind.config.ts` — delete after migrating to CSS
- `components.json` — update for Tailwind 4 / shadcn v2
- `tsconfig.json` — minor updates if needed for Next 16
- `app/blog/[...slug]/page.tsx` — async params
- `app/tags/[tag]/page.tsx` — async params
- `components/main-nav.tsx` — remove admin link
- `components/mobile-nav.tsx` — remove admin link
- `.gitignore` — add `.next/dev/` (Next 16 separate dev output)

### Files unlikely to need changes (verify)
- `app/page.tsx` — client component, no params
- `app/blog/page.tsx` — client component, no params
- `app/tags/page.tsx` — server component, no dynamic params
- `app/about/page.tsx` — server component, no dynamic params
- `app/api/og/route.tsx` — reads searchParams from `req.nextUrl`, not props (no change needed)
- `app/layout.tsx` — root layout, no dynamic params
- `components/` — non-page components, no params
- `lib/utils.ts` — pure utility functions
- `config/site.ts` — static config
- `velite.config.ts` — Velite schema (independent of Next version)
- `styles/mdx.css` — pure CSS

---

## Task 1: Remove admin panel and unused dependencies

**Files:**
- Delete: `app/admin/` (entire directory)
- Modify: `components/main-nav.tsx:51-62`
- Modify: `components/mobile-nav.tsx:39-41`
- Modify: `package.json` (remove recharts, axios)

- [ ] **Step 1: Delete the admin directory**

```bash
rm -rf app/admin
```

- [ ] **Step 2: Remove admin link from main-nav.tsx**

In `components/main-nav.tsx`, remove the admin Link block (lines 51-62). The file currently has three nav links (Blog, About, Admin) inside a `<div className="hidden sm:flex ...">`. Remove the Admin link entirely:

```tsx
// REMOVE this entire block from main-nav.tsx:
        <Link
          href="/admin"
          className={cn(
            "relative text-sm font-medium transition-colors hover:text-primary py-1.5",
            pathname === "/admin" ? "text-foreground font-semibold" : "text-foreground/60"
          )}
        >
          Admin
          {pathname === "/admin" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
          )}
        </Link>
```

- [ ] **Step 3: Remove admin link from mobile-nav.tsx**

In `components/mobile-nav.tsx`, remove line 39-41:

```tsx
// REMOVE this from mobile-nav.tsx:
          <MobileLink onOpenChange={setOpen} href="/admin">
            Admin
          </MobileLink>
```

- [ ] **Step 4: Remove unused packages from package.json**

```bash
npm uninstall recharts axios
```

- [ ] **Step 5: Verify no remaining admin references**

```bash
rg -r '' "admin" app/ components/ --include="*.tsx" --include="*.ts" -l
```

Expected: no results.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove admin panel and unused dependencies (recharts, axios)"
```

---

## Task 2: Upgrade Next.js, React, and all dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Upgrade core packages**

```bash
npm install next@latest react@latest react-dom@latest
```

- [ ] **Step 2: Upgrade dev type packages**

```bash
npm install -D @types/react@latest @types/react-dom@latest @types/node@latest typescript@latest
```

- [ ] **Step 3: Upgrade Radix UI packages**

```bash
npm install @radix-ui/react-alert-dialog@latest @radix-ui/react-avatar@latest @radix-ui/react-dialog@latest @radix-ui/react-dropdown-menu@latest @radix-ui/react-icons@latest @radix-ui/react-label@latest @radix-ui/react-select@latest @radix-ui/react-slot@latest @radix-ui/react-tabs@latest
```

- [ ] **Step 4: Upgrade remaining UI and utility packages**

```bash
npm install framer-motion@latest lucide-react@latest next-themes@latest sonner@latest class-variance-authority@latest clsx@latest tailwind-merge@latest github-slugger@latest rehype-autolink-headings@latest rehype-pretty-code@latest rehype-slug@latest rehype-slug-custom-id@latest
```

- [ ] **Step 5: Upgrade Velite**

```bash
npm install -D velite@latest
```

- [ ] **Step 6: Verify install succeeded**

```bash
npm ls next react react-dom --depth=0
```

Expected: next@16.x, react@19.x, react-dom@19.x

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade to Next.js 16, React 19, and all dependencies"
```

---

## Task 3: Update Next.js config for Turbopack + Velite

**Files:**
- Modify: `next.config.mjs`

- [ ] **Step 1: Replace the entire next.config.mjs**

The current file uses a `VeliteWebpackPlugin` class that hooks into webpack's `beforeCompile`. Turbopack (default in Next 16) doesn't support webpack plugins. Replace with Velite's programmatic build approach.

Current `next.config.mjs`:
```js
import { build } from "velite";

/** @type {import('next').NextConfig} */
export default {
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}
```

Replace with:
```js
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

- [ ] **Step 2: Commit**

```bash
git add next.config.mjs
git commit -m "feat: replace VeliteWebpackPlugin with programmatic build for Turbopack"
```

---

## Task 4: Update linting setup

**Files:**
- Modify: `package.json` (scripts.lint)

- [ ] **Step 1: Update lint script**

`next lint` was removed in Next.js 16. Run the codemod to migrate:

```bash
npx @next/codemod@canary next-lint-to-eslint-cli .
```

If the codemod doesn't apply (no `.eslintrc` exists), manually update the lint script in `package.json`:

Change:
```json
"lint": "next lint"
```

To:
```json
"lint": "eslint ."
```

And install ESLint + Next.js plugin:

```bash
npm install -D eslint @next/eslint-plugin-next eslint-config-next
```

Create `eslint.config.mjs`:
```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

export default eslintConfig;
```

- [ ] **Step 2: Verify lint runs**

```bash
npm run lint
```

Expected: runs without crashing (warnings are OK).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json eslint.config.mjs
git commit -m "chore: migrate from next lint to eslint CLI (Next 16 requirement)"
```

---

## Task 5: Migrate async params in dynamic routes

**Files:**
- Modify: `app/blog/[...slug]/page.tsx`
- Modify: `app/tags/[tag]/page.tsx`

- [ ] **Step 1: Update app/blog/[...slug]/page.tsx**

Current code uses synchronous `params` access. In Next 16, `params` is a `Promise`.

Replace the full file content:

```tsx
import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import "@/styles/mdx.css";
import type { Metadata } from "next";
import { SiteConfig } from "@/config/site";
import { Tag } from "@/components/tag";

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPostFromParams(slug: string[]) {
  const slugPath = slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slugPath);
  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostFromParams(slug);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: SiteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostFromParams(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
```

Key changes:
- `params` type changed from `{ slug: string[] }` to `Promise<{ slug: string[] }>`
- Both `PostPage` and `generateMetadata` now `await params`
- `getPostFromParams` takes the raw `slug: string[]` instead of the params wrapper
- `generateStaticParams` return type simplified (no longer references `PostPageProps["params"]`)

- [ ] **Step 2: Update app/tags/[tag]/page.tsx**

Replace the full file content:

```tsx
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from "@/lib/utils";
import { slug } from "github-slugger";
import type { Metadata } from "next";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  };
}

export const generateStaticParams = () => {
  const tags = getAllTags(posts);
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));
  return paths;
};

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const title = tag.split("-").join(" ");

  const allPosts = getPostsByTagSlug(posts, tag);
  const displayPosts = allPosts.filter((post) => post.published);
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize">
            {title}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((t) => (
              <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

Key changes:
- `params` type changed from `{ tag: string }` to `Promise<{ tag: string }>`
- Both `TagPage` and `generateMetadata` now `await params`

- [ ] **Step 3: Verify the OG route needs no changes**

Check `app/api/og/route.tsx`. It reads searchParams from `req.nextUrl.searchParams` (the Request object), not from component props. No change needed.

- [ ] **Step 4: Commit**

```bash
git add app/blog/\[...slug\]/page.tsx app/tags/\[tag\]/page.tsx
git commit -m "feat: migrate dynamic routes to async params (Next.js 16 breaking change)"
```

---

## Task 6: Migrate Tailwind CSS 3 to 4

**Files:**
- Modify: `package.json`
- Modify: `postcss.config.mjs`
- Modify: `app/globals.css`
- Delete: `tailwind.config.ts`

- [ ] **Step 1: Run the official Tailwind upgrade tool**

The official upgrade tool handles most of the migration automatically — package swaps, config migration, class renames:

```bash
npx @tailwindcss/upgrade@latest
```

This will:
- Uninstall `tailwindcss` v3, `tailwindcss-animate`, `autoprefixer`
- Install `tailwindcss` v4, `@tailwindcss/postcss`
- Update `postcss.config.mjs` to use `@tailwindcss/postcss`
- Replace `@tailwind` directives with `@import "tailwindcss"` in `globals.css`
- Migrate `tailwind.config.ts` theme values to `@theme` in CSS
- Rename utility classes across all `.tsx` files (shadow-sm→shadow-xs, etc.)
- Delete `tailwind.config.ts`

- [ ] **Step 2: Verify postcss.config.mjs**

After the upgrade tool, `postcss.config.mjs` should look like:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

If it doesn't, manually update it.

- [ ] **Step 3: Verify globals.css**

After the upgrade tool, `app/globals.css` should:
- Start with `@import "tailwindcss"` (not `@tailwind` directives)
- Have `@theme` block containing colors, border-radius, fonts, animations from the old config
- Keep the CSS variable definitions in `:root` and `.dark` blocks
- Keep custom classes like `.bg-radial-glow` and `.bg-accent-glow`

If the tool didn't properly migrate the theme, manually ensure the `@theme` block includes:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme {
  --font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;

  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;

  @keyframes accordion-down {
    from { height: 0; }
    to { height: var(--radix-accordion-content-height); }
  }

  @keyframes accordion-up {
    from { height: var(--radix-accordion-content-height); }
    to { height: 0; }
  }
}
```

The `:root` and `.dark` CSS variable blocks remain unchanged below the `@theme` block.

- [ ] **Step 4: Verify tailwind.config.ts is deleted**

```bash
ls tailwind.config.ts 2>&1
```

Expected: `No such file or directory`. If it still exists, delete it:

```bash
rm tailwind.config.ts
```

- [ ] **Step 5: Update @tailwindcss/typography**

```bash
npm install @tailwindcss/typography@latest
```

In `globals.css`, if the upgrade tool didn't add it, add the typography plugin import:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: migrate Tailwind CSS 3 to 4 (CSS-first config)"
```

---

## Task 7: Update shadcn/ui config

**Files:**
- Modify: `components.json`

- [ ] **Step 1: Update components.json for Tailwind 4**

The current `components.json` references `tailwind.config.ts` which no longer exists. Update it:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

Key change: `tailwind.config` set to empty string (Tailwind 4 uses CSS-based config).

- [ ] **Step 2: Commit**

```bash
git add components.json
git commit -m "chore: update shadcn/ui config for Tailwind 4"
```

---

## Task 8: Update .gitignore for Next 16

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add Next 16 dev output directory**

Next.js 16 outputs dev builds to `.next/dev/` separately from production builds. Add to `.gitignore`:

```
# next.js
/.next/
/out/
```

This already covers `.next/dev/` since `/.next/` is a prefix match. No change needed unless the existing pattern is different.

Verify the existing `.gitignore` has `/.next/` — it does. No change needed.

- [ ] **Step 2: Skip commit (no changes)**

---

## Task 9: Build and verify

**Files:** None (verification only)

- [ ] **Step 1: Clean install**

```bash
rm -rf node_modules .next .velite
npm install
```

- [ ] **Step 2: Run the build**

```bash
npm run build
```

Expected: build completes successfully with no errors.

- [ ] **Step 3: Start the dev server**

```bash
npm run dev
```

Expected: dev server starts on localhost:3000 without errors.

- [ ] **Step 4: Manual verification checklist**

Open `http://localhost:3000` in a browser and verify:

1. Homepage loads — hero section, image slideshow, tribute spotlights, latest posts grid
2. Dark/light mode toggle works (click the theme toggle in the header)
3. Navigate to `/blog` — blog listing shows posts with search and tag filtering
4. Click a blog post — MDX content renders with syntax highlighting for code blocks
5. Navigate to `/tags` — tags page shows all tags with counts
6. Click a tag — filtered posts display correctly
7. Navigate to `/about` — about page with timeline renders
8. Mobile nav works (resize to mobile, open hamburger menu)
9. `/admin` returns 404 (not found)
10. Check `/api/og?title=Test` — returns a generated OG image

- [ ] **Step 5: Fix any issues found during verification**

If Tailwind class renames were missed by the upgrade tool, search for known old classes:

```bash
rg "shadow-sm|shadow-md|ring-offset|flex-shrink-0|flex-grow" app/ components/ --include="*.tsx" -l
```

Review results and rename if needed per Tailwind 4 conventions.

- [ ] **Step 6: Final commit (if any fixes)**

```bash
git add -A
git commit -m "fix: post-migration fixes from verification"
```

---

## Task 10: Run lint and final check

- [ ] **Step 1: Run linter**

```bash
npm run lint
```

Fix any errors (warnings are acceptable).

- [ ] **Step 2: Run production build one final time**

```bash
npm run build
```

Expected: clean build, no errors.

- [ ] **Step 3: Commit any final fixes**

```bash
git add -A
git commit -m "chore: fix lint errors after migration"
```
