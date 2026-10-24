import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const hash = (buffer: Buffer) => createHash('sha256').update(buffer).digest('hex');

test('all ten distinct downloads return the original file bytes', async ({ page, request }) => {
  await page.goto('/');
  const links = await page.locator('a[download]').evaluateAll(nodes => [...new Set(nodes.map(node => node.getAttribute('href')!))]);
  expect(links).toHaveLength(10);
  for (const link of links) {
    const response = await request.get(link);
    expect(response.ok(), link).toBeTruthy();
    const expected = await readFile(path.join(process.cwd(), 'public', link));
    expect(hash(await response.body()), link).toBe(hash(expected));
  }
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download primary logo', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('logo-primary-transparent.png');
  expect(await download.failure()).toBeNull();
});

test('metadata, approved copy, social destinations, and indexing', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Cielle Candles | Media Room');
  await expect(page.locator('h1')).toHaveText('The storybehind the glow.');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://media.ciellecandles.com/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://media.ciellecandles.com/media/assets/social-preview.jpg');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.getByRole('link', { name: /Find Cielle Candles on Facebook/ })).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=61592018387942');
  await expect(page.getByRole('link', { name: /Instagram @ciellecandles26/ })).toHaveAttribute('href', 'https://www.instagram.com/ciellecandles26/');
  await expect(page.locator('a[href="mailto:contact@ciellecandles.com"]')).toBeVisible();
  for (const route of ['/robots.txt', '/sitemap.xml']) {
    const response = await request.get(route);
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).toContain('https://media.ciellecandles.com/');
  }
  const copy = await readFile('public/media/downloads/Cielle_Candles_Approved_Press_Copy.txt', 'utf8');
  const paragraphs = await page.locator('.hero-description, .brand-story > p, .founder-intro .lead, .approved-copy > div > p:not(.eyebrow), details p').allTextContents();
  for (const paragraph of paragraphs) expect(copy).toContain(paragraph);
});

for (const width of [320, 390, 768, 1440]) {
  test(`responsive layout and WCAG checks at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(async () => {
      for (const image of document.images) image.loading = 'eager';
      await Promise.all([...document.images].map(image => image.decode()));
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    for (const image of await page.locator('img').all()) expect(await image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
    if (width === 390 || width === 1440) await page.screenshot({ path: `/tmp/cielle-${width}.png`, fullPage: true });
  });
}

test('keyboard navigation, copy button, and expandable approved spotlight', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await page.getByRole('button', { name: 'Copy description' }).click();
  await expect(page.getByRole('status')).toHaveText('Copied to clipboard');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Cielle Candles, founded by Connie Kersee');
  await page.getByText('Read the approved event spotlight', { exact: true }).click();
  await expect(page.locator('details p')).toBeVisible();
});
