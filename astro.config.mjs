// @ts-check
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.wristband.dev';

// Each page's last modified date, written to the sitemap as <lastmod>.
// Copied Webflow pages: the `lastmod` field in src/webflow/meta.json.
// Rebuilt pages: PAGE_DATE_MODIFIED below. Update a page's date when its content changes.
// Blog posts: the post's `dateModified` frontmatter, or `datePublished` if it has none
// (a `slug.md(x)` file or a `slug/index.mdx` folder).
const PAGE_DATE_MODIFIED = {
  '/the-team': '2026-11-18',
  '/compare/wristband-vs-auth0': '2026-11-18',
  '/terms': '2026-11-19',
  '/privacy': '2026-11-19',
  '/cookie-policy': '2026-11-19',
};

/** @param {string} key */
function webflowPath(key) {
  if (key === 'home') return '';
  if (key.startsWith('blog-')) return `/blog/${key.slice('blog-'.length)}`;
  if (key.startsWith('compare-')) return `/compare/${key.slice('compare-'.length)}`;
  if (key.startsWith('customers-')) return `/customers/${key.slice('customers-'.length)}`;
  return `/${key}`;
}

function buildDateModifiedByPath() {
  const dateModifiedByPath = new Map();

  const meta = JSON.parse(readFileSync(new URL('./src/webflow/meta.json', import.meta.url), 'utf8'));
  for (const [key, page] of Object.entries(meta)) {
    if (page.lastmod) dateModifiedByPath.set(webflowPath(key), page.lastmod);
  }

  for (const [path, dateModified] of Object.entries(PAGE_DATE_MODIFIED)) {
    dateModifiedByPath.set(path, new Date(dateModified).toISOString());
  }

  const blogDir = new URL('./src/content/blog/', import.meta.url);
  for (const entry of readdirSync(blogDir, { withFileTypes: true })) {
    let slug;
    let file;
    if (entry.isDirectory()) {
      const index = ['index.mdx', 'index.md'].find((name) => existsSync(new URL(`${entry.name}/${name}`, blogDir)));
      if (!index) continue;
      slug = entry.name;
      file = `${entry.name}/${index}`;
    } else {
      const match = entry.name.match(/^(.+)\.mdx?$/);
      if (!match) continue;
      slug = match[1];
      file = entry.name;
    }
    const path = `/blog/${slug}`;
    if (dateModifiedByPath.has(path)) continue;
    const source = readFileSync(new URL(file, blogDir), 'utf8');
    const date = frontmatterDate(source, 'dateModified') ?? frontmatterDate(source, 'datePublished');
    if (date) dateModifiedByPath.set(path, date);
  }

  return dateModifiedByPath;
}

/**
 * A date field from a post's frontmatter, as an ISO string.
 * @param {string} source
 * @param {string} field
 */
function frontmatterDate(source, field) {
  const match = source.match(new RegExp(`^${field}:\\s*["']?([^"'\\n]+)["']?\\s*$`, 'm'));
  return match ? new Date(match[1].trim()).toISOString() : undefined;
}

const dateModifiedByPath = buildDateModifiedByPath();

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  // Emit /pricing.html rather than /pricing/index.html so Cloudflare Pages
  // serves /pricing directly instead of 308-redirecting to /pricing/.
  build: {
    format: 'file',
  },
  integrations: [
    mdx(),
    react(),
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '');
        const dateModified = dateModifiedByPath.get(path);
        if (dateModified) item.lastmod = dateModified;
        return item;
      },
    }),
  ],
  compressHTML: true,
  // Rewrites newer CSS, such as nested rules, into a form these browsers understand. Build only; source files and the dev server are unchanged.
  // Same browsers as Vite 8's default 'baseline-widely-available' target.
  vite: {
    build: {
      cssTarget: ['chrome111', 'edge111', 'firefox114', 'safari16.4', 'ios16.4'],
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
