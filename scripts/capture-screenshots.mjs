import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium, devices } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const OUT_DIR = path.resolve('docs/screenshots');

// Control which sizes to capture via env (DESKTOP, TABLET, MOBILE)
const ENABLE_DESKTOP = (process.env.SCREENSHOTS_DESKTOP || '1') !== '0';
const ENABLE_TABLET = (process.env.SCREENSHOTS_TABLET || '1') !== '0';
const ENABLE_MOBILE = (process.env.SCREENSHOTS_MOBILE || '1') !== '0';

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/fleet', name: 'fleet' },
  { path: '/support', name: 'support' },
  { path: '/not-existing-route-404', name: '404' },
];

async function ensureOutDir() {
  await mkdir(OUT_DIR, { recursive: true });
}

async function captureDesktop(page, route) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT_DIR, `${route.name}.png`), fullPage: true });
}

async function captureTablet(page, route) {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT_DIR, `${route.name}-tablet.png`), fullPage: true });
}

async function captureMobile(browser, route) {
  const iPhone13 = devices['iPhone 13'];
  const context = await browser.newContext({ ...iPhone13 });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT_DIR, `${route.name}-mobile.png`), fullPage: true });
  await context.close();
}

async function main() {
  await ensureOutDir();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const route of ROUTES) {
    if (ENABLE_DESKTOP) {
      await captureDesktop(page, route);
    }
    if (ENABLE_TABLET) {
      await captureTablet(page, route);
    }
    if (ENABLE_MOBILE) {
      await captureMobile(browser, route);
    }
  }

  await browser.close();
  // eslint-disable-next-line no-console
  console.log(`Screenshots saved to ${OUT_DIR}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});