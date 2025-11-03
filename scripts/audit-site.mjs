// Usage:
//  BASE_URL="https://bm-valocations.com" npm run audit:site
//  npm run audit:site -- "https://bm-valocations.com"
// Produces ./audit-report.md with a summary and per-page checks.
//
// Requires: Node 18+ (global fetch), devDependency jsdom (already present)

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { JSDOM } from 'jsdom';

const ARG_URL = process.argv[2];
const BASE_URL = process.env.BASE_URL || ARG_URL || 'http://127.0.0.1:4173';
const REPORT_PATH = path.resolve('audit-report.md');

function log(msg) {
  console.log(msg);
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'audit-script' } });
  const text = await res.text();
  return { status: res.status, ok: res.ok, text };
}

function parseSitemap(xml) {
  const locs = [];
  const re = /<loc>\s*(.*?)\s*<\/loc>/gim;
  let m;
  while ((m = re.exec(xml)) !== null) {
    locs.push(m[1]);
  }
  return Array.from(new Set(locs));
}

function checkMeta(dom) {
  const doc = dom.window.document;
  const title = doc.querySelector('title')?.textContent?.trim() || '';
  const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  const h1 = doc.querySelector('h1')?.textContent?.trim() || '';
  const hasMain = !!doc.querySelector('#main-content');
  return { title, description, canonical, ogTitle, ogDesc, ogImage, h1, hasMain };
}

function checkLinks(dom) {
  const doc = dom.window.document;
  const anchors = Array.from(doc.querySelectorAll('a[href]')).map((a) => a.getAttribute('href'));
  return anchors;
}

function mdEscape(s) {
  return String(s).replace(/\|/g, '\\|');
}

async function main() {
  log(`[audit] Base URL: ${BASE_URL}`);

  // robots.txt
  const robotsUrl = `${BASE_URL.replace(/\/$/, '')}/robots.txt`;
  const robots = await fetchText(robotsUrl).catch(() => ({ status: 0, ok: false, text: '' }));
  log(`[robots] status=${robots.status}`);

  // sitemap.xml
  const sitemapUrl = `${BASE_URL.replace(/\/$/, '')}/sitemap.xml`;
  const sitemap = await fetchText(sitemapUrl).catch(() => ({ status: 0, ok: false, text: '' }));
  log(`[sitemap] status=${sitemap.status}`);

  let urls = [];
  if (sitemap.ok) {
    urls = parseSitemap(sitemap.text);
  } else {
    // fallback: test homepage only
    urls = [BASE_URL];
  }

  const results = [];
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'audit-script' } });
      const html = await res.text();
      const dom = new JSDOM(html);
      const meta = checkMeta(dom);
      const links = checkLinks(dom);

      const issues = [];
      if (!meta.title) issues.push('Missing <title>');
      if (!meta.description) issues.push('Missing meta description');
      if (!meta.canonical) issues.push('Missing canonical link');
      if (!meta.ogTitle || !meta.ogDesc || !meta.ogImage) issues.push('Missing OG tags');
      if (!meta.h1) issues.push('Missing <h1>');
      if (!meta.hasMain) issues.push('Missing #main-content (skip link target)');

      results.push({
        url,
        status: res.status,
        ok: res.ok,
        meta,
        anchorsCount: links.length,
        issues,
      });
      log(`[page] ${url} status=${res.status} issues=${issues.length}`);
    } catch (e) {
      results.push({ url, status: 0, ok: false, meta: {}, anchorsCount: 0, issues: ['Fetch failed'] });
      log(`[page] ${url} fetch failed`);
    }
  }

  // Build report
  const lines = [];
  lines.push(`# Audit Report`);
  lines.push('');
  lines.push(`Base URL: ${BASE_URL}`);
  lines.push(`Robots: ${robots.ok ? 'OK' : `status=${robots.status}`}`);
  lines.push(`Sitemap: ${sitemap.ok ? 'OK' : `status=${sitemap.status}`}`);
  lines.push('');
  lines.push(`## Summary`);
  lines.push('');
  lines.push(`| URL | Status | Issues | Title | Canonical | H1 |`);
  lines.push(`| --- | ---: | ---: | --- | --- | --- |`);
  for (const r of results) {
    lines.push(
      `| ${mdEscape(r.url)} | ${r.status} | ${r.issues.length} | ${mdEscape(r.meta.title || '')} | ${mdEscape(
        r.meta.canonical || ''
      )} | ${mdEscape(r.meta.h1 || '')} |`
    );
  }
  lines.push('');
  lines.push(`## Details`);
  for (const r of results) {
    lines.push('');
    lines.push(`### ${r.url}`);
    lines.push(`Status: ${r.status}`);
    lines.push(`Issues (${r.issues.length}): ${r.issues.join(', ') || 'None'}`);
    lines.push(`Title: ${r.meta.title || '—'}`);
    lines.push(`Description: ${r.meta.description || '—'}`);
    lines.push(`Canonical: ${r.meta.canonical || '—'}`);
    lines.push(`OG Title: ${r.meta.ogTitle || '—'}`);
    lines.push(`OG Description: ${r.meta.ogDesc || '—'}`);
    lines.push(`OG Image: ${r.meta.ogImage || '—'}`);
    lines.push(`H1: ${r.meta.h1 || '—'}`);
    lines.push(`Anchors: ${r.anchorsCount}`);
  }

  fs.writeFileSync(REPORT_PATH, lines.join('\n'), 'utf8');
  log(`[audit] Report written to ${REPORT_PATH}`);
}

main().catch((e) => {
  console.error('[audit] failed:', e);
  process.exit(1);
});