# Writing a blog post

Blog posts are MDX files in `src/content/blog/`. There is no CMS. A post goes live when its pull request merges to `main`.

## Where things go

Each post gets its own folder. The folder name is the post's URL slug.

```
src/content/blog/
  my-new-post/
    index.mdx        # the post
    cover.jpg        # cover image, used only by this post
    diagram.png      # any other image used only by this post
```

This folder becomes `https://www.wristband.dev/blog/my-new-post`.

Shared blog pieces live in folders by type:

| What                         | Where                                 |
| ---------------------------- | ------------------------------------- |
| Post folders                 | `src/content/blog/<slug>/`            |
| Authors                      | `src/data/blog/authors.ts`            |
| Components used inside posts | `src/components/blog/`                |
| Post page layout             | `src/layouts/BlogArticleLayout.astro` |
| Frontmatter rules            | `src/content.config.ts`               |

Images used by only one post stay in that post's folder. Images also used elsewhere on the site, such as team photos, stay in `src/assets/`.

## Steps

1. Pick a slug. Use lowercase words separated by hyphens. The slug is permanent once published, because changing it breaks links.
2. Create `src/content/blog/<slug>/index.mdx`.
3. Add the frontmatter (see below).
4. Add the cover image to the post's folder.
5. Write the post in Markdown.
6. Check it locally (see "Check your post").
7. Open a pull request. The preview deploy shows the post as it will look live.

## Frontmatter

```mdx
---
title: 'Short, clear title'
summary: 'One or two sentences. Shown under the title, on the blog index card, and as the search and share description.'
category: 'Engineering'
datePublished: 2026-11-19
author: 'Jim Verducci'
authorId: 'jim-verducci'
coverImage: '/images/blog/my-new-post/cover.jpg'
cover: './cover.jpg'
---
```

| Field           | Required | What it does                                                                                                                                                  |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`         | Yes      | Page title, heading, share title and index card title.                                                                                                        |
| `summary`       | Yes      | Text under the title, index card text and meta description.                                                                                                   |
| `category`      | Yes      | One of `Auth`, `Engineering` or `Press`. Shown as the badge above the title.                                                                                  |
| `datePublished` | Yes      | Publish date as `YYYY-MM-DD`. Sets the date on the index card, the JSON-LD and the sitemap.                                                                   |
| `dateModified`  | No       | Date of the last meaningful edit, as `YYYY-MM-DD`. Used for the sitemap and the JSON-LD's modified date in place of `datePublished`.                          |
| `author`        | No       | Author name used in JSON-LD when there is no `authorId`. Defaults to `Wristband Team`.                                                                        |
| `authorId`      | No       | Key from `src/data/blog/authors.ts`. Adds the author card at the end of the post. An unknown key fails the build.                                             |
| `coverImage`    | Yes      | Public URL of the cover image. Used for the share image and the blog index card.                                                                              |
| `cover`         | No       | Path to the cover image in the post's folder. Shown at the top of the post, resized and compressed by Astro. If missing, the post shows `coverImage` instead. |

Wrap text values in single quotes. This avoids problems with colons and apostrophes in titles.

### Why the cover is listed twice

`cover` is the copy Astro optimizes for the post page. `coverImage` must be a fixed public address, because link previews and the blog index card need one. A link preview is the card LinkedIn, Slack and X show when someone pastes the post's link. Optimized images get new file names whenever they change, so a link that was already shared would lose its image. Until the blog index is rebuilt, a new post needs both:

- the image in the post's folder, for `cover`
- a copy in `public/`, for `coverImage` (for example `public/images/blog/<slug>/cover.jpg`)

The example post's cover is 1920 x 1080 (16:9). Use the same size so covers look consistent on the blog index.

## Writing the post

- Start body headings at `##`. The post title is already the page's only `#` heading.
- Use `###` for subsections.
- Links, bold, lists, code blocks and quotes use normal Markdown.
- Code blocks get syntax highlighting when they name a language, for example ` ```ts `.

### Images in the body

Put the image in the post's folder and reference it with a relative path:

```mdx
![What the image shows](./diagram.png)
```

Astro resizes and compresses it at build time. Always write alt text that describes the image.

### Components

MDX files can use components. Import them after the frontmatter, using a path relative to the post's folder:

```mdx
import EventDetails from '../../../components/blog/EventDetails.astro';

<EventDetails
  title="Event name"
  dateTime="Sept 06, 2024 11:00-11:45 AM PST"
  registrationUrl="https://example.com/register"
/>
```

Available components:

| Component      | Use                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `EventDetails` | Title, date and registration link list for posts announcing an event. `registrationLabel` is optional and defaults to `Event Registration Link`. |

`AuthorCard` is not imported in posts. The layout adds it when the post has an `authorId`.

New components that only posts use go in `src/components/blog/`.

Text inside components is part of the page's HTML, so search engines see it like the rest of the post. The one exception is a React component with `client:only`. Its content is built in the browser, so it is missing from the page source. Do not use `client:only` for content that should be found in search or shown in link previews.

## Adding an author

Add an entry to `AUTHORS` in `src/data/blog/authors.ts`:

```ts
'first-last': {
  name: 'First Last',
  role: 'Job title',
  photo: firstLast,
  profileUrl: '/the-team',
  linkedin: 'https://www.linkedin.com/in/...',
  bio: 'Two or three sentences.',
},
```

Import the photo at the top of the file. If the person is on the team page, reuse their photo from `src/assets/team/` instead of adding a new file.

Then set `authorId: 'first-last'` and `author: 'First Last'` in the post's frontmatter.

## Check your post

```bash
npm run dev
```

Open `http://localhost:4321/blog/<slug>` and check:

- the title, summary, badge and cover at the top
- headings, lists, links and images in the body
- the author card at the end, if the post has an `authorId`
- the post's card on `/blog`
- the page at phone, tablet and desktop widths

Then run a full build. It fails on frontmatter mistakes, such as a missing field, an unknown category, a missing image or an unknown `authorId`.

```bash
npm run build
```

## What happens automatically

- **Post page:** built at `/blog/<slug>` with the blog layout, header and footer.
- **Blog index:** a card for the post is added at the top of the latest posts list on `/blog`. New posts are sorted newest first.
- **Sitemap:** the post is listed, with `dateModified` (or `datePublished` if there is none) as its last updated date.
- **Search and sharing:** title, description, share image, canonical URL and JSON-LD are generated from the frontmatter.

## Things to know

- There are no drafts. A merged post is live. Keep unfinished posts on a branch.
- When you make a meaningful edit to a published post, set `dateModified` to that day.
- Some older posts are still copied Webflow pages in `src/webflow/blog-*.html`. A copied page wins over a Markdown or MDX file with the same slug. These are being converted to MDX one at a time.
- `src/content/blog/security-auth-for-small-businesses-best-practices-with-jim-manico-webinar/` is a complete example of a post.
