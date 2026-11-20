# Wristband Website (Astro)

Marketing site for [wristband.dev](https://www.wristband.dev), migrated from Webflow to **Astro** (static) on **Cloudflare Pages**.

## Stack

- Astro (SSG) hosting **exported Webflow HTML + CSS + JS** for visual 1:1 parity
- Page bodies live in [`src/webflow/*.html`](src/webflow) (scraped from production Webflow)
- Styles: [`public/css/webflow.css`](public/css/webflow.css); interactions: [`public/js/webflow*.js`](public/js)
- Blog posts are MDX in `src/content/blog/`. Posts not yet converted are still copied Webflow HTML in `src/webflow/blog-*.html`.
- Cloudflare Pages

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

Posts are MDX files in [`src/content/blog/`](src/content/blog), one folder per post. See [`docs/blog-posts.md`](docs/blog-posts.md) for how to write and add a post.

## Assets

Site images are in [`public/images`](public/images) and served by Cloudflare Pages.

## CI/CD

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds on every PR/push and deploys with Wrangler.

Required GitHub secrets:

| Secret                  | Purpose               |
| ----------------------- | --------------------- |
| `CLOUDFLARE_API_TOKEN`  | Pages deploy token    |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |

Create a Pages project named `wristband-website` (or change `--project-name` in the workflow).

## Cutover checklist

1. Deploy to a Cloudflare Pages preview / staging custom domain.
2. Visual QA against production Webflow (home, pricing, blog, compare, team, case study).
3. Confirm GTM, Crisp, and Termly in staging.
4. Point `www.wristband.dev` (and apex) DNS to Cloudflare Pages.
5. Verify redirects: `/login`, `/signup` → dashboard.
6. Monitor analytics for 48h.
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
public/images/         # Migrated Webflow assets
```
