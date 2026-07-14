#!/usr/bin/env node

/** Generate deterministic XML sitemaps from the deployable HTML tree. */

import {
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { relative, resolve, sep } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname, "..");
const ORIGIN = "https://seandinwiddie.com";
const EXCLUDED = new Set([
  ".git",
  "node_modules",
  "scripts",
  "wp-content",
  "wp-includes",
  "wp-json",
]);

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = resolve(directory, entry.name);
    if (entry.isDirectory()) return EXCLUDED.has(entry.name) ? [] : walk(absolute);
    return entry.name.endsWith(".html") ? [absolute] : [];
  });

const routeFor = (file) => {
  const path = relative(ROOT, file).split(sep).join("/");
  return path === "index.html" ? "/" : `/${path.replace(/index\.html$/, "")}`;
};

const isIndexable = (file) => {
  const html = readFileSync(file, "utf8");
  return (
    /<html\b/i.test(html) &&
    !/<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)
  );
};

const lastModified = (file) => {
  const path = relative(ROOT, file);
  try {
    const changed = execFileSync(
      "git",
      ["status", "--porcelain=v1", "--", path],
      { cwd: ROOT, encoding: "utf8" },
    ).trim();
    if (!changed) {
      const committed = execFileSync(
        "git",
        ["log", "-1", "--format=%cs", "--", path],
        { cwd: ROOT, encoding: "utf8" },
      ).trim();
      if (committed) return committed;
    }
  } catch {
    // A filesystem timestamp is a truthful fallback outside a Git checkout.
  }
  return new Date().toISOString().slice(0, 10);
};

const entryFor = (file) => ({
  route: routeFor(file),
  url: encodeURI(`${ORIGIN}${routeFor(file)}`),
  modified: lastModified(file),
});

const urlset = (entries) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<?xml-stylesheet type="text/xsl" href="${ORIGIN}/main-sitemap.xsl"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(
      ({ url, modified }) =>
        `  <url>\n    <loc>${url}</loc>\n    <lastmod>${modified}</lastmod>\n  </url>`,
    )
    .join("\n")}\n</urlset>\n`;

const writeMap = (name, entries) => {
  writeFileSync(resolve(ROOT, name), urlset(entries));
  return {
    name,
    count: entries.length,
    modified: entries
      .map(({ modified }) => modified)
      .sort()
      .at(-1),
  };
};

const entries = walk(ROOT).filter(isIndexable).map(entryFor);
const community = entries.filter(
  ({ route }) =>
    route.startsWith("/community/") && route !== "/community/sitemap/",
);
const posts = entries.filter(
  ({ route }) =>
    route.startsWith("/blog/") &&
    !/(?:\/author\/|\/category\/)/.test(route) &&
    route !== "/blog/",
);
const postRoutes = new Set(posts.map(({ route }) => route));
const communityRoutes = new Set(community.map(({ route }) => route));
const pages = entries.filter(
  ({ route }) =>
    !communityRoutes.has(route) &&
    !postRoutes.has(route) &&
    route !== "/sitemap/" &&
    route !== "/community/sitemap/" &&
    route !== "/404.html",
);

const maps = [
  writeMap("page-sitemap.xml", pages),
  writeMap("post-sitemap.xml", posts),
  writeMap("community-sitemap.xml", community),
];

const sitemapIndex =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<?xml-stylesheet type="text/xsl" href="${ORIGIN}/main-sitemap.xsl"?>\n` +
  `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${maps
    .map(
      ({ name, modified }) =>
        `  <sitemap>\n    <loc>${ORIGIN}/${name}</loc>\n    <lastmod>${modified}</lastmod>\n  </sitemap>`,
    )
    .join("\n")}\n</sitemapindex>\n`;

writeFileSync(resolve(ROOT, "sitemap_index.xml"), sitemapIndex);
process.stdout.write(
  `Generated ${maps.length} sitemaps for ${maps.reduce((total, map) => total + map.count, 0)} URLs.\n`,
);
