// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.wristband.dev';

// Sitemap <lastmod> dates by URL path.
// Copied Webflow pages: the `lastmod` field in src/webflow/meta.json.
// Markdown-only blog posts: the post's `pubDate` frontmatter.
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

  const blogDir = new URL('./src/content/blog/', import.meta.url);
  for (const file of readdirSync(blogDir)) {
    const match = file.match(/^(.+)\.mdx?$/);
    if (!match) continue;
    const path = `/blog/${match[1]}`;
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
