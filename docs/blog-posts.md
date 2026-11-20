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

| Field           | Required | What it does                                                                                                                                                                        |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`         | Yes      | Page title, heading, share title and index card title.                                                                                                                              |
| `summary`       | Yes      | Text under the title, index card text and meta description.                                                                                                                         |
| `category`      | Yes      | One of `Auth`, `Engineering` or `Press`. Shown as the badge above the title.                                                                                                        |
| `datePublished` | Yes      | Publish date as `YYYY-MM-DD`. Sets the date on the index card, the JSON-LD and the sitemap.                                                                                         |
| `dateModified`  | No       | Date of the last meaningful edit, as `YYYY-MM-DD`. Used for the sitemap and the JSON-LD's modified date in place of `datePublished`.                                                |
| `author`        | No       | Author name used in JSON-LD when there is no `authorId`. Defaults to `Wristband Team`.                                                                                              |
| `authorId`      | No       | Key from `src/data/blog/authors.ts`. Adds the author card at the end of the post. An unknown key fails the build.                                                                   |
| `coverImage`    | Yes      | Public URL of the cover image. Used for link previews.                                                                                                                              |
| `cover`         | No       | Path to the cover image in the post's folder. Shown at the top of the post and on the blog index card, resized and compressed by Astro. If missing, both show `coverImage` instead. |
| `featured`      | No       | `true` shows the post in the large card at the top of the blog index. Only one post can set it; the build fails if more do.                                                         |

Wrap text values in single quotes. This avoids problems with colons and apostrophes in titles.

### Why the cover is listed twice

`cover` is the copy Astro optimizes for the post page and the blog index. `coverImage` must be a fixed public address, because link previews need one. A link preview is the card LinkedIn, Slack and X show when someone pastes the post's link. Optimized images get new file names whenever they change, so a link that was already shared would lose its image. So a post needs both:

- the image in the post's folder, for `cover`
- a copy in `public/`, for `coverImage` (for example `public/images/blog/<slug>/cover.jpg`)

Both must be the same image.

The example post's cover is 1920 x 1080 (16:9). Use the same size so covers look consistent on the blog index.

## Writing the post

- Start body headings at `##`. The post title is already the page's only `#` heading.
- Use `###` for subsections.
- Links, bold, lists and quotes use normal Markdown.
- To open a link in a new tab, write it as HTML: `<a href="https://example.com" target="_blank">text</a>`. Markdown links always open in the same tab.

### Characters

Write post files in plain ASCII.

- Type straight quotes and apostrophes (`'` and `"`). They show on the page exactly as typed.
- Write an en dash as `&ndash;`, an em dash as `&mdash;` and a non-breaking space as `&nbsp;`.
- Do not paste curly quotes, invisible characters or non-breaking spaces from other tools. Editors flag them, and they are hard to spot in review.
- In frontmatter, an entity like `&ndash;` is not converted. Use a double-quoted value with a `\u` escape instead, for example `summary: "SSO \u2013 explained"`.
- Markdown turns a plain email address into a link. To show one as plain text, write it as `{'name@wristband.dev'}`.

### Images in the body

Put the image in the post's folder, import it, and show it with the `Figure` component:

```mdx
import Figure from '../../../components/blog/Figure.astro';
import diagram from './diagram.png';

<Figure image={diagram} alt="What the image shows">
  Caption text.
</Figure>
```

- Astro resizes and compresses the image at build time.
- Always write alt text that describes the image.
- The caption is optional, and is always shown in italics.
- By default the image fills the column. Add `align="center"` to show it at its own size, up to 60% of the column.

### Code blocks

Write code blocks as Markdown code fences, with a language:

````mdx
```bash
npm install @wristband/express-auth
```
````

- Code blocks get syntax highlighting in the same colors as the Wristband docs portal. The colors are set in `src/lib/code-theme.mjs`.
- Each code block gets a copy button.
- For command output or anything else readers should not copy, use `text` as the language. A `text` block has no highlighting and no copy button.
- Any language that Shiki, Astro's highlighter, supports will work. See the list at https://shiki.style/languages. Common ones are `bash`, `ts`, `js`, `json`, `python`, `go`, `csharp` and `yaml`.
- Check the language name. An unknown name does not fail the build: it shows a warning and the block gets no highlighting.
- Only shell and JavaScript/TypeScript colors are matched to the docs portal. Other languages use the shared colors, which look close. To match another language, add a group for it in `src/lib/code-theme.mjs`, as its header comment explains.

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
| `Figure`       | An image with an optional caption. See "Images in the body".                                                                                     |

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
- **Blog index:** `/blog` lists every post, newest first, as a card with its cover, category, title, summary, date and read time. The read time is calculated from the post's length, at 200 words a minute.
- **Sitemap:** the post is listed, with `dateModified` (or `datePublished` if there is none) as its last updated date.
- **Search and sharing:** title, description, share image, canonical URL and JSON-LD are generated from the frontmatter.

## Things to know

- There are no drafts. A merged post is live. Keep unfinished posts on a branch.
- When you make a meaningful edit to a published post, set `dateModified` to that day.
- Example posts:
  - `src/content/blog/security-auth-for-small-businesses-best-practices-with-jim-manico-webinar/` uses a component (`EventDetails`).
  - `src/content/blog/how-to-test-tenant-subdomains-on-macos-with-dnsmasq/` uses `Figure` and code blocks.
