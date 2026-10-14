#!/usr/bin/env node
// Full-page screenshot at an exact viewport width through the DevTools protocol.
// Headless Chrome's --window-size floors the layout viewport at about 500px on macOS,
// so phone widths need Emulation.setDeviceMetricsOverride instead.
//
//   node scripts/kit-shot.mjs <url> <out.png> [width=1440] [height=900] [waitMs=1500] [--reduced-motion]
//
// Needs Node 22+ (global WebSocket) and Google Chrome at the default macOS path.

import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [url, out, widthArg = '1440', heightArg = '900', waitArg = '1500', ...flags] = process.argv.slice(2);
if (!url || !out) {
  console.error('usage: kit-shot.mjs <url> <out.png> [width] [height] [waitMs] [--reduced-motion]');
  process.exit(2);
}
const width = Number(widthArg);
const height = Number(heightArg);
const waitMs = Number(waitArg);
const mobile = width < 768;
const port = 9222 + Math.floor(Math.random() * 500);

const chromeArgs = [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--remote-debugging-port=${port}`,
  `--window-size=${Math.max(width, 500)},${height}`,
  '--user-data-dir=/tmp/kit-shot-profile-' + port,
  'about:blank',
];
if (flags.includes('--reduced-motion')) chromeArgs.push('--force-prefers-reduced-motion');
const chrome = spawn(CHROME, chromeArgs, { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targetWs() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`);
      const pages = await res.json();
      const page = pages.find((p) => p.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(100);
  }
  throw new Error('chrome did not expose a page target');
}

const ws = new WebSocket(await targetWs());
await new Promise((r) => (ws.onopen = r));
let seq = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, (msg) => (msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)));
    ws.send(JSON.stringify({ id, method, params }));
  });

try {
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
    screenWidth: width,
    screenHeight: height,
  });
  if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await send('Page.navigate', { url });
  await sleep(waitMs);
  const { cssContentSize, contentSize } = await send('Page.getLayoutMetrics');
  const fullHeight = Math.ceil((cssContentSize ?? contentSize).height);
  // The viewport stays at `height` so vh/svh sections keep their size; the clip reaches past it.
  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height: fullHeight, scale: 1 },
  });
  await writeFile(out, Buffer.from(data, 'base64'));
  console.log(`${out} ${width}x${fullHeight}`);
} finally {
  ws.close();
  chrome.kill();
}
