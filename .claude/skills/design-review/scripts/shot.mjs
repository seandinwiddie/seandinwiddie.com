#!/usr/bin/env node

// Screenshots one element per spec from a local copy of the site, with the
// computed type of the element and its headings, for the designer's review.
//
//   NODE_PATH=<dir with playwright-core> node shot.mjs <site root> <out dir> "path|selector|width|name" ...
//
// The browser is the pre-installed Chromium (PLAYWRIGHT_BROWSERS_PATH), and every
// request off the local server is blocked, so third-party embeds never load.

import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, resolve } from "node:path";

const require = createRequire(join(process.env.NODE_PATH || process.cwd(), "index.js"));
const { chromium } = require("playwright-core");

const [root, outDir, ...specs] = process.argv.slice(2);
if (!root || !outDir || specs.length === 0) {
  console.error('usage: shot.mjs <site root> <out dir> "path|selector|width|name" ...');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const TYPES = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml",
  ".webp": "image/webp", ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
};
const server = createServer((request, response) => {
  let file = join(resolve(root), decodeURIComponent(request.url.split("?")[0]));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) return response.writeHead(404).end();
  response.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
  response.end(readFileSync(file));
}).listen(0);
const origin = `http://127.0.0.1:${server.address().port}`;

const executablePath = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
const browser = await chromium.launch({ executablePath, headless: true });
try {
  for (const spec of specs) {
    const [path, selector, width = "1366", name = `${selector.replace(/\W+/g, "-")}-${width}`] = spec.split("|");
    const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } });
    await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
    // Decline analytics first, so the consent panel never covers the section,
    // and let the sticky header scroll away with the page.
    await page.addInitScript(() => {
      try {
        localStorage.setItem("sd-agency-analytics-consent", "denied");
      } catch {}
    });
    await page.goto(`${origin}${path}`, { waitUntil: "load", timeout: 30000 });
    await page.addStyleTag({ content: ".nav { position: static !important; } .privacy-consent { display: none !important; }" });
    const element = page.locator(selector).first();
    await element.screenshot({ path: join(outDir, `${name}.png`) });
    const type = await element.evaluate((node) => {
      const describe = (el) => {
        const style = getComputedStyle(el);
        return `${el.tagName.toLowerCase()} ${style.fontSize}/${style.lineHeight} w${style.fontWeight} ${style.color} on ${style.backgroundColor} mt${style.marginTop} mb${style.marginBottom}`;
      };
      const seen = new Set();
      return [node, ...node.querySelectorAll("h1, h2, h3, h4, p, li, a.button, .button")]
        .filter((el) => {
          const key = `${el.tagName}.${el.className}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .slice(0, 12)
        .map(describe);
    });
    console.log(`${name}.png`);
    for (const line of type) console.log(`  ${line}`);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
