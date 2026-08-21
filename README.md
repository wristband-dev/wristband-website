# Wristband Website (Astro)

Marketing site for [wristband.dev](https://www.wristband.dev), migrated from Webflow to **Astro** (static) on **Cloudflare Pages**.

## Stack

- Astro (SSG) hosting **exported Webflow HTML + CSS + JS** for visual 1:1 parity
- Page bodies live in [`src/webflow/*.html`](src/webflow) (scraped from production Webflow)
- Styles: [`public/css/webflow.css`](public/css/webflow.css); interactions: [`public/js/webflow*.js`](public/js)
- Existing blog posts are static HTML exports (same slugs). New posts can be added as Markdown or MDX under `src/content/blog/`
- Cloudflare Pages + Pages Function for `/api/request-demo`

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Blog (no CMS)

Posts live in [`src/content/blog/`](src/content/blog) as `.md` or `.mdx`. Frontmatter:

```md
---
title: "…"
summary: "…"
category: "Auth" | "Engineering" | "Press"
pubDate: 2025-01-15
author: "Wristband Team"
coverImage: "/images/…"
---
```

MDX can import Astro or React components. Existing Webflow-exported posts keep their HTML; a new `.md` / `.mdx` file with a slug that is not already exported is rendered from the collection.

Workflow: write Markdown or MDX → open PR → preview deploy → merge to `main`.

## Assets

Site images are in [`public/images`](public/images) and served by Cloudflare Pages.

## CI/CD

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds on every PR/push and deploys with Wrangler.

Required GitHub secrets:

| Secret | Purpose |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | Pages deploy token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |

Create a Pages project named `wristband-website` (or change `--project-name` in the workflow).

### Demo form secrets (Cloudflare Pages → Settings → Environment variables)

| Variable | Purpose |
|----------|---------|
| `DEMO_FORM_WEBHOOK_URL` | Zapier / Make / Slack webhook for `/api/request-demo` |
| `DEMO_FORM_TO_EMAIL` | Optional routing hint |

## Cutover checklist

1. Deploy to a Cloudflare Pages preview / staging custom domain.
2. Visual QA against production Webflow (home, pricing, blog, compare, team, case study).
3. Confirm GTM, Crisp, Termly, and form webhook in staging.
4. Point `www.wristband.dev` (and apex) DNS to Cloudflare Pages.
5. Verify redirects: `/login`, `/signup` → dashboard.
6. Monitor analytics + form submissions for 48h.
7. Unpublish Webflow.

## Project layout

```
src/
  components/          # Astro + react/ islands
  content/blog/        # Markdown / MDX posts
  layouts/
  lib/
  pages/
  styles/
functions/api/         # Cloudflare Pages Functions
public/images/         # Migrated Webflow assets
```
