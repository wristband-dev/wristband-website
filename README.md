# Wristband Website (Astro)

Marketing site for [wristband.dev](https://www.wristband.dev), migrated from Webflow to **Astro** (static) on **Cloudflare Pages**.

## Stack

- Astro (static build). Every page is an Astro page on [`BaseLayout`](src/layouts/BaseLayout.astro), built to match live Webflow. No Webflow HTML, CSS or JavaScript is used.
- A few interactive sections are React components (`.tsx`), such as the home page's How It Works tabs and testimonial slider.
- Styles: design tokens in [`src/styles/tokens.css`](src/styles/tokens.css), element defaults in [`src/styles/base.css`](src/styles/base.css), and each page's own scoped styles.
- Blog posts are MDX in `src/content/blog/`.
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

## Pages

Pages are Astro files in [`src/pages/`](src/pages). See [`docs/pages.md`](docs/pages.md) for how to add a page.

## Blog (no CMS)

Posts are MDX files in [`src/content/blog/`](src/content/blog), one folder per post. See [`docs/blog-posts.md`](docs/blog-posts.md) for how to write and add a post.

## Assets

Images are in [`src/assets/`](src/assets), shown with Astro's `<Image>`, which optimizes them at build time. [`public/`](public) holds files that need a fixed URL, such as favicons, link preview images and images referenced from CSS.

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
  assets/              # Images, one folder per page or use
  components/          # Shared components; page-only ones in a folder per page (home/, pricing/, ...)
  content/blog/        # Markdown / MDX posts
  data/                # Blog authors and SDK matrix content
  layouts/             # BaseLayout, BlogArticleLayout
  lib/                 # Constants, SEO helpers, shared scripts
  pages/               # One file per page; the path is the URL
  styles/              # tokens.css, base.css
public/                # Files that need a fixed URL
```
