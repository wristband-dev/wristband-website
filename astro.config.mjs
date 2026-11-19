// @ts-check
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.wristband.dev';

// Sitemap <lastmod> dates by URL path.
// Copied Webflow pages: the `lastmod` field in src/webflow/meta.json.
// Rebuilt pages: REBUILT_PAGE_LASTMOD below. Update a page's date when its content changes.
// Markdown/MDX blog posts: the post's `pubDate` frontmatter (a `slug.md(x)` file or a `slug/index.mdx` folder).
const REBUILT_PAGE_LASTMOD = {
  '/the-team': '2026-11-18',
  '/compare/wristband-vs-auth0': '2026-11-18',
  '/blog/security-auth-for-small-businesses-best-practices-with-jim-manico-webinar': '2026-11-19',
};

/** @param {string} key */
function webflowPath(key) {
  if (key === 'home') return '';
  if (key.startsWith('blog-')) return `/blog/${key.slice('blog-'.length)}`;
  if (key.startsWith('compare-')) return `/compare/${key.slice('compare-'.length)}`;
  if (key.startsWith('customers-')) return `/customers/${key.slice('customers-'.length)}`;
  return `/${key}`;
}

function buildLastmodByPath() {
  const lastmodByPath = new Map();

  const meta = JSON.parse(readFileSync(new URL('./src/webflow/meta.json', import.meta.url), 'utf8'));
  for (const [key, page] of Object.entries(meta)) {
    if (page.lastmod) lastmodByPath.set(webflowPath(key), page.lastmod);
  }

  for (const [path, lastmod] of Object.entries(REBUILT_PAGE_LASTMOD)) {
    lastmodByPath.set(path, new Date(lastmod).toISOString());
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
    if (lastmodByPath.has(path)) continue;
    const source = readFileSync(new URL(file, blogDir), 'utf8');
    const pubDate = source.match(/^pubDate:\s*["']?([^"'\n]+)["']?\s*$/m);
    if (pubDate) lastmodByPath.set(path, new Date(pubDate[1].trim()).toISOString());
  }

  return lastmodByPath;
}

const lastmodByPath = buildLastmodByPath();

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
        const lastmod = lastmodByPath.get(path);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  compressHTML: true,
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
