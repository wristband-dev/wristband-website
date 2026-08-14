import meta from '../webflow/meta.json';

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
  return m;
}
