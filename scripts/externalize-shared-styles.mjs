#!/usr/bin/env node

/** Replace byte-identical, repeated inline CSS with deterministic local assets. */

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { relative, resolve, sep } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const OUTPUT = resolve(ROOT, "assets/generated");
const MANIFEST = resolve(OUTPUT, "shared-styles.json");
const EXCLUDED = new Set([".git", "node_modules", "scripts", "wp-content", "wp-includes", "wp-json", "_site"]);

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (EXCLUDED.has(entry.name)) return [];
    const absolute = resolve(directory, entry.name);
    return entry.isDirectory()
      ? walk(absolute)
      : entry.name.endsWith(".html")
        ? [absolute]
        : [];
  });

const digest = (content) => createHash("sha256").update(content).digest("hex").slice(0, 12);
const safeName = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64) || "inline";

const files = walk(ROOT);
const groups = new Map();
for (const file of files) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi)) {
    const content = match[2];
    if (content.length < 1000) continue;
    const hash = digest(content);
    const id = match[1].match(/\bid=["']([^"']+)/i)?.[1] || "inline";
    const group = groups.get(hash) || { hash, id, content, occurrences: 0 };
    group.occurrences += 1;
    groups.set(hash, group);
  }
}

const shared = [...groups.values()]
  .filter(({ occurrences }) => occurrences >= 4)
  .sort((left, right) => left.hash.localeCompare(right.hash))
  .map((group) => ({
    ...group,
    file: `${safeName(group.id)}-${group.hash}.css`,
  }));

if (shared.length === 0) {
  process.stdout.write("Externalized 0 repeated inline style groups.\n");
  process.exit(0);
}

mkdirSync(OUTPUT, { recursive: true });
for (const group of shared) {
  const target = resolve(OUTPUT, group.file);
  const content = `${group.content.trim()}\n`;
  if (!existsSync(target) || readFileSync(target, "utf8") !== content) {
    writeFileSync(target, content);
  }
}

const byHash = new Map(shared.map((group) => [group.hash, group]));
let changedFiles = 0;
for (const file of files) {
  const original = readFileSync(file, "utf8");
  const html = original.replace(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi, (source, attributes, content) => {
    const group = byHash.get(digest(content));
    if (!group) return source;
    return `<link rel="stylesheet" href="/assets/generated/${group.file}" data-extracted-style="${safeName(group.id)}">`;
  });
  if (html !== original) {
    writeFileSync(file, html);
    changedFiles += 1;
  }
}

const manifest = {
  version: 1,
  assets: shared.map(({ content, ...asset }) => ({
    ...asset,
    bytes: Buffer.byteLength(content),
  })),
};
const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
if (!existsSync(MANIFEST) || readFileSync(MANIFEST, "utf8") !== serialized) {
  writeFileSync(MANIFEST, serialized);
}

process.stdout.write(
  `Externalized ${shared.length} repeated inline style groups across ${changedFiles} HTML files.\n`,
);
