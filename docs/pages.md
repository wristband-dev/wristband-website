# Adding a page

Pages are Astro files in `src/pages/`. There is no CMS. A page goes live when its pull request merges to `main`.

For blog posts, see [`blog-posts.md`](blog-posts.md) instead.

## Where things go

The file's path is the page's URL.

```
src/pages/
  pricing.astro              # https://www.wristband.dev/pricing
  customers/
    thoughtly.astro          # https://www.wristband.dev/customers/thoughtly
```

| What                                    | Where                                      |
| --------------------------------------- | ------------------------------------------ |
| The page                                | `src/pages/<path>.astro`                   |
| Components used by only one page        | `src/components/<page>/`                   |
| Components used by more than one page   | `src/components/`                          |
| Images                                  | `src/assets/<page>/`                       |
| Files that need a fixed URL             | `public/`                                  |
| Colors, type sizes, spacing, radius     | `src/styles/tokens.css`                    |
| Element defaults and site-wide behavior | `src/styles/base.css`                      |
| Shared links (sign up, docs, Calendly)  | `LINKS` in `src/lib/constants.ts`          |
| Structured data (JSON-LD) helpers       | `src/lib/seo.ts`                           |
| Sitemap dates                           | `PAGE_DATE_MODIFIED` in `astro.config.mjs` |

Examples of page folders: `src/components/home/`, `src/components/pricing/`, `src/components/team/`.

## Steps

1. Pick the URL. Use lowercase words separated by hyphens. The URL is permanent once published, because changing it breaks links.
2. Create `src/pages/<path>.astro`.
3. Wrap the page in `BaseLayout` (see below).
4. Build the page. Put its components and images in the page's own folders.
5. Add the page to `PAGE_DATE_MODIFIED` in `astro.config.mjs`.
6. Check it locally (see "Check your page").
7. Open a pull request. The preview deploy shows the page as it will look live.

## The layout

Every page uses `src/layouts/BaseLayout.astro`. It adds the `<head>` tags, fonts, analytics, the header and the footer.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Request A Demo - Wristband" description="One or two sentences for search results and link previews.">
  <section class="my-page">
    <h1>Request Demo</h1>
  </section>
</BaseLayout>

<style>
  .my-page {
    margin-top: var(--space-page-top);
  }
</style>
```

| Prop                | What it does                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `title`             | Required. The browser tab title, also used for search results and link previews.                  |
| `description`       | Search results and link previews. Defaults to the site description.                               |
| `ogImage`           | Link preview image. Leave it out for no image.                                                    |
| `jsonLd`            | Extra structured data nodes. The organization and website nodes are always added.                 |
| `theme`             | `dark` gives a charcoal page background and the dark header. Defaults to `light`.                 |
| `headerTheme`       | The header's look, when it differs from the page's. The home page uses `headerTheme="dark"`.      |
| `noIndex`           | Keeps the page out of search engines.                                                             |
| `termlyPolicyEmbed` | Loads Termly's policy script. Only for pages with a `termly-embed` div (privacy, terms, cookies). |

## Styling

- Each page or component keeps its styles in its own `<style>` block. Astro scopes them to that file.
- Use the tokens in `src/styles/tokens.css` for colors, type, spacing and radius, instead of new values. Use the `--color-*` tokens where one fits.
- The breakpoints are `max-width` 991px (tablet), 767px (phone landscape) and 479px (phone). CSS variables can't be used inside `@media`, so write the numbers.
- Scoped styles don't reach into a child component or into `set:html` content. Wrap the child in a `div` you style, or use `:global(...)`.

## Images

Put images in `src/assets/<page>/` and show them with Astro's `<Image>`:

```astro
---
import { Image } from 'astro:assets';
import screenshot from '../assets/my-page/screenshot.png';
---

<Image src={screenshot} alt="What the image shows" />
```

`<Image>` converts JPG and PNG files to smaller WebP files, writes the width and height so the page doesn't jump while loading, and gives the file a new name when it changes.

Only use `public/` for files that need a fixed URL, such as a link preview image or an image a CSS file points to.

## Shared pieces

| Piece                   | What it does                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `data-reveal`           | Add to an element to zoom it in when it scrolls into view. `data-reveal="400"` waits 400ms instead of 200ms.         |
| `Accordion.astro`       | One accordion item: title, optional icon, and an answer that slides open. The pricing FAQ and the home page use it.  |
| `ButtonLink.astro`      | The large dark button link, used on the request demo and 404 pages.                                                  |
| `ComparisonTable.astro` | The feature comparison table, used on pricing and the Auth0 comparison.                                              |
| `CheckIcon.astro`       | The check mark `ComparisonTable.astro` uses.                                                                         |
| Calendly links          | Any link starting with `https://calendly.com/wristband` opens Calendly's pop-up automatically. Use `LINKS.calendly`. |

### Accordion

```astro
<Accordion id="my-question" title="The question">
  <p>The answer.</p>
</Accordion>
```

- `id` must be unique on the page. The answer gets `<id>-answer`.
- `headingTag` sets the title's heading level. Defaults to `h3`.
- Put an image in the `icon` slot to show it left of the title.
- Set the look with CSS variables on a wrapper: `--accordion-bg`, `--accordion-shadow`, `--accordion-radius`, `--accordion-spacing`, `--accordion-title-size`, `--accordion-title-color`, `--accordion-arrow-color`.

## Structured data

`src/lib/seo.ts` has helpers for common nodes, such as `breadcrumbNode`, `faqPageNode` and `articleNode`. Pass them in the `jsonLd` prop:

```astro
<BaseLayout
  title="..."
  jsonLd={[breadcrumbNode([{ name: 'Home', path: '/' }, { name: 'My Page', path: '/my-page' }])]}
>
```

## Sitemap date

Add the page to `PAGE_DATE_MODIFIED` in `astro.config.mjs`, with the path and the date it was last changed:

```js
'/my-page': '2026-11-21',
```

When you make a meaningful edit to the page later, update its date.

## Check your page

```bash
npm run dev
```

Open `http://localhost:4321/<path>` and check:

- the page at 1440, 991, 767, 479 and 375px wide
- hover states, and any reveals, tabs or accordions
- the browser tab title
- that the header and footer look right, especially on a dark page

Then run a full build. It must finish with no errors or warnings.

```bash
npm run build
```

## What happens automatically

- **Header and footer:** added by `BaseLayout`.
- **Sitemap:** the page is listed, with its `PAGE_DATE_MODIFIED` date.
- **Search and sharing:** title, description, canonical URL, link preview tags and JSON-LD are generated from the props.

## Things to know

- There are no drafts. A merged page is live. Keep unfinished pages on a branch.
- Keep files plain ASCII. In page markup, write a curly apostrophe as `&rsquo;`. In a JavaScript string, write it as `\u2019`.
- Example pages:
  - `src/pages/request-demo.astro` is a short page with one button.
  - `src/pages/pricing.astro` uses page components, `data-reveal`, an accordion and FAQ JSON-LD.
  - `src/pages/index.astro` uses a dark header over a light page, React components and many page components.
