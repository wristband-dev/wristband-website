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

## Tracking checks before and after DNS switch

1. GTM container `GTM-KQNQ4T3V` is published with the tracking rebuild (it loads GA4, Heap and Clarity).
2. View source: the Termly resource blocker (`app.termly.io/resource-blocker/…?autoBlock=on`) is the first script in `<head>`; GTM loads once in `<head>` and its `<noscript>` iframe once in `<body>`.
3. No Heap, Google Analytics (`gtag`) or Clarity snippets in this repo — GTM loads them.
4. If the old Webflow site is still live when the container is published, remove from Webflow: the native Google Analytics integration, the Clarity integration, the Heap custom-code snippet and the duplicate GTM load.
5. In GTM Preview: `demo_click` fires on Calendly links; `generate_lead` fires after a `/request-demo` submit (`lead_type: demo_form`) and a Calendly booking (`lead_type: calendly`).
6. End-to-end test: open https://www.wristband.dev/?utm_source=test&utm_medium=cpc&utm_campaign=gate-test, sign up with a test account, and confirm the same source appears in Google Analytics, Heap and the post-signup "How did you hear about Wristband?" answer.
