/**
 * Generates public/sitemap.xml, public/robots.txt and public/llms.txt from a
 * shared source of truth. Runs automatically after every build (`postbuild`);
 * run manually with `node scripts/generate-static-meta.mjs`.
 *
 * Source of truth:
 * - static pages     → enumerated from pages/ (dynamic routes, api routes,
 *                       404, and Next.js internals like _app/_document skipped)
 * - Contentful pages  → the *Slug constants exported from lib/constants.ts —
 *                       the same constants pages/[slug].tsx's getStaticPaths uses,
 *                       so the sitemap can never drift from what actually gets built
 * - site URL          → SITE_URL in lib/constants.ts
 *
 * Output is deterministic (stable ordering) and idempotent for reruns on the
 * same day; only <lastmod> changes across days, since it reflects the build date.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const PAGES_DIR = path.join(ROOT, 'pages');

const constantsSource = fs.readFileSync(path.join(ROOT, 'lib', 'constants.ts'), 'utf8');

const siteUrlMatch = constantsSource.match(/^export const SITE_URL[^=]*=\s*'([^']+)'/m);
if (!siteUrlMatch) {
  throw new Error('Could not find SITE_URL in lib/constants.ts');
}
const ORIGIN = siteUrlMatch[1].replace(/\/+$/, '');

// Every Contentful-driven route is exposed as an `export const xxxSlug = '...'` in
// lib/constants.ts, and pages/[slug].tsx's getStaticPaths builds its paths from those
// same constants — reading them here keeps the sitemap in lockstep with the real build.
const contentSlugs = [...constantsSource.matchAll(/^export const \w+Slug = '([^']+)';/gm)]
  .map(([, slug]) => slug)
  .sort();

const pageUrl = (route) => (route ? `${ORIGIN}/${route}` : ORIGIN);

/**
 * Titles and descriptions for the llms.txt "Pages" section, in display order.
 * Every route on the site — static or Contentful-driven — needs an entry here;
 * generation fails when this map and the routes on disk/in constants drift apart,
 * so neither can go stale silently.
 */
const PAGE_DESCRIPTIONS = new Map([
  ['', ['Home', 'Landing page linking to the Designs and Apps & Websites portfolio sections']],
  ['designs', ['Designs', 'Portfolio of design work']],
  ['apps-and-websites', ['Apps & Websites', 'Portfolio of applications and websites built']],
  [
    'for-llms',
    ['For LLMs', 'AI-facing profile with identity, canonical links, and attribution guidance'],
  ],
]);

/** Collects static page routes ('' for home, 'about', ...) from the pages directory. */
function collectPageRoutes(dir, prefix = '') {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    // dynamic routes, Next.js internals, and API routes aren't pages
    .filter(
      (entry) => !entry.name.startsWith('[') && !entry.name.startsWith('_') && entry.name !== 'api',
    )
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  return entries.flatMap((entry) => {
    if (entry.isDirectory()) {
      return collectPageRoutes(path.join(dir, entry.name), `${prefix}${entry.name}/`);
    }
    if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const base = entry.name.replace(/\.tsx?$/, '');
      if (base === '404' || base === '500') {
        return [];
      }
      return [base === 'index' ? prefix.replace(/\/$/, '') : `${prefix}${base}`];
    }
    return [];
  });
}

const staticRoutes = collectPageRoutes(PAGES_DIR).sort();
const allRoutes = [...staticRoutes, ...contentSlugs].sort();

// --- drift check: PAGE_DESCRIPTIONS and the actual routes must match exactly ---

for (const route of allRoutes) {
  if (!PAGE_DESCRIPTIONS.has(route)) {
    throw new Error(
      `Page "/${route}" has no llms.txt entry — add it to PAGE_DESCRIPTIONS in scripts/generate-static-meta.mjs`,
    );
  }
}
for (const route of PAGE_DESCRIPTIONS.keys()) {
  if (!allRoutes.includes(route)) {
    throw new Error(
      `PAGE_DESCRIPTIONS lists "/${route}" but no such static page or Contentful slug exists`,
    );
  }
}

// --- sitemap.xml ---

const today = new Date().toISOString().slice(0, 10);
const XML_ESCAPES = { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' };
const xmlEscape = (value) => value.replace(/[<>&'"]/g, (char) => XML_ESCAPES[char]);
const urlEntry = (loc, lastmod) =>
  `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;

const sitemapEntries = allRoutes.map((route) => urlEntry(pageUrl(route), today));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>
`;

// --- robots.txt ---

const robots = `User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`;

// --- llms.txt ---

const llmsPages = [...PAGE_DESCRIPTIONS].map(
  ([route, [title, description]]) => `- [${title}](${pageUrl(route)}): ${description}`,
);

const llms = `# Ivan Suvak Martinovic

> Personal portfolio of Ivan Suvak Martinovic, a creative Full Stack developer living in Canada. Showcases design work and applications/websites built.

Key facts:

- Site: ${ORIGIN}
- Contact: isuvak@gmail.com

## Pages

${llmsPages.join('\n')}
`;

// --- write everything ---

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llms);

process.stdout.write(
  `Generated sitemap.xml (${sitemapEntries.length} URLs), robots.txt and llms.txt from ${staticRoutes.length} static page(s) and ${contentSlugs.length} Contentful slug(s)\n`,
);
