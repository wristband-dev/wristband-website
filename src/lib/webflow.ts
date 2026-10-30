import meta from '../webflow/meta.json';
import blogPostSource from '../webflow/blog-wristband-launches-public-beta.html?raw';
import { decodeHtmlEntities } from './seo';

export type WebflowPageMeta = {
  title: string;
  description: string;
  ogImage: string;
  wfPage: string;
  wfSite: string;
  bodyClass: string;
  file: string;
  bytes: number;
};

export const webflowMeta = meta as Record<string, WebflowPageMeta>;

export function getWebflowMeta(key: string): WebflowPageMeta {
  const m = webflowMeta[key];
  if (!m) throw new Error(`Missing Webflow meta for ${key}`);
  return {
    ...m,
    title: decodeHtmlEntities(m.title),
    description: decodeHtmlEntities(m.description),
  };
}

/**
 * Header and footer HTML cut from an exported Webflow blog post, for pages Webflow never
 * exported (Markdown blog posts, the 404 page). `headerHtml` goes inside an open
 * `<div class="page-wrapper">`; `footerHtml` follows the page content.
 */
export function getWebflowChrome(): { headerHtml: string; footerHtml: string } {
  const wrapperOpen = '<div class="page-wrapper">';
  const headerStart = blogPostSource.indexOf(wrapperOpen);
  const sectionStart = blogPostSource.indexOf('<div class="section blog-post">');
  const footerStart = blogPostSource.indexOf('<footer class="footer">');
  const commentsStart = blogPostSource.indexOf('<!--Start of Google Tag Manager Script-->');

  if (headerStart < 0 || sectionStart < 0 || footerStart < 0 || commentsStart < 0) {
    throw new Error('Failed to extract Webflow header/footer from the blog post export');
  }

  return {
    headerHtml: blogPostSource.slice(headerStart + wrapperOpen.length, sectionStart),
    footerHtml: blogPostSource.slice(footerStart, commentsStart).replace(/<\/div>\s*$/, ''),
  };
}
