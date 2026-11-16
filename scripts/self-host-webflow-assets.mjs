#!/usr/bin/env node
// Self-hosts Webflow CDN assets referenced by ONE file, then rewrites that file to use the local copies.
//
// Usage (from the repo root):
//   node scripts/self-host-webflow-assets.mjs <file> [--dry-run]
//
// Examples:
//   node scripts/self-host-webflow-assets.mjs src/webflow/terms.html --dry-run
//   node scripts/self-host-webflow-assets.mjs src/webflow/terms.html
//
// What it does:
//   1. Finds every cdn.prod.website-files.com and d3e54v103j8qbb.cloudfront.net address in the file.
//   2. Downloads each one into public/ (skipping files that were already downloaded):
//        images -> public/images/webflow/
//        fonts  -> public/fonts/webflow/
//        js     -> public/js/
//   3. Rewrites the file so each address points at its local copy.
//   4. Records every download in scripts/webflow-assets-manifest.json, so later runs reuse the same local path.
//
// --dry-run prints what would happen, without downloading or changing anything.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';

const HOSTS = ['cdn.prod.website-files.com', 'd3e54v103j8qbb.cloudfront.net'];
const FONT_EXTS = new Set(['.woff2', '.woff', '.ttf', '.eot', '.otf']);
const JS_EXTS = new Set(['.js']);
const MANIFEST_PATH = 'scripts/webflow-assets-manifest.json';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const target = args.find((a) => !a.startsWith('--'));

if (!target) {
  console.error('Usage: node scripts/self-host-webflow-assets.mjs <file> [--dry-run]');
  process.exit(1);
}
if (!existsSync(target)) {
  console.error(`File not found: ${target}`);
  process.exit(1);
}
if (!existsSync('public') || !existsSync('package.json')) {
  console.error('Run this from the repo root (the folder with package.json and public/).');
  process.exit(1);
}

// Finds Webflow-hosted URLs. Stops at quotes, whitespace, ")" and "<", and drops a trailing HTML-encoded quote.
function findUrls(text) {
  const hostPattern = HOSTS.map((h) => h.replace(/\./g, '\\.')).join('|');
  const re = new RegExp(`https?://(?:${hostPattern})/[^"'\\s)<>]+`, 'g');
  const found = new Set();
  for (const match of text.matchAll(re)) {
    let url = match[0].replace(/&quot;.*$/, '').replace(/&#x27;.*$/, '');
    url = url.replace(/[,;]+$/, '');
    found.add(url);
  }
  return [...found];
}

// Turns a URL into a safe local file name: last path segment, query removed, decoded, odd characters replaced.
function localNameFor(url) {
  const { pathname } = new URL(url);
  let name = pathname.split('/').pop() || 'asset';
  try {
    name = decodeURIComponent(name);
  } catch {
    // Keep the raw name if it is not valid percent-encoding.
  }
  // Some Webflow names contain an encoded folder path; keep only the final part.
  name = name.split('/').pop();
  return name.replace(/[^A-Za-z0-9._-]+/g, '-');
}

function folderFor(name) {
  const ext = extname(name).toLowerCase();
  if (FONT_EXTS.has(ext)) return 'fonts/webflow';
  if (JS_EXTS.has(ext)) return 'js';
  return 'images/webflow';
}

const manifest = existsSync(MANIFEST_PATH) ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) : {};
const usedPaths = new Set(Object.values(manifest));

function localPathFor(url) {
  if (manifest[url]) return manifest[url];
  const name = localNameFor(url);
  const folder = folderFor(name);
  let candidate = `/${folder}/${name}`;
  // Two different URLs with the same file name: add a number before the extension.
  let n = 2;
  while (usedPaths.has(candidate)) {
    const ext = extname(name);
    candidate = `/${folder}/${name.slice(0, name.length - ext.length)}-${n}${ext}`;
    n += 1;
  }
  usedPaths.add(candidate);
  return candidate;
}

async function download(url, localPath) {
  const diskPath = join('public', localPath);
  if (existsSync(diskPath)) return 'already downloaded';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length === 0) throw new Error(`Empty response for ${url}`);
  mkdirSync(dirname(diskPath), { recursive: true });
  writeFileSync(diskPath, bytes);
  return `downloaded (${bytes.length} bytes)`;
}

const original = readFileSync(target, 'utf8');
const urls = findUrls(original);

if (urls.length === 0) {
  console.log(`No Webflow-hosted addresses found in ${target}. Nothing to do.`);
  process.exit(0);
}

const plan = urls.map((url) => ({ url, localPath: localPathFor(url) }));

console.log(`${target}: ${plan.length} Webflow-hosted address(es)${dryRun ? ' (dry run)' : ''}\n`);

let failures = 0;
for (const item of plan) {
  if (dryRun) {
    console.log(`  ${item.localPath}\n    <- ${item.url}`);
    continue;
  }
  try {
    const status = await download(item.url, item.localPath);
    manifest[item.url] = item.localPath;
    console.log(`  ${item.localPath}: ${status}`);
  } catch (err) {
    failures += 1;
    item.failed = true;
    console.error(`  FAILED ${item.url}: ${err.message}`);
  }
}

if (dryRun) {
  console.log('\nDry run only. Nothing was downloaded or changed.');
  process.exit(0);
}

// Replace longer URLs first, so a URL that is a prefix of another is never replaced inside it.
let updated = original;
for (const item of [...plan].sort((a, b) => b.url.length - a.url.length)) {
  if (item.failed) continue;
  updated = updated.split(item.url).join(item.localPath);
}

writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
if (updated !== original) writeFileSync(target, updated);

const remaining = findUrls(updated);
console.log(`\nRewrote ${target}. Webflow-hosted addresses left in it: ${remaining.length}.`);
if (failures > 0) {
  console.error(`${failures} download(s) failed. Those addresses were left unchanged. Re-run to retry.`);
  process.exit(1);
}
