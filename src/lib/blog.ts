import type { CollectionEntry } from 'astro:content';
import { webflowMeta } from './webflow';

export const BLOG_POST_WF_PAGE = '64d01a3771d020746e331ab1';

export function getWebflowBlogSlugs(): Set<string> {
  return new Set(
    Object.keys(webflowMeta)
      .filter((k) => k.startsWith('blog-'))
      .map((k) => k.replace(/^blog-/, '')),
  );
}

export function formatBlogDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function readingTimeMinutes(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function blogIndexCardHtml(post: CollectionEntry<'blog'>): string {
  const href = `/blog/${post.id}`;
  const title = escapeHtml(post.data.title);
  const summary = escapeHtml(post.data.summary);
  const category = escapeHtml(post.data.category);
  const cover = escapeHtml(post.data.coverImage);
  const date = escapeHtml(formatBlogDate(post.data.pubDate));
  const minutes = readingTimeMinutes(post.body);

  return `<div role="listitem" class="collection-item w-dyn-item"><a href="${href}" class="card non-featured-blog-post-card w-inline-block"><div class="image-wrapper featured-blog-post"><img height="Auto" alt="${title}" width="Auto" src="${cover}" class="image full-image"/></div><div class="split-content featured-blog-post-main-container"><div class="inner-container-450px"><div fs-cmsfilter-element="Category" class="blog-category">${category}</div><h2 class="title h3-size">${title}</h2><p class="paragraph-13">${summary}</p><div class="blog-post-content-bottom"><div class="blog-post-about-wrapper"><div class="about-blog-post-icon"></div><div>${date}</div></div><div class="blog-post-about-wrapper last"><div class="about-blog-post-icon"></div><div>${minutes}</div><div>&nbsp;min read</div></div></div></div></div></a></div>`;
}

const LATEST_LIST_MARKER = 'class="non-featured-blog-post-main-wrapper w-dyn-items">';

export function injectContentPostsIntoIndex(
  html: string,
  posts: CollectionEntry<'blog'>[],
): string {
  if (posts.length === 0) return html;
  const idx = html.indexOf(LATEST_LIST_MARKER);
  if (idx === -1) {
    throw new Error('Could not find latest-posts list in blog index HTML');
  }
  const insertAt = idx + LATEST_LIST_MARKER.length;
  const cards = posts
    .slice()
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map(blogIndexCardHtml)
    .join('');
  return html.slice(0, insertAt) + cards + html.slice(insertAt);
}
