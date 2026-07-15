#!/usr/bin/env node

/**
 * Render every public page in a real Chromium browser at mobile and desktop widths.
 *
 * Windows/WSL usage:
 *   node.exe scripts/check-responsive.mjs
 *
 * Set CHROME_PATH or PREVIEW_ORIGIN to override the detected browser or local URL.
 */

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { publicPageFiles, routeForFile } from "./static-site.mjs";

const ORIGIN = process.env.PREVIEW_ORIGIN || "http://127.0.0.1:8765";
const VIEWPORTS = Object.freeze([
  { width: 390, height: 844, mobile: true },
  { width: 1366, height: 900, mobile: false },
]);
const CHROME_CANDIDATES = Object.freeze([
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean));

const chromePath = CHROME_CANDIDATES.find(existsSync);
if (!chromePath) {
  throw new Error("Chrome/Chromium was not found. Set CHROME_PATH to its executable.");
}

const waitForFile = async (file, attempts = 100) => {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (existsSync(file)) return;
    await delay(50);
  }
  throw new Error(`Timed out waiting for ${file}`);
};

const connect = async (url) => {
  const socket = new WebSocket(url);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  const eventWaiters = new Map();

  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      const waiter = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) waiter.reject(new Error(message.error.message));
      else waiter.resolve(message.result);
      return;
    }
    const waiters = eventWaiters.get(message.method) || [];
    eventWaiters.delete(message.method);
    waiters.forEach((resolve) => resolve(message.params));
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      id += 1;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });

  const once = (event) =>
    new Promise((resolve) => {
      eventWaiters.set(event, [...(eventWaiters.get(event) || []), resolve]);
    });

  return Object.freeze({ once, send, socket });
};

const profile = mkdtempSync(join(tmpdir(), "webmastery-responsive-"));
const browser = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

let connection;
try {
  const activePort = join(profile, "DevToolsActivePort");
  await waitForFile(activePort);
  const port = Number(readFileSync(activePort, "utf8").split(/\r?\n/)[0]);
  const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
    method: "PUT",
  }).then((response) => response.json());

  connection = await connect(target.webSocketDebuggerUrl);
  await connection.send("Page.enable");
  await connection.send("Runtime.enable");

  const routes = publicPageFiles().map(routeForFile);
  const failures = [];

  for (const viewport of VIEWPORTS) {
    await connection.send("Emulation.setDeviceMetricsOverride", {
      ...viewport,
      deviceScaleFactor: 1,
    });

    for (const route of routes) {
      const loaded = connection.once("Page.loadEventFired");
      await connection.send("Page.navigate", { url: `${ORIGIN}${route}` });
      await loaded;

      const evaluated = await connection.send("Runtime.evaluate", {
        expression: `(async () => {
          await document.fonts.ready;
          const viewport = document.documentElement.clientWidth;
          const scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
          const brokenImages = [...document.images]
            .filter((image) => image.complete && !image.naturalWidth)
            .map((image) => image.src);
          const font = getComputedStyle(document.body).fontFamily;
          const privacy = document.querySelector('.privacy-consent')?.getBoundingClientRect().toJSON() || null;
          return { viewport, scrollWidth, brokenImages, font, privacy };
        })()`,
        awaitPromise: true,
        returnByValue: true,
      });
      const value = evaluated.result.value;
      const privacyOverflows =
        value.privacy &&
        (value.privacy.left < -1 || value.privacy.right > value.viewport + 1);
      if (
        value.scrollWidth > value.viewport + 1 ||
        value.brokenImages.length ||
        !value.font.toLowerCase().includes("dm") ||
        privacyOverflows
      ) {
        failures.push({ width: viewport.width, route, ...value });
      }
    }
  }

  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    process.exitCode = 1;
  } else {
    console.log(
      `Responsive browser sweep passed for ${routes.length} pages at ${VIEWPORTS.map(({ width }) => `${width}px`).join(" and ")}.`,
    );
  }
} finally {
  try {
    connection?.socket.close();
  } catch {
    // Chrome may already have closed the target.
  }
  browser.kill();
  await delay(100);
  rmSync(profile, { recursive: true, force: true });
}
