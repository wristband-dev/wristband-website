import { LINKS, SITE } from './constants';
import pricingFaqs from './pricing-faqs.json';

export const DEFAULT_OG_IMAGE = '/images/hero_background.webp';
export const TWITTER_HANDLE = '@wristband_dev';

export type JsonLdNode = Record<string, unknown>;

const SITE_ORIGIN = SITE.url.replace(/\/$/, '');

export function decodeHtmlEntities(value: string): string {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&nbsp;', ' ');
}

export function absoluteUrl(pathOrUrl: string, site: string = SITE.url): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  return new URL(pathOrUrl || DEFAULT_OG_IMAGE, site).href;
}

export function resolveOgImage(ogImage?: string): string {
  return ogImage?.trim() ? ogImage : DEFAULT_OG_IMAGE;
}

function markdownLinksToPlain(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');
}

export function organizationNode(): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: SITE.name,
    legalName: 'Apitopia, Inc.',
    url: SITE_ORIGIN,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/images/wristband_logo.svg'),
    },
    email: SITE.email,
    sameAs: [LINKS.github, LINKS.linkedin, LINKS.twitter, LINKS.bluesky, LINKS.docs],
  };
}

export function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    inLanguage: 'en-US',
  };
}

export function softwareApplicationNode(): JsonLdNode {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_ORIGIN}/#product`,
    name: SITE.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    url: SITE_ORIGIN,
    description: SITE.description,
    offers: {
      '@type': 'Offer',
      url: `${SITE_ORIGIN}/pricing`,
      price: '0',
      priceCurrency: 'USD',
      description:
        'SSO, MFA, and role-based access control are included on every plan, including Free. Confirm current prices at /pricing — do not invent plan prices.',
    },
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
  };
}

export function faqPageNode(canonical: string): JsonLdNode {
  return {
    '@type': 'FAQPage',
    '@id': `${canonical}#faq`,
    url: canonical,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    mainEntity: pricingFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: markdownLinksToPlain(faq.answer),
      },
    })),
  };
}

export function breadcrumbNode(
  items: Array<{ name: string; path: string }>,
): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingNode(input: {
  url: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished: Date | string;
  dateModified?: Date | string;
  authorName?: string;
}): JsonLdNode {
  const datePublished =
    input.datePublished instanceof Date
      ? input.datePublished.toISOString()
      : new Date(input.datePublished).toISOString();
  const dateModified = input.dateModified
    ? input.dateModified instanceof Date
      ? input.dateModified.toISOString()
      : new Date(input.dateModified).toISOString()
    : datePublished;

  return {
    '@type': 'BlogPosting',
    '@id': `${input.url}#article`,
    headline: decodeHtmlEntities(input.headline),
    description: input.description ? decodeHtmlEntities(input.description) : undefined,
    image: input.image ? absoluteUrl(input.image) : absoluteUrl(DEFAULT_OG_IMAGE),
    datePublished,
    dateModified,
    author: input.authorName
      ? { '@type': 'Organization', name: input.authorName, url: SITE_ORIGIN }
      : { '@id': `${SITE_ORIGIN}/#organization` },
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    url: input.url,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    inLanguage: 'en-US',
  };
}

export function articleNode(input: {
  url: string;
  headline: string;
  description?: string;
  image?: string;
}): JsonLdNode {
  return {
    '@type': 'Article',
    '@id': `${input.url}#article`,
    headline: decodeHtmlEntities(input.headline),
    description: input.description ? decodeHtmlEntities(input.description) : undefined,
    image: input.image ? absoluteUrl(input.image) : absoluteUrl(DEFAULT_OG_IMAGE),
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    url: input.url,
    inLanguage: 'en-US',
  };
}

export function jsonLdGraph(extra: JsonLdNode[] = []): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(), websiteNode(), ...extra],
  };
}
