// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.wristband.dev',
  output: 'static',
  trailingSlash: 'never',
  // Emit /pricing.html rather than /pricing/index.html so Cloudflare Pages
  // serves /pricing directly instead of 308-redirecting to /pricing/.
  build: {
    format: 'file',
  },
  integrations: [mdx(), react(), sitemap()],
  compressHTML: true,
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
