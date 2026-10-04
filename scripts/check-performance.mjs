#!/usr/bin/env node

/** Budgets that keep the normalized static pages small and dependency-light. */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import { ROOT, hasDeck, publicPageFiles } from "./static-site.mjs";

const MAX_HTML_BYTES = 80_000;
const MAX_TOTAL_HTML_BYTES = 3_000_000;
const MAX_STYLE_ATTRIBUTES = 24;
// Photos are served at no more than 1600 px on the long edge; the budget
// catches a full-resolution upload before it reaches a page.
const MAX_IMAGE_BYTES = 350_000;
const ASSET_BUDGETS = Object.freeze({
  "assets/site.css": 64_000,
  "assets/site.js": 32_000,
  "assets/fontawesome.css": 16_000,
  "assets/dank-mono.css": 128_000,
  "assets/deck.css": 14_000,
  "assets/deck.js": 8_000,
});
const failures = [];
const pages = publicPageFiles();
let totalHtmlBytes = 0;

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const name = relative(ROOT, file).split(sep).join("/");
  const bytes = statSync(file).size;
  totalHtmlBytes += bytes;

  if (bytes > MAX_HTML_BYTES) failures.push(`${name}: ${bytes} HTML bytes exceeds ${MAX_HTML_BYTES}`);
  if (/<style\b/i.test(html)) failures.push(`${name}: inline style block bypasses the shared stylesheet`);
  const styleAttributes = [...html.matchAll(/\sstyle=["']/gi)].length;
  if (styleAttributes > MAX_STYLE_ATTRIBUTES) {
    failures.push(`${name}: ${styleAttributes} style attributes exceeds ${MAX_STYLE_ATTRIBUTES}`);
  }
  if (/\bsrcset=["']/i.test(html)) failures.push(`${name}: responsive WordPress image variants remain`);

  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  const runtimeScripts = scripts.filter((match) => /\bsrc=["']/i.test(match[1]));
  const inlineExecutables = scripts.filter(
    (match) =>
      !/\bsrc=["']/i.test(match[1]) &&
      !/\btype=["']application\/ld\+json["']/i.test(match[1]) &&
      match[2].trim(),
  );
  // A talk deck loads one stylesheet and one script of its own (docs/design.md, Talk decks).
  const deckAssets = hasDeck(html) ? 1 : 0;
  if (runtimeScripts.length !== 1 + deckAssets) failures.push(`${name}: expected one shared runtime script`);
  if (inlineExecutables.length > 0) failures.push(`${name}: contains inline executable JavaScript`);
  if (/googletagmanager\.com\/gtag\/js|gtag\(["']config["']|wp-admin|admin-ajax|forms\.aweber\.com\/form\/displays\.htm/i.test(html)) {
    failures.push(`${name}: immediate analytics or retired plugin runtime remains`);
  }

  const stylesheets = [...html.matchAll(/<link\b[^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*>/gi)];
  if (stylesheets.length !== 2 + deckAssets) failures.push(`${name}: expected exactly two shared stylesheet links`);
}

if (totalHtmlBytes > MAX_TOTAL_HTML_BYTES) {
  failures.push(`HTML total ${totalHtmlBytes} exceeds ${MAX_TOTAL_HTML_BYTES}`);
}

for (const [path, maximum] of Object.entries(ASSET_BUDGETS)) {
  const file = resolve(ROOT, path);
  if (!existsSync(file)) {
    failures.push(`${path}: missing budgeted shared asset`);
    continue;
  }
  const bytes = statSync(file).size;
  if (bytes > maximum) failures.push(`${path}: ${bytes} bytes exceeds ${maximum}`);
}

for (const entry of readdirSync(resolve(ROOT, "assets/img"), { recursive: true })) {
  const path = `assets/img/${entry.split(sep).join("/")}`;
  if (!/\.(jpe?g|png|webp|avif)$/i.test(path)) continue;
  const bytes = statSync(resolve(ROOT, path)).size;
  if (bytes > MAX_IMAGE_BYTES) failures.push(`${path}: ${bytes} image bytes exceeds ${MAX_IMAGE_BYTES}`);
}

if (failures.length > 0) {
  process.stderr.write(`${[...new Set(failures)].join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Performance budgets passed for ${pages.length} pages (${totalHtmlBytes} total HTML bytes).\n`,
  );
}
