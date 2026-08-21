# Production cutover (Webflow → Cloudflare Pages)

## Before DNS switch

1. Create Cloudflare Pages project `wristband-website`.
2. Add GitHub secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.
3. Set Pages env vars: `DEMO_FORM_WEBHOOK_URL`, `DEMO_FORM_TO_EMAIL`.
4. Attach a staging hostname (e.g. `staging.wristband.dev`) and QA:
   - Home interactions (steps, testimonials, accordion)
   - Pricing FAQ
   - All 6 blog posts (same slugs)
   - `/request-demo` form → webhook delivery
   - Termly (privacy/terms + cookie banner), Crisp, GTM
5. Confirm `/login` and `/signup` redirects in `public/_redirects`.

## DNS cutover

1. In Cloudflare DNS, point `www` (and apex) to the Pages project.
2. Keep Webflow as fallback until traffic and forms look healthy (~48h).
3. Validate sitemap at `/sitemap-index.xml`, `robots.txt`, and `/llms.txt`.
4. Spot-check JSON-LD (view-source) on `/`, `/pricing`, and one blog post.

## After cutover

1. Unpublish / disconnect Webflow hosting.
2. Remove unused Webflow CDN references if any remain.
